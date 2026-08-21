# Mobile Client Infrastructure, SRE, QA and Operations

## Required evidence

Build/type/lint; unit; contract; integration; tenant-isolation/security; E2E journey; accessibility where applicable; performance; migration/rollback; backup/restore; telemetry and incident exercise.

Telemetry shall correlate user or system intent through authoritative completion without logging secrets or unnecessary personal data. SLOs shall cover availability, latency, error rate, saturation and data/recovery objectives for critical journeys.

Required runbook themes: bad mobile release, API incompatibility, push outage, sync corruption, lost device and crash spike.

Primary implementation: `unierp-mobile`.

Inspected evidence: Flutter client has 818 implementation files/29 tests and a large GoRouter configuration. Breadth is substantial but parity, offline and platform security evidence remain unmapped.

Current risk: Large route count can mask placeholder/parity gaps; offline conflicts, secure storage and device lifecycle require explicit proof.

