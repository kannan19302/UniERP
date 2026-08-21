# Data and Business Services Traceability

| Requirement | Architecture/control | Implementation evidence | Test evidence | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| BIZ-BR-001 | owned lifecycle/state model | `api`, `data`, `unierp-contracts` inspected | not fully mapped | UNVERIFIED | generate lifecycle inventory |
| BIZ-BR-002 | tenant/audit controls | relevant source signals observed | coverage not proven | PARTIAL | map isolation and audit tests |
| BIZ-FR-001 | platform service/UI flow | implementation files observed | test inventory counted | UNVERIFIED | inspect behavioral assertions |
| BIZ-API-001 | published schemas and errors | package/controller/type signals observed | contract coverage not mapped | PARTIAL | generate endpoint-contract matrix |
| BIZ-SEC-001 | IAM policy enforcement | auth/guard usage not fully inventoried | negative tests not mapped | UNVERIFIED | create permission matrix |
| BIZ-UX-004 | shared design/accessibility | UI dependency/use not fully measured | workflow evidence not mapped | UNVERIFIED | run consumer and a11y audit |
| BIZ-NFR-005 | retention/recovery controls | operational files observed where noted | recovery exercise not mapped | UNVERIFIED | define targets and evidence |

Inspected baseline: API has 2,192 implementation files/577 test files across 45 modules; data has 313/9 with extensive Prisma schemas; contracts has 90/43 including versioning, audit and backup/restore types.

## Requirement coverage gaps

These requirements are linked to their owning architecture and live repository baseline, but behavioral proof has not yet been mapped. They remain gaps, not implemented claims.

| Requirement | Architecture/control | Implementation evidence | Test evidence | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| BIZ-API-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-BR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-BR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-BR-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-DATA-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-FR-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-FR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-FR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-FR-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-INT-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-INT-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-NFR-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-NFR-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-NFR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-NFR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-SEC-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-SEC-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-SEC-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-SEC-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-UX-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-UX-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-UX-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| BIZ-UX-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |



