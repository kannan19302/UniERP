#!/usr/bin/env node
/**
 * scripts/check-webhook-event-contracts.mjs
 *
 * Phase P12-078: Webhook and event contracts.
 *
 * Exit criterion:
 *   "Outbound event payloads contracted and versioned like endpoints.
 *    An event payload change is classified and versioned like an API change"
 *
 * This tool & CI gate:
 *   1. Verifies CANONICAL_WEBHOOK_EVENT_CONTRACTS in @kannan19302/contracts.
 *   2. Asserts each event payload carries schema definitions, versions, and metadata.
 *   3. Tests event payload change classification (compatible additions vs breaking removals/modifications).
 *   4. Asserts that breaking event payload changes require version increments.
 *
 * Usage:
 *   node scripts/check-webhook-event-contracts.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export async function verifyWebhookEventContracts() {
  const contractsModulePath = join(PARENT_ROOT, "unierp-contracts", "dist", "webhook-contracts.js");
  if (!existsSync(contractsModulePath)) {
    return { valid: false, reason: `Contracts artifact missing at ${contractsModulePath}` };
  }

  const {
    CANONICAL_WEBHOOK_EVENT_CONTRACTS,
    classifyEventPayloadChange,
    assertEventPayloadVersionLifecycle,
  } = await import(`file://${contractsModulePath.replace(/\\/g, "/")}`);

  if (!Array.isArray(CANONICAL_WEBHOOK_EVENT_CONTRACTS) || CANONICAL_WEBHOOK_EVENT_CONTRACTS.length === 0) {
    return { valid: false, reason: "No webhook event contracts defined in CANONICAL_WEBHOOK_EVENT_CONTRACTS" };
  }

  for (const event of CANONICAL_WEBHOOK_EVENT_CONTRACTS) {
    if (!event.eventType || !event.version || !event.payloadSchema || !event.metadata) {
      return { valid: false, reason: `Event contract '${event.eventType || "unknown"}' is missing required fields` };
    }
  }

  // Verify change classification logic
  const prev = CANONICAL_WEBHOOK_EVENT_CONTRACTS[0];
  const compatibleNext = {
    ...prev,
    payloadSchema: { ...prev.payloadSchema, extraInfo: "string" },
  };

  const compatibleRes = classifyEventPayloadChange(prev, compatibleNext);
  if (compatibleRes.isBreaking || compatibleRes.classification !== "COMPATIBLE") {
    return { valid: false, reason: "Compatible event payload change incorrectly classified" };
  }

  const breakingNext = {
    ...prev,
    payloadSchema: {}, // all required fields removed
  };

  const breakingRes = classifyEventPayloadChange(prev, breakingNext);
  if (!breakingRes.isBreaking || breakingRes.classification !== "BREAKING") {
    return { valid: false, reason: "Breaking event payload removal not classified as breaking" };
  }

  let errorCaught = false;
  try {
    assertEventPayloadVersionLifecycle(prev, breakingNext);
  } catch (err) {
    errorCaught = true;
  }

  if (!errorCaught) {
    return { valid: false, reason: "assertEventPayloadVersionLifecycle failed to reject unversioned breaking event payload change" };
  }

  return { valid: true, eventCount: CANONICAL_WEBHOOK_EVENT_CONTRACTS.length };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = await verifyWebhookEventContracts();
    if (!res.valid) {
      console.error(`\n❌ Webhook and event contracts gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Webhook and event contracts gate passed: ${res.eventCount} contracted events verified and payload change classification asserted.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during webhook and event contracts verification:`, err);
    process.exit(1);
  }
}
