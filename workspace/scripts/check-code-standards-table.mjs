#!/usr/bin/env node
// L19 (Track L — code quality): "Every mechanisable row of
// CODE_STANDARDS § 9.1 (blocking) and § 9.2 (quality) converted to a
// check; § 9.3 (maintainability judgement) left explicitly to review,
// with the split documented." Exit: "CODE_STANDARDS § 10's table has no
// ⏳ rows left — every entry is either ✅ Active or explicitly 🔍
// Review-only with a stated reason why it cannot be mechanised."
//
// Parses § 10's actual markdown TABLE rows specifically (not a blind
// whole-file grep, which would false-positive on legitimate historical
// prose mentioning the ⏳ symbol, e.g. "the rows that were ⏳ above") and
// fails if any table row's Status cell still contains ⏳.
//
//   node scripts/check-code-standards-table.mjs

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const STANDARDS_FILE = path.join(root, 'unierp-workspace', 'docs', 'ai', 'CODE_STANDARDS.md');

const content = readFileSync(STANDARDS_FILE, 'utf-8');

// Isolate § 10's own table: from its heading to the next `---` divider.
const sectionMatch = content.match(/## 10\. What is enforced mechanically vs\. by review([\s\S]*?)\n---/);
if (!sectionMatch) {
  console.error('FAIL  could not locate the § 10 "What is enforced mechanically vs. by review" section at all — has it been renamed or removed?');
  process.exit(1);
}
const section = sectionMatch[1];

// Real markdown table rows only: lines starting with `|` that are not the
// header separator row (`| :--- | :--- |` etc).
const tableRows = section
  .split('\n')
  .filter((line) => line.trim().startsWith('|'))
  .filter((line) => !/^\|[\s:-]+\|/.test(line.trim()));

if (tableRows.length === 0) {
  console.error('FAIL  no table rows found in § 10 — the table itself may be missing or malformed.');
  process.exit(1);
}

const pendingRows = tableRows.filter((row) => row.includes('⏳'));

console.log(`${tableRows.length} row(s) in § 10's table.`);
if (pendingRows.length > 0) {
  console.error(`FAIL  ${pendingRows.length} row(s) still marked ⏳ (pending):`);
  for (const row of pendingRows) console.error(`  ${row.trim()}`);
  process.exit(1);
}

console.log('OK    every row in § 10\'s table is ✅ Active or 🔍 Review-only — no ⏳ rows remain.');
process.exit(0);
