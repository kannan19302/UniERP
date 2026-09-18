#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import assert from "node:assert/strict";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadActiveEstate } from "./lib/estate.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDir, "..", "..");
const policyPath = resolve(workspaceRoot, "unierp-platform/docs/standards/REPOSITORY_TOOLCHAIN_POLICY.json");
const catalogPath = resolve(workspaceRoot, "unierp-workspace/governance/active-estate.json");
const failures = [];

function parseJson(path, label) {
  if (!existsSync(path)) throw new Error(`${label} is missing at ${path}`);
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`${label} is invalid JSON at ${path}: ${error.message}`);
  }
}

function walk(directory, output = []) {
  for (const entry of readdirSync(directory)) {
    if ([".git", "node_modules", "dist", "build", ".next", "coverage", "generated", ".stryker-tmp"].includes(entry)) continue;
    const path = join(directory, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      // Prisma-generated implementation embeds the complete schema as a
      // string. It is generated proof/output, not authored package-namespace
      // source, and is independently reproduced by the database build.
      if (path === resolve(workspaceRoot, "data", "src", "main-client")) continue;
      walk(path, output);
    }
    else output.push(path);
  }
  return output;
}

function isNamespaceSource(path) {
  const base = path.split(/[\\/]/).at(-1);
  if (["REPOSITORY_AND_TOOLCHAIN_STANDARD.md", "REPOSITORY_TOOLCHAIN_POLICY.json", "UNIERP_FOUNDATION_REMEDIATION_PLAN.md", "check-repository-toolchain-policy.mjs"].includes(base)) return false;
  if (["pnpm-lock.yaml", "package-lock.json", "yarn.lock"].includes(base)) return false;
  if (["Dockerfile", ".npmrc"].includes(base)) return true;
  return [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".md", ".yml", ".yaml", ".sh", ".ps1", ".dart"].includes(extname(path));
}

function validateManifest({ repository, manifest, policy, lockExists, forbiddenLocks }) {
  const issues = [];
  if (manifest.name?.startsWith("@") && !manifest.name.startsWith(policy.canonicalPackageScope)) {
    issues.push(`${repository}: scoped package ${manifest.name} is outside canonical scope ${policy.canonicalPackageScope}`);
  }
  if (manifest.packageManager !== policy.javascript.packageManager) {
    issues.push(`${repository}: packageManager must be ${policy.javascript.packageManager}`);
  }
  if (manifest.engines?.node !== policy.javascript.nodeEngine) {
    issues.push(`${repository}: engines.node must be ${policy.javascript.nodeEngine}`);
  }
  let dependencyCount = 0;
  for (const section of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
    for (const [name] of Object.entries(manifest[section] ?? {})) {
      dependencyCount += 1;
      for (const retired of policy.retiredPackageScopes) {
        if (name.startsWith(retired)) issues.push(`${repository}: ${section} uses retired package scope ${name}`);
      }
    }
  }
  if (dependencyCount > 0 && !lockExists) issues.push(`${repository}: dependencies exist but ${policy.javascript.lockfile} is missing`);
  for (const forbidden of forbiddenLocks) issues.push(`${repository}: forbidden lockfile ${forbidden} exists`);
  return { issues, dependencyCount };
}

function retiredSourceIssues(source, displayPath, policy) {
  return policy.retiredPackageScopes
    .filter((retired) => source.includes(retired))
    .map((retired) => `retired package scope ${retired} found in ${displayPath}`);
}

const estate = loadActiveEstate({ workspaceRoot });
const policy = parseJson(policyPath, "repository toolchain policy");
const catalog = parseJson(catalogPath, "active-estate catalog");

if (process.argv.includes("--test")) {
  const valid = validateManifest({
    repository: "valid",
    manifest: {
      name: "@kannan19302/valid",
      packageManager: policy.javascript.packageManager,
      engines: { node: policy.javascript.nodeEngine },
      dependencies: { zod: "3.24.0" },
    },
    policy,
    lockExists: true,
    forbiddenLocks: [],
  });
  assert.deepEqual(valid.issues, []);
  const invalid = validateManifest({
    repository: "invalid",
    manifest: { name: "@unerp/invalid", dependencies: { "@unerp/shared": "1.0.0" } },
    policy,
    lockExists: false,
    forbiddenLocks: ["package-lock.json"],
  });
  assert.ok(invalid.issues.some((issue) => issue.includes("outside canonical scope")));
  assert.ok(invalid.issues.some((issue) => issue.includes("packageManager")));
  assert.ok(invalid.issues.some((issue) => issue.includes("engines.node")));
  assert.ok(invalid.issues.some((issue) => issue.includes("retired package scope")));
  assert.ok(invalid.issues.some((issue) => issue.includes("pnpm-lock.yaml is missing")));
  assert.ok(invalid.issues.some((issue) => issue.includes("forbidden lockfile")));
  assert.deepEqual(retiredSourceIssues("import '@kannan19302/shared'", "valid.ts", policy), []);
  assert.equal(retiredSourceIssues("import '@unerp/shared'", "invalid.ts", policy).length, 1);
  console.log("Repository/toolchain policy adversarial tests passed: canonical manifest accepted; retired scope, missing declarations/lock and forbidden lock rejected.");
  process.exit(0);
}
const catalogByRepo = new Map(catalog.repositories.map((entry) => [entry.repository, entry]));
const seenPackages = new Map();
let manifestCount = 0;
let dependencyCount = 0;
let scannedSourceCount = 0;

for (const repository of estate.names) {
  const repoRoot = resolve(workspaceRoot, repository);
  const manifestPath = resolve(repoRoot, "package.json");
  const catalogEntry = catalogByRepo.get(repository);
  if (!catalogEntry) {
    failures.push(`${repository}: missing active-estate catalog entry`);
    continue;
  }

  if (existsSync(manifestPath)) {
    manifestCount += 1;
    const manifest = parseJson(manifestPath, `${repository} manifest`);
    const expectedPackages = [manifest.name].filter(Boolean);
    if (JSON.stringify(catalogEntry.packages) !== JSON.stringify(expectedPackages)) {
      failures.push(`${repository}: catalog package identity does not match package.json (${catalogEntry.packages.join(",") || "none"} != ${manifest.name || "none"})`);
    }
    if (manifest.name) {
      if (seenPackages.has(manifest.name)) failures.push(`${repository}: duplicate package identity ${manifest.name} also owned by ${seenPackages.get(manifest.name)}`);
      seenPackages.set(manifest.name, repository);
    }
    const forbiddenLocks = policy.javascript.forbiddenLockfiles.filter((name) => existsSync(resolve(repoRoot, name)));
    const manifestResult = validateManifest({
      repository,
      manifest,
      policy,
      lockExists: existsSync(resolve(repoRoot, policy.javascript.lockfile)),
      forbiddenLocks,
    });
    dependencyCount += manifestResult.dependencyCount;
    failures.push(...manifestResult.issues);
  } else if (catalogEntry.packages.length > 0) {
    failures.push(`${repository}: catalog declares packages but package.json is missing`);
  }

  for (const path of walk(repoRoot)) {
    if (!isNamespaceSource(path)) continue;
    scannedSourceCount += 1;
    const source = readFileSync(path, "utf8");
    failures.push(...retiredSourceIssues(source, path.slice(workspaceRoot.length + 1), policy).map((issue) => `${repository}: ${issue}`));
  }
}

if (estate.names.length === 0 || manifestCount === 0 || scannedSourceCount === 0) {
  failures.push(`zero-target discovery: repositories=${estate.names.length}, manifests=${manifestCount}, sources=${scannedSourceCount}`);
}

if (failures.length > 0) {
  console.error(`Repository/toolchain policy failed (${failures.length} issue(s)):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Repository/toolchain policy verified: ${estate.names.length} repositories, ${manifestCount} manifests, ${seenPackages.size} package identities, ${dependencyCount} dependency declarations and ${scannedSourceCount} active source/configuration files.`);
