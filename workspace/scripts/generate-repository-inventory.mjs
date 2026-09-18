#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadActiveEstate } from "./lib/estate.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDir, "..", "..");
const catalogPath = resolve(workspaceRoot, "unierp-workspace/governance/active-estate.json");
const outputPath = resolve(workspaceRoot, "unierp-workspace/governance/generated/repository-package-dependency-inventory.md");
const checkMode = process.argv.includes("--check");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function gitHead(path) {
  try {
    return execFileSync("git", ["-C", path, "rev-parse", "--short=12", "HEAD"], { encoding: "utf8" }).trim();
  } catch {
    return "UNAVAILABLE";
  }
}

const estate = loadActiveEstate({ workspaceRoot });
const catalog = readJson(catalogPath);
const catalogByRepo = new Map(catalog.repositories.map((entry) => [entry.repository, entry]));
const packageOwners = new Map();
const repositories = [];

for (const repository of estate.names) {
  const root = resolve(workspaceRoot, repository);
  const manifestPath = resolve(root, "package.json");
  const manifest = existsSync(manifestPath) ? readJson(manifestPath) : null;
  const catalogEntry = catalogByRepo.get(repository);
  if (!catalogEntry) throw new Error(`${repository}: missing active-estate catalog entry`);
  if (manifest?.name) {
    if (packageOwners.has(manifest.name)) throw new Error(`duplicate package identity ${manifest.name}`);
    packageOwners.set(manifest.name, repository);
  }
  repositories.push({
    repository,
    layer: catalogEntry.layer,
    packages: catalogEntry.packages,
    manifest,
    head: gitHead(root),
    lock: existsSync(resolve(root, "pnpm-lock.yaml")) ? "pnpm-lock.yaml" : "—",
  });
}

const repoByName = new Map(repositories.map((entry) => [entry.repository, entry]));
const edges = [];
for (const from of repositories) {
  if (!from.manifest) continue;
  for (const section of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
    for (const [packageName, range] of Object.entries(from.manifest[section] ?? {})) {
      const targetRepository = packageOwners.get(packageName);
      if (!targetRepository) continue;
      const to = repoByName.get(targetRepository);
      edges.push({
        from: from.repository,
        fromLayer: from.layer,
        to: to.repository,
        toLayer: to.layer,
        packageName,
        section,
        range,
      });
    }
  }
}
edges.sort((a, b) => `${a.from}\0${a.to}\0${a.section}`.localeCompare(`${b.from}\0${b.to}\0${b.section}`));

const upward = edges.filter((edge) =>
  edge.fromLayer !== null && edge.toLayer !== null && Number(edge.toLayer) > Number(edge.fromLayer),
);
if (upward.length > 0) {
  throw new Error(`upward dependency direction violation(s): ${upward.map((edge) => `${edge.from}(L${edge.fromLayer})->${edge.to}(L${edge.toLayer})`).join(", ")}`);
}

const adjacency = new Map(repositories.map((entry) => [entry.repository, new Set()]));
for (const edge of edges) adjacency.get(edge.from).add(edge.to);
const visiting = new Set();
const visited = new Set();
const stack = [];
function visit(repository) {
  if (visiting.has(repository)) {
    const cycleStart = stack.indexOf(repository);
    throw new Error(`repository dependency cycle: ${[...stack.slice(cycleStart), repository].join(" -> ")}`);
  }
  if (visited.has(repository)) return;
  visiting.add(repository);
  stack.push(repository);
  for (const target of adjacency.get(repository)) visit(target);
  stack.pop();
  visiting.delete(repository);
  visited.add(repository);
}
for (const repository of estate.names) visit(repository);

if (repositories.length === 0 || packageOwners.size === 0 || edges.length === 0) {
  throw new Error(`zero-target inventory: repositories=${repositories.length}, packages=${packageOwners.size}, edges=${edges.length}`);
}

const lines = [
  "# Repository, package and dependency inventory",
  "",
  "Generated artifact — do not edit by hand.  ",
  "Sources: `UniERP.code-workspace`, `unierp-workspace/governance/active-estate.json`, active `package.json` manifests and repository Git heads.  ",
  "Command: `node scripts/generate-repository-inventory.mjs` from `unierp-workspace`.  ",
  "Freshness check: `node scripts/generate-repository-inventory.mjs --check`.",
  "",
  `Summary: ${repositories.length} active repositories, ${packageOwners.size} package identities and ${edges.length} internal dependency declarations. Upward edges: 0. Cycles: 0.`,
  "",
  "## Active repositories and toolchains",
  "",
  "| Repository | Layer | Package identity | Git head | Package manager | Node engine | Lock |",
  "| --- | ---: | --- | --- | --- | --- | --- |",
];
for (const entry of repositories) {
  lines.push(`| ${entry.repository} | ${entry.layer === null ? "—" : `L${entry.layer}`} | ${entry.packages.join(", ") || "—"} | ${entry.head} | ${entry.manifest?.packageManager ?? "—"} | ${entry.manifest?.engines?.node ?? "—"} | ${entry.lock} |`);
}
lines.push("", "## Internal package dependencies", "", "| From | Layer | To | Layer | Package | Section | Declared range |", "| --- | ---: | --- | ---: | --- | --- | --- |");
for (const edge of edges) {
  lines.push(`| ${edge.from} | L${edge.fromLayer} | ${edge.to} | L${edge.toLayer} | ${edge.packageName} | ${edge.section} | ${String(edge.range).replaceAll("|", "\\|")} |`);
}
lines.push("", "## Interpretation", "", "This inventory proves only declared repository/package topology at the recorded Git heads. It does not prove runtime integration, contract compatibility, release publication or production deployment.", "");
const output = `${lines.join("\n")}\n`;

if (checkMode) {
  if (!existsSync(outputPath)) {
    console.error(`Repository inventory is missing at ${outputPath}`);
    process.exit(1);
  }
  if (readFileSync(outputPath, "utf8").replaceAll("\r\n", "\n") !== output) {
    console.error(`Repository inventory is stale: ${relative(workspaceRoot, outputPath)}`);
    process.exit(1);
  }
  console.log(`Repository inventory is current: ${repositories.length} repositories, ${packageOwners.size} packages, ${edges.length} internal dependencies, zero upward edges and zero cycles.`);
  process.exit(0);
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, output, "utf8");
console.log(`Wrote ${relative(workspaceRoot, outputPath)}: ${repositories.length} repositories, ${packageOwners.size} packages and ${edges.length} internal dependencies.`);
