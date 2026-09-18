#!/usr/bin/env node
/**
 * Decimal-arithmetic ratchet.
 *
 * Money is stored as `Decimal(19,4)` — the schema lint (check-schema-lints.mjs)
 * enforces that. But storage being exact is worthless if the arithmetic is not:
 * `entries.reduce((s, e) => s + Number(e.amount), 0)` pulls a Decimal column
 * into a JS binary float, sums it there, and writes the drifted result back to
 * a Decimal column. The value is exact at rest and wrong after every
 * recalculation.
 *
 * This gate counts those sites and fails if the count rises above the committed
 * baseline. Like the suppression ratchet, the baseline may only ever fall: fix
 * sites and lower it, never raise it.
 *
 * A site is counted when BOTH hold:
 *   1. the expression has the shape `<acc> + Number(<obj>.<field>)`, and
 *   2. `<field>` is declared `Decimal` somewhere in the Prisma schema.
 *
 * Condition 2 is what keeps this honest — summing a genuine Float metric
 * (a rate, a score, a sensor reading) through Number() is fine and is not
 * counted. Field names alone are not evidence; the schema is.
 *
 * Usage:
 *   node scripts/ci/check-decimal-arithmetic.mjs           # check against baseline
 *   node scripts/ci/check-decimal-arithmetic.mjs --list    # print every site
 *   node scripts/ci/check-decimal-arithmetic.mjs --write   # lower the baseline
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
/* ── Polyrepo awareness — phase A30, defect D024/D025 ────────────────────────
 *
 * These were monorepo paths. `readdirSync` on the missing schema directory THREW
 * ENOENT, which is why the guard job failed after check-policy.mjs was fixed — the
 * same defect, one script along. Every gate inherited from the monorepo has it.
 *
 * POLICY_ROOT/POLICY_REPO let this run against a sibling repository's tree, the same
 * way check-policy.mjs does, so the gate travels to the code instead of guessing where
 * the code went. Where the schema is genuinely absent — as in unierp-workspace, which
 * holds no application source — the gate reports that it is DELEGATED rather than
 * throwing or, worse, reporting a clean zero.
 */
const TARGET = process.env.POLICY_ROOT ? path.resolve(process.env.POLICY_ROOT) : ROOT;
const SELF = process.env.POLICY_REPO || path.basename(TARGET);

/* The baseline must live IN the target repo, not beside this script.
 *
 * This used to resolve to `<this-script's-own-repo>/scripts/ci/decimal-
 * arithmetic-baseline.json` regardless of which repository TARGET pointed
 * at — a single shared number for every caller of the reusable workflow
 * (unierp-api, unierp-data, unierp-web, unierp-idp all point POLICY_ROOT at
 * their own checkout, but all reused the SAME baseline file, checked out
 * fresh and throwaway in CI's `gate/` directory every run). A repo whose
 * real violation count sat well under that shared number could add new
 * violations up to the gap without ever tripping the gate — the ratchet
 * could not actually ratchet per repo. Mirrors the sibling
 * `.quality-policy-baseline.json` convention already committed at each
 * target repo's own root (see check-policy.mjs / policy-gate.yml § "ratchet
 * baseline must be committed").
 */
const BASELINE = path.join(TARGET, ".decimal-arithmetic-baseline.json");

// Post-extraction homes. A repo not listed here simply has none of these paths.
const SCHEMA_CANDIDATES = [
  // Explicit override: the reusable workflow checks out unierp-data alongside the target
  // so the schema is available to a repo that holds only source. Without it, a repo with
  // source but no schema learns no Decimal field names and finds 0 sites — a false clean,
  // which is the whole defect being repaired.
  ...(process.env.DECIMAL_SCHEMA_DIR ? [path.resolve(process.env.DECIMAL_SCHEMA_DIR)] : []),
  path.join(TARGET, "packages", "database", "prisma", "schema"), // monorepo layout
  path.join(TARGET, "prisma", "schema"), // unierp-data
];
const SCHEMA_DIR = SCHEMA_CANDIDATES.find((d) => existsSync(d)) ?? null;

const SCAN_ROOTS = [
  path.join(TARGET, "apps"),
  path.join(TARGET, "packages"),
  path.join(TARGET, "src"), // every extracted library and service
  path.join(TARGET, "app"), // unierp-web route tree
].filter((d) => existsSync(d));

/** True when this repo holds neither the schema nor any source to scan. */
const DELEGATED = SCHEMA_DIR === null && SCAN_ROOTS.length === 0;

function decimalFieldNames() {
  const names = new Set();
  if (!SCHEMA_DIR) return names;
  for (const file of readdirSync(SCHEMA_DIR)) {
    if (!file.endsWith(".prisma")) continue;
    const src = readFileSync(path.join(SCHEMA_DIR, file), "utf8");
    for (const m of src.matchAll(/^\s*(\w+)\s+Decimal/gm)) names.add(m[1]);
  }
  return names;
}

function sourceFiles(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const p = path.join(dir, entry);
    let st;
    try {
      st = statSync(p);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (entry === "node_modules" || entry === "dist" || entry === ".next")
        continue;
      sourceFiles(p, out);
    } else if (/\.tsx?$/.test(entry) && !/\.(spec|test)\.tsx?$/.test(entry)) {
      out.push(p);
    }
  }
  return out;
}

// `<acc> + Number(<obj>.<field>` — the float-accumulation shape.
const PATTERN = /\w+\s*\+\s*Number\(\s*\w+(?:\?)?\.(\w+)/g;

const decimals = decimalFieldNames();
const sites = [];

for (const root of SCAN_ROOTS) {
  for (const file of sourceFiles(root)) {
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    let inBlockComment = false;
    lines.forEach((line, i) => {
      // Comments must not be counted. Explaining the bad pattern in a code
      // comment (as the fixed sites do) would otherwise register as a fresh
      // violation and inflate the baseline — the gate would punish documenting
      // the very thing it asks you to fix.
      const trimmed = line.trim();
      if (inBlockComment) {
        if (trimmed.includes("*/")) inBlockComment = false;
        return;
      }
      if (trimmed.startsWith("/*")) {
        if (!trimmed.includes("*/")) inBlockComment = true;
        return;
      }
      if (trimmed.startsWith("//") || trimmed.startsWith("*")) return;
      if (!line.includes("Number(")) return;
      for (const m of line.matchAll(PATTERN)) {
        if (!decimals.has(m[1])) continue;
        sites.push({
          file: path.relative(ROOT, file).replace(/\\/g, "/"),
          line: i + 1,
          field: m[1],
        });
      }
    });
  }
}

if (process.argv.includes("--list")) {
  for (const s of sites) console.log(`${s.file}:${s.line}  ${s.field}`);
  console.log(`\n${sites.length} site(s)`);
  process.exit(0);
}

if (process.argv.includes("--write")) {
  writeFileSync(
    BASELINE,
    JSON.stringify({ maxSites: sites.length }, null, 2) + "\n",
    "utf8",
  );
  console.log(`Decimal-arithmetic baseline written: ${sites.length}`);
  process.exit(0);
}

// A repo with neither the schema nor any source has nothing to measure. Reporting "0
// sites, below the baseline of 703" here would be a false clean reading — precisely the
// D024 failure this gate is being repaired for. Say what is true instead: not measured
// here, and name where it must be.
// Source present but no schema: the gate would learn zero Decimal field names and report
// zero sites. That is the false-clean failure mode, not a pass. Fail loudly and say how to
// supply the schema.
if (SCHEMA_DIR === null && SCAN_ROOTS.length > 0) {
  console.error(
    `Decimal-arithmetic ratchet CANNOT RUN in ${SELF}.

` +
      `It found source to scan but no Prisma schema, so it cannot learn which fields are
` +
      `Decimal — and would report 0 sites regardless of how many exist. That reading would
` +
      `be false, so this exits 1 instead.

` +
      `Supply the schema with DECIMAL_SCHEMA_DIR, as .github/workflows/policy-gate.yml
` +
      `does by checking out unierp-data beside the target repository:
` +
      `  DECIMAL_SCHEMA_DIR=<unierp-data>/prisma/schema \
` +
      `  POLICY_ROOT=<repo> POLICY_REPO=<name> node scripts/ci/check-decimal-arithmetic.mjs`,
  );
  process.exit(1);
}

if (DELEGATED) {
  console.log(
    `Decimal-arithmetic ratchet: DELEGATED — ${SELF} holds no Prisma schema and no
` +
      `application source, so there is nothing to measure. This gate must run in the
` +
      `repositories that hold the money code (unierp-api, unierp-data), via
` +
      `.github/workflows/policy-gate.yml. Reporting 0 here would be a false clean.`,
  );
  process.exit(0);
}

let baseline;
try {
  baseline = JSON.parse(readFileSync(BASELINE, "utf8"));
} catch {
  console.error(
    `Decimal-arithmetic ratchet: missing baseline at ${path.relative(ROOT, BASELINE)}.\n` +
      "Create it with: node scripts/ci/check-decimal-arithmetic.mjs --write",
  );
  process.exit(1);
}

const max = baseline.maxSites;

if (sites.length > max) {
  console.error(
    `Decimal-arithmetic ratchet FAILED: ${sites.length} site(s) sum a Decimal column in floating point, baseline is ${max}.`,
  );
  console.error(
    "\nMoney is Decimal(19,4) precisely so it does not drift. Summing it with\n" +
      "`sum + Number(x.field)` puts it back into binary float and writes the\n" +
      "drifted total to a Decimal column. Use Decimal arithmetic instead:\n" +
      "  rows.reduce((s, r) => s.add(r.amount ?? 0), new Prisma.Decimal(0))\n" +
      "\nRun with --list to see every site.",
  );
  process.exit(1);
}

if (sites.length < max) {
  console.log(
    `Decimal-arithmetic ratchet: ${sites.length} site(s), below the baseline of ${max}.\n` +
      "Lower it with: node scripts/ci/check-decimal-arithmetic.mjs --write",
  );
  process.exit(0);
}

console.log(
  `Decimal-arithmetic ratchet: ${sites.length} site(s), at the baseline.`,
);
