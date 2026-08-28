# Identity Platform Requirements (FRS/SRS/NFR)

## Functional requirements

- `IAM-FR-001`: The platform shall authenticate through supported factors and federation.
- `IAM-FR-002`: The platform shall issue, refresh, revoke and introspect constrained tokens.
- `IAM-FR-003`: The platform shall manage sessions and risk-based reauthentication.
- `IAM-FR-004`: The platform shall provision and deprovision principals and identities.
- `IAM-FR-005`: The platform shall evaluate platform, tenant, role and delegated entitlements.
- `IAM-FR-006`: Inbound OIDC federation shall use a one-time opaque transaction, PKCE, nonce, issuer discovery and cryptographic ID-token validation before provisioning or session issuance. The published [inbound federation contract](contracts/INBOUND_FEDERATION.md) defines the required trust boundary.

## System and non-functional requirements

- `IAM-NFR-001`: APIs and asynchronous work shall define availability, latency, error and recovery objectives.
- `IAM-NFR-002`: Mutating operations shall be idempotent, concurrency-safe and auditable.
- `IAM-NFR-003`: Failures shall be explicit, correlated and recoverable without reporting false success.
- `IAM-NFR-004`: Critical workflows shall meet WCAG 2.2 AA where a user interface exists.
- `IAM-NFR-005`: Data retention, residency, backup and deletion behavior shall be documented and tested.

Primary implementation: `idp`, `auth`.

Inspected evidence: IDP has 135 implementation files/26 tests with auth, OAuth, SSO, OIDC authorization/token/session, signing keys, platform entitlements and agent delegation. Auth package has token/session types and 2 tests.

Current risk: Identity data ownership and administration boundaries span tenant/provider surfaces; complete protocol conformance and key-rotation exercises are not yet evidenced.
