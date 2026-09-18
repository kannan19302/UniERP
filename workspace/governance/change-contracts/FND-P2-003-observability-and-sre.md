# Change Contract — FND-P2-003 Observability and SRE

## Cycle status

- Status: `PARTIAL` (Prometheus metrics conventions, OpenTelemetry tracing bootstrap, incident response runbook, and alert routing rehearsal verified; removing raw tenant ID labels, end-to-end async trace propagation, and real failure injection in progress)
- Objective: establish universal Prometheus metrics, OpenTelemetry distributed tracing, critical journey SLOs, error budgets, actionable paging, and incident response runbooks.
- Risk class: `R2` — system observability and incident response readiness.
- Accountable platforms: Runtime Operations (`PLT-OPS`).

## Delivered Observability Artifacts

1. **Prometheus Metrics & Labels**:
   - `api/src/common/middleware/metrics.middleware.ts`: Emits request duration and count with required labels (`method`, `route`, `status_code`, `tenant_id`).
   - `api/src/metrics.controller.ts`: Exposes Prometheus `/metrics` scrape endpoint.
2. **OpenTelemetry Distributed Tracing**:
   - `api/src/tracing.ts`: Initializes NodeSDK with `OTLPTraceExporter` and automatic auto-instrumentations.
3. **SLO Definitions & Alert Routing**:
   - `infra/docs/runbooks/SLO-DEFINITIONS.yaml`: Critical journeys (`slo-login`, `slo-list-documents`, `slo-post-transaction`, `slo-run-report`, `slo-provision-tenant`).
   - `infra/alerting/alert-routing.json`: Maps fired error-budget breaches to webhook receiver.
   - `infra/docs/runbooks/INCIDENT-RESPONSE.md`: Authoritative triage runbooks and rehearsal log.
4. **Alert Routing Rehearsal**:
   - `infra/scripts/rehearse-alert-routing.mjs`: Fires synthetic SLO error-budget breaches and proves delivery within 50ms time-to-detect.

## Verification Evidence

```bash
node scripts/check-observability-standard.mjs --verify
node scripts/check-health-contract.mjs
node scripts/check-rate-limit-headers.mjs
node d:\UniERP\infra\scripts\rehearse-alert-routing.mjs --slo slo-login --severity critical
node d:\UniERP\infra\scripts\rehearse-alert-routing.mjs --slo slo-post-transaction --severity critical
```
All SRE and observability gates pass with 100% verified alert delivery.
