#!/usr/bin/env node
// Track G.8 schema lint (FOUNDATION_HARDENING_ROADMAP § 11b): forbid `Float`
// in schema.prisma outside the shrinking baseline. Money/quantity fields must
// be `Decimal` — Float rounding is unacceptable for financial data.
//
// Usage: node scripts/check-schema-lints.mjs
// Wired into CI and `pnpm schema:lint`. Exit 1 on any non-baselined Float.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readSchema } from './lib/read-schema.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// The schema is a multi-file folder since R2; this reads every part. Violations
// are reported as Model.field, not file:line, so concatenation is safe here.
const schema = readSchema(root);
const baseline = JSON.parse(readFileSync(path.join(root, 'scripts', 'schema-lint-baseline.json'), 'utf8'));
const allowed = new Set(baseline.allowed.map((entry) => `${entry.model}.${entry.field}`));

const moneyPattern = /amount|price|cost|total|subtotal|balance|qty|quantity|value|fee|charge|salary|wage|tax/i;

let currentModel = null;
const violations = [];
const moneyBaselined = [];

for (const rawLine of schema.split(/\r?\n/)) {
  const line = rawLine.trim();
  const modelMatch = line.match(/^model\s+(\w+)\s+\{/);
  if (modelMatch) {
    currentModel = modelMatch[1];
    continue;
  }
  if (line === '}') {
    currentModel = null;
    continue;
  }
  const fieldMatch = currentModel && line.match(/^(\w+)\s+Float(\?|\s|$)/);
  if (!fieldMatch) continue;

  const key = `${currentModel}.${fieldMatch[1]}`;
  if (!allowed.has(key)) {
    violations.push(key);
  } else if (moneyPattern.test(fieldMatch[1])) {
    moneyBaselined.push(key);
  }
}

if (moneyBaselined.length > 0) {
  console.log(`Tracked money-as-Float debt (queued for Decimal in the Track A release): ${moneyBaselined.join(', ')}`);
}

if (violations.length > 0) {
  console.error('Schema lint failed (Track G.8): `Float` is forbidden in schema.prisma — use `Decimal @db.Decimal(p,s)` for money/quantities, or justify a metric in scripts/schema-lint-baseline.json (baseline only ever shrinks):');
  for (const violation of violations) console.error(`  - ${violation}`);
  process.exit(1);
}

console.log(`Schema lint passed — ${allowed.size} baselined Float field(s), 0 new.`);
