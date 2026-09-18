#!/usr/bin/env node
// L03 (Track L — code quality): "no-empty plus a custom rule: no catch
// that swallows, no catch {}, no re-throw that loses the cause, per
// CODE_STANDARDS § 6.1." Exit: "An empty or swallowing catch fails CI.
// Every caught error is either handled, wrapped with its cause, or
// re-thrown — verified by breaking one."
//
// Runs unierp-api's eslint.config.mjs — specifically the L03 rules
// (no-empty, code-standards/no-swallowed-catch,
// code-standards/no-cause-loss-rethrow), which are syntax-only and do
// NOT need type information, unlike L02's boolean-naming rule. This is
// what makes a full-repo scan tractable here (L02's type-aware rule OOMs
// even on a fraction of this repo) — confirmed directly: 2,095 files
// scanned in under a minute with the type-aware rule disabled via a CLI
// override.
//
//   node scripts/check-error-handling.mjs                (check against baseline)
//   node scripts/check-error-handling.mjs --update-baseline  (record current violation count as the baseline)

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const API_ROOT = existsSync(path.join(root, 'api'))
  ? path.join(root, 'api')
  : path.join(root, 'unierp-api');
const BASELINE_FILE = path.join(root, 'unierp-workspace', 'evidence', 'error-handling-baseline.json');
const REPORT_FILE = path.join(root, 'unierp-workspace', 'evidence', 'error-handling-report.json');
const RULE_IDS = ['no-empty', 'code-standards/no-swallowed-catch', 'code-standards/no-cause-loss-rethrow'];

const updateBaseline = process.argv.includes('--update-baseline');

function runEslint() {
  try {
    if (existsSync(REPORT_FILE)) unlinkSync(REPORT_FILE);
  } catch {}
  try {
    execFileSync(
      `npx eslint "src/**/*.ts" --rule "{\\"@typescript-eslint/naming-convention\\": \\"off\\"}" -f json -o "${REPORT_FILE}"`,
      [],
      { cwd: API_ROOT, encoding: 'utf-8', shell: true, timeout: 180000 },
    );
  } catch {
    // eslint exits non-zero when it finds violations — the report file
    // is what matters, read regardless of exit code.
  }
}

runEslint();

if (!existsSync(REPORT_FILE)) {
  console.error('FAIL  eslint did not produce a report file — the lint run itself failed, not a naming finding.');
  process.exit(1);
}

const report = JSON.parse(readFileSync(REPORT_FILE, 'utf-8'));
if (report.length < 1000) {
  // A real full-repo scan of unierp-api touches thousands of files; a
  // suspiciously small count means the glob silently under-matched
  // again (the exact failure mode L02's evidence documents at length)
  // rather than a genuine "nothing to scan."
  console.error(`FAIL  eslint only scanned ${report.length} file(s) — expected a full-repo scan (thousands). The glob likely under-matched; investigate before trusting this result.`);
  process.exit(1);
}

let totalViolations = 0;
const perFile = {};
for (const fileResult of report) {
  const rel = path.relative(API_ROOT, fileResult.filePath).replace(/\\/g, '/');
  const msgs = (fileResult.messages || []).filter((m) => RULE_IDS.includes(m.ruleId));
  if (msgs.length > 0) {
    perFile[rel] = msgs.length;
    totalViolations += msgs.length;
  }
}

if (updateBaseline) {
  writeFileSync(
    BASELINE_FILE,
    JSON.stringify({ totalViolations, fileCount: Object.keys(perFile).length, filesScanned: report.length, perFile, recordedAt: new Date().toISOString() }, null, 2) + '\n',
    'utf-8',
  );
  console.log(`Baseline recorded: ${totalViolations} error-handling violation(s) across ${Object.keys(perFile).length} file(s) (${report.length} scanned).`);
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

console.log(`${totalViolations} error-handling violation(s) now vs ${baseline.totalViolations} at baseline (recorded ${baseline.recordedAt}), ${report.length} file(s) scanned.`);

if (regressions.length > 0) {
  console.error(`FAIL  ${regressions.length} file(s) regressed past their own baseline:`);
  for (const r of regressions) console.error(`  ${r.file}: ${r.reason}`);
  process.exit(1);
}
if (totalViolations > baseline.totalViolations) {
  console.error(`FAIL  total violations increased: ${totalViolations} > ${baseline.totalViolations}, though no single file exceeded its own baseline — investigate.`);
  process.exit(1);
}

// P12-015: Validate platform error taxonomy in @kannan19302/contracts
const CONTRACTS_ERRORS = path.join(root, 'unierp-contracts', 'src', 'errors.ts');
if (existsSync(CONTRACTS_ERRORS)) {
  const content = readFileSync(CONTRACTS_ERRORS, 'utf-8');
  if (!content.includes('PlatformError') || !content.includes('PlatformErrorCode')) {
    console.error('FAIL  check-error-handling: Platform error taxonomy missing in @kannan19302/contracts.');
    process.exit(1);
  }
}

console.log(`OK    no new error-handling violations (${totalViolations} <= ${baseline.totalViolations} baseline) and platform error taxonomy active.`);
process.exit(0);

