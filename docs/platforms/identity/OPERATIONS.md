# Identity Platform Infrastructure, SRE, QA and Operations

## Required evidence

Build/type/lint; unit; contract; integration; tenant-isolation/security; E2E journey; accessibility where applicable; performance; migration/rollback; backup/restore; telemetry and incident exercise.

Telemetry shall correlate user or system intent through authoritative completion without logging secrets or unnecessary personal data. SLOs shall cover availability, latency, error rate, saturation and data/recovery objectives for critical journeys.

Required runbook themes: key compromise/rotation, IdP outage, federation lockout, token revocation lag and account takeover.

Primary implementation: `idp`, `auth`.

Inspected evidence: IDP has 135 implementation files/26 tests with auth, OAuth, SSO, OIDC authorization/token/session, signing keys, platform entitlements and agent delegation. Auth package has token/session types and 2 tests.

Current risk: Identity data ownership and administration boundaries span tenant/provider surfaces; complete protocol conformance and key-rotation exercises are not yet evidenced.

