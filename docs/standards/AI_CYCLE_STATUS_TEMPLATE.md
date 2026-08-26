# AI Development Cycle Status

Use at the end of every implementation/review iteration and handoff. Select exactly one status. Do not delete
unfavorable fields.

- Protocol version: `1.1.0`
- Status: `DONE | PARTIAL | BLOCKED | FAILED | NOT STARTED | NOT VERIFIED`
- Cycle objective:
- Completed:
- Incomplete:
- Acceptance criteria satisfied: `<count>/<explicit total>`
- Verification `PASS`:
- Verification `FAIL`:
- Verification `NOT RUN` and reason:
- Next required action:
- Exact blocker and unblock condition, if `BLOCKED`:
- Correction of any earlier overstatement:

Claim states—each requires its own evidence:

| Claim | State | Evidence |
| --- | --- | --- |
| Designed | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Implemented | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Tested | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Integrated | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Deployed | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Released | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |

If status is not `DONE`, include this exact sentence:

> **This is not done.**

`DONE` attestation:

- [ ] Every in-scope acceptance criterion is satisfied.
- [ ] Every required artifact is complete.
- [ ] Every required check passed; there are no required `FAIL` or `NOT RUN` results.
- [ ] The final diff was reviewed for scope, security, data, contracts, tests, and secrets.
- [ ] No required consumer, migration, approval, rollback, documentation, or traceability work remains.
- [ ] No unresolved high-severity risk remains.
- [ ] The completion report contains only evidence-backed claims.

If any box is unchecked, status MUST NOT be `DONE`.
