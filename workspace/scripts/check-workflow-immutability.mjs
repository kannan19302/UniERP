#!/usr/bin/env node
import { existsSync, mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { activeRepositoryPath, assertNonEmptyDiscovery, loadActiveEstate } from "./lib/estate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const DEFAULT_ROOT = resolve(dirname(SCRIPT_PATH), "..", "..");
const DEFAULT_PIN_MANIFEST = resolve(DEFAULT_ROOT, "unierp-workspace", "governance", "workflow-action-pins.json");
const USES = /^\s*(?:-\s*)?uses:\s*([^\s#]+)\s*$/gm;
const SHA = /^[0-9a-f]{40}$/i;

function workflowFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.ya?ml$/i.test(entry.name))
    .map((entry) => join(directory, entry.name));
}

function immutableUsesReference(reference) {
  if (reference.startsWith("./")) return true;
  if (reference.startsWith("docker://")) return /@sha256:[0-9a-f]{64}$/i.test(reference);
  const at = reference.lastIndexOf("@");
  return at > 0 && SHA.test(reference.slice(at + 1));
}

export function inspectWorkflowReferences(root = DEFAULT_ROOT) {
  const estate = loadActiveEstate({ workspaceRoot: root });
  const files = estate.names.flatMap((repository) => workflowFiles(join(activeRepositoryPath(estate, repository), ".github", "workflows")));
  assertNonEmptyDiscovery("active GitHub workflow files", files);
  const references = [];
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    USES.lastIndex = 0;
    let match;
    while ((match = USES.exec(source)) !== null) {
      references.push({
        file: relative(root, file).replace(/\\/g, "/"),
        line: source.slice(0, match.index).split(/\r?\n/).length,
        reference: match[1],
      });
    }
  }
  assertNonEmptyDiscovery("active GitHub action/workflow references", references);
  return references;
}

export function evaluateWorkflowImmutability(references) {
  return references
    .filter(({ reference }) => !immutableUsesReference(reference))
    .map(({ file, line, reference }) => `${file}:${line} uses mutable action/workflow reference '${reference}'`);
}

export function loadPinManifest(file = DEFAULT_PIN_MANIFEST) {
  if (!existsSync(file)) throw new Error(`Workflow pin manifest is missing at ${file}`);
  const manifest = JSON.parse(readFileSync(file, "utf8"));
  if (!manifest?.repositories || typeof manifest.repositories !== "object") {
    throw new Error(`Workflow pin manifest has no repositories map at ${file}`);
  }
  return manifest;
}

function repositoryFromReference(reference) {
  const at = reference.lastIndexOf("@");
  if (at <= 0) return null;
  const target = reference.slice(0, at);
  const parts = target.split("/");
  return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : null;
}

export function evaluateKnownPins(references, manifest) {
  const violations = [];
  for (const { file, line, reference } of references) {
    if (reference.startsWith("./") || reference.startsWith("docker://")) continue;
    const at = reference.lastIndexOf("@");
    const commit = at > 0 ? reference.slice(at + 1) : "";
    if (!SHA.test(commit)) continue;
    const repository = repositoryFromReference(reference);
    const allowed = manifest.repositories?.[repository]?.commits;
    if (!Array.isArray(allowed) || !allowed.includes(commit)) {
      violations.push(`${file}:${line} uses unregistered workflow pin '${reference}'`);
    }
  }
  return violations;
}

function fixture({ uses }) {
  const root = mkdtempSync(join(tmpdir(), "unierp-workflow-"));
  const workflow = join(root, "api", ".github", "workflows");
  mkdirSync(workflow, { recursive: true });
  writeFileSync(join(root, "UniERP.code-workspace"), JSON.stringify({ folders: [{ path: "api" }] }));
  writeFileSync(join(workflow, "ci.yml"), `name: CI\njobs:\n  check:\n    steps:\n      - uses: ${uses}\n`);
  return root;
}

function test() {
  const good = fixture({ uses: "actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683" });
  const bad = fixture({ uses: "actions/checkout@v4" });
  try {
    const goodReferences = inspectWorkflowReferences(good);
    if (evaluateWorkflowImmutability(goodReferences).length) throw new Error("pinned workflow fixture failed");
    if (evaluateKnownPins(goodReferences, { repositories: { "actions/checkout": { commits: ["11bd71901bbe5b1630ceea73d27597364c9af683"] } } }).length) {
      throw new Error("registered workflow pin fixture failed");
    }
    if (evaluateKnownPins(goodReferences, { repositories: {} }).length !== 1) throw new Error("unregistered workflow pin escaped detection");
    if (evaluateWorkflowImmutability(inspectWorkflowReferences(bad)).length !== 1) throw new Error("mutable workflow fixture escaped detection");
  } finally {
    rmSync(good, { recursive: true, force: true });
    rmSync(bad, { recursive: true, force: true });
  }
  console.log("Workflow immutability adversarial tests passed.");
}

if (process.argv.includes("--test")) test();
else {
  const references = inspectWorkflowReferences();
  const violations = [
    ...evaluateWorkflowImmutability(references),
    ...evaluateKnownPins(references, loadPinManifest()),
  ];
  console.log(`Workflow immutability inventory: ${violations.length} mutable or unregistered reference(s).`);
  for (const violation of violations) console.error(`  - ${violation}`);
  if (violations.length) process.exit(1);
}
