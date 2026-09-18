#!/usr/bin/env node
// Track H.4: retention enforcement over the platform data classes declared in
// scripts/retention-matrix.json.
//
//   node scripts/enforce-retention.mjs             # DRY RUN — counts only
//   node scripts/enforce-retention.mjs --apply     # actually delete
//
// Privileged maintenance path (roadmap C.3 doctrine): runs with the app's DB
// credentials across all tenants, is loud (JSON summary to stdout), and must
// be scheduled explicitly (cron / CI / Task Scheduler) — never implicitly.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const matrix = JSON.parse(readFileSync(path.join(root, 'scripts', 'retention-matrix.json'), 'utf8'));
const apply = process.argv.includes('--apply');

// Load root .env (same precedence as the API's loadEnv: real env wins).
try {
  for (const line of readFileSync(path.join(root, '.env'), 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
} catch {
  // no .env — rely on real environment
}

const require = createRequire(path.join(root, 'packages', 'database', 'package.json'));
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const results = [];
let failed = false;

for (const entry of matrix.classes) {
  const cutoff = new Date(Date.now() - entry.retentionDays * 24 * 60 * 60 * 1000);
  const where = { ...entry.where, [entry.timestampField]: { lt: cutoff } };
  const delegate = prisma[entry.model];
  if (!delegate) {
    results.push({ dataClass: entry.dataClass, error: `unknown model ${entry.model}` });
    failed = true;
    continue;
  }
  try {
    const candidates = await delegate.count({ where });
    let deleted = 0;
    if (apply && candidates > 0) {
      deleted = (await delegate.deleteMany({ where })).count;
    }
    results.push({
      dataClass: entry.dataClass,
      model: entry.model,
      retentionDays: entry.retentionDays,
      cutoff: cutoff.toISOString(),
      candidates,
      deleted: apply ? deleted : null,
    });
  } catch (error) {
    results.push({ dataClass: entry.dataClass, error: String(error.message ?? error) });
    failed = true;
  }
}

await prisma.$disconnect();
console.log(JSON.stringify({ mode: apply ? 'APPLY' : 'DRY-RUN', ranAt: new Date().toISOString(), results }, null, 2));
if (failed) process.exit(1);
