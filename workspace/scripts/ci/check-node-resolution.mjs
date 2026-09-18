#!/usr/bin/env node
/**
 * Every relative specifier a Node-loaded package emits must resolve the way
 * Node resolves it — not the way a bundler does.
 *
 * ── Why this gate exists ────────────────────────────────────────────────────
 *
 * On 2026-08-06 the API did not boot. It exited during module load with
 * `ERR_MODULE_NOT_FOUND: packages/extension-api/dist/capabilities`, because
 * `src/index.ts` said `export * from "./capabilities"` and Node's ESM loader
 * requires the extension. `packages/contracts` had the same defect in three
 * specifiers.
 *
 * `pnpm verify` was 14/14 green through the whole failure, and this is the
 * point: the root tsconfig sets `moduleResolution: "bundler"`, so the compiler
 * was explicitly told to assume extensionless specifiers resolve, and it emits
 * them unchanged. The unit suites resolve through Vite. **Every gate in the
 * pipeline reads the code through a bundler, and the only consumer that does
 * not is the runtime.** No amount of typechecking can see this, by
 * construction.
 *
 * So the gate has to model Node's resolver rather than the compiler's. It reads
 * the emitted `dist/` — the artifact that actually loads — and checks each
 * relative specifier against the algorithm Node applies to it.
 *
 * ── What it deliberately does not check ─────────────────────────────────────
 *
 * Packages consumed only by a bundler (`@kannan19302/ui`, `@kannan19302/framework` — Next.js
 * compiles both) are exempt: extensionless specifiers are correct there, and
 * failing them would be enforcing a rule their runtime does not have. The set
 * checked is derived, not listed: every `@kannan19302/*` package reachable through
 * `dependencies` from a Nest application, transitively.
 *
 * Deriving it matters. A hand-maintained list would go stale the first time a
 * package gains a dependency, which is exactly when the gate is needed.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PACKAGES = join(ROOT, "packages");

/** Applications whose runtime is Node rather than a bundler. */
const NODE_APPS = ["apps/api", "apps/idp"];

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

const packageDirByName = new Map();
for (const entry of readdirSync(PACKAGES)) {
  const manifest = join(PACKAGES, entry, "package.json");
  if (existsSync(manifest)) packageDirByName.set(readJson(manifest).name, join(PACKAGES, entry));
}

/** Every @kannan19302/* package a Node application loads, transitively. */
const nodeLoaded = new Set();
const visit = (manifestPath) => {
  if (!existsSync(manifestPath)) return;
  const deps = Object.keys(readJson(manifestPath).dependencies ?? {});
  for (const dep of deps) {
    if (!packageDirByName.has(dep) || nodeLoaded.has(dep)) continue;
    nodeLoaded.add(dep);
    visit(join(packageDirByName.get(dep), "package.json"));
  }
};
for (const app of NODE_APPS) visit(join(ROOT, app, "package.json"));

/**
 * Node's resolution for a relative specifier, in the two forms that matter.
 *
 * ESM (`import`/`export` in a `"type": "module"` package, or detected as ESM):
 * the specifier is a URL. It is used verbatim — no extension is added, no
 * directory index is tried. `./capabilities` means the file `capabilities`.
 *
 * CommonJS (`require`): extensions are appended and `index.js` is tried inside
 * a directory. Both are accepted here, because both genuinely work.
 */
const resolvesAsEsm = (fromFile, specifier) => existsSync(resolve(dirname(fromFile), specifier));

const resolvesAsCjs = (fromFile, specifier) => {
  const base = resolve(dirname(fromFile), specifier);
  if (existsSync(base) && statSync(base).isFile()) return true;
  for (const ext of [".js", ".cjs", ".mjs", ".json", ".node"]) {
    if (existsSync(base + ext)) return true;
  }
  return existsSync(join(base, "index.js")) || existsSync(join(base, "index.cjs"));
};

/**
 * Two exclusions, both narrow and both stated rather than assumed.
 *
 * Generated Prisma client output is vendor code with bundler-only specifiers
 * (`./query_engine_bg.wasm?module`) that Node never loads — the edge and wasm
 * loaders exist for runtimes we do not target.
 *
 * Compiled test files should not be in `dist` at all, but they are, and they
 * are never loaded by the application. Failing on them would make this gate
 * report a packaging-hygiene problem as a runtime one and bury the signal it
 * exists for.
 */
const IGNORED_DIR = /(?:^|[\\/])(?:idp-client|\.prisma|generated)(?:[\\/]|$)/;
const IS_TEST = /\.(?:test|spec)\.[cm]?js$/;

const walk = function* (dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORED_DIR.test(path)) yield* walk(path);
    } else if (/\.[cm]?js$/.test(entry.name) && !IS_TEST.test(entry.name)) {
      yield path;
    }
  }
};

/**
 * `from "./x"` in an import, export, or dynamic import, plus CommonJS
 * `require("./x")`. Deliberately textual: the emitted files are the artifact,
 * parsing them with a real parser would need a dependency this script must not
 * have, and a specifier that a regex cannot see is one Node cannot see either.
 */
const SPECIFIER = /(?:from\s*|import\s*\(\s*|require\s*\(\s*)["'](\.[^"']*)["']/g;

const violations = [];
let filesChecked = 0;

for (const name of [...nodeLoaded].sort()) {
  const dir = packageDirByName.get(name);
  const manifest = readJson(join(dir, "package.json"));
  const dist = join(dir, "dist");

  if (!existsSync(dist)) continue; // not built; the Build gate owns that

  // A package with `"type": "module"` is unambiguously ESM. Without it, Node
  // still selects the ESM loader when it detects ESM syntax (>= 22.7), so an
  // emitted `import`/`export` statement means ESM rules apply either way.
  const declaredEsm = manifest.type === "module";

  for (const file of walk(dist)) {
    filesChecked += 1;
    const source = readFileSync(file, "utf8");
    const isEsm = declaredEsm || /^\s*(?:import|export)\s/m.test(source);
    const resolver = isEsm ? resolvesAsEsm : resolvesAsCjs;

    for (const [, specifier] of source.matchAll(SPECIFIER)) {
      if (resolver(file, specifier)) continue;
      violations.push({
        package: name,
        file: file.slice(ROOT.length + 1).replace(/\\/g, "/"),
        specifier,
        mode: isEsm ? "ESM" : "CommonJS",
        hint:
          isEsm && resolvesAsCjs(file, specifier)
            ? `resolves under CommonJS but not ESM — write "${specifier}.js"`
            : "target does not exist",
      });
    }
  }
}

if (violations.length === 0) {
  console.log(
    `  ✓ ${filesChecked} emitted files across ${nodeLoaded.size} Node-loaded packages resolve under Node`,
  );
  process.exit(0);
}

console.error(`\n  ${violations.length} specifier(s) the runtime cannot resolve:\n`);
for (const v of violations) {
  console.error(`  ${v.file}`);
  console.error(`      ${v.mode}  "${v.specifier}"  — ${v.hint}\n`);
}
console.error(
  "  These pass typecheck and every unit suite: the root tsconfig sets\n" +
    '  moduleResolution "bundler", and the test runner resolves through Vite.\n' +
    "  Node does not. The application will exit during module load.\n",
);
process.exit(1);
