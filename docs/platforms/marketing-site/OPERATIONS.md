# Marketing Site Infrastructure, SRE, QA and Operations

## Required evidence

Build/type/lint; unit; contract; integration; tenant-isolation/security; E2E journey; accessibility where applicable; performance; migration/rollback; backup/restore; telemetry and incident exercise.

Telemetry shall correlate user or system intent through authoritative completion without logging secrets or unnecessary personal data. SLOs shall cover availability, latency, error rate, saturation and data/recovery objectives for critical journeys.

Required runbook themes: defacement, form abuse, analytics outage, bad publish, domain/CDN incident and privacy request.

Primary implementation: `marketing-site`.

Inspected evidence: Marketing site has 222 implementation files/4 tests, 142 app files and a local Prisma schema with Tenant, Domain, Setting, User, Lead and Ticket models.

Current risk: The public site contains its own tenant/user/lead/ticket persistence, creating data ownership and IAM overlap; product claims may drift from verified capabilities.

