<!--
  This repository is the landing page and the map: documentation and CI only.
  Changes to API, web, data or any other code belong in the repository that owns
  them — see CONTRIBUTING.md § Which repository am I changing?
-->

## What this changes

<!-- One or two sentences. What is different after this merges? -->

## Why

<!--
  The reason, not the restatement. If it fixes an issue, link it with
  "Closes #123". If it corrects something inaccurate, say what was inaccurate —
  that is the part a reviewer cannot reconstruct.
-->

## Checklist

- [ ] I ran `bash scripts/sync-profile.sh` if I edited `README.md` or `ARCHITECTURE.md`
- [ ] Every link I added resolves (CI link-checks, but confirming locally is faster)
- [ ] The commit subject is a lower-case conventional commit under 100 characters
- [ ] I have not claimed a capability the project does not currently have

<!--
  That last box is the one that matters most here. This repository's job is to
  describe the platform accurately to someone deciding whether to trust it. A
  README that oversells is a defect, and it is the defect this project is most
  prone to producing.
-->

<!-- UniERP-AI-PR-Attestation: 1.1.0 -->
## Outcome

<!-- What behavior is different after merge, in user/business terms? -->

## Protocol status

- Protocol version: `1.1.0`
- Risk class: `R0 | R1 | R2 | R3`
- Final cycle status: `DONE | PARTIAL | BLOCKED | FAILED | NOT STARTED | NOT VERIFIED`
- Accountable platform(s):
- Change contract/requirement IDs:
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

## Verification

| Status | Working directory | Exact command | Result |
| --- | --- | --- | --- |
| `PASS | FAIL | NOT RUN` |  |  |  |

## Strict attestation

- [ ] I did not use `DONE` while any required criterion, artifact, consumer, migration, approval, check,
      documentation, traceability, rollback, or high-severity issue remains.
- [ ] All failures and required unrun checks are listed without euphemism.
- [ ] Designed, implemented, tested, integrated, deployed, and released are independently evidenced.
- [ ] The final diff was reviewed for scope, secrets, security, data, contracts, and test bypasses.
- [ ] No AI or subagent claim is treated as evidence without independent inspection.
