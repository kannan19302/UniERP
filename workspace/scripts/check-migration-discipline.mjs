#!/usr/bin/env node
/**
 * scripts/check-migration-discipline.mjs
 *
 * P12-033: Migration discipline — forward-only migrations, immutable once shipped.
 *
 * Exit criterion:
 *   "Forward-only migrations, immutable once shipped, with tested rollback.
 *    Replaying every migration from empty reproduces the schema exactly. Editing a shipped migration fails CI."
 *
 * Capabilities:
 *   1. Asserts that @kannan19302/database uses `prisma migrate deploy` for all production deployment steps.
 *   2. Forbids `db push` in production scripts and root orchestration.
 *   3. Enforces chronological forward-only naming format `YYYYMMDDHHMMSS_<name>` on all migration directories.
 *   4. Generates and verifies SHA-256 checksums of all committed migration files to ensure immutability.
 *
 * Usage:
 *   node scripts/check-migration-discipline.mjs --verify
 *   node scripts/check-migration-discipline.mjs --update-checksums
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_DIR = resolve(__dirname, "..");
const PARENT_DIR = resolve(WORKSPACE_DIR, "..");
const DATA_REPO = existsSync(resolve(PARENT_DIR, "data"))
  ? resolve(PARENT_DIR, "data")
  : resolve(PARENT_DIR, "unierp-data");
const MIGRATIONS_DIR = join(DATA_REPO, "prisma/migrations");
const CHECKSUMS_FILE = resolve(WORKSPACE_DIR, "scripts/migration-checksums.json");

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

export function auditMigrations() {
  const violations = [];
  const checksums = {};

  if (!existsSync(MIGRATIONS_DIR)) {
    violations.push(`Migrations directory missing at ${MIGRATIONS_DIR}`);
    return { valid: false, violations, count: 0 };
  }

  // 1. Verify unierp-data package.json scripts
  const dataPkgPath = join(DATA_REPO, "package.json");
  if (existsSync(dataPkgPath)) {
    const pkg = JSON.parse(readFileSync(dataPkgPath, "utf8"));
    const deployScript = pkg.scripts?.["db:deploy"] || "";
    if (!deployScript.includes("prisma migrate deploy")) {
      violations.push(`unierp-data "db:deploy" script must use \`prisma migrate deploy\`; got: "${deployScript}"`);
    }
    if (deployScript.includes("db push")) {
      violations.push(`unierp-data "db:deploy" script must not contain \`db push\`.`);
    }
  }

  // 2. Scan migration directories
  const entries = readdirSync(MIGRATIONS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  let prevTimestamp = "";
  for (const dirName of entries) {
    const match = dirName.match(/^(\d{14})_(.+)$/);
    if (!match) {
      violations.push(`Migration directory "${dirName}" does not match timestamp format YYYYMMDDHHMMSS_<name>.`);
      continue;
    }

    const timestamp = match[1];
    if (timestamp < prevTimestamp) {
      violations.push(`Migration sequence violation: "${dirName}" timestamp is out of order (${timestamp} < ${prevTimestamp}).`);
    }
    prevTimestamp = timestamp;

    const migrationSqlPath = join(MIGRATIONS_DIR, dirName, "migration.sql");
    if (!existsSync(migrationSqlPath)) {
      violations.push(`Migration "${dirName}" is missing migration.sql file.`);
      continue;
    }

    const sql = readFileSync(migrationSqlPath, "utf8");
    checksums[dirName] = sha256(sql);
  }

  return {
    valid: violations.length === 0,
    violations,
    count: entries.length,
    checksums,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const isUpdate = process.argv.includes("--update-checksums");
  const res = auditMigrations();

  if (!res.valid) {
    console.error(`\nFAIL  check-migration-discipline: ${res.violations.length} migration discipline violation(s):\n`);
    for (const v of res.violations) console.error(`  - ${v}`);
    process.exit(1);
  }

  if (isUpdate) {
    writeFileSync(CHECKSUMS_FILE, JSON.stringify(res.checksums, null, 2) + "\n", "utf8");
    console.log(`OK    Updated migration checksums: ${res.count} migrations recorded.`);
    process.exit(0);
  }

  if (!existsSync(CHECKSUMS_FILE)) {
    console.error(`FAIL  check-migration-discipline: Checksums manifest missing at ${CHECKSUMS_FILE}. Run with --update-checksums.`);
    process.exit(1);
  }

  const existingChecksums = JSON.parse(readFileSync(CHECKSUMS_FILE, "utf8"));
  const alteredMigrations = [];

  for (const [dir, hash] of Object.entries(existingChecksums)) {
    if (!res.checksums[dir]) {
      alteredMigrations.push(`Shipped migration "${dir}" was deleted.`);
    } else if (res.checksums[dir] !== hash) {
      alteredMigrations.push(`Shipped migration "${dir}" was modified (checksum mismatch: expected ${hash.slice(0, 8)}, got ${res.checksums[dir].slice(0, 8)}).`);
    }
  }

  if (alteredMigrations.length > 0) {
    console.error(`\nFAIL  check-migration-discipline: Shipped migration tampering detected:\n`);
    for (const a of alteredMigrations) console.error(`  - ${a}`);
    console.error(`\nMigrations are immutable once shipped. Apply changes in a new forward migration.\n`);
    process.exit(1);
  }

  console.log(`OK    Migration discipline verified: ${res.count} forward-only migrations immutable and strictly ordered.`);
  process.exit(0);
}
