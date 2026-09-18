// A20 exit-criterion scenario (G-13): noisy-neighbour report isolation.
//
// Exit criterion: "One tenant issuing a runaway report load leaves a second
// tenant's p95 within its SLO. Verified under load, not argued."
//
// Two free-plan tenants share one host IP:
//   noisy  (rl-a20-n1@kannan19302.dev)  — a runaway report load, 8 VUs hammering
//                                   POST /reporting/engine/query as fast as
//                                   the API allows (the throttler caps it).
//   victim (rl-a20-n2@kannan19302.dev)  — a light, legitimate report user (1 query
//                                   per 10s, comfortably inside its OWN free
//                                   plan's 10/min report budget).
//
// The victim can only see 429s or latency spikes if its buckets are SHARED
// with the noisy tenant (the pre-fix per-IP fallback). With per-tenant
// buckets, the victim's p95 stays within the slo-run-report SLO (5000ms) and
// its error rate under 1% no matter how hard the noisy tenant hammers.
//
// Run from unierp-infra (the k6 image reaches host services via
// host.docker.internal):
//   docker run --rm -v "$(pwd)/load-tests:/scripts" grafana/k6 run \
//     /scripts/scenarios/noisy-neighbour.js
//
// Provision the two tenants and reset throttle state before a fresh run:
//   docker exec unerp-redis sh -c "redis-cli --scan --pattern 'throttle:*' | xargs -r redis-cli DEL"
import http from 'k6/http';
import { check, sleep } from 'k6';
import { baseOptions } from '../config/options.js';

const HOST = __ENV.TEST_HOST || 'http://host.docker.internal';
const API = `${HOST}:3001/api/v1`;
const IDP = `${HOST}:3005/api/v1`;

const NOISY = {
  email: __ENV.NOISY_EMAIL || 'rl-a20-n1@kannan19302.dev',
  password: __ENV.NOISY_PASSWORD || 'Passw0rd!x-A20',
  tag: 'noisy',
};
const VICTIM = {
  email: __ENV.VICTIM_EMAIL || 'rl-a20-n2@kannan19302.dev',
  password: __ENV.VICTIM_PASSWORD || 'Passw0rd!x-A20',
  tag: 'victim',
};

export const options = baseOptions({
  scenarios: {
    noisy_tenant: {
      executor: 'constant-vus',
      vus: 8,
      duration: '110s',
      tags: { scenario: 'noisy_tenant' },
      exec: 'runNoisy',
    },
    victim_tenant: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 10,
      maxDuration: '110s',
      tags: { scenario: 'victim_tenant' },
      exec: 'runVictim',
    },
  },
  // The victim's report latency and availability must meet its SLO while the
  // noisy tenant runs a runaway load. No threshold is placed on the noisy
  // tenant — it is EXPECTED to be throttled (429s are the correct behaviour).
  thresholds: {
    'http_req_duration{tenant:victim}': ['p(95)<5000'],
    'http_req_failed{tenant:victim}': ['rate<0.01'],
  },
});

function login(email, password) {
  const res = http.post(
    `${IDP}/auth/login`,
    JSON.stringify({ email, password }),
    {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      tags: { name: 'tenant_login' },
    },
  );
  if (res.status !== 200) {
    throw new Error(`login ${res.status}: ${res.body}`);
  }
  const body = res.json();
  return body.token || body.accessToken;
}

export function setup() {
  return {
    noisyToken: login(NOISY.email, NOISY.password),
    victimToken: login(VICTIM.email, VICTIM.password),
  };
}

// Per-VU session state (each VU gets its own JS runtime and cookie jar).
const state = { token: null, csrf: null, ready: false };

function ensureSession(data, tenant) {
  if (state.ready) return;
  state.token = tenant.tag === 'noisy' ? data.noisyToken : data.victimToken;
  // Seed the csrf_token cookie (set on any response, auth required here).
  http.get(`${API}/reporting/engine/semantic-layer`, {
    headers: { Authorization: `Bearer ${state.token}` },
    tags: { name: 'csrf_seed' },
  });
  const cookies = http.cookieJar().cookiesForURL(`${API}/reporting/engine/query`);
  state.csrf = cookies.csrf_token;
  state.ready = true;
}

function reportQuery(data, tenant) {
  ensureSession(data, tenant);
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${state.token}`,
  };
  if (state.csrf) {
    // Send the CSRF token as BOTH the header and the Cookie, mirroring what a
    // browser's cookie jar would do. k6's default jar does not reliably
    // re-send this session cookie across iterations, which otherwise leaves the
    // API believing the request is cookie-less and issuing a fresh token (403).
    headers['x-csrf-token'] = state.csrf;
    headers['Cookie'] = `csrf_token=${state.csrf}`;
  }
  const params = {
    headers,
    tags: { name: 'report_query', tenant: tenant.tag },
  };
  const payload = JSON.stringify({
    entity: 'invoices',
    filters: { status: 'PAID' },
    limit: 100,
  });
  return http.post(`${API}/reporting/engine/query`, payload, params);
}

export function runNoisy(data) {
  reportQuery(data, NOISY);
  // No sleep: this is the runaway load.
}

export function runVictim(data) {
  const res = reportQuery(data, VICTIM);
  if (res.status >= 400) {
    console.log(`victim iteration ${__ITER}: FAILED status=${res.status} body=${res.body.slice(0, 150)}`);
  }
  check(res, {
    'victim report query succeeded (2xx)': (r) => r.status >= 200 && r.status < 300,
  });
  sleep(10);
}
