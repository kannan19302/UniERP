import { readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(
  process.env.UNIERP_PROTOCOL_ROOT || resolve(scriptDir, "..", ".."),
);
const manifestPath = resolve(
  workspaceRoot,
  "unierp-platform/docs/standards/AI_AGENT_PROTOCOL.json",
);

const failures = [];
let workspaceFolderCount = 0;
let workspaceFolderPaths = [];

function resolveLocalRef(rootSchema, reference) {
  if (!reference.startsWith("#/")) throw new Error(`unsupported schema reference: ${reference}`);
  return reference
    .slice(2)
    .split("/")
    .reduce((value, part) => value?.[part.replace(/~1/g, "/").replace(/~0/g, "~")], rootSchema);
}

function isType(value, type) {
  if (type === "array") return Array.isArray(value);
  if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  if (type === "number") return typeof value === "number" && Number.isFinite(value);
  return typeof value === type;
}

function validateWithSchema(value, schema, rootSchema, path = "$", errors = []) {
  if (schema.$ref) {
    const resolved = resolveLocalRef(rootSchema, schema.$ref);
    if (!resolved) errors.push(`${path}: unresolved schema reference ${schema.$ref}`);
    else validateWithSchema(value, resolved, rootSchema, path, errors);
    return errors;
  }
  if (schema.const !== undefined && value !== schema.const) {
    errors.push(`${path}: must equal ${JSON.stringify(schema.const)}`);
    return errors;
  }
  if (schema.type) {
    const permitted = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!permitted.some((type) => isType(value, type))) {
      errors.push(`${path}: expected ${permitted.join(" or ")}`);
      return errors;
    }
  }
  if (typeof value === "string") {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push(`${path}: string is shorter than ${schema.minLength}`);
    }
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
      errors.push(`${path}: does not match ${schema.pattern}`);
    }
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      errors.push(`${path}: has fewer than ${schema.minItems} items`);
    }
    if (schema.uniqueItems) {
      const serialized = value.map((item) => JSON.stringify(item));
      if (new Set(serialized).size !== serialized.length) errors.push(`${path}: items must be unique`);
    }
    if (schema.items) {
      value.forEach((item, index) =>
        validateWithSchema(item, schema.items, rootSchema, `${path}[${index}]`, errors),
      );
    }
  }
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    if (schema.minProperties !== undefined && Object.keys(value).length < schema.minProperties) {
      errors.push(`${path}: has fewer than ${schema.minProperties} properties`);
    }
    for (const key of schema.required ?? []) {
      if (value[key] === undefined) errors.push(`${path}: missing required property ${key}`);
    }
    for (const [key, child] of Object.entries(value)) {
      if (schema.properties?.[key]) {
        validateWithSchema(child, schema.properties[key], rootSchema, `${path}.${key}`, errors);
      } else if (schema.additionalProperties === false) {
        errors.push(`${path}: unknown property ${key}`);
      } else if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
        validateWithSchema(child, schema.additionalProperties, rootSchema, `${path}.${key}`, errors);
      }
    }
  }
  return errors;
}

async function mustExist(relativePath) {
  try {
    await access(resolve(workspaceRoot, relativePath));
  } catch {
    failures.push(`missing required artifact: ${relativePath}`);
  }
}

let manifest;
try {
  manifest = JSON.parse(await readFile(manifestPath, "utf8"));
} catch (error) {
  failures.push(`invalid protocol manifest: ${error.message}`);
}

if (manifest) {
  for (const key of [
    "protocol",
    "version",
    "status",
    "entrypoint",
    "entrypointMarker",
    "workspaceFile",
    "governanceSources",
    "workspaceDiscoverySettings",
    "repositoryPlatformMap",
    "cycleStatusTemplate",
    "playbooksDocument",
    "prAttestationTemplate",
    "prAttestationMarker",
    "changelogDocument",
    "conformanceLedger",
    "changeClassifier",
    "canonicalDocument",
    "changeContractTemplate",
    "riskClasses",
    "requiredDomains",
    "rules",
    "restrictedActions",
    "cycleStatuses",
    "donePredicates",
    "claimStates",
    "claimEvidenceStates",
    "completionReport",
  ]) {
    if (manifest[key] === undefined) failures.push(`manifest is missing ${key}`);
  }

  await Promise.all(
    [
      manifest.entrypoint,
      manifest.workspaceFile,
      ...Object.values(manifest.governanceSources ?? {}),
      manifest.repositoryPlatformMap,
      manifest.cycleStatusTemplate,
      manifest.playbooksDocument,
      manifest.prAttestationTemplate,
      manifest.changelogDocument,
      manifest.conformanceLedger,
      manifest.changeClassifier,
      manifest.canonicalDocument,
      manifest.changeContractTemplate,
      "unierp-platform/docs/standards/AI_AGENT_PROTOCOL.schema.json",
    ]
      .filter(Boolean)
      .map(mustExist),
  );

  try {
    for (const [target, source] of Object.entries(manifest.governanceSources ?? {})) {
      const normalize = (value) => value.replace(/\r\n/g, "\n").trimEnd();
      const targetContent = normalize(await readFile(resolve(workspaceRoot, target), "utf8"));
      const sourceContent = normalize(await readFile(resolve(workspaceRoot, source), "utf8"));
      if (targetContent !== sourceContent) {
        failures.push(`workspace governance artifact is out of sync: ${target} != ${source}`);
      }
    }

    const rootEntrypoint = await readFile(
      resolve(workspaceRoot, manifest.entrypoint),
      "utf8",
    );
    if (!rootEntrypoint.includes(manifest.entrypointMarker)) {
      failures.push("workspace entrypoint has a missing or stale protocol marker");
    }

    const workspace = JSON.parse(
      await readFile(resolve(workspaceRoot, manifest.workspaceFile), "utf8"),
    );
    if (!Array.isArray(workspace.folders) || workspace.folders.length === 0) {
      failures.push("workspace file has no folder roots");
    } else {
      workspaceFolderCount = workspace.folders.length;
      workspaceFolderPaths = workspace.folders.map((folder) => folder?.path);
      const seenPaths = new Set();
      for (const folder of workspace.folders) {
        const relativePath = folder?.path;
        if (
          typeof relativePath !== "string" ||
          !relativePath ||
          relativePath === "." ||
          relativePath.includes("..") ||
          seenPaths.has(relativePath)
        ) {
          failures.push(`invalid or duplicate workspace folder path: ${relativePath}`);
          continue;
        }
        seenPaths.add(relativePath);

        const bootstrapPath = resolve(workspaceRoot, relativePath, "AGENTS.md");
        try {
          const bootstrap = await readFile(bootstrapPath, "utf8");
          if (!bootstrap.includes(manifest.entrypointMarker)) {
            failures.push(`${relativePath}/AGENTS.md has a missing or stale protocol marker`);
          }
          if (!bootstrap.includes("../AGENTS.md")) {
            failures.push(`${relativePath}/AGENTS.md does not point to the workspace entrypoint`);
          }
          if (!bootstrap.includes(manifest.canonicalDocument)) {
            failures.push(`${relativePath}/AGENTS.md does not point to the canonical protocol`);
          }
        } catch {
          failures.push(`missing repository bootstrap: ${relativePath}/AGENTS.md`);
        }

        try {
          const prTemplate = await readFile(
            resolve(workspaceRoot, relativePath, ".github/pull_request_template.md"),
            "utf8",
          );
          if (!prTemplate.includes(manifest.prAttestationMarker)) {
            failures.push(`${relativePath} has a missing or stale AI PR attestation marker`);
          }
        } catch {
          failures.push(`missing AI PR attestation template: ${relativePath}`);
        }

        try {
          const codeowners = await readFile(
            resolve(workspaceRoot, relativePath, ".github/CODEOWNERS"),
            "utf8",
          );
          for (const ownedPath of ["/AGENTS.md", "/.github/pull_request_template.md"]) {
            if (!codeowners.includes(`${ownedPath} @kannan19302`)) {
              failures.push(`${relativePath} CODEOWNERS does not protect ${ownedPath}`);
            }
          }
        } catch {
          failures.push(`missing CODEOWNERS: ${relativePath}`);
        }
      }
    }

    for (const [setting, expected] of Object.entries(
      manifest.workspaceDiscoverySettings ?? {},
    )) {
      if (workspace.settings?.[setting] !== expected) {
        failures.push(
          `workspace discovery setting ${setting} must be ${JSON.stringify(expected)}`,
        );
      }
    }
  } catch (error) {
    failures.push(`cannot validate workspace entrypoint distribution: ${error.message}`);
  }

  try {
    const schemaPath = resolve(
      workspaceRoot,
      "unierp-platform/docs/standards/AI_AGENT_PROTOCOL.schema.json",
    );
    const schema = JSON.parse(await readFile(schemaPath, "utf8"));
    for (const error of validateWithSchema(manifest, schema, schema)) {
      failures.push(`JSON Schema violation: ${error}`);
    }
    if (manifest.$schema !== "./AI_AGENT_PROTOCOL.schema.json") {
      failures.push("manifest does not declare the canonical local JSON Schema");
    }
    if (schema.additionalProperties !== false) {
      failures.push("protocol schema must reject unknown top-level properties");
    }
    for (const key of schema.required ?? []) {
      if (manifest[key] === undefined) failures.push(`schema-required manifest key is missing: ${key}`);
    }
    for (const key of Object.keys(manifest)) {
      if (!schema.properties?.[key]) failures.push(`manifest property is absent from schema: ${key}`);
    }
    if (!/^[1-9][0-9]*\.[0-9]+\.[0-9]+$/.test(manifest.version ?? "")) {
      failures.push(`manifest version is not semantic: ${manifest.version}`);
    }
  } catch (error) {
    failures.push(`cannot validate protocol JSON Schema: ${error.message}`);
  }

  try {
    const repositoryMap = JSON.parse(
      await readFile(resolve(workspaceRoot, manifest.repositoryPlatformMap), "utf8"),
    );
    if (repositoryMap.protocolVersion !== manifest.version) {
      failures.push(
        `repository map protocol version mismatch: ${repositoryMap.protocolVersion} != ${manifest.version}`,
      );
    }
    const allowedPlatforms = new Set(repositoryMap.platformIds ?? []);
    const mappedPaths = Object.keys(repositoryMap.repositories ?? {});
    for (const path of workspaceFolderPaths) {
      if (!repositoryMap.repositories?.[path]) failures.push(`workspace repository is unmapped: ${path}`);
    }
    for (const path of mappedPaths) {
      if (!workspaceFolderPaths.includes(path)) failures.push(`repository map contains non-workspace path: ${path}`);
      const entry = repositoryMap.repositories[path];
      if (!allowedPlatforms.has(entry?.primaryPlatform)) {
        failures.push(`${path} has invalid primary platform: ${entry?.primaryPlatform}`);
      }
      for (const platform of entry?.secondaryPlatforms ?? []) {
        if (!allowedPlatforms.has(platform)) failures.push(`${path} has invalid secondary platform: ${platform}`);
      }
      if (!entry?.trustPlane?.trim()) failures.push(`${path} has no trust plane`);
      if (!Array.isArray(entry?.requiredGates) || entry.requiredGates.length === 0) {
        failures.push(`${path} has no required gates`);
      }
    }
  } catch (error) {
    failures.push(`cannot validate repository/platform map: ${error.message}`);
  }

  const expectedStatuses = [
    "DONE",
    "PARTIAL",
    "BLOCKED",
    "FAILED",
    "NOT STARTED",
    "NOT VERIFIED",
  ];
  const actualStatuses = Object.keys(manifest.cycleStatuses ?? {});
  if (
    actualStatuses.length !== expectedStatuses.length ||
    expectedStatuses.some((status) => !actualStatuses.includes(status))
  ) {
    failures.push(`cycle status vocabulary must be exactly: ${expectedStatuses.join(", ")}`);
  }
  for (const status of expectedStatuses.filter((value) => value !== "DONE")) {
    if (!/not done/i.test(manifest.cycleStatuses?.[status] ?? "")) {
      failures.push(`${status} definition must state that the work is not done`);
    }
  }
  for (const predicate of [
    "all-acceptance-criteria-satisfied",
    "all-required-gates-pass",
    "final-diff-reviewed",
    "no-required-work-remains",
  ]) {
    if (!manifest.donePredicates?.includes(predicate)) failures.push(`missing DONE predicate: ${predicate}`);
  }
  for (const claim of ["designed", "implemented", "tested", "integrated", "deployed", "released"]) {
    if (!manifest.claimStates?.includes(claim)) failures.push(`missing independent claim state: ${claim}`);
  }

  try {
    const cycleTemplate = await readFile(
      resolve(workspaceRoot, manifest.cycleStatusTemplate),
      "utf8",
    );
    for (const status of expectedStatuses) {
      if (!cycleTemplate.includes(status)) failures.push(`cycle template is missing status: ${status}`);
    }
    if (!cycleTemplate.includes("This is not done")) {
      failures.push("cycle template lacks the mandatory not-done statement");
    }
    const playbooks = await readFile(resolve(workspaceRoot, manifest.playbooksDocument), "utf8");
    for (const heading of [
      "Database, Prisma, migration, or persistence",
      "HTTP API, event, SDK, extension, or contract",
      "Authentication, authorization, tenancy, security, or privacy",
      "UI, UX, accessibility, or localization",
      "Test, defect fix, verification, or completion claim",
      "Dependency or supply-chain change",
      "Cross-repository or multi-agent change",
    ]) {
      if (!playbooks.includes(`## ${heading}`)) failures.push(`missing focused playbook: ${heading}`);
    }
    const changelog = await readFile(resolve(workspaceRoot, manifest.changelogDocument), "utf8");
    if (!changelog.includes(`## ${manifest.version}`)) {
      failures.push(`changelog has no release entry for ${manifest.version}`);
    }
  } catch (error) {
    failures.push(`cannot validate status/playbook artifacts: ${error.message}`);
  }

  const requiredDomains = new Set(manifest.requiredDomains ?? []);
  const coveredDomains = new Set((manifest.rules ?? []).map((rule) => rule.domain));
  for (const domain of requiredDomains) {
    if (!coveredDomains.has(domain)) {
      // Some domains are deliberately enforced as detailed clauses under a broader normative rule.
      const aliases = {
        observability: "operations",
        "performance-resilience": "operations",
      };
      if (!coveredDomains.has(aliases[domain])) failures.push(`uncovered required domain: ${domain}`);
    }
  }

  const ruleIds = (manifest.rules ?? []).map((rule) => rule.id);
  for (const id of new Set(ruleIds.filter((id, index) => ruleIds.indexOf(id) !== index))) {
    failures.push(`duplicate rule id: ${id}`);
  }

  try {
    const canonical = await readFile(
      resolve(workspaceRoot, manifest.canonicalDocument),
      "utf8",
    );
    const documentedVersion = canonical.match(/^Protocol version:\s*([^\s]+)\s*$/m)?.[1];
    if (documentedVersion !== manifest.version) {
      failures.push(
        `protocol version mismatch: document=${documentedVersion ?? "missing"}, manifest=${manifest.version}`,
      );
    }
    const traceability = await readFile(
      resolve(
        workspaceRoot,
        "unierp-platform/docs/standards/TRACEABILITY_MATRIX.md",
      ),
      "utf8",
    );
    for (const rule of manifest.rules ?? []) {
      if (!/^AIP-[A-Z0-9]+-\d{3}$/.test(rule.id ?? "")) {
        failures.push(`invalid rule id: ${rule.id}`);
      } else if (!canonical.includes(`\`${rule.id}\``)) {
        failures.push(`rule is absent from canonical document: ${rule.id}`);
      }
      if (!traceability.includes(`| ${rule.id} |`)) {
        failures.push(`rule is absent from traceability matrix: ${rule.id}`);
      }
      if (!rule.summary?.trim()) failures.push(`rule has no summary: ${rule.id}`);
    }
  } catch (error) {
    failures.push(`cannot inspect canonical document: ${error.message}`);
  }

  for (const risk of ["R0", "R1", "R2", "R3"]) {
    if (!manifest.riskClasses?.[risk]) failures.push(`missing risk class: ${risk}`);
  }

  if (manifest.providerNeutral !== true) failures.push("protocol must be provider-neutral");
  if (manifest.status !== "active") failures.push("protocol status must be active");
}

if (failures.length) {
  console.error("AI agent protocol validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `AI agent protocol ${manifest.version} is valid: ${manifest.rules.length} rules, ` +
    `${manifest.requiredDomains.length} required domains, 4 risk classes, ` +
    `${workspaceFolderCount} repository entrypoints.`,
);
