# Runtime and Operations Platform Infrastructure, SRE, QA and Operations

## Required evidence

Build/type/lint; unit; contract; integration; tenant-isolation/security; E2E journey; accessibility where applicable; performance; migration/rollback; backup/restore; telemetry and incident exercise.

Telemetry shall correlate user or system intent through authoritative completion without logging secrets or unnecessary personal data. SLOs shall cover availability, latency, error rate, saturation and data/recovery objectives for critical journeys.

Required runbook themes: deployment failure, regional outage, secret compromise, resource exhaustion, telemetry loss, backup/restore and disaster recovery.

Primary implementation: `infra`, `config`, `kernel`, `shared`, `service-kit`.

Inspected evidence: Infra has 38 implementation files/13 tests with load tests, platform wizard and control-plane assets; kernel 10/5 exposes tenant governor/policy; shared 56/13; service-kit 5/2; config has almost no source implementation.

Current risk: Operational mechanisms are dispersed; config package appears nearly empty; deployment topology and tested recovery evidence are not centrally authoritative.
# Delivery safety foundation

Until a release workflow is proven against the current active polyrepo estate, it must be disabled rather than
retain environment credentials or automatic triggers. Re-enablement requires immutable build-once artifacts,
SBOM/provenance/signature evidence, an owner-approved release manifest, staging migration and critical-journey
rehearsal, protected human production approval, health/SLO and reconciliation gates, and a tested rollback or
roll-forward path. FND-P0-007 is the controlling remediation item.

