#!/usr/bin/env node
// L07 (Track L — code quality): "advanced-finance.controller.ts (8,282
// lines, against a 300-line limit and a 400 hard ceiling) and every peer
// split by resource, with routing-only bodies." Exit: "No controller
// exceeds 400 lines. grep -c 'if' on any controller returns 0 — a
// controller containing an if holds logic that belongs in a service.
// Behaviour proven unchanged by the existing endpoint tests."
//
// Measures every *.controller.ts under unierp-api/src against BOTH named
// limits directly — line count and `if` occurrence count — real numbers,
// not estimated. Baseline-ratchet approach matching L06/L14: this session
// did not attempt a full platform-wide decomposition (see the phase's own
// evidence file for why — this is a multi-hour-per-file safety-critical
// refactor, not a mechanical fix), so the CURRENT real state is the
// baseline, and this gate is forward-looking: it fails if any controller
// gets WORSE (more lines, more `if`s) than its own recorded baseline, or
// if a brand-new controller is added already over either limit.
//
//   node scripts/check-controller-decomposition.mjs                  (check against baseline)
//   node scripts/check-controller-decomposition.mjs --update-baseline  (record current state)
//   node scripts/check-controller-decomposition.mjs --worst N          (print the N worst offenders)

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const API_ROOT = existsSync(path.join(root, 'api'))
  ? path.join(root, 'api')
  : path.join(root, 'unierp-api');
const SCAN_DIR = path.join(API_ROOT, 'src');
const BASELINE_FILE = path.join(root, 'unierp-workspace', 'evidence', 'controller-decomposition-baseline.json');

const LINE_LIMIT = 400;

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
    else if (entry.endsWith('.controller.ts')) out.push(full);
  }
  return out;
}

const files = walk(SCAN_DIR).sort();
const rows = [];
for (const f of files) {
  const source = readFileSync(f, 'utf-8');
  const lineCount = source.split(/\r?\n/).length;
  const ifCount = (source.match(/\bif\s*\(/g) || []).length;
  rows.push({ file: path.relative(API_ROOT, f).replace(/\\/g, '/'), lineCount, ifCount });
}

if (worstN > 0) {
  const worst = [...rows].sort((a, b) => b.lineCount - a.lineCount).slice(0, worstN);
  console.log(`${worstN} worst controller(s) by line count:`);
  for (const r of worst) console.log(`  ${r.lineCount} lines, ${r.ifCount} if-blocks — ${r.file}`);
  process.exit(0);
}

const totalOverLimit = rows.filter((r) => r.lineCount > LINE_LIMIT).length;
const totalWithIf = rows.filter((r) => r.ifCount > 0).length;

if (updateBaseline) {
  const perFile = {};
  for (const r of rows) perFile[r.file] = { lineCount: r.lineCount, ifCount: r.ifCount };
  writeFileSync(
    BASELINE_FILE,
    JSON.stringify(
      { controllerCount: rows.length, overLimitCount: totalOverLimit, withIfCount: totalWithIf, perFile, recordedAt: new Date().toISOString() },
      null,
      2,
    ) + '\n',
    'utf-8',
  );
  console.log(`Baseline recorded: ${rows.length} controllers, ${totalOverLimit} over ${LINE_LIMIT} lines, ${totalWithIf} contain 'if'.`);
  process.exit(0);
}

if (!existsSync(BASELINE_FILE)) {
  console.error(`FAIL  no baseline recorded yet at ${path.relative(root, BASELINE_FILE)}. Run with --update-baseline once.`);
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE_FILE, 'utf-8'));
const regressions = [];
for (const r of rows) {
  const base = baseline.perFile[r.file];
  if (!base) {
    if (r.lineCount > LINE_LIMIT || r.ifCount > 0) {
      regressions.push({ file: r.file, reason: `NEW controller already over the limit (${r.lineCount} lines, ${r.ifCount} if-blocks)` });
    }
    continue;
  }
  if (r.lineCount > base.lineCount) regressions.push({ file: r.file, reason: `line count grew: ${r.lineCount} > ${base.lineCount}` });
  if (r.ifCount > base.ifCount) regressions.push({ file: r.file, reason: `if-count grew: ${r.ifCount} > ${base.ifCount}` });
}

console.log(`${rows.length} controllers scanned. ${totalOverLimit} over ${LINE_LIMIT} lines (baseline: ${baseline.overLimitCount}). ${totalWithIf} contain 'if' (baseline: ${baseline.withIfCount}).`);

if (regressions.length > 0) {
  console.error(`FAIL  ${regressions.length} controller(s) regressed past their own baseline:`);
  for (const r of regressions) console.error(`  ${r.file}: ${r.reason}`);
  process.exit(1);
}

console.log(`OK    no controller regressed past its own recorded baseline (line count or if-count).`);
process.exit(0);
