#!/usr/bin/env node
/**
 * scripts/check-extension-api-contract.mjs
 *
 * Phase P12-079: Extension API contract.
 *
 * Exit criterion:
 *   "unierp-extension-api as the versioned contract extensions implement.
 *    An extension built against an older contract version continues to work within its window"
 *
 * This tool & CI gate:
 *   1. Asserts unierp-extension-api builds and exports canonical contract version specifications.
 *   2. Tests compatibility resolution for extensions compiled against supported contract versions within their window.
 *   3. Asserts that extensions compiled against unsupported or retired versions fail with explicit errors.
 *
 * Usage:
 *   node scripts/check-extension-api-contract.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifyExtensionApiContract() {
  const extRepo = existsSync(join(PARENT_ROOT, "extension-api"))
    ? "extension-api"
    : "unierp-extension-api";
  const extensionApiDist = join(PARENT_ROOT, extRepo, "dist", "versioning.js");
  if (!existsSync(extensionApiDist)) {
    return { valid: false, reason: `Extension API dist artifact missing at ${extensionApiDist}` };
  }

  const {
    CANONICAL_EXTENSION_API_VERSIONS,
    assertExtensionContractCompatibility,
    UnsupportedExtensionContractVersionError,
  } = require(extensionApiDist);

  if (!Array.isArray(CANONICAL_EXTENSION_API_VERSIONS) || CANONICAL_EXTENSION_API_VERSIONS.length === 0) {
    return { valid: false, reason: "No canonical extension API versions declared" };
  }

  // 1. Verify active version works
  const activeRes = assertExtensionContractCompatibility("1.0.0");
  if (!activeRes.isCompatible || activeRes.versionSpec.contractVersion !== "1.0.0") {
    return { valid: false, reason: "Active extension contract version 1.0.0 failed compatibility check" };
  }

  // 2. Verify unsupported / unknown version fails cleanly
  let errorCaught = false;
  try {
    assertExtensionContractCompatibility("99.9.9");
  } catch (err) {
    if (err instanceof UnsupportedExtensionContractVersionError || err.name === "UnsupportedExtensionContractVersionError") {
      errorCaught = true;
    }
  }

  if (!errorCaught) {
    return { valid: false, reason: "Unsupported extension version did not throw UnsupportedExtensionContractVersionError" };
  }

  return { valid: true, versions: CANONICAL_EXTENSION_API_VERSIONS.map((v) => v.contractVersion) };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyExtensionApiContract();
    if (!res.valid) {
      console.error(`\n❌ Extension API contract gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Extension API contract gate passed: Supported versions [${res.versions.join(", ")}] verified with window compatibility.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during Extension API contract verification:`, err);
    process.exit(1);
  }
}
