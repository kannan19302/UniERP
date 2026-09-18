// J13/G-17: performance budgets declared as data, not measured ad hoc.
//
// Every earlier reference to this file (.github/workflows/load-test.yml,
// built in an earlier phase) pointed at a file that never existed —
// confirmed by `find . -iname "load-tests"` returning nothing anywhere in
// this repository before this phase. The workflow that was supposed to
// enforce a performance budget could not have run a single scenario,
// ever: every job would fail immediately on a missing file, and the
// workflow only ever triggers on `schedule`/`workflow_dispatch`, never on
// `push`/`pull_request` — so even a working scenario would never have
// blocked a build.
//
// This scenario, and the budget it imports from ../budgets.json, are the
// real, missing artifact — the actual mechanism that fails when a
// regression exceeds budget. It has NOT been executed against a live
// UniERP deployment in this pass: this environment has neither a
// deployed instance to target nor the k6 binary itself (confirmed:
// `which k6` finds nothing). Correctness here is structural — real k6
// API usage, a real threshold block sourced from the shared budget file
// — not proven by a live run.
import http from "k6/http";
import { check, sleep } from "k6";
import budgets from "../budgets.json" with { type: "json" };

const BASE_URL = __ENV.BASE_URL || "http://localhost:3001";
const budget = budgets.api.health;

export const options = {
  vus: 5,
  duration: "30s",
  thresholds: {
    // k6's own pass/fail mechanism: this run's exit code is non-zero if
    // either threshold is violated — the "fails the build" half of G-17.
    http_req_duration: [`p(95)<${budget.p95Ms}`],
    http_req_failed: [`rate<${budget.errorRateMax}`],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/health`);
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(1);
}
