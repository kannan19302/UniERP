> **Migration status:** Distinct legacy infrastructure variant retained for reconciliation with the main migrated incident runbook.

# Incident Response Runbook

## Scope

This runbook defines the process for responding to incidents within the UniERP environment, including the Extension Platform and Marketplace.

## Roles

- **Incident Commander (IC)**: Coordinates the response.
- **Communications Lead**: Handles internal and external messaging.
- **Operations Lead**: Primary investigator.

## Severity

| Severity | Meaning | Response |
| :------- | :------ | :------- |
| SEV-1 | Total loss of a customer journey (e.g. login down) | On-call immediately; IC declares the incident in Slack (#incidents). |
| SEV-2 | Partial degradation; error budget burning | Page on-call; escalate if budget is > 50% consumed. |
| SEV-3 | Cosmetic / low impact | Normal queue; fix in the next release. |

## Alert routing

Every SLO breach is routed to a delivery destination by `alerting/alert-routing.json` — the SLO →
receiver table, one entry per SLO in `docs/runbooks/SLO-DEFINITIONS.yaml`. The routing table is the
single source of truth: **an SLO with no route is an alert that can never reach an on-call engineer.**

- **Delivery contract**: a POST JSON event carrying `slo_id`, `severity`, `error_budget_consumed_pct`,
  `fired_at` and `runbook`. The destination acks with HTTP 200; a non-ack is a failed delivery.
- **Production destination**: PagerDuty events API v2 → on-call rotation, broadcast to Slack
  #incidents. The rehearsal receiver (`scripts/webhook-receiver.mjs`) enforces exactly this contract
  locally, so a rehearsal proves the route and the payload — not PagerDuty's uptime.
- **Unrouted SLOs are build failures**: `scripts/rehearse-alert-routing.mjs` exits 1 if an SLO has no
  route, and the nightly `alert-routing-rehearsal` workflow fails loudly.

Delivered alerts are rehearsed, not assumed — see [Rehearsal log](#rehearsal-log).

## Procedure

1. **Declare the Incident**: In Slack (#incidents).
2. **Triage**: Determine severity (SEV-1 to SEV-3); open the playbook section below that the SLO's runbook link points at.
3. **Mitigate**: Apply temporary fixes to restore service.
4. **Resolve**: Deploy permanent fix.
5. **Post-Mortem**: Document root cause within 48 hours.

## SLO response playbooks

### Login failure

Applies to `slo-login` (`POST /api/v1/auth/login`). 50% budget consumed ⇒ warning; 90% consumed ⇒ feature work pauses.

1. Confirm OIDC/token-exchange failures on the IDP (`POST /api/v1/auth/*` error rate).
2. Check the session store and the IDP secret rotation window.
3. If the IDP is unhealthy, roll back the last IDP deploy; otherwise fail over per the identity provider runbook.
4. Verify restoration with a login test before declaring resolved.

### Read-path failure

Applies to `slo-list-documents` (`GET /api/v1/documents`). Availability 99.9%, P99 1.5 s.

1. Confirm document listing latency and error rate per tenant (see the per-tenant SLO dashboard).
2. The read path depends on DB replicas — check replica lag and PgBouncer pool saturation.
3. Mitigate by scaling read replicas or failing over per the database failover runbook.

### Finance transaction failure

Applies to `slo-post-transaction` (`POST /api/v1/finance/transactions`). Money path — 25% budget
consumed already escalates; 75% escalates to the CTO.

1. Confirm journal entry / GL posting failures.
2. Verify the GL posting queue and ledger consistency (Decimal(19,4) arithmetic — no float paths).
3. If a batch is stuck, pause ingestion, drain the outbox in order, then resume.
4. Any duplicate risk ⇒ quarantine the affected batch before re-running.

### Report failure

Applies to `slo-run-report` (`POST /api/v1/reporting/reports/run`). Reporting tolerates a higher
budget; P99 30 s.

1. Confirm report generation failures / timeouts.
2. Check the reporting read-replica and long-running query load.
3. Mitigate by throttling ad-hoc report runs and scaling the read replica.

### Tenant provision failure

Applies to `slo-provision-tenant` (`POST /api/platform/v1/tenants`). Control-plane path, operator-facing.

1. Confirm tenant creation failures in the platform API.
2. Check RLS policy creation and schema-migration state for the new tenant.
3. Mitigate by rolling back the partially provisioned tenant and retrying.

## Rehearsal log

Appended by `scripts/rehearse-alert-routing.mjs` — a synthetic SLO error-budget breach fired through `alerting/alert-routing.json` and delivered to the configured webhook receiver, timed (time-to-detect). Latest rehearsal is the current row.

| When (UTC) | SLO | Severity | Breach | Time-to-detect | Destination | Result |
| :--------- | :-- | :------- | :----- | :------------- | :---------- | :----- |
| 2026-08-08 03:37:57 | slo-login | critical | 90% | 35 ms | http://127.0.0.1:9199/webhook | PASS |
| 2026-08-08 03:38:27 | slo-post-transaction | critical | 90% | 34 ms | http://127.0.0.1:9199/webhook | PASS |
| 2026-08-08 04:15:54 | slo-login | critical | 90% | 34 ms | http://127.0.0.1:9199/webhook | PASS |
