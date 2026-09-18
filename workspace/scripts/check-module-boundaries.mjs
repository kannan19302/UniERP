import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, normalize, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { activeRepositoryPath, assertNonEmptyDiscovery, loadActiveEstate } from './lib/estate.mjs';

const CURRENT_FILE = fileURLToPath(import.meta.url);
const apiRootArgument = process.argv.indexOf('--api-root');
const requestedApiRoot = apiRootArgument >= 0 ? process.argv[apiRootArgument + 1] : null;
const estate = loadActiveEstate();
const apiSourceRoot = requestedApiRoot
  ? resolve(requestedApiRoot)
  : resolve(activeRepositoryPath(estate, 'api'), 'src');
const apiRepositoryRoot = resolve(apiSourceRoot, '..');
const modulesRoot = resolve(apiSourceRoot, 'modules');
const baseline = new Set(JSON.parse(readFileSync(resolve(activeRepositoryPath(estate, 'unierp-workspace'), 'scripts/module-boundary-baseline.json'), 'utf8')));
const importPattern = /(?:import|export)\s+(?:type\s+)?(?:[^'";]+?\s+from\s+)?['"]([^'"]+)['"]/g;
const sourceExtensions = new Set(['.ts', '.tsx']);

function filesIn(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const file = resolve(directory, entry);
    const stats = statSync(file);
    if (stats.isDirectory()) return filesIn(file);
    return sourceExtensions.has(extname(file)) ? [file] : [];
  });
}

function moduleName(file) {
  const relative = normalize(file).slice(normalize(modulesRoot).length + 1);
  return relative.split(/[\\/]/)[0] || null;
}

function resolveImport(sourceFile, specifier) {
  if (!specifier.startsWith('.')) return null;
  const candidate = resolve(sourceFile, '..', specifier);
  const possibilities = [
    candidate,
    `${candidate}.ts`,
    `${candidate}.tsx`,
    resolve(candidate, 'index.ts'),
    resolve(candidate, 'index.tsx'),
  ];
  return possibilities.find(existsSync) ?? null;
}

// Track E complete — blockchain is no longer quarantined. It is now an
// event-driven module consuming outbox events (see blockchain-outbox.handler.ts).
// The @kannan19302/blockchain package and modules/blockchain may be imported by any
// module that uses the outbox to trigger blockchain anchoring.

const violations = [];
if (!existsSync(modulesRoot) || !statSync(modulesRoot).isDirectory()) {
  console.error(`Module boundary check cannot find active API modules at ${modulesRoot}.`);
  process.exit(1);
}
const moduleFiles = filesIn(modulesRoot);
try {
  assertNonEmptyDiscovery('API module source files', moduleFiles);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
for (const file of moduleFiles) {
  if (file.includes(`${normalize('/tests/')}`) || /\.spec\.ts$/.test(file)) continue;
  const sourceModule = moduleName(file);
  const source = readFileSync(file, 'utf8');
  for (const match of source.matchAll(importPattern)) {
    const target = resolveImport(file, match[1]);
    if (!target || !normalize(target).startsWith(normalize(modulesRoot))) continue;
    const targetModule = moduleName(target);
    if (sourceModule && targetModule && sourceModule !== targetModule) {
      // Normalise to POSIX separators before building the key. Without this the
      // violation strings differ between Windows (`.\src\...`) and Linux
      // (`./src/...`), so the committed baseline matches on CI and misses on a
      // developer's machine — the gate then fails locally for seven violations
      // it was explicitly told to tolerate. Native Windows is a supported
      // development target (TRD ADR-010), so gate output must be identical on both.
      const relativeFile = `./${relative(apiRepositoryRoot, file).replace(/\\/g, '/')}`;
      violations.push(`${relativeFile} -> ${match[1]} (${sourceModule} -> ${targetModule})`);
    }
  }
}

const newViolations = violations.filter((violation) => !baseline.has(violation));
if (newViolations.length > 0) {
  console.error('Direct imports between ERP modules are forbidden. Use an event, shared contract, or common infrastructure instead.');
  console.error(newViolations.join('\n'));
  process.exit(1);
}

console.log(`Module boundary check passed. ${moduleFiles.length} active API source files scanned; ${violations.length} tracked legacy violation(s) remain.`);
