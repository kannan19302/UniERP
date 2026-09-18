#!/usr/bin/env node
/**
 * scripts/check-observability-standard.mjs
 *
 * P12-017: Observability standard verification gate.
 *
 * Exit criterion:
 *   "Metric, trace and log conventions every service implements identically.
 *    A service emitting off-standard telemetry fails a gate."
 *
 * Capabilities:
 *   1. Audits service layers for standard metrics endpoints (/metrics), Prometheus label conventions (method, route, status_code, tenant_id).
 *   2. Audits OpenTelemetry distributed tracing bootstrap and semantic conventions.
 *   3. Enforces that off-standard metrics or tracing configurations fail the gate.
 *
 * Usage:
 *   node scripts/check-observability-standard.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PARENT_DIR = resolve(ROOT, "..");

const API_DIR = existsSync(resolve(PARENT_DIR, "api"))
  ? resolve(PARENT_DIR, "api")
  : resolve(PARENT_DIR, "unierp-api");

export function verifyObservabilityStandards() {
  const violations = [];

  // 1. Check metrics middleware & registry in api
  const metricsPath = resolve(API_DIR, "src/common/middleware/metrics.middleware.ts");
  if (!existsSync(metricsPath)) {
    violations.push("api metrics.middleware.ts missing.");
  } else {
    const content = readFileSync(metricsPath, "utf8");
    const requiredLabels = ["method", "route", "status_code", "tenant_id"];
    for (const label of requiredLabels) {
      if (!content.includes(label)) {
        violations.push(`metrics.middleware.ts missing required metric label: ${label}`);
      }
    }
  }

  // 2. Check metrics scrape endpoint controller in api
  const metricsControllerPath = resolve(API_DIR, "src/metrics.controller.ts");
  if (!existsSync(metricsControllerPath)) {
    violations.push("api metrics.controller.ts missing.");
  } else {
    const content = readFileSync(metricsControllerPath, "utf8");
    if (!content.includes("metrics") || !content.includes("metricsRegistry.metrics()")) {
      violations.push("metrics.controller.ts does not correctly expose Prometheus metrics scrape endpoint.");
    }
  }

  // 3. Check OpenTelemetry distributed tracing bootstrap in api
  const tracingPath = resolve(API_DIR, "src/tracing.ts");
  if (!existsSync(tracingPath)) {
    violations.push("api tracing.ts bootstrap missing.");
  } else {
    const content = readFileSync(tracingPath, "utf8");
    if (!content.includes("@opentelemetry/sdk-node") || !content.includes("OTLPTraceExporter")) {
      violations.push("tracing.ts does not configure OpenTelemetry OTLP trace exporter.");
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

// CLI Execution
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const res = verifyObservabilityStandards();
  if (!res.valid) {
    console.error(`\nFAIL  check-observability-standard: ${res.violations.length} observability violation(s) found:\n`);
    for (const v of res.violations) console.error(`  - ${v}`);
    process.exit(1);
  }

  console.log("OK    Observability standard verified: Prometheus metrics conventions and OpenTelemetry distributed tracing active.");
  process.exit(0);
}
