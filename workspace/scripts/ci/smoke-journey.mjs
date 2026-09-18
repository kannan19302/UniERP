#!/usr/bin/env node
/**
 * End-to-end smoke journey — register, log in, read a tenant's data.
 *
 * Every gate in `pnpm verify` can pass while the product does not work. That is
 * not hypothetical: this repository reported "100% of Phases 0–5" and 14/14
 * green gates at a point when the web app returned 500 on every route and the
 * API rejected every authenticated request. Unit tests mock the database, the
 * type checker cannot see a Prisma `include` that was left empty, and no gate
 * asks whether a customer can sign up.
 *
 * So this walks the real thing over HTTP, against running services, and fails
 * loudly if any step breaks. It is deliberately not a unit test: it has no
 * mocks and asserts on status codes a browser would receive.
 *
 * Usage:
 *   node scripts/ci/smoke-journey.mjs
 *   WEB_URL=… API_URL=… IDP_URL=… node scripts/ci/smoke-journey.mjs
 */

const WEB = process.env.WEB_URL ?? "http://localhost:3000";
const API = process.env.API_URL ?? "http://localhost:3001";
const IDP = process.env.IDP_URL ?? "http://localhost:3005";

const PASSWORD = "SmokeTest!Passw0rd";
const email = `smoke-${Date.now()}@example.invalid`;

let failures = 0;
const step = (name, ok, detail = "") => {
  if (ok) {
    console.log(`  [32m✓[0m ${name}${detail ? `  ${detail}` : ""}`);
  } else {
    failures += 1;
    console.log(`  [31m✗[0m ${name}${detail ? `  ${detail}` : ""}`);
  }
};

const timeout = (ms) => {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  return { signal: c.signal, done: () => clearTimeout(t) };
};

async function get(url, token) {
  const t = timeout(60_000);
  try {
    const r = await fetch(url, {
      signal: t.signal,
      headers: token ? { authorization: `Bearer ${token}` } : {},
    });
    return r.status;
  } catch {
    return 0;
  } finally {
    t.done();
  }
}

async function post(url, body) {
  const t = timeout(60_000);
  try {
    const r = await fetch(url, {
      method: "POST",
      signal: t.signal,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    let json = null;
    try {
      json = await r.json();
    } catch {
      /* non-JSON body */
    }
    return { status: r.status, json };
  } catch (error) {
    return { status: 0, json: { message: String(error).slice(0, 80) } };
  } finally {
    t.done();
  }
}

console.log("\nUniERP — end-to-end smoke journey\n");

// ── the public pages a visitor sees before signing up ───────────────────────
for (const path of ["/", "/login", "/register"]) {
  const code = await get(`${WEB}${path}`);
  step(`public page ${path}`, code === 200, `HTTP ${code}`);
}

// ── register a tenant ───────────────────────────────────────────────────────
const registration = await post(`${WEB}/api/v1/auth/register`, {
  email,
  password: PASSWORD,
  confirmPassword: PASSWORD,
  firstName: "Smoke",
  lastName: "Test",
  organizationName: "Smoke Test Co",
  // Required: the IdP rejects a registration that does not accept terms, and it
  // is right to.
  termsAccepted: true,
});
step("register a tenant", registration.status === 201, `HTTP ${registration.status}`);
const tenantId = registration.json?.tenant?.id;

// ── log in ──────────────────────────────────────────────────────────────────
const login = await post(`${WEB}/api/v1/auth/login`, { email, password: PASSWORD });
const token = login.json?.token;
step("log in", login.status === 200 && Boolean(token), `HTTP ${login.status}`);

// The API authorises from the token's claims rather than a database round trip,
// so a token without them authenticates and then fails every permission check.
if (token) {
  const claims = JSON.parse(
    Buffer.from(token.split(".")[1], "base64url").toString(),
  );
  step(
    "token carries permissions",
    Array.isArray(claims.permissions) && claims.permissions.length > 0,
    JSON.stringify(claims.permissions ?? null),
  );
  step("token carries a session id", Boolean(claims.sid));
}

// ── the profile call the app makes immediately after login ──────────────────
step("fetch profile", (await get(`${WEB}/api/v1/auth/me`, token)) === 200);

// ── the authenticated application ───────────────────────────────────────────
for (const path of ["/dashboard", "/finance", "/crm", "/inventory", "/hr"]) {
  const code = await get(`${WEB}${path}`);
  step(`app page ${path}`, code === 200 || code === 307, `HTTP ${code}`);
}

// ── tenant data through the API ─────────────────────────────────────────────
// A brand-new tenant has no modules installed, so these legitimately answer 404
// with "module is not installed" until entitlements are provisioned. Both that
// and 200 are correct; anything else is not.
for (const path of [
  "/api/v1/finance/invoices",
  "/api/v1/crm/customers",
  "/api/v1/inventory/products",
  "/api/v1/hr/employees",
]) {
  const code = await get(`${API}${path}`, token);
  step(`api ${path}`, code === 200 || code === 404, `HTTP ${code}`);
}

// ── the identity service itself ─────────────────────────────────────────────
step(
  "idp reachable",
  (await get(`${IDP}/api/v1/auth/check-email?email=${encodeURIComponent(email)}`)) === 200,
);

console.log(
  failures === 0
    ? `\n  [32m✅ journey complete[0m — tenant ${tenantId ?? "?"}\n`
    : `\n  [31m✗ ${failures} step(s) failed[0m\n`,
);
process.exit(failures === 0 ? 0 : 1);
