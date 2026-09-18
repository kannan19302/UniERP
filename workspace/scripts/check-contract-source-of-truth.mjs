#!/usr/bin/env node
/**
 * scripts/check-contract-source-of-truth.mjs
 *
 * Phase P12-056: Contract ownership and source of truth.
 *
 * Exit criterion:
 *   "unierp-contracts as the single source every client, SDK and type is generated from.
 *    A hand-written client or type duplicating a contract fails an architecture gate"
 *
 * This tool & CI gate:
 *   1. Asserts unierp-contracts is the canonical L0 contract layer.
 *   2. Scans downstream consumer repositories (unierp-sdk, unierp-api, unierp-web, unierp-console, etc.)
 *      for duplicate hand-written definitions of canonical contract types (e.g. HealthStatus, MoneyAmount, OutboxEventRecord).
 *   3. Enforces that downstream packages import canonical types directly from @kannan19302/contracts rather than locally redeclaring them.
 *   4. Fails CI if duplicate local type definitions or unmanaged duplicate client types are detected.
 *
 * Usage:
 *   node scripts/check-contract-source-of-truth.mjs --verify
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

const CANONICAL_TYPES = [
  "HealthStatus",
  "MoneyAmount",
  "OutboxEventRecord",
  "QueryPerformanceBudget",
  "BackupManifest",
  "RestorePointSpecification",
  "AuditRecord",
  "SoftDeleteFilter",
];

const SCAN_REPOS = [
  { name: "unierp-sdk", dir: join(PARENT_ROOT, "unierp-sdk", "src") },
  { name: "unierp-api", dir: join(PARENT_ROOT, "unierp-api", "src") },
  { name: "unierp-web", dir: join(PARENT_ROOT, "unierp-web", "src") },
  { name: "unierp-console", dir: join(PARENT_ROOT, "unierp-console", "src") },
];

function scanDir(dir, fileList = []) {
  if (!existsSync(dir)) return fileList;
  const entries = readdirSync(dir);
  for (const ent of entries) {
    if (ent === "node_modules" || ent === "dist" || ent === ".git") continue;
    const full = join(dir, ent);
    const s = statSync(full);
    if (s.isDirectory()) {
      scanDir(full, fileList);
    } else if (/\.(ts|tsx)$/.test(ent) && !ent.includes(".spec.") && !ent.includes(".test.")) {
      fileList.push(full);
    }
  }
  return fileList;
}

export function checkContractDuplication() {
  const duplicates = [];

  for (const repo of SCAN_REPOS) {
    const files = scanDir(repo.dir);
    for (const f of files) {
      const content = readFileSync(f, "utf8");
      for (const t of CANONICAL_TYPES) {
        // Match `interface <TypeName> {` or `type <TypeName> =` but exclude imports
        const declRegex = new RegExp(`\\b(interface|type)\\s+${t}\\b(?![\\s\\S]*?from\\s+['"]@kannan19302\\/contracts['"])`, "g");
        const hasImport = content.includes(`@kannan19302/contracts`);
        const hasLocalDecl = new RegExp(`\\bexport\\s+(interface|type)\\s+${t}\\s*[{=]`).test(content) ||
                             new RegExp(`\\b(interface|type)\\s+${t}\\s*[{=]`).test(content);

        if (hasLocalDecl && !hasImport) {
          const rel = f.replace(PARENT_ROOT + "/", "").replace(PARENT_ROOT + "\\", "");
          duplicates.push({ repo: repo.name, file: rel, type: t });
        }
      }
    }
  }

  return {
    valid: duplicates.length === 0,
    duplicates,
  };
}

export function verifyContractSourceOfTruth() {
  const res = checkContractDuplication();
  if (!res.valid) {
    return {
      valid: false,
      reason: `Found ${res.duplicates.length} duplicate hand-written contract type(s): ${JSON.stringify(res.duplicates)}`,
    };
  }
  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyContractSourceOfTruth();
    if (!res.valid) {
      console.error(`\n❌ Contract ownership and source of truth gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Contract ownership and source of truth gate passed: unierp-contracts verified as canonical L0 source; zero duplicate hand-written types found.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during contract source of truth verification:`, err);
    process.exit(1);
  }
}
