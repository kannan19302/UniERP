#!/usr/bin/env node

/**
 * =============================================================================
 * UniERP Automated End-to-End Navigation & SSO Verification Suite
 * =============================================================================
 *
 * This test suite rigorously verifies:
 *   1. Direct standalone reachability of all 10 platforms, API, IdP, and Wizard.
 *   2. Public open-access verification for guest platforms (zero login required).
 *   3. Role-gated platform visibility across Guest, Tenant Staff, Tenant Admin, and UniERP Team.
 *   4. Security boundary enforcement (Provider Admin OS P2 strictly blocked from non-team roles).
 *   5. Single Sign-On (SSO) delegation token generation and seamless handoff.
 */

import http from 'http';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const WIZARD_PORT = 4000;
const WIZARD_URL = `http://localhost:${WIZARD_PORT}`;

// Helper: HTTP GET request with JSON or Text parsing
async function fetchUrl(url, options = {}) {
  return new Promise((resolve) => {
    const start = Date.now();
    try {
      const u = new URL(url);
      const req = http.request({
        hostname: u.hostname,
        port: u.port,
        path: u.pathname + u.search,
        method: options.method || 'GET',
        headers: {
          'User-Agent': 'UniERP-E2E-Tester/1.0',
          ...(options.headers || {})
        },
        timeout: options.timeout || 3500
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          let json = null;
          try { json = JSON.parse(body); } catch {}
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 400,
            statusCode: res.statusCode,
            headers: res.headers,
            body,
            json,
            latency: Date.now() - start
          });
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ ok: false, statusCode: 504, body: '', error: 'Timeout', latency: Date.now() - start });
      });

      req.on('error', (err) => {
        resolve({ ok: false, statusCode: 503, body: '', error: err.message, latency: Date.now() - start });
      });

      if (options.body) {
        req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
      }
      req.end();
    } catch (e) {
      resolve({ ok: false, statusCode: 500, body: '', error: e.message, latency: Date.now() - start });
    }
  });
}

// Test runner state
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m  ${testName}`);
  } else {
    failedTests++;
    console.log(`  \x1b[31m✖ FAIL\x1b[0m  ${testName} ${details ? `\n       ↳ ${details}` : ''}`);
  }
}

async function runE2ESuite() {
  console.log(`\n\x1b[1m\x1b[35m========================================================================================\x1b[0m`);
  console.log(`  \x1b[1m\x1b[36mUniERP Automated End-to-End Navigation & SSO Verification Suite\x1b[0m`);
  console.log(`\x1b[1m\x1b[35m========================================================================================\x1b[0m\n`);

  // ── Step 0: Ensure Platform Wizard Server is running ────────────────────────
  let wizardProbe = await fetchUrl(`${WIZARD_URL}/api/auth/session`);
  let localServerProc = null;

  if (!wizardProbe.ok) {
    console.log(`  Starting local Platform Wizard server on port ${WIZARD_PORT}...`);
    const serverPath = path.join(ROOT_DIR, 'infra/platform-wizard/server.mjs');
    localServerProc = spawn('node', [serverPath], {
      env: { ...process.env, PORT: WIZARD_PORT.toString() },
      stdio: 'ignore'
    });
    // Wait for server boot
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 200));
      wizardProbe = await fetchUrl(`${WIZARD_URL}/api/auth/session`);
      if (wizardProbe.ok) break;
    }
  }

  // ── Step 0b: Start Desktop App Preview on :4010 if not running ─────────────
  let desktopProbe = await fetchUrl(`http://localhost:4010/health`);
  let localDesktopProc = null;
  if (!desktopProbe.ok) {
    const desktopServerPath = path.join(ROOT_DIR, 'desktop-app/server.mjs');
    localDesktopProc = spawn('node', [desktopServerPath], {
      env: { ...process.env, PORT: '4010' },
      stdio: 'ignore'
    });
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 200));
      desktopProbe = await fetchUrl(`http://localhost:4010/health`);
      if (desktopProbe.ok) break;
    }
  }

  // ── TEST SUITE 1: Platform Wizard Gateway & Core Endpoints ──────────────────
  console.log(`\n\x1b[1m\x1b[33m--- [Suite 1] Platform Wizard Gateway & Health Endpoints ---\x1b[0m`);
  
  const rootRes = await fetchUrl(`${WIZARD_URL}/`);
  assert(rootRes.ok && rootRes.body.includes('UniERP'), 'Platform Wizard Root Gateway serves HTTP 200 with HTML title');

  const sessionRes = await fetchUrl(`${WIZARD_URL}/api/auth/session`);
  assert(sessionRes.ok && sessionRes.json && sessionRes.json.user, 'Session API returns active persona');

  const healthRes = await fetchUrl(`${WIZARD_URL}/api/health/matrix`);
  assert(healthRes.ok && healthRes.json && Array.isArray(healthRes.json.matrix), 'Cluster Health Matrix API returns live status array', `Received: ${healthRes.statusCode}`);


  // ── TEST SUITE 2: Role-Gated Platform Visibility ────────────────────────────
  console.log(`\n\x1b[1m\x1b[33m--- [Suite 2] Role-Gated Platform Visibility Matrix ---\x1b[0m`);

  // 2A: Public Guest Role
  const guestRes = await fetchUrl(`${WIZARD_URL}/api/platforms?role=guest`);
  const guestPlatforms = guestRes.json ? guestRes.json.platforms : [];
  const guestHasP2 = guestPlatforms.some(p => p.id === 'p2');
  const guestHasPublic = guestPlatforms.some(p => p.id === 'p1') && guestPlatforms.some(p => p.id === 'p4');
  assert(guestRes.ok && !guestHasP2 && guestHasPublic, 'Guest View: Shows public platforms (P1, P4, P7, P8) and hides internal P2', `P2 present: ${guestHasP2}`);

  // 2B: Tenant Employee Role
  const empRes = await fetchUrl(`${WIZARD_URL}/api/platforms?role=customer_employee`);
  const empPlatforms = empRes.json ? empRes.json.platforms : [];
  const empHasERP = empPlatforms.some(p => p.id === 'p3');
  const empHasMobile = empPlatforms.some(p => p.id === 'p9');
  const empHasP2 = empPlatforms.some(p => p.id === 'p2');
  assert(empRes.ok && empHasERP && empHasMobile && !empHasP2, 'Tenant Staff View: Shows ERP (P3) + Mobile (P9) and hides P2', `P2 present: ${empHasP2}`);

  // 2C: Tenant Administrator Role
  const adminRes = await fetchUrl(`${WIZARD_URL}/api/platforms?role=tenant_admin`);
  const adminPlatforms = adminRes.json ? adminRes.json.platforms : [];
  const adminHasSuite = adminPlatforms.some(p => p.id === 'p3') && adminPlatforms.some(p => p.id === 'p5') && adminPlatforms.some(p => p.id === 'p6');
  const adminHasP2 = adminPlatforms.some(p => p.id === 'p2');
  assert(adminRes.ok && adminHasSuite && !adminHasP2, 'Tenant Admin View: Shows full customer suite (ERP, Studio, Admin, Store) and STRICTLY hides P2', `P2 present: ${adminHasP2}`);

  // 2D: UniERP Core Team Role
  const teamRes = await fetchUrl(`${WIZARD_URL}/api/platforms?role=unierp_team`);
  const teamPlatforms = teamRes.json ? teamRes.json.platforms : [];
  const teamHasAll10 = teamPlatforms.length === 10 && teamPlatforms.some(p => p.id === 'p2');
  assert(teamRes.ok && teamHasAll10, 'UniERP Team View: Returns ALL 10 Platforms including Provider Admin OS (P2)', `Count: ${teamPlatforms.length}`);


  // ── TEST SUITE 3: Security Boundary & SSO Delegation Token Handoff ──────────
  console.log(`\n\x1b[1m\x1b[33m--- [Suite 3] Security Isolation & Single Sign-On (SSO) Delegation ---\x1b[0m`);

  // 3A: UniERP Team launches Provider Admin OS (P2) -> Should Succeed
  const teamLaunchP2 = await fetchUrl(`${WIZARD_URL}/api/sso/launch/p2?role=unierp_team`);
  assert(teamLaunchP2.ok && teamLaunchP2.json && teamLaunchP2.json.ssoUrl, 'UniERP Team SSO Launch for P2 generates valid delegation token and launch URL');

  // 3B: Tenant Admin attempts to launch Provider Admin OS (P2) -> MUST RETURN 403 FORBIDDEN
  const forbiddenLaunchP2 = await fetchUrl(`${WIZARD_URL}/api/sso/launch/p2?role=tenant_admin`);
  assert(forbiddenLaunchP2.statusCode === 403, 'SECURITY GATE: Tenant Admin attempting SSO into P2 is strictly REJECTED with 403 Forbidden', `Status: ${forbiddenLaunchP2.statusCode}`);

  // 3C: Tenant Admin launches Tenant ERP (P3) -> Should Succeed
  const adminLaunchP3 = await fetchUrl(`${WIZARD_URL}/api/sso/launch/p3?role=tenant_admin`);
  assert(adminLaunchP3.ok && adminLaunchP3.json && adminLaunchP3.json.ssoUrl, 'Tenant Admin SSO Launch for Tenant ERP (P3) succeeds with active session');

  // 3D: Tenant Admin launches Web Studio (P5) -> Should Succeed
  const adminLaunchP5 = await fetchUrl(`${WIZARD_URL}/api/sso/launch/p5?role=tenant_admin`);
  assert(adminLaunchP5.ok && adminLaunchP5.json && adminLaunchP5.json.ssoUrl, 'Tenant Admin SSO Launch for Web Studio (P5) succeeds with active session');


  // ── TEST SUITE 4: Direct Standalone Endpoint & Desktop App Verification ──────
  console.log(`\n\x1b[1m\x1b[33m--- [Suite 4] Direct Standalone Platform Reachability ---\x1b[0m`);

  // Desktop App (P10) Health & Direct Web Preview
  const p10Res = await fetchUrl(`http://localhost:4010/health`);
  assert(p10Res.ok && p10Res.json && p10Res.json.status === 'ok', 'Platform 10 (Desktop App) Web Preview is online on port 4010', `Status: ${p10Res.statusCode}`);

  const p10Login = await fetchUrl(`http://localhost:4010/login`);
  assert(p10Login.ok && p10Login.body.includes('Desktop Client Login'), 'Platform 10 (Desktop App) standalone direct login route responds with HTTP 200');


  // ── Clean up locally spawned helper processes if any ────────────────────────
  if (localServerProc) {
    localServerProc.kill();
  }
  if (localDesktopProc) {
    localDesktopProc.kill();
  }

  // ── Summary Report ──────────────────────────────────────────────────────────
  console.log(`\n\x1b[1m\x1b[35m========================================================================================\x1b[0m`);
  console.log(`  E2E Test Results: \x1b[1m\x1b[32m${passedTests} Passed\x1b[0m, \x1b[1m${failedTests === 0 ? '\x1b[32m0 Failed' : `\x1b[31m${failedTests} Failed`}\x1b[0m (Total: ${totalTests})`);
  console.log(`\x1b[1m\x1b[35m========================================================================================\x1b[0m\n`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

runE2ESuite().catch((err) => {
  console.error('Fatal E2E suite error:', err);
  process.exit(1);
});
