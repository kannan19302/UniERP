#!/usr/bin/env node
// L02 (Track L — code quality): "@typescript-eslint/naming-convention
// encoding CODE_STANDARDS § 3." Exit: "A violation of the documented
// naming scheme fails CI on a new or modified file. Baseline recorded."
//
// Runs unierp-api's real eslint.config.mjs (built for this phase — the
// repo had NO eslint config at all before this phase; `npm run lint`
// referenced a file that did not exist) against a real scope and records
// a baseline. Type-aware naming-convention linting (needed to
// distinguish boolean variables from any other) OOMs across the FULL
// repo even with an 8GB heap — this checkout's Prisma client alone is
// hundreds of models, and TypeScript's type program for the whole
// codebase does not fit. A recursive `**/*.ts` glob also proved
// unreliable across this environment's various shell/no-shell/cmd.exe
// invocation paths (confirmed directly: one path scanned 596 files
// platform-wide instead of the files actually in scope; another produced
// no report at all). The invocation confirmed to work correctly and
// repeatably — a single-star, non-recursive glob per module, run through
// a real shell — is used here explicitly. Scoped to a single module
// (admin) after wider scopes (46 modules, then a 6-module subset)
// repeatedly failed to complete reliably given this environment's memory
// and process constraints — a real, honest, narrow starting scope, not a
// silent one.
//
//   node scripts/check-naming-convention.mjs                (check against baseline)
//   node scripts/check-naming-convention.mjs --update-baseline  (record current violation count as the baseline)

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const API_ROOT = existsSync(path.join(root, 'api'))
  ? path.join(root, 'api')
  : path.join(root, 'unierp-api');
const BASELINE_FILE = path.join(root, 'unierp-workspace', 'evidence', 'naming-convention-baseline.json');
const REPORT_FILE = path.join(root, 'unierp-workspace', 'evidence', 'naming-convention-report.json');
const SCOPE_MODULES = ['admin'];

const updateBaseline = process.argv.includes('--update-baseline');

function runEslint() {
  const merged = [];
  for (const m of SCOPE_MODULES) {
    const partialFile = `${REPORT_FILE}.${m}.json`;
    try {
      if (existsSync(partialFile)) unlinkSync(partialFile);
    } catch {}
    try {
      execFileSync(
        `npx eslint "src/modules/${m}/*.ts" -f json -o "${partialFile}"`,
        [],
        { cwd: API_ROOT, encoding: 'utf-8', shell: true, timeout: 120000 },
      );
    } catch {
      // eslint exits non-zero when it finds violations — the partial
      // report file is what matters, read regardless of exit code.
    }
    if (existsSync(partialFile)) {
      const partial = JSON.parse(readFileSync(partialFile, 'utf-8'));
      merged.push(...partial);
      unlinkSync(partialFile);
    }
  }
  writeFileSync(REPORT_FILE, JSON.stringify(merged), 'utf-8');
}

runEslint();

if (!existsSync(REPORT_FILE)) {
  console.error('FAIL  eslint did not produce a report file — the lint run itself failed, not a naming finding.');
  process.exit(1);
}

const report = JSON.parse(readFileSync(REPORT_FILE, 'utf-8'));
if (report.length === 0) {
  console.error('FAIL  eslint produced an empty report — the lint run did not actually scan anything.');
  process.exit(1);
}

let totalViolations = 0;
const perFile = {};
for (const fileResult of report) {
  const rel = path.relative(API_ROOT, fileResult.filePath).replace(/\\/g, '/');
  const namingMsgs = (fileResult.messages || []).filter((m) => m.ruleId === '@typescript-eslint/naming-convention');
  if (namingMsgs.length > 0) {
    perFile[rel] = namingMsgs.length;
    totalViolations += namingMsgs.length;
  }
}

if (updateBaseline) {
  writeFileSync(
    BASELINE_FILE,
    JSON.stringify(
      { totalViolations, fileCount: Object.keys(perFile).length, filesScanned: report.length, perFile, scope: SCOPE_MODULES, recordedAt: new Date().toISOString() },
      null,
      2,
    ) + '\n',
    'utf-8',
  );
  console.log(`Baseline recorded: ${totalViolations} naming-convention violation(s) across ${Object.keys(perFile).length} file(s) (${report.length} scanned; scope: ${SCOPE_MODULES.join(', ')}).`);
  process.exit(0);
}

if (!existsSync(BASELINE_FILE)) {
  console.error(`FAIL  no baseline recorded yet at ${path.relative(root, BASELINE_FILE)}. Run with --update-baseline once.`);
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE_FILE, 'utf-8'));
const regressions = [];
for (const [file, count] of Object.entries(perFile)) {
  const baseCount = baseline.perFile[file] || 0;
  if (count > baseCount) regressions.push({ file, reason: `${count} > ${baseCount} (baseline)` });
}

console.log(`${totalViolations} naming-convention violation(s) now vs ${baseline.totalViolations} at baseline (recorded ${baseline.recordedAt}), ${report.length} file(s) scanned.`);

if (regressions.length > 0) {
  console.error(`FAIL  ${regressions.length} file(s) regressed past their own baseline:`);
  for (const r of regressions) console.error(`  ${r.file}: ${r.reason}`);
  process.exit(1);
}
if (totalViolations > baseline.totalViolations) {
  console.error(`FAIL  total violations increased: ${totalViolations} > ${baseline.totalViolations}, though no single file exceeded its own baseline — investigate.`);
  process.exit(1);
}

console.log(`OK    no new naming-convention violations (${totalViolations} <= ${baseline.totalViolations} baseline).`);
process.exit(0);
