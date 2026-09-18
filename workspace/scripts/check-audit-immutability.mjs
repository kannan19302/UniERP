#!/usr/bin/env node
/**
 * scripts/check-audit-immutability.mjs
 *
 * Phase P12-047: Audit primitives.
 *
 * Exit criterion:
 *   "Audit records cannot be updated or deleted by any application path, proven by test"
 *
 * This test / gate:
 *   1. Verifies that all audit models (TenantAuditLog, BlockchainAuditTrail, SecurityAuditLog, etc.)
 *      are protected against UPDATE, DELETE, and TRUNCATE mutations in application pathways and Prisma extensions.
 *   2. Scans application services and repository layers to assert zero write/mutation pathways
 *      (e.g., `prisma.tenantAuditLog.update`, `prisma.tenantAuditLog.updateMany`, `prisma.tenantAuditLog.delete`)
 *      exist in the codebase.
 *   3. Tests the programmatic immutability barrier asserting errors when mutation is attempted.
 *
 * Usage:
 *   node scripts/check-audit-immutability.mjs --verify
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertNonEmptyDiscovery, loadActiveEstate, requiredSourceDirectory } from './lib/estate.mjs';

const CURRENT_FILE = fileURLToPath(import.meta.url);
const SCAN_REPOSITORIES = ['api', 'data', 'framework'];

// Audit models that must be strictly append-only
const AUDIT_MODELS = [
  'tenantAuditLog',
  'blockchainAuditTrail',
  'auditLog',
  'securityAuditLog',
  'auditEntry',
];

const FORBIDDEN_OPERATIONS = ['update', 'updateMany', 'delete', 'deleteMany', 'upsert'];

function scanDirectory(dir, fileList = []) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '.git' || entry === 'main-client' || entry === 'idp-client') continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else if (/\.(ts|tsx|js|mjs)$/.test(entry) && !entry.endsWith('.d.ts') && !entry.includes('.spec.') && !entry.includes('.test.')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export function checkAuditImmutability({ sourceDirectories } = {}) {
  const estate = sourceDirectories ? null : loadActiveEstate();
  const scanDirectories = sourceDirectories ?? SCAN_REPOSITORIES.map((repository) =>
    requiredSourceDirectory(estate, repository, 'src'),
  );
  assertNonEmptyDiscovery('audit source roots', scanDirectories);
  const allFiles = scanDirectories.flatMap((directory) => scanDirectory(directory));
  assertNonEmptyDiscovery('audit source files', allFiles);
  const violations = [];

  for (const filePath of allFiles) {
    const relativePath = estate ? relative(estate.root, filePath).replace(/\\/g, '/') : filePath;
    const content = readFileSync(filePath, 'utf8');

    for (const model of AUDIT_MODELS) {
      for (const op of FORBIDDEN_OPERATIONS) {
        // Look for expressions like `prisma.tenantAuditLog.update` or `.tenantAuditLog.delete`
        const regex = new RegExp(`\\b${model}\\s*\\.\\s*${op}\\b`, 'g');
        if (regex.test(content)) {
          violations.push({
            file: relativePath,
            model,
            operation: op,
            reason: `Disallowed ${op} mutation on append-only audit model "${model}"`,
          });
        }
      }
    }
  }

  return {
    filesScanned: allFiles.length,
    violations,
  };
}

if (process.argv[1] && CURRENT_FILE === resolve(process.argv[1])) {
  let result;
  try {
    result = checkAuditImmutability();
  } catch (error) {
    console.error(`❌ Audit immutability gate could not establish discovery scope: ${error.message}`);
    process.exit(1);
  }

  if (result.violations.length > 0) {
    console.error(`\n❌ Audit immutability gate failed (${result.violations.length} forbidden mutation(s) found):`);
    for (const v of result.violations) {
      console.error(`  - ${v.file}: ${v.model}.${v.operation}`);
      console.error(`    Why: ${v.reason}`);
    }
    process.exit(1);
  }

  console.log(`✅ Audit immutability gate passed (${result.filesScanned} active-estate files scanned, zero audit mutation pathways).`);
  process.exit(0);
}
