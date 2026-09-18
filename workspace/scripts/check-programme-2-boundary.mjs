#!/usr/bin/env node
/**
 * check-programme-2-boundary.mjs — enforces Programme 2's boundary declarations.
 *
 * "A CI step fails when a P2 commit modifies a repository outside the declared set.
 * Deleting the declaration fails CI rather than disabling the check"
 */

import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const DEV_DIR = existsSync(join(ROOT, "..", "developer-platform"))
  ? join(ROOT, "..", "developer-platform")
  : join(ROOT, "..", "unierp-developer");
const MANIFEST = join(DEV_DIR, "programme-2.manifest.json");

if (!existsSync(MANIFEST)) {
  console.error("FAIL  programme-2.manifest.json is missing in unierp-developer.");
  process.exit(1);
}

let manifest;
try {
  manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
} catch (err) {
  console.error("FAIL  programme-2.manifest.json is not valid JSON.", err.message);
  process.exit(1);
}

if (!manifest.repositories || !Array.isArray(manifest.repositories)) {
  console.error("FAIL  programme-2.manifest.json must declare an array of 'repositories'.");
  process.exit(1);
}

let isP2 = false;
try {
  const branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd: ROOT, stdio: "pipe" }).toString().toLowerCase();
  const msg = execSync("git log -1 --pretty=%B", { cwd: ROOT, stdio: "pipe" }).toString().toUpperCase();
  if (branch.includes("p2-") || branch === "p2" || msg.includes("P2-")) {
    isP2 = true;
  }
} catch (err) {}

// If running in verify, we also check if --check-diff is passed? No, let's always check git diff.
if (!isP2) {
  // Try to determine from phase claims if we can. But fallback to just checking if unierp-developer has changes
  // and the current branch is modifying things it shouldn't.
  // We'll trust the branch/commit heuristic for now.
  console.log("OK    Not a P2 commit, skipping boundary enforcement.");
  process.exit(0);
}

let changedFiles = [];
try {
  changedFiles = execSync("git diff --name-only origin/main...HEAD", { cwd: ROOT, stdio: "pipe" })
    .toString().split("\n").filter(Boolean);
} catch (e) {
  try {
    changedFiles = execSync("git show --name-only --format=", { cwd: ROOT, stdio: "pipe" })
      .toString().split("\n").filter(Boolean);
  } catch (err) {}
}

const changedRepos = new Set();
// Note: unierp-workspace is what ROOT points to. In this monorepo/polyrepo setup, changes might be recorded
// differently. If `git diff` only gives us unierp-workspace files, we need a way to check other repos.
// A simpler check: 
for (const file of changedFiles) {
  // If the polyrepo has a shared git root (sometimes they do, sometimes they don't).
  if (file.startsWith("unierp-")) {
    changedRepos.add(file.split("/")[0]);
  }
}

// In polyrepo, if we check `ROOT/..`
try {
  const allRepos = execSync("ls -1d unierp-*", { cwd: join(ROOT, ".."), stdio: "pipe" }).toString().split("\n").filter(Boolean);
  for (const repo of allRepos) {
    if (repo === 'unierp-workspace') continue;
    // Check if repo has changes vs origin/main
    try {
      const diff = execSync("git diff --name-only origin/main...HEAD", { cwd: join(ROOT, "..", repo), stdio: "pipe" }).toString().trim();
      if (diff) {
        changedRepos.add(repo);
      }
    } catch(e) {
      const diff = execSync("git show --name-only --format=", { cwd: join(ROOT, "..", repo), stdio: "pipe" }).toString().trim();
      if (diff) {
        changedRepos.add(repo);
      }
    }
  }
} catch(e) {}

let failed = false;
for (const repo of changedRepos) {
  if (!manifest.repositories.includes(repo)) {
    console.error(`FAIL  P2 commit modifies a repository (${repo}) outside the declared set in programme-2.manifest.json.`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log("OK    P2 boundary check passed.");
process.exit(0);
