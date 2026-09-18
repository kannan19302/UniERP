# Incident Response Runbooks — UniERP Platform

Authoritative runbook procedures for on-call SREs and engineering responders.

---

## login-failure

### Description
User Authentication Journey (`slo-login`) error budget breach. Users are unable to complete OIDC / OAuth 2.1 token exchange or create active sessions.

### Immediate Triage Steps
1. Check Identity Provider service health: `docker logs idp --tail 100`.
2. Verify Redis cluster availability for session caches: `docker exec redis redis-cli ping`.
3. Check PostgreSQL database connectivity and connection pool metrics for `idp` and `auth`.
4. Inspect certificate expiration and JWKS endpoint: `curl -sSf http://idp:3005/oidc/jwks.json`.
5. If token signature failures spike, verify KMS keyring and active encryption keys.

---

## read-path-failure

### Description
Document and tenant record listing journey (`slo-list-documents`) error budget breach. Read requests are failing or exceeding latency bounds.

### Immediate Triage Steps
1. Check API read path errors: `docker logs api --tail 100`.
2. Check database query performance and lock contention: inspect `pg_stat_activity` on PostgreSQL.
3. Verify RLS policy evaluation times on `documents` table.
4. Scale read replica pools or recycle stale connections if pool is saturated.

---

## finance-transaction-failure

### Description
Post Financial Transaction journey (`slo-post-transaction`) error budget breach. General ledger journal posting or financial transactions failing.

### Immediate Triage Steps
1. Verify database write availability and transaction isolation locks.
2. Check for optimistic concurrency rollbacks on double-entry balances.
3. Verify outbox event dispatch status: inspect `outbox_deliveries` where `status = 'DEAD_LETTER'`.
4. Pause asynchronous financial batch processors if ledger divergence is suspected.

---

## report-failure

### Description
Reporting and analytics generation journey (`slo-run-report`) error budget breach.

### Immediate Triage Steps
1. Check asynchronous reporting worker queues in BullMQ.
2. Verify object storage (MinIO/S3) bucket availability and upload credentials.
3. Terminate runaway long-running query processes.

---

## tenant-provision-failure

### Description
Tenant Onboarding and Provisioning journey (`slo-provision-tenant`) error budget breach.

### Immediate Triage Steps
1. Check tenant admin orchestration logs.
2. Verify database migration runner status for tenant schema initialization.
3. Check default organization, ledger, and role template seeds.

---

## Rehearsal log

Appended by `scripts/rehearse-alert-routing.mjs` — a synthetic SLO error-budget breach fired through `alerting/alert-routing.json` and delivered to the configured webhook receiver, timed (time-to-detect). Latest rehearsal is the current row.

| When (UTC) | SLO | Severity | Breach | Time-to-detect | Destination | Result |
| :--------- | :-- | :------- | :----- | :------------- | :---------- | :----- |
| 2026-08-08 03:37:57 | slo-login | critical | 90% | 35 ms | http://127.0.0.1:9199/webhook | PASS |
| 2026-08-08 03:38:27 | slo-post-transaction | critical | 90% | 34 ms | http://127.0.0.1:9199/webhook | PASS |
| 2026-08-08 04:15:54 | slo-login | critical | 90% | 34 ms | http://127.0.0.1:9199/webhook | PASS |
| 2026-09-03 03:40:34 | slo-login | critical | 90% | 54 ms | http://127.0.0.1:9199/webhook | PASS |
| 2026-09-03 03:41:02 | slo-login | critical | 90% | 48 ms | http://127.0.0.1:9199/webhook | PASS |
| 2026-09-03 03:41:06 | slo-post-transaction | critical | 90% | 47 ms | http://127.0.0.1:9199/webhook | PASS |
| 2026-09-03 11:54:01 | slo-login | critical | 90% | 53 ms | http://127.0.0.1:9199/webhook | PASS |
| 2026-09-03 11:54:01 | slo-post-transaction | critical | 90% | 60 ms | http://127.0.0.1:9199/webhook | PASS |
| 2026-09-03 13:45:53 | slo-login | critical | 90% | 57 ms | http://127.0.0.1:9199/webhook | PASS |
| 2026-09-03 13:45:53 | slo-post-transaction | critical | 90% | 54 ms | http://127.0.0.1:9199/webhook | PASS |