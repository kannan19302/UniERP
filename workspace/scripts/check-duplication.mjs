#!/usr/bin/env node
// L06 (Track L — code quality): "Copy-paste detection with a threshold,
// tuned to flag genuine duplication rather than incidental similarity."
// Exit: "Duplicating a 40-line block across modules fails CI. Baseline
// recorded and ratcheted. High-duplication clusters become L07-L10 work
// items."
//
// A real, deterministic sliding-window duplicate detector (not a
// third-party binary whose exact internals this repo cannot verify):
// for every module under unierp-api/src/modules, every consecutive
// MIN_LINES-line window of non-blank, whitespace-normalized source lines
// is hashed. Windows sharing a hash across TWO DIFFERENT modules are a
// cross-module duplicate — the exit criterion's own words, "across
// modules," not merely within one file or one module. Windows are then
// merged into contiguous duplicate BLOCKS (adjacent overlapping windows
// collapse into one finding) so a 200-line copy-paste is reported once,
// not as 160 overlapping 40-line windows.
//
//   node scripts/check-duplication.mjs                    (check against baseline)
//   node scripts/check-duplication.mjs --update-baseline    (record current count as the new baseline)
//   node scripts/check-duplication.mjs --clusters            (print high-duplication module-pair clusters for L07-L10 triage)

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SCAN_DIR = existsSync(path.join(root, 'api', 'src', 'modules'))
  ? path.join(root, 'api', 'src', 'modules')
  : path.join(root, 'unierp-api', 'src', 'modules');
const BASELINE_FILE = path.join(root, 'unierp-workspace', 'evidence', 'duplication-baseline.json');
const MIN_LINES = 40;

const updateBaseline = process.argv.includes('--update-baseline');
const showClusters = process.argv.includes('--clusters');

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '.next') continue;
    const full = path.join(dir, entry);
    let s;
    try {
      s = statSync(full);
    } catch {
      continue;
    }
    if (s.isDirectory()) walk(full, out);
    else if (entry.endsWith('.ts') && !entry.endsWith('.spec.ts') && !entry.endsWith('.d.ts')) out.push(full);
  }
  return out;
}

function moduleOf(filePath) {
  const rel = path.relative(SCAN_DIR, filePath).replace(/\\/g, '/');
  return rel.split('/')[0];
}

// Normalize a line for comparison: trim, collapse internal whitespace.
// This is deliberately conservative — it does NOT strip comments or
// rename identifiers (that would flag "incidental similarity," the exact
// false-positive class this phase's deliverable warns against). Two
// blocks only match if they are near-verbatim copy-pastes.
function normalize(line) {
  return line.trim().replace(/\s+/g, ' ');
}

const files = walk(SCAN_DIR);
const fileLines = new Map(); // filePath -> normalized non-blank lines with original line numbers
for (const f of files) {
  const raw = readFileSync(f, 'utf-8').split(/\r?\n/);
  const normalized = [];
  for (let i = 0; i < raw.length; i++) {
    const n = normalize(raw[i]);
    if (n.length > 0) normalized.push({ line: i + 1, text: n });
  }
  fileLines.set(f, normalized);
}

// hash -> list of { file, module, startWindowIndex }
const hashIndex = new Map();
for (const [file, lines] of fileLines) {
  const mod = moduleOf(file);
  for (let i = 0; i + MIN_LINES <= lines.length; i++) {
    const window = lines.slice(i, i + MIN_LINES).map((l) => l.text).join('\n');
    const hash = crypto.createHash('sha1').update(window).digest('hex');
    if (!hashIndex.has(hash)) hashIndex.set(hash, []);
    hashIndex.get(hash).push({ file, module: mod, windowStart: i });
  }
}

// Find hashes whose occurrences span >=2 distinct modules — a genuine
// cross-module duplicate window.
const crossModuleWindows = [];
for (const [hash, occurrences] of hashIndex) {
  const modules = new Set(occurrences.map((o) => o.module));
  if (modules.size < 2) continue;
  // Report each distinct module-pair once per hash (not every occurrence
  // combination) to avoid inflating counts when a block appears 3+ times.
  const seenPairs = new Set();
  for (let i = 0; i < occurrences.length; i++) {
    for (let j = i + 1; j < occurrences.length; j++) {
      if (occurrences[i].module === occurrences[j].module) continue;
      const pairKey = [occurrences[i].module, occurrences[j].module].sort().join('|') + '|' + hash;
      if (seenPairs.has(pairKey)) continue;
      seenPairs.add(pairKey);
      crossModuleWindows.push({ hash, a: occurrences[i], b: occurrences[j] });
    }
  }
}

// Merge adjacent/overlapping windows for the SAME (fileA, fileB, moduleA,
// moduleB) pair into one contiguous block, so a long copy-paste is one
// finding, not N overlapping MIN_LINES windows.
crossModuleWindows.sort((x, y) => {
  const ka = x.a.file + '|' + x.b.file;
  const kb = y.a.file + '|' + y.b.file;
  if (ka !== kb) return ka < kb ? -1 : 1;
  return x.a.windowStart - y.a.windowStart;
});

const blocks = [];
let current = null;
for (const w of crossModuleWindows) {
  const key = w.a.file + '|' + w.b.file;
  if (current && current.key === key && w.a.windowStart <= current.aEnd + 1) {
    current.aEnd = Math.max(current.aEnd, w.a.windowStart);
    current.bEnd = Math.max(current.bEnd, w.b.windowStart);
  } else {
    if (current) blocks.push(current);
    current = { key, moduleA: w.a.module, moduleB: w.b.module, fileA: w.a.file, fileB: w.b.file, aStart: w.a.windowStart, aEnd: w.a.windowStart, bEnd: w.b.windowStart };
  }
}
if (current) blocks.push(current);

const clusterMap = new Map();
for (const b of blocks) {
  const key = [b.moduleA, b.moduleB].sort().join(' <-> ');
  if (!clusterMap.has(key)) clusterMap.set(key, { pair: key, count: 0, totalLines: 0 });
  const c = clusterMap.get(key);
  c.count++;
  c.totalLines += (b.aEnd - b.aStart) + MIN_LINES;
}
const clusters = [...clusterMap.values()].sort((a, b2) => b2.totalLines - a.totalLines);

if (showClusters) {
  console.log(`${clusters.length} cross-module duplication cluster(s) (min ${MIN_LINES} lines per block):`);
  for (const c of clusters) {
    console.log(`  ${c.pair}: ${c.count} duplicate block(s), ~${c.totalLines} total duplicated lines`);
  }
  process.exit(0);
}

let baseline = null;
if (existsSync(BASELINE_FILE)) baseline = JSON.parse(readFileSync(BASELINE_FILE, 'utf-8'));

if (updateBaseline) {
  const newBaseline = {
    crossModuleBlockCount: blocks.length,
    minLines: MIN_LINES,
    recordedAt: new Date().toISOString(),
    clusterCount: clusters.length,
  };
  mkdirSync(path.dirname(BASELINE_FILE), { recursive: true });
  writeFileSync(BASELINE_FILE, JSON.stringify(newBaseline, null, 2) + '\n', 'utf-8');
  console.log(`Baseline recorded: ${blocks.length} cross-module duplicate block(s) (>=${MIN_LINES} lines), ${clusters.length} cluster(s).`);
  process.exit(0);
}

if (!baseline) {
  console.error(`FAIL  no baseline recorded yet at ${path.relative(root, BASELINE_FILE)}. Run with --update-baseline once.`);
  process.exit(1);
}

console.log(`Cross-module duplication (>=${MIN_LINES} lines): ${blocks.length} block(s) now vs ${baseline.crossModuleBlockCount} at baseline (recorded ${baseline.recordedAt}).`);

if (blocks.length > baseline.crossModuleBlockCount) {
  console.error(
    `FAIL  cross-module duplication increased: ${blocks.length} > ${baseline.crossModuleBlockCount} (baseline). ` +
      `A NEW duplicated block of >=${MIN_LINES} lines across two modules fails this gate.`,
  );
  process.exit(1);
}

console.log(`OK    cross-module duplication did not increase (${blocks.length} <= ${baseline.crossModuleBlockCount} baseline).`);
process.exit(0);
