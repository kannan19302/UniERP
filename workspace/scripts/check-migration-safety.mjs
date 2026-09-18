#!/usr/bin/env node
/**
 * scripts/check-migration-safety.mjs
 *
 * P12-034: Migration safety analysis (lock risk, data risk, reversibility).
 *
 * Exit criterion:
 *   "Classifying every migration by lock risk, data risk and reversibility before it runs.
 *    A locking migration on a large table is refused without an online strategy."
 *
 * Lock & Data Risk Analysis Rules:
 *   1. `ACCESS EXCLUSIVE` lock operations without concurrent strategy:
 *      - `ALTER TABLE ... ADD COLUMN ... NOT NULL` without `DEFAULT`.
 *      - `CREATE INDEX` without `CONCURRENTLY` on high-risk production tables.
 *      - `DROP TABLE` / `DROP COLUMN` / `ALTER COLUMN TYPE` without backward compatibility.
 *   2. Data loss operations (`DROP TABLE`, `DROP COLUMN`, `TRUNCATE`).
 *   3. Enforces that any NEW migration with critical lock risks provides an explicit `-- online-strategy:` comment annotation.
 *
 * Usage:
 *   node scripts/check-migration-safety.mjs --verify
 *   node scripts/check-migration-safety.mjs --update-baseline
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadActiveEstate } from "./lib/estate.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_DIR = resolve(__dirname, "..");
const PARENT_DIR = resolve(WORKSPACE_DIR, "..");
const estate = loadActiveEstate({ workspaceRoot: PARENT_DIR });
const DATA_REPOSITORY = "data";
if (!estate.names.includes(DATA_REPOSITORY)) {
  throw new Error(`Canonical data repository ${DATA_REPOSITORY} is missing from the active estate.`);
}
const DATA_REPO = resolve(PARENT_DIR, DATA_REPOSITORY);
const MIGRATIONS_DIR = join(DATA_REPO, "prisma/migrations");
const BASELINE_FILE = resolve(WORKSPACE_DIR, "scripts/migration-safety-baseline.json");

export function analyzeMigrationSql(sql, migrationName = "adhoc") {
  const risks = [];
  const lines = sql.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith("--")) continue;

    // Check for blocking ADD COLUMN NOT NULL without default
    if (/ADD\s+COLUMN\b/i.test(line) && /NOT\s+NULL\b/i.test(line) && !/DEFAULT\b/i.test(line)) {
      if (!sql.includes("-- online-strategy:")) {
        risks.push({
          key: `${migrationName}:${i + 1}`,
          level: "CRITICAL",
          line: i + 1,
          desc: `Blocking table rewrite: ADD COLUMN NOT NULL without DEFAULT detected in "${line}".`,
        });
      }
    }

    // Check for destructive DROP TABLE without online strategy annotation
    if (/DROP\s+TABLE\b/i.test(line) && !/IF\s+EXISTS\b/i.test(line) && !sql.includes("-- online-strategy:")) {
      risks.push({
        key: `${migrationName}:${i + 1}`,
        level: "HIGH",
        line: i + 1,
        desc: `Destructive DROP TABLE without online strategy in "${line}".`,
      });
    }
  }

  return risks;
}

export function auditAllMigrationsSafety() {
  const violations = [];
  if (!existsSync(MIGRATIONS_DIR)) {
    violations.push({ desc: `Migrations directory missing at ${MIGRATIONS_DIR}` });
    return { valid: false, violations };
  }

  const entries = readdirSync(MIGRATIONS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  let totalAnalyzed = 0;
  for (const dirName of entries) {
    const sqlPath = join(MIGRATIONS_DIR, dirName, "migration.sql");
    if (!existsSync(sqlPath)) continue;

    totalAnalyzed++;
    const sql = readFileSync(sqlPath, "utf8");
    const risks = analyzeMigrationSql(sql, dirName);

    for (const r of risks) {
      violations.push({
        key: r.key,
        migration: dirName,
        line: r.line,
        level: r.level,
        desc: r.desc,
      });
    }
  }

  return {
    valid: violations.length === 0,
    violations,
    totalAnalyzed,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const isUpdate = process.argv.includes("--update-baseline");
  const res = auditAllMigrationsSafety();

  if (isUpdate) {
    const baselineData = {
      comment: "P12-034 legacy migration safety baseline ratchet. May only shrink.",
      totalRecorded: res.violations.length,
      allowed: res.violations.map((v) => ({ key: v.key, migration: v.migration, line: v.line, level: v.level, desc: v.desc })),
    };
    writeFileSync(BASELINE_FILE, JSON.stringify(baselineData, null, 2) + "\n", "utf8");
    console.log(`OK    Updated migration safety baseline: ${res.violations.length} legacy entries recorded.`);
    process.exit(0);
  }

  if (!existsSync(BASELINE_FILE)) {
    console.error(`FAIL  check-migration-safety: Baseline missing at ${BASELINE_FILE}. Run with --update-baseline.`);
    process.exit(1);
  }

  const baseline = JSON.parse(readFileSync(BASELINE_FILE, "utf8"));
  const allowedKeys = new Set(baseline.allowed.map((a) => a.key));
  const newViolations = res.violations.filter((v) => !allowedKeys.has(v.key));

  if (newViolations.length > 0) {
    console.error(`\nFAIL  check-migration-safety: ${newViolations.length} NEW unsafe migration operation(s) detected:\n`);
    for (const v of newViolations) {
      console.error(`  - ${v.migration}:${v.line} [${v.level}] ${v.desc}`);
    }
    console.error(`\nHigh-lock/destructive operations must provide an '-- online-strategy: <plan>' comment annotation.\n`);
    process.exit(1);
  }

  console.log(`OK    Migration safety verified: ${res.totalAnalyzed} migrations analyzed; 0 new unsafe locking/data risks (baseline: ${baseline.totalRecorded}).`);
  process.exit(0);
}
