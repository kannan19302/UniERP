# Data Lifecycle, Retention and Deletion Standard

## Lifecycle classes

- `ACTIVE`: available for normal business use.
- `SOFT_DELETED`: hidden from normal use but retained for recovery/audit.
- `ERASURE_PENDING`: access restricted while legal, dependency and retention checks execute.
- `ANONYMIZED`: identifying data irreversibly removed while allowed business/audit structure remains.
- `ARCHIVED`: retained in controlled lower-cost storage.
- `PURGED`: physically removed, subject to backup expiry and required evidence.

## Inspected legacy defaults

| Data class | Declared default | Status |
| --- | --- | --- |
| Read/archived notifications | 180 days | UNVERIFIED enforcement |
| Audit/change history | 730 days | UNVERIFIED; tenant/legal requirements may lengthen |
| Webhook delivery logs | 90 days | UNVERIFIED |
| Expired sessions | 30 days after expiry | UNVERIFIED |
| Terminal background jobs | 90 days | UNVERIFIED |

Business records, statutory retention, PII erasure, files, outbox and backups require separate explicit policy;
they must not inherit the operational-log defaults.

## Requirements

- `STD-DATA-001`: Every persistent type shall declare owner, classification, legal basis, retention clock and terminal action.
- `STD-DATA-002`: Posted/approved business documents shall use reversal/amendment, not silent deletion.
- `STD-DATA-003`: Erasure shall account for references, audit, legal hold, replicas, caches, exports and backup expiry.
- `STD-DATA-004`: Retention jobs shall support dry-run, scoped execution, idempotency, metrics and audit evidence.
- `STD-DATA-005`: Soft-delete bypass shall require an explicit privileged API; caller-supplied `undefined` is not an authorization mechanism.
- `STD-DATA-006`: New schemas and migrations shall include lifecycle/index/isolation behavior and tests.

The legacy deletion document cited `packages/database/src/soft-delete.ts`, a path not aligned with the current
polyrepo layout; its model list and bypass behavior must be verified against `data` and `api` before adoption.
