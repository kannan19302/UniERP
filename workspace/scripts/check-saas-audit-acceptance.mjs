#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDir, "..");
const reviewPath = resolve(workspaceRoot, "governance/FND-PA-001_OWNER_REVIEW.md");
const auditPath = resolve(workspaceRoot, "governance/UNIERP_SAAS_READINESS_AUDIT_2026-08-28.md");
const structureOnly = process.argv.includes("--structure-only");
const failures = [];

if (!existsSync(reviewPath)) failures.push(`missing review record: ${reviewPath}`);
if (!existsSync(auditPath)) failures.push(`missing audit report: ${auditPath}`);

const review = existsSync(reviewPath) ? readFileSync(reviewPath, "utf8") : "";
const audit = existsSync(auditPath) ? readFileSync(auditPath) : Buffer.alloc(0);
const requiredAuthorities = [
  "Product",
  "Architecture",
  "Security/IAM/Privacy",
  "Data",
  "Operations/SRE/Release",
];

const digestMatch = review.match(/^Audit SHA-256: `([a-f0-9]{64})`$/m);
if (!digestMatch) {
  failures.push("review record has no valid Audit SHA-256");
} else {
  const actualDigest = createHash("sha256").update(audit).digest("hex");
  if (digestMatch[1] !== actualDigest) {
    failures.push(`audit digest changed: review=${digestMatch[1]} actual=${actualDigest}; reset and repeat review`);
  }
}

const rows = new Map();
for (const line of review.split(/\r?\n/)) {
  const match = line.match(/^\| (Product|Architecture|Security\/IAM\/Privacy|Data|Operations\/SRE\/Release) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/);
  if (!match) continue;
  rows.set(match[1], {
    reviewer: match[2].trim(),
    decision: match[3].trim(),
    date: match[4].trim(),
    evidence: match[5].trim(),
  });
}

for (const authority of requiredAuthorities) {
  const row = rows.get(authority);
  if (!row) {
    failures.push(`${authority}: missing decision row`);
    continue;
  }
  if (!row.evidence || row.evidence === "—") failures.push(`${authority}: decision evidence is required`);
  if (!structureOnly) {
    if (!row.reviewer || row.reviewer === "Unassigned") failures.push(`${authority}: accountable reviewer is unassigned`);
    if (row.decision !== "ACCEPTED") failures.push(`${authority}: decision is ${row.decision}, expected ACCEPTED`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(row.date)) failures.push(`${authority}: decision date must be YYYY-MM-DD`);
  }
}

if (!structureOnly && !/^Status: `ACCEPTED`$/m.test(review)) {
  failures.push("overall review Status is not ACCEPTED");
}

if (failures.length > 0) {
  console.error(`FND-PA-001 acceptance gate failed (${failures.length} issue(s)):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  structureOnly
    ? `FND-PA-001 review structure is valid: ${requiredAuthorities.length} authorities and audit digest verified.`
    : `FND-PA-001 is accepted: ${requiredAuthorities.length} accountable authority decisions and audit digest verified.`,
);
