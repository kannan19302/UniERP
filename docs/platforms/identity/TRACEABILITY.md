# Identity Platform Traceability

| Requirement | Architecture/control | Implementation evidence | Test evidence | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| IAM-BR-001 | owned lifecycle/state model | `idp`, `auth` inspected | not fully mapped | UNVERIFIED | generate lifecycle inventory |
| IAM-BR-002 | tenant/audit controls | relevant source signals observed | coverage not proven | PARTIAL | map isolation and audit tests |
| IAM-FR-001 | platform service/UI flow | implementation files observed | test inventory counted | UNVERIFIED | inspect behavioral assertions |
| IAM-API-001 | published schemas and errors | package/controller/type signals observed | contract coverage not mapped | PARTIAL | generate endpoint-contract matrix |
| IAM-SEC-001 | IAM policy enforcement | auth/guard usage not fully inventoried | negative tests not mapped | UNVERIFIED | create permission matrix |
| IAM-UX-004 | shared design/accessibility | UI dependency/use not fully measured | workflow evidence not mapped | UNVERIFIED | run consumer and a11y audit |
| IAM-NFR-005 | retention/recovery controls | operational files observed where noted | recovery exercise not mapped | UNVERIFIED | define targets and evidence |

Inspected baseline: IDP has 135 implementation files/26 tests with auth, OAuth, SSO, OIDC authorization/token/session, signing keys, platform entitlements and agent delegation. Auth package has token/session types and 2 tests.

## Requirement coverage gaps

These requirements are linked to their owning architecture and live repository baseline, but behavioral proof has not yet been mapped. They remain gaps, not implemented claims.

| Requirement | Architecture/control | Implementation evidence | Test evidence | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| IAM-API-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-BR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-BR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-BR-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-DATA-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-FR-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-FR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-FR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-FR-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-INT-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-INT-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-NFR-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-NFR-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-NFR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-NFR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-SEC-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-SEC-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-SEC-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-SEC-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-SEC-012 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-UX-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-UX-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-UX-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| IAM-UX-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |



