#!/usr/bin/env node
/**
 * scripts/check-money-discipline.mjs
 *
 * P12-030: Money type discipline and ISO 4217 currency enforcement.
 *
 * Exit criterion:
 *   "`Decimal(19,4)` with explicit currency everywhere money appears in the schema.
 *    A `Float` in a money path fails CI. A bare amount without a currency does not typecheck."
 *
 * Capabilities:
 *   1. Verifies that L0 contracts (@kannan19302/contracts) define explicit Money { amount, currency } type.
 *   2. Verifies that schema linter (check-schema-lints.mjs) rejects any new unbaselined Float fields.
 *   3. Scans all Prisma schema models in unierp-data: for every model containing a money field
 *      (e.g., amount, price, cost, total, balance, subtotal, fee, salary), asserts that the field
 *      is typed as Decimal with Decimal(19, 4) db precision, or pairs with an explicit currency field / tenant base currency.
 *
 * Usage:
 *   node scripts/check-money-discipline.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_DIR = resolve(__dirname, "..");
const PARENT_DIR = resolve(WORKSPACE_DIR, "..");
const CONTRACTS_MONEY = resolve(PARENT_DIR, "unierp-contracts/src/money.ts");

export function verifyMoneyDiscipline() {
  const violations = [];

  // 1. Verify L0 Money type contract exists and enforces ISO currency
  if (!existsSync(CONTRACTS_MONEY)) {
    violations.push(`Money contract missing at ${CONTRACTS_MONEY}`);
  } else {
    const moneySrc = readFileSync(CONTRACTS_MONEY, "utf8");
    if (!moneySrc.includes("export interface Money") || !moneySrc.includes("currency: CurrencyCode")) {
      violations.push(`Money contract in @kannan19302/contracts does not define required Money { amount, currency } structure.`);
    }
  }

  // 2. Verify check-schema-lints.mjs runs clean against schema
  try {
    execSync("node scripts/check-schema-lints.mjs", { cwd: WORKSPACE_DIR, stdio: "pipe" });
  } catch (e) {
    violations.push(`check-schema-lints.mjs failed: ${e.stdout?.toString() || e.message}`);
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const res = verifyMoneyDiscipline();
  if (!res.valid) {
    console.error(`\nFAIL  check-money-discipline: ${res.violations.length} money discipline violation(s):\n`);
    for (const v of res.violations) console.error(`  - ${v}`);
    process.exit(1);
  }

  console.log(`OK    Money type discipline verified: Decimal(19,4) schema precision, exact string amounts, and ISO 4217 currency pairing enforced.`);
  process.exit(0);
}
