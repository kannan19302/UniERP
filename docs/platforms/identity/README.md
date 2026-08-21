# Identity Platform

Platform for human users, service principals, agents, tenant administrators and provider operators. It owns authentication, federation, OIDC/OAuth, sessions, tokens, MFA, onboarding, provisioning, entitlement and delegation.

Primary implementation: `idp`, `auth`.

Inspected evidence: IDP has 135 implementation files/26 tests with auth, OAuth, SSO, OIDC authorization/token/session, signing keys, platform entitlements and agent delegation. Auth package has token/session types and 2 tests.

Current risk: Identity data ownership and administration boundaries span tenant/provider surfaces; complete protocol conformance and key-rotation exercises are not yet evidenced.

## Authoritative suite

- [PRD](PRD.md)
- [Requirements](REQUIREMENTS.md)
- [Architecture/TRD](ARCHITECTURE.md)
- [API, data and integration contracts](CONTRACTS.md)
- [Security/IAM/compliance](SECURITY.md)
- [UX/design requirements](EXPERIENCE.md)
- [Infrastructure, SRE, QA and operations](OPERATIONS.md)
- [Traceability](TRACEABILITY.md)
- [Legacy security implementation claims](evidence/legacy-security-implementation-claims.md)
- [Shared API/IDP controller and authorization inventory](../business-services/evidence/controller-authorization-inventory.md)
- [AST method-level Identity controller coverage](evidence/ast-controller-coverage.md)
