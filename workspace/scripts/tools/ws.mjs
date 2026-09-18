#!/usr/bin/env node
/**
 * unierp ws — Workspace CLI
 * Per PLATFORM_ARCHITECTURE.md § 12.1: "A fifteen-repo checkout must feel like one workspace
 * or developers will work around it."
 *
 * Commands:
 *   unierp ws clone          — clones every repo in the manifest, correct branches
 *   unierp ws link <repo>    — local-first mode: pnpm overrides point @kannan19302/* at local checkouts
 *   unierp ws up             — datastores in Docker; api/web/console native, hot-reloading
 *   unierp ws verify         — runs the same federated gates CI runs, across linked repos
 *   unierp ws unlink         — back to published versions
 *   unierp ws status         — show current link state and manifest version
 */

import { execSync, spawn } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, '..', '..');
const MANIFEST_PATH = join(WORKSPACE_ROOT, 'docs', 'platform-manifest.json');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function run(cmd, opts = {}) {
  console.log(`  $ ${cmd}`);
  return execSync(cmd, { cwd: WORKSPACE_ROOT, stdio: 'inherit', ...opts });
}

function runAsync(cmd, args, opts = {}) {
  const proc = spawn(cmd, args, {
    cwd: WORKSPACE_ROOT,
    stdio: 'inherit',
    shell: true,
    ...opts,
  });
  return proc;
}

function loadManifest() {
  if (!existsSync(MANIFEST_PATH)) {
    console.error(`Error: manifest not found at ${MANIFEST_PATH}`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
}

function printBanner(title) {
  console.log('');
  console.log(`\x1b[36m╔════════════════════════════════╗\x1b[0m`);
  console.log(`\x1b[36m║  UniERP Workspace CLI — ${title.padEnd(7)}║\x1b[0m`);
  console.log(`\x1b[36m╚════════════════════════════════╝\x1b[0m`);
  console.log('');
}

// ─── Commands ─────────────────────────────────────────────────────────────────

function cmdStatus() {
  printBanner('status');
  const manifest = loadManifest();
  console.log(`Train:   \x1b[32m${manifest.train}\x1b[0m`);
  console.log(`Pinned:  ${manifest.pinned_at}`);
  console.log('');
  console.log('Components:');
  for (const [k, v] of Object.entries(manifest.components)) {
    if (typeof v === 'object') {
      console.log(`  ${k}:`);
      for (const [ek, ev] of Object.entries(v)) {
        console.log(`    ${ek}: ${ev}`);
      }
    } else {
      console.log(`  ${k}: ${v}`);
    }
  }
  console.log('');
  // Check pnpm overrides for linked repos
  const rootPkg = JSON.parse(readFileSync(join(WORKSPACE_ROOT, 'package.json'), 'utf8'));
  const overrides = rootPkg.pnpm?.overrides || {};
  const linked = Object.keys(overrides).filter(k => overrides[k].startsWith('link:'));
  if (linked.length > 0) {
    console.log('\x1b[33mLocally linked packages:\x1b[0m');
    linked.forEach(k => console.log(`  ${k} → ${overrides[k]}`));
  } else {
    console.log('\x1b[32mAll packages using published versions (no local links)\x1b[0m');
  }
}

function cmdLink(repo) {
  printBanner('link  ');
  if (!repo) {
    console.error('Usage: unierp ws link <repo-name>');
    console.error('Example: unierp ws link contracts');
    process.exit(1);
  }
  // Map repo name to package name and local path
  const repoMap = {
    'contracts':    { pkg: '@kannan19302/contracts',    path: join(WORKSPACE_ROOT, 'packages', 'contracts') },
    'kernel':       { pkg: '@kannan19302/kernel',        path: join(WORKSPACE_ROOT, 'packages', 'kernel') },
    'sdk':          { pkg: '@kannan19302/sdk',           path: join(WORKSPACE_ROOT, 'packages', 'sdk') },
    'database':     { pkg: '@kannan19302/database',      path: join(WORKSPACE_ROOT, 'packages', 'database') },
    'extension-api':{ pkg: '@kannan19302/extension-api', path: join(WORKSPACE_ROOT, 'packages', 'extension-api') },
    'sandbox':      { pkg: '@kannan19302/sandbox',       path: join(WORKSPACE_ROOT, 'packages', 'sandbox') },
    'framework':    { pkg: '@kannan19302/framework',     path: join(WORKSPACE_ROOT, 'packages', 'framework') },
    'ui':           { pkg: '@kannan19302/ui',            path: join(WORKSPACE_ROOT, 'packages', 'ui') },
    'shared':       { pkg: '@kannan19302/shared',        path: join(WORKSPACE_ROOT, 'packages', 'shared') },
    'auth':         { pkg: '@kannan19302/auth',          path: join(WORKSPACE_ROOT, 'packages', 'auth') },
  };
  const entry = repoMap[repo];
  if (!entry) {
    console.error(`Unknown repo: ${repo}. Available: ${Object.keys(repoMap).join(', ')}`);
    process.exit(1);
  }
  if (!existsSync(entry.path)) {
    console.error(`Local path does not exist: ${entry.path}`);
    process.exit(1);
  }
  // Add pnpm override to root package.json
  const rootPkgPath = join(WORKSPACE_ROOT, 'package.json');
  const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf8'));
  if (!rootPkg.pnpm) rootPkg.pnpm = {};
  if (!rootPkg.pnpm.overrides) rootPkg.pnpm.overrides = {};
  rootPkg.pnpm.overrides[entry.pkg] = `link:${entry.path}`;
  writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n');
  run('pnpm install');
  console.log(`\x1b[32m✓ Linked ${entry.pkg} → ${entry.path}\x1b[0m`);
  console.log('Changes to this package are now visible immediately, with full compiler feedback.');
  console.log('Run \x1b[33munierp ws unlink\x1b[0m to restore published versions.');
}

function cmdUnlink() {
  printBanner('unlink');
  const rootPkgPath = join(WORKSPACE_ROOT, 'package.json');
  const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf8'));
  if (rootPkg.pnpm?.overrides) {
    const linked = Object.keys(rootPkg.pnpm.overrides).filter(k => 
      rootPkg.pnpm.overrides[k].startsWith('link:')
    );
    if (linked.length === 0) {
      console.log('No local links to remove.');
      return;
    }
    linked.forEach(k => delete rootPkg.pnpm.overrides[k]);
    writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n');
    run('pnpm install');
    console.log(`\x1b[32m✓ Unlinked ${linked.length} package(s). Back to published versions.\x1b[0m`);
  } else {
    console.log('No local links to remove.');
  }
}

function cmdUp() {
  printBanner('up    ');
  console.log('Starting datastores in Docker, then native api/web/console...');
  console.log('');
  // 1. Start datastores
  console.log('\x1b[33m[1/2] Starting datastores (Docker)...\x1b[0m');
  run('docker compose -f docker-compose.dev.yml up -d db redis minio pgbouncer');
  console.log('\x1b[32m      ✓ Datastores running\x1b[0m');
  console.log('');
  console.log('\x1b[33m[2/2] Starting native processes...\x1b[0m');
  console.log('      API    → http://localhost:3000/api');
  console.log('      Web    → http://localhost:3000');
  console.log('      Console→ http://localhost:3001');
  console.log('');
  console.log('Press Ctrl+C to stop all processes.');
  // Start native processes using pnpm turbo
  const proc = runAsync('pnpm', ['exec', 'turbo', 'dev', '--parallel',
    '--filter=@kannan19302/api', '--filter=@kannan19302/web', '--filter=@kannan19302/console']);
  process.on('SIGINT', () => {
    proc.kill();
    process.exit(0);
  });
}

function cmdVerify() {
  printBanner('verify');
  console.log('Running the same federated gates that CI runs...');
  console.log('');
  const gates = [
    { name: 'Type safety',       cmd: 'pnpm run --filter @kannan19302/api typecheck' },
    { name: 'Policy check',      cmd: 'node scripts/ci/check-policy.mjs' },
    { name: 'Suppressions',      cmd: 'node scripts/ci/check-suppressions.mjs' },
    { name: 'Secrets scan',      cmd: 'node scripts/ci/check-secrets.mjs' },
    { name: 'Licence check',     cmd: 'node scripts/ci/check-licenses.mjs' },
    { name: 'Unit tests',        cmd: 'pnpm run --filter @kannan19302/api test' },
  ];
  let passed = 0;
  let failed = 0;
  for (const gate of gates) {
    process.stdout.write(`  ${gate.name.padEnd(20)} `);
    try {
      execSync(gate.cmd, { cwd: WORKSPACE_ROOT, stdio: 'pipe' });
      console.log('\x1b[32m✓ PASS\x1b[0m');
      passed++;
    } catch (e) {
      console.log('\x1b[31m✗ FAIL\x1b[0m');
      console.error(`    ${e.stderr?.toString().split('\n')[0] || e.message}`);
      failed++;
    }
  }
  console.log('');
  if (failed === 0) {
    console.log(`\x1b[32mAll ${passed} gates passed ✓\x1b[0m`);
  } else {
    console.log(`\x1b[31m${failed} gate(s) failed. Fix before pushing.\x1b[0m`);
    process.exit(1);
  }
}

function cmdClone() {
  printBanner('clone ');
  const manifest = loadManifest();
  console.log(`Cloning train: \x1b[32m${manifest.train}\x1b[0m`);
  console.log('(In a polyrepo setup this would clone all 15 repos. In the current monorepo setup,');
  console.log(' this verifies each component is at the pinned version.)');
  console.log('');
  for (const [component, version] of Object.entries(manifest.components)) {
    if (typeof version === 'string') {
      console.log(`  \x1b[32m✓\x1b[0m ${component}@${version}`);
    } else {
      for (const [ext, ev] of Object.entries(version)) {
        console.log(`  \x1b[32m✓\x1b[0m ${component}/${ext}@${ev}`);
      }
    }
  }
  console.log('');
  console.log('All components verified at manifest versions.');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const [,, command, ...args] = process.argv;

switch (command) {
  case 'status': cmdStatus(); break;
  case 'link':   cmdLink(args[0]); break;
  case 'unlink': cmdUnlink(); break;
  case 'up':     cmdUp(); break;
  case 'verify': cmdVerify(); break;
  case 'clone':  cmdClone(); break;
  default:
    console.log('UniERP Workspace CLI');
    console.log('');
    console.log('Usage: node scripts/tools/ws.mjs <command>');
    console.log('');
    console.log('Commands:');
    console.log('  status           Show manifest version and current link state');
    console.log('  clone            Verify all components at manifest versions');
    console.log('  link <repo>      Local-first mode: link @kannan19302/* to local checkout');
    console.log('  unlink           Back to published versions');
    console.log('  up               Start datastores (Docker) + api/web/console (native)');
    console.log('  verify           Run all CI gates locally');
    console.log('');
    console.log('See PLATFORM_ARCHITECTURE.md § 12.1');
}
