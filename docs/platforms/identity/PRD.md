# Identity Platform PRD

## Product outcome

Provide authentication, federation, OIDC/OAuth, sessions, tokens, MFA, onboarding, provisioning, entitlement and delegation for human users, service principals, agents, tenant administrators and provider operators, with explicit tenant, provider and service boundaries.

## Business requirements

- `IAM-BR-001`: The platform shall expose one authoritative lifecycle for every owned resource.
- `IAM-BR-002`: Every tenant-owned operation shall preserve tenant isolation and attributable audit.
- `IAM-BR-003`: Contract compatibility and deprecation shall be explicit and measurable.
- `IAM-BR-004`: User-visible success shall represent durable system success, not route or request presence.
- `IAM-BR-005`: Capabilities without implementation and behavioral evidence shall remain UNVERIFIED.

## Scope and maturity

Primary implementation: `idp`, `auth`.

Inspected evidence: IDP has 135 implementation files/26 tests with auth, OAuth, SSO, OIDC authorization/token/session, signing keys, platform entitlements and agent delegation. Auth package has token/session types and 2 tests.

Current risk: Identity data ownership and administration boundaries span tenant/provider surfaces; complete protocol conformance and key-rotation exercises are not yet evidenced.

Success measures are lifecycle completion, correctness, security, availability and evidence coverage. File, route or screen count is not a success measure.

