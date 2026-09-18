# Change Contract — FND-P0-005 Authorization Closure Inventory

## Cycle status

- Status: `PARTIAL`
- Objective: establish a current, fail-closed inventory of HTTP authorization declarations before changing default runtime behavior.
- Risk class: `R3` — authentication/authorization enforcement across PLT-IAM and PLT-BIZ.
- Owners: PLT-IAM owns authorization semantics; PLT-BIZ/API owners remediate their routes; PLT-OPS owns the gate.
- Scope: active `api` and `idp` controller sources, route declaration classification and accountable remediation evidence.
- Out of scope: silently adding broad permissions, changing public protocol behavior, or representing route metadata as complete record-level authorization.

## Inspected conflict

The API RBAC guard currently allows when no `@Permissions` metadata exists. Its current unit suite explicitly verifies that behavior. The API has no global JWT/RBAC guard; controllers opt in with `@UseGuards`. A broad guard flip would therefore have unknown compatibility impact and could make public protocol/webhook endpoints unreachable. Existing policy tooling still contains legacy polyrepo path assumptions and cannot be trusted as the complete inventory.

## Design

`check-http-authorization-inventory.mjs` derives active controller routes directly from the active-estate catalog. Each route must be classified by one of:

1. `@Public(reason)` for an intentional unauthenticated boundary; or
2. `@Permissions(...)` for an authenticated authorization boundary.

The checker reports routes and source locations only; it never reads tokens or request data. A route with neither declaration fails. Permission-bound routes whose source has no RBAC guard are reported separately. The gate is a prerequisite for the later default-deny runtime change; it does not claim that static metadata proves record-level/tenant authorization.

## Verification

- Synthetic controller fixtures prove classified routes pass and missing metadata/guard routes fail.
- The real active estate is run in report mode, producing current actionable counts and source locations.
- Runtime behavior is changed only where an inventory finding exposed an unsafe boundary; each such change has focused behavioral proof and remains documented below.

> **This is not done.** Full FND-P0-005 requires every HTTP, job, consumer, websocket and support entrypoint to have explicit authority and record scope, then a reviewed default-deny runtime enforcement rollout with negative behavioral proof.

## Amendment — customer-portal authority boundary

The controller inventory initially treated every `@Permissions` route as tenant-staff RBAC. Inspection showed that
the customer portal deliberately authenticates external customer contacts with `CustomerPortalAuthGuard` and scopes
business reads/writes to `customerId`; applying tenant-staff `RbacGuard` would be a behavioral break and would not
add record proof. `@AuthorizationBoundary("customer-portal")` now makes that distinct authority model explicit;
the gate requires its matching guard. Login is explicitly public because it is the credential-exchange endpoint.
The guard and downstream customer record scoping still require independent negative behavioral proof.

## Amendment — verified platform entitlement subject

`GET /auth/platforms` previously fell back to raw JWT decoding after both JWK signature verification and the
legacy typed-token verifier failed. That made unverified `sub`, tenant and permission claims eligible for a platform
entitlement decision. The fallback has been removed; only a successfully verified JWT or legacy typed session may
reach the policy engine. A focused negative test asserts that a forged bearer token returns unauthorized and cannot
call the entitlement service.

## Amendment — current method-scoped inventory

Guard detection is now limited to the relevant method decorator block or controller-level guard; it no longer lets a
nearby method's guard mask an unguarded route. Controller metadata is also route-local, so two controllers in one
file cannot inherit each other's guard. The current output is **0 gaps across 13,090 routes**, and the adversarial
fixture suite passes. This is an HTTP declaration/enforcement closure, not proof of job/consumer/websocket or
record-level authorization.

The completed remediation batch converted documented opaque-token CRM buyer/signer journeys and challenge-gated
Identity flows to explicit public authority, while retaining their token/challenge validation in service logic.
Tenant-staff SaaS operations were moved to JWT+RBAC. This does not make public endpoints anonymous: their token,
signature, tenant-resolution, CSRF or protocol validation remains the enforcing authority.

## Amendment — verified OIDC consent

`ConsentController` now uses `JwtAuthGuard` at the class boundary and derives the consent subject only from its
verified request principal. The prior cookie decode fallback was removed from consent submission. Focused tests prove
that consent is recorded/audited for the verified principal and that a cookie-shaped request with no principal cannot
record consent. `end_session` now verifies the session token before deriving its session or tenant context: forged or
expired cookies clear local browser state only; they cannot revoke an arbitrary server-side session. Focused tests
prove both forged-token denial and verified tenant-scoped revocation.

## Amendment — remaining route findings remediated fail-closed

The three PWA configuration routes previously selected tenant data from the client-controlled `x-tenant-id` header.
They now require `JwtAuthGuard` + `RbacGuard` and use only the verified caller tenant. They remain unavailable to
anonymous browsers until the owning PWA platform publishes a host-bound public-tenant resolver with tenant-isolation
tests; this intentional product constraint is safer than returning another tenant's configuration.

Provisioning status now requires `tenant.provisioning.read` and rejects a path tenant that differs from the verified
principal's tenant; tests prove the cross-tenant rejection. Liveness/readiness are explicit public boundaries, while
readiness no longer exposes dependency diagnostics. Metrics now requires `system.metrics.read`; Runtime Operations
must supply a non-user scrape identity before enabling production monitoring. These changes make static authority
explicit and fail closed, but do not substitute for the outstanding end-to-end and operational proof in P0-005.

## Amendment — non-HTTP entrypoint authorization closure

`check-non-http-entrypoint-authorization.mjs` was established to audit non-HTTP execution vectors across `api` and `idp`:
- BullMQ queue processors (`@Processor`)
- Scheduled cron tasks (`@Cron`)
- WebSocket gateways (`@WebSocketGateway`)
- Domain event listeners (`@OnEvent`)

All 41 discovered non-HTTP entrypoints (3 WebSocket gateways, 31 event listeners, 7 BullMQ processors) are verified:
1. WebSocket gateways verify credentials upon connection (`verifyToken` / `JwtAuthGuard`) and scope room subscriptions to `tenant:${tenantId}`.
2. Provider Console gateway enforces `superadmin` control-plane role authorization on connection.
3. Queue processors enforce explicit `tenantId` extraction from job payloads or are system-level outbox processors.
4. Domain event listeners enforce typed event payloads with mandatory `tenantId` or explicit system-level audit scope.
5. Adversarial fixture suite (`--test`) passes cleanly with 0 blocking gaps across 41 entrypoints.
