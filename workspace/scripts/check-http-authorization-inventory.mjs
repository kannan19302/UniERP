#!/usr/bin/env node
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { assertNonEmptyDiscovery, loadActiveEstate, requiredSourceDirectory } from "./lib/estate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const DEFAULT_ROOT = resolve(dirname(SCRIPT_PATH), "..", "..");
const ROUTE = /^\s*@(Get|Post|Put|Patch|Delete|Options|Head)\s*\(/;
const METHOD = /^\s{2,}(?:async\s+)?[A-Za-z_$][\w$]*\s*\(/;
const AUTHORIZATION_BOUNDARY = /@AuthorizationBoundary\s*\(\s*["']([a-z-]+)["']\s*\)/;

function listTypeScriptFiles(directory) {
  const files = [];
  const stack = [directory];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (["node_modules", "dist", "coverage", ".next"].includes(entry.name)) continue;
      const target = join(current, entry.name);
      if (entry.isDirectory()) stack.push(target);
      else if (entry.isFile() && entry.name.endsWith(".controller.ts") && !entry.name.includes(".spec.")) files.push(target);
    }
  }
  return files;
}

function decoratorWindow(lines, index) {
  let previousMethod = index - 1;
  while (previousMethod >= 0 && !METHOD.test(lines[previousMethod])) previousMethod -= 1;
  const before = lines.slice(previousMethod + 1, index);
  const after = [];
  for (let cursor = index + 1; cursor < lines.length && cursor < index + 28; cursor += 1) {
    after.push(lines[cursor]);
    if (METHOD.test(lines[cursor])) break;
  }
  return [...before, lines[index], ...after].join("\n");
}

function controllerMetadataForRoute(source, routeOffset) {
  const classDeclarationIndex = source.lastIndexOf("export class", routeOffset);
  if (classDeclarationIndex === -1) return "";
  const controllerIndex = source.lastIndexOf("@Controller", classDeclarationIndex);
  if (controllerIndex === -1) return "";
  const paragraphStart = Math.max(
    source.lastIndexOf("\n\n", controllerIndex),
    source.lastIndexOf("\r\n\r\n", controllerIndex),
  );
  return source.slice(paragraphStart + 2, classDeclarationIndex);
}

export function inspectAuthorizationSources(root = DEFAULT_ROOT) {
  const estate = loadActiveEstate({ workspaceRoot: root });
  const targets = [
    { repository: "api", source: requiredSourceDirectory(estate, "api", "src") },
    { repository: "idp", source: requiredSourceDirectory(estate, "idp", "src") },
  ];
  const routes = [];
  for (const target of targets) {
    const files = listTypeScriptFiles(target.source);
    assertNonEmptyDiscovery(`${target.repository} controller sources`, files);
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      const lines = source.split(/\r?\n/);
      let routeOffset = 0;
      for (let index = 0; index < lines.length; index += 1) {
        if (!ROUTE.test(lines[index])) {
          const nextLine = source.indexOf("\n", routeOffset);
          routeOffset = nextLine === -1 ? source.length : nextLine + 1;
          continue;
        }
        const controllerMetadata = controllerMetadataForRoute(source, routeOffset);
        const classPublic = /@Public\s*\(/.test(controllerMetadata);
        const classPermissions = /@Permissions\s*\(/.test(controllerMetadata);
        const authorizationBoundary = controllerMetadata.match(AUTHORIZATION_BOUNDARY)?.[1] ?? "tenant-staff";
        const classRbacGuard = /@UseGuards\([^)]*RbacGuard/.test(controllerMetadata);
        const classCustomerPortalGuard = /@UseGuards\([^)]*CustomerPortalAuthGuard/.test(controllerMetadata);
        const classJwtGuard = /@UseGuards\([^)]*JwtAuthGuard/.test(controllerMetadata);
        const window = decoratorWindow(lines, index);
        const isPublic = classPublic || /@Public\s*\(/.test(window);
        const hasPermissions = classPermissions || /@Permissions\s*\(/.test(window);
        const hasSessionGuard = classJwtGuard || /@UseGuards\([^)]*JwtAuthGuard/.test(window);
        const hasRbacGuard = classRbacGuard || /@UseGuards\([^)]*RbacGuard/.test(window);
        const hasCustomerPortalGuard = classCustomerPortalGuard || /@UseGuards\([^)]*CustomerPortalAuthGuard/.test(window);
        const hasEnforcingGuard = authorizationBoundary === "customer-portal" ? hasCustomerPortalGuard : hasRbacGuard;
        routes.push({
          repository: target.repository,
          file: relative(root, file).replace(/\\/g, "/"),
          line: index + 1,
          route: lines[index].trim(),
          classification: isPublic ? "public" : hasPermissions ? "permission" : hasSessionGuard ? "session" : "missing",
          authorizationBoundary,
          hasEnforcingGuard,
        });
        const nextLine = source.indexOf("\n", routeOffset);
        routeOffset = nextLine === -1 ? source.length : nextLine + 1;
      }
    }
  }
  assertNonEmptyDiscovery("HTTP routes", routes);
  return routes;
}

export function evaluateAuthorizationRoutes(routes) {
  return routes.flatMap((route) => {
    const location = `${route.file}:${route.line}`;
    if (route.classification === "missing") return [`${location} ${route.route} has no @Public(reason) or @Permissions(...) declaration`];
    if (route.classification === "permission" && !route.hasEnforcingGuard) {
      return [`${location} ${route.route} declares @Permissions for ${route.authorizationBoundary} but no matching enforcing guard is present in its controller source`];
    }
    return [];
  });
}

function createFixture(source) {
  const root = mkdtempSync(join(tmpdir(), "unierp-authz-"));
  for (const repository of ["api", "idp"]) {
    mkdirSync(join(root, repository, "src"), { recursive: true });
    writeFileSync(join(root, repository, "src", `${repository}.controller.ts`), source[repository]);
  }
  writeFileSync(join(root, "UniERP.code-workspace"), JSON.stringify({ folders: [{ path: "api" }, { path: "idp" }] }));
  return root;
}

function test() {
  const good = createFixture({
    api: ' @AuthorizationBoundary("tenant-staff")\n @UseGuards(JwtAuthGuard, RbacGuard)\n@Controller("x")\nexport class Api {\n  @Permissions("x.read")\n  @Get()\n  async list() {}\n}',
    idp: '@Controller("x")\nexport class Idp {\n  @Public("OIDC discovery")\n  @Get()\n  async discovery() {}\n}\n@Controller("session")\nexport class Session {\n  @UseGuards(JwtAuthGuard)\n  @Get()\n  async me() {}\n}',
  });
  const bad = createFixture({
    api: '@Controller("x")\nexport class Api {\n  @Get()\n  async list() {}\n}',
    idp: '@UseGuards(JwtAuthGuard)\n@Controller("x")\nexport class Idp {\n  @Permissions("x.read")\n  @Get()\n  async read() {}\n}',
  });
  try {
    if (evaluateAuthorizationRoutes(inspectAuthorizationSources(good)).length) throw new Error("classified fixture failed");
    if (evaluateAuthorizationRoutes(inspectAuthorizationSources(bad)).length !== 2) throw new Error("unclassified or unguarded fixture escaped detection");
  } finally {
    rmSync(good, { recursive: true, force: true });
    rmSync(bad, { recursive: true, force: true });
  }
  console.log("HTTP authorization inventory adversarial tests passed.");
}

if (process.argv.includes("--test")) test();
else {
  const routes = inspectAuthorizationSources();
  const violations = evaluateAuthorizationRoutes(routes);
  const report = process.argv.includes("--report");
  console.log(`HTTP authorization inventory: ${routes.length} routes across api and idp; ${violations.length} blocking declaration/enforcement gap(s).`);
  if (report || violations.length) for (const violation of violations) console.error(`  - ${violation}`);
  if (violations.length) process.exit(1);
}
