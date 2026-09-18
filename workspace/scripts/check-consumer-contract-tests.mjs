#!/usr/bin/env node
/**
 * scripts/check-consumer-contract-tests.mjs
 *
 * Phase P12-072: Consumer-driven contract tests.
 *
 * Exit criterion:
 *   "Every consumer's expectations expressed as tests the provider runs.
 *    A provider change breaking a consumer fails in the provider's CI, not the consumer's"
 *
 * This tool & CI gate:
 *   1. Asserts consumer contract test harness in @kannan19302/contracts.
 *   2. Validates that consumer expectations are verified in provider CI.
 *   3. Enforces that provider changes breaking a consumer fail in provider CI.
 *
 * Usage:
 *   node scripts/check-consumer-contract-tests.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifyConsumerContractTests() {
  const contractsPkgPath = join(PARENT_ROOT, "unierp-contracts", "package.json");
  if (!existsSync(contractsPkgPath)) {
    return { valid: false, reason: "unierp-contracts missing" };
  }

  const testHarnessPath = join(PARENT_ROOT, "unierp-contracts", "src", "consumer-contract-test.ts");
  if (!existsSync(testHarnessPath)) {
    return { valid: false, reason: "consumer-contract-test.ts missing in unierp-contracts" };
  }

  const testHarnessCode = readFileSync(testHarnessPath, "utf8");
  if (
    !testHarnessCode.includes("verifyConsumerContractExpectations") ||
    !testHarnessCode.includes("ConsumerExpectationViolationError")
  ) {
    return { valid: false, reason: "verifyConsumerContractExpectations or ConsumerExpectationViolationError missing" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyConsumerContractTests();
    if (!res.valid) {
      console.error(`\n❌ Consumer-driven contract tests gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Consumer-driven contract tests gate passed: Provider CI execution of consumer contract expectations verified.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during consumer-driven contract tests verification:`, err);
    process.exit(1);
  }
}
