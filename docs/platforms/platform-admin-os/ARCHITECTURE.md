# Platform Admin OS Architecture and TRD

## Boundary

The Next.js console is a presentation/control client. Business and infrastructure authority must remain in
authenticated backend/control-plane services. Browser routes may orchestrate sessions but must not become the
source of truth for tenant lifecycle, billing, IAM or infrastructure state.

## Trust zones

1. Operator browser.
2. Provider console server/runtime.
3. Identity provider and policy enforcement.
4. Business/control APIs.
5. infrastructure providers and data stores.

Every transition requires authenticated identity, provider entitlement, target-scoped authorization, request
correlation and auditable outcome.

## Required components

- Provider OIDC client and server-managed session.
- Policy enforcement for provider roles and high-risk action step-up.
- Command API with idempotency and operation status.
- Read models for health, tenancy, billing, security and support.
- Audit/event pipeline and observability correlation.
- Design-system primitives for confirmation, risk, unknown-state and degraded-state presentation.

## Inspected implementation

`provider-admin-os` contains the Next.js surface and local session/provider login routes. `idp` contains auth,
OIDC, platform-entitlement and signing-key services. `api` contains admin, SaaS, subscription, marketplace,
DevOps and analytics modules. Exact endpoint ownership and route coverage remain `UNVERIFIED` pending generated
contract mapping.

## Prohibited coupling

- Direct browser access to infrastructure credentials or databases.
- Tenant-admin components importing provider-only services.
- UI route presence used as proof of backend capability.
- Provider policy embedded only in navigation visibility.
