# Tenant Admin Requirements (FRS/SRS/NFR)

- `TAD-FR-001`: Authorized administrators shall invite, activate, suspend and remove tenant users.
- `TAD-FR-002`: Administrators shall manage roles, permission packages and assignments with effective-access preview.
- `TAD-FR-003`: Administrators shall configure tenant SSO, MFA, password, session and IP policies subject to provider minimums.
- `TAD-FR-004`: Administrators shall manage tenant branding, domains, localization and communications.
- `TAD-FR-005`: Administrators shall configure integrations, API keys, OAuth clients and webhooks within tenant quotas.
- `TAD-FR-006`: Administrators shall manage retention, export, erasure and legal-hold-aware privacy workflows.
- `TAD-FR-007`: Administrators shall inspect tenant audit activity and configuration history.
- `TAD-FR-008`: The organization control plane shall expose one non-overlapping application boundary for each canonical OCC capability: organization profile and structure, workforce directory, access governance, identity and authentication, business application control, plan and subscription management, billing and payments, consumption and quotas, organization entitlements, app and extension management, integration hub, developer and API access, organization security, audit and regulatory controls, data lifecycle, domain and communication services, automation operations, digital experience management, notification center, support and service center, AI and agent governance, and organization intelligence.
- `TAD-FR-009`: Organization administrators shall not receive provider tenant lifecycle, cross-tenant search, provider impersonation, platform plan-authority, or platform infrastructure controls through OCC routes or permissions.
- `TAD-FR-010`: Every OCC application shall declare a stable application id, entry route, tenant-scoped permission namespace, resource ownership, event family, help topic, telemetry namespace, and supported channel set in the shared control-center catalog.
- `TAD-NFR-001`: All reads and writes shall enforce tenant isolation server-side.
- `TAD-NFR-002`: Security-policy changes shall propagate within a documented bounded time.
- `TAD-NFR-003`: Critical workflows shall meet WCAG 2.2 AA and support localization.
- `TAD-NFR-004`: Bulk operations shall be idempotent, resumable and observable.

Verification obligations: repository gates shall reject provider-owned routes in OCC and routes without a canonical owner; each application remains unverified until UI, API, persistence, authorization, audit, telemetry, failure, and recovery evidence is linked in traceability.
