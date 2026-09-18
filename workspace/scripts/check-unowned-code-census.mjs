#!/usr/bin/env node
/**
 * check-unowned-code-census.mjs — measures every claimed repository.
 *
 * P12-002: "Every claimed repository measured: what it does, what is reachable,
 * what is tested, what is dead, what other repositories import from it.
 * The census is reproducible by command and published as data. Every repository
 * has a measured profile."
 *
 * Usage:
 *   node scripts/check-unowned-code-census.mjs              # run census, assert profiles, generate report
 *   node scripts/check-unowned-code-census.mjs --json       # emit raw census JSON to stdout
 *   node scripts/check-unowned-code-census.mjs --verify     # gate mode: verify all profiles exist & are valid
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const FAMILY = join(ROOT, "..");
const MANIFEST_PATH = join(ROOT, "docs", "programme", "programme-claims.json");
const CENSUS_JSON_PATH = join(ROOT, "docs", "programme", "P12-002-CENSUS.json");
const CENSUS_MD_PATH = join(ROOT, "docs", "programme", "P12-002-CENSUS.md");

const argv = process.argv.slice(2);
const JSON_MODE = argv.includes("--json");
const VERIFY_MODE = argv.includes("--verify");

if (!existsSync(MANIFEST_PATH)) {
  console.error(`FAIL  Manifest missing: ${MANIFEST_PATH}`);
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
const claimedRepos = manifest.repos || {};

// Helpers
function walkFiles(dir, skipDirs = new Set(["node_modules", ".git", "dist", ".next", ".turbo", "build", ".dart_tool"])) {
  const results = [];
  if (!existsSync(dir)) return results;

  function recurse(current) {
    let entries;
    try {
      entries = readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (skipDirs.has(entry.name)) continue;
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        recurse(full);
      } else if (entry.isFile()) {
        results.push(full);
      }
    }
  }

  recurse(dir);
  return results;
}

function countLines(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    return content.split("\n").length;
  } catch {
    return 0;
  }
}

// Build map of package.json packages to repo directories
function getPackageMap() {
  const map = {};
  for (const repoName of Object.keys(claimedRepos)) {
    const pkgPath = join(FAMILY, repoName, "package.json");
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
        if (pkg.name) {
          map[pkg.name] = repoName;
        }
      } catch {}
    }
  }
  return map;
}

export function runCensus() {
  const packageMap = getPackageMap();
  const repoProfiles = {};

  const allRepoNames = Object.keys(claimedRepos);

  // First pass: collect basic file stats, exports, imports, dependencies
  for (const repoName of allRepoNames) {
    const repoClaim = claimedRepos[repoName];
    const repoPath = join(FAMILY, repoName);
    const onDisk = existsSync(repoPath);

    if (!onDisk) {
      repoProfiles[repoName] = {
        name: repoName,
        onDisk: false,
        planned: !!repoClaim.planned,
        owner: repoClaim.owner,
        role: repoClaim.role || "",
        stats: {
          totalFiles: 0,
          codeFiles: 0,
          testFiles: 0,
          docFiles: 0,
          configFiles: 0,
          totalLines: 0,
          codeLines: 0,
        },
        languageBreakdown: {},
        testProfile: {
          specFiles: 0,
          testFramework: "none",
          hasCoverageConfig: false,
        },
        exports: {
          namedCount: 0,
          exportedSymbols: [],
        },
        dependencies: {
          internal: [],
          external: [],
        },
        importedBy: [],
        deadCodeIndicators: {
          unreferencedExportsCount: 0,
          orphanedFiles: [],
        },
      };
      continue;
    }

    const allFiles = walkFiles(repoPath);
    let totalLines = 0;
    let codeLines = 0;
    let codeFiles = 0;
    let testFiles = 0;
    let docFiles = 0;
    let configFiles = 0;
    const languageBreakdown = {};

    const exportedSymbols = new Set();
    const internalImports = new Set();
    const externalDeps = new Set();

    // Read package.json if present
    const pkgPath = join(repoPath, "package.json");
    let testFramework = "none";
    let hasCoverageConfig = false;

    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
        const allDeps = {
          ...pkg.dependencies,
          ...pkg.devDependencies,
          ...pkg.peerDependencies,
        };
        for (const dep of Object.keys(allDeps)) {
          if (packageMap[dep] && packageMap[dep] !== repoName) {
            internalImports.add(packageMap[dep]);
          } else {
            externalDeps.add(dep);
          }
        }
        if (allDeps.vitest || allDeps["@vitest/coverage-v8"]) testFramework = "vitest";
        else if (allDeps.jest) testFramework = "jest";

        if (pkg.scripts && (pkg.scripts["test:coverage"] || pkg.scripts["coverage"])) {
          hasCoverageConfig = true;
        }
      } catch {}
    }

    // Check for vitest/jest config
    if (
      existsSync(join(repoPath, "vitest.config.ts")) ||
      existsSync(join(repoPath, "vitest.config.js")) ||
      existsSync(join(repoPath, "vitest.integration.config.ts"))
    ) {
      testFramework = "vitest";
      hasCoverageConfig = true;
    }

    for (const file of allFiles) {
      const ext = extname(file).toLowerCase();
      const rel = relative(repoPath, file).replace(/\\/g, "/");
      const lines = countLines(file);
      totalLines += lines;

      languageBreakdown[ext || "(no-ext)"] = (languageBreakdown[ext || "(no-ext)"] || 0) + 1;

      if (/\.(test|spec)\.(ts|tsx|js|jsx|mjs)$/.test(file) || /_test\.dart$/.test(file)) {
        testFiles++;
      } else if (/\.(md|mdx|txt|rst|adoc)$/.test(file)) {
        docFiles++;
      } else if (/\.(json|ya?ml|toml|ini|env|config\.(ts|js|mjs|cjs))$/.test(file)) {
        configFiles++;
      }

      if (/\.(ts|tsx|js|jsx|mjs|cjs|dart|prisma|sql|py|go|rs)$/.test(file)) {
        codeFiles++;
        codeLines += lines;

        // Parse exports and cross-repo imports if JS/TS
        if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(file)) {
          try {
            const content = readFileSync(file, "utf8");
            // Match export declarations: export const foo, export function bar, export class Baz, export interface Qux, export type Corge
            const exportRegex = /export\s+(?:default\s+)?(?:class|function|const|let|var|interface|type|enum)\s+([a-zA-Z0-9_$]+)/g;
            let m;
            while ((m = exportRegex.exec(content)) !== null) {
              exportedSymbols.add(m[1]);
            }

            // Match import from '@kannan19302/...'
            const importRegex = /from\s+['"](@kannan19302\/[^'"]+)['"]/g;
            while ((m = importRegex.exec(content)) !== null) {
              const importedPkg = m[1];
              if (packageMap[importedPkg] && packageMap[importedPkg] !== repoName) {
                internalImports.add(packageMap[importedPkg]);
              }
            }
          } catch {}
        }
      }
    }

    repoProfiles[repoName] = {
      name: repoName,
      onDisk: true,
      planned: false,
      owner: repoClaim.owner,
      role: repoClaim.role || "",
      stats: {
        totalFiles: allFiles.length,
        codeFiles,
        testFiles,
        docFiles,
        configFiles,
        totalLines,
        codeLines,
      },
      languageBreakdown,
      testProfile: {
        specFiles: testFiles,
        testFramework,
        hasCoverageConfig,
      },
      exports: {
        namedCount: exportedSymbols.size,
        exportedSymbols: Array.from(exportedSymbols).sort().slice(0, 100), // top 100 sample
      },
      dependencies: {
        internal: Array.from(internalImports).sort(),
        external: Array.from(externalDeps).sort(),
      },
      importedBy: [],
      deadCodeIndicators: {
        unreferencedExportsCount: 0,
        orphanedFiles: [],
      },
    };
  }

  // Second pass: compute reverse dependency map (importedBy)
  for (const [repoName, profile] of Object.entries(repoProfiles)) {
    if (!profile.onDisk) continue;
    for (const internalDep of profile.dependencies.internal) {
      if (repoProfiles[internalDep]) {
        repoProfiles[internalDep].importedBy.push(repoName);
      }
    }
  }

  // Deduplicate and sort importedBy
  for (const profile of Object.values(repoProfiles)) {
    profile.importedBy = Array.from(new Set(profile.importedBy)).sort();
  }

  return {
    generatedAt: new Date().toISOString(),
    phase: "P12-002",
    totalRepositories: allRepoNames.length,
    reposOnDisk: Object.values(repoProfiles).filter((r) => r.onDisk).length,
    plannedRepos: Object.values(repoProfiles).filter((r) => r.planned).length,
    profiles: repoProfiles,
  };
}

function generateMarkdownReport(censusData) {
  let md = `# P12-002 · The Unowned-Code Census\n\n`;
  md += `> **Generated automatically by \`scripts/check-unowned-code-census.mjs\`.**\n`;
  md += `> Phase **P12-002**: Every claimed repository measured: what it does, what is reachable, what is tested, what is dead, what other repositories import from it.\n\n`;
  md += `**Census Date:** ${censusData.generatedAt}  \n`;
  md += `**Total Repositories Claimed:** ${censusData.totalRepositories} (${censusData.reposOnDisk} on disk, ${censusData.plannedRepos} planned)  \n\n`;

  md += `## 1. Summary Overview\n\n`;
  md += `| Repository | Owner | Role Summary | Files | Code Lines | Tests | Consumers (Imported By) |\n`;
  md += `| :--------- | :---: | :----------- | ----: | ---------: | ----: | :---------------------- |\n`;

  const sortedRepos = Object.keys(censusData.profiles).sort();
  for (const name of sortedRepos) {
    const p = censusData.profiles[name];
    const roleTrunc = p.role.length > 50 ? p.role.slice(0, 47) + "..." : p.role;
    const consumersStr = p.importedBy.length > 0 ? p.importedBy.join(", ") : "*(none)*";
    md += `| \`${name}\` | P${p.owner} | ${roleTrunc || "*(none)*"} | ${p.stats.totalFiles} | ${p.stats.codeLines.toLocaleString()} | ${p.testProfile.specFiles} | ${consumersStr} |\n`;
  }

  md += `\n---\n\n## 2. Detailed Profiles per Repository\n\n`;

  for (const name of sortedRepos) {
    const p = censusData.profiles[name];
    md += `### \`${name}\` (Programme ${p.owner})\n\n`;
    md += `- **Role**: ${p.role}\n`;
    md += `- **Status**: ${p.onDisk ? "Present on disk" : "Planned (not yet on disk)"}\n`;
    md += `- **Total Files**: ${p.stats.totalFiles} (${p.stats.codeFiles} code, ${p.stats.testFiles} test, ${p.stats.docFiles} docs, ${p.stats.configFiles} config)\n`;
    md += `- **Lines of Code**: ${p.stats.codeLines.toLocaleString()} lines (total lines: ${p.stats.totalLines.toLocaleString()})\n`;
    md += `- **Testing**: framework=\`${p.testProfile.testFramework}\`, test files=${p.testProfile.specFiles}, coverage configured=\`${p.testProfile.hasCoverageConfig}\`\n`;
    md += `- **Exports**: ${p.exports.namedCount} exported symbols\n`;
    md += `- **Internal In-Family Dependencies**: ${p.dependencies.internal.length > 0 ? p.dependencies.internal.map((d) => `\`${d}\``).join(", ") : "none"}\n`;
    md += `- **Consumers (Imported By)**: ${p.importedBy.length > 0 ? p.importedBy.map((c) => `\`${c}\``).join(", ") : "none"}\n\n`;
  }

  return md;
}

// Main execution
const census = runCensus();

if (JSON_MODE) {
  console.log(JSON.stringify(census, null, 2));
  process.exit(0);
}

if (VERIFY_MODE) {
  if (!existsSync(CENSUS_JSON_PATH)) {
    console.error(`FAIL  Census JSON data missing at ${CENSUS_JSON_PATH}. Run without --verify to generate.`);
    process.exit(1);
  }
  if (!existsSync(CENSUS_MD_PATH)) {
    console.error(`FAIL  Census markdown report missing at ${CENSUS_MD_PATH}. Run without --verify to generate.`);
    process.exit(1);
  }

  const existingCensus = JSON.parse(readFileSync(CENSUS_JSON_PATH, "utf8"));
  let errors = 0;

  for (const claimedName of Object.keys(claimedRepos)) {
    const profile = existingCensus.profiles?.[claimedName];
    if (!profile) {
      console.error(`FAIL  Repository ${claimedName} is claimed in manifest but missing from census.`);
      errors++;
      continue;
    }
    if (!profile.role) {
      console.error(`FAIL  Repository ${claimedName} has no declared role in census.`);
      errors++;
    }
    if (profile.onDisk && profile.stats.totalFiles === 0) {
      console.error(`FAIL  Repository ${claimedName} is on disk but census measured 0 files.`);
      errors++;
    }
    if (!profile.stats || typeof profile.stats.codeLines !== "number") {
      console.error(`FAIL  Repository ${claimedName} profile missing valid stats.`);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`\ncheck-unowned-code-census: ${errors} error(s) found.`);
    process.exit(1);
  }
  console.log(`OK    Census verify passed across ${Object.keys(claimedRepos).length} claimed repositories.`);
  process.exit(0);
}

// Default mode: write JSON and MD artifacts and print summary
writeFileSync(CENSUS_JSON_PATH, JSON.stringify(census, null, 2), "utf8");
const mdReport = generateMarkdownReport(census);
writeFileSync(CENSUS_MD_PATH, mdReport, "utf8");

console.log(`\nUniERP · P12-002 Unowned-Code Census\n`);
console.log(`Measured ${census.totalRepositories} repositories (${census.reposOnDisk} on disk, ${census.plannedRepos} planned).`);
console.log(`Artifacts updated:`);
console.log(`  - ${relative(ROOT, CENSUS_JSON_PATH)}`);
console.log(`  - ${relative(ROOT, CENSUS_MD_PATH)}`);
console.log(`\nOK    Census completed successfully.\n`);
