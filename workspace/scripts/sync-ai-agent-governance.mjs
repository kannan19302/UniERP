import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDir, "..", "..");
const write = process.argv.includes("--write");
const check = process.argv.includes("--check");

if (write === check) {
  console.error("Choose exactly one mode: --check or --write");
  process.exit(2);
}

const sources = {
  "AGENTS.md": "unierp-workspace/governance/AGENTS.md",
  "UniERP.code-workspace": "unierp-workspace/governance/UniERP.code-workspace",
};
const mismatches = [];
const normalize = (value) => value.replace(/\r\n/g, "\n").trimEnd();

for (const [target, source] of Object.entries(sources)) {
  const sourceContent = await readFile(resolve(workspaceRoot, source), "utf8");
  let targetContent = "";
  try {
    targetContent = await readFile(resolve(workspaceRoot, target), "utf8");
  } catch {
    // Missing targets are handled as mismatches and may be restored in write mode.
  }

  if (normalize(sourceContent) === normalize(targetContent)) continue;
  mismatches.push(`${target} != ${source}`);
  if (write) await writeFile(resolve(workspaceRoot, target), sourceContent, "utf8");
}

if (mismatches.length && !write) {
  console.error("AI agent governance artifacts are out of sync:");
  for (const mismatch of mismatches) console.error(`- ${mismatch}`);
  process.exit(1);
}

if (write) {
  console.log(`Synchronized ${mismatches.length} workspace governance artifact(s).`);
} else {
  console.log("Workspace governance artifacts match their version-controlled sources.");
}

