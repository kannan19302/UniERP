#!/usr/bin/env node
/**
 * Policy gate — mechanically enforces the rules the master docs declare.
 *
 * Split into two tiers:
 *
 *   HARD    Always fails the build. Zero tolerance, no baseline, no grandfathering.
 *           These are correctness and security rules where an existing violation would
 *           itself be a P0 — so if any exist, we want the build red today.
 *
 *   RATCHET Counted against .quality-policy-baseline.json. Existing violations are
 *           grandfathered; any INCREASE fails. Used where the debt is large enough that
 *           a hard gate would block all work.
 *
 *   node scripts/ci/check-policy.mjs            # verify
 *   node scripts/ci/check-policy.mjs --update   # ratchet baselines DOWN
 *   node scripts/ci/check-policy.mjs --report   # list actual violations with file:line
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, relative, resolve, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

// POLICY_ROOT lets the reusable workflow run this script from a checkout of
// unierp-workspace against a DIFFERENT repository's tree — which is how a rule ends up
// running in the repo that owns its files (phase A30). POLICY_REPO names that repo when
// the directory basename is not the repository name, as on some CI runners.
const ROOT = process.env.POLICY_ROOT
  ? resolve(process.env.POLICY_ROOT)
  : join(fileURLToPath(new URL(".", import.meta.url)), "..", "..");
const BASELINE_PATH = join(ROOT, ".quality-policy-baseline.json");
const SKIP = new Set([
  "node_modules",
  "dist",
  ".next",
  ".turbo",
  "coverage",
  "build",
  ".git",
  "generated",
  "storybook-static",
  "migrations",
]);

function walk(dir, exts, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (SKIP.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full, exts, out);
    else if (exts.some((x) => e.name.endsWith(x))) out.push(full);
  }
  return out;
}

/* ── Polyrepo path resolution — phase A30, defect D024 ───────────────────────
 *
 * Every rule below names a MONOREPO path: apps/api/src, apps/web/app,
 * packages/database/prisma. None of those exist any more. `files()` used to return []
 * for a missing directory, so after extraction the ratchets silently reported ZERO
 * while the real counts were 4 raw-SQL files, 319 hardcoded hex values and 4,025
 * hardcoded pixels — a gate reading "clean" over untouched debt. One HARD rule had
 * already been made honest ("missing targets are now reported rather than skipped"),
 * and it is the only reason anyone noticed: it failed, and main has been red since
 * extraction.
 *
 * The fix is not to translate the paths. A gate in the orchestration repo cannot read
 * a sibling repository's files — CI checks out one repo — so translated paths would
 * pass locally, where the siblings are on disk, and fail in CI forever.
 *
 * So each monorepo prefix now declares which repository OWNS it. A rule runs where its
 * files live, and anywhere else it is explicitly DELEGATED, named in the output, and
 * cross-checked against docs/policy-gate-owners.json. Silence is what we are removing;
 * a delegation that is not declared is a failure.
 */
const OWNERSHIP = [
  { prefix: "apps/api/", repo: "unierp-api" },
  { prefix: "apps/web/", repo: "unierp-web" },
  { prefix: "apps/idp/", repo: "unierp-idp" },
  { prefix: "apps/console/", repo: "unierp-console" },
  { prefix: "apps/developer/", repo: "unierp-developer" },
  { prefix: "apps/mobile/", repo: "unierp-mobile" },
  { prefix: "packages/database/", repo: "unierp-data" },
  { prefix: "packages/shared/", repo: "unierp-shared" },
  { prefix: "packages/ui/", repo: "unierp-design-system" },
  { prefix: "packages/framework/", repo: "unierp-framework" },
  { prefix: "packages/contracts/", repo: "unierp-contracts" },
  { prefix: "packages/kernel/", repo: "unierp-kernel" },
  { prefix: "packages/auth/", repo: "unierp-auth" },
];

/** The repository this run is inside. */
const SELF_REPO =
  process.env.POLICY_REPO || ROOT.split(/[\/]/).filter(Boolean).pop();

/** rule id -> Set of repos its off-repo targets belong to. */
const delegated = new Map();
/** rule id -> true if at least one target WAS readable here. A rule can span repos: the
 *  control-plane-seeded-to-tenant rule checks a seed in unierp-data AND an auth service in
 *  unierp-idp. Skipping the whole rule on the first delegation would leave the other half
 *  unchecked everywhere — so delegation is tracked per target, and a partially-local rule
 *  still runs and still reports. */
const checkedLocally = new Set();

const noteDelegation = (repo) => {
  if (!CURRENT_RULE) return;
  if (!delegated.has(CURRENT_RULE)) delegated.set(CURRENT_RULE, new Set());
  delegated.get(CURRENT_RULE).add(repo);
};

/**
 * Translate a monorepo path to a path in THIS repository, or report that it is not
 * ours. Returns null when the path belongs elsewhere — the caller records a delegation
 * rather than treating the absence as a clean result.
 */
function resolvePath(p) {
  const norm = p.split("\\").join("/");
  // An absolute path has already been resolved — files() returns absolute paths from walk(),
  // and read() is then called with them. Translating a second time produced
  // join(ROOT, "D:/UniERP/...") and read() silently returned "" for every file, so each rule
  // scanned nothing and reported a clean 0. Exactly the failure being fixed, reintroduced by
  // the fix. Caught by checking the gate's output against a grep of the same files.
  if (isAbsolute(norm) || /^[A-Za-z]:/.test(norm)) {
    return { local: p, owner: SELF_REPO };
  }
  const owner = OWNERSHIP.find((o) => norm.startsWith(o.prefix));
  if (!owner) return { local: join(ROOT, p), owner: SELF_REPO };
  if (owner.repo !== SELF_REPO) return { local: null, owner: owner.repo };
  return { local: join(ROOT, norm.slice(owner.prefix.length)), owner: SELF_REPO };
}

/** Set by each rule before scanning, so a delegation is attributed to the right rule. */
let CURRENT_RULE = null;

const files = (dir, exts) => {
  const { local, owner } = resolvePath(dir);
  if (local === null) {
    noteDelegation(owner);
    return [];
  }
  if (!existsSync(local)) return [];
  if (CURRENT_RULE) checkedLocally.add(CURRENT_RULE);
  return walk(local, exts);
};

const read = (f) => {
  const { local, owner } = resolvePath(f);
  if (local === null) {
    noteDelegation(owner);
    return "";
  }
  try {
    const src = readFileSync(local, "utf8");
    if (CURRENT_RULE) checkedLocally.add(CURRENT_RULE);
    return src;
  } catch {
    return "";
  }
};

/* ── HARD rules ─────────────────────────────────────────────────────────── */

const HARD = [
  {
    id: "suppression-injector",
    label: "Committed tool that injects @ts-nocheck across the tree",
    why:
      "ARCHITECTURE_REVIEW F1 traces 3,241 suppressed files to exactly such a script. R5 " +
      "deleted the root copy; copies then reappeared under apps/api, apps/idp and apps/web " +
      "and re-suppressed four core services. A committed tool whose only purpose is to " +
      "defeat the type checker will be run again.",
    scan() {
      const hits = [];
      for (const f of [
        ...files("apps", [".js", ".mjs", ".cjs", ".ts"]),
        ...files("scripts", [".js", ".mjs", ".cjs"]),
      ]) {
        const rel = relative(ROOT, f);
        // The gate and its own documentation are allowed to name the pattern.
        if (
          rel.includes(`ci${"/"}check-policy`) ||
          rel.includes(`ci\\check-policy`)
        )
          continue;
        const src = read(f);
        // A file that WRITES `@ts-nocheck` into other files, rather than merely mentioning it.
        if (
          /writeFileSync\([^)]*@ts-nocheck|['"`]\/\/ @ts-nocheck\\n['"`]\s*\+/.test(
            src,
          )
        ) {
          hits.push(`${rel}  writes "@ts-nocheck" into source files`);
        }
      }
      return hits;
    },
  },
  {
    id: "control-plane-seeded-to-tenant",
    label: "Control-plane permission granted by a seeded tenant role",
    why:
      "Tenant roles must never carry system.*/platform.* grants. A tenant role that does " +
      "hands every customer administrator platform-global authority — this was a real, " +
      "confirmed escalation (PLATFORM_ARCHITECTURE § 1.2), not a hypothetical.",
    scan() {
      const hits = [];
      // The auth service moved to apps/idp in the platform split. This list
      // still named the old apps/api path, and `read()` returns null for a
      // missing file, so the gate silently stopped checking it — a control
      // that quietly covers less than it claims is worse than no control.
      // Missing targets are now reported rather than skipped.
      //
      // The seed moves with the database package: workspace member during the
      // migration, installed artifact once consumers have switched. Check
      // whichever exists rather than pinning one, but still fail loudly if
      // NEITHER does — a control that quietly covers less than it claims is
      // worse than no control, which is why this reports a missing target
      // instead of skipping it.
      // Relative, NOT join(ROOT, ...). Pre-joining makes the path absolute, and
      // resolvePath() passes absolute paths through untranslated — so ownership was lost
      // and the seed reported MISSING in every repo instead of delegating to unierp-data.
      const seedCandidates = [
        "packages/database/prisma/seed.ts",
        "node_modules/@kannan19302/database/prisma/seed.ts",
      ];
      // Each target belongs to a specific repository post-extraction. read() records a
      // delegation for anything owned elsewhere, so an absent file is either "not this
      // repo's business" (delegated, reported by name) or a genuine missing target in a
      // repo that DOES own it — which still fails, because the original reasoning holds:
      // a control that quietly covers less than it claims is worse than no control.
      const seed = seedCandidates.find((f) => read(f));
      const targets = [
        ...(seed ? [seed] : seedCandidates.slice(0, 1)),
        "apps/idp/src/modules/auth/auth.service.ts",
      ];
      for (const f of targets) {
        const src = read(f);
        if (!src) {
          const { local } = resolvePath(f);
          if (local === null) continue; // owned by another repo; delegation already recorded
          hits.push(
            `${f}  MISSING — this gate cannot check a file that is not there; ` +
              "update the target list if the file moved.",
          );
          continue;
        }
        // Only look inside role-definition blocks: `permissions: [ ... ]`.
        for (const m of src.matchAll(/permissions:\s*\[([^\]]*)\]/g)) {
          for (const g of m[1].matchAll(/["'`]([^"'`]+)["'`]/g)) {
            const grant = g[1];
            if (/^(system|platform)(\.|$)/.test(grant)) {
              const line = src.slice(0, m.index + g.index).split("\n").length;
              hits.push(
                `${relative(ROOT, f)}:${line}  seeds "${grant}" into a tenant role`,
              );
            }
          }
        }
      }
      return hits;
    },
  },
  {
    id: "control-plane-grant-outside-reserved-tenant",
    label:
      "Control-plane grant provisioned outside the reserved platform tenant",
    why:
      "system.*/platform.* may only be granted by the control-plane provisioner, and only " +
      "under the reserved platform tenant. Any other file creating a role with those grants " +
      "is re-opening the § 1.2 escalation by another route.",
    scan() {
      const hits = [];
      const PROVISIONER = "packages/database/prisma/seed-platform.ts";
      for (const f of [
        ...files("packages/database/prisma", [".ts"]),
        ...files("apps/idp/src", [".ts"]),
        ...files("apps/api/src", [".ts"]),
      ]) {
        const rel = relative(ROOT, f).replace(/\\/g, "/");
        if (rel === PROVISIONER) continue;
        if (rel.includes(".spec.") || rel.includes("/tests/")) continue;
        const src = read(f);
        if (!src) continue;
        for (const m of src.matchAll(
          /permissions:\s*(?:JSON\.stringify\()?\s*\[([^\]]*)\]/g,
        )) {
          for (const g of m[1].matchAll(/["'`]([^"'`]+)["'`]/g)) {
            if (!/^(system|platform)(\.|$)/.test(g[1])) continue;
            const line = src.slice(0, m.index + g.index).split("\n").length;
            hits.push(
              `${rel}:${line}  grants "${g[1]}" outside ${PROVISIONER}`,
            );
          }
        }
      }
      return hits;
    },
  },
  {
    id: "permissions-without-guard",
    label: "@Permissions declared on a controller with no guard to enforce it",
    why:
      "@Permissions only writes route metadata. Without RbacGuard nothing reads it, and " +
      "without JwtAuthGuard there is no request.user for it to read — so the route is " +
      "reachable unauthenticated while looking protected in both source and Swagger. " +
      "@ApiBearerAuth() documents a requirement it does not enforce. This was real: 348 " +
      "routes across four controllers, including all of advanced-finance/expansion and " +
      "subscription management.",
    scan() {
      const hits = [];
      for (const f of files("apps/api/src", [".controller.ts"])) {
        const rel = relative(ROOT, f).replace(/\\/g, "/");
        if (rel.includes("/tests/") || rel.includes(".spec.")) continue;
        const src = read(f);
        if (!src || !src.includes("@Permissions(")) continue;
        // Must match the DECORATOR, not the identifier: an `import { UseGuards }`
        // left behind after the decorator is deleted would otherwise satisfy a
        // bare substring check and the gate would pass on the exact regression
        // it exists to catch. (It did, the first time this was written.)
        if (/@UseGuards\(/.test(src)) continue;
        const count = (src.match(/@Permissions\(/g) ?? []).length;
        hits.push(
          `${rel}  ${count} @Permissions decorator(s) but no @UseGuards — nothing enforces them`,
        );
      }
      return hits;
    },
  },
  {
    id: "tenant-from-client-header",
    label: "Tenant identity taken from a client-supplied header",
    why:
      "A tenant read from `x-tenant-id` is whatever the caller claims to be, so it is not " +
      "an identity at all — it is a parameter for choosing whose data to touch. Five " +
      "controllers did this across 101 unauthenticated routes reaching real services " +
      "(letters of credit, production orders, project financials). Tenant comes from the " +
      "authenticated session: use @CurrentTenant.",
    scan() {
      const hits = [];
      for (const f of [
        ...files("apps/api/src", [".ts"]),
        ...files("apps/idp/src", [".ts"]),
      ]) {
        const rel = relative(ROOT, f).replace(/\\/g, "/");
        if (rel.includes("/tests/") || rel.includes(".spec.")) continue;
        const src = read(f);
        if (!src) continue;
        // The middleware that legitimately reads the header to populate
        // request.tenantId for internal calls is the one allowed exception.
        if (rel.includes("common/middleware/")) continue;
        // Skip comments. Explaining what the code used to do names the very
        // pattern being banned, and a naive scan flags the explanation as a
        // fresh violation — which is exactly what happened when this rule was
        // first written, on the same commit that removed the real ones.
        src.split(/\r?\n/).forEach((line, i) => {
          const t = line.trim();
          if (t.startsWith("//") || t.startsWith("*") || t.startsWith("/*"))
            return;
          if (/Headers\(\s*["'`]x-tenant-id["'`]\s*\)/.test(line)) {
            hits.push(
              `${rel}:${i + 1}  takes the tenant from the x-tenant-id header`,
            );
          }
        });
      }
      return hits;
    },
  },
  {
    id: "cross-tenant-tenant-scoped-permission",
    label: "@SkipTenantScope() handler guarded by a tenant-scoped permission",
    why:
      "A cross-tenant handler authorised by a tenant-namespace code lets tenant authority " +
      "act platform-wide. This is exactly how any customer admin could suspend, export or " +
      "offboard any other tenant via TenantLifecycleController.",
    scan() {
      const hits = [];
      for (const f of files("apps/api/src", [".controller.ts"])) {
        const src = read(f);
        if (!src.includes("@SkipTenantScope()")) continue;
        const lines = src.split("\n");
        // Class-level @SkipTenantScope applies to every route in the file.
        const classLevel =
          /@Controller\([^)]*\)[\s\S]{0,400}?@SkipTenantScope\(\)/.test(src);
        lines.forEach((line, i) => {
          const m = line.match(/@Permissions\(\s*["']([^"']+)["']/);
          if (!m) return;
          const inScope =
            classLevel ||
            lines
              .slice(Math.max(0, i - 8), i + 8)
              .some((l) => l.includes("@SkipTenantScope()"));
          if (!inScope) return;
          if (!/^(system|platform)(\.|$)/.test(m[1])) {
            hits.push(
              `${relative(ROOT, f)}:${i + 1}  cross-tenant route guarded by "${m[1]}"`,
            );
          }
        });
      }
      return hits;
    },
  },
  {
    id: "ci-bypass",
    label:
      "Gate bypass in CI or git hooks (continue-on-error / --no-verify / || true)",
    why: "A gate that cannot fail is worse than no gate — it manufactures false confidence.",
    scan() {
      const hits = [];
      const targets = [
        ...files(".github/workflows", [".yml", ".yaml"]),
        ...files(".husky", ["", ".sh"]).filter(
          (f) => !f.includes(`.husky${"/"}_`),
        ),
      ];
      for (const f of targets) {
        read(f)
          .split("\n")
          .forEach((line, i) => {
            if (/^\s*#/.test(line)) return; // comments are allowed to mention it
            if (
              /continue-on-error:\s*true|--no-verify|\|\|\s*true\b/.test(line)
            ) {
              hits.push(`${relative(ROOT, f)}:${i + 1}  ${line.trim()}`);
            }
          });
      }
      return hits;
    },
  },
  {
    id: "committed-secret",
    label: "Credential-shaped literal committed to the repository",
    why: "A secret in git is a secret that must be rotated. Prevention is the only cure.",
    scan() {
      const hits = [];
      const patterns = [
        /['"](sk_live_|rk_live_|pk_live_)[A-Za-z0-9]{16,}['"]/,
        /['"]gh[pousr]_[A-Za-z0-9]{30,}['"]/,
        /['"]AKIA[0-9A-Z]{16}['"]/,
        /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/,
        /['"]eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}['"]/,
      ];
      const targets = [
        ...files("apps", [".ts", ".tsx", ".json", ".yml", ".yaml"]),
        ...files("packages", [".ts", ".tsx", ".json"]),
        ...files("scripts", [".mjs", ".js", ".ts", ".json"]),
        ...files(".github", [".yml", ".yaml"]),
      ];
      for (const f of targets) {
        const rel = relative(ROOT, f);
        if (/\.example$|fixtures?\//.test(rel)) continue;
        read(f)
          .split("\n")
          .forEach((line, i) => {
            if (patterns.some((p) => p.test(line)))
              hits.push(`${rel}:${i + 1}`);
          });
      }
      return hits;
    },
  },
  {
    id: "docs-ai-extra-files",
    label: "Unauthorised file in docs/ai/",
    why: "docs/ai/ holds exactly ten files. Sidecar documents fragment the source of truth. (README.md rule 1)",
    scan() {
      const allowed = new Set([
        "README.md",
        "PRD.md",
        "TRD.md",
        "APP_FLOW.md",
        "UI_UX_BRIEF.md",
        "BACKEND_SCHEMA.md",
        "IMPLEMENTATION_PLAN.md",
        "ARCHITECTURE_REVIEW.md",
        "CODE_STANDARDS.md",
        "CHANGELOG.md",
      ]);
      const dir = join(ROOT, "docs", "ai");
      if (!existsSync(dir)) return [];
      return readdirSync(dir)
        .filter((n) => !allowed.has(n))
        .map(
          (n) =>
            `docs/ai/${n}  ← delete it, or fold its content into one of the ten master files`,
        );
    },
  },
  {
    id: "auth-math-random",
    label: "Math.random() used in auth module",
    why: "Math.random() is not cryptographically secure and allows predictability of OTPs. Use node:crypto randomInt instead.",
    scan() {
      const hits = [];
      for (const f of files("apps/api/src/modules/auth", [".ts"])) {
        read(f)
          .split("\n")
          .forEach((line, i) => {
            if (/Math\.random\s*\(/.test(line))
              hits.push(`${relative(ROOT, f)}:${i + 1}`);
          });
      }
      return hits;
    },
  },
];

/* ── RATCHET rules ──────────────────────────────────────────────────────── */

const RATCHET = [
  {
    id: "rawSql",
    mustReachZero: true,
    label: "Unsafe raw SQL ($queryRawUnsafe / $executeRawUnsafe)",
    why: "SQL injection surface, and it bypasses the RLS-scoped transaction client — these queries may not be tenant-isolated at all. ARCHITECTURE_REVIEW § F12 / R12.",
    scan() {
      const hits = [];
      for (const f of files("apps/api/src", [".ts"])) {
        read(f)
          .split("\n")
          .forEach((line, i) => {
            if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comment lines aren't call sites
            if (/\$(query|execute)RawUnsafe/.test(line)) {
              hits.push(`${relative(ROOT, f)}:${i + 1}`);
            }
          });
      }
      return hits;
    },
  },
  {
    id: "floatMoney",
    mustReachZero: true,
    label: "Float used for a monetary field in the Prisma schema",
    why: "Floating point silently corrupts financial totals. Use Decimal(19,4). ARCHITECTURE_REVIEW § F11 / R11.",
    scan() {
      const hits = [];
      // The heuristic is a name match, so it also catches dimensionless metrics
      // whose names contain "rate", "total" or "value" — an OTIF delivery rate
      // is not money. Those are excluded only by an individually reasoned entry
      // in float-classification.json, which is fail-closed: a Float column that
      // matches the heuristic and is NOT listed is still a violation, so a new
      // money column cannot slip through by being unclassified.
      let classified = new Set();
      try {
        const doc = JSON.parse(
          read(join(ROOT, "scripts/ci/float-classification.json")),
        );
        classified = new Set((doc.metrics ?? []).map((m) => m.field));
      } catch {
        // No classification file: every match stays a violation.
      }

      for (const f of files("packages/database/prisma", [".prisma"])) {
        let model = "";
        read(f)
          .split("\n")
          .forEach((line, i) => {
            const modelStart = /^\s*model\s+(\w+)\s*\{/.exec(line);
            if (modelStart) {
              model = modelStart[1];
              return;
            }
            const money =
              /(amount|price|cost|total|balance|salary|rate|subtotal|tax|discount|fee|value)/i;
            if (!/\bFloat\b/.test(line) || !money.test(line)) return;

            const field = /^\s*(\w+)\s/.exec(line)?.[1];
            if (field && classified.has(`${model}.${field}`)) return;

            hits.push(`${relative(ROOT, f)}:${i + 1}  ${line.trim()}`);
          });
      }
      return hits;
    },
  },
  {
    id: "tenantGuardWithoutAuth",
    hard: true,
    label: "TenantGuard applied without JwtAuthGuard to populate request.user",
    why: "TenantGuard reads request.user, which only JwtAuthGuard sets. Alone it authenticates nobody and every route 401s regardless of the caller — nine controllers shipped in that state, including enterprise audit, import and export.",
    scan() {
      const hits = [];
      for (const f of files("apps/api/src", [".controller.ts"])) {
        const text = read(f);
        if (!/@UseGuards\([^)]*TenantGuard/.test(text)) continue;
        if (/JwtAuthGuard/.test(text)) continue;
        hits.push(
          `${relative(ROOT, f)}  TenantGuard without JwtAuthGuard — request.user is never populated`,
        );
      }
      return hits;
    },
  },
  {
    id: "unguardedEndpoints",
    label: "Controller route without @Permissions",
    why: "An unguarded endpoint is a shipped security defect (BACKEND_SCHEMA § 6.3).",
    scan() {
      const hits = [];
      for (const f of files("apps/api/src", [".controller.ts"])) {
        const lines = read(f).split("\n");
        lines.forEach((line, i) => {
          if (!/^\s*@(Get|Post|Put|Patch|Delete)\s*\(/.test(line)) return;
          // The permission decorator may sit either side of the HTTP verb decorator, so
          // inspect the whole decorator block: back to the previous handler, forward to the
          // method signature.
          const before = lines.slice(Math.max(0, i - 8), i);
          const after = [];
          for (let j = i + 1; j < lines.length && j < i + 14; j++) {
            after.push(lines[j]);
            // Stop at the method signature — anything past it belongs to the body.
            if (/^\s{2}(async\s+)?[A-Za-z_$][\w$]*\s*\(/.test(lines[j])) break;
          }
          const window = [...before, line, ...after].join("\n");
          if (
            /@Permissions\s*\(|@Public\s*\(|@SkipAuth\s*\(|@AllowAnonymous\s*\(/.test(
              window,
            )
          )
            return;
          hits.push(`${relative(ROOT, f)}:${i + 1}  ${line.trim()}`);
        });
      }
      return hits;
    },
  },
  {
    id: "hardcodedColors",
    label: "Hardcoded hex colour in application code",
    why: "Breaks theming, dark mode, and high-contrast a11y for every user (UI_UX_BRIEF § 2).",
    scan() {
      const hits = [];
      const targets = [
        ...files("apps/web/app", [".tsx", ".ts", ".css"]),
        ...files("apps/web/src", [".tsx", ".ts", ".css"]),
        // H01/D138: this rule only ever named unierp-web's monorepo path
        // (apps/web/...), so it delegated away — never scanned — the
        // token gate for every OTHER app with real UI code, including
        // unierp-corporate-website (Next.js App Router, its own `app/`
        // at repo root, no OWNERSHIP entry of its own). Root-relative
        // `app`/`src` naturally resolve to THIS repo's own tree (no
        // OWNERSHIP prefix matches a bare "app"), so scanning them too
        // extends the same check to any repo that has one, without
        // touching unierp-web's existing apps/web/-prefixed targets.
        ...(SELF_REPO !== "unierp-web"
          ? [
              ...files("app", [".tsx", ".ts", ".css"]),
              ...files("src", [".tsx", ".ts", ".css"]),
            ]
          : []),
      ];
      for (const f of targets) {
        read(f)
          .split("\n")
          .forEach((line, i) => {
            if (/^\s*(\/\/|\/\*|\*)/.test(line)) return;
            if (
              /#[0-9a-fA-F]{3,8}\b/.test(line) &&
              !/--[a-z-]+\s*:/.test(line)
            ) {
              hits.push(
                `${relative(ROOT, f)}:${i + 1}  ${line.trim().slice(0, 100)}`,
              );
            }
          });
      }
      return hits;
    },
  },
  {
    id: "hardcodedSpacing",
    label: "Hardcoded pixel value in application code",
    why: "Breaks the density system and the 4px grid (UI_UX_BRIEF § 5).",
    scan() {
      const hits = [];
      const targets = [
        ...files("apps/web/app", [".css"]),
        ...files("apps/web/src", [".css"]),
        // H01/D138: see the identical note in hardcodedColors above.
        ...(SELF_REPO !== "unierp-web"
          ? [...files("app", [".css"]), ...files("src", [".css"])]
          : []),
      ];
      // Counted per declaration, not per line, and this is load-bearing.
      //
      // The line-based version measured formatting as much as debt. Prettier
      // expands `.s2 { height: 16px; width: 16px; }` onto separate lines, and
      // the count for that unchanged rule went from 1 to 2. Running the
      // repository's own formatter over 155 CSS files raised this ratchet by 67
      // without a single new hardcoded pixel being written — a gate that fails
      // on `pnpm format` is measuring the wrong thing, and the tempting fixes
      // (bump the baseline, or skip the formatting) both hide that.
      //
      // A declaration is what the rule is actually about: one property, one
      // value. It is the same number however the file is wrapped.
      const DECLARATION = /(?:^|[;{])\s*(--)?([-a-zA-Z]+)\s*:\s*([^;{}]*)/g;
      for (const f of targets) {
        const source = read(f).replace(/\/\*[\s\S]*?\*\//g, ""); // strip comments
        for (const [, custom, property, value] of source.matchAll(
          DECLARATION,
        )) {
          if (custom) continue; // a token definition is where a px value belongs
          // 0px and 1px (hairlines) are permitted; everything else is debt.
          if (!/\b([2-9]|[1-9]\d+)px\b/.test(value)) continue;
          hits.push(
            `${relative(ROOT, f)}  ${property}: ${value.trim().slice(0, 60)}`,
          );
        }
      }
      return hits;
    },
  },
];

/* ── run ────────────────────────────────────────────────────────────────── */

const args = process.argv.slice(2);
const report = args.includes("--report");
const update = args.includes("--update");

let exitCode = 0;
console.log("\nPolicy gate — docs/ai/IMPLEMENTATION_PLAN.md § 11\n");

// HARD
console.log("HARD rules (zero tolerance):");
for (const rule of HARD) {
  CURRENT_RULE = rule.id;
  const hits = rule.scan();
  CURRENT_RULE = null;
  const away = delegated.has(rule.id) ? [...delegated.get(rule.id)].sort().join(", ") : null;
  if (away && !checkedLocally.has(rule.id)) {
    console.log(`   →  ${rule.label}`);
    console.log(`      delegated to ${away} — none of its files are in this repo`);
  } else if (hits.length === 0) {
    console.log(`   ✅ ${rule.label}${away ? `  (also enforced in ${away})` : ""}`);
  } else {
    exitCode = 1;
    console.log(`   ❌ ${rule.label} — ${hits.length} violation(s)`);
    console.log(`      ${rule.why}`);
    for (const h of hits.slice(0, report ? 200 : 10))
      console.log(`      · ${h}`);
    if (!report && hits.length > 10) {
      console.log(`      … ${hits.length - 10} more (run with --report)`);
    }
  }
}

// RATCHET
let baseline = {};
if (existsSync(BASELINE_PATH)) {
  try {
    baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8")).counts ?? {};
  } catch {
    baseline = {};
  }
}
const fresh = !existsSync(BASELINE_PATH);
const counts = {};

console.log("\nRATCHET rules (existing debt grandfathered; increases fail):");
for (const rule of RATCHET) {
  CURRENT_RULE = rule.id;
  const hits = rule.scan();
  CURRENT_RULE = null;
  const was = baseline[rule.id];

  // A delegated rule must NOT be counted or baselined here. Recording 0 for a rule whose
  // files live in another repository is exactly what produced a baseline of 0 against
  // 4,025 real hardcoded pixels, 319 hex values and 4 raw-SQL files — and then printed it
  // as a clean reading (D024).
  const ratchetAway = delegated.has(rule.id)
    ? [...delegated.get(rule.id)].sort().join(", ")
    : null;
  if (ratchetAway && !checkedLocally.has(rule.id)) {
    console.log(`   →  ${rule.label}: delegated to ${ratchetAway}`);
    if (was !== undefined) counts[rule.id] = was; // preserve; never overwrite with a false 0
    continue;
  }
  counts[rule.id] = hits.length;

  if (fresh || update) {
    console.log(`   ·  ${rule.label}: ${hits.length}`);
  } else if (was === undefined) {
    console.log(`   ·  ${rule.label}: ${hits.length} (new rule — baselining)`);
    baseline[rule.id] = hits.length;
  } else if (hits.length > was) {
    exitCode = 1;
    console.log(
      `   ❌ ${rule.label}: ${was} → ${hits.length} (+${hits.length - was})`,
    );
    console.log(`      ${rule.why}`);
    for (const h of hits.slice(0, report ? 200 : 5))
      console.log(`      · ${h}`);
  } else if (hits.length < was) {
    console.log(
      `   ✅ ${rule.label}: ${was} → ${hits.length} (${hits.length - was})`,
    );
  } else if (rule.mustReachZero && hits.length > 0) {
    // Grandfathered, but this is debt that must be repaid — not an accepted steady state.
    console.log(`   ⏳ ${rule.label}: ${hits.length}  ← MUST REACH ZERO`);
  } else {
    console.log(`   ·  ${rule.label}: ${hits.length}`);
  }

  if (report && hits.length) {
    console.log(`      ── all ${hits.length} ──`);
    for (const h of hits.slice(0, 200)) console.log(`      · ${h}`);
  }
}

if (fresh || update) {
  writeFileSync(
    BASELINE_PATH,
    JSON.stringify(
      {
        $comment:
          "Policy ratchet baseline. These numbers may only go DOWN. See docs/ai/ARCHITECTURE_REVIEW.md.",
        updatedAt: new Date().toISOString().slice(0, 10),
        counts,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    `\n✅ Policy baseline written to .quality-policy-baseline.json — commit it.\n`,
  );
  process.exit(exitCode);
}

if (exitCode !== 0) {
  console.error(`
────────────────────────────────────────────────────────────────────────
  POLICY VIOLATION.

  Fix the code. Do not weaken this gate, and do not bump the baseline
  upward — an increase requires an ADR in docs/ai/TRD.md § 9.
────────────────────────────────────────────────────────────────────────
`);
} else {
  console.log("\n  ✅ Policy gate clean.\n");
}
process.exit(exitCode);
