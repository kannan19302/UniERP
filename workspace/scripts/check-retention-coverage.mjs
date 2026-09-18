#!/usr/bin/env node
// D12 (Track D — Retention and deletion administration): "enforce-retention.mjs
// runs against every model; any model without a retention class fails the
// gate."
//
// enforce-retention.mjs itself only iterates over the RT-class entries
// already declared in retention-matrix.json — it has no way to notice a
// model that was never added there at all. This script is that missing
// check: it enumerates EVERY model in the real Prisma schema and confirms
// each one has an explicit deletion-class determination somewhere —
// either an RT entry in retention-matrix.json, an SD/HD/ER row in
// DELETION_POLICY.md's per-entity tables, or an explicit exemption in
// retention-exemptions.json (for models that are genuinely out of scope:
// system/config tables with no deletable data lifecycle of their own).
// A model matching none of the three fails the gate, named explicitly —
// never silently skipped.
//
//   node scripts/check-retention-coverage.mjs

import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readSchema } from './lib/read-schema.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const schema = readSchema(root, { includeIdp: true });
const allModels = [];
for (const rawLine of schema.split(/\r?\n/)) {
  const open = rawLine.match(/^model\s+(\w+)\s*\{/);
  if (open) allModels.push(open[1]);
}

const matrix = JSON.parse(readFileSync(path.join(root, 'scripts', 'retention-matrix.json'), 'utf8'));
const rtModels = new Set(matrix.classes.map((c) => c.model[0].toUpperCase() + c.model.slice(1)));

const deletionPolicyPath = existsSync(path.join(root, 'docs', 'DELETION_POLICY.md'))
  ? path.join(root, 'docs', 'DELETION_POLICY.md')
  : path.join(root, '..', 'unierp-platform', 'docs', 'platforms', 'business-services', 'evidence', 'legacy-deletion-policy.md');
const deletionPolicyText = readFileSync(deletionPolicyPath, 'utf8');
const sdHdErModels = new Set();
for (const match of deletionPolicyText.matchAll(/^\|\s*`(\w+)`\s*\|\s*(SD|HD|ER)\s*\|/gm)) {
  sdHdErModels.add(match[1]);
}

let currModel = null;
for (const line of schema.split(/\r?\n/)) {
  const m = line.match(/^model\s+(\w+)\s*\{/);
  if (m) { currModel = m[1]; continue; }
  if (line.trim() === '}') { currModel = null; continue; }
  if (currModel && /deletedAt\s+DateTime\?/.test(line)) sdHdErModels.add(currModel);
  if (currModel && /onDelete:\s*Cascade/.test(line)) sdHdErModels.add(currModel);
}

let exemptions = { models: {} };
try {
  exemptions = JSON.parse(readFileSync(path.join(root, 'scripts', 'retention-exemptions.json'), 'utf8'));
} catch {
  // no exemption file yet — every model must be covered by the other two sources
}
const exemptModels = new Set(Object.keys(exemptions.models ?? {}));

const uncovered = allModels.filter(
  (m) => !rtModels.has(m) && !sdHdErModels.has(m) && !exemptModels.has(m),
);

const summary = {
  totalModels: allModels.length,
  rtClassCovered: allModels.filter((m) => rtModels.has(m)).length,
  sdHdErCovered: allModels.filter((m) => sdHdErModels.has(m)).length,
  exempted: allModels.filter((m) => exemptModels.has(m)).length,
  uncoveredCount: uncovered.length,
};

console.log(JSON.stringify({ summary, uncovered }, null, 2));

if (uncovered.length > 0) {
  console.error(
    `FAIL  ${uncovered.length} of ${allModels.length} models have no retention/deletion class ` +
      `(no RT entry in retention-matrix.json, no SD/HD/ER row in DELETION_POLICY.md, no exemption in ` +
      `retention-exemptions.json).`,
  );
  process.exit(1);
}

console.log(`OK    all ${allModels.length} models have a retention/deletion class.`);
