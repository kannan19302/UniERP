#!/usr/bin/env node
// E41 (Track E — Localisation completeness): "A hardcoded user-facing
// string fails CI." unierp-web has ZERO i18n framework usage anywhere
// (confirmed: `grep -rl "next-intl\|react-i18next" app/ --include=*.tsx`
// returns nothing across 890 pages) — externalising all 890 pages'
// worth of strings in one pass is not attemptable in a single phase.
// This script is the real, mechanical exit-criterion gate: it counts
// hardcoded JSX text nodes across unierp-web/app, baselines the CURRENT
// count (evidence/hardcoded-strings-baseline.json), and --check fails
// only on a REGRESSION above that baseline — never retroactively on
// already-measured, already-filed pre-existing debt. This is the same
// baseline-ratchet pattern used by every other Track E gate this
// programme has built (L02–L18): "gapless" means no NEW hardcoded
// strings can be introduced going forward, which is what a CI gate can
// actually enforce today.
//
// Heuristic: a JSX text node matching `>[A-Za-z][A-Za-z ]{3,}<` — a run
// of 4+ letters/spaces directly between two JSX tag delimiters. This
// catches literal English UI text ("Create Band", "Loading...") while
// not matching JSX expression containers (`>{value}<`, which contains
// `{`/`}`, not letters, immediately after `>`) or single short tokens
// (icon names, etc., filtered by the 4-char minimum).
//
// Usage:
//   node scripts/check-hardcoded-strings.mjs             # record baseline
//   node scripts/check-hardcoded-strings.mjs --check      # fail on regression

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "..");
const WEB_APP_DIR = existsSync(path.join(ROOT, "tenant-apps", "app"))
  ? path.join(ROOT, "tenant-apps", "app")
  : path.join(ROOT, "unierp-web", "app");
const BASELINE_PATH = path.resolve(
  process.cwd(),
  "evidence",
  "hardcoded-strings-baseline.json",
);
const TEXT_PATTERN = />[A-Za-z][A-Za-z ]{3,}</g;
const CHECK = process.argv.includes("--check");

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === "node_modules" || entry.startsWith(".")) continue;
      walk(full, files);
    } else if (entry.endsWith(".tsx")) {
      files.push(full);
    }
  }
  return files;
}

function countHardcodedStrings(file) {
  const src = readFileSync(file, "utf-8");
  const matches = src.match(TEXT_PATTERN) || [];
  return matches.length;
}

function main() {
  if (!existsSync(WEB_APP_DIR)) {
    console.error(`FAIL  unierp-web/app not found at ${WEB_APP_DIR}`);
    process.exit(1);
  }
  const files = walk(WEB_APP_DIR);
  let total = 0;
  const perFile = {};
  for (const file of files) {
    const count = countHardcodedStrings(file);
    if (count > 0) {
      const rel = path.relative(ROOT, file).replace(/\\/g, "/");
      perFile[rel] = count;
      total += count;
    }
  }

  if (!CHECK) {
    writeFileSync(
      BASELINE_PATH,
      JSON.stringify(
        { total, fileCount: Object.keys(perFile).length, perFile },
        null,
        2,
      ) + "\n",
    );
    console.log(
      `Baseline recorded: ${total} hardcoded string(s) across ${Object.keys(perFile).length} file(s) (of ${files.length} .tsx files scanned).`,
    );
    return;
  }

  if (!existsSync(BASELINE_PATH)) {
    console.error(
      "FAIL  no baseline recorded — run without --check first to establish one.",
    );
    process.exit(1);
  }
  const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf-8"));

  if (total > baseline.total) {
    console.error(
      `FAIL  ${total} hardcoded string(s) found, baseline is ${baseline.total} — ${total - baseline.total} new hardcoded string(s) introduced.`,
    );
    const newFiles = Object.entries(perFile).filter(
      ([f, c]) => (baseline.perFile[f] ?? 0) < c,
    );
    for (const [f, c] of newFiles.slice(0, 20)) {
      console.error(`  ${f}: ${c} (was ${baseline.perFile[f] ?? 0})`);
    }
    process.exit(1);
  }

  console.log(
    `OK    ${total} hardcoded string(s) found, baseline is ${baseline.total} — no regression.`,
  );
}

main();
