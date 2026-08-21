# Tenant Sites and Studio Infrastructure, SRE, QA and Operations

## Required evidence

Build/type/lint; unit; contract; integration; tenant-isolation/security; E2E journey; accessibility where applicable; performance; migration/rollback; backup/restore; telemetry and incident exercise.

Telemetry shall correlate user or system intent through authoritative completion without logging secrets or unnecessary personal data. SLOs shall cover availability, latency, error rate, saturation and data/recovery objectives for critical journeys.

Required runbook themes: bad publish rollback, domain/certificate failure, abusive content, cache purge, traffic spike and compromised editor.

Primary implementation: `tenant-sites`, `tenant-site-template`, `web-studio`.

Inspected evidence: Tenant sites has 18 implementation files/1 test; template 1/0; studio 8/1. Observed blocks include collections/cart and tenant header/home; overall maturity is low.

Current risk: Builder, template and runtime contracts are largely undocumented and thinly implemented; safe publication and tenant/domain isolation are not proven.

