#!/usr/bin/env node
/**
 * Backup-restore rehearsal freshness gate — J25 exit criterion (G-11):
 * "the rehearsal is on a schedule that fails loudly if skipped."
 *
 * `.github/workflows/backup-restore.yml` runs the real rehearsal
 * (scripts/rehearse-restore.mjs / scripts/verify-backup.mjs) nightly via
 * `on: schedule`. That covers "the rehearsal itself fails loudly if it
 * fails" — but a `schedule`-triggered workflow can stop firing entirely
 * without any error surfacing anywhere: GitHub disables scheduled
 * workflows in a repository after 60 days with no activity on the
 * default branch, and a silently-disabled cron produces no red build,
 * no notification, nothing — the rehearsal guarantee quietly evaporates.
 * That is "skipped" in the exact sense G-11 names, and nothing detected
 * it before this gate.
 *
 * This gate reads the append-only rehearsal log
 * (var/backups/rehearsal-log.jsonl, written by rehearse-restore.mjs) and
 * fails loudly if:
 *   1. no rehearsal has ever been logged, or
 *   2. the most recent rehearsal is older than the freshness window, or
 *   3. the most recent rehearsal did not verify.
 *
 * Unlike the nightly cron, this gate is meant to run on ORDINARY commit
 * activity (push / pull_request), which fires far more reliably than
 * `schedule` — so a cron that silently stopped firing still gets caught
 * on the next normal commit, instead of staying invisible indefinitely.
 *
 * Usage: node scripts/check-rehearsal-freshness.mjs [--max-age-hours N]
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOG_PATH = path.join(ROOT, "var", "backups", "rehearsal-log.jsonl");

const argv = process.argv.slice(2);
const maxAgeIdx = argv.indexOf("--max-age-hours");
// Nightly cron (03:10 UTC) + generous buffer for a slow/delayed run.
const MAX_AGE_HOURS =
  maxAgeIdx !== -1 && argv[maxAgeIdx + 1] ? Number(argv[maxAgeIdx + 1]) : 48;

if (!existsSync(LOG_PATH)) {
  console.error(
    `Rehearsal freshness gate FAILED: no rehearsal has EVER been logged at ${path.relative(ROOT, LOG_PATH)}.\n` +
      "G-11 requires RPO/RTO to be committed numbers PROVEN by rehearsal — " +
      "with zero rehearsals ever recorded, there is no proof, only a claim.\n" +
      "Run: node scripts/rehearse-restore.mjs",
  );
  process.exit(1);
}

const lines = readFileSync(LOG_PATH, "utf8").split(/\r?\n/).filter(Boolean);
if (lines.length === 0) {
  console.error(
    `Rehearsal freshness gate FAILED: ${path.relative(ROOT, LOG_PATH)} exists but is empty — no rehearsal has ever been logged.`,
  );
  process.exit(1);
}

const records = lines.map((l) => JSON.parse(l));
const latest = records[records.length - 1];
const ageMs = Date.now() - new Date(latest.timestamp).getTime();
const ageHours = ageMs / (1000 * 60 * 60);

if (!latest.verified) {
  console.error(
    `Rehearsal freshness gate FAILED: the most recent rehearsal (${latest.timestamp}) did NOT verify.\n` +
      `Failures: ${JSON.stringify(latest.failures)}\n` +
      "A backup that has never been successfully restored is not a backup.",
  );
  process.exit(1);
}

if (ageHours > MAX_AGE_HOURS) {
  console.error(
    `Rehearsal freshness gate FAILED: the most recent rehearsal was ${ageHours.toFixed(1)}h ago, ` +
      `exceeding the ${MAX_AGE_HOURS}h freshness window.\n` +
      "This is exactly the failure mode G-11 exists to catch: the nightly rehearsal schedule may have " +
      "silently stopped firing (GitHub disables `schedule`-triggered workflows after 60 days of no " +
      "activity on the default branch, with no notification) — the guarantee quietly evaporated and " +
      "nothing said so until this gate ran on ordinary commit activity.\n" +
      "Run: node scripts/rehearse-restore.mjs",
  );
  process.exit(1);
}

console.log(
  `Rehearsal freshness gate: latest rehearsal ${ageHours.toFixed(1)}h ago (within ${MAX_AGE_HOURS}h window), verified.`,
);
