#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const WORKSPACE_ROOT = resolve(dirname(SCRIPT_PATH), "..");
const EXEMPTIONS_FILE = join(WORKSPACE_ROOT, "scripts/retention-exemptions.json");
const REVIEW_FILE = join(WORKSPACE_ROOT, "governance/RETENTION_EXEMPTIONS_OWNER_REVIEW_2026-09-03.md");

if (!existsSync(EXEMPTIONS_FILE)) {
  console.error(`FAIL  Retention exemptions file missing at ${EXEMPTIONS_FILE}`);
  process.exit(1);
}

if (!existsSync(REVIEW_FILE)) {
  console.error(`FAIL  Retention exemptions owner review document missing at ${REVIEW_FILE}`);
  process.exit(1);
}

const rawExemptions = readFileSync(EXEMPTIONS_FILE, "utf8");
const actualDigest = createHash("sha256").update(rawExemptions).digest("hex");

const reviewContent = readFileSync(REVIEW_FILE, "utf8");

if (!reviewContent.includes(actualDigest)) {
  console.error(`FAIL  SHA-256 digest in owner review document does not match actual exemptions file (${actualDigest}).`);
  process.exit(1);
}

const requiredSignoffs = [
  "Chief Architect / Platform Lead (`PLT-GOV`)",
  "Lead Architect — Backend / Services (`PLT-CORE`)",
  "Principal Security Architect (`PLT-SEC`)",
  "Principal Data Architect (`PLT-DATA`)",
  "Principal SRE & Operations Lead (`PLT-OPS`)",
];

for (const owner of requiredSignoffs) {
  if (!reviewContent.includes(owner)) {
    console.error(`FAIL  Missing accountable owner sign-off for: ${owner}`);
    process.exit(1);
  }
}

const acceptedCount = (reviewContent.match(/\*Status\*:\s*\*\*ACCEPTED\*\*/g) || []).length;
if (acceptedCount !== 5) {
  console.error(`FAIL  Expected 5 ACCEPTED owner sign-offs, found ${acceptedCount}.`);
  process.exit(1);
}

const exemptionsData = JSON.parse(rawExemptions);
const modelCount = Object.keys(exemptionsData.models || {}).length;

console.log(`✅ Retention exemptions owner review verified: ${modelCount} models, SHA-256 (${actualDigest.slice(0, 16)}...), all 5 platform owner sign-offs ACCEPTED.`);
