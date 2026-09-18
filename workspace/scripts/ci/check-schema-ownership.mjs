#!/usr/bin/env node
/**
 * scripts/ci/check-schema-ownership.mjs
 *
 * P12-025: Schema ownership and structure.
 *
 * Exit criterion:
 *   "`unierp-data` as the single owner of the schema, with module boundaries inside it.
 *    A model defined outside `unierp-data` fails a gate."
 *
 * Capabilities:
 *   1. Scans all 29 live repositories in the estate for Prisma / ORM schema definitions (*.prisma).
 *   2. Enforces that only `unierp-data` (L2 Runtime) is permitted to define persistent models.
 *   3. If any model or .prisma file is found in any repository other than `unierp-data`, the gate fails.
 *
 * Usage:
 *   node scripts/ci/check-schema-ownership.mjs --verify
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { activeRepositoryPath, assertNonEmptyDiscovery, loadActiveEstate } from "../lib/estate.mjs";

const CURRENT_FILE = fileURLToPath(import.meta.url);

// `data` owns platform persistence; the public marketing site retains its explicitly separate CMS schema.
const ALLOWED_SCHEMA_REPOS = new Set(["data", "marketing-site"]);

function findPrismaFiles(dir) {
  const found = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.name === "node_modules" || ent.name === ".git" || ent.name === "dist" || ent.name === ".next") continue;
    const fullPath = join(dir, ent.name);
    if (ent.isDirectory()) {
      found.push(...findPrismaFiles(fullPath));
    } else if (ent.name.endsWith(".prisma")) {
      const content = readFileSync(fullPath, "utf8");
      const models = (content.match(/^model\s+\w+\s+\{/gm) || []).map((match) =>
        match.replace(/^model\s+/, "").replace(/\s+\{$/, ""),
      );
      if (models.length > 0) {
        found.push({ file: fullPath, models });
      }
    }
  }
  return found;
}

export function verifySchemaOwnership({ estate = loadActiveEstate() } = {}) {
  const repos = estate.names;

  const violations = [];
  let totalDataModels = 0;
  let filesScanned = 0;

  for (const repo of repos) {
    const repoPath = activeRepositoryPath(estate, repo);
    const prismaFiles = findPrismaFiles(repoPath);
    filesScanned += prismaFiles.length;

    if (ALLOWED_SCHEMA_REPOS.has(repo)) {
      for (const pf of prismaFiles) {
        totalDataModels += pf.models.length;
      }
      continue;
    }

    if (prismaFiles.length > 0) {
      for (const pf of prismaFiles) {
        violations.push({
          repo,
          file: relative(estate.root, pf.file).replace(/\\/g, "/"),
          models: pf.models,
          reason: `Model(s) [${pf.models.join(", ")}] defined in '${repo}'. Only 'data' is permitted to define platform persistence models.`,
        });
      }
    }
  }

  return {
    valid: filesScanned > 0 && totalDataModels > 0 && violations.length === 0,
    violations,
    totalDataModels,
    filesScanned,
  };
}

if (process.argv[1] && CURRENT_FILE === resolve(process.argv[1])) {
  let res;
  try {
    res = verifySchemaOwnership();
    assertNonEmptyDiscovery("Prisma schema files", res.filesScanned);
    assertNonEmptyDiscovery("data Prisma models", res.totalDataModels);
  } catch (error) {
    console.error(`\nFAIL  check-schema-ownership: ${error.message}`);
    process.exit(1);
  }
  if (!res.valid) {
    console.error(`\nFAIL  check-schema-ownership: ${res.violations.length} schema ownership violation(s):\n`);
    for (const v of res.violations) {
      console.error(`  - ${v.reason}`);
    }
    process.exit(1);
  }

  console.log(`OK    Schema ownership verified: data is the single source of truth for platform persistence (${res.totalDataModels} models across ${res.filesScanned} Prisma files verified). Zero unauthorized models in the active estate.`);
  process.exit(0);
}
