#!/usr/bin/env node
/**
 * Build and publish every `@kannan19302/*` package from its own repository, in
 * dependency order, and update each dependent's pinned range as it goes.
 *
 * This is the mechanical half of § 14 Phase 3 step 4. § 4.5's M3 choreography
 * bot is supposed to do this continuously — "merging a change in a lower layer
 * automatically opens version-bump PRs in every direct dependent, in dependency
 * order". M3 exists as a workflow but had never executed its own body until
 * today, so the first cutover has to be driven by hand. This script is that
 * hand, written down.
 *
 * The order is **derived from the manifests**, not listed. A hand-written order
 * is wrong the first time a package gains a dependency, and that is exactly
 * when publishing in the wrong order does damage: a dependent published against
 * a version of its provider that does not exist yet installs the previous one,
 * silently.
 *
 *   node scripts/tools/publish-layers.mjs           # report the order, change nothing
 *   node scripts/tools/publish-layers.mjs --write   # bump, build, publish
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const WORKSPACE = join(fileURLToPath(new URL(".", import.meta.url)), "..", "..");
const ROOT = join(WORKSPACE, "..");
const REGISTRY = process.env.UNIERP_REGISTRY ?? "http://localhost:4873/";
const WRITE = process.argv.includes("--write");

/** Repositories that publish an npm artifact. Applications do not. */
const PACKAGE_REPOS = [
  "unierp-contracts",
  "unierp-config",
  "unierp-shared",
  "unierp-kernel",
  "unierp-sdk",
  "unierp-design-system",
  "unierp-data",
  "unierp-auth",
  "unierp-service-kit",
  "unierp-extension-api",
  "unierp-sandbox",
  "unierp-framework",
  "unierp-blockchain",
];

/** Everything that consumes a published package, including the applications. */
const CONSUMER_REPOS = [
  ...PACKAGE_REPOS,
  "unierp-api",
  "unierp-idp",
  "unierp-web",
  "unierp-console",
  "unierp-developer",
];

const manifestPath = (repo) => join(ROOT, repo, "package.json");
const readManifest = (repo) => JSON.parse(readFileSync(manifestPath(repo), "utf8"));
const writeManifest = (repo, m) =>
  writeFileSync(manifestPath(repo), `${JSON.stringify(m, null, 2)}\n`);

const byName = new Map();
for (const repo of PACKAGE_REPOS) {
  if (!existsSync(manifestPath(repo))) continue;
  byName.set(readManifest(repo).name, repo);
}

const depsOf = (repo) => {
  const m = readManifest(repo);
  return Object.keys({ ...m.dependencies, ...m.devDependencies, ...m.peerDependencies })
    .filter((d) => byName.has(d))
    .map((d) => byName.get(d))
    .filter((r) => r !== repo);
};

// Topological order. A cycle here would be a § 4.2 layering violation, so it is
// reported as one rather than worked around.
const order = [];
const state = new Map();
const visit = (repo, trail = []) => {
  if (state.get(repo) === "done") return;
  if (state.get(repo) === "visiting") {
    throw new Error(`Dependency cycle — a § 4.2 layering violation: ${[...trail, repo].join(" → ")}`);
  }
  state.set(repo, "visiting");
  for (const d of depsOf(repo)) visit(d, [...trail, repo]);
  state.set(repo, "done");
  order.push(repo);
};
for (const repo of PACKAGE_REPOS) if (existsSync(manifestPath(repo))) visit(repo);

const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, encoding: "utf8", stdio: "pipe", shell: true });

console.log(`\n  Publish order (derived from the manifests), registry ${REGISTRY}\n`);
const published = {};
let failed = 0;

for (const repo of order) {
  const before = readManifest(repo);
  if (!WRITE) {
    console.log(`  ${repo.padEnd(24)} ${before.name}@${before.version}  ← would bump, build, publish`);
    continue;
  }

  try {
    // Pin this repo's own @kannan19302 deps to what was just published, so a package
    // never ships a range that resolves to a version older than the artifact it
    // was actually built against.
    const m = readManifest(repo);
    let repinned = 0;
    for (const field of ["dependencies", "devDependencies", "peerDependencies"]) {
      for (const [name, range] of Object.entries(m[field] ?? {})) {
        if (!published[name] || typeof range !== "string") continue;
        const next = `^${published[name]}`;
        if (range !== next) {
          m[field][name] = next;
          repinned += 1;
        }
      }
    }
    if (repinned) writeManifest(repo, m);

    run("npm", ["install", "--no-audit", "--no-fund"], join(ROOT, repo));
    if (m.scripts?.build) run("npm", ["run", "build"], join(ROOT, repo));
    run("npm", ["version", "patch", "--no-git-tag-version"], join(ROOT, repo));
    const version = readManifest(repo).version;
    run("npm", ["publish", "--registry", REGISTRY], join(ROOT, repo));
    published[before.name] = version;
    console.log(`  ${repo.padEnd(24)} ✓ ${before.name}@${version}${repinned ? `  (repinned ${repinned})` : ""}`);
  } catch (error) {
    failed += 1;
    const detail = (error.stdout || error.stderr || error.message || "").toString().trim().split("\n").slice(-3).join(" | ");
    console.log(`  ${repo.padEnd(24)} ✗ ${detail}`);
  }
}

// Applications consume but do not publish; they still need the new versions.
if (WRITE && failed === 0) {
  console.log("");
  for (const repo of CONSUMER_REPOS.filter((r) => !PACKAGE_REPOS.includes(r))) {
    if (!existsSync(manifestPath(repo))) continue;
    const m = readManifest(repo);
    let repinned = 0;
    for (const field of ["dependencies", "devDependencies", "peerDependencies"]) {
      for (const [name, range] of Object.entries(m[field] ?? {})) {
        if (!published[name] || typeof range !== "string") continue;
        const next = `^${published[name]}`;
        if (range !== next) {
          m[field][name] = next;
          repinned += 1;
        }
      }
    }
    if (repinned) writeManifest(repo, m);
    console.log(`  ${repo.padEnd(24)} repinned ${repinned} dependency range(s)`);
  }
}

console.log(`\n  ${order.length} package repo(s)${WRITE ? `, ${failed} failed` : ""}.\n`);
process.exit(failed ? 1 : 0);
