#!/usr/bin/env node
/**
 * check-workflows.mjs — every workflow file must be one GitHub can actually run.
 *
 * Written after breaking ci.yml in exactly the way this catches. Rewriting it via
 * PyYAML round-trip turned `on:` into `true:` — YAML 1.1 parses the bare word `on` as a
 * boolean, and dumping it back writes the boolean. GitHub then reported only
 * "This run likely failed because of a workflow file issue", with no failing step and no
 * log to read, which is about as unhelpful as a failure gets.
 *
 * It also checks the thing this family has been bitten by twice: a step guarded by
 * `if: hashFiles(...)` passes by being ABSENT (D013 — 21 repos declared a layer gate whose
 * script existed in none), and a job whose every step is impossible never fails because it
 * never runs (D025 — five jobs, 27 pnpm steps, no package.json).
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DIR = join(ROOT, ".github", "workflows");
const failures = [];

if (!existsSync(DIR)) {
  console.log("OK    no .github/workflows in this repository.");
  process.exit(0);
}

for (const f of readdirSync(DIR).filter((n) => /\.ya?ml$/.test(n))) {
  const raw = readFileSync(join(DIR, f), "utf8");

  // The failure that prompted this script.
  if (/^true:/m.test(raw)) {
    failures.push(
      `${f}: has \`true:\` where \`on:\` belongs. A YAML 1.1 round-trip converted the ` +
        `trigger key to a boolean. GitHub reports only "workflow file issue" for this, ` +
        `with no failing step — so it is worth a gate.`,
    );
  }
  if (!/^on:/m.test(raw) && !/^\s+workflow_call:/m.test(raw)) {
    failures.push(`${f}: no \`on:\` trigger. The workflow can never run.`);
  }

  // A required step that passes by being absent.
  for (const [i, line] of raw.split("\n").entries()) {
    // Skip comment lines. The first version of this check flagged a comment explaining why
    // `if: hashFiles(...)` is deliberately NOT used — matching the very prose that warns
    // against the thing it looks for. Anchoring to a step-level key fixes it.
    if (/^\s*#/.test(line)) continue;
    if (
      /^\s*if:\s*hashFiles\(/.test(line) &&
      !/#\s*justified/i.test(raw.split("\n")[i - 1] ?? "")
    ) {
      failures.push(
        `${f}:${i + 1}: \`if: hashFiles(...)\` on a step. If the file is missing the step ` +
          `is SKIPPED and the job reports success — this is D013, where 21 repositories ` +
          `declared a gate whose script existed in none of them. Remove the guard, or put ` +
          `\`# justified: <why absence is legitimate>\` on the line above.`,
      );
    }
  }
}

if (failures.length) {
  console.error(`\ncheck-workflows: ${failures.length} problem(s)\n`);
  for (const f of failures) console.error(`FAIL  ${f}`);
  console.error("");
  process.exit(1);
}
console.log(
  `OK    ${readdirSync(DIR).filter((n) => /\.ya?ml$/.test(n)).length} workflow file(s): ` +
    `valid triggers, no step that passes by being absent.`,
);
