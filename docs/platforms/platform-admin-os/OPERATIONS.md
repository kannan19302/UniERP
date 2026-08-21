# Platform Admin OS Operations, SRE and QA

## Delivery

Build, typecheck, lint, unit, E2E and token checks are declared in `provider-admin-os/package.json`. A release
shall additionally verify dependency contracts, security scanning, migrations, rollback and environment policy.

## Observability

Provider commands require correlated logs, metrics and traces from UI request through downstream completion.
Dashboards shall expose availability, latency, error rate, saturation, command backlog and audit-pipeline health.

## Required runbooks

Console unavailable; identity provider unavailable; provisioning stuck; cross-tenant exposure suspected;
credentials compromised; audit pipeline degraded; failed release; restore tenant; regional dependency failure.

## QA strategy

- Unit: state transformations, permission display hints and validation.
- Contract: every UI client call against published schemas and errors.
- Integration: IAM enforcement, idempotency, audit and downstream failure.
- E2E: provider login, tenant lifecycle, incident workflow and recovery.
- Security: privilege escalation, IDOR, CSRF/session, replay and secret leakage.
- Accessibility: automated checks plus keyboard/screen-reader workflow review.

Current state is `GAP`: four observed test files cannot substantiate this required matrix.
