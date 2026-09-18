#!/usr/bin/env node
/**
 * Documentation Truth Gate
 *
 * Verifies executable script references in active governance and normative authority documents. It intentionally
 * does not scan historical/dated evidence, where a retired command may be useful historical context.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assertNonEmptyDiscovery, loadActiveEstate, requiredSourceDirectory } from "./lib/estate.mjs";

const CURRENT_FILE = fileURLToPath(import.meta.url);
const scriptReference = /`?((?:[a-z0-9_-]+\/)*scripts\/[a-zA-Z0-9_.\-/]+\.(?:mjs|js))(?![a-zA-Z0-9_.-])`?/g;

function markdownFiles(directory, found = []) {
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      if (["evidence", "archive", "archives", "node_modules", ".git"].includes(entry)) continue;
      markdownFiles(fullPath, found);
    } else if (entry.endsWith(".md")) {
      found.push(fullPath);
    }
  }
  return found;
}

function candidateScriptPaths(estate, documentPath, reference) {
  const candidates = [resolve(estate.root, reference)];
  const workspaceRoot = requiredSourceDirectory(estate, "unierp-workspace");
  const platformDocsRoot = requiredSourceDirectory(estate, "unierp-platform", "docs");
  if (documentPath.startsWith(workspaceRoot) || documentPath.startsWith(platformDocsRoot)) {
    candidates.push(resolve(workspaceRoot, reference));
  }
  return [...new Set(candidates)];
}

export function checkDocumentationTruth({ estate = loadActiveEstate() } = {}) {
  const roots = [
    join(estate.root, "AGENTS.md"),
    requiredSourceDirectory(estate, "unierp-workspace", "governance"),
    requiredSourceDirectory(estate, "unierp-platform", "docs", "standards"),
    requiredSourceDirectory(estate, "unierp-platform", "docs", "product"),
  ];
  const documents = [roots[0], ...roots.slice(1).flatMap((root) => markdownFiles(root))];
  assertNonEmptyDiscovery("active governance documents", documents);

  const findings = [];
  let referencesScanned = 0;
  for (const documentPath of documents) {
    const content = readFileSync(documentPath, "utf8");
    for (const match of content.matchAll(scriptReference)) {
      referencesScanned += 1;
      const reference = match[1];
      if (!candidateScriptPaths(estate, documentPath, reference).some((path) => {
        try {
          return statSync(path).isFile();
        } catch {
          return false;
        }
      })) {
        findings.push({
          document: relative(estate.root, documentPath).replace(/\\/g, "/"),
          reference,
        });
      }
    }
  }
  assertNonEmptyDiscovery("governance script references", referencesScanned);
  return { documentsScanned: documents.length, referencesScanned, findings };
}

if (process.argv[1] && CURRENT_FILE === resolve(process.argv[1])) {
  let result;
  try {
    result = checkDocumentationTruth();
  } catch (error) {
    console.error(`❌ Documentation truth gate could not establish discovery scope: ${error.message}`);
    process.exit(1);
  }

  if (result.findings.length > 0) {
    console.error(`❌ Documentation truth violation: ${result.findings.length} unresolvable active claim(s) across ${result.documentsScanned} documents.`);
    for (const finding of result.findings) {
      console.error(`  - ${finding.document} references \`${finding.reference}\`, which does not exist.`);
    }
    process.exit(1);
  }

  console.log(`✅ Documentation truth verified (${result.referencesScanned} script references across ${result.documentsScanned} active governance documents).`);
}
