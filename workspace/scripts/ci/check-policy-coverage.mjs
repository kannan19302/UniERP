#!/usr/bin/env node
/**
 * check-policy-coverage.mjs — a delegated rule must actually run somewhere.
 *
 * Phase A30. `check-policy.mjs` now prints "delegated to <repo>" for any rule whose files
 * live in another repository, instead of scanning nothing and reporting a clean 0. That
 * removes the silent failure — and introduces a new way to cheat: declare every rule
 * someone else's problem and watch the gate go green everywhere.
 *
 * This closes that. Every repository named as an owner must invoke the reusable policy
 * gate, and must carry a committed ratchet baseline. A rule that is delegated to a repo
 * which does not run the gate is not enforced anywhere, and that fails here.
 *
 * It is the same reasoning the gate it guards already applies: a control that quietly
 * covers less than it claims is worse than no control.
 *
 *   node scripts/ci/check-policy-coverage.mjs         verify
 *   node scripts/ci/check-policy-coverage.mjs --list  show the ownership map
 *
 * Runs where the sibling repositories are on disk — locally, and in `pnpm verify`. In CI,
 * where only one repository is checked out, it verifies against
 * `docs/policy-gate-owners.json` instead, which the local run keeps honest.
 */

import { readFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = join(HERE, "..", "..");
const FAMILY = join(WORKSPACE, "..");
const MANIFEST = join(WORKSPACE, "docs", "policy-gate-owners.json");
const LIST = process.argv.includes("--list");
const UPDATE = process.argv.includes("--update");

/** Ask check-policy.mjs which rules it would delegate, and to whom. */
function delegationsFor(repo, root) {
  const r = spawnSync(process.execPath, [join(HERE, "check-policy.mjs")], {
    encoding: "utf8",
    env: { ...process.env, POLICY_ROOT: root, POLICY_REPO: repo },
  });
  const out = (r.stdout ?? "") + (r.stderr ?? "");
  const owners = new Set();
  // A delegation line names one repo or several: "delegated to unierp-api, unierp-data".
  // Capturing \S+ grabbed "unierp-api," with the comma attached, so the owner never matched
  // a directory and every check reported "siblings are not on disk".
  for (const m of out.matchAll(/delegated to ([^\r\n—]+)/g)) {
    for (const name of m[1].split(",")) {
      const clean = name.trim();
      if (/^unierp-[a-z-]+$/.test(clean)) owners.add(clean);
    }
  }
  return owners;
}

const failures = [];
const fail = (m) => failures.push(m);

// Which repos does the workspace's own run delegate to? Those are the owners that must run
// the gate themselves.
const owners = [...delegationsFor("unierp-workspace", WORKSPACE)].sort();

if (LIST) {
  console.log(`\nPolicy-gate owners (derived from check-policy.mjs OWNERSHIP)\n`);
  for (const o of owners) console.log(`  ${o}`);
  console.log("");
  process.exit(0);
}

if (!owners.length) {
  fail(
    "check-policy.mjs delegated nothing from the workspace run. Either every rule is now " +
      "local to this repo — unlikely — or the delegation reporting has been removed. If a " +
      "rule stopped delegating, confirm it is genuinely checked here and not silently " +
      "scanning an absent directory. That was D024.",
  );
}

const siblingsPresent = owners.every((o) => existsSync(join(FAMILY, o)));

if (siblingsPresent) {
  // The authoritative check: does each owner repo actually invoke the reusable gate, and
  // does it carry a baseline?
  const verified = {};
  for (const repo of owners) {
    const wf = join(FAMILY, repo, ".github", "workflows");
    const invokes = existsSync(wf)
      ? readdirSync(wf).some(
          (f) =>
            f.endsWith(".yml") &&
            readFileSync(join(wf, f), "utf8").includes(
              "unierp-workspace/.github/workflows/policy-gate.yml",
            ),
        )
      : false;
    const baseline = existsSync(join(FAMILY, repo, ".quality-policy-baseline.json"));

    if (!invokes) {
      fail(
        `${repo} owns delegated policy rules but no workflow invokes ` +
          `unierp-workspace/.github/workflows/policy-gate.yml. Those rules are enforced ` +
          `NOWHERE — which is the state D024 described, moved rather than fixed.`,
      );
    }
    if (!baseline) {
      fail(
        `${repo} owns delegated policy rules but has no committed ` +
          `.quality-policy-baseline.json, so its ratchet has nothing to compare against ` +
          `and accepts today's debt as the standard.`,
      );
    }
    verified[repo] = { invokesPolicyGate: invokes, hasBaseline: baseline };
  }

  if (UPDATE && !failures.length) {
    writeFileSync(
      MANIFEST,
      JSON.stringify(
        {
          $comment:
            "Repositories that own delegated policy rules and must run the reusable " +
            "policy gate. Written by scripts/ci/check-policy-coverage.mjs --update from " +
            "the on-disk truth. In CI, where siblings are absent, this file IS the check — " +
            "which is why it is generated from reality rather than maintained by hand.",
          generated: new Date().toISOString().slice(0, 10),
          owners: verified,
        },
        null,
        2,
      ) + "\n",
    );
    console.log(`OK    manifest written: ${owners.length} owner(s) verified on disk.`);
  }
} else {
  // CI: one repository checked out. Fall back to the manifest the local run generated.
  if (!existsSync(MANIFEST)) {
    fail(
      `Siblings are not on disk and ${MANIFEST} is missing, so there is no way to confirm ` +
        `that delegated rules run anywhere. Generate it locally with --update and commit it.`,
    );
  } else {
    const m = JSON.parse(readFileSync(MANIFEST, "utf8"));
    for (const repo of owners) {
      const e = m.owners?.[repo];
      if (!e) {
        fail(
          `${repo} is delegated to by check-policy.mjs but is absent from ` +
            `docs/policy-gate-owners.json. Its rules are enforced nowhere. Re-run ` +
            `check-policy-coverage.mjs --update locally and commit the result.`,
        );
      } else if (!e.invokesPolicyGate || !e.hasBaseline) {
        fail(
          `${repo}: invokesPolicyGate=${e.invokesPolicyGate}, ` +
            `hasBaseline=${e.hasBaseline}. Both must be true.`,
        );
      }
    }
  }
}

if (failures.length) {
  console.error(`\ncheck-policy-coverage: ${failures.length} violation(s)\n`);
  for (const f of failures) console.error(`FAIL  ${f}`);
  console.error(
    `\nThe policy gate delegates a rule to the repository that owns its files (A30). This\n` +
      `check exists so delegation cannot become a way of enforcing nothing everywhere.\n`,
  );
  process.exit(1);
}

console.log(
  `OK    ${owners.length} owner repo(s) — each invokes the policy gate and carries a ` +
    `committed ratchet baseline${siblingsPresent ? " (verified on disk)" : " (per manifest)"}.`,
);
