#!/usr/bin/env node

/**
 * =============================================================================
 * CI Gate: check-platform-wizard-e2e.mjs
 * =============================================================================
 *
 * Verifies that the Master SSO Platform Wizard, Docker configurations,
 * role-gated platform access rules, and E2E navigation suite pass all gates.
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCRIPTS_DIR = path.resolve(__dirname, '..');

console.log(`[CI Gate] Validating UniERP Platform Wizard, Container Topology & E2E Navigation...`);

try {
  // Step 1: Validate container maps
  execSync(`node "${path.join(SCRIPTS_DIR, 'platform-manager.mjs')}" validate`, { stdio: 'inherit' });

  // Step 2: Run E2E suite
  execSync(`node "${path.join(SCRIPTS_DIR, 'test-e2e-platforms.mjs')}"`, { stdio: 'inherit' });

  console.log(`\n\x1b[32m✔ CI GATE PASSED: Platform Wizard & E2E Navigation verified.\x1b[0m\n`);
  process.exit(0);
} catch (err) {
  console.error(`\n\x1b[31m✖ CI GATE FAILED: Platform Wizard E2E check failed.\x1b[0m\n`);
  process.exit(1);
}
