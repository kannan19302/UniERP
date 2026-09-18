import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import assert from "node:assert/strict";

const programmeRoot = process.cwd();
const estateRoot = path.resolve(programmeRoot, "..");
const inventoryPath = path.join(programmeRoot, "scripts", "ui-routes-inventory.json");
const baselinePath = path.join(programmeRoot, "scripts", "ci", "ui-audit-baseline.json");
const updateBaseline = process.argv.includes("--update-baseline");
const checkInventory = process.argv.includes("--check");
const runClassificationTests = process.argv.includes("--test");

const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".dart_tool",
  "build",
  "coverage",
  "dist",
  "node_modules",
]);

const surfaces = [
  { repo: "infra/platform-wizard", anatomy: "launch-hero", floorplan: "non-product", density: "comfortable", shell: "LaunchShell", route: /(?:^|\\|\/)page\.tsx$/ },
  { repo: "marketing-site", anatomy: "editorial", floorplan: "non-product", density: "comfortable", shell: "EditorialShell", route: /(?:^|\\|\/)page\.tsx$/ },
  { repo: "tenant-apps", anatomy: "meridian-workbench", shell: "RecordShell", route: /(?:^|\\|\/)page\.tsx$/ },
  { repo: "tenant-admin", anatomy: "settings", floorplan: "settings", density: "standard", shell: "SettingsShell", route: /(?:^|\\|\/)page\.tsx$/ },
  { repo: "provider-admin-os", anatomy: "ops", floorplan: "operational", density: "compact", shell: "OpsShell", route: /(?:^|\\|\/)page\.tsx$/ },
  { repo: "marketplace", anatomy: "catalog", floorplan: "data", density: "standard", shell: "CatalogShell", route: /(?:^|\\|\/)page\.tsx$/ },
  { repo: "developer-platform", anatomy: "workspace-studio", floorplan: "studio", density: "standard", shell: "PlatformShell|WorkspaceShell|StudioShell", route: /(?:^|\\|\/)page\.tsx$/ },
  { repo: "web-studio", anatomy: "workspace-studio", floorplan: "studio", density: "standard", shell: "PlatformShell|WorkspaceShell|StudioShell", route: /(?:^|\\|\/)page\.tsx$/ },
  { repo: "tenant-sites", anatomy: "tenant-branded", floorplan: "non-product", density: "comfortable", noShell: true, route: /(?:^|\\|\/)page\.tsx$/ },
  { repo: "unierp-mobile", anatomy: "mobile", floorplan: "record", density: "comfortable", shell: "AppShell", route: /(?:_page|_screen)\.dart$/ },
  { repo: "desktop-app", anatomy: "desktop", floorplan: "record", density: "standard", shell: "data-ui-root=\"desktop-adapter\"", route: /public(?:\\|\/)index\.html$/ },
];

const approvedShellFiles = new Set([
  "app_shell.dart",
  "auth-shell.tsx",
  "console-shell.tsx",
  "domain-shell.tsx",
  "workspace-shell-client.tsx",
]);
const sixStates = [
  "LoadingState",
  "EmptyState",
  "FilteredEmptyState",
  "ErrorState",
  "ForbiddenState",
  "PartialState",
];

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  const stack = [directory];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (ignoredDirectories.has(entry.name)) continue;
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(target);
      else files.push(target);
    }
  }
  return files;
}

function countMatches(content, expression) {
  return [...content.matchAll(expression)].length;
}

function relative(file) {
  return path.relative(estateRoot, file).replaceAll("\\", "/");
}

const tenantCompactDomains = /\/(?:finance|fixed-assets|inventory|procurement|manufacturing|supply-chain|pos|field-service)(?:\/|$)/;
const nonProductRoute = /\/(?:login|register|reset-password|verify-email|oauth|terms|privacy|public|onboarding)(?:\/|$)/;
const studioRoute = /\/(?:studio|builder|designer|workflow-builder|form-builder|report-builder)(?:\/|$)/;
const settingsRoute = /\/(?:settings|configuration|preferences|policies)(?:\/|$)/;
const planningRoute = /\/(?:planning|calendar|schedule|timeline|capacity|forecast|budget)(?:\/|$)/;
const operationalRoute = /\/(?:dashboard|analytics|monitoring|control-tower|operations|alerts|exceptions)(?:\/|$)/;
const transactionRoute = /\/(?:new|create|edit|entry|journal|invoice|payment|order|receipt|issue|transfer|posting|reconcile|approval)(?:\/|$)/;
const recordRoute = /\/\[[^/]+\](?:\/|$)|\/(?:detail|details|profile|view)(?:\/|$)/;

function classifyTenantRoute(routeFile) {
  const normalized = `/${routeFile.replaceAll("\\", "/").toLowerCase()}/`;
  const compact = tenantCompactDomains.test(normalized);

  if (nonProductRoute.test(normalized)) {
    return { floorplan: "non-product", defaultDensity: "comfortable", classificationRule: "public-auth-onboarding" };
  }
  if (studioRoute.test(normalized)) {
    return { floorplan: "studio", defaultDensity: "standard", classificationRule: "studio-keyword" };
  }
  if (settingsRoute.test(normalized)) {
    return { floorplan: "settings", defaultDensity: "standard", classificationRule: "settings-keyword" };
  }
  if (planningRoute.test(normalized)) {
    return { floorplan: "planning", defaultDensity: compact ? "compact" : "standard", classificationRule: "planning-keyword" };
  }
  if (operationalRoute.test(normalized)) {
    return { floorplan: "operational", defaultDensity: compact ? "compact" : "standard", classificationRule: "operational-keyword" };
  }
  if (transactionRoute.test(normalized)) {
    return { floorplan: "transaction", defaultDensity: compact ? "compact" : "standard", classificationRule: "transaction-keyword" };
  }
  if (recordRoute.test(normalized)) {
    return { floorplan: "record", defaultDensity: compact ? "compact" : "standard", classificationRule: "record-keyword" };
  }
  return { floorplan: "data", defaultDensity: compact ? "compact" : "standard", classificationRule: "data-fallback" };
}

function classifyRoute(surface, routeFile) {
  if (surface.repo === "tenant-apps") return classifyTenantRoute(routeFile);
  return {
    floorplan: surface.floorplan,
    defaultDensity: surface.density,
    classificationRule: `surface:${surface.repo}`,
  };
}

if (runClassificationTests) {
  assert.deepEqual(classifyTenantRoute("tenant-apps/app/(dashboard)/finance/journals/new/page.tsx"), {
    floorplan: "transaction", defaultDensity: "compact", classificationRule: "transaction-keyword",
  });
  assert.deepEqual(classifyTenantRoute("tenant-apps/app/(dashboard)/inventory/items/[id]/page.tsx"), {
    floorplan: "record", defaultDensity: "compact", classificationRule: "record-keyword",
  });
  assert.deepEqual(classifyTenantRoute("tenant-apps/app/(dashboard)/crm/customers/page.tsx"), {
    floorplan: "data", defaultDensity: "standard", classificationRule: "data-fallback",
  });
  assert.deepEqual(classifyTenantRoute("tenant-apps/app/onboarding/page.tsx"), {
    floorplan: "non-product", defaultDensity: "comfortable", classificationRule: "public-auth-onboarding",
  });
  console.log("UI route classification tests passed.");
  process.exit(0);
}

function nearestRootContract(file, root, surface) {
  if (surface.noShell) return "tenant-site-no-shell";
  const marker = new RegExp(`(?:${surface.shell})`);
  let current = path.dirname(file);
  while (current.startsWith(root)) {
    for (const candidate of ["layout.tsx", "layout.ts", "app_shell.dart", "index.html", "page.tsx"]) {
      const contract = path.join(current, candidate);
      if (fs.existsSync(contract) && marker.test(fs.readFileSync(contract, "utf8"))) {
        return surface.anatomy;
      }
    }
    if (current === root) break;
    current = path.dirname(current);
  }
  return null;
}

const routes = [];
const findings = {};

function record(category, file, count) {
  if (count <= 0) return;
  findings[category] ??= {};
  findings[category][file] = count;
}

for (const surface of surfaces) {
  const root = path.join(estateRoot, surface.repo);
  const files = walk(root);
  for (const file of files) {
    const fileRelativeToRepo = path.relative(root, file);
    if (!surface.route.test(fileRelativeToRepo)) continue;
    const content = fs.readFileSync(file, "utf8");
    const routeFile = relative(file);
    const rootAnatomy = nearestRootContract(file, root, surface);
    const classification = classifyRoute(surface, routeFile);
    const stateCount = sixStates.filter((state) => content.includes(state)).length;
    const rawTables = countMatches(content, /<table(?:\s|>)/g);
    const inlineStyles = countMatches(content, /style\s*=\s*\{\{/g);
    const tokenLiterals = countMatches(
      content,
      /#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?px\b/g,
    );
    const sharedUi = /@kannan19302\/ui|tokens\.g\.dart|package:unerp_mobile/.test(content);
    const responsive = /@media|useMedia|breakpoint|LayoutBuilder|MediaQuery|\.module\.css/.test(content);
    const accessibility = /aria-|role=|<main|<nav|<header|Semantics\(/.test(content);

    routes.push({
      surface: surface.repo,
      file: routeFile,
      anatomy: surface.anatomy,
      floorplan: classification.floorplan,
      defaultDensity: classification.defaultDensity,
      classificationRule: classification.classificationRule,
      classificationState: "proposed",
      rootAnatomy,
      sharedUi,
      stateCount,
      rawTables,
      inlineStyles,
      tokenLiterals,
      responsive,
      accessibility,
    });
    record("rawTable", routeFile, rawTables);
    record("inlineStyle", routeFile, inlineStyles);
    record("tokenLiteral", routeFile, tokenLiterals);
    record("missingStates", routeFile, stateCount < sixStates.length ? sixStates.length - stateCount : 0);
    if (!rootAnatomy) record("missingRootContract", routeFile, 1);
  }

  for (const file of files) {
    const name = path.basename(file).toLowerCase();
    if (!/(?:^|-|_)shell\.(?:tsx|ts|dart)$/.test(name)) continue;
    if (approvedShellFiles.has(name)) continue;
    record("unregisteredShell", relative(file), 1);
  }
}

routes.sort((a, b) => a.file.localeCompare(b.file));
const inventory = {
  schemaVersion: 2,
  generatedBy: "pnpm ui:audit",
  sourceScope: "registered UI routes in scripts/ci/ui-audit.mjs",
  routeCount: routes.length,
  surfaces: Object.fromEntries(
    surfaces.map(({ repo, anatomy }) => [
      repo,
      { anatomy, routes: routes.filter((route) => route.surface === repo).length },
    ]),
  ),
  classification: {
    state: "proposed",
    floorplans: Object.fromEntries(
      [...new Set(routes.map((route) => route.floorplan))]
        .sort()
        .map((floorplan) => [floorplan, routes.filter((route) => route.floorplan === floorplan).length]),
    ),
    densities: Object.fromEntries(
      [...new Set(routes.map((route) => route.defaultDensity))]
        .sort()
        .map((density) => [density, routes.filter((route) => route.defaultDensity === density).length]),
    ),
  },
  routes,
};
const serializedInventory = `${JSON.stringify(inventory, null, 2)}\n`;
if (checkInventory) {
  if (!fs.existsSync(inventoryPath)) {
    console.error(`UI route inventory missing: ${inventoryPath}`);
    process.exit(1);
  }
  if (fs.readFileSync(inventoryPath, "utf8") !== serializedInventory) {
    console.error("UI route inventory is stale. Run pnpm ui:audit and review the generated classification.");
    process.exit(1);
  }
} else {
  fs.writeFileSync(inventoryPath, serializedInventory, "utf8");
}

if (updateBaseline) {
  fs.writeFileSync(
    baselinePath,
    `${JSON.stringify({ version: 1, findings }, null, 2)}\n`,
    "utf8",
  );
  console.log(`UI audit baseline updated: ${baselinePath}`);
  console.log(`UI route inventory emitted: ${routes.length} active routes across ${surfaces.length} surfaces`);
  process.exit(0);
}

if (!fs.existsSync(baselinePath)) {
  console.error(`UI audit baseline missing: ${baselinePath}`);
  console.error("Review current findings, then run pnpm ui:audit -- --update-baseline once.");
  process.exit(1);
}

const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
const regressions = [];
for (const [category, files] of Object.entries(findings)) {
  for (const [file, count] of Object.entries(files)) {
    const allowed = baseline.findings?.[category]?.[file] ?? 0;
    if (count > allowed) regressions.push(`${category}: ${file} (${count} > ${allowed})`);
  }
}

console.log(`UI route inventory emitted: ${routes.length} active routes across ${surfaces.length} surfaces`);
for (const [surface, summary] of Object.entries(inventory.surfaces)) {
  console.log(`  ${surface}: ${summary.routes} route(s) → ${summary.anatomy}`);
}

if (regressions.length > 0) {
  console.error(`UI audit failed with ${regressions.length} regression(s):`);
  for (const regression of regressions.slice(0, 50)) console.error(`  ${regression}`);
  if (regressions.length > 50) console.error(`  … ${regressions.length - 50} more`);
  process.exit(1);
}

console.log("UI audit passed: every active route resolves an approved root anatomy; no shell, state, table, token, or styling regression.");
