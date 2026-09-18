#!/usr/bin/env node
// The alert-routing rehearsal destination — a loopback webhook receiver standing in for the
// on-call alert destination (PagerDuty events API v2 / Slack #incidents).
//
// It enforces the SAME delivery contract production routes depend on: a POST JSON event that
// must carry slo_id, severity, error_budget_consumed_pct, fired_at and runbook. A valid alert
// is ACKED with 200 {"received":true,...}; anything else is REJECTED with 400. A rehearsal
// that does not see a matching ack has not delivered.
//
// Usage:
//   node scripts/webhook-receiver.mjs [--port 9199]

import { createServer } from 'node:http';

const argv = process.argv.slice(2);
const portFlag = argv.indexOf('--port');
const port = Number(portFlag !== -1 ? argv[portFlag + 1] : 9199);

const REQUIRED_FIELDS = ['slo_id', 'severity', 'error_budget_consumed_pct', 'fired_at', 'runbook'];
const SEVERITIES = ['warning', 'critical'];

const server = createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/webhook') {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ received: false, error: 'not a webhook delivery' }));
    return;
  }
  let raw = '';
  req.on('data', (chunk) => {
    raw += chunk;
  });
  req.on('end', () => {
    let alert;
    try {
      alert = JSON.parse(raw);
    } catch {
      alert = {};
    }
    const problems = [];
    if (alert.event !== 'slo_budget_burn') problems.push('event must be slo_budget_burn');
    for (const field of REQUIRED_FIELDS) {
      if (alert[field] === undefined || alert[field] === null || alert[field] === '') {
        problems.push(`missing ${field}`);
      }
    }
    if (typeof alert.error_budget_consumed_pct !== 'number' || !(alert.error_budget_consumed_pct > 0)) {
      problems.push('error_budget_consumed_pct must be a positive number');
    }
    if (!SEVERITIES.includes(alert.severity)) problems.push(`severity must be ${SEVERITIES.join('/')}`);
    if (Number.isNaN(Date.parse(alert.fired_at))) problems.push('fired_at must be ISO 8601');
    if (!String(alert.runbook || '').startsWith('docs/')) problems.push('runbook must be a docs/ path');

    if (problems.length) {
      console.log(`REJECTED ${problems.join('; ')}`);
      res.writeHead(400, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ received: false, error: problems.join('; ') }));
      return;
    }
    console.log(
      `DELIVERED slo_id=${alert.slo_id} severity=${alert.severity} pct=${alert.error_budget_consumed_pct} trace=${alert.trace_id || '-'}`,
    );
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(
      JSON.stringify({
        received: true,
        alert: {
          slo_id: alert.slo_id,
          severity: alert.severity,
          error_budget_consumed_pct: alert.error_budget_consumed_pct,
          fired_at: alert.fired_at,
          runbook: alert.runbook,
        },
      }),
    );
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`READY port=${port} url=http://127.0.0.1:${port}/webhook`);
});
