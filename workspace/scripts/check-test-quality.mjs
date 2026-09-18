#!/usr/bin/env node
// L14 (Track L — code quality): "A gate rejecting the always-passing
// patterns as a class: assertion-free it() blocks, toBeDefined() as the
// sole assertion, catch-anything assertions, and skipped tests without an
// issue reference." Exit: "Adding an assertion-free test fails CI. Adding
// catch (e) { expect(e).toBeDefined() } fails CI."
//
// Scans every *.spec.ts file under unierp-api/src (not just the
// *.coverage.spec.ts files L11/L12/L13 focused on — L14's own deliverable
// says "as a class," i.e. the whole suite going forward) and fails if any
// NEW violation of the four named patterns is found, using the same
// baseline-ratchet approach as L06's duplication gate: the pre-existing
// 1073 violations from L12's own unfinished work (D075) are grandfathered
// into the baseline so this gate is a forward-looking CI check, not a
// retroactive block on work L11-L13 already measured and filed honestly —
// but ANY file this gate has not already counted, or any NEW violation in
// an already-counted file, fails immediately.
//
//   node scripts/check-test-quality.mjs                    (check against baseline)
//   node scripts/check-test-quality.mjs --update-baseline    (record current violations as the baseline)

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const API_ROOT = existsSync(path.join(root, 'api'))
  ? path.join(root, 'api')
  : path.join(root, 'unierp-api');
const SCAN_DIR = path.join(API_ROOT, 'src');
const BASELINE_FILE = path.join(root, 'unierp-workspace', 'evidence', 'test-quality-baseline.json');

const updateBaseline = process.argv.includes('--update-baseline');

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
    else if (entry.endsWith('.spec.ts')) out.push(full);
  }
  return out;
}

function extractTestBlocks(source) {
  const blocks = [];
  const callRe = /\b(it|test)(\.skip|\.todo|\.only)?\s*\(\s*(['"`])((?:\\.|(?!\3).)*)\3\s*,\s*(?:async\s*)?\(\s*\)\s*=>\s*\{/g;
  let m;
  while ((m = callRe.exec(source))) {
    const modifier = m[2] || '';
    const bodyStart = m.index + m[0].length;
    let depth = 1;
    let i = bodyStart;
    while (i < source.length && depth > 0) {
      if (source[i] === '{') depth++;
      else if (source[i] === '}') depth--;
      i++;
    }
    const body = source.slice(bodyStart, i - 1);
    blocks.push({ name: m[4], modifier, body, index: m.index });
  }
  return blocks;
}

function isWeakAssertion(matcherCall) {
  return /\.(toBeDefined|toBeTruthy|toBeInstanceOf\(Object\))\s*\(\s*\)/.test(matcherCall);
}

// Returns a list of violation type strings (a block can violate more than one rule).
function classify(block, source) {
  const violations = [];

  if (/\.skip\b/.test(block.modifier) || /^x(it|test)\b/.test(block.name)) {
    const nearby = source.slice(Math.max(0, block.index - 200), block.index);
    const hasIssueRef = /(#\d+|ISSUE-\d+|JIRA-\d+|TICKET-\d+|https?:\/\/\S+)/i.test(nearby);
    if (!hasIssueRef) violations.push('skipped-without-issue-reference');
    return violations; // a skipped test's body never runs, so the other rules don't apply
  }

  const assertionRe = /\bexpect\s*\([^;]*?\)\s*(?:\.\w+\([^;]*?\))+/g;
  const assertions = block.body.match(assertionRe) || [];

  if (assertions.length === 0) {
    violations.push('assertion-free');
    return violations;
  }

  const hasTryCatch = /\btry\s*\{/.test(block.body) && /\bcatch\s*\(/.test(block.body);
  const allWeak = assertions.every((a) => isWeakAssertion(a));

  if (hasTryCatch && allWeak) violations.push('catch-anything-toBeDefined');
  else if (allWeak && assertions.length === 1) violations.push('sole-toBeDefined-assertion');

  return violations;
}

const files = walk(SCAN_DIR).sort();
const findings = []; // { file, blockName, violations }

for (const f of files) {
  const source = readFileSync(f, 'utf-8');
  const blocks = extractTestBlocks(source);
  for (const b of blocks) {
    const violations = classify(b, source);
    if (violations.length > 0) {
      findings.push({ file: path.relative(API_ROOT, f).replace(/\\/g, '/'), blockName: b.name, violations });
    }
  }
}

const totalViolations = findings.length;

if (updateBaseline) {
  const perFile = {};
  for (const f of findings) {
    perFile[f.file] = (perFile[f.file] || 0) + 1;
  }
  writeFileSync(
    BASELINE_FILE,
    JSON.stringify({ totalViolations, perFile, recordedAt: new Date().toISOString() }, null, 2) + '\n',
    'utf-8',
  );
  console.log(`Baseline recorded: ${totalViolations} violation(s) across ${Object.keys(perFile).length} file(s).`);
  process.exit(0);
}

if (!existsSync(BASELINE_FILE)) {
  console.error(`FAIL  no baseline recorded yet at ${path.relative(root, BASELINE_FILE)}. Run with --update-baseline once.`);
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE_FILE, 'utf-8'));
const currentPerFile = {};
for (const f of findings) currentPerFile[f.file] = (currentPerFile[f.file] || 0) + 1;

const newFiles = [];
const increasedFiles = [];
for (const [file, count] of Object.entries(currentPerFile)) {
  const baselineCount = baseline.perFile[file] || 0;
  if (baselineCount === 0) newFiles.push({ file, count });
  else if (count > baselineCount) increasedFiles.push({ file, count, baselineCount });
}

console.log(`Test-quality violations: ${totalViolations} now vs ${baseline.totalViolations} at baseline (recorded ${baseline.recordedAt}).`);

if (newFiles.length > 0 || increasedFiles.length > 0) {
  console.error('FAIL  test-quality violations increased:');
  for (const f of newFiles) console.error(`  NEW file with violations: ${f.file} (${f.count})`);
  for (const f of increasedFiles) console.error(`  ${f.file}: ${f.count} > ${f.baselineCount} (baseline)`);
  process.exit(1);
}

if (totalViolations > baseline.totalViolations) {
  console.error(`FAIL  total violations increased: ${totalViolations} > ${baseline.totalViolations}, though no single file exceeded its own baseline (redistribution across files) — investigate.`);
  process.exit(1);
}

console.log(`OK    no new assertion-free / sole-toBeDefined / catch-anything / unreferenced-skip violations (${totalViolations} <= ${baseline.totalViolations} baseline).`);
process.exit(0);
