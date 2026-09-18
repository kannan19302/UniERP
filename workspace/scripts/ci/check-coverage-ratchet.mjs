#!/usr/bin/env node
/**
 * J02 (Track J — quality) exit criterion: "Deleting any test file fails CI in
 * every repo. Coverage floor recorded per repo and never lowered without a
 * logged amendment (D002)."
 *
 * This is the gate. It is deliberately provider-independent: vitest coverage
 * (`all: true` + thresholds) only fires where the provider is installed and the
 * run passes `--coverage`, and repos with no vitest config at all (or Flutter's
 * `_test.dart` suites) can never trip a coverage threshold. A coverage floor
 * that repos can simply opt out of is D002 again. So the load-bearing mechanism
 * is a per-repo TEST COUNT:
 *
 *   - a committed manifest (docs/coverage-ratchet.json) records, per sibling
 *     repo, how many test files it had and, where a vitest config declares
 *     coverage thresholds, the values it declared;
 *   - scanning the tree now must find >= the recorded count in every repo —
 *     deleting any test file in any repo fails CI, regardless of runner or
 *     coverage provider;
 *   - a repo's declared coverage thresholds must not fall below the recorded
 *     floor (D002: never lowered without a logged amendment);
 *   - `--update` ratchets the baseline upward only. It never silently lowers a
 *     recorded floor; that requires the D002 amendment log.
 *
 * Usage:
 *   node scripts/ci/check-coverage-ratchet.mjs              verify
 *   node scripts/ci/check-coverage-ratchet.mjs --update     record current counts/thresholds (upward only)
 *   node scripts/ci/check-coverage-ratchet.mjs --report     print the table, never write
 *
 * Proven able to fail (the point of the whole track): deleting any test file in
 * any sibling repo makes this exit 1 naming the repo, and so does lowering a
 * declared coverage threshold below the recorded floor.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = join(HERE, "..", "..");
const FAMILY = join(WORKSPACE, "..");
const MANIFEST_FILE = join(WORKSPACE, "docs", "coverage-ratchet.json");

// CI mode. The reusable workflow checks out the caller at `target` and
// unierp-workspace at `gate`; a repo's CI can only see its own tree, so it
// verifies ITS recorded floor against ITS current count — deleting any test
// file in that repo fails that repo's CI. When unset, this runs in the
// workspace tree with all siblings visible, which is the full-scan mode.
const CI_ROOT = process.env.RATCHET_ROOT ? resolve(process.env.RATCHET_ROOT) : null;
const CI_REPO = process.env.RATCHET_REPO || null;
const CI_MANIFEST =
  process.env.RATCHET_MANIFEST || (CI_ROOT ? join(CI_ROOT, "unierp-workspace", "docs", "coverage-ratchet.json") : MANIFEST_FILE);

// Same test-file recognition as J01's taxonomy gate — plus `.tsx`, which the
// J01 gate's regex misses (design-system ships 10 `.test.tsx` files that its
// taxonomy manifest counts as 0; filing as a defect, widening here so J02's
// "deleting any test file fails CI" actually covers them). Separator-agnostic
// (Windows backslashes too) and skips generated/ephemeral trees.
const TEST_RE = /\.(spec|test|e2e)\.tsx?$|_test\.dart$/;
const IGNORE =
  /node_modules|\.git[/\\]|dist[/\\]|build[/\\]|coverage|\.next|[/\\]load-tests[/\\]|\.plugin_symlinks|\.dart_tool|ephemeral[/\\]/;

const args = process.argv.slice(2);
const UPDATE = args.includes("--update");
const REPORT = args.includes("--report");

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (IGNORE.test(entry)) continue;
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, out);
    else if (TEST_RE.test(entry)) out.push(full);
  }
  return out;
}

function siblingRepos() {
  return readdirSync(FAMILY)
    .filter(
      (d) =>
        d.startsWith("unierp-") &&
        statSync(join(FAMILY, d)).isDirectory() &&
        existsSync(join(FAMILY, d, ".git")),
    )
    .filter((d) => !["unierp-app-education", "unierp-app-fieldservice", "unierp-app-healthcare", "unierp-app-realestate"].includes(d));
}

// Pull `coverage: { all: true, thresholds: { lines: N, ... } }` out of a repo's
// vitest config with a light regex parse. It reads what the repo declares; it
// does not import the config, so it never runs the repo's build.
function declaredCoverage(repoDir) {
  const cfgFile = join(repoDir, "vitest.config.ts");
  if (!existsSync(cfgFile)) return null;
  const text = readFileSync(cfgFile, "utf8");
  if (!text.includes("coverage")) return null;

  const thresholds = {};
  const tMatch = text.match(/thresholds\s*:\s*\{([^}]*)\}/);
  if (tMatch) {
    for (const [, k, v] of tMatch[1].matchAll(/(lines|functions|branches|statements)\s*:\s*(\d+)/g)) {
      thresholds[k] = Number(v);
    }
  }
  return {
    declared: thresholds,
    allTrue: /all\s*:\s*true/.test(text),
  };
}

// ── read baseline ────────────────────────────────────────────────────────────
let baseline = { generatedAt: null, repos: {} };
if (existsSync(CI_MANIFEST)) {
  baseline = JSON.parse(readFileSync(CI_MANIFEST, "utf8"));
  baseline.repos = baseline.repos ?? {};
}

// ── scan reality ─────────────────────────────────────────────────────────────
const repos = CI_ROOT ? [CI_REPO] : siblingRepos();
const reality = {};
for (const repo of repos) {
  reality[repo] = {
    testFiles: walk(CI_ROOT || join(FAMILY, repo)).length,
    coverage: declaredCoverage(CI_ROOT || join(FAMILY, repo)),
  };
}

// ── --report ─────────────────────────────────────────────────────────────────
if (REPORT) {
  console.log("COVERAGE RATCHET — recorded baseline vs reality");
  console.log("=".repeat(88));
  console.log(
    `${"REPO".padEnd(28)} | ${"recorded".padEnd(9)} | ${"now".padEnd(6)} | ${"declared thresholds (lines/funcs/branches/stmts)".padEnd(38)}`,
  );
  console.log("-".repeat(88));
  for (const repo of repos) {
    const rec = baseline.repos[repo];
    const now = reality[repo];
    const recCount = rec ? String(rec.testFiles) : "—";
    const decl = now.coverage
      ? `${now.coverage.declared.lines ?? "—"}/${now.coverage.declared.functions ?? "—"}/${now.coverage.declared.branches ?? "—"}/${now.coverage.declared.statements ?? "—"}` + (now.coverage.allTrue ? " (all:true)" : " (all:false)")
      : "no coverage block";
    console.log(`${repo.padEnd(28)} | ${recCount.padEnd(9)} | ${String(now.testFiles).padEnd(6)} | ${decl}`);
  }
  console.log("=".repeat(88));
  process.exit(0);
}

// ── --update: ratchet upward only ────────────────────────────────────────────
if (UPDATE) {
  const next = { ...baseline.repos };
  for (const repo of repos) {
    const now = reality[repo];
    const rec = next[repo];
    const testFiles = rec ? Math.max(rec.testFiles, now.testFiles) : now.testFiles;
    let coverage = rec?.coverage ?? {};
    if (now.coverage) {
      // Record thresholds at max(recorded, declared) — the floor may only rise.
      for (const k of ["lines", "functions", "branches", "statements"]) {
        const declared = now.coverage.declared[k];
        const recorded = coverage[k];
        if (declared !== undefined) {
          coverage[k] = recorded === undefined ? declared : Math.max(recorded, declared);
        }
      }
      coverage.allTrue = now.coverage.allTrue;
    }
    next[repo] = { testFiles, coverage };
  }
  const out = { generatedAt: new Date().toISOString(), repos: next };
  writeFileSync(CI_MANIFEST, JSON.stringify(out, null, 2) + "\n");
  console.log(
    `check-coverage-ratchet: baseline updated — ${Object.keys(next).length} repo(s), ` +
      `${Object.values(next).reduce((s, r) => s + r.testFiles, 0)} total test files.`,
  );
  process.exit(0);
}

// ── verify ───────────────────────────────────────────────────────────────────
const problems = [];
let totalRecorded = 0;
let totalNow = 0;

for (const repo of repos) {
  const rec = baseline.repos[repo];
  const now = reality[repo];
  totalNow += now.testFiles;
  if (rec) totalRecorded += rec.testFiles;

  if (rec) {
    if (now.testFiles < rec.testFiles) {
      problems.push(
        `${repo}: recorded ${rec.testFiles} test file(s), found ${now.testFiles} — a test file was deleted. Restore it, or ratchet the floor down ONLY via a logged D002 amendment.`,
      );
    }
    const floor = rec.coverage ?? {};
    if (now.coverage) {
      for (const k of ["lines", "functions", "branches", "statements"]) {
        const declared = now.coverage.declared[k];
        const recVal = floor[k];
        if (recVal !== undefined && declared !== undefined && declared < recVal) {
          problems.push(
            `${repo}: coverage ${k} threshold lowered ${recVal} → ${declared}. The floor may only rise; a lowering needs a logged amendment (D002).`,
          );
        }
      }
      if (floor.allTrue && !now.coverage.allTrue) {
        problems.push(`${repo}: coverage "all: true" removed — a coverage floor with "all: false" cannot fail (D002).`);
      }
    } else if (Object.keys(floor).length > 0) {
      problems.push(`${repo}: had a declared coverage floor but no coverage block is present now.`);
    }
  } else {
    problems.push(
      `${repo}: ${now.testFiles} test file(s) but no record in docs/coverage-ratchet.json — run scripts/ci/check-coverage-ratchet.mjs --update and commit.`,
    );
  }
}

// A repo that declared coverage before and still declares it must keep `all: true`.
for (const repo of repos) {
  const now = reality[repo];
  if (now.coverage && !now.coverage.allTrue && now.testFiles > 0) {
    problems.push(`${repo}: coverage block must set all: true (D002) — all: false reports a number that cannot fail.`);
  }
}

if (problems.length) {
  console.error(`check-coverage-ratchet: ${problems.length} problem(s)\n`);
  for (const p of problems) console.error(`FAIL  ${p}`);
  console.error(
    `\nJ02 exit criterion: deleting any test file fails CI in every repo; coverage floor recorded per repo\n` +
      `and never lowered without a logged amendment (D002). Fix the cause, or run --update (upward only).\n`,
  );
  process.exit(1);
}

console.log(
  `OK    ${repos.length} repo(s) scanned, ${totalNow} test file(s) on disk vs ${totalRecorded} recorded floor(s); ` +
    `no test deleted, no coverage floor lowered.`,
);
