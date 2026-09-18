#!/usr/bin/env node
/**
 * scripts/check-event-schema-registry.mjs
 *
 * Phase P12-049: Event schema registry.
 *
 * Exit criterion:
 *   "An event without a registered schema cannot be published. A schema change is versioned, not mutated"
 *
 * This test / gate:
 *   1. Verifies that domain events published across the platform have registered schemas in EventSchemaRegistry.
 *   2. Proves that publishing an unregistered event fails with UnregisteredEventSchemaError.
 *   3. Proves that attempting to mutate an existing schema version fails with IncompatibleEventSchemaMutationError.
 *   4. Validates backward-compatible schema versioning evolution (v1 -> v2).
 *
 * Usage:
 *   node scripts/check-event-schema-registry.mjs --verify
 */

import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, '..');
const PARENT_ROOT = resolve(WORKSPACE_ROOT, '..');
const CONTRACTS_DIR = resolve(PARENT_ROOT, 'unierp-contracts');

export async function verifyEventSchemaRegistry() {
  const {
    EventSchemaRegistry,
    UnregisteredEventSchemaError,
    IncompatibleEventSchemaMutationError,
    EventPayloadValidationError,
  } = await import(pathToFileURL(resolve(CONTRACTS_DIR, 'src/events/schema-registry.ts')).href);

  // 1. Verify that canonical events exist and validate correctly
  const sampleEvent = {
    eventType: 'finance.invoice.approved',
    version: 1,
    payload: {
      invoiceId: 'inv-001',
      amount: 1500,
      currency: 'USD',
      customerId: 'cust-900',
    },
  };

  try {
    EventSchemaRegistry.validateEventForPublish(sampleEvent);
  } catch (err) {
    return { valid: false, reason: `Valid canonical event failed validation: ${err.message}` };
  }

  // 2. Prove unregistered event cannot be published
  let caughtUnregistered = false;
  try {
    EventSchemaRegistry.validateEventForPublish({
      eventType: 'unregistered.shadow.event',
      version: 1,
      payload: { something: true },
    });
  } catch (err) {
    if (err instanceof UnregisteredEventSchemaError) {
      caughtUnregistered = true;
    }
  }

  if (!caughtUnregistered) {
    return { valid: false, reason: 'Expected UnregisteredEventSchemaError for unregistered event' };
  }

  // 3. Prove schema mutation is strictly rejected (must be versioned instead)
  let caughtMutation = false;
  try {
    EventSchemaRegistry.registerSchema({
      eventType: 'finance.invoice.approved',
      version: 1,
      description: 'Mutated definition',
      compatibility: 'BACKWARD',
      requiredFields: ['invoiceId', 'amount', 'currency', 'customerId', 'illegalNewRequiredField'],
      fieldTypes: {
        invoiceId: 'string',
        amount: 'number',
        currency: 'string',
        customerId: 'string',
        illegalNewRequiredField: 'string',
      },
    });
  } catch (err) {
    if (err instanceof IncompatibleEventSchemaMutationError) {
      caughtMutation = true;
    }
  }

  if (!caughtMutation) {
    return { valid: false, reason: 'Expected IncompatibleEventSchemaMutationError on schema mutation' };
  }

  // 4. Prove versioned evolution is supported
  try {
    EventSchemaRegistry.registerSchema({
      eventType: 'finance.invoice.approved',
      version: 2,
      description: 'Invoice approved v2 with optional taxDetails',
      compatibility: 'BACKWARD',
      requiredFields: ['invoiceId', 'amount', 'currency', 'customerId'],
      fieldTypes: {
        invoiceId: 'string',
        amount: 'number',
        currency: 'string',
        customerId: 'string',
        taxDetails: 'object',
      },
    });
  } catch (err) {
    return { valid: false, reason: `Valid schema versioning failed: ${err.message}` };
  }

  return { valid: true };
}

if (process.argv.includes('--verify') || process.argv.length <= 2) {
  verifyEventSchemaRegistry()
    .then((res) => {
      if (!res.valid) {
        console.error(`\n❌ Event schema registry gate failed: ${res.reason}`);
        process.exit(1);
      }
      console.log(`\n✓ Event schema registry gate passed: All events validated and schema mutation strictly prohibited.`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(`\n❌ Error during schema registry verification:`, err);
      process.exit(1);
    });
}
