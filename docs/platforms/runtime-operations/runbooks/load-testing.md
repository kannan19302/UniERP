> **Migration status:** Operational runbook migrated from the retired workspace. Scripts, thresholds and endpoints require current verification.

# Load Testing Runbook — UniERP

> **Track I.2** — k6 load/performance test suite for tenant-scoped flows.
> Prerequisite for any "lakhs of users" claim. Verified before the foundation freeze
> lifts and re-verified per release.

---

## Prerequisites

- **k6** installed locally: <https://grafana.com/docs/k6/latest/setup/install/>
- A running UniERP deployment with seeded data (default: `http://localhost:3001`)
- Default test credentials: `admin@kannan19302.dev` / `admin123` (from seed)

---

## Quick Start

```bash
# Smoke test (5 VUs, 30s) — quick sanity check
pnpm test:load:smoke

# Or run a single scenario
pnpm test:load:login
pnpm test:load:list
pnpm test:load:post
pnpm test:load:stress
pnpm test:load:tenant

# Run all non-stress scenarios sequentially
pnpm test:load:all
```

### With custom environment

```bash
# Point at a different deployment
k6 run load-tests/scenarios/login.js \
  --env BASE_URL=https://staging.unerp.dev \
  --env LOAD_TEST_EMAIL=test@kannan19302.dev \
  --env LOAD_TEST_PASSWORD=s3cret

# Output results to JSON for analysis
k6 run load-tests/scenarios/stress-test.js \
  --out json=./results.json \
  --summary-export=./summary.json
```

### With Docker (no local k6 install)

```bash
docker run --rm -i \
  -v "$(pwd)/load-tests:/load-tests" \
  grafana/k6 run \
  --env BASE_URL=http://host.docker.internal:3001 \
  /load-tests/scenarios/smoke-test.js
```

---

## Scenario Descriptions

| Scenario             | File                  | VUs       | Duration | Purpose                                                                                  |
| -------------------- | --------------------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| **Smoke**            | `smoke-test.js`       | 5         | 30s      | Quick sanity — all major endpoints respond, auth works                                   |
| **Login**            | `login.js`            | 0→50      | 3m       | Auth endpoint under load — ramp 30s, sustain 2m, ramp-down 30s                           |
| **List+Paginate**    | `list-paginate.js`    | 0→30      | 3m       | List endpoints with pagination params — cycles through products, sales, crm, hr, finance |
| **Document Post**    | `document-post.js`    | 0→20      | 3m       | Product creation via POST — unique SKUs per iteration                                    |
| **Stress**           | `stress-test.js`      | 0→200→500 | 9.5m     | Ramp to 200 VU over 2m, sustain 5m, spike to 500 over 30s, sustain 1m, ramp down         |
| **Tenant Isolation** | `tenant-isolation.js` | 10        | 3m       | Concurrent requests as different tenants — verifies data isolation                       |

### Flows Covered

1. **Login** — `POST /api/v1/auth/login` with email + password, token extraction
2. **List + Paginate** — `GET /api/v1/{inventory,sales,crm,hr,finance}/...?page=N&limit=M`
3. **Document Post** — `POST /api/v1/inventory/products` with full product payload
4. **Checkout** (via Sales Orders) — `GET /api/v1/sales/orders` list included in list+paginate

---

## Interpreting Results

### Key Metrics

| Metric                     | Description                                | Target             |
| -------------------------- | ------------------------------------------ | ------------------ |
| `http_req_duration`        | Total request time (send + wait + receive) | p95 < 2000ms       |
| `http_req_failed`          | Fraction of failed requests                | < 1%               |
| `http_req_duration{p(99)}` | Tail latency                               | < 5000ms           |
| `iterations`               | Total completed iterations                 | Varies by scenario |
| `vus_max`                  | Maximum concurrent virtual users           | Per scenario       |

### Thresholds (for CI pass/fail)

```javascript
// Default thresholds (config/options.js)
http_req_duration: ["p(95)<2000", "p(99)<5000"];
http_req_failed: ["rate<0.01"];
```

### Sample Output

```
     ✓ login status 200
     ✓ login response < 2s
     ✓ token returned

     checks.........................: 100.00%  ✓ 4500      ✗ 0
     data_received..................: 12 MB   78 kB/s
     data_sent......................: 2.5 MB  16 kB/s
     http_req_blocked...............: avg=1.2ms   p(95)=3.1ms
     http_req_connecting............: avg=0.8ms   p(95)=2.0ms
     http_req_duration..............: avg=245ms   p(95)=890ms   p(99)=1.8s
     http_req_failed................: 0.00%   ✓ 0         ✗ 4500
     vus............................: 50     min=0       max=50
```

---

## Capacity Targets

These targets must be met before the foundation freeze lifts and re-verified per release.
A stated capacity means the system sustains this load within thresholds.

| Flow             | Target RPS          | Target p95               | VUs     | Notes                                                            |
| ---------------- | ------------------- | ------------------------ | ------- | ---------------------------------------------------------------- |
| Login            | ≥50 req/s           | <2000ms                  | 50      | Throttled at controller level (5/60s) — tests throttle behaviour |
| List+Paginate    | ≥100 req/s          | <2000ms                  | 30      | Most common operation; proxies to DB with LIMIT/OFFSET           |
| Document Post    | ≥20 req/s           | <3000ms                  | 20      | Write path with validation + DB insert                           |
| Mixed (Stress)   | ≥200 req/s combined | <3000ms p95, <8000ms p99 | 200–500 | Spike to 500 VU; brief degradation tolerated                     |
| Tenant Isolation | N/A                 | <3000ms                  | 10      | Concurrent tenants; no data leak, no crash                       |

---

## CI Integration

The load test workflow in `.github/workflows/load-test.yml`:

- **Trigger**: `workflow_dispatch` (manual) and daily at 02:00 UTC
- **Runner**: `grafana/k6-action` Docker action
- **Results**: Uploaded as artifacts (7-day retention)
- **Parameters**:
  - `target_url` — target deployment base URL (default: `http://localhost:3001`)
  - `scenario` — which test to run (`smoke`, `login`, `list`, `post`, `stress`, `tenant`, `all`)

### Running in CI

```bash
# Dispatch manually from GitHub UI or gh CLI:
gh workflow run load-test.yml \
  -f target_url=https://staging.unerp.dev \
  -f scenario=all
```

> Note: The CI workflow targets an external deployment. For local testing,
> run `docker compose -f docker-compose.dev.yml up -d` first, then use the local
> k6 CLI or Docker.

---

## Adding a New Scenario

1. Create a new file in `load-tests/scenarios/<name>.js`
2. Import `baseOptions` from `../config/options.js`
3. Import `env` from `../helpers/env.js` and `login`/`getAuthHeaders` from `../helpers/auth.js`
4. Define your `export const options` and `export default function`
5. Add a `pnpm test:load:<name>` script in root `package.json`
6. Add a step in `.github/workflows/load-test.yml`
7. Update this runbook

---

## File Structure

```
load-tests/
├── config/
│   └── options.js          # Shared k6 options with thresholds
├── helpers/
│   ├── auth.js             # JWT token management
│   └── env.js              # Environment configuration
├── scenarios/
│   ├── login.js            # Login flow load test
│   ├── list-paginate.js    # List + paginate flow
│   ├── document-post.js    # Document creation flow
│   ├── smoke-test.js       # Quick smoke test
│   ├── stress-test.js      # Stress test with spike
│   └── tenant-isolation.js # Multi-tenant concurrent test
└── README.md               # (this file — points to docs/RUNBOOK_LOAD_TESTING.md)
```

---

## Design Decisions

1. **k6 over artillery/Locust**: k6 is scriptable in JS, has native CI (GitHub Action), excellent
   metrics output, and low resource overhead per VU.
2. **Shared helpers**: `auth.js` and `env.js` keep credentials and token plumbing out of scenarios.
3. **Ramp profiles**: Each scenario uses ramping-VUs executor to observe behaviour under
   increasing load rather than hammering instantly.
4. **Tenant isolation test**: Asserts every returned record belongs to the correct tenant
   (by checking `tenantId` field). This doubles as an RLS proof under load.
5. **Separate CI workflow**: Load tests are expensive and data-dependent — they run on demand
   or nightly, not on every push/PR.

