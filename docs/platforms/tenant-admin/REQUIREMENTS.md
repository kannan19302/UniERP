# Tenant Admin Requirements (FRS/SRS/NFR)

- `TAD-FR-001`: Authorized administrators shall invite, activate, suspend and remove tenant users.
- `TAD-FR-002`: Administrators shall manage roles, permission packages and assignments with effective-access preview.
- `TAD-FR-003`: Administrators shall configure tenant SSO, MFA, password, session and IP policies subject to provider minimums.
- `TAD-FR-004`: Administrators shall manage tenant branding, domains, localization and communications.
- `TAD-FR-005`: Administrators shall configure integrations, API keys, OAuth clients and webhooks within tenant quotas.
- `TAD-FR-006`: Administrators shall manage retention, export, erasure and legal-hold-aware privacy workflows.
- `TAD-FR-007`: Administrators shall inspect tenant audit activity and configuration history.
- `TAD-NFR-001`: All reads and writes shall enforce tenant isolation server-side.
- `TAD-NFR-002`: Security-policy changes shall propagate within a documented bounded time.
- `TAD-NFR-003`: Critical workflows shall meet WCAG 2.2 AA and support localization.
- `TAD-NFR-004`: Bulk operations shall be idempotent, resumable and observable.

Current gaps: provider-labelled routes exist in the tenant app; route-to-API/permission coverage is unverified;
test evidence has not yet been mapped to the large settings surface.
