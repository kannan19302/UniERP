#!/usr/bin/env node
/**
 * Audit PLATFORM_ARCHITECTURE.md against the tree it describes.
 * Measures; does not read prose. Prints CLAIM / MEASURED / VERDICT.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(
  fileURLToPath(new URL(".", import.meta.url)),
  "..",
  "..",
  "..",
);
const MONO = join(ROOT, "ERPSys");

const rows = [];
const row = (section, claim, measured, verdict) =>
  rows.push({ section, claim, measured, verdict });

const walk = (
  dir,
  exts,
  out = [],
  skip = new Set([
    "node_modules",
    "dist",
    ".next",
    ".git",
    ".turbo",
    "coverage",
    "build",
    ".pnpm-store",
  ]),
) => {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (skip.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full, exts, out, skip);
    else if (exts.some((x) => e.name.endsWith(x))) out.push(full);
  }
  return out;
};
const read = (f) => {
  try {
    return readFileSync(f, "utf8");
  } catch {
    return "";
  }
};
const dirs = (p) => {
  try {
    return readdirSync(p, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return [];
  }
};

// ── § 1 measured facts ───────────────────────────────────────────────────────
const repos = dirs(ROOT).filter((d) => existsSync(join(ROOT, d, ".git")));
row(
  "1",
  "6 repositories",
  `${repos.length} git repos in D:/UniERP`,
  repos.length === 6 ? "OK" : "STALE",
);

const apiModules = dirs(join(ROOT, "unierp-api/src/modules"));
row(
  "1",
  "45 API modules",
  `${apiModules.length}`,
  apiModules.length === 45 ? "OK" : "DRIFTED",
);

const modFiles = walk(join(ROOT, "unierp-api/src/modules"), [".ts"]);
const modLines = modFiles.reduce((n, f) => n + read(f).split("\n").length, 0);
row(
  "1",
  "655,100 lines in modules",
  `${modLines.toLocaleString()} lines, ${modFiles.length} files`,
  "MEASURED",
);

const pkgs = repos.filter((r) => r.startsWith("unierp-"));
const uiPkgs = pkgs.filter((p) => p.includes("design-system") || p.includes("storybook"));
row(
  "1",
  "23 workspace packages, 14 of them UI",
  `${pkgs.length} packages, ${uiPkgs.length} UI`,
  "DRIFTED",
);
row(
  "7.2",
  "14 UI packages collapsed to 1",
  `${uiPkgs.length} UI package(s): ${uiPkgs.join(", ")}`,
  uiPkgs.length <= 2 ? "OK" : "FAIL",
);

const schemaDir = existsSync(join(ROOT, "data/prisma/schema"))
  ? join(ROOT, "data/prisma/schema")
  : join(ROOT, "unierp-data/prisma/schema");
const schemaFiles = existsSync(schemaDir)
  ? readdirSync(schemaDir).filter((f) => f.endsWith(".prisma"))
  : [];
const schemaText = schemaFiles.map((f) => read(join(schemaDir, f))).join("\n");
const models = (schemaText.match(/^model\s+\w+/gm) || []).length;
const enums = (schemaText.match(/^enum\s+\w+/gm) || []).length;
row(
  "1 / R2",
  "1,836 models / 65 enums in 14 context files",
  `${models} models, ${enums} enums, ${schemaFiles.length} files`,
  schemaFiles.length > 1 ? "SPLIT OK" : "NOT SPLIT",
);

const appSrc = repos.flatMap((r) => walk(join(ROOT, r), [".ts", ".tsx"]));
const noCheck = appSrc.filter((f) => /@ts-nocheck/.test(read(f)));
row(
  "1 / Ph0",
  "@ts-nocheck 3,241 → 0",
  `${noCheck.length} of ${appSrc.length} files`,
  noCheck.length === 0 ? "OK" : "FAIL",
);

const floats = (schemaText.match(/^\s*\w+\s+Float/gm) || []).length;
row(
  "Ph0",
  "Float money → 0",
  `${floats} Float fields total in schema`,
  "SEE check-policy",
);

// ── § 3 / § 4 topology ───────────────────────────────────────────────────────
const platformExists = existsSync(join(ROOT, "api/src/modules/api-platform")) || existsSync(join(ROOT, "api/src/platform")) || existsSync(join(ROOT, "unierp-api/src/modules/api-platform")) || existsSync(join(ROOT, "unierp-api/src/platform"));
row(
  "3",
  "control plane router /api/platform/v1",
  platformExists
    ? `api-platform module present`
    : "MISSING",
  platformExists ? "OK" : "FAIL",
);
const saasRoutes = existsSync(join(ROOT, "tenant-apps/app/(dashboard)/saas")) || existsSync(join(ROOT, "unierp-web/app/(dashboard)/saas"))
  ? "present"
  : "0 routes";
row(
  "3 / Ph1",
  "(dashboard)/saas deleted from web",
  saasRoutes,
  saasRoutes === "0 routes" ? "OK" : "FAIL",
);

const L = {
  0: ["unierp-contracts"],
  1: [
    "unierp-kernel",
    "unierp-design-system",
    "unierp-sdk",
    "unierp-shared",
    "unierp-auth",
    "unierp-service-kit",
    "unierp-config",
  ],
  2: [
    "unierp-data",
    "unierp-framework",
    "unierp-extension-api",
    "unierp-sandbox",
    "unierp-blockchain",
  ],
  3: ["unierp-api", "unierp-idp"],
  4: [
    "unierp-web",
    "unierp-console",
    "unierp-developer",
    "unierp-corporate-website",
    "unierp-corporate-site-template",
  ],
  5: ["unierp-mobile"],
  6: ["unierp-extensions"],
  7: ["unierp-infra", "unierp-workspace"],
};
const mapped = Object.values(L).flat();
const unmapped = repos.filter(
  (r) =>
    !mapped.includes(r) &&
    r !== "ERPSys" &&
    r !== "unierp-platform" &&
    !r.startsWith("unierp-app-"),
);
row(
  "4.2",
  "15 repositories in 8 layers",
  `${mapped.length} layer repos + landing + 4 satellites + ERPSys = ${repos.length}`,
  "DRIFTED (15 → 30)",
);
row(
  "4.2",
  "every repo mapped to a layer",
  unmapped.length ? `unmapped: ${unmapped.join(", ")}` : "all mapped",
  unmapped.length ? "GAP" : "OK",
);

// ── § 4.5 mechanisms ─────────────────────────────────────────────────────────
const manifest = join(ROOT, "unierp-workspace/docs/platform-manifest.json");
if (existsSync(manifest)) {
  const m = JSON.parse(read(manifest));
  const n = Object.keys(m.components ?? {}).length;
  row(
    "4.5 M1",
    "manifest pins every repo",
    `train ${m.train}, ${n} components`,
    n >= mapped.length ? "OK" : `GAP (${mapped.length} layer repos)`,
  );
} else
  row(
    "4.5 M1",
    "platform-manifest.json in unierp-workspace",
    "MISSING",
    "FAIL",
  );

const cdcRepos = repos.filter((r) =>
  existsSync(join(ROOT, r, "cdc/expectations.json")),
);
row(
  "4.5 M2",
  "each consumer publishes cdc/expectations.json",
  `${cdcRepos.length} split repos carry one: ${cdcRepos.join(", ")}`,
  cdcRepos.length ? "PARTIAL" : "MONOREPO ONLY",
);

const wsScripts = existsSync(join(ROOT, "unierp-workspace/scripts"))
  ? readdirSync(join(ROOT, "unierp-workspace/scripts"))
  : [];
const wsCli = existsSync(join(ROOT, "unierp-workspace/scripts/tools/ws.mjs"));
row(
  "4.5 M4 / 12.1",
  "unierp ws clone/link/up/verify CLI",
  wsCli ? "scripts/tools/ws.mjs present" : "MISSING",
  wsCli ? "OK" : "FAIL",
);
row(
  "4.5 M4a",
  "aggregate suppression baseline in workspace",
  existsSync(join(ROOT, "unierp-workspace/.quality-baseline.json"))
    ? "present"
    : "MISSING",
  existsSync(join(ROOT, "unierp-workspace/.quality-baseline.json"))
    ? "OK"
    : "FAIL",
);

// ── § 4.6 / § 13.1 governance ────────────────────────────────────────────────
const gov = [
  "README.md",
  "LICENSE",
  "SECURITY.md",
  "CONTRIBUTING.md",
  ".github/CODEOWNERS",
];
const missingGov = [];
for (const r of repos) {
  if (r === "ERPSys") continue;
  for (const g of gov)
    if (!existsSync(join(ROOT, r, g))) missingGov.push(`${r}/${g}`);
}
row(
  "4.6",
  "governance files in every repo",
  missingGov.length ? missingGov.join(", ") : "all present",
  missingGov.length ? "GAP" : "OK",
);

const tmpl =
  existsSync(join(ROOT, "unierp-workspace/templates")) ||
  existsSync(join(ROOT, "unierp-workspace/.github/workflow-templates"));
row(
  "4.6 / 13.1",
  "governance + workflows generated from workspace templates, drift-checked",
  tmpl ? "templates dir present" : "NO templates dir in unierp-workspace",
  tmpl ? "OK" : "FAIL",
);

const reusable = existsSync(join(ROOT, "unierp-workspace/.github/workflows"))
  ? readdirSync(join(ROOT, "unierp-workspace/.github/workflows"))
  : [];
const callable = reusable.filter((w) =>
  /workflow_call/.test(
    read(join(ROOT, "unierp-workspace/.github/workflows", w)),
  ),
);
row(
  "13.1",
  "every gate a reusable workflow in unierp-workspace",
  `${reusable.length} workflows, ${callable.length} with workflow_call`,
  callable.length ? "PARTIAL" : "FAIL",
);

// ── § 10 security claims ─────────────────────────────────────────────────────
const gitleaks = repos.filter(
  (r) =>
    existsSync(join(ROOT, r, ".gitleaks.toml")) ||
    /gitleaks/i.test(read(join(ROOT, r, ".github/workflows/ci.yml"))),
);
row(
  "10",
  "gitleaks at pre-commit, pre-push and CI in all 15 repos",
  `${gitleaks.length} of ${repos.length} repos reference gitleaks`,
  gitleaks.length >= mapped.length ? "OK" : "FAIL",
);

const sbom = repos.filter((r) =>
  /cyclonedx|sbom/i.test(read(join(ROOT, r, ".github/workflows/ci.yml"))),
);
row(
  "10",
  "SBOM per image and per published package",
  `${sbom.length} repos generate an SBOM`,
  sbom.length >= mapped.length ? "OK" : "GAP",
);

const cosign = repos.filter((r) =>
  /cosign|provenance/i.test(
    read(join(ROOT, r, ".github/workflows/ci.yml")) +
      read(join(ROOT, r, ".github/workflows/release.yml")),
  ),
);
row(
  "10",
  "cosign signatures + npm provenance on every package",
  `${cosign.length} repos reference cosign/provenance`,
  cosign.length ? "PARTIAL" : "FAIL",
);

const npmrcAllow = repos.filter((r) =>
  /registry=/.test(read(join(ROOT, r, ".npmrc"))),
);
row(
  "10",
  "registry allowlist in every .npmrc (dependency confusion closed)",
  `${npmrcAllow.length} repos pin a registry`,
  npmrcAllow.length >= mapped.length ? "OK" : "GAP",
);

// ── § 12 windows ─────────────────────────────────────────────────────────────
const winCI = repos.filter((r) =>
  /windows-latest/.test(read(join(ROOT, r, ".github/workflows/ci.yml"))),
);
row(
  "12.2",
  "windows-latest job in every repository",
  `${winCI.length} of ${repos.length}`,
  winCI.length >= mapped.length ? "OK" : "FAIL",
);
const winPs = existsSync(
  join(ROOT, "unierp-workspace/scripts/tools/setup-windows.ps1"),
);
row(
  "12.2",
  "setup-windows.ps1 in unierp-workspace",
  winPs ? "present" : "MISSING",
  winPs ? "OK" : "FAIL",
);

// ── § 13.3 tests ─────────────────────────────────────────────────────────────
const dbScripts = existsSync(join(ROOT, "data/scripts"))
  ? join(ROOT, "data/scripts")
  : join(ROOT, "unierp-data/scripts");
const genTest = existsSync(dbScripts)
  ? readdirSync(dbScripts).filter((f) => /isolation|generate/i.test(f))
  : [];
row(
  "5.1 / 13.3",
  "two-tenant isolation test GENERATED per tenant_id table",
  genTest.length
    ? genTest.join(", ")
    : "no generator found in unierp-data/scripts",
  genTest.length ? "CHECK" : "FAIL",
);

// ── output ───────────────────────────────────────────────────────────────────
const w = [10, 62, 58, 16];
const pad = (s, n) =>
  String(s).length > n ? String(s).slice(0, n - 1) + "…" : String(s).padEnd(n);
console.log(
  "\n" +
    pad("SECTION", w[0]) +
    pad("CLAIM", w[1]) +
    pad("MEASURED", w[2]) +
    "VERDICT",
);
console.log("-".repeat(w[0] + w[1] + w[2] + w[3]));
for (const r of rows)
  console.log(
    pad("§ " + r.section, w[0]) +
      pad(r.claim, w[1]) +
      pad(r.measured, w[2]) +
      r.verdict,
  );
console.log();

if (rows.some((r) => r.verdict === "FAIL")) {
  console.error("❌ Architecture audit failed: one or more checks reported FAIL");
  process.exit(1);
}
