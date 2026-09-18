#!/usr/bin/env node
/**
 * One-time generator for the Float→Decimal(19,4) migration — ARCHITECTURE_REVIEW § R11.
 *
 * There is no live database in this environment to run `prisma migrate dev` and diff
 * automatically, so this derives the exact ALTER COLUMN SQL from the schema itself: for each
 * money field, resolve the model's @@map table name and the field's @map column name, and
 * emit a safe USING cast. Deterministic and mechanical — the same 74 fields the classifier
 * just converted in schema.prisma.
 *
 *   node scripts/ci/generate-float-migration.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readSchema } from '../lib/read-schema.mjs';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
// Multi-file schema since R2 — see scripts/lib/read-schema.mjs.
const schema = readSchema(ROOT);

const targets = readFileSync(join(ROOT, 'scripts', 'ci', '.float-worklist.txt'), 'utf8')
  .split('\n').map((s) => s.trim()).filter(Boolean);

// Re-derive the same MONEY set the classifier used, by checking which of these fields are
// now actually typed Decimal(19,4) in the schema (i.e. were converted).
function resolve(modelName, fieldName) {
  const modelRe = new RegExp(`model\\s+${modelName}\\s*\\{([\\s\\S]*?)\\n\\}`, 'm');
  const m = schema.match(modelRe);
  if (!m) return null;
  const body = m[1];

  const tableMap = body.match(/@@map\("([\w]+)"\)/);
  // Fallback: Prisma's implicit snake_case-plural convention isn't guaranteed, so require
  // an explicit @@map — every model in this schema carries one (BACKEND_SCHEMA § 2).
  if (!tableMap) return null;
  const table = tableMap[1];

  const fieldRe = new RegExp(`\\n\\s*${fieldName}\\s+Decimal(\\??)\\s+(?:@default\\(([^)]*)\\)\\s*)?(?:@map\\("([\\w]+)"\\)\\s*)?(?:@db\\.Decimal\\(19,4\\))`, 'm');
  const fm = body.match(fieldRe);
  if (!fm) return null;

  return {
    table,
    column: fm[3] || fieldName, // no @map means the column name equals the field name
    nullable: fm[1] === '?',
    hasDefault: fm[2] !== undefined,
  };
}

const resolved = [];
const skipped = [];
for (const entry of targets) {
  const [model, field] = entry.split('.');
  const r = resolve(model, field);
  if (r) resolved.push({ entry, ...r });
  else skipped.push(entry);
}
// WebOrder wasn't in the worklist (it was already-tracked debt) — include it explicitly.
for (const [model, field] of [['WebOrder', 'subtotal'], ['WebOrder', 'total']]) {
  const r = resolve(model, field);
  if (r) resolved.push({ entry: `${model}.${field}`, ...r });
}

console.log(`Resolved ${resolved.length} converted fields (${skipped.length} not converted — metrics, skipped).`);

const lines = [
  '-- Float -> Decimal(19,4) for genuine monetary fields.',
  '-- docs/ai/ARCHITECTURE_REVIEW.md § F11 / R11.',
  '--',
  '-- Postgres allows an in-place ALTER COLUMN TYPE from double precision to numeric; the',
  '-- USING clause performs an explicit, checked cast rather than relying on an implicit one.',
  '-- This is a full-table rewrite per column (ACCESS EXCLUSIVE lock) — acceptable here because',
  '-- these are low-traffic, mostly-empty vertical/analytics tables, not the hot OLTP path.',
  '-- Any table later found to be high-traffic should be migrated via the expand/backfill/',
  '-- contract pattern in BACKEND_SCHEMA.md § 9 instead of an in-place ALTER.',
  '',
];

const byTable = new Map();
for (const r of resolved) {
  if (!byTable.has(r.table)) byTable.set(r.table, []);
  byTable.get(r.table).push(r);
}

for (const [table, cols] of [...byTable.entries()].sort()) {
  lines.push(`-- ${table}`);
  for (const c of cols) {
    lines.push(
      `ALTER TABLE "${table}" ALTER COLUMN "${c.column}" TYPE DECIMAL(19,4) USING "${c.column}"::DECIMAL(19,4);`,
    );
  }
  lines.push('');
}

const dir = join(
  ROOT, 'packages', 'database', 'prisma', 'migrations',
  `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}000000_convert_float_money_to_decimal`,
);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'migration.sql'), lines.join('\n') + '\n');

console.log(`\n✅ Migration written: ${dir.replace(ROOT, '.')}/migration.sql`);
console.log(`   ${resolved.length} ALTER COLUMN statements across ${byTable.size} tables.`);
console.log('\n⚠ THIS MUST STILL BE REVIEWED BY HAND AND APPLIED VIA `pnpm db:deploy` AGAINST A');
console.log('   REAL DATABASE BEFORE IT IS TRUSTED — BACKEND_SCHEMA.md § 9 rule 2. No database');
console.log('   was available in this environment to verify it applies cleanly.');
if (skipped.length) {
  console.log(`\n   ${skipped.length} worklist entries were not found as Decimal(19,4) (expected —`);
  console.log('   these are the fields classified as metric, not money):');
}
