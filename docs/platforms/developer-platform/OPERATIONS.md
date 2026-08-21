# Developer Platform Infrastructure, SRE, QA and Operations

## Required evidence

Build/type/lint; unit; contract; integration; tenant-isolation/security; E2E journey; accessibility where applicable; performance; migration/rollback; backup/restore; telemetry and incident exercise.

Telemetry shall correlate user or system intent through authoritative completion without logging secrets or unnecessary personal data. SLOs shall cover availability, latency, error rate, saturation and data/recovery objectives for critical journeys.

Required runbook themes: sandbox escape response, signing-key compromise, credential leak, quota exhaustion and API-version retirement.

Primary implementation: `developer-platform`, `sdk`, `extension-api`, `sandbox`.

Inspected evidence: 164 portal implementation files/2 tests; SDK 5/1; extension API 8/1; sandbox 8/5. Extension API exposes signed-bundle, scope, budget and egress schemas; sandbox uses isolated execution and host-side capability checks.

Current risk: The portal is much broader than the small public SDK/API surface; compatibility, publishing and revocation lifecycles are not yet proven end to end.

