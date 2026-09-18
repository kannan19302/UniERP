#!/usr/bin/env node
// Track A.13 — alert routing rehearsal. Phase A13, Stage 4 (release / deployment / hygiene).
//
// Fires a SYNTHETIC SLO error-budget breach through the routing table in
// alerting/alert-routing.json and PROVES it is DELIVERED to the configured webhook receiver.
// Times the delivery (time-to-detect) and LOGS the rehearsal in
// docs/runbooks/INCIDENT-RESPONSE.md under "## Rehearsal log". Fails loudly on any step:
// unknown SLO, no route, unreachable receiver, or an ack that does not match the fired alert.
//
// This is the mechanism behind "an alert route that has never delivered an alert is not a
// route" — the on-call proof that makes the claim a measurement, not a hope.
//
// Usage:
//   node scripts/rehearse-alert-routing.mjs --slo slo-login --severity critical
//                                          [--breach-pct 90] [--config <path>] [--no-log]
//
// The receiver URL in the routing config is the ground-truth destination. For a localhost URL
// the harness PROVISIONS the receiver (scripts/webhook-receiver.mjs) before delivering; for any
// other host it delivers to what must already be running — the same rule a production route
// depends on. Break it by pointing the route at a dead destination and this script exits 1.

import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const resolvePath = (p) => (path.isAbsolute(p) ? p : path.join(root, p));
const runbookPath = path.join(root, 'docs', 'runbooks', 'INCIDENT-RESPONSE.md');
const jsonlPath = path.join(root, 'var', 'alerting', 'rehearsal-log.jsonl');

const argv = process.argv.slice(2);
const argValue = (flag, fallback) => {
  const i = argv.indexOf(flag);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
};

const sloId = argValue('--slo', null);
const severity = argValue('--severity', null);
const breachPct = Number(argValue('--breach-pct', severity === 'critical' ? '90' : '50'));
const configFile = resolvePath(argValue('--config', 'alerting/alert-routing.json'));
const noLog = argv.includes('--no-log');
const startedAt = new Date();

const fail = (message) => {
  console.error(`\n✗ REHEARSAL FAILED — ${message}`);
  process.exit(1);
};

if (!sloId) fail('--slo <id> is required (e.g. slo-login)');
if (!['warning', 'critical'].includes(severity)) fail('--severity must be warning or critical');

// ── 1. Load the routing table.
let config;
try {
  config = JSON.parse(readFileSync(configFile, 'utf8'));
} catch (e) {
  fail(`could not read routing config ${configFile}: ${e.message}`);
}
const receivers = config.receivers || {};
const routes = config.routes || [];
const ackTimeoutMs = Number(config.ack_timeout_ms || 5000);

// ── 2. Load the SLO definition so the breach is a real SLO, not a made-up id.
function parseSlos(yamlText) {
  const blocks = yamlText
    .split(/\n  - id: /)
    .slice(1)
    .map((b) => `  - id: ${b}`);
  const out = [];
  for (const block of blocks) {
    const grab = (re) => {
      const m = block.match(re);
      return m ? m[1].trim() : undefined;
    };
    const id = grab(/^ {2}- id: (.+)$/m);
    if (!id) continue;
    const pct = grab(/^ {6}alert_at_pct: \[([^\]]+)\]$/m);
    out.push({
      id,
      name: grab(/^ {4}name: (.+)$/m)?.replace(/^"|"$/g, ''),
      endpoint: grab(/^ {4}endpoint: (.+)$/m)?.replace(/^"|"$/g, ''),
      runbook: grab(/^ {4}runbook: (.+)$/m)?.replace(/^"|"$/g, ''),
      alertAtPct: pct ? pct.split(',').map(Number) : [],
    });
  }
  return out;
}
const sloYaml = readFileSync(path.join(root, 'docs', 'runbooks', 'SLO-DEFINITIONS.yaml'), 'utf8');
const slos = parseSlos(sloYaml);
const slo = slos.find((s) => s.id === sloId);
if (!slo) fail(`SLO "${sloId}" is not defined in docs/runbooks/SLO-DEFINITIONS.yaml`);

// ── 3. Resolve the route for this SLO + severity.
const route = routes.find((r) => r.slo_id === sloId && (r.severity || []).includes(severity));
if (!route) {
  fail(
    `no route for ${sloId}/${severity} in ${path.relative(root, configFile)} — this alert would never be delivered`,
  );
}
const receiver = receivers[route.receiver];
if (!receiver) {
  fail(`receiver "${route.receiver}" referenced by the route for ${sloId} is not defined in the routing config`);
}

// ── 4. Provision the receiver when it is a localhost URL (the rehearsal destination).
const receiverUrl = new URL(receiver.url);
const isLocal = ['127.0.0.1', 'localhost', '::1'].includes(receiverUrl.hostname);
let receiverProc = null;
const cleanup = () => {
  if (receiverProc && !receiverProc.killed) {
    try {
      receiverProc.kill();
    } catch {
      /* already gone */
    }
  }
};
process.on('exit', cleanup);

function startReceiver() {
  const port = receiverUrl.port || '80';
  return new Promise((resolve, reject) => {
    const proc = spawn(
      process.execPath,
      [path.join('scripts', 'webhook-receiver.mjs'), '--port', port],
      { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] },
    );
    receiverProc = proc;
    let ready = false;
    const rl = createInterface({ input: proc.stdout });
    proc.on('error', reject);
    proc.on('exit', (code) => {
      if (!ready) reject(new Error(`receiver exited before becoming ready (code ${code})`));
    });
    rl.on('line', (line) => {
      if (line.includes('READY')) {
        ready = true;
        rl.close();
        resolve();
      }
    });
    setTimeout(() => {
      if (!ready) {
        try {
          proc.kill();
        } catch {
          /* already gone */
        }
        reject(new Error(`receiver did not become ready on port ${port}`));
      }
    }, 5000).unref();
  });
}

// ── 5. Fire the synthetic breach and measure time-to-detect.
const payload = {
  event: 'slo_budget_burn',
  slo_id: slo.id,
  name: slo.name,
  endpoint: slo.endpoint,
  severity,
  error_budget_consumed_pct: breachPct,
  fired_at: startedAt.toISOString(),
  runbook: route.runbook || slo.runbook,
  rehearsal: true,
  trace_id: randomUUID(),
};

async function run() {
  if (isLocal) {
    try {
      await startReceiver();
    } catch (e) {
      fail(`could not start the rehearsal receiver at ${receiver.url}: ${e.message}`);
    }
  }

  const t0 = Date.now();
  console.log(`\n  firing synthetic breach: ${slo.id}/${severity}, ${breachPct}% error budget consumed → ${receiver.url}`);
  let res;
  let body;
  try {
    res = await fetch(receiver.url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(ackTimeoutMs),
    });
    body = await res.json().catch(() => ({}));
  } catch (e) {
    const ttdMs = Date.now() - t0;
    console.log(`  delivery attempt failed after ${ttdMs} ms: ${e.message}`);
    fail(`alert NOT delivered to ${receiver.url} (${e.message}) — the route is broken`);
  }
  const ttdMs = Date.now() - t0;

  const problems = [];
  if (res.status !== 200) problems.push(`HTTP ${res.status} (expected 200)`);
  if (body.received !== true) problems.push('receiver did not ack');
  if (body.alert?.slo_id !== slo.id) problems.push(`acked slo_id ${body.alert?.slo_id} != ${slo.id}`);
  if (body.alert?.severity !== severity) problems.push(`acked severity ${body.alert?.severity} != ${severity}`);
  if (problems.length) {
    fail(`receiver ack did not match the fired alert: ${problems.join(', ')}`);
  }

  const record = {
    timestamp: startedAt.toISOString(),
    slo_id: slo.id,
    severity,
    breach_pct: breachPct,
    delivered_to: receiver.url,
    time_to_detect_ms: ttdMs,
    trace_id: payload.trace_id,
    result: 'PASS',
  };

  // ── 6. Log the rehearsal.
  if (!noLog) {
    mkdirSync(path.dirname(jsonlPath), { recursive: true });
    appendFileSync(jsonlPath, `${JSON.stringify(record)}\n`);
    const rows = readFileSync(jsonlPath, 'utf8')
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .map(
        (r) =>
          `| ${r.timestamp.slice(0, 19).replace('T', ' ')} | ${r.slo_id} | ${r.severity} | ${r.breach_pct}% | ${r.time_to_detect_ms} ms | ${r.delivered_to} | ${r.result} |`,
      );
    const section =
      `## Rehearsal log\n\n` +
      `Appended by \`scripts/rehearse-alert-routing.mjs\` — a synthetic SLO error-budget breach fired ` +
      `through \`alerting/alert-routing.json\` and delivered to the configured webhook receiver, timed ` +
      `(time-to-detect). Latest rehearsal is the current row.\n\n` +
      `| When (UTC) | SLO | Severity | Breach | Time-to-detect | Destination | Result |\n` +
      `| :--------- | :-- | :------- | :----- | :------------- | :---------- | :----- |\n` +
      `${rows.join('\n')}\n`;
    const runbook = readFileSync(runbookPath, 'utf8');
    if (/## Rehearsal log/.test(runbook)) {
      writeFileSync(runbookPath, runbook.replace(/## Rehearsal log[\s\S]*?(?=\n## |$)/, section.trimEnd()));
    } else {
      writeFileSync(runbookPath, `${runbook.trimEnd()}\n\n${section}`);
    }
  }

  console.log(`\n✓ ALERT DELIVERED — synthetic ${slo.id}/${severity} breach (${breachPct}% budget consumed) reached ${receiver.url}`);
  console.log(`  time-to-detect ${ttdMs} ms · trace ${payload.trace_id}${noLog ? ' · rehearsal NOT logged (--no-log)' : ' · logged'}`);
  cleanup();
  process.exit(0);
}

run();
