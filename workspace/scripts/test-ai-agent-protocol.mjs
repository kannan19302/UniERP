import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourceRoot = resolve(scriptDir, "..", "..");
const validator = resolve(scriptDir, "check-ai-agent-protocol.mjs");
const tempRoot = await mkdtemp(resolve(tmpdir(), "unierp-agent-protocol-"));
const sourceWorkspace = JSON.parse(
  await readFile(resolve(sourceRoot, "UniERP.code-workspace"), "utf8"),
);

async function copyFile(relativePath, fixtureRoot) {
  const target = resolve(fixtureRoot, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await cp(resolve(sourceRoot, relativePath), target, { recursive: true });
}

async function createFixture(name) {
  const fixtureRoot = resolve(tempRoot, name);
  await mkdir(fixtureRoot, { recursive: true });
  await copyFile("AGENTS.md", fixtureRoot);
  await copyFile("UniERP.code-workspace", fixtureRoot);
  await copyFile("unierp-workspace/governance", fixtureRoot);
  await copyFile("unierp-workspace/scripts/classify-ai-change.mjs", fixtureRoot);
  await copyFile("unierp-platform/docs/standards", fixtureRoot);
  for (const folder of sourceWorkspace.folders) {
    await copyFile(`${folder.path}/AGENTS.md`, fixtureRoot);
    await copyFile(`${folder.path}/.github/pull_request_template.md`, fixtureRoot);
    await copyFile(`${folder.path}/.github/CODEOWNERS`, fixtureRoot);
  }
  return fixtureRoot;
}

function validate(fixtureRoot) {
  return spawnSync(process.execPath, [validator], {
    cwd: sourceRoot,
    env: { ...process.env, UNIERP_PROTOCOL_ROOT: fixtureRoot },
    encoding: "utf8",
  });
}

function expectPass(name, result) {
  if (result.status !== 0) {
    throw new Error(`${name} unexpectedly failed:\n${result.stdout}${result.stderr}`);
  }
}

function expectFailure(name, result, expectedText) {
  const output = `${result.stdout}${result.stderr}`;
  if (result.status === 0 || !output.includes(expectedText)) {
    throw new Error(
      `${name} did not fail with ${JSON.stringify(expectedText)}:\n${output}`,
    );
  }
}

async function mutateJson(path, mutate) {
  const value = JSON.parse(await readFile(path, "utf8"));
  mutate(value);
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

try {
  const baseline = await createFixture("baseline");
  expectPass("valid fixture", validate(baseline));

  const missingBootstrap = await createFixture("missing-bootstrap");
  await rm(resolve(missingBootstrap, "api/AGENTS.md"));
  expectFailure(
    "missing repository bootstrap",
    validate(missingBootstrap),
    "missing repository bootstrap: api/AGENTS.md",
  );

  const staleMarker = await createFixture("stale-marker");
  await writeFile(
    resolve(staleMarker, "AGENTS.md"),
    (await readFile(resolve(staleMarker, "AGENTS.md"), "utf8")).replace(
      "UniERP-Agent-Protocol: 1.1.0",
      "UniERP-Agent-Protocol: 0.0.0",
    ),
    "utf8",
  );
  expectFailure(
    "stale root marker",
    validate(staleMarker),
    "workspace entrypoint has a missing or stale protocol marker",
  );

  const disabledDiscovery = await createFixture("disabled-discovery");
  await mutateJson(resolve(disabledDiscovery, "UniERP.code-workspace"), (workspace) => {
    workspace.settings["chat.useAgentsMdFile"] = false;
  });
  expectFailure(
    "disabled instruction discovery",
    validate(disabledDiscovery),
    "workspace discovery setting chat.useAgentsMdFile must be true",
  );

  const dishonestStatus = await createFixture("dishonest-status");
  const manifestPath = resolve(
    dishonestStatus,
    "unierp-platform/docs/standards/AI_AGENT_PROTOCOL.json",
  );
  await mutateJson(manifestPath, (manifest) => {
    manifest.cycleStatuses.PARTIAL = "Useful work exists.";
  });
  expectFailure(
    "dishonest partial status",
    validate(dishonestStatus),
    "PARTIAL definition must state that the work is not done",
  );

  const schemaViolation = await createFixture("schema-violation");
  const invalidManifestPath = resolve(
    schemaViolation,
    "unierp-platform/docs/standards/AI_AGENT_PROTOCOL.json",
  );
  await mutateJson(invalidManifestPath, (manifest) => {
    manifest.providerNeutral = "yes";
  });
  expectFailure(
    "manifest JSON Schema violation",
    validate(schemaViolation),
    "JSON Schema violation: $.providerNeutral: must equal true",
  );

  const unmappedRepository = await createFixture("unmapped-repository");
  const repositoryMapPath = resolve(
    unmappedRepository,
    "unierp-platform/docs/standards/AI_REPOSITORY_PLATFORM_MAP.json",
  );
  await mutateJson(repositoryMapPath, (repositoryMap) => {
    delete repositoryMap.repositories.api;
  });
  expectFailure(
    "unmapped workspace repository",
    validate(unmappedRepository),
    "workspace repository is unmapped: api",
  );

  const untracedRule = await createFixture("untraced-rule");
  const traceabilityPath = resolve(
    untracedRule,
    "unierp-platform/docs/standards/TRACEABILITY_MATRIX.md",
  );
  await writeFile(
    traceabilityPath,
    (await readFile(traceabilityPath, "utf8")).replace(
      "| AIP-STATUS-001 |",
      "| REMOVED-STATUS-RULE |",
    ),
    "utf8",
  );
  expectFailure(
    "untraced protocol rule",
    validate(untracedRule),
    "rule is absent from traceability matrix: AIP-STATUS-001",
  );

  console.log(
    "AI agent protocol adversarial tests passed: valid baseline plus missing bootstrap, " +
      "stale marker, disabled discovery, dishonest status, JSON Schema violation, " +
      "unmapped repository, and untraced rule.",
  );
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}
