# AI-Assisted Change Attestation

Include this section in every pull request created or materially implemented by an AI agent.

## Protocol and status

- Protocol version: `1.1.0`
- Risk class: `R0 | R1 | R2 | R3`
- Final cycle status: `DONE | PARTIAL | BLOCKED | FAILED | NOT STARTED | NOT VERIFIED`
- Accountable platform(s):
- Change contract:
- Completed acceptance criteria:
- Incomplete acceptance criteria:
- Next required action:
- If status is not `DONE`: **This is not done.**

## Claim states

| Claim | State | Evidence |
| --- | --- | --- |
| Designed | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Implemented | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Tested | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Integrated | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Deployed | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |
| Released | `YES | NO | PARTIAL | NOT VERIFIED | NOT APPLICABLE` |  |

## Evidence

| Status | Working directory | Exact command | Result |
| --- | --- | --- | --- |
| `PASS | FAIL | NOT RUN` |  |  |  |

## Strict attestation

- [ ] The status is not `DONE` if any required criterion, artifact, consumer, migration, approval, gate,
      documentation, traceability, rollback, or high-severity issue remains.
- [ ] All failures and required unrun checks are listed without euphemism.
- [ ] No designed/implemented/tested/integrated/deployed/released state is inferred from another.
- [ ] The final diff was reviewed for scope, secrets, security, data, contracts, and test bypasses.
- [ ] No AI or subagent claim is used as evidence without independent inspection.

