# AI Agent Protocol Conformance Ledger

This is the append-only template for evidence-backed protocol conformance. It does not certify a provider or model.
Each row applies only to the named cycle, scope, protocol version, and inspected evidence. Store detailed logs in
the owning task/PR evidence location and link them; never paste secrets, personal data, or enormous logs here.

## Required record

| Field | Required value |
| --- | --- |
| Cycle ID | Stable task/PR/work-packet identifier |
| Date/time | UTC timestamp |
| Protocol version | Exact loaded marker |
| Runtime/provider | Product/runtime and provider; model identifier when available |
| Scope | Repositories, work packet, and acceptance-criteria denominator |
| Risk | R0/R1/R2/R3 and approval reference where required |
| Instruction evidence | Loaded entrypoint/canonical version diagnostics or runtime reference |
| Final status | Exactly one permitted cycle status |
| Completed/incomplete | Explicit lists; include “This is not done” when applicable |
| Claim states | Designed/implemented/tested/integrated/deployed/released with evidence |
| Verification | Exact commands and PASS/FAIL/NOT RUN results |
| Corrections | Earlier overstatements corrected during the cycle |
| Coordinator review | Human/coordinating-agent diff review reference |
| Residual risk/next action | Named owner and next required action |

## Records

No conformance records have been added yet. This absence means runtime conformance remains `UNVERIFIED`; the
existence of the protocol, entrypoints, or validator is not evidence that an agent followed it during a task.

