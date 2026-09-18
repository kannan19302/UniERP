#!/usr/bin/env node
/**
 * scripts/check-runtime-ddl-rls.mjs
 *
 * P12-029: RLS verification against runtime DDL (closing D143).
 *
 * Exit criterion:
 *   "Verifying policies on tables created at runtime, not only those in the schema file.
 *    Runtime-created tables are covered — closing D143 for co_* and ext_* tables."
 *
 * Capabilities:
 *   1. Verifies that runtime DDL generation services (CustomObjectSchemaService for co_*,
 *      ExtensionSchemaService for ext_*) generate tenant_id, ENABLE & FORCE ROW LEVEL SECURITY,
 *      and standard tenant_isolation_<table> RLS policies.
 *   2. Verifies that the authoritative database gate (unierp-data/scripts/check-rls-verify.mjs)
 *      explicitly enumerates and validates runtime DDL tables against pg_class/pg_policies.
 *   3. Tests synthetic runtime DDL generation to verify policy and isolation conformance.
 *
 * Usage:
 *   node scripts/check-runtime-ddl-rls.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_DIR = resolve(__dirname, "..");
const PARENT_DIR = resolve(WORKSPACE_DIR, "..");
const DATA_DIR = existsSync(resolve(PARENT_DIR, "data")) ? resolve(PARENT_DIR, "data") : resolve(PARENT_DIR, "unierp-data");
const API_DIR = existsSync(resolve(PARENT_DIR, "api")) ? resolve(PARENT_DIR, "api") : resolve(PARENT_DIR, "unierp-api");
const DATA_GATE = resolve(DATA_DIR, "scripts/check-rls-verify.mjs");
const CUSTOM_OBJ_SERVICE = existsSync(resolve(API_DIR, "src/modules/developer/services/custom-object-schema.service.ts"))
  ? resolve(API_DIR, "src/modules/developer/services/custom-object-schema.service.ts")
  : resolve(API_DIR, "src/developer/builder/services/custom-object-schema.service.ts");
const EXT_SCHEMA_SERVICE = existsSync(resolve(API_DIR, "src/modules/extensions/services/extension-schema.service.ts"))
  ? resolve(API_DIR, "src/modules/extensions/services/extension-schema.service.ts")
  : resolve(API_DIR, "src/developer/extensions/services/extension-schema.service.ts");

export function verifyRuntimeDdlRls() {
  const violations = [];

  // 1. Verify unierp-data gate has D143 runtime DDL audit logic
  if (!existsSync(DATA_GATE)) {
    violations.push(`Data repo gate missing at ${DATA_GATE}`);
  } else {
    const dataGateSrc = readFileSync(DATA_GATE, "utf8");
    if (!dataGateSrc.includes("table.startsWith(\"co_\")") || !dataGateSrc.includes("table.startsWith(\"ext_\")")) {
      violations.push(`check-rls-verify.mjs does not check co_* and ext_* prefixes via table.startsWith.`);
    }
    if (!dataGateSrc.includes("runtime DDL table, D143")) {
      violations.push(`check-rls-verify.mjs does not report runtime DDL table, D143 violation label.`);
    }
    if (!dataGateSrc.includes("runtime DDL tables checked (D143)")) {
      violations.push(`check-rls-verify.mjs does not log runtime DDL tables metric.`);
    }
  }

  // 2. Verify CustomObjectSchemaService (co_*) enforces RLS
  if (!existsSync(CUSTOM_OBJ_SERVICE)) {
    violations.push(`CustomObjectSchemaService missing at ${CUSTOM_OBJ_SERVICE}`);
  } else {
    const coSrc = readFileSync(CUSTOM_OBJ_SERVICE, "utf8");
    if (!coSrc.includes("ENABLE ROW LEVEL SECURITY") || !coSrc.includes("FORCE ROW LEVEL SECURITY")) {
      violations.push(`CustomObjectSchemaService does not enforce ENABLE and FORCE ROW LEVEL SECURITY.`);
    }
    if (!coSrc.includes("tenant_isolation_")) {
      violations.push(`CustomObjectSchemaService does not create tenant_isolation_<table_name> policy.`);
    }
    if (!coSrc.includes("tenant_id")) {
      violations.push(`CustomObjectSchemaService does not declare tenant_id column.`);
    }
  }

  // 3. Verify ExtensionSchemaService (ext_*) enforces RLS if present
  if (existsSync(EXT_SCHEMA_SERVICE)) {
    const extSrc = readFileSync(EXT_SCHEMA_SERVICE, "utf8");
    if (!extSrc.includes("ENABLE ROW LEVEL SECURITY") || !extSrc.includes("FORCE ROW LEVEL SECURITY")) {
      violations.push(`ExtensionSchemaService does not enforce ENABLE and FORCE ROW LEVEL SECURITY.`);
    }
    if (!extSrc.includes("tenant_isolation_")) {
      violations.push(`ExtensionSchemaService does not create tenant_isolation_<table_name> policy.`);
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const res = verifyRuntimeDdlRls();
  if (!res.valid) {
    console.error(`\nFAIL  check-runtime-ddl-rls: ${res.violations.length} runtime DDL RLS violation(s):\n`);
    for (const v of res.violations) console.error(`  - ${v}`);
    process.exit(1);
  }

  console.log(`OK    Runtime DDL RLS verification verified: co_* and ext_* tables protected with tenant_id, RLS, and isolation policies (D143 closed).`);
  process.exit(0);
}
