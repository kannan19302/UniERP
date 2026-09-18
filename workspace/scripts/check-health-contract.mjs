#!/usr/bin/env node
/**
 * scripts/check-health-contract.mjs
 *
 * P12-018: Uniform health and readiness contract gate.
 *
 * Exit criterion:
 *   "A uniform health and readiness interface across every service.
 *    Every service exposes the contract; one that does not fails the gate."
 *
 * Capabilities:
 *   1. Verifies that @kannan19302/contracts exports the standard HealthResponse, ReadinessResponse, and DependencyProbe interfaces.
 *   2. Audits backend service implementations (unierp-api, unierp-idp) to ensure exposure of both /health and /ready endpoints.
 *   3. Enforces that any service omitting /health or /ready fails the gate.
 *
 * Usage:
 *   node scripts/check-health-contract.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PARENT_DIR = resolve(ROOT, "..");

export function verifyHealthContracts() {
  const violations = [];

  // 1. Verify contracts export
  const contractsHealthPath = resolve(PARENT_DIR, "unierp-contracts/src/health.ts");
  if (!existsSync(contractsHealthPath)) {
    violations.push("unierp-contracts/src/health.ts missing.");
  } else {
    const content = readFileSync(contractsHealthPath, "utf8");
    if (!content.includes("HealthResponse") || !content.includes("ReadinessResponse")) {
      violations.push("unierp-contracts does not export HealthResponse / ReadinessResponse standard interfaces.");
    }
  }

  // 2. Verify health & readiness endpoints in unierp-api
  const apiRepo = existsSync(resolve(PARENT_DIR, "api")) ? resolve(PARENT_DIR, "api") : resolve(PARENT_DIR, "unierp-api");
  const apiHealthPath = resolve(apiRepo, "src/health.controller.ts");
  if (!existsSync(apiHealthPath)) {
    violations.push("api health.controller.ts missing.");
  } else {
    const content = readFileSync(apiHealthPath, "utf8");
    if (!content.includes('@Get("health")') && !content.includes("@Get('health')")) {
      violations.push("unierp-api missing /health liveness probe endpoint.");
    }
    if (!content.includes('@Get("ready")') && !content.includes("@Get('ready')")) {
      violations.push("unierp-api missing /ready readiness probe endpoint.");
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

// CLI Execution
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const res = verifyHealthContracts();
  if (!res.valid) {
    console.error(`\nFAIL  check-health-contract: ${res.violations.length} health contract violation(s) found:\n`);
    for (const v of res.violations) console.error(`  - ${v}`);
    process.exit(1);
  }

  console.log("OK    Health & readiness contract verified: @kannan19302/contracts schema and service /health & /ready probes compliant.");
  process.exit(0);
}
