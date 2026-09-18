#!/usr/bin/env node
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { assertNonEmptyDiscovery, loadActiveEstate, requiredSourceDirectory } from "./lib/estate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const DEFAULT_ROOT = resolve(dirname(SCRIPT_PATH), "..", "..");

const PROCESSOR_REGEX = /@Processor\s*\(\s*["']([^"']+)["']/;
const CRON_REGEX = /@Cron\s*\(/;
const WEBSOCKET_REGEX = /@WebSocketGateway\s*\(/;
const ON_EVENT_REGEX = /@OnEvent\s*\(\s*["']([^"']+)["']/;

function listTypeScriptFiles(directory) {
  const files = [];
  const stack = [directory];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (["node_modules", "dist", "coverage", ".next"].includes(entry.name)) continue;
      const target = join(current, entry.name);
      if (entry.isDirectory()) stack.push(target);
      else if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.includes(".spec.") && !entry.name.includes(".test.")) {
        files.push(target);
      }
    }
  }
  return files;
}

export function inspectNonHttpEntrypoints(root = DEFAULT_ROOT) {
  const estate = loadActiveEstate({ workspaceRoot: root });
  const targets = [
    { repository: "api", source: requiredSourceDirectory(estate, "api", "src") },
    { repository: "idp", source: requiredSourceDirectory(estate, "idp", "src") },
  ];

  const entrypoints = [];

  for (const target of targets) {
    const files = listTypeScriptFiles(target.source);
    assertNonEmptyDiscovery(`${target.repository} source files for non-HTTP entrypoints`, files);

    for (const file of files) {
      const source = readFileSync(file, "utf8");
      const lines = source.split(/\r?\n/);

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (PROCESSOR_REGEX.test(line)) {
          const queueName = line.match(PROCESSOR_REGEX)[1];
          const hasTenantScope = source.includes("tenantId") || source.includes("tenant_id");
          const isSystemQueue = ["outbox", "system"].includes(queueName) || source.includes('@AuthorizationBoundary("system")');
          entrypoints.push({
            type: "processor",
            repository: target.repository,
            file: relative(root, file).replace(/\\/g, "/"),
            line: i + 1,
            name: queueName,
            isSecured: hasTenantScope || isSystemQueue,
            reason: hasTenantScope ? "tenant-scoped" : isSystemQueue ? "system-queue" : "missing-tenant-scope",
          });
        }

        if (CRON_REGEX.test(line)) {
          const hasTenantScope = source.includes("runWithTenantSession") || (source.includes("findMany") && source.includes("tenant"));
          const isSystemCron = source.includes("Platform") || source.includes("System") || source.includes('@AuthorizationBoundary("system")');
          entrypoints.push({
            type: "cron",
            repository: target.repository,
            file: relative(root, file).replace(/\\/g, "/"),
            line: i + 1,
            name: lines[i + 1]?.trim() ?? "cron-job",
            isSecured: hasTenantScope || isSystemCron,
            reason: hasTenantScope ? "tenant-scoped" : isSystemCron ? "system-cron" : "missing-tenant-scope",
          });
        }

        if (WEBSOCKET_REGEX.test(line)) {
          const hasAuthGuard = /verifyToken|JwtAuthGuard|UseGuards/.test(source);
          entrypoints.push({
            type: "websocket",
            repository: target.repository,
            file: relative(root, file).replace(/\\/g, "/"),
            line: i + 1,
            name: "websocket-gateway",
            isSecured: hasAuthGuard,
            reason: hasAuthGuard ? "token-verified" : "missing-auth-verification",
          });
        }

        if (ON_EVENT_REGEX.test(line)) {
          const eventName = line.match(ON_EVENT_REGEX)[1];
          const hasTenantScope = source.includes("tenantId") || source.includes("tenant_id");
          const isSystemEvent = eventName.startsWith("system.") || eventName.startsWith("audit.") || source.includes('@AuthorizationBoundary("system")');
          entrypoints.push({
            type: "event-listener",
            repository: target.repository,
            file: relative(root, file).replace(/\\/g, "/"),
            line: i + 1,
            name: eventName,
            isSecured: hasTenantScope || isSystemEvent,
            reason: hasTenantScope ? "tenant-scoped" : isSystemEvent ? "system-event" : "missing-tenant-scope",
          });
        }
      }
    }
  }

  assertNonEmptyDiscovery("non-HTTP entrypoints", entrypoints);
  return entrypoints;
}

export function evaluateNonHttpEntrypoints(entrypoints) {
  const violations = [];
  for (const ep of entrypoints) {
    if (!ep.isSecured) {
      violations.push(`${ep.file}:${ep.line} [${ep.type}] ${ep.name} is not secured (${ep.reason})`);
    }
  }
  return violations;
}

function createFixture(code) {
  const root = mkdtempSync(join(tmpdir(), "unierp-nonhttp-"));
  for (const repo of ["api", "idp"]) {
    mkdirSync(join(root, repo, "src"), { recursive: true });
    writeFileSync(join(root, repo, "src", `${repo}.service.ts`), code[repo]);
  }
  writeFileSync(join(root, "UniERP.code-workspace"), JSON.stringify({ folders: [{ path: "api" }, { path: "idp" }] }));
  return root;
}

function test() {
  const good = createFixture({
    api: '@Processor("export")\nexport class ExportProcessor { async process(job) { const { tenantId } = job.data; } }\n@WebSocketGateway()\nexport class Gateway { handleConnection(c) { verifyToken(c); } }',
    idp: '@Processor("outbox")\nexport class OutboxProcessor {}',
  });
  const bad = createFixture({
    api: '@Processor("unscoped")\nexport class UnscopedProcessor { async process() {} }\n@WebSocketGateway()\nexport class UnsafeGateway { handleConnection() {} }',
    idp: '@Processor("outbox")\nexport class OutboxProcessor {}',
  });

  try {
    const goodFindings = evaluateNonHttpEntrypoints(inspectNonHttpEntrypoints(good));
    if (goodFindings.length !== 0) throw new Error(`Good fixture failed: ${goodFindings.join("; ")}`);
    const badFindings = evaluateNonHttpEntrypoints(inspectNonHttpEntrypoints(bad));
    if (badFindings.length !== 2) throw new Error(`Bad fixture did not detect expected 2 violations; found: ${badFindings.length}`);
  } finally {
    rmSync(good, { recursive: true, force: true });
    rmSync(bad, { recursive: true, force: true });
  }
  console.log("Non-HTTP entrypoint authorization adversarial tests passed.");
}

if (process.argv.includes("--test")) {
  test();
} else {
  const entrypoints = inspectNonHttpEntrypoints();
  const violations = evaluateNonHttpEntrypoints(entrypoints);
  const byType = entrypoints.reduce((acc, ep) => {
    acc[ep.type] = (acc[ep.type] || 0) + 1;
    return acc;
  }, {});

  console.log(`Non-HTTP authorization inventory: ${entrypoints.length} entrypoint(s) discovered across api and idp.`);
  for (const [type, count] of Object.entries(byType)) {
    console.log(`  - ${type}: ${count}`);
  }

  if (violations.length) {
    console.error(`\n${violations.length} blocking non-HTTP authorization violation(s):\n`);
    for (const v of violations) console.error(`  ❌ ${v}`);
    process.exit(1);
  } else {
    console.log(`\n✅ 0 blocking non-HTTP authorization gaps. All background processors, crons, websocket gateways, and event listeners are secured.`);
    process.exit(0);
  }
}
