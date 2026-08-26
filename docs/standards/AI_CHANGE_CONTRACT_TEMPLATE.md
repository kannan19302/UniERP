# AI Change Contract and Evidence Record

Copy this template into a task artifact or pull-request description for every R2/R3 change. Keep it concise but
do not omit a section; write `None — <reason>` when a dimension was assessed and does not apply.

## Cycle status — mandatory on every iteration and handoff

- Status: `DONE | PARTIAL | BLOCKED | FAILED | NOT STARTED | NOT VERIFIED`
- Cycle objective:
- Completed this cycle:
- Incomplete this cycle:
- Verification evidence:
- Next required action:
- Required honesty statement: `This is not done` unless status is `DONE`.

| Claim | State | Evidence |
| --- | --- | --- |
| Designed | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Implemented | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Tested | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Integrated | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Deployed | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Released | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |

## 1. Request and outcome

- Human request:
- User/business outcome:
- In scope:
- Out of scope:
- Acceptance criteria:

## 2. Authority and ownership

- Risk class: `R0 | R1 | R2 | R3`
- Accountable platform(s):
- Contract/data owner(s):
- Applicable requirement IDs:
- Applicable ADRs and standards:
- Repositories/consumers affected:
- Existing artifacts searched before creating anything new:
- Instruction or authority conflicts:

## 3. Decisions and assumptions

- Inspected facts:
- Material assumptions:
- Human decisions received:
- Restricted actions and exact authorization status:

## 4. Change design

- Current behavior:
- Intended behavior:
- Invariants and transaction boundary:
- Failure/degraded/retry/reconciliation behavior:
- Concurrency and idempotency:
- Contract/version/consumer impact:
- Schema/migration/backfill impact:
- Authentication/permission/tenant/record scope:
- Data classification, privacy, retention, residency, erasure, and audit:
- UI states, design-system impact, accessibility, localization, and responsive behavior:
- Observability, performance budget, capacity, and operational impact:
- Dependencies, licenses, provenance, and supply-chain impact:

## 5. Delivery safety

- Feature flag or staged rollout:
- Compatibility window:
- Rollback or roll-forward:
- Data recovery/reconciliation:
- Owners/runbooks/dashboards affected:

## 6. Verification plan

| Claim or requirement | Proof boundary | Test/check command | Expected result |
| --- | --- | --- | --- |
|  |  |  |  |

Required adversarial cases:

- invalid and boundary input:
- unauthenticated/unauthorized/record-scope denial:
- tenant A/tenant B/no-context isolation:
- duplicate/retry/concurrency:
- dependency failure/timeout/degraded behavior:
- migration forward/recovery/production-shaped volume:
- keyboard/screen reader/zoom/reflow where user-facing:

## 7. Completion evidence

### Final status

- Status: `DONE | PARTIAL | BLOCKED | FAILED | NOT STARTED | NOT VERIFIED`
- Completed acceptance criteria:
- Incomplete acceptance criteria:
- Is this done? `YES | NO`
- If no: **This is not done.**

### Outcome


### Changed platforms, repositories, and important files


### Impact assessment

- Contracts/API/events/SDK:
- Database/migration/data lifecycle:
- Authentication/authorization/tenant isolation/security/privacy:
- UI/UX/accessibility/localization:
- Operations/observability/performance/resilience:
- Dependencies/supply chain:

### Verification

| Status | Working directory | Exact command | Evidence/result |
| --- | --- | --- | --- |
| `PASS | FAIL | NOT RUN` |  |  |  |

### Compatibility and delivery

- Backward compatibility:
- Rollout/feature flag:
- Migration/backfill:
- Rollback/roll-forward:

### Remaining risk and human action

- Pre-existing failures:
- Residual risks:
- Unverified assumptions:
- Human actions/approvals still required:
