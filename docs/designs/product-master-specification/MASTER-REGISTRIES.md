# 0.6 Central Master Registries

All twenty registries are established below. Functional records are allocated during detailed chapters after inspection of owning catalogs. Empty registries are explicit authoring gaps, not hidden claims of completion. Product records live in [Volume 0](VOLUME-00-MASTER-INDEX-AND-GOVERNANCE.md); application and module records live in the [Application Registry](APPLICATION-REGISTRY.md).

## 0.6.1 Product Registry

ID convention: `PMS-PRD-{scope}`. Record location/state: Volume 0 section 0.4. Required fields: name; accountable platform; purpose; decision status.

## 0.6.2 Application Registry

ID convention: `PMS-APP-{scope}-{NNN}`. Record location/state: APPLICATION-REGISTRY.md. Required fields: product; name; owner; decision status; authoring state; release.

## 0.6.3 Module Registry

ID convention: `PMS-MOD-{scope}-{appNNN}-{NNN}`. Record location/state: APPLICATION-REGISTRY.md. Required fields: application; name; capability boundary; status.

## 0.6.4 Feature Registry

ID convention: `PMS-FEA-{scope}-{NNNNNN}`. Record location/state: Marketing records in VOLUME-03-MARKETING-FEATURES.md; other products pending. Required fields: module; all source section 9 fields; requirements; tests.

| ID | Name | Owner | Decision status | Source/evidence | Related IDs |
| --- | --- | --- | --- | --- | --- |

Detailed specification and owner-catalog reconciliation remain pending unless records are linked by the allocation index below.

## 0.6.5 Screen Registry

ID convention: `PMS-SCR-{scope}-{NNNNNN}`. Record location/state: Marketing records in Volume 3 section 3.2; other products pending. Required fields: route; personas; components; actions; states; permissions; APIs.

| ID | Name | Owner | Decision status | Source/evidence | Related IDs |
| --- | --- | --- | --- | --- | --- |

Detailed specification and owner-catalog reconciliation remain pending unless records are linked by the allocation index below.

## 0.6.6 Role Registry

ID convention: `PMS-ROL-{scope}-{NNNNNN}`. Record location/state: Proposed Marketing role definitions in Volume 3 section 3.3; no runtime grants asserted. Required fields: persona; authority plane; assignment scope; permission links; separation of duties.

| ID | Name | Owner | Decision status | Source/evidence | Related IDs |
| --- | --- | --- | --- | --- | --- |

Detailed specification and owner-catalog reconciliation remain pending unless records are linked by the allocation index below.

## 0.6.7 Permission Registry

ID convention: `PMS-PER-{scope}-{NNNNNN}`. Record location/state: Proposed Marketing permission semantics in Volume 3 section 3.3; runtime reconciliation pending. Required fields: canonical permission reference; action; resource; tenant/record predicate; deny behavior.

| ID | Name | Owner | Decision status | Source/evidence | Related IDs |
| --- | --- | --- | --- | --- | --- |

Detailed specification and owner-catalog reconciliation remain pending unless records are linked by the allocation index below.

## 0.6.8 Entity Registry

ID convention: `PMS-ENT-{scope}-{NNNNNN}`. Record location/state: Marketing conceptual entities in Volume 3 section 3.4; physical schema reconciliation pending. Required fields: owner; aggregate; keys; relationships; RLS; classification; lifecycle.

| ID | Name | Owner | Decision status | Source/evidence | Related IDs |
| --- | --- | --- | --- | --- | --- |

Detailed specification and owner-catalog reconciliation remain pending unless records are linked by the allocation index below.

## 0.6.9 API Registry

ID convention: `PMS-API-{scope}-{NNNNNN}`. Record location/state: Marketing proposed operations in Volume 3 section 3.5; published-contract reconciliation pending. Required fields: published operation; version; authorization; input/output; errors; consumers.

| ID | Name | Owner | Decision status | Source/evidence | Related IDs |
| --- | --- | --- | --- | --- | --- |

Detailed specification and owner-catalog reconciliation remain pending unless records are linked by the allocation index below.

## 0.6.10 Event Registry

ID convention: `PMS-EVT-{scope}-{NNNNNN}`. Record location/state: Marketing proposed event records in Volume 3 section 3.6.1; published schemas pending. Required fields: schema; producer; consumers; envelope; retry; atomic outbox.

| ID | Name | Owner | Decision status | Source/evidence | Related IDs |
| --- | --- | --- | --- | --- | --- |

Detailed specification and owner-catalog reconciliation remain pending unless records are linked by the allocation index below.

## 0.6.11 Integration Registry

ID convention: `PMS-INT-{scope}-{NNNNNN}`. Record location/state: Marketing owner integration contracts in Volume 3 section 3.6.2; no vendor purchase commitments. Required fields: owner; contract; secret reference; egress; limits; recovery.

| ID | Name | Owner | Decision status | Source/evidence | Related IDs |
| --- | --- | --- | --- | --- | --- |

Detailed specification and owner-catalog reconciliation remain pending unless records are linked by the allocation index below.

## 0.6.12 Workflow Registry

ID convention: `PMS-WFL-{scope}-{NNNNNN}`. Record location/state: Journey-level records allocated in Volume 2 section 2.10.2; executable feature depth remains pending. Required fields: trigger; states; transaction; compensation; audit; tests.

| ID | Name | Owner | Decision status | Source/evidence | Related IDs |
| --- | --- | --- | --- | --- | --- |

Detailed specification and owner-catalog reconciliation remain pending unless records are linked by the allocation index below.

## 0.6.13 Notification Registry

ID convention: `PMS-NTF-{scope}-{NNNNNN}`. Record location/state: Marketing notification specifications in Volume 3 section 3.6.2; actual localized templates pending. Required fields: trigger; audience; consent; channel; locale; deduplication; retries.

| ID | Name | Owner | Decision status | Source/evidence | Related IDs |
| --- | --- | --- | --- | --- | --- |

Detailed specification and owner-catalog reconciliation remain pending unless records are linked by the allocation index below.

## 0.6.14 Report Registry

ID convention: `PMS-RPT-{scope}-{NNNNNN}`. Record location/state: Marketing report definitions in Volume 3 section 3.6.2; runtime evidence pending. Required fields: purpose; lineage; row/field security; formulas; freshness; export.

| ID | Name | Owner | Decision status | Source/evidence | Related IDs |
| --- | --- | --- | --- | --- | --- |

Detailed specification and owner-catalog reconciliation remain pending unless records are linked by the allocation index below.

## 0.6.15 KPI Registry

ID convention: `PMS-KPI-{scope}-{NNNNNN}`. Record location/state: Twelve KPI definitions allocated in Volume 1 section 1.7.4; numeric targets are proposed or TBD. Required fields: formula; numerator; denominator; units; period; owner; target decision status.

| ID | Name | Owner | Decision status | Source/evidence | Related IDs |
| --- | --- | --- | --- | --- | --- |

Detailed specification and owner-catalog reconciliation remain pending unless records are linked by the allocation index below.

## 0.6.16 Requirement Registry

ID convention: `PMS-REQ-{class}-{scope}-{NNNNNN}`. Record location/state: Seed records in 0.6.21. Required fields: statement; source; acceptance; owner; release; traceability.

## 0.6.17 Test Registry

ID convention: `PMS-TST-{scope}-{NNNNNN}`. Record location/state: Seed records in 0.6.22. Required fields: requirement; scenario; expected result; command; evidence.

## 0.6.18 Risk Registry

ID convention: `PMS-RSK-{NNNN}`. Record location/state: Seed records in 0.6.23. Required fields: category; probability; impact; mitigation; contingency; owner.

## 0.6.19 ADR Registry

ID convention: `PMS-ADR-{NNNN}`. Record location/state: Proposal in 0.6.25. Required fields: context; problem; options; decision; rationale; consequences; risk; revisit.

## 0.6.20 Dependency Registry

ID convention: `PMS-DEP-{NNNN}`. Record location/state: Volume 0 section 0.17. Required fields: producer; consumer; contract; compatibility; failure; owner.

## 0.6.21 Initial Requirement Registry records

| Requirement | Statement | Status/source | Acceptance/test | Release |
| --- | --- | --- | --- | --- |
| PMS-REQ-PRD-SHARED-000001 | Portfolio has exactly six canonical products | CONFIRMED; source S03 | Six unique IDs; PMS-TST-SHARED-000001 | Foundation |
| PMS-REQ-PRD-SHARED-000002 | Both builders belong to Developer Platform | CONFIRMED; source S03 | Builder parent product is DEV; PMS-TST-SHARED-000002 | Foundation |
| PMS-REQ-SYS-SHARED-000001 | Preserve IDs and all source-section coverage | CONFIRMED; source S66/S70 | 70 subjects, unique IDs, valid parents; PMS-TST-SHARED-000003 | Foundation |
| PMS-REQ-OPS-SHARED-000001 | All local document links resolve | PROPOSED; documentation governance | No unresolved local links; PMS-TST-SHARED-000004 | Foundation |

Existing UNI-BR-001 through UNI-BR-007 retain their source authority at the product PRD. These initial PMS requirements govern documentation. Runtime API, screen and implementation edges are N/A for this initial document-only acceptance; future business-feature traceability remains pending. Each later feature must map business goal through release without inventing evidence. Accountable owner for these initial records: product/architecture governance.

## 0.6.22 Initial Test Registry records

| Test ID | Scenario | Expected result | Evidence |
| --- | --- | --- | --- |
| PMS-TST-SHARED-000001 | Canonical portfolio | Exactly six named products | VERIFICATION.md |
| PMS-TST-SHARED-000002 | Builder ownership | Application/full-stack and Website Builder reference DEV | VERIFICATION.md |
| PMS-TST-SHARED-000003 | Scope and ID integrity | 70 source sections; unique IDs; valid parent links | VERIFICATION.md |
| PMS-TST-SHARED-000004 | Local Markdown links | Every target exists | VERIFICATION.md |

These are document checks, not product runtime tests. The authoring environment is local Python on the workspace. Inputs are the generated Markdown files; output is a failing exit code on any assertion violation. The verification record identifies execution state.

## 0.6.23 Initial Risk Registry records

| Risk ID | Category / risk | Probability | Impact | Mitigation | Contingency | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| PMS-RSK-0001 | Governance: duplicate authority | High | High | Link owning specs and distinguish proposals | Suspend conflicting chapter promotion | Architecture |
| PMS-RSK-0002 | Product/schedule: inventory mistaken for completeness | High | High | Separate indexed/authored/approved/implemented states | Reopen unsupported acceptance claims | Product/QA |
| PMS-RSK-0003 | Security: product grouping implies privilege inheritance | Medium | Critical | Preserve provider/organization/IAM boundaries | Block affected design approval | Security |
| PMS-RSK-0004 | Commercial: unsupported pricing and market figures | High | High | Use sourced evidence and labeled scenarios | Retain TBD and revise business case | Finance/product |
| PMS-RSK-0005 | Data/integration: duplicate domain ownership | Medium | High | Search catalog before model/API allocation | Resolve owner before contracts | Data architecture |
| PMS-RSK-0006 | Compliance/operations: unsupported readiness | Medium | Critical | Require legal review and recovery proof | Exclude unsupported release claims | Legal/SRE |

The complete product, business, financial, architecture, security, privacy, compliance, scalability, operational, vendor, AI, marketplace, data and schedule risk assessment is reserved for Volume 15. The above risks concern the initial authoring cycle.

## 0.6.24 Architecture Artifact Registry

| Artifact ID | View | Owner | State | Planned volume |
| --- | --- | --- | --- | --- |
| PMS-ARC-CTX-0001 | Cross-product dependency map | Architecture | AUTHORED in Volume 0 section 0.17 | 0 |
| PMS-ARC-CTR-0001 | Containers and trust zones | Architecture | RESERVED | 2 |
| PMS-ARC-DOM-0001 | Bounded-context map | Domain architecture | RESERVED | 2/9 |
| PMS-ARC-REPO-0001 | Repository dependencies | Engineering governance | RESERVED | 2 |
| PMS-ARC-DATA-0001 | Tenant/master-data ER model | Data architecture | RESERVED | 9 |
| PMS-ARC-SEQ-0001 | Signup and provisioning sequence | PLT-PAO/IAM | RESERVED | 3/4 |
| PMS-ARC-SEQ-0002 | Marketplace install and billing sequence | PLT-MKT | RESERVED | 8 |
| PMS-ARC-STATE-0001 | Tenant lifecycle | PLT-PAO | RESERVED | 4 |
| PMS-ARC-SEC-0001 | IAM and support-access model | PLT-IAM | RESERVED | 10 |
| PMS-ARC-DEP-0001 | Deployment and CI/CD | PLT-OPS | RESERVED | 11 |
| PMS-ARC-DR-0001 | Restore and regional recovery | PLT-OPS | RESERVED | 11 |

## 0.6.25 PMS-ADR-0001 — Modular PMS rooted in Volume 0

**Status:** PROPOSED. **Owner:** Product/architecture governance; approval TBD. **Context:** A large living specification must coexist with existing owner specifications. **Problem:** Duplication would drift from engineering contracts. **Options:** Single monolithic file; modular volumes with centralized registries; replace existing platform suites. **Decision proposed:** Modular Markdown volumes with stable IDs and references to existing authority. **Rationale:** Incremental authoring, review and traceability without semantic duplication. **Consequences:** Every change maintains links and registry edges. **Risks:** Unapproved prose could be mistaken for accepted architecture. **Revisit conditions:** Publication-format change or unresolved ownership reconciliation. **Affected requirements:** PMS-REQ-SYS-SHARED-000001 and PMS-REQ-OPS-SHARED-000001. No existing ADR is superseded.

## 0.6.26 Allocation and lifecycle

Allocate the next unused integer per namespace. Parent records must exist first. Do not derive IDs from mutable routes, names or chapter order. Merges retain retired IDs as aliases to replacements; splits retain the original as a parent and allocate children. Keep decision, authoring and implementation-evidence states separate. Retired IDs are never reused. A later machine registry must be generated from owning records or become their single source, not an independently maintained duplicate.

## 0.6.27 Subsequent allocation index

[Allocated ID index](REGISTRY-INDEX.md) centrally indexes all concrete IDs introduced in authored volumes. Values remain at their owning volume/registry; the index is generated and must not be edited independently. Volume 1 owns new business/commercial requirements, KPI definitions, goals and commercial decisions; Volume 2 owns new architecture requirements, journey records and the shared-execution ADR proposal. Their test IDs describe planned proof and do not claim execution.

Architecture reservations CTR-0001, DOM-0001, REPO-0001 and SEQ-0001 now have draft views in Volume 2. Their previous RESERVED rows record initial allocation; the current state is AUTHORED DRAFT, not runtime-verified. CTX-0002 and SEQ-0003 are additional Volume 2 views. Other reservations remain pending.


## 0.6.28 Marketing Site allocations

[Volume 3](VOLUME-03-MARKETING-SITE.md) owns 23 screen records, 11 proposed permission records, 8 role records, 12 conceptual entity records, 20 proposed API records, 8 event records, 8 integration records, 5 notification records and 5 report records. [Marketing feature catalog](VOLUME-03-MARKETING-FEATURES.md) owns 21 feature/workflow/requirement/test mappings, one for every Marketing module. These are PROPOSED specifications, not implemented contracts or granted permissions. Concrete schema and permission reconciliation remains PMS-TBD-0015–0019.

The initial empty-registry notices above describe initial allocation state; Marketing now has records in all corresponding classes. Other products remain unallocated until their owning chapters. The generated ID index links current records without duplicating their values. Marketing publication state artifact PMS-ARC-STATE-0002 and intake sequence PMS-ARC-SEQ-0004 are authored draft diagrams.
