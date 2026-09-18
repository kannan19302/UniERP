// J13/G-17: a representative "API p95" route budget — a tenant-scoped,
// paginated list endpoint, the classic p95-sensitive shape (large tables,
// N+1 risk, missing indexes). See smoke-test.js's header comment for why
// this file did not exist before this phase, and for the same honesty
// note: not executed against a live deployment or k6 binary here.
import http from "k6/http";
import { check, sleep } from "k6";
import budgets from "../budgets.json" with { type: "json" };

const BASE_URL = __ENV.BASE_URL || "http://localhost:3001";
const AUTH_TOKEN = __ENV.AUTH_TOKEN || "";
const budget = budgets.api.list_paginated;

export const options = {
  vus: 10,
  duration: "1m",
  thresholds: {
    http_req_duration: [`p(95)<${budget.p95Ms}`],
    http_req_failed: [`rate<${budget.errorRateMax}`],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/api/customers?page=1&limit=25`, {
    headers: AUTH_TOKEN ? { Authorization: `Bearer ${AUTH_TOKEN}` } : {},
  });
  check(res, {
    "status is 200 or 401 (no token supplied)": (r) =>
      r.status === 200 || r.status === 401,
  });
  sleep(1);
}
