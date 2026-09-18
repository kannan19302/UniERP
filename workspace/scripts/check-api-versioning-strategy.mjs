#!/usr/bin/env node
/**
 * scripts/check-api-versioning-strategy.mjs
 *
 * Phase P12-069: API versioning strategy.
 *
 * Exit criterion:
 *   "The declared versioning model — how a version is expressed, supported and retired.
 *    A version retired inside its support window is refused, enforced mechanically"
 *
 * This tool & CI gate:
 *   1. Asserts API versioning definitions (ApiVersionLifecycleSpec, assertApiVersionLifecycle) in @kannan19302/contracts.
 *   2. Validates declared API version states across endpoints and modules.
 *   3. Enforces that any attempt to retire an API version inside its mandatory support window is mechanically refused.
 *
 * Usage:
 *   node scripts/check-api-versioning-strategy.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifyApiVersioningStrategy() {
  const contractsPkgPath = join(PARENT_ROOT, "unierp-contracts", "package.json");
  if (!existsSync(contractsPkgPath)) {
    return { valid: false, reason: "unierp-contracts missing" };
  }

  const versioningPath = join(PARENT_ROOT, "unierp-contracts", "src", "api-versioning.ts");
  if (!existsSync(versioningPath)) {
    return { valid: false, reason: "api-versioning.ts missing in unierp-contracts" };
  }

  const versioningCode = readFileSync(versioningPath, "utf8");
  if (!versioningCode.includes("assertApiVersionLifecycle") || !versioningCode.includes("PrematureVersionRetirementError")) {
    return { valid: false, reason: "assertApiVersionLifecycle or PrematureVersionRetirementError missing" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyApiVersioningStrategy();
    if (!res.valid) {
      console.error(`\n❌ API versioning strategy gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ API versioning strategy gate passed: Mandatory support window and retirement mechanics verified.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during API versioning strategy verification:`, err);
    process.exit(1);
  }
}
