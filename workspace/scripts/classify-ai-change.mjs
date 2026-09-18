import { readFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDir, "..", "..");
const mapPath = resolve(
  workspaceRoot,
  "unierp-platform/docs/standards/AI_REPOSITORY_PLATFORM_MAP.json",
);
const repositoryMap = JSON.parse(await readFile(mapPath, "utf8"));
const repositories = repositoryMap.repositories;
const rawArgs = process.argv.slice(2);
const json = rawArgs.includes("--json");
const paths = rawArgs.filter((value) => !value.startsWith("--"));

if (paths.length === 0) {
  console.error(
    "Provide one or more workspace-relative changed paths. Example:\n" +
      "  npm run classify:ai-change -- data/prisma/schema/core.prisma api/src/orders/orders.controller.ts",
  );
  process.exit(2);
}

function normalizePath(value) {
  const absolute = isAbsolute(value) ? resolve(value) : resolve(workspaceRoot, value);
  const workspaceRelative = relative(workspaceRoot, absolute).split(sep).join("/");
  if (workspaceRelative.startsWith("../") || workspaceRelative === "..") {
    throw new Error(`path is outside the UniERP workspace: ${value}`);
  }
  return workspaceRelative;
}

const normalizedPaths = paths.map(normalizePath);
const affectedRepositories = [];
const unknownPaths = [];
for (const path of normalizedPaths) {
  const repository = Object.keys(repositories).find(
    (candidate) => path === candidate || path.startsWith(`${candidate}/`),
  );
  if (!repository) unknownPaths.push(path);
  else if (!affectedRepositories.includes(repository)) affectedRepositories.push(repository);
}

if (unknownPaths.length) {
  console.error(`Unmapped workspace paths:\n${unknownPaths.map((path) => `- ${path}`).join("\n")}`);
  process.exit(1);
}

const joined = normalizedPaths.join("\n").toLowerCase();
const playbooks = new Set();
const triggers = [];
let risk = "R1";
const elevate = (target) => {
  const order = ["R0", "R1", "R2", "R3"];
  if (order.indexOf(target) > order.indexOf(risk)) risk = target;
};

function trigger(pattern, playbook, reason, targetRisk = "R2") {
  if (!pattern.test(joined)) return;
  playbooks.add(playbook);
  triggers.push(reason);
  elevate(targetRisk);
}

trigger(
  /(^|\/)(data\/prisma|prisma|migrations?\/|[^/]*schema\.prisma|[^/]*\.sql)/m,
  "Database, Prisma, migration, or persistence",
  "database/schema/migration path changed",
);
trigger(
  /(controller|dto|openapi|contracts?|events?|extension-api|\/sdk\/|unierp-contracts)/,
  "HTTP API, event, SDK, extension, or contract",
  "published or service boundary may change",
);
trigger(
  /(^|\/)(auth|idp)(\/|$)|guard|permission|rbac|tenant[-_. ]?(context|guard|isolation|scope)|session|token|security|privacy/,
  "Authentication, authorization, tenancy, security, or privacy",
  "identity, authorization, tenancy, security, or privacy path changed",
);
trigger(
  /\.(tsx|jsx|css|scss)$|design-system|storybook|provider-admin-os|tenant-admin|tenant-apps|developer-platform|marketplace|tenant-sites|web-studio|marketing-site/,
  "UI, UX, accessibility, or localization",
  "user-facing or design-system path changed",
);
trigger(
  /(^|\/)(package\.json|package-lock\.json|pnpm-lock\.yaml|yarn\.lock|dockerfile|cargo\.toml|pubspec\.yaml)$/m,
  "Dependency or supply-chain change",
  "dependency, lockfile, container, or toolchain path changed",
);
trigger(
  /(\.test\.|\.spec\.|__tests__|playwright|vitest|jest|test\/|tests\/)|agents\.md|ai_agent|ai-agent/i,
  "Test, defect fix, verification, or completion claim",
  "test/evidence or agent-protocol path changed",
  "R1",
);

if (affectedRepositories.length > 1) {
  playbooks.add("Cross-repository or multi-agent change");
  triggers.push("more than one repository is affected");
  elevate("R2");
}

const affectedPlatforms = [
  ...new Set(
    affectedRepositories.flatMap((repository) => {
      const entry = repositories[repository];
      return [entry.primaryPlatform, ...entry.secondaryPlatforms];
    }),
  ),
];
const requiredGates = [
  ...new Set(affectedRepositories.flatMap((repository) => repositories[repository].requiredGates)),
];
const result = {
  protocolVersion: repositoryMap.protocolVersion,
  provisionalRiskClass: risk,
  manualR3ReviewRequired: true,
  manualR3ReviewReason:
    "Path classification cannot authorize or rule out destructive, production, secret, security-weakening, or breaking-contract actions.",
  paths: normalizedPaths,
  affectedRepositories,
  affectedPlatforms,
  trustPlanes: [
    ...new Set(affectedRepositories.map((repository) => repositories[repository].trustPlane)),
  ],
  triggeredPlaybooks: [...playbooks],
  classificationReasons: triggers,
  requiredGates,
  cycleStatus: "NOT STARTED",
  done: false,
  nextRequiredAction: "Human/agent reviews this provisional classification and completes the change contract.",
};

if (json) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`# Provisional AI change classification\n`);
  console.log(`- Protocol: ${result.protocolVersion}`);
  console.log(`- Risk: ${result.provisionalRiskClass} (R3 manual review still required)`);
  console.log(`- Cycle status: NOT STARTED`);
  console.log(`- This is not done.`);
  console.log(`- Repositories: ${result.affectedRepositories.join(", ")}`);
  console.log(`- Platforms: ${result.affectedPlatforms.join(", ")}`);
  console.log(`- Trust planes: ${result.trustPlanes.join(", ")}`);
  console.log(`\n## Triggered playbooks\n`);
  for (const playbook of result.triggeredPlaybooks) console.log(`- ${playbook}`);
  console.log(`\n## Required gates\n`);
  for (const gate of result.requiredGates) console.log(`- ${gate}`);
  console.log(`\nNext: ${result.nextRequiredAction}`);
}
