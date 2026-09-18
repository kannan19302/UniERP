#!/usr/bin/env node
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { assertNonEmptyDiscovery, loadActiveEstate, requiredSourceDirectory } from "./lib/estate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const DEFAULT_ROOT = resolve(dirname(SCRIPT_PATH), "..", "..");
const AUDIT_TRY_CATCH = /try\s*\{[\s\S]{0,1600}?(?:audit(?:[A-Z][A-Za-z]*)?|Audit(?:[A-Z][A-Za-z]*)?)[\s\S]{0,1600}?\}\s*catch\s*(?:\([^)]*\))?\s*\{[\s\S]{0,900}?\}/g;

function listSourceFiles(directory) {
  const files = [];
  const stack = [directory];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (["node_modules", "dist", "coverage", ".next"].includes(entry.name)) continue;
      const target = join(current, entry.name);
      if (entry.isDirectory()) stack.push(target);
      else if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.includes(".spec.") && !entry.name.includes(".test.")) files.push(target);
    }
  }
  return files;
}

function lineAt(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function suppressesAuditFailure(match) {
  const catchIndex = match.lastIndexOf("catch");
  const catchBody = match.slice(catchIndex);
  if (/\bthrow\b/.test(catchBody)) return false;
  return /console\.(?:warn|error)|return\s+(?:null|undefined)|\/\*|\/\//.test(catchBody);
}

export function inspectAuditFailureSuppression(root = DEFAULT_ROOT) {
  const estate = loadActiveEstate({ workspaceRoot: root });
  const targets = [
    { repository: "api", source: requiredSourceDirectory(estate, "api", "src") },
    { repository: "idp", source: requiredSourceDirectory(estate, "idp", "src") },
  ];
  const findings = [];
  for (const target of targets) {
    const files = listSourceFiles(target.source);
    assertNonEmptyDiscovery(`${target.repository} production TypeScript sources`, files);
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      AUDIT_TRY_CATCH.lastIndex = 0;
      let match;
      while ((match = AUDIT_TRY_CATCH.exec(source)) !== null) {
        if (!suppressesAuditFailure(match[0])) continue;
        findings.push({
          repository: target.repository,
          file: relative(root, file).replace(/\\/g, "/"),
          line: lineAt(source, match.index),
        });
      }
    }
  }
  return findings;
}

export function evaluateAuditFailureSuppression(findings) {
  return findings.map((finding) =>
    `${finding.file}:${finding.line} suppresses an audit-write failure; mandatory audit must be transactional or durably queued and must not be best effort`,
  );
}

function createFixture(source) {
  const root = mkdtempSync(join(tmpdir(), "unierp-audit-"));
  for (const repository of ["api", "idp"]) {
    mkdirSync(join(root, repository, "src"), { recursive: true });
    writeFileSync(join(root, repository, "src", `${repository}.service.ts`), source[repository]);
  }
  writeFileSync(join(root, "UniERP.code-workspace"), JSON.stringify({ folders: [{ path: "api" }, { path: "idp" }] }));
  return root;
}

function test() {
  const good = createFixture({
    api: "async function save() { try { await auditLog.create({}); } catch (error) { throw error; } }",
    idp: "export const noop = true;",
  });
  const bad = createFixture({
    api: "async function save() { try { await auditLog.create({}); } catch (error) { console.warn(error); } }",
    idp: "async function save() { try { await auditEvent.create({}); } catch { return null; } }",
  });
  try {
    if (evaluateAuditFailureSuppression(inspectAuditFailureSuppression(good)).length) throw new Error("durable audit fixture failed");
    if (evaluateAuditFailureSuppression(inspectAuditFailureSuppression(bad)).length !== 2) throw new Error("best-effort audit fixture escaped detection");
  } finally {
    rmSync(good, { recursive: true, force: true });
    rmSync(bad, { recursive: true, force: true });
  }
  console.log("Durable audit failure-suppression adversarial tests passed.");
}

if (process.argv.includes("--test")) test();
else {
  const violations = evaluateAuditFailureSuppression(inspectAuditFailureSuppression());
  console.log(`Durable audit suppression inventory: ${violations.length} blocking path(s).`);
  for (const violation of violations) console.error(`  - ${violation}`);
  if (violations.length) process.exit(1);
}
