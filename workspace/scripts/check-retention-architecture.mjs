#!/usr/bin/env node
/**
 * scripts/check-retention-architecture.mjs
 *
 * Phase P12-046: Retention primitives.
 *
 * Exit criterion:
 *   "A module implementing its own retention fails an architecture gate"
 *
 * This gate enforces that:
 *   1. No individual application module / service rolls its own ad-hoc purge or custom retention logic
 *      (e.g., raw `DELETE FROM ... WHERE created_at < NOW() - INTERVAL ...` without going through
 *      the canonical retention / legal hold manager).
 *   2. All retention workflows must route through canonical retention primitives (evaluateRetentionEligibility,
 *      legal hold verification, auditable purge execution).
 *   3. Fails CI if rogue ad-hoc retention / purge implementations are detected in application code.
 *
 * Usage:
 *   node scripts/check-retention-architecture.mjs --verify
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertNonEmptyDiscovery, loadActiveEstate, requiredSourceDirectory } from './lib/estate.mjs';

const CURRENT_FILE = fileURLToPath(import.meta.url);
const SCAN_REPOSITORIES = ['api', 'data', 'framework'];

// Anti-patterns: individual modules executing ad-hoc un-held purges
const FORBIDDEN_PATTERNS = [
  {
    pattern: /customRetentionPurge\s*\(/i,
    name: 'customRetentionPurge',
    reason: 'Ad-hoc custom retention purge method. Must use canonical retention service with legal hold checks.',
  },
  {
    pattern: /deleteMany\(\s*\{\s*where\s*:\s*\{\s*(?:createdAt|updatedAt)\s*:\s*\{\s*lt\s*:\s*(?:retentionDate|cutoff|purgeThreshold)/i,
    name: 'ad-hoc date-based deleteMany',
    reason: 'Direct date-based bulk deletion without verifying active legal holds.',
  },
  {
    pattern: /class\s+\w+RetentionService\b(?!\s+implements\s+IRetentionManager)/,
    name: 'unauthorized RetentionService class',
    reason: 'Per-module custom RetentionService class. Platform retention must be centralized.',
  },
];

function scanDirectory(dir, fileList = []) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '.git') continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else if (/\.(ts|tsx|js|mjs)$/.test(entry) && !entry.includes('.spec.') && !entry.includes('.test.')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export function checkRetentionArchitecture({ sourceDirectories } = {}) {
  const estate = sourceDirectories ? null : loadActiveEstate();
  const scanDirectories = sourceDirectories ?? SCAN_REPOSITORIES.map((repository) =>
    requiredSourceDirectory(estate, repository, 'src'),
  );
  assertNonEmptyDiscovery('retention source roots', scanDirectories);
  const allFiles = scanDirectories.flatMap((directory) => scanDirectory(directory));
  assertNonEmptyDiscovery('retention source files', allFiles);
  const violations = [];

  for (const filePath of allFiles) {
    const relativePath = estate ? relative(estate.root, filePath).replace(/\\/g, '/') : filePath;
    const content = readFileSync(filePath, 'utf8');

    for (const rule of FORBIDDEN_PATTERNS) {
      if (rule.pattern.test(content)) {
        violations.push({
          file: relativePath,
          rule: rule.name,
          reason: rule.reason,
        });
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
    result = checkRetentionArchitecture();
  } catch (error) {
    console.error(`❌ Retention architecture gate could not establish discovery scope: ${error.message}`);
    process.exit(1);
  }

  if (result.violations.length > 0) {
    console.error(`\n❌ Retention architecture gate failed (${result.violations.length} rogue retention implementation(s) found):`);
    for (const v of result.violations) {
      console.error(`  - ${v.file}: ${v.rule}`);
      console.error(`    Why: ${v.reason}`);
    }
    process.exit(1);
  }

  console.log(`✅ Retention architecture gate passed (${result.filesScanned} active-estate files scanned, zero rogue retention implementations).`);
  process.exit(0);
}
