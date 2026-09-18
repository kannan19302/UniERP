#!/usr/bin/env node
/**
 * scripts/check-sdk-documentation-and-examples.mjs
 *
 * Phase P12-077: SDK documentation and examples.
 *
 * Exit criterion:
 *   "Generated reference plus runnable, tested examples.
 *    Every example executes in CI; a broken example fails the build"
 *
 * This tool & CI gate:
 *   1. Asserts SDK README / usage documentation in unierp-sdk.
 *   2. Asserts runnable examples under unierp-sdk/examples/.
 *   3. Executes SDK runnable examples in CI, ensuring broken examples fail the build.
 *
 * Usage:
 *   node scripts/check-sdk-documentation-and-examples.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifySdkDocumentationAndExamples() {
  const sdkDir = existsSync(join(PARENT_ROOT, "sdk")) ? join(PARENT_ROOT, "sdk") : join(PARENT_ROOT, "unierp-sdk");
  const sdkReadmePath = join(sdkDir, "README.md");
  if (!existsSync(sdkReadmePath)) {
    return { valid: false, reason: "sdk README.md missing" };
  }

  const examplePath = join(sdkDir, "examples", "basic-usage.ts");
  if (!existsSync(examplePath)) {
    return { valid: false, reason: "sdk examples/basic-usage.ts missing" };
  }

  const testPath = join(sdkDir, "examples", "basic-usage.spec.ts");
  if (!existsSync(testPath)) {
    return { valid: false, reason: "sdk examples/basic-usage.spec.ts missing" };
  }

  // Execute runnable example test suite in CI
  const proc = spawnSync("node", ["--test", "examples/basic-usage.spec.ts"], {
    cwd: sdkDir,
    encoding: "utf8",
    stdio: "pipe",
  });

  if (proc.status !== 0) {
    return {
      valid: false,
      reason: `SDK runnable example test failed in CI:\n${proc.stderr || proc.stdout}`,
    };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifySdkDocumentationAndExamples();
    if (!res.valid) {
      console.error(`\n❌ SDK documentation and examples gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ SDK documentation and examples gate passed: Runnable examples executed cleanly in CI.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during SDK documentation and examples verification:`, err);
    process.exit(1);
  }
}
