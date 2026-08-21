# Design Platform Traceability

| Requirement | Architecture/control | Implementation evidence | Test evidence | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| DS-BR-001 | owned lifecycle/state model | `design-system`, `storybook`, `framework` inspected | not fully mapped | UNVERIFIED | generate lifecycle inventory |
| DS-BR-002 | tenant/audit controls | relevant source signals observed | coverage not proven | PARTIAL | map isolation and audit tests |
| DS-FR-001 | platform service/UI flow | implementation files observed | test inventory counted | UNVERIFIED | inspect behavioral assertions |
| DS-API-001 | published schemas and errors | package/controller/type signals observed | contract coverage not mapped | PARTIAL | generate endpoint-contract matrix |
| DS-SEC-001 | IAM policy enforcement | auth/guard usage not fully inventoried | negative tests not mapped | UNVERIFIED | create permission matrix |
| DS-UX-004 | shared design/accessibility | UI dependency/use not fully measured | workflow evidence not mapped | UNVERIFIED | run consumer and a11y audit |
| DS-NFR-005 | retention/recovery controls | operational files observed where noted | recovery exercise not mapped | UNVERIFIED | define targets and evidence |

Inspected baseline: Design system has 200 implementation files/30 tests; Storybook 8/3 visual tooling; framework 22/3 with API client, navigation, permissions and provider context.

## Requirement coverage gaps

These requirements are linked to their owning architecture and live repository baseline, but behavioral proof has not yet been mapped. They remain gaps, not implemented claims.

| Requirement | Architecture/control | Implementation evidence | Test evidence | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| DS-API-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-BR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-BR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-BR-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-DATA-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-FR-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-FR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-FR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-FR-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-INT-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-INT-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-NFR-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-NFR-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-NFR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-NFR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-SEC-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-SEC-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-SEC-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-SEC-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-UX-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-UX-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-UX-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-UX-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |



