#!/usr/bin/env node

/**
 * M2 — Consumer-driven contracts (CDC) harness.
 * PLATFORM_ARCHITECTURE.md § 4.5 (M2) and § 14 Phase 2/3.
 *
 *   "Every consumer publishes a machine-readable expectation of what it uses
 *    from its providers. Each provider's CI replays the full corpus of its
 *    consumers' expectations on every PR."
 *
 * Why this exists
 * ───────────────
 * Today the TypeScript compiler sees across every package boundary in this
 * monorepo, so a removed export fails the consumer's build. After the Phase 3
 * split it does not: `tenant-apps` compiles against a *published* `@kannan19302/ui`,
 * and a symbol deleted in the design system is discovered at runtime in
 * staging. M2 is what replaces the compiler, and § 14 forbids extracting any
 * repository before it demonstrably works.
 *
 * What it does
 * ────────────
 *   record   For each consumer, walk its source, collect every named import it
 *            takes from an `@kannan19302/*` provider, and write the result to
 *            <consumer>/cdc/expectations.json — the artifact the consumer
 *            "publishes" and the provider replays.
 *   verify   Recompute those expectations, fail if the committed file has
 *            drifted, then replay every recorded symbol against the provider's
 *            current exported surface. A symbol a consumer expects and a
 *            provider no longer exports is a CDC violation, named with both
 *            the consumer and the symbol — the information the compiler used
 *            to give for free.
 *
 * Honesty about what can be proven
 * ────────────────────────────────
 * A provider whose entrypoint re-exports from a package outside this workspace
 * (`export * from "@prisma/client"`) has a surface this harness cannot
 * enumerate. Absence cannot be proven there, so such a provider is reported as
 * an OPEN surface and its misses are warnings, never failures. Claiming
 * otherwise would make the gate lie in the direction that matters.
 *
 * Usage:  node scripts/ci/cdc-harness.mjs [--record] [--json]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../");

const RECORD = process.argv.includes("--record");
const AS_JSON = process.argv.includes("--json");

/**
 * Providers: a published package whose exported surface other layers depend on.
 * `entry` is the source entrypoint; `subpaths` maps a subpath export to its own
 * entrypoint, because a consumer may import `@kannan19302/ui/charts` directly.
 */
// Prefer the built artifact, fall back to source.
//
// `dist/index.d.ts` is the surface a consumer actually resolves, so it is the
// right thing to replay expectations against once a package is published. But
// during the migration the packages are workspace members whose dist/ may not
// be built yet, and a harness that throws ENOENT there is a gate that stops
// running rather than a gate that passes — worse, because it blocks everything
// while proving nothing. Source is a faithful proxy in that state: it is the
// same tree the consumer compiles against through the workspace link.
/**
 * J05/D136: PROVIDERS and CONSUMERS below used to name monorepo paths
 * (`apps/web`, `packages/sdk`) — this harness's own docstring says it was
 * built for BEFORE "the Phase 3 split" into 30 separate repositories.
 * After that split, none of those paths exist in this repo any more
 * (`apps/` and `packages/` are empty here, confirmed by direct listing) —
 * the harness silently found zero providers and zero consumers on every
 * run, satisfying nothing, wired into no CI workflow anywhere (confirmed:
 * `grep -rln "cdc-harness" .github/workflows` returns zero matches) and
 * with zero `cdc/expectations.json` ever committed in any of the 30
 * repos. A real, sophisticated mechanism that had simply never been
 * connected to the polyrepo it now runs against.
 *
 * Every sibling repo this workspace's own AGENTS.md/README documents is
 * checked out beside this one using the canonical directory names from
 * UniERP.code-workspace, so providers and consumers are named as sibling
 * directories instead of monorepo subpaths or GitHub transport names.
 */
const SIBLING = (repo) => `../${repo}`;

const DIST = (repo) => {
  const candidates = [
    { dir: SIBLING(repo), entry: "dist/index.d.ts" },
    { dir: SIBLING(repo), entry: "src/index.ts" },
  ];
  return (
    candidates.find((c) => fs.existsSync(path.join(ROOT, c.dir, c.entry))) ??
    candidates[0]
  );
};

const PROVIDERS = {
  "@kannan19302/contracts": DIST("unierp-contracts"),
  "@kannan19302/kernel": DIST("kernel"),
  "@kannan19302/sdk": DIST("sdk"),
  "@kannan19302/extension-api": DIST("extension-api"),
  "@kannan19302/sandbox": DIST("sandbox"),
  "@kannan19302/framework": DIST("framework"),
  "@kannan19302/database": DIST("data"),
  "@kannan19302/shared": DIST("shared"),
  "@kannan19302/auth": DIST("auth"),
  "@kannan19302/ui": { ...DIST("design-system"), subpathRoot: "dist" },
};

/** Consumers: anything that compiles against a provider's published artifact. */
const CONSUMERS = [
  { name: "@kannan19302/web", dir: SIBLING("tenant-apps"), roots: ["app", "src"] },
  { name: "@kannan19302/console", dir: SIBLING("provider-admin-os"), roots: ["app", "src"] },
  { name: "@kannan19302/developer", dir: SIBLING("developer-platform"), roots: ["src", "app"] },
  { name: "@kannan19302/api", dir: SIBLING("api"), roots: ["src"] },
  { name: "@kannan19302/idp", dir: SIBLING("idp"), roots: ["src"] },
  { name: "@kannan19302/framework", dir: SIBLING("framework"), roots: ["src"] },
  { name: "@kannan19302/sdk", dir: SIBLING("sdk"), roots: ["src"] },
  { name: "@kannan19302/kernel", dir: SIBLING("kernel"), roots: ["src"] },
  {
    name: "@kannan19302/ext-real-estate",
    dir: SIBLING("extensions") + "/real-estate",
    roots: ["src"],
  },
  {
    name: "@kannan19302/ext-education",
    dir: SIBLING("extensions") + "/education",
    roots: ["src"],
  },
  {
    name: "@kannan19302/ext-healthcare",
    dir: SIBLING("extensions") + "/healthcare",
    roots: ["src"],
  },
  {
    name: "@kannan19302/ext-field-service",
    dir: SIBLING("extensions") + "/field-service",
    roots: ["src"],
  },
];

// ── source helpers ───────────────────────────────────────────────────────────

const parse = (file) =>
  ts.createSourceFile(
    file,
    fs.readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

function resolveRelative(fromFile, spec) {
  const base = path.resolve(path.dirname(fromFile), spec);
  // ESM source in this workspace imports with a .js extension that resolves to
  // the .ts file beside it (`./types/index.js` → `./types/index.ts`). Missing
  // this mapping silently reports a closed provider as an open one, which turns
  // a hard gate into a warning — so it is handled explicitly.
  const jsAsTs = base.replace(/\.jsx?$/, (m) =>
    m === ".jsx" ? ".tsx" : ".ts",
  );
  // …and the same specifier inside a published `dist` resolves to a DECLARATION
  // file, not a source file. Omitting `.d.ts` here made the harness unable to
  // follow re-exports through a published package, so it under-reported every
  // provider surface and raised false violations against symbols that were
  // present all along — a gate that cries wolf gets muted, which costs as much
  // as one that stays silent.
  const jsAsDts = base.replace(/\.jsx?$/, ".d.ts");
  // ORDER MATTERS. Inside a published `dist` the emitted `.js` sits beside its
  // `.d.ts`, so trying the bare specifier first resolved `./validators/index.js`
  // to the JavaScript — which carries no type exports at all. The harness then
  // saw an almost-empty surface and reported 243 false violations against
  // symbols that were published correctly. Declarations are tried first because
  // they are what a consumer's compiler reads.
  for (const candidate of [
    jsAsDts,
    `${base}.d.ts`,
    path.join(base, "index.d.ts"),
    jsAsTs,
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
    base,
  ]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile())
      return candidate;
  }
  return null;
}

function walkSources(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name === "node_modules" ||
      entry.name === "dist" ||
      entry.name === ".next"
    )
      continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkSources(p, out);
    else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith(".d.ts"))
      out.push(p);
  }
  return out;
}

// ── provider surface ─────────────────────────────────────────────────────────

/**
 * Collect the names a provider entrypoint actually exports, following relative
 * re-exports and re-exports of other in-workspace providers. Returns
 * { symbols:Set<string>, open:boolean } where `open` means the surface includes
 * a star re-export this harness could not resolve.
 */
function providerSurface(entryFile, seen = new Set()) {
  const symbols = new Set();
  let open = false;

  if (!entryFile || seen.has(entryFile)) return { symbols, open };
  seen.add(entryFile);

  const sf = parse(entryFile);

  for (const stmt of sf.statements) {
    // export * from "..."  /  export { a, b } from "..."  /  export { a }
    if (ts.isExportDeclaration(stmt)) {
      const spec = stmt.moduleSpecifier?.text;

      if (stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
        for (const el of stmt.exportClause.elements) symbols.add(el.name.text);
        continue;
      }

      // star re-export
      if (!spec) continue;
      if (spec.startsWith(".")) {
        const target = resolveRelative(entryFile, spec);
        if (!target) {
          open = true;
          continue;
        }
        const nested = providerSurface(target, seen);
        nested.symbols.forEach((s) => symbols.add(s));
        open = open || nested.open;
        continue;
      }

      const nestedProvider = PROVIDERS[spec];
      if (nestedProvider) {
        const nested = providerSurface(
          path.join(ROOT, nestedProvider.dir, nestedProvider.entry),
          seen,
        );
        nested.symbols.forEach((s) => symbols.add(s));
        open = open || nested.open;
        continue;
      }

      // re-export of a package outside this workspace: surface is not enumerable
      open = true;
      continue;
    }

    const exported =
      ts.getCombinedModifierFlags(stmt) &
      // eslint-disable-next-line no-bitwise
      ts.ModifierFlags.Export;
    if (!exported) continue;

    if (ts.isVariableStatement(stmt)) {
      for (const d of stmt.declarationList.declarations) {
        if (ts.isIdentifier(d.name)) symbols.add(d.name.text);
      }
    } else if (
      (ts.isFunctionDeclaration(stmt) ||
        ts.isClassDeclaration(stmt) ||
        ts.isInterfaceDeclaration(stmt) ||
        ts.isTypeAliasDeclaration(stmt) ||
        ts.isEnumDeclaration(stmt) ||
        ts.isModuleDeclaration(stmt)) &&
      stmt.name &&
      ts.isIdentifier(stmt.name)
    ) {
      symbols.add(stmt.name.text);
    }
  }

  return { symbols, open };
}

/** Resolve an import specifier to a provider entry file, honouring subpaths. */
function providerEntryFor(spec) {
  if (PROVIDERS[spec]) {
    const p = PROVIDERS[spec];
    return { key: spec, file: path.join(ROOT, p.dir, p.entry) };
  }
  for (const [name, p] of Object.entries(PROVIDERS)) {
    if (!p.subpathRoot || !spec.startsWith(`${name}/`)) continue;
    const sub = spec.slice(name.length + 1);
    if (sub.endsWith(".css")) return null; // stylesheet, not a symbol surface
    // Try dist, then src — the same fallback DIST() already applies to a
    // package's main entry, and for the same reason.
    //
    // Without it, whether `@kannan19302/ui/charts` counts as a provider depended on
    // whether `packages/ui/dist` happened to be built. It is built on a
    // developer machine and is not in the `Static (contracts)` CI job, which
    // runs `pnpm install` and `pnpm db:generate` and no build — so four
    // subpath providers silently vanished from every consumer's expectations
    // on the runner and stayed present locally. The visible symptom was a gate
    // that failed on CI, passed on Windows, and could not be reproduced by
    // re-running `--record`.
    //
    // The invisible symptom is the one that matters: a gate whose coverage
    // quietly depends on build state under-reports rather than fails, which is
    // the failure mode this repository keeps rediscovering. Detection is now
    // build-independent.
    for (const root of [p.subpathRoot, "src"]) {
      const file = resolveRelative(
        path.join(ROOT, p.dir, root, "x"),
        `./${sub}`,
      );
      if (file) return { key: spec, file };
    }
    return null;
  }
  return null;
}

const surfaceCache = new Map();
function surfaceOf(spec) {
  const entry = providerEntryFor(spec);
  if (!entry) return null;
  if (!surfaceCache.has(entry.file))
    surfaceCache.set(entry.file, providerSurface(entry.file));
  return surfaceCache.get(entry.file);
}

// ── consumer expectations ────────────────────────────────────────────────────

function computeExpectations(consumer) {
  /** @type {Record<string, {symbols:Set<string>, namespaceImports:number, files:Set<string>}>} */
  const byProvider = {};

  for (const root of consumer.roots) {
    for (const file of walkSources(path.join(ROOT, consumer.dir, root))) {
      const sf = parse(file);
      for (const stmt of sf.statements) {
        if (
          !ts.isImportDeclaration(stmt) ||
          !ts.isStringLiteral(stmt.moduleSpecifier)
        )
          continue;
        const spec = stmt.moduleSpecifier.text;
        if (!spec.startsWith("@kannan19302/")) continue;
        if (!providerEntryFor(spec)) continue;

        const rec = (byProvider[spec] ??= {
          symbols: new Set(),
          namespaceImports: 0,
          files: new Set(),
        });
        rec.files.add(path.relative(ROOT, file).split(path.sep).join("/"));

        const clause = stmt.importClause;
        if (!clause) continue;
        if (clause.name) rec.symbols.add("default");
        const b = clause.namedBindings;
        if (!b) continue;
        if (ts.isNamespaceImport(b)) rec.namespaceImports += 1;
        else
          for (const el of b.elements)
            rec.symbols.add((el.propertyName ?? el.name).text);
      }
    }
  }

  const providers = {};
  for (const [spec, rec] of Object.entries(byProvider).sort()) {
    providers[spec] = {
      symbols: [...rec.symbols].sort(),
      namespaceImports: rec.namespaceImports,
      consumingFiles: rec.files.size,
    };
  }

  return {
    $schema: "https://unierp.io/schemas/cdc-expectations.json",
    description:
      "Consumer-driven contract. What this package expects its providers to export. " +
      "Generated by scripts/ci/cdc-harness.mjs --record; replayed by providers in CI. " +
      "PLATFORM_ARCHITECTURE.md § 4.5 (M2).",
    consumer: consumer.name,
    providers,
  };
}

const expectationsPath = (consumer) =>
  path.join(ROOT, consumer.dir, "cdc", "expectations.json");
const stable = (obj) => `${JSON.stringify(obj, null, 2)}\n`;

/**
 * What actually changed between the published expectation and the computed one.
 *
 * Reports at the granularity a person fixes: providers gained or dropped,
 * symbols gained or dropped per provider, and the two scalar counts. Falls back
 * to naming the differing top-level field rather than claiming no difference,
 * because "stale, but I cannot tell you how" is still more useful than silence.
 */
function describeDrift(published, computed) {
  const lines = [];
  const pubProviders = Object.keys(published.providers ?? {});
  const newProviders = Object.keys(computed.providers ?? {});

  for (const spec of newProviders.filter((s) => !pubProviders.includes(s))) {
    lines.push(`provider added: ${spec}`);
  }
  for (const spec of pubProviders.filter((s) => !newProviders.includes(s))) {
    lines.push(`provider removed: ${spec}`);
  }

  for (const spec of newProviders.filter((s) => pubProviders.includes(s))) {
    const a = published.providers[spec];
    const b = computed.providers[spec];
    const added = b.symbols.filter((s) => !a.symbols.includes(s));
    const removed = a.symbols.filter((s) => !b.symbols.includes(s));
    if (added.length)
      lines.push(`${spec}: symbols added — ${added.join(", ")}`);
    if (removed.length)
      lines.push(`${spec}: symbols removed — ${removed.join(", ")}`);
    if (a.namespaceImports !== b.namespaceImports) {
      lines.push(
        `${spec}: namespaceImports ${a.namespaceImports} → ${b.namespaceImports}`,
      );
    }
    if (a.consumingFiles !== b.consumingFiles) {
      lines.push(
        `${spec}: consumingFiles ${a.consumingFiles} → ${b.consumingFiles}`,
      );
    }
  }

  if (lines.length === 0) {
    for (const key of ["$schema", "description", "consumer"]) {
      if (stable(published[key]) !== stable(computed[key]))
        lines.push(`${key} differs`);
    }
  }
  return lines.length ? lines : ["byte difference outside the compared fields"];
}

// ── run ──────────────────────────────────────────────────────────────────────

const results = {
  recorded: [],
  drifted: [],
  violations: [],
  openProviders: [],
  warnings: [],
};

for (const consumer of CONSUMERS) {
  if (!fs.existsSync(path.join(ROOT, consumer.dir))) continue;
  const expectations = computeExpectations(consumer);
  const file = expectationsPath(consumer);

  if (RECORD) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, stable(expectations));
    results.recorded.push(consumer.name);
    continue;
  }

  // 1. the published expectation must match what the consumer actually imports
  if (!fs.existsSync(file)) {
    results.drifted.push({
      consumer: consumer.name,
      reason: "no published expectation",
    });
  } else if (fs.readFileSync(file, "utf8") !== stable(expectations)) {
    results.drifted.push({
      consumer: consumer.name,
      reason: "published expectation is stale",
      // "Stale" alone is not actionable, and it is least actionable exactly when
      // it matters: a drift that reproduces on a Linux runner and not on a
      // Windows checkout cannot be diagnosed by re-running --record locally,
      // because locally there is nothing to see. Say what differs, so the CI log
      // is the diagnosis rather than the start of one.
      detail: describeDrift(
        JSON.parse(fs.readFileSync(file, "utf8")),
        expectations,
      ),
    });
  }

  // 2. replay every expected symbol against the provider's current surface
  for (const [spec, exp] of Object.entries(expectations.providers)) {
    const surface = surfaceOf(spec);
    if (!surface) continue;
    if (surface.open) {
      if (!results.openProviders.includes(spec))
        results.openProviders.push(spec);
      const missing = exp.symbols.filter(
        (s) => s !== "default" && !surface.symbols.has(s),
      );
      if (missing.length) {
        results.warnings.push(
          `${consumer.name} → ${spec}: ${missing.length} symbol(s) not enumerable (open surface)`,
        );
      }
      continue;
    }
    for (const symbol of exp.symbols) {
      if (symbol === "default") continue;
      if (!surface.symbols.has(symbol)) {
        results.violations.push({
          consumer: consumer.name,
          provider: spec,
          symbol,
        });
      }
    }
  }
}

if (AS_JSON) {
  console.log(JSON.stringify(results, null, 2));
  process.exit(results.violations.length || results.drifted.length ? 1 : 0);
}

console.log(
  "\nM2 — consumer-driven contracts  \x1b[2m(PLATFORM_ARCHITECTURE.md § 4.5)\x1b[0m\n",
);

if (RECORD) {
  for (const name of results.recorded) console.log(`  · recorded  ${name}`);
  console.log(
    `\n  ✅ Published ${results.recorded.length} consumer expectation(s).\n`,
  );
  process.exit(0);
}

const consumersChecked = CONSUMERS.filter((c) =>
  fs.existsSync(path.join(ROOT, c.dir)),
).length;
console.log(
  `  Replayed ${consumersChecked} consumer expectation corpora against their providers.`,
);
if (results.openProviders.length) {
  console.log(
    `  \x1b[2mOpen surfaces (absence not provable, misses are warnings): ${results.openProviders.join(", ")}\x1b[0m`,
  );
}
for (const w of results.warnings) console.log(`  \x1b[33m⚠\x1b[0m  ${w}`);

if (results.drifted.length) {
  console.log("\n  \x1b[31m✗ Published expectations are out of date:\x1b[0m");
  for (const d of results.drifted) {
    console.log(`      · ${d.consumer} — ${d.reason}`);
    for (const line of d.detail ?? []) console.log(`          ${line}`);
  }
  console.log("\n    Run: node scripts/ci/cdc-harness.mjs --record");
}

if (results.violations.length) {
  console.log(
    "\n  \x1b[31m✗ CDC violations — a consumer expects a symbol its provider no longer exports:\x1b[0m",
  );
  for (const v of results.violations) {
    console.log(
      `      · ${v.consumer} expects \x1b[1m${v.symbol}\x1b[0m from ${v.provider}`,
    );
  }
}

if (results.drifted.length || results.violations.length) {
  console.log(
    "\n  This is the break the compiler would have caught before the Phase 3 split,",
  );
  console.log(
    "  and will not catch after it. Fix the provider or update the consumer.\n",
  );
  process.exit(1);
}

console.log(
  "\n  \x1b[32m✅ Every consumer expectation is satisfied by its provider.\x1b[0m\n",
);
