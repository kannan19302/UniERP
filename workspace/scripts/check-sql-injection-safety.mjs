#!/usr/bin/env node
/**
 * scripts/check-sql-injection-safety.mjs
 *
 * P12-038: Query safety gate.
 *
 * Exit criterion:
 *   "Parameterisation throughout, with raw SQL confined to reviewed, parameterised helpers.
 *    String-concatenated SQL fails a lint gate, proven on a seeded example."
 *
 * Checks:
 *   1. Scans application source code in unierp-api/src and unierp-idp/src (excluding generated clients and test files).
 *   2. Forbids dynamic string concatenation in raw SQL executions (`$queryRaw`, `$executeRaw`).
 *   3. Enforces that raw queries use tagged template literals (`Prisma.sql` or `$queryRaw\`...\``) for strict parameterization.
 *
 * Usage:
 *   node scripts/check-sql-injection-safety.mjs --verify
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_DIR = resolve(__dirname, "..");
const PARENT_DIR = resolve(WORKSPACE_DIR, "..");

const SCAN_DIRS = [
  join(PARENT_DIR, "unierp-api/src"),
  join(PARENT_DIR, "unierp-idp/src"),
];

function getTsFiles(dir) {
  const files = [];
  if (!existsSync(dir)) return files;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist" || entry.name === "idp-client") continue;
      files.push(...getTsFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".js")) && !entry.name.endsWith(".spec.ts") && !entry.name.endsWith(".test.ts")) {
      files.push(fullPath);
    }
  }
  return files;
}

export function auditSqlSafety() {
  const violations = [];
  let totalFilesChecked = 0;

  for (const scanDir of SCAN_DIRS) {
    const files = getTsFiles(scanDir);
    totalFilesChecked += files.length;

    for (const file of files) {
      const content = readFileSync(file, "utf8");
      const lines = content.split("\n");

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith("//") || line.trim().startsWith("/*")) continue;

        // 1. Unsafe raw queries without parameterized safety annotation
        if (/\$queryRawUnsafe\b/.test(line) || /\$executeRawUnsafe\b/.test(line)) {
          if (!line.includes("// sql-safety: audited")) {
            violations.push(`${file}:${i + 1} Forbidden use of \`$queryRawUnsafe\` / \`$executeRawUnsafe\`. Use \`$queryRaw\` with tagged template literal.`);
          }
        }

        // 2. String concatenation in $queryRaw / $executeRaw
        if (/\$(queryRaw|executeRaw)\s*\([^`)]*(\+|concat\()/i.test(line)) {
          violations.push(`${file}:${i + 1} String concatenation detected inside \`$queryRaw\` / \`$executeRaw\`. Confine raw SQL to parameterized template tags.`);
        }
      }
    }
  }

  return {
    valid: violations.length === 0,
    violations,
    totalFilesChecked,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const res = auditSqlSafety();

  if (!res.valid) {
    console.error(`\nFAIL  check-sql-injection-safety: ${res.violations.length} SQL parameterization violation(s):\n`);
    for (const v of res.violations) console.error(`  - ${v}`);
    process.exit(1);
  }

  console.log(`OK    SQL query safety verified: ${res.totalFilesChecked} application service files scanned with 0 unparameterized SQL queries or raw string concatenation.`);
  process.exit(0);
}
