#!/usr/bin/env node
/**
 * Mirror the monorepo's authoritative tree into the extracted repositories, and
 * turn `workspace:*` into versions a registry can actually resolve.
 *
 * This is § 14 Phase 3 **step 4** — "switch consumers to the published package,
 * then delete from the monorepo" — for the application and package layers, and
 * it is the step that has been deferred since the extractions were made.
 *
 * ── Why a script rather than a one-time hand edit ───────────────────────────
 *
 * The extractions were `git filter-repo` snapshots. Everything committed to
 * `ERPSys` afterwards — including the packaging fixes that made the API boot at
 * all — landed only in the monorepo, so every extracted repo drifted behind by
 * exactly the work that made the platform run. Measured before this ran: 19
 * files in `unierp-api`, 394 in `unierp-web`, 2 in `unierp-idp`, and 82 across
 * the package repos. Nothing was missing on either side; it was all content
 * drift.
 *
 * Drift of that shape recurs every time the two topologies coexist, which they
 * must until the cutover completes. A script makes the sync repeatable and
 * reviewable; a hand edit makes it a thing someone did once and cannot repeat.
 *
 * ── What it deliberately does not touch ─────────────────────────────────────
 *
 * Each extracted repo owns its identity: README, LICENCE, SECURITY,
 * CONTRIBUTING, `.github/`, and its `cdc/expectations.json`. Those are written
 * for the repo, not copied from the monorepo, and overwriting them would undo
 * the § 4.6 work. Only source, tests and build configuration are mirrored.
 *
 *   node scripts/tools/sync-from-monorepo.mjs            # report only
 *   node scripts/tools/sync-from-monorepo.mjs --write    # apply
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const WORKSPACE = join(fileURLToPath(new URL(".", import.meta.url)), "..", "..");
const ROOT = join(WORKSPACE, "..");
const MONO = join(ROOT, "ERPSys");
const WRITE = process.argv.includes("--write");

/** repo → [monorepo source, directories and files to mirror] */
const MAP = [
  // L0–L2
  ["unierp-contracts", "packages/contracts", ["src"]],
  ["unierp-kernel", "packages/kernel", ["src"]],
  ["unierp-sdk", "packages/sdk", ["src"]],
  ["unierp-config", "packages/config", ["prettier", "typescript"]],
  ["unierp-shared", "packages/shared", ["src"]],
  ["unierp-auth", "packages/auth", ["src"]],
  ["unierp-service-kit", "packages/service-kit", ["src"]],
  ["unierp-blockchain", "packages/blockchain", ["src"]],
  ["unierp-design-system", "packages/ui", ["src", "scripts"]],
  ["unierp-data", "packages/database", ["src", "prisma", "scripts"]],
  ["unierp-framework", "packages/framework", ["src"]],
  ["unierp-extension-api", "packages/extension-api", ["src"]],
  ["unierp-sandbox", "packages/sandbox", ["src"]],
  // L3–L4
  ["unierp-api", "apps/api", ["src", "test"]],
  ["unierp-idp", "apps/idp", ["src"]],
  ["unierp-web", "apps/web", ["src", "app", "e2e", "public"]],
  ["unierp-console", "apps/console", ["src", "app"]],
  ["unierp-developer", "apps/developer", ["src"]],
];

/**
 * Build config that belongs to the package, not to the workspace. Copied when
 * present on the monorepo side; a repo that does not have one keeps its own.
 */
const CONFIG_FILES = [
  "nest-cli.json",
  "next.config.mjs",
  "middleware.ts",
  "playwright.config.ts",
  "vitest.config.ts",
  "vitest.integration.config.ts",
  ".dependency-cruiser.cjs",
  "prisma.config.ts",
];

const SKIP_DIR = new Set([
  "node_modules",
  "dist",
  ".next",
  ".turbo",
  "coverage",
  ".git",
]);

const walk = (dir, base, out = []) => {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIR.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, base, out);
    else out.push(relative(base, p).split(sep).join("/"));
  }
  return out;
};

// Compare and write LF. The monorepo is checked out with `core.autocrlf=true`,
// so a byte comparison reports every file as different on Windows and a byte
// copy would commit CRLF into repos whose history is LF. Normalising here keeps
// the sync honest about what actually changed.
const readNorm = (p) => {
  try {
    return readFileSync(p, "utf8").replace(/\r\n/g, "\n");
  } catch {
    return null;
  }
};

/** Published versions, so `workspace:*` can be replaced with something real. */
function publishedVersions() {
  const versions = {};
  for (const [repo, monoPath] of MAP) {
    const manifest = join(MONO, monoPath, "package.json");
    if (!existsSync(manifest)) continue;
    const { name } = JSON.parse(readFileSync(manifest, "utf8"));
    const splitManifest = join(ROOT, repo, "package.json");
    if (!existsSync(splitManifest)) continue;
    const { version } = JSON.parse(readFileSync(splitManifest, "utf8"));
    if (name && version) versions[name] = version;
  }
  return versions;
}

let filesChanged = 0;
let depsRewritten = 0;
const report = [];

const versions = publishedVersions();

for (const [repo, monoPath, roots] of MAP) {
  const src = join(MONO, monoPath);
  const dest = join(ROOT, repo);
  if (!existsSync(src) || !existsSync(dest)) {
    report.push(`${repo.padEnd(24)} SKIPPED — ${!existsSync(src) ? "no monorepo source" : "no repo"}`);
    continue;
  }

  let changed = 0;
  for (const root of roots) {
    for (const rel of walk(join(src, root), src)) {
      const from = join(src, rel);
      const to = join(dest, rel);
      const a = readNorm(from);
      const b = readNorm(to);
      if (a === null || a === b) continue;
      changed += 1;
      if (WRITE) {
        mkdirSync(dirname(to), { recursive: true });
        writeFileSync(to, a);
      }
    }
  }
  for (const f of CONFIG_FILES) {
    const from = join(src, f);
    if (!existsSync(from)) continue;
    const a = readNorm(from);
    if (a === readNorm(join(dest, f))) continue;
    changed += 1;
    if (WRITE) writeFileSync(join(dest, f), a);
  }

  // `workspace:*` names a protocol only a workspace understands. Outside one,
  // `npm install` fails with EUNSUPPORTEDPROTOCOL, which is why these repos
  // were extracted-but-not-installable. Pin to the version the repo publishes.
  const manifestPath = join(dest, "package.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  let rewrote = 0;
  for (const field of ["dependencies", "devDependencies", "peerDependencies"]) {
    const deps = manifest[field];
    if (!deps) continue;
    for (const [name, range] of Object.entries(deps)) {
      if (typeof range !== "string" || !range.startsWith("workspace:")) continue;
      const published = versions[name];
      if (!published) {
        report.push(`${repo.padEnd(24)} ⚠ ${name} is workspace:* and has no published version`);
        continue;
      }
      deps[name] = `^${published}`;
      rewrote += 1;
    }
  }
  if (rewrote && WRITE) {
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }

  filesChanged += changed;
  depsRewritten += rewrote;
  report.push(
    `${repo.padEnd(24)} files=${String(changed).padStart(4)}  workspace-deps-pinned=${rewrote}`,
  );
}

console.log(`\n  Sync from monorepo — ${WRITE ? "APPLYING" : "report only, pass --write to apply"}\n`);
for (const line of report) console.log("  " + line);
console.log(`\n  ${filesChanged} file(s) differ, ${depsRewritten} workspace dependency range(s) to pin.\n`);
