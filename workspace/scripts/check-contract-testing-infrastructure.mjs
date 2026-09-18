#!/usr/bin/env node
/**
 * scripts/check-contract-testing-infrastructure.mjs
 *
 * Phase P12-084: Contract testing infrastructure.
 *
 * Exit criterion:
 *   "A contract test is writable without new infrastructure, and the harness has its own tests"
 *
 * This tool & CI gate:
 *   1. Asserts ContractTestingHarness exists in @kannan19302/contracts (contract-harness.ts).
 *   2. Validates that the harness has its own tests (contract-harness.spec.ts).
 *
 * Usage:
 *   node scripts/check-contract-testing-infrastructure.mjs --verify
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifyContractTestingInfrastructure() {
  const contractsPkgPath = join(PARENT_ROOT, "unierp-contracts", "package.json");
  if (!existsSync(contractsPkgPath)) {
    return { valid: false, reason: "unierp-contracts missing" };
  }

  const harnessPath = join(PARENT_ROOT, "unierp-contracts", "src", "contract-harness.ts");
  if (!existsSync(harnessPath)) {
    return { valid: false, reason: "contract-harness.ts missing in unierp-contracts" };
  }

  const specPath = join(PARENT_ROOT, "unierp-contracts", "src", "contract-harness.spec.ts");
  if (!existsSync(specPath)) {
    return { valid: false, reason: "contract-harness.spec.ts missing in unierp-contracts" };
  }

  const harnessContent = readFileSync(harnessPath, "utf8");
  if (!harnessContent.includes("ContractTestingHarness")) {
    return { valid: false, reason: "ContractTestingHarness class missing" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyContractTestingInfrastructure();
    if (!res.valid) {
      console.error(`\n❌ Contract testing infrastructure gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Contract testing infrastructure gate passed: Harness and its tests exist.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during contract testing infrastructure verification:`, err);
    process.exit(1);
  }
}
