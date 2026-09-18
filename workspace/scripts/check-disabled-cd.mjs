#!/usr/bin/env node
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const DEFAULT_WORKFLOW = resolve(dirname(SCRIPT_PATH), "..", ".github", "workflows", "cd.yml");

export function evaluateDisabledCd(source) {
  const errors = [];
  if (!/^name:\s*CD \(disabled pending release-safety foundation\)$/m.test(source)) errors.push("CD workflow must identify itself as disabled pending FND-P0-007");
  if (!/^\s*workflow_dispatch:\s*$/m.test(source) || /^\s*workflow_run\s*:/m.test(source) || /^\s*push\s*:/m.test(source) || /^\s*schedule\s*:/m.test(source)) errors.push("disabled CD may only have a manual workflow_dispatch trigger");
  if (!/^permissions:\s*\{\}\s*$/m.test(source)) errors.push("disabled CD must grant no permissions");
  for (const pattern of [/secrets\./i, /docker\/(?:build-push|login)-action/i, /npm publish/i, /db:deploy/i, /rollout\.sh/i, /backup-database/i, /git push/i]) {
    if (pattern.test(source)) errors.push(`disabled CD contains a prohibited deployment capability: ${pattern}`);
  }
  if (!/exit 1/.test(source)) errors.push("disabled CD must fail loudly when manually invoked");
  return errors;
}

function test() {
  const good = "name: CD (disabled pending release-safety foundation)\non:\n  workflow_dispatch:\npermissions: {}\njobs:\n  blocked:\n    steps:\n      - run: exit 1\n";
  const bad = "name: CD\non:\n  workflow_run:\npermissions: write-all\njobs:\n  deploy:\n    steps:\n      - run: pnpm db:deploy\n";
  const fixture = mkdtempSync(join(tmpdir(), "unierp-cd-"));
  const fixtureFile = join(fixture, "cd.yml");
  try {
    writeFileSync(fixtureFile, good);
    if (evaluateDisabledCd(readFileSync(fixtureFile, "utf8")).length) throw new Error("safe CD fixture failed");
    writeFileSync(fixtureFile, bad);
    if (evaluateDisabledCd(readFileSync(fixtureFile, "utf8")).length < 3) throw new Error("unsafe CD fixture escaped detection");
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
  console.log("Disabled CD adversarial tests passed.");
}

if (process.argv.includes("--test")) test();
else {
  const errors = evaluateDisabledCd(readFileSync(DEFAULT_WORKFLOW, "utf8"));
  if (errors.length) {
    for (const error of errors) console.error(`CD safety error: ${error}`);
    process.exit(1);
  }
  console.log("CD is safely disabled pending FND-P0-007 release evidence.");
}
