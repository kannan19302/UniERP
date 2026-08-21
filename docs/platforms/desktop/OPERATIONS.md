# Desktop Client Infrastructure, SRE, QA and Operations

## Required evidence

Build/type/lint; unit; contract; integration; tenant-isolation/security; E2E journey; accessibility where applicable; performance; migration/rollback; backup/restore; telemetry and incident exercise.

Telemetry shall correlate user or system intent through authoritative completion without logging secrets or unnecessary personal data. SLOs shall cover availability, latency, error rate, saturation and data/recovery objectives for critical journeys.

Required runbook themes: compromised update, failed rollout, unsupported OS, local cache corruption and certificate expiry.

Primary implementation: `desktop-app`.

Inspected evidence: Desktop repository has only 5 implementation files/1 test and mostly server/public shell files. It is not evidence of a production ERP desktop application.

Current risk: Current maturity is DECLARED/minimal; technology, trust boundary, feature parity and update mechanism are not proven.

