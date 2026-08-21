# Platform Admin OS Requirements (FRS/SRS/NFR)

## Functional requirements

- `PAO-FR-001`: Authorized operators shall create, suspend, restore and retire tenants through explicit lifecycle states.
- `PAO-FR-002`: Operators shall inspect tenant configuration, usage, quotas, subscriptions and security posture without crossing tenant data boundaries.
- `PAO-FR-003`: Operators shall inspect service health, releases, jobs, queues, incidents and maintenance state.
- `PAO-FR-004`: Operators shall manage provider roles, permissions, sessions, authentication policy and audit review.
- `PAO-FR-005`: Operators shall govern marketplace publication, versions, reviews, approvals and installations.
- `PAO-FR-006`: Operators shall inspect billing plans, subscriptions, invoices, payments, revenue and usage.

## System behavior

- Commands shall return a durable operation identifier for asynchronous work.
- Repeated commands with the same idempotency key shall not duplicate effects.
- Stale writes shall fail with an explicit concurrency response.
- Unauthorized actions shall fail closed without disclosing protected resource details.
- Partial downstream failure shall be visible and recoverable; the UI shall not report success prematurely.

## NFRs

- `PAO-NFR-001`: All provider APIs shall publish latency, availability and error-rate SLOs.
- `PAO-NFR-002`: Audit events shall be durable, tamper-evident and queryable under the retention policy.
- `PAO-NFR-003`: Critical workflows shall support keyboard use and WCAG 2.2 AA.
- `PAO-NFR-004`: Recovery procedures shall have tested RTO/RPO targets.
- `PAO-NFR-005`: Secrets and personal data shall never appear in client logs or telemetry.

## Current gaps

- Route inventory is not yet mapped one-to-one to backing APIs and permissions.
- Four observed test files do not provide adequate coverage for the exposed control-plane breadth.
- Provider-versus-tenant responsibility is contradicted by tenant-admin routes labelled `super-admin`.
