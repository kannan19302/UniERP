# Change Contract — FND-P0-006 Durable Audit and Atomic Events

## Cycle status

- Status: `PARTIAL`
- Objective: make best-effort audit loss observable and blocking while the platform is converged on transactional audit and outbox writes.
- Risk class: `R3` — audit integrity, tenant data and asynchronous delivery span PLT-BIZ, PLT-IAM, PLT-DATA and PLT-OPS.
- Scope: active API and Identity production TypeScript source; source patterns that suppress failures after an audit write.
- Out of scope: a false claim that source scanning proves database append-only enforcement, transaction atomicity or consumer recovery.

## Current conflict

The active estate contains duplicate `emitAuthAudit` helpers that catch and only warn after `AuditLog` persistence fails. Several developer-platform lifecycle services likewise catch `DeveloperAuditEvent` write failures and continue. This contradicts the mandatory-audit invariant: loss must not silently turn a required audit record into best effort. The existing outbox runtime has useful leasing, retry and delivery primitives, but adoption is not universal and audit writes are not consistently in the same transaction as the state transition.

## Design

`check-durable-audit-and-outbox.mjs` derives active API/IDP source from the active-estate catalog and fails on caught audit-write paths that continue via logging, comments or `null` return rather than propagating the failure. Synthetic fixtures prove both the throwing and suppression paths. It intentionally has no baseline or suppression list.

This control is a temporary truth gate, not the final architecture. The required end state is: mandatory business/security change + immutable audit + versioned outbox event commit in one database transaction; consumers are idempotent, retryable, dead-lettered, replayable and reconciled. Each exception to synchronous failure must use a durable, transactionally written audit/outbox record with an accountable owner and recovery SLO.

## Required next implementation

1. Publish the mandatory-audit event catalog, ownership and retention/legal-hold classification.
2. Replace each detected suppression with a transaction participant or durable queued record; remove duplicated helper implementations through an owned platform primitive.
3. Add immutable/tamper-evident schema enforcement, fault-injection and replay/reconciliation proof against the NOBYPASSRLS application role.
4. Extend inventory to jobs, workers, consumers and control-plane sources before making the gate required in CI.

> **This is not done.** The checker prevents silent regression in a known unsafe pattern; it does not itself make existing audit/event paths durable.
