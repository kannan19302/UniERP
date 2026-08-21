# Security, IAM and Privacy Baseline

The legacy security checklist claimed every control was implemented, but many cited obsolete monorepo paths and
provided no runtime or test output. Those claims are reclassified as `UNVERIFIED` until mapped to the current
polyrepo and behavioral evidence.

## Baseline requirements

- `STD-SEC-001`: Authenticate human and machine principals with explicit issuer, audience, expiry and revocation.
- `STD-SEC-002`: Authorize platform, tenant, permission and record scope server-side; deny by default.
- `STD-SEC-003`: Tenant isolation shall exist at service and persistence layers and include negative two-tenant tests.
- `STD-SEC-004`: Validate input at every trust boundary and return non-disclosing errors.
- `STD-SEC-005`: Browser sessions shall protect cookies, CSRF, origins, headers and session rotation.
- `STD-SEC-006`: Secrets shall be externally managed, rotated, least-privileged and redacted from logs/audit.
- `STD-SEC-007`: Privileged and business-significant actions shall emit immutable attributable audit records.
- `STD-SEC-008`: Rate limits and resource governors shall bind to principal/tenant and fail safely.
- `STD-SEC-009`: Sensitive data shall have classification, purpose, residency, retention, export and erasure controls.
- `STD-SEC-010`: Dependencies, containers, artifacts and releases shall have vulnerability and provenance evidence.

## Required proof

Protocol/unit tests, endpoint permission inventory, two-tenant database tests, IDOR/DAST tests, secret scanning,
dependency/container scans, audit tamper tests, key rotation exercise and incident runbooks. A decorator, route,
schema field or checklist row alone is not proof.
