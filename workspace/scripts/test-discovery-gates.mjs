import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { checkAuditImmutability } from "./check-audit-immutability.mjs";
import { checkDocumentationTruth } from "./check-doc-truth.mjs";
import { checkRetentionArchitecture } from "./check-retention-architecture.mjs";
import { verifySchemaOwnership } from "./ci/check-schema-ownership.mjs";

const fixtureRoot = mkdtempSync(join(tmpdir(), "unierp-discovery-gates-"));

function directory(path) {
  mkdirSync(path, { recursive: true });
  return path;
}

function file(path, content = "") {
  directory(join(path, ".."));
  writeFileSync(path, content, "utf8");
  return path;
}

function fixtureEstate(root, repositories) {
  return {
    root,
    inventoryFile: join(root, "UniERP.code-workspace"),
    repositories: new Map(repositories.map((repository) => [repository, { path: repository }])),
    names: repositories,
  };
}

try {
  assert.throws(
    () => checkAuditImmutability({ sourceDirectories: [] }),
    /zero expected targets/,
    "audit checking must reject zero source roots",
  );
  assert.throws(
    () => checkRetentionArchitecture({ sourceDirectories: [] }),
    /zero expected targets/,
    "retention checking must reject zero source roots",
  );

  const auditSource = directory(join(fixtureRoot, "audit"));
  file(join(auditSource, "rogue.ts"), "prisma.auditLog.delete({ where: { id } });");
  assert.equal(
    checkAuditImmutability({ sourceDirectories: [auditSource] }).violations.length,
    1,
    "audit checking must find forbidden audit deletion",
  );

  const retentionSource = directory(join(fixtureRoot, "retention"));
  file(join(retentionSource, "rogue.ts"), "async function purge() { customRetentionPurge(); }");
  assert.equal(
    checkRetentionArchitecture({ sourceDirectories: [retentionSource] }).violations.length,
    1,
    "retention checking must find a rogue retention primitive",
  );

  const schemaEstate = fixtureEstate(fixtureRoot, ["data", "marketing-site", "api"]);
  file(join(fixtureRoot, "data", "prisma", "schema.prisma"), "model Canonical { id String @id }");
  directory(join(fixtureRoot, "marketing-site"));
  file(join(fixtureRoot, "api", "rogue.prisma"), "model Rogue { id String @id }");
  const schemaResult = verifySchemaOwnership({ estate: schemaEstate });
  assert.equal(schemaResult.totalDataModels, 1, "schema checking must count canonical data models");
  assert.equal(schemaResult.filesScanned, 2, "schema checking must scan active-estate Prisma files");
  assert.equal(schemaResult.violations.length, 1, "schema checking must reject an unauthorized model");

  const documentationEstate = fixtureEstate(fixtureRoot, ["unierp-workspace", "unierp-platform"]);
  file(join(fixtureRoot, "AGENTS.md"), "`unierp-workspace/scripts/check-demo.mjs`");
  directory(join(fixtureRoot, "unierp-workspace", "governance"));
  directory(join(fixtureRoot, "unierp-platform", "docs", "standards"));
  directory(join(fixtureRoot, "unierp-platform", "docs", "product"));
  file(join(fixtureRoot, "unierp-workspace", "scripts", "check-demo.mjs"), "export {};\n");
  const documentationResult = checkDocumentationTruth({ estate: documentationEstate });
  assert.equal(documentationResult.documentsScanned, 1, "documentation checking must scan the active root entrypoint");
  assert.equal(documentationResult.referencesScanned, 1, "documentation checking must discover executable claims");
  assert.equal(documentationResult.findings.length, 0, "existing executable claims must pass");
  rmSync(join(fixtureRoot, "unierp-workspace", "scripts", "check-demo.mjs"));
  assert.equal(
    checkDocumentationTruth({ estate: documentationEstate }).findings.length,
    1,
    "documentation checking must reject a missing executable claim",
  );

  console.log("Discovery-gate adversarial tests passed: zero scopes, forbidden audit/retention paths, rogue schema ownership, and missing documentation claims were rejected.");
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true });
}
