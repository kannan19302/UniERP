#!/usr/bin/env node
/**
 * Schema Size & Duplicate Entity Gate — Phase A04.
 *
 * 1. Asserts no `.prisma` schema file in `unierp-data/prisma/schema` exceeds 3,000 lines.
 * 2. Checks for model names that duplicate existing entities by similarity (e.g., Customer vs CrmCustomer).
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
const DATA_DIR = existsSync(join(ROOT, 'data')) ? join(ROOT, 'data') : join(ROOT, 'unierp-data');
const SCHEMA_DIR = join(DATA_DIR, 'prisma', 'schema');

if (!existsSync(SCHEMA_DIR)) {
  console.log(`  ℹ Schema size check: ${SCHEMA_DIR} does not exist.`);
  process.exit(0);
}

const files = readdirSync(SCHEMA_DIR).filter((f) => f.endsWith('.prisma'));
const MAX_LINES = 3000;
const overSized = [];
const allModels = [];

for (const file of files) {
  const fullPath = join(SCHEMA_DIR, file);
  const content = readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  if (lines.length > MAX_LINES) {
    overSized.push({ file, lines: lines.length });
  }

  for (const line of lines) {
    const m = line.match(/^model\s+(\w+)/);
    if (m) {
      allModels.push({ name: m[1], file });
    }
  }
}

// ── Check 1: Max line limit ──────────────────────────────────────────────────
if (overSized.length > 0) {
  console.error(`
────────────────────────────────────────────────────────────────────────
  ❌ SCHEMA FILE SIZE EXCEEDED (Max ${MAX_LINES} lines)
────────────────────────────────────────────────────────────────────────`);
  for (const f of overSized) {
    console.error(`   - ${f.file}: ${f.lines} lines (exceeds ${MAX_LINES})`);
  }
  console.error(`
  No .prisma file may exceed 3,000 lines (Remediation R2 / Phase A04).
────────────────────────────────────────────────────────────────────────
`);
  process.exit(1);
}

// ── Check 2: Similarity / Duplicate entity names ──────────────────────────────
function getBaseName(name) {
  return name.replace(/^(Crm|Erp|Saas|Platform|System|App)/i, '').toLowerCase();
}

const warnings = [];
for (let i = 0; i < allModels.length; i++) {
  for (let j = i + 1; j < allModels.length; j++) {
    const m1 = allModels[i];
    const m2 = allModels[j];

    const b1 = getBaseName(m1.name);
    const b2 = getBaseName(m2.name);

    if (b1.length > 3 && b1 === b2 && m1.name !== m2.name) {
      warnings.push({ m1: m1.name, f1: m1.file, m2: m2.name, f2: m2.file });
    }
  }
}

if (warnings.length > 0) {
  console.warn(`
────────────────────────────────────────────────────────────────────────
  ⚠️ POTENTIAL DUPLICATE ENTITIES FOUND
────────────────────────────────────────────────────────────────────────`);
  for (const w of warnings) {
    console.warn(`   - ${w.m1} (${w.f1}) <==> ${w.m2} (${w.f2})`);
  }
  console.warn(`────────────────────────────────────────────────────────────────────────\n`);
}

console.log(`  ✅ Schema size gate passed: all ${files.length} schema files are under ${MAX_LINES} lines (${allModels.length} total models).`);
process.exit(0);
