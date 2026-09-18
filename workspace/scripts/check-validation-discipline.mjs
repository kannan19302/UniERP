#!/usr/bin/env node
/**
 * scripts/check-validation-discipline.mjs
 *
 * P12-095: Validation primitives
 * Enforces that Zod is the only validation library used in the platform.
 * Fails the build if alternative approaches (class-validator, joi, yup, ValidationPipe) are found.
 */

import { readdirSync, statSync, readFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Directories to scan (all repos' src folders)
const TARGETS = [
  'unierp-api/src',
  'unierp-auth/src',
  'unierp-config/src',
  'unierp-contracts/src',
  'unierp-data/src',
  'unierp-framework/src',
  'unierp-idp/src',
  'unierp-kernel/src',
  'unierp-shared/src'
];

const BANNED_IMPORTS = [
  'class-validator',
  'class-transformer',
  'joi',
  'yup'
];

const BANNED_PATTERNS = [
  { regex: /import\s+\{.*?\bValidationPipe\b.*?\}\s+from\s+['"]@nestjs\/common['"]/, message: "NestJS ValidationPipe uses class-validator. Use Zod validation pipes instead." },
  { regex: /\bnew\s+ValidationPipe\s*\(/, message: "NestJS ValidationPipe uses class-validator. Use Zod validation pipes instead." },
  { regex: /@IsString\(/, message: "class-validator decorator found (@IsString). Use Zod instead." },
  { regex: /@IsInt\(/, message: "class-validator decorator found (@IsInt). Use Zod instead." }
];

function getAllTsFiles(dir, fileList = []) {
  if (!statSync(dir).isDirectory()) return fileList;
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      getAllTsFiles(filePath, fileList);
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function verifyValidationDiscipline() {
  const violations = [];

  for (const target of TARGETS) {
    const fullPath = resolve(ROOT, '..', target);
    let files = [];
    try {
      files = getAllTsFiles(fullPath);
    } catch (e) {
      // Ignore missing directories (some repos might not exist in sandbox)
      continue;
    }

    for (const file of files) {
      const content = readFileSync(file, 'utf8');

      // Check banned imports
      for (const banned of BANNED_IMPORTS) {
        if (content.includes(`from '${banned}'`) || content.includes(`from "${banned}"`)) {
          violations.push(`File ${file} imports banned validation library: ${banned}`);
        }
      }

      // Check banned patterns
      for (const pattern of BANNED_PATTERNS) {
        if (pattern.regex.test(content)) {
          violations.push(`File ${file} violates validation rule: ${pattern.message}`);
        }
      }
    }
  }

  return violations;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const violations = verifyValidationDiscipline();

  if (violations.length > 0) {
    console.error(`\n❌ check-validation-discipline: ${violations.length} violation(s):\n`);
    for (const v of violations) console.error(`  - ${v}`);
    console.error(`\nPlatform Core P12-095: Zod is the single source of truth for validation. Secondary validation libraries are banned.`);
    process.exit(1);
  }

  console.log(`✅ check-validation-discipline: Validation discipline verified.`);
  process.exit(0);
}
