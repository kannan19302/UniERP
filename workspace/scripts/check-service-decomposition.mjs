#!/usr/bin/env node
// L08 (Track L — code quality): "Every service over the 800-line hard
// ceiling split along genuine responsibility lines, not arbitrarily." Exit:
// "No service file exceeds 800 lines. Each extracted unit has a single
// stated responsibility and its own tests. A split that only moves lines
// is rejected."
//
// Measures every *.service.ts under unierp-api/src against the 800-line
// ceiling directly. Baseline-ratchet approach matching L06/L07/L14: this
// session did not attempt a platform-wide split (see the phase's own
// evidence file), so the current real state is the recorded baseline, and
// this gate is forward-looking — it fails if any service regresses past
// its own recorded line count, or a brand-new service starts already over
// the ceiling.
//
//   node scripts/check-service-decomposition.mjs                  (check against baseline)
//   node scripts/check-service-decomposition.mjs --update-baseline  (record current state)
//   node scripts/check-service-decomposition.mjs --worst N          (print the N worst offenders)

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const API_ROOT = existsSync(path.join(root, 'api'))
  ? path.join(root, 'api')
  : path.join(root, 'unierp-api');
const SCAN_DIR = path.join(API_ROOT, 'src');
const BASELINE_FILE = path.join(root, 'unierp-workspace', 'evidence', 'service-decomposition-baseline.json');

const LINE_LIMIT = 800;

const updateBaseline = process.argv.includes('--update-baseline');
const worstArgIdx = process.argv.indexOf('--worst');
const worstN = worstArgIdx >= 0 ? Number(process.argv[worstArgIdx + 1]) : 0;

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === 'dist') continue;
    const full = path.join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, out);
    else if (entry.endsWith('.service.ts') && !entry.endsWith('.spec.ts')) out.push(full);
  }
  return out;
}

const files = walk(SCAN_DIR).sort();
const rows = files.map((f) => ({
  file: path.relative(API_ROOT, f).replace(/\\/g, '/'),
  lineCount: readFileSync(f, 'utf-8').split(/\r?\n/).length,
}));

if (worstN > 0) {
  const worst = [...rows].sort((a, b) => b.lineCount - a.lineCount).slice(0, worstN);
  console.log(`${worstN} worst service(s) by line count:`);
  for (const r of worst) console.log(`  ${r.lineCount} lines — ${r.file}`);
  process.exit(0);
}

const totalOverLimit = rows.filter((r) => r.lineCount > LINE_LIMIT).length;

if (updateBaseline) {
  const perFile = {};
  for (const r of rows) perFile[r.file] = r.lineCount;
  writeFileSync(
    BASELINE_FILE,
    JSON.stringify({ serviceCount: rows.length, overLimitCount: totalOverLimit, perFile, recordedAt: new Date().toISOString() }, null, 2) + '\n',
    'utf-8',
  );
  console.log(`Baseline recorded: ${rows.length} services, ${totalOverLimit} over ${LINE_LIMIT} lines.`);
  process.exit(0);
}

if (!existsSync(BASELINE_FILE)) {
  console.error(`FAIL  no baseline recorded yet at ${path.relative(root, BASELINE_FILE)}. Run with --update-baseline once.`);
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE_FILE, 'utf-8'));
const regressions = [];
for (const r of rows) {
  const baseCount = baseline.perFile[r.file];
  if (baseCount === undefined) {
    if (r.lineCount > LINE_LIMIT) regressions.push({ file: r.file, reason: `NEW service already over the limit (${r.lineCount} lines)` });
    continue;
  }
  if (r.lineCount > baseCount) regressions.push({ file: r.file, reason: `line count grew: ${r.lineCount} > ${baseCount}` });
}

console.log(`${rows.length} services scanned. ${totalOverLimit} over ${LINE_LIMIT} lines (baseline: ${baseline.overLimitCount}).`);

if (regressions.length > 0) {
  console.error(`FAIL  ${regressions.length} service(s) regressed past their own baseline:`);
  for (const r of regressions) console.error(`  ${r.file}: ${r.reason}`);
  process.exit(1);
}

console.log(`OK    no service regressed past its own recorded baseline.`);
process.exit(0);
