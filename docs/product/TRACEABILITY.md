# UniERP Product Traceability

| Business/system requirement | Owning platform/control | Implementation evidence | Test evidence | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| UNI-BR-001 / UNI-NFR-001 | Identity + Business Services + all tenant clients | tenant context/guards, schemas and clients observed | isolation-named tests observed | PARTIAL | complete endpoint/table/job/export coverage |
| UNI-BR-002 | PAO, Tenant Admin, Tenant Apps boundaries | separate applications exist | no full boundary matrix proven | PARTIAL | tenant-admin `super-admin` contradiction |
| UNI-BR-003 | Business Services domain modules/outbox | finance/inventory/procurement/sales/outbox observed | journey tests observed | UNVERIFIED | inspect atomicity/reconciliation assertions |
| UNI-BR-005 | Developer Platform + Marketplace | extension API, signed bundles, sandbox, registry observed | sandbox/extension tests observed | PARTIAL | publishing/install/revocation E2E |
| UNI-NFR-004 | Runtime Operations | health/infra/load/runbook assets observed | rehearsal evidence incomplete | GAP | define SLO/RTO/RPO per critical journey |
| UNI-NFR-005 | Contracts + Developer Platform | version lifecycle types and legacy policy observed | compatibility gate unverified | PARTIAL | source-derived consumer/provider matrix |
| UNI-NFR-006 | Design Platform + clients | components and legacy conformance claims observed | current scoped reports absent | GAP | automated/manual workflow evidence |
| UNI-NFR-008 | Runtime Operations | workflows/scripts exist across repositories | full release/rollback proof absent | UNVERIFIED | deployment inventory and exercises |

Detailed requirement mappings live in each platform `TRACEABILITY.md`. Generated Business Services evidence
includes module orientations, permission matrix, event flow and direct dependency graph.

## Requirement coverage gaps

These requirements are linked to their owning architecture and live repository baseline, but behavioral proof has not yet been mapped. They remain gaps, not implemented claims.

| Requirement | Architecture/control | Implementation evidence | Test evidence | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| UNI-API-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-API-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-BR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-BR-006 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-BR-007 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-DATA-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-DATA-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-FR-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-FR-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-FR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-FR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-FR-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-FR-006 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-FR-007 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-FR-008 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-INT-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-INT-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-INT-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-INT-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-NFR-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-NFR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-NFR-007 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-NFR-009 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-NFR-010 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-OPS-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-OPS-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-OPS-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-OPS-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-OPS-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-OPS-006 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-OPS-007 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-OPS-008 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-SEC-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-SEC-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-SEC-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-SEC-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-SEC-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-SEC-006 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-SEC-007 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-SEC-008 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-UX-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-UX-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-UX-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-UX-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-UX-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-UX-006 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-UX-007 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| UNI-UX-008 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |



