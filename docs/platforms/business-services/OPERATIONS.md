# Data and Business Services Infrastructure, SRE, QA and Operations

## Required evidence

Build/type/lint; unit; contract; integration; tenant-isolation/security; E2E journey; accessibility where applicable; performance; migration/rollback; backup/restore; telemetry and incident exercise.

Telemetry shall correlate user or system intent through authoritative completion without logging secrets or unnecessary personal data. SLOs shall cover availability, latency, error rate, saturation and data/recovery objectives for critical journeys.

Required runbook themes: schema migration failure, outbox backlog, reconciliation mismatch, isolation incident, API retirement and restore.

Primary implementation: `api`, `data`, `unierp-contracts`.

Inspected evidence: API has 2,192 implementation files/577 test files across 45 modules; data has 313/9 with extensive Prisma schemas; contracts has 90/43 including versioning, audit and backup/restore types.

Current risk: Very high breadth, many schema files and relatively weak data-layer test count create ownership, RLS, migration and contract-drift risk.

