#!/usr/bin/env node
/**
 * Suppression ratchet — ARCHITECTURE_REVIEW.md § R1
 *
 * Counts every mechanism that disables a quality guarantee and compares the count against a
 * committed baseline. Any INCREASE fails the build. Decreases are celebrated and, with
 * --update, written back so the baseline can never drift upward again.
 *
 * This is the gate that stops the bleeding while the 3,241-file @ts-nocheck debt is repaid.
 * It may not be relaxed, disabled, or worked around. See docs/ai/TRD.md ADR-005.
 *
 *   node scripts/ci/check-suppressions.mjs            # verify (used by CI + pre-push)
 *   node scripts/ci/check-suppressions.mjs --update   # ratchet the baseline DOWN
 *   node scripts/ci/check-suppressions.mjs --report   # per-module breakdown
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
const BASELINE_PATH = join(ROOT, '.quality-baseline.json');

// Scan whole workspaces, not hand-listed subdirectories.
//
// This was previously ['apps/api/src', 'apps/web/app', 'apps/web/src', 'packages'].
// When the platform split added apps/idp, apps/console, apps/developer and
// apps/extensions, every one of them landed outside that list — roughly 1,600
// `any` occurrences and four `@ts-nocheck` files became invisible to the ratchet
// while it still reported green. A ratchet that a new directory can walk around
// is not a ratchet.
//
// 'apps' and 'packages' are the workspace roots declared in pnpm-workspace.yaml,
// so anything added to the monorepo in future is covered by construction.
const SCAN_ROOTS = ['apps', 'packages'];
const SKIP_DIRS = new Set([
  'node_modules', 'dist', '.next', '.turbo', 'coverage', 'build',
  'generated', '.git', 'storybook-static',
]);
const EXTS = ['.ts', '.tsx', '.mts', '.cts'];

/** Each rule is one countable way of switching off a guarantee. */
const RULES = {
  tsNocheck: {
    label: '@ts-nocheck (whole file unchecked)',
    test: (line) => /^\s*(\/\/|\/\*)\s*@ts-nocheck\b/.test(line),
  },
  tsIgnore: {
    label: '@ts-ignore (single line unchecked)',
    test: (line) => /@ts-ignore\b/.test(line),
  },
  tsExpectError: {
    label: '@ts-expect-error',
    test: (line) => /@ts-expect-error\b/.test(line),
  },
  eslintDisable: {
    label: 'eslint-disable',
    test: (line) => /eslint-disable(-next-line|-line)?\b/.test(line),
  },
  explicitAny: {
    label: 'explicit `any`',
    // `: any`, `<any>`, `as any`, `any[]` — deliberately broad; escaping the ratchet by
    // swapping @ts-nocheck for `any` must not be possible.
    test: (line) => /(:\s*any\b|<any>|\bas\s+any\b|\bany\[\])/.test(line),
  },
  nonNullAssertion: {
    label: 'non-null assertion on an await/parse boundary',
    test: (line) => /(await\s+[^;]*\)!|JSON\.parse\([^)]*\)!)/.test(line),
  },
};

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (EXTS.some((e) => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

function moduleOf(relPath) {
  const parts = relPath.split(sep);
  const i = parts.indexOf('modules');
  if (i !== -1 && parts[i + 1]) return `api/${parts[i + 1]}`;
  if (parts[0] === 'packages' && parts[1]) return `pkg/${parts[1]}`;
  if (relPath.startsWith(join('apps', 'web'))) return 'web';
  if (relPath.startsWith(join('apps', 'api'))) return 'api/_core';
  return parts.slice(0, 2).join('/');
}

function scan() {
  const counts = Object.fromEntries(Object.keys(RULES).map((k) => [k, 0]));
  const byModule = new Map();
  let filesScanned = 0;

  for (const root of SCAN_ROOTS) {
    const abs = join(ROOT, root);
    if (!existsSync(abs)) continue;
    for (const file of walk(abs)) {
      filesScanned++;
      const rel = relative(ROOT, file);
      const mod = moduleOf(rel);
      if (!byModule.has(mod)) {
        byModule.set(mod, Object.fromEntries(Object.keys(RULES).map((k) => [k, 0])));
      }
      const bucket = byModule.get(mod);

      let text;
      try {
        text = readFileSync(file, 'utf8');
      } catch {
        continue;
      }
      for (const line of text.split('\n')) {
        for (const [key, rule] of Object.entries(RULES)) {
          if (rule.test(line)) {
            counts[key]++;
            bucket[key]++;
          }
        }
      }
    }
  }
  return { counts, byModule, filesScanned };
}

function loadBaseline() {
  if (!existsSync(BASELINE_PATH)) return null;
  try {
    return JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
  } catch {
    return null;
  }
}

function saveBaseline(counts, filesScanned) {
  const payload = {
    $comment:
      'Suppression ratchet baseline. These numbers may only go DOWN. See docs/ai/ARCHITECTURE_REVIEW.md R1. ' +
      'Regenerate with: node scripts/ci/check-suppressions.mjs --update',
    updatedAt: new Date().toISOString().slice(0, 10),
    filesScanned,
    counts,
  };
  writeFileSync(BASELINE_PATH, JSON.stringify(payload, null, 2) + '\n');
}

// ── main ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const { counts, byModule, filesScanned } = scan();
const baseline = loadBaseline();

if (args.includes('--report')) {
  const rows = [...byModule.entries()]
    .map(([mod, c]) => ({ mod, total: Object.values(c).reduce((a, b) => a + b, 0), ...c }))
    .filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total);
  console.log('\nSuppressions by module (worst first) — pick the smallest non-zero to clear next:\n');
  console.log('  total  nocheck  ignore  eslint     any   module');
  for (const r of rows.slice(0, 40)) {
    console.log(
      `  ${String(r.total).padStart(5)}  ${String(r.tsNocheck).padStart(7)}  ` +
        `${String(r.tsIgnore).padStart(6)}  ${String(r.eslintDisable).padStart(6)}  ` +
        `${String(r.explicitAny).padStart(6)}   ${r.mod}`,
    );
  }
  console.log(`\n  ${rows.length} modules carry suppressions.\n`);
  process.exit(0);
}

if (args.includes('--update') || !baseline) {
  if (!baseline) {
    console.log('No baseline found — establishing one from the current tree.');
  }
  saveBaseline(counts, filesScanned);
  console.log(`\n✅ Baseline written to .quality-baseline.json (${filesScanned} files scanned)\n`);
  for (const [key, rule] of Object.entries(RULES)) {
    console.log(`   ${String(counts[key]).padStart(6)}  ${rule.label}`);
  }
  console.log('\n   Commit this file. These numbers may only go down from here.\n');
  process.exit(0);
}

let failed = false;
let improved = false;
const lines = [];

for (const [key, rule] of Object.entries(RULES)) {
  const now = counts[key];
  const was = baseline.counts?.[key] ?? 0;
  const delta = now - was;
  if (delta > 0) {
    failed = true;
    lines.push(`   ❌ ${rule.label}: ${was} → ${now}  (+${delta})`);
  } else if (delta < 0) {
    improved = true;
    lines.push(`   ✅ ${rule.label}: ${was} → ${now}  (${delta})`);
  } else {
    lines.push(`   ·  ${rule.label}: ${now}`);
  }
}

console.log('\nSuppression ratchet — docs/ai/ARCHITECTURE_REVIEW.md § R1');
console.log(`Baseline ${baseline.updatedAt ?? 'unknown'} · ${filesScanned} files scanned\n`);
console.log(lines.join('\n'));

if (failed) {
  console.error(`
────────────────────────────────────────────────────────────────────────
  RATCHET VIOLATION — this change ADDS suppressions.

  A failing check means the code is wrong, not the check.
  Fix the underlying type or lint error instead of silencing it.

  If you genuinely believe an increase is unavoidable, it requires an
  explicit ADR in docs/ai/TRD.md § 9 and a CHANGELOG entry — not a
  quiet baseline bump.
────────────────────────────────────────────────────────────────────────
`);
  process.exit(1);
}

if (improved) {
  console.log(`
  🎉 Suppressions went DOWN. Lock it in so it can never come back:
     node scripts/ci/check-suppressions.mjs --update && git add .quality-baseline.json
`);
} else {
  console.log('\n  ✅ No new suppressions.\n');
}
process.exit(0);
