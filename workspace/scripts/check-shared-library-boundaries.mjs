#!/usr/bin/env node
/**
 * scripts/check-shared-library-boundaries.mjs
 *
 * P12-091: Shared library boundaries
 * Enforces that `unierp-shared` contains generic code, not service-specific domains.
 * Enforces that generic utilities belong in `unierp-shared`, not in a service's `common/utils`.
 */

import { readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SHARED_SRC = resolve(ROOT, '../unierp-shared/src');
const API_MODULES = resolve(ROOT, '../unierp-api/src/modules');
const API_COMMON_UTILS = resolve(ROOT, '../unierp-api/src/common/utils');

function verifySharedLibraryBoundaries() {
  const violations = [];

  // 1. Service-specific utility in the shared library
  // If a directory in unierp-shared/src matches a module in unierp-api/src/modules, it's a domain leak.
  if (existsSync(SHARED_SRC) && existsSync(API_MODULES)) {
    const sharedDirs = readdirSync(SHARED_SRC, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    const apiModules = new Set(readdirSync(API_MODULES, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name));

    for (const sharedDir of sharedDirs) {
      if (apiModules.has(sharedDir)) {
        violations.push(`Service-specific domain '${sharedDir}' found in unierp-shared. Domain logic belongs in unierp-api/src/modules/${sharedDir}.`);
      }
    }
  }

  // 2. Shared utility in a service
  // Files in unierp-api/src/common/utils should be in unierp-shared/src/utils instead,
  // EXCEPT for utilities that are explicitly API-specific and depend on the database or framework.
  const EXEMPT_API_UTILS = new Set(['pagination.util.ts', 'slug.util.ts']);
  
  if (existsSync(API_COMMON_UTILS)) {
    const commonUtils = readdirSync(API_COMMON_UTILS, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && !EXEMPT_API_UTILS.has(dirent.name))
      .map(dirent => dirent.name);

    for (const util of commonUtils) {
      violations.push(`Generic utility '${util}' found in unierp-api/src/common/utils. Shared utilities must belong in unierp-shared.`);
    }
  }

  return violations;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const violations = verifySharedLibraryBoundaries();
  
  if (violations.length > 0) {
    console.error(`\n❌ check-shared-library-boundaries: ${violations.length} boundary violation(s):\n`);
    for (const v of violations) console.error(`  - ${v}`);
    console.error(`\nPlatform Core P12-091: unierp-shared must only contain generic utilities. Service-specific utilities belong in their module. Generic utilities belong in unierp-shared.`);
    process.exit(1);
  }

  console.log(`✅ check-shared-library-boundaries: Shared library boundaries verified.`);
  process.exit(0);
}
