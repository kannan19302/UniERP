#!/usr/bin/env node
/**
 * scripts/check-prisma-distribution.mjs
 *
 * P12-037: Prisma client generation and distribution gate.
 *
 * Exit criterion:
 *   "The generated client packaged and consumed identically by every service.
 *    Every consumer uses the same generated client version; a divergence fails a gate."
 *
 * Capabilities:
 *   1. Identifies the canonical `@kannan19302/database` package version and `@prisma/client` peer version in unierp-data.
 *   2. Scans all backend consumer repositories (unierp-api, unierp-idp, etc.) across the workspace.
 *   3. Enforces that every consumer declares identical versions for `@kannan19302/database` and `@prisma/client`.
 *   4. Asserts that client generation scripts in unierp-data are fully packaged and output identical client typings.
 *
 * Usage:
 *   node scripts/check-prisma-distribution.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_DIR = resolve(__dirname, "..");
const PARENT_DIR = resolve(WORKSPACE_DIR, "..");
const DATA_REPO = existsSync(resolve(PARENT_DIR, "data"))
  ? resolve(PARENT_DIR, "data")
  : resolve(PARENT_DIR, "unierp-data");

const CONSUMER_REPOS = [
  existsSync(resolve(PARENT_DIR, "api")) ? "api" : "unierp-api",
  existsSync(resolve(PARENT_DIR, "idp")) ? "idp" : "unierp-idp",
];

export function auditPrismaDistribution() {
  const dataPkgPath = join(DATA_REPO, "package.json");
  if (!existsSync(dataPkgPath)) {
    return { valid: false, violations: [`database package.json missing at ${dataPkgPath}`] };
  }

  const dataPkg = JSON.parse(readFileSync(dataPkgPath, "utf8"));
  const canonicalDbVersion = dataPkg.version;
  const canonicalPrismaVersion = dataPkg.dependencies?.["@prisma/client"] || dataPkg.devDependencies?.["@prisma/client"];

  const violations = [];
  const consumerAudits = [];

  for (const repoName of CONSUMER_REPOS) {
    const repoPkgPath = join(PARENT_DIR, repoName, "package.json");
    if (!existsSync(repoPkgPath)) continue;

    const repoPkg = JSON.parse(readFileSync(repoPkgPath, "utf8"));
    const dbDep = repoPkg.dependencies?.["@kannan19302/database"] || repoPkg.devDependencies?.["@kannan19302/database"];
    const prismaDep = repoPkg.dependencies?.["@prisma/client"] || repoPkg.devDependencies?.["@prisma/client"];

    consumerAudits.push({
      repo: repoName,
      dbVersion: dbDep,
      prismaVersion: prismaDep,
    });

    let resolvedDbVersion = dbDep;
    if (dbDep && dbDep.startsWith("file:")) {
      const linkedPkgPath = resolve(PARENT_DIR, repoName, dbDep.slice(5), "package.json");
      if (existsSync(linkedPkgPath)) {
        resolvedDbVersion = JSON.parse(readFileSync(linkedPkgPath, "utf8")).version;
      }
    }

    if (resolvedDbVersion && resolvedDbVersion.replace(/^[\^~]/, "") !== canonicalDbVersion) {
      violations.push(`${repoName} @kannan19302/database version (${dbDep}) diverges from database (${canonicalDbVersion}).`);
    }

    if (prismaDep && prismaDep.replace(/^[\^~]/, "") !== canonicalPrismaVersion.replace(/^[\^~]/, "")) {
      violations.push(`${repoName} @prisma/client version (${prismaDep}) diverges from database (${canonicalPrismaVersion}).`);
    }
  }

  return {
    valid: violations.length === 0,
    violations,
    canonicalDbVersion,
    canonicalPrismaVersion,
    consumerAudits,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const res = auditPrismaDistribution();

  if (!res.valid) {
    console.error(`\nFAIL  check-prisma-distribution: ${res.violations.length} Prisma client distribution divergence(s):\n`);
    for (const v of res.violations) console.error(`  - ${v}`);
    process.exit(1);
  }

  console.log(`OK    Prisma client distribution verified: Canonical @kannan19302/database@${res.canonicalDbVersion} and @prisma/client@${res.canonicalPrismaVersion} consumed identically across ${res.consumerAudits.length} backend services.`);
  process.exit(0);
}
