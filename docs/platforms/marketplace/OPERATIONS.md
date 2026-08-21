# Marketplace Infrastructure, SRE, QA and Operations

## Required evidence

Build/type/lint; unit; contract; integration; tenant-isolation/security; E2E journey; accessibility where applicable; performance; migration/rollback; backup/restore; telemetry and incident exercise.

Telemetry shall correlate user or system intent through authoritative completion without logging secrets or unnecessary personal data. SLOs shall cover availability, latency, error rate, saturation and data/recovery objectives for critical journeys.

Required runbook themes: malicious listing takedown, vulnerable version recall, failed upgrade, billing dispute and registry outage.

Primary implementation: `marketplace`, `extensions`, API marketplace/extension-registry modules.

Inspected evidence: Marketplace app has 34 implementation files/1 test; extensions have 36/5 across healthcare, education, field service and real estate. Catalog data appears local in the UI while registry/service modules also exist.

Current risk: Catalog authority is split and local UI data may not reflect registry truth; commercial and technical lifecycle evidence is sparse.

