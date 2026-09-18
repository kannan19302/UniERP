#!/usr/bin/env node

/**
 * =============================================================================
 * UniERP Platform & Docker Manager CLI
 * =============================================================================
 *
 * Usage:
 *   node scripts/platform-manager.mjs status
 *   node scripts/platform-manager.mjs validate
 *   node scripts/platform-manager.mjs start [--profile full|customer|core|l4|l5|wizard]
 *   node scripts/platform-manager.mjs stop
 *   node scripts/platform-manager.mjs test
 *   node scripts/platform-manager.mjs open
 */

import { execSync, spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WORKSPACE_DIR = path.resolve(__dirname, '..');
const ROOT_DIR = path.resolve(WORKSPACE_DIR, '..');
const INFRA_DIR = path.resolve(ROOT_DIR, 'infra');

const PLATFORMS = [
  { id: 'platform-wizard', code: 'WIZARD', name: 'Master SSO Platform Wizard', port: 4000, repo: 'infra/platform-wizard', layer: 'Gateway', public: true },
  { id: 'marketing-site', code: 'P1', name: 'Marketing Site', port: 4001, repo: 'marketing-site', layer: 'L4 Presentation', public: true },
  { id: 'provider-admin-os', code: 'P2', name: 'Provider Control Center (PCC)', port: 4002, repo: 'provider-admin-os', layer: 'L4 Presentation', public: false, internal: true },
  { id: 'tenant-apps', code: 'P3', name: 'Tenant Apps / ERP', port: 4003, repo: 'tenant-apps', layer: 'L4 Presentation', public: false },
  { id: 'tenant-sites', code: 'P4', name: 'Tenant Websites', port: 4004, repo: 'tenant-sites', layer: 'L4 Presentation', public: true },
  { id: 'web-studio', code: 'P5', name: 'Web Studio', port: 4005, repo: 'web-studio', layer: 'L4 Presentation', public: false },
  { id: 'tenant-admin', code: 'P6', name: 'Organization Control Center (OCC)', port: 4006, repo: 'tenant-admin', layer: 'L4 Presentation', public: false },
  { id: 'marketplace', code: 'P7', name: 'Marketplace', port: 4007, repo: 'marketplace', layer: 'L4 Presentation', public: true },
  { id: 'developer-platform', code: 'P8', name: 'Developer Platform', port: 4008, repo: 'developer-platform', layer: 'L4 Presentation', public: true },
  { id: 'unierp-mobile', code: 'P9', name: 'Mobile App (Flutter)', port: 4009, repo: 'unierp-mobile', layer: 'L5 Client', public: false },
  { id: 'desktop-app', code: 'P10', name: 'Desktop App Preview', port: 4010, repo: 'desktop-app', layer: 'L5 Client', public: false },
  { id: 'api', code: 'API', name: 'API Backend Monolith', port: 3001, repo: 'api', layer: 'L3 Service', public: false },
  { id: 'idp', code: 'IDP', name: 'Identity Provider (IdP)', port: 3005, repo: 'idp', layer: 'L3 Service', public: false },
  { id: 'storybook', code: 'SB', name: 'Design System Storybook', port: 6006, repo: 'storybook', layer: 'Support', public: true }
];

async function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port,
      path: '/',
      method: 'GET',
      timeout: 1500
    }, (res) => {
      res.resume();
      resolve({ online: true, code: res.statusCode });
    });
    req.on('timeout', () => { req.destroy(); resolve({ online: false }); });
    req.on('error', () => { resolve({ online: false }); });
    req.end();
  });
}

function printHeader(title) {
  console.log(`\n\x1b[1m\x1b[35m========================================================================================\x1b[0m`);
  console.log(`  \x1b[1m\x1b[36mUniERP Platform Manager\x1b[0m — ${title}`);
  console.log(`\x1b[1m\x1b[35m========================================================================================\x1b[0m\n`);
}

async function handleStatus() {
  printHeader('Cluster & Platform Health Status');
  console.log(`┌─────────┬───────────────────────────────┬───────┬──────────────────────┬─────────────┬───────────┐`);
  console.log(`│ Code    │ Platform / Service Name       │ Port  │ Layer                │ Access      │ Status    │`);
  console.log(`├─────────┼───────────────────────────────┼───────┼──────────────────────┼─────────────┼───────────┤`);

  let onlineCount = 0;
  for (const p of PLATFORMS) {
    const res = await checkPort(p.port);
    if (res.online) onlineCount++;
    const code = p.code.padEnd(7);
    const name = p.name.slice(0, 29).padEnd(29);
    const port = (`:${p.port}`).padEnd(5);
    const layer = p.layer.slice(0, 20).padEnd(20);
    const access = (p.internal ? '🔒 Internal' : (p.public ? '🌐 Public' : '🔑 Auth')).padEnd(11);
    const status = res.online ? '\x1b[32m● ONLINE\x1b[0m   ' : '\x1b[90m○ OFFLINE\x1b[0m  ';

    console.log(`│ ${code} │ ${name} │ ${port} │ ${layer} │ ${access} │ ${status} │`);
  }
  console.log(`└─────────┴───────────────────────────────┴───────┴──────────────────────┴─────────────┴───────────┘`);
  console.log(`\n  Total Platforms Online: \x1b[1m\x1b[32m${onlineCount} / ${PLATFORMS.length}\x1b[0m`);
  console.log(`  Master SSO Gateway:    \x1b[36mhttp://localhost:4000\x1b[0m\n`);
}

function handleValidate() {
  printHeader('Validating Dockerfiles, Compose & Repo Alignments');
  let errors = 0;

  for (const p of PLATFORMS) {
    const repoPath = path.join(ROOT_DIR, p.repo);
    const exists = fs.existsSync(repoPath);
    let hasDockerfile = false;

    if (exists) {
      hasDockerfile = fs.existsSync(path.join(repoPath, 'Dockerfile')) ||
                      fs.existsSync(path.join(repoPath, 'Dockerfile.flutter')) ||
                      fs.existsSync(path.join(ROOT_DIR, 'infra/docker/Dockerfile.flutter'));
    }

    const check = exists && hasDockerfile ? '\x1b[32m[OK]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m';
    console.log(`  ${check} ${p.code.padEnd(8)} ${p.name.padEnd(30)} Container: \x1b[33m${p.id.padEnd(20)}\x1b[0m Port: :${p.port}`);

    if (!exists || !hasDockerfile) {
      errors++;
      console.log(`       ↳ Missing repo or Dockerfile at ${repoPath}`);
    }
  }

  // Check compose files
  const devCompose = path.join(INFRA_DIR, 'docker-compose.dev.yml');
  const platformCompose = path.join(INFRA_DIR, 'docker-compose.platform.yml');
  const masterCompose = path.join(INFRA_DIR, 'docker-compose.yml');

  console.log(`\n  Compose Configurations:`);
  console.log(`  ${fs.existsSync(devCompose) ? '\x1b[32m[OK]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m'} infra/docker-compose.dev.yml (Datastores)`);
  console.log(`  ${fs.existsSync(platformCompose) ? '\x1b[32m[OK]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m'} infra/docker-compose.platform.yml (Platforms & Services)`);
  console.log(`  ${fs.existsSync(masterCompose) ? '\x1b[32m[OK]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m'} infra/docker-compose.yml (Master Include)`);

  if (errors === 0) {
    console.log(`\n\x1b[32m✔ Validation Complete: All 14 repository container targets are properly configured.\x1b[0m\n`);
  } else {
    console.log(`\n\x1b[31m✖ Validation Failed with ${errors} errors.\x1b[0m\n`);
    process.exit(1);
  }
}

function handleStart(profile = 'full') {
  printHeader(`Starting UniERP Stack (Profile: ${profile})`);
  const cmd = `docker compose -f infra/docker-compose.dev.yml -f infra/docker-compose.platform.yml --profile ${profile} up -d`;
  console.log(`Executing: \x1b[36m${cmd}\x1b[0m in ${ROOT_DIR}\n`);

  try {
    execSync(cmd, { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log(`\n\x1b[32m✔ Stack launched. Open http://localhost:4003/home to access the UniERP Enterprise Workspace.\x1b[0m\n`);
  } catch (err) {
    console.error(`\x1b[31mError launching docker compose:\x1b[0m ${err.message}`);
    console.log(`\nTip: Ensure Docker Desktop is running, or start individual services with npm run dev in their repos.\n`);
  }
}

function handleStop() {
  printHeader('Stopping UniERP Stack');
  const cmd = `docker compose -f infra/docker-compose.dev.yml -f infra/docker-compose.platform.yml down`;
  console.log(`Executing: \x1b[36m${cmd}\x1b[0m\n`);

  try {
    execSync(cmd, { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log(`\n\x1b[32m✔ All containers stopped.\x1b[0m\n`);
  } catch (err) {
    console.error(`\x1b[31mError stopping docker compose:\x1b[0m ${err.message}`);
  }
}

function handleTest() {
  printHeader('Executing Automated E2E Navigation & SSO Tests');
  const testScript = path.join(__dirname, 'test-e2e-platforms.mjs');
  try {
    execSync(`node "${testScript}"`, { cwd: WORKSPACE_DIR, stdio: 'inherit' });
  } catch (err) {
    process.exit(err.status || 1);
  }
}

function handleOpen() {
  const url = 'http://localhost:4003/home';
  console.log(`Opening UniERP Enterprise Home Workspace: \x1b[36m${url}\x1b[0m`);
  const startCmd = process.platform === 'win32' ? `start ${url}` : (process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`);
  execSync(startCmd);
}

// ── CLI Dispatcher ───────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const command = args[0] || 'status';

switch (command) {
  case 'status':
    await handleStatus();
    break;
  case 'validate':
    handleValidate();
    break;
  case 'start':
    const profileArgIndex = args.indexOf('--profile');
    const profile = profileArgIndex !== -1 && args[profileArgIndex + 1] ? args[profileArgIndex + 1] : 'full';
    handleStart(profile);
    break;
  case 'stop':
    handleStop();
    break;
  case 'test':
    handleTest();
    break;
  case 'open':
    handleOpen();
    break;
  default:
    console.log(`Unknown command: ${command}`);
    console.log(`Available commands: status, validate, start [--profile full|customer|core|l4|l5|wizard], stop, test, open`);
    process.exit(1);
}
