# Part III.A — Marketing Site Detailed Feature Catalog

Document PMS-VOL-003A · Version 0.1.0 · 2026-09-14 · DRAFT / PROPOSED.

These 21 significant feature records cover every registered Marketing Site module. Their shared field-level contracts are normative within this proposed design: [Volume 3](VOLUME-03-MARKETING-SITE.md) sections 3.2 (UI/accessibility), 3.3 (authorization), 3.4 (data/lifecycle), 3.5 (API/error/input), 3.6 (events/integrations/notifications/reports), 3.7 (transactions), 3.8 (performance/privacy/operations) and 3.9 (failure matrix). Each feature's specific constraints below add to these contracts. Reference reuse keeps one authoritative definition of common behavior; it does not remove any feature field.

All feature requirements inherit MAR-FR-001–005 and MAR-NFR-001–005 as applicable, with the concrete requirement-to-test row below determining acceptance. Runtime tests are specified, NOT RUN. Routes, permissions and physical entity/API mappings are proposed pending owner-catalog reconciliation; no implementation-ready approval is claimed while those named decisions remain open.

## 3A.1 Feature and requirement traceability

| Feature ID | Module ID | Requirement ID | Primary screen | Workflow ID | Test ID | Draft release |
| --- | --- | --- | --- | --- | --- | --- |
| PMS-FEA-MAR-000001 | PMS-MOD-MAR-001-001 | PMS-REQ-FUN-MAR-000001 | PMS-SCR-MAR-000001 | PMS-WFL-MAR-000001 | PMS-TST-MAR-000001 | MVP — PROPOSED |
| PMS-FEA-MAR-000002 | PMS-MOD-MAR-001-002 | PMS-REQ-FUN-MAR-000002 | PMS-SCR-MAR-000002 | PMS-WFL-MAR-000002 | PMS-TST-MAR-000002 | MVP — PROPOSED |
| PMS-FEA-MAR-000003 | PMS-MOD-MAR-001-003 | PMS-REQ-FUN-MAR-000003 | PMS-SCR-MAR-000003 | PMS-WFL-MAR-000003 | PMS-TST-MAR-000003 | MVP — PROPOSED |
| PMS-FEA-MAR-000004 | PMS-MOD-MAR-001-004 | PMS-REQ-FUN-MAR-000004 | PMS-SCR-MAR-000004 | PMS-WFL-MAR-000004 | PMS-TST-MAR-000004 | v1.x — PROPOSED |
| PMS-FEA-MAR-000005 | PMS-MOD-MAR-001-005 | PMS-REQ-FUN-MAR-000005 | PMS-SCR-MAR-000005 | PMS-WFL-MAR-000005 | PMS-TST-MAR-000005 | v1.x — PROPOSED |
| PMS-FEA-MAR-000006 | PMS-MOD-MAR-001-006 | PMS-REQ-FUN-MAR-000006 | PMS-SCR-MAR-000006 | PMS-WFL-MAR-000006 | PMS-TST-MAR-000006 | MVP — PROPOSED |
| PMS-FEA-MAR-000007 | PMS-MOD-MAR-001-007 | PMS-REQ-FUN-MAR-000007 | PMS-SCR-MAR-000007 | PMS-WFL-MAR-000007 | PMS-TST-MAR-000007 | MVP — PROPOSED |
| PMS-FEA-MAR-000008 | PMS-MOD-MAR-001-008 | PMS-REQ-FUN-MAR-000008 | PMS-SCR-MAR-000008 | PMS-WFL-MAR-000008 | PMS-TST-MAR-000008 | MVP — PROPOSED |
| PMS-FEA-MAR-000009 | PMS-MOD-MAR-001-009 | PMS-REQ-FUN-MAR-000009 | PMS-SCR-MAR-000009 | PMS-WFL-MAR-000009 | PMS-TST-MAR-000009 | MVP — PROPOSED |
| PMS-FEA-MAR-000010 | PMS-MOD-MAR-002-001 | PMS-REQ-FUN-MAR-000010 | PMS-SCR-MAR-000010 | PMS-WFL-MAR-000010 | PMS-TST-MAR-000010 | MVP — PROPOSED |
| PMS-FEA-MAR-000011 | PMS-MOD-MAR-002-002 | PMS-REQ-FUN-MAR-000011 | PMS-SCR-MAR-000011 | PMS-WFL-MAR-000011 | PMS-TST-MAR-000011 | MVP — PROPOSED |
| PMS-FEA-MAR-000012 | PMS-MOD-MAR-002-003 | PMS-REQ-FUN-MAR-000012 | PMS-SCR-MAR-000012 | PMS-WFL-MAR-000012 | PMS-TST-MAR-000012 | MVP — PROPOSED |
| PMS-FEA-MAR-000013 | PMS-MOD-MAR-002-004 | PMS-REQ-FUN-MAR-000013 | PMS-SCR-MAR-000013 | PMS-WFL-MAR-000013 | PMS-TST-MAR-000013 | MVP — PROPOSED |
| PMS-FEA-MAR-000014 | PMS-MOD-MAR-002-005 | PMS-REQ-FUN-MAR-000014 | PMS-SCR-MAR-000014 | PMS-WFL-MAR-000014 | PMS-TST-MAR-000014 | MVP — PROPOSED |
| PMS-FEA-MAR-000015 | PMS-MOD-MAR-002-006 | PMS-REQ-FUN-MAR-000015 | PMS-SCR-MAR-000015 | PMS-WFL-MAR-000015 | PMS-TST-MAR-000015 | v1.x — PROPOSED |
| PMS-FEA-MAR-000016 | PMS-MOD-MAR-002-007 | PMS-REQ-FUN-MAR-000016 | PMS-SCR-MAR-000016 | PMS-WFL-MAR-000016 | PMS-TST-MAR-000016 | MVP — PROPOSED |
| PMS-FEA-MAR-000017 | PMS-MOD-MAR-002-008 | PMS-REQ-FUN-MAR-000017 | PMS-SCR-MAR-000017 | PMS-WFL-MAR-000017 | PMS-TST-MAR-000017 | MVP — PROPOSED |
| PMS-FEA-MAR-000018 | PMS-MOD-MAR-003-001 | PMS-REQ-FUN-MAR-000018 | PMS-SCR-MAR-000018 | PMS-WFL-MAR-000018 | PMS-TST-MAR-000018 | MVP — PROPOSED |
| PMS-FEA-MAR-000019 | PMS-MOD-MAR-003-002 | PMS-REQ-FUN-MAR-000019 | PMS-SCR-MAR-000019 | PMS-WFL-MAR-000019 | PMS-TST-MAR-000019 | MVP — PROPOSED |
| PMS-FEA-MAR-000020 | PMS-MOD-MAR-003-003 | PMS-REQ-FUN-MAR-000020 | PMS-SCR-MAR-000020 | PMS-WFL-MAR-000020 | PMS-TST-MAR-000020 | MVP — PROPOSED |
| PMS-FEA-MAR-000021 | PMS-MOD-MAR-003-004 | PMS-REQ-FUN-MAR-000021 | PMS-SCR-MAR-000021 | PMS-WFL-MAR-000021 | PMS-TST-MAR-000021 | MVP — PROPOSED |

Release classification is proposed sequencing, not a supported release promise. Foundation shared contracts and privacy/identity controls are prerequisites even when a feature is labeled MVP.

## 3A.2 Full feature specifications

### 3A.2.1 Corporate discovery and company information

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000001 |
| Name | Corporate discovery and company information |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-001 |
| Module | PMS-MOD-MAR-001-001 |
| Purpose | Explain the provider, six-product portfolio and supported next steps without implying that every planned capability is released. |
| Business value | Explain the provider, six-product portfolio and supported next steps without implying that every planned capability is released. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Anonymous prospect, existing customer, applicant; editor and reviewer for content changes. |
| Personas | Anonymous prospect, existing customer, applicant; editor and reviewer for content changes. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Home proposition; six-product navigation; about/company information; careers discovery; operational-status link; footer/legal navigation. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor opens a corporate route or follows navigation. |
| Main workflow | PMS-WFL-MAR-000001: Resolve live locale revision → render approved company/product blocks → label supported versus planned claims → visitor follows product, contact, careers or status destination → emit only consent-eligible navigation telemetry. |
| Alternate workflows | A returning customer chooses login; an applicant follows the approved recruitment owner link; missing translated content shows the disclosed available-language alternative. |
| Exception workflows | loading → published; unavailable locale → disclosed fallback; unknown route → not found; status provider unavailable → status unavailable, never all-systems-operational. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Published company page and safe navigation destination; no account or lead is created. |
| UI behavior / components | Header/skip link, product cards, evidence-aware CTA, company sections, footer and labeled external links. Careers lists have empty and closed-position states. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Canonical path and supported locale; editorial company facts, product references, status destination and approved external recruitment link. |
| Outputs | Published company page and safe navigation destination; no account or lead is created. |
| Validation | Exactly six product entries; every material capability claim has current evidence reference; external destinations use allowlisted HTTPS; unsupported product claims cannot use availability CTA. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Exactly six product entries; every material capability claim has current evidence reference; external destinations use allowlisted HTTPS; unsupported product claims cannot use availability CTA. |
| Data entities | PMS-ENT-MAR-000001, PMS-ENT-MAR-000002, PMS-ENT-MAR-000003, PMS-ENT-MAR-000004, PMS-ENT-MAR-000009 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | loading → published; unavailable locale → disclosed fallback; unknown route → not found; status provider unavailable → status unavailable, never all-systems-operational. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000001, PMS-API-MAR-000002, PMS-API-MAR-000011 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000006, PMS-INT-MAR-000007 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000005 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Public reads are not individual business audit events; editorial changes to source content are audited through controlled publication. Keep operational access logs minimized; optional click analytics requires consent. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Exactly six product entries; every material capability claim has current evidence reference; external destinations use allowlisted HTTPS; unsupported product claims cannot use availability CTA. |
| Privacy requirements | No visitor identity required; recruitment submissions are owned by the declared recruiting service and are not silently copied to marketing intake. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Header/skip link, product cards, evidence-aware CTA, company sections, footer and labeled external links. Careers lists have empty and closed-position states. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Canonical path and supported locale; editorial company facts, product references, status destination and approved external recruitment link.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | loading → published; unavailable locale → disclosed fallback; unknown route → not found; status provider unavailable → status unavailable, never all-systems-operational. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Deleted vacancy; expired public status link; duplicate localized slug; browser without optional scripts. |
| Dependencies | PMS-INT-MAR-000006, PMS-INT-MAR-000007 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000001: A visitor can reach each of the six product destinations by keyboard; no unpublished revision appears in public output; unknown routes produce a real not-found state. |
| Test scenarios | PMS-TST-MAR-000001: Assert six products and correct labels; withdraw a claim and verify affected publication behavior; inject unsafe external destination and verify rejection. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.2 Product evaluation pages

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000002 |
| Name | Product evaluation pages |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-001 |
| Module | PMS-MOD-MAR-001-002 |
| Purpose | Let a buyer evaluate one canonical product's outcomes, supported capabilities, dependencies and evidence. |
| Business value | Let a buyer evaluate one canonical product's outcomes, supported capabilities, dependencies and evidence. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Prospect, buyer, technical evaluator; product reviewer and content publisher. |
| Personas | Prospect, buyer, technical evaluator; product reviewer and content publisher. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Product index; product detail; capability availability; related applications; dependencies; supported editions; product-specific contact/trial handoff. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor selects a product from the six-product index. |
| Main workflow | PMS-WFL-MAR-000002: Load product-linked live revision → resolve approved capability/offer references → display current support scope and prerequisites → expand relevant workflow/evidence → choose trial or contact with a non-sensitive product code. |
| Alternate workflows | Unreleased capability has research/roadmap label and contact-interest CTA; unavailable offer removes purchase action while leaving explanatory content. |
| Exception workflows | published/current → stale evidence warning or editorial withdrawal; unsupported geography → explanation and contact; missing product code → not found. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Product evaluation content and context-preserving handoff; no new product identity or entitlement. |
| UI behavior / components | Outcome header, capability sections, dependencies, availability labels, evidence links, accessible comparison and CTA. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Product enum MAR/PCC/BIZ/DEV/OCC/MKT, locale, published capability and evidence references. |
| Outputs | Product evaluation content and context-preserving handoff; no new product identity or entitlement. |
| Validation | PCC is provider-operated and must not be presented as a customer admin SKU; both builders remain under DEV; availability is tied to approved release/version and geography. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | PCC is provider-operated and must not be presented as a customer admin SKU; both builders remain under DEV; availability is tied to approved release/version and geography. |
| Data entities | PMS-ENT-MAR-000001, PMS-ENT-MAR-000002, PMS-ENT-MAR-000003, PMS-ENT-MAR-000004, PMS-ENT-MAR-000009 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | published/current → stale evidence warning or editorial withdrawal; unsupported geography → explanation and contact; missing product code → not found. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000001, PMS-API-MAR-000003, PMS-API-MAR-000011 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000005, PMS-INT-MAR-000006, PMS-INT-MAR-000007 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000005 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Public reads are not individual business audit events; editorial changes to source content are audited through controlled publication. Keep operational access logs minimized; optional click analytics requires consent. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. PCC is provider-operated and must not be presented as a customer admin SKU; both builders remain under DEV; availability is tied to approved release/version and geography. |
| Privacy requirements | Product context passed to trial/contact is a public enum; user-entered data is not carried in URL parameters. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Outcome header, capability sections, dependencies, availability labels, evidence links, accessible comparison and CTA. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Product enum MAR/PCC/BIZ/DEV/OCC/MKT, locale, published capability and evidence references.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | published/current → stale evidence warning or editorial withdrawal; unsupported geography → explanation and contact; missing product code → not found. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Product rename alias, discontinued offer, unsupported region, version mismatch between evidence and copy. |
| Dependencies | PMS-INT-MAR-000005, PMS-INT-MAR-000006, PMS-INT-MAR-000007 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000001, PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000002: Each material capability claim is traceable to approved evidence or explicitly marked proposed/research; DEV page includes both builders without seventh/eighth product cards. |
| Test scenarios | PMS-TST-MAR-000002: Verify all canonical product identities; expire a capability evidence record; return an unavailable offer and ensure no misleading purchase button. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.3 Cross-product solution journeys

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000003 |
| Name | Cross-product solution journeys |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-001 |
| Module | PMS-MOD-MAR-001-003 |
| Purpose | Show how a supported business outcome crosses products and which prerequisites the customer must meet. |
| Business value | Show how a supported business outcome crosses products and which prerequisites the customer must meet. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Business buyer, solution architect, operations lead; solution content reviewer. |
| Personas | Business buyer, solution architect, operations lead; solution content reviewer. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Solution index; outcome narrative; workflow stages; product composition; integration prerequisites; evidence and next action. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor selects a business solution. |
| Main workflow | PMS-WFL-MAR-000003: Resolve approved solution revision → show problem and measurable outcome hypothesis → enumerate workflow stages and participating products → expose supported integration and data prerequisites → link to product evidence or scoped assessment intake. |
| Alternate workflows | Partially supported solution clearly separates available stages from planned work; a third-party dependency is identified as external with its own terms. |
| Exception workflows | available; partially supported with explicit gaps; withdrawn; missing or stale prerequisite evidence. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Readable solution journey and scoped discovery/contact handoff. |
| UI behavior / components | Stage diagram with text equivalent, prerequisite checklist, evidence panel and named CTA; no animation-only explanation. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Solution slug, locale, stage definitions, canonical product IDs, prerequisite/evidence references. |
| Outputs | Readable solution journey and scoped discovery/contact handoff. |
| Validation | Every stage has an accountable product; a cross-product arrow cannot imply shared authorization or atomic distributed commit; estimates of savings require methodology/date. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Every stage has an accountable product; a cross-product arrow cannot imply shared authorization or atomic distributed commit; estimates of savings require methodology/date. |
| Data entities | PMS-ENT-MAR-000001, PMS-ENT-MAR-000002, PMS-ENT-MAR-000003, PMS-ENT-MAR-000004, PMS-ENT-MAR-000009 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | available; partially supported with explicit gaps; withdrawn; missing or stale prerequisite evidence. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000001, PMS-API-MAR-000002, PMS-API-MAR-000011 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000006, PMS-INT-MAR-000007 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000005 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Public reads are not individual business audit events; editorial changes to source content are audited through controlled publication. Keep operational access logs minimized; optional click analytics requires consent. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Every stage has an accountable product; a cross-product arrow cannot imply shared authorization or atomic distributed commit; estimates of savings require methodology/date. |
| Privacy requirements | Assessment forms request only business context needed for follow-up; confidential process diagrams are not solicited in unrestricted public fields. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Stage diagram with text equivalent, prerequisite checklist, evidence panel and named CTA; no animation-only explanation. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Solution slug, locale, stage definitions, canonical product IDs, prerequisite/evidence references.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | available; partially supported with explicit gaps; withdrawn; missing or stale prerequisite evidence. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | External connector retirement, partial solution release, two products using incompatible versions. |
| Dependencies | PMS-INT-MAR-000006, PMS-INT-MAR-000007 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000001, PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000003: Every workflow stage maps to an existing product and declares available/planned/external state; prerequisites remain readable at mobile reflow. |
| Test scenarios | PMS-TST-MAR-000003: Hide one unsupported stage and verify gap stays explicit; test text equivalent of diagram; reject unknown participating product. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.4 Industry solution discovery

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000004 |
| Name | Industry solution discovery |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-001 |
| Module | PMS-MOD-MAR-001-004 |
| Purpose | Explain industry relevance without claiming unsupported regulated functionality or certification. |
| Business value | Explain industry relevance without claiming unsupported regulated functionality or certification. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Industry buyer, compliance evaluator, partner; industry/legal reviewer. |
| Personas | Industry buyer, compliance evaluator, partner; industry/legal reviewer. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Industry index; industry pain points; domain workflows; supported region/use-case matrix; partner options; evidence and consultation. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor opens an industry page. |
| Main workflow | PMS-WFL-MAR-000004: Resolve industry revision → display concrete workflows and current support status → show required geography/domain dependencies → distinguish product capability from regulatory approval → direct to supported product or qualified consultation. |
| Alternate workflows | Research-only industry remains discoverable with explicit non-availability; unsupported jurisdiction gets no trial promise for the restricted workflow. |
| Exception workflows | supported; limited scope; research; evidence expired; industry page withdrawn. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Scoped industry information and purpose-limited consultation handoff. |
| UI behavior / components | Industry outcome sections, applicability table, required controls, evidence and next step; status labels are textual. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Industry key, locale, jurisdiction applicability, capability and approved compliance-evidence references. |
| Outputs | Scoped industry information and purpose-limited consultation handoff. |
| Validation | No blanket healthcare, banking or tax compliance claim; evidence includes scope, owner and review date; all product links use the six-product registry. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | No blanket healthcare, banking or tax compliance claim; evidence includes scope, owner and review date; all product links use the six-product registry. |
| Data entities | PMS-ENT-MAR-000001, PMS-ENT-MAR-000002, PMS-ENT-MAR-000003, PMS-ENT-MAR-000004, PMS-ENT-MAR-000009 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | supported; limited scope; research; evidence expired; industry page withdrawn. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004, PMS-PER-MAR-000010 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000001, PMS-API-MAR-000002, PMS-API-MAR-000011 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000006, PMS-INT-MAR-000007 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000005 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Public reads are not individual business audit events; editorial changes to source content are audited through controlled publication. Keep operational access logs minimized; optional click analytics requires consent. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. No blanket healthcare, banking or tax compliance claim; evidence includes scope, owner and review date; all product links use the six-product registry. |
| Privacy requirements | Do not collect health, financial account or regulated case data through industry lead forms; direct necessary sensitive intake to an approved channel. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Industry outcome sections, applicability table, required controls, evidence and next step; status labels are textual. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Industry key, locale, jurisdiction applicability, capability and approved compliance-evidence references.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | supported; limited scope; research; evidence expired; industry page withdrawn. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Certification covers only one environment; partner statement is not UniERP certification; region changes after page approval. |
| Dependencies | PMS-INT-MAR-000006, PMS-INT-MAR-000007 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000001, PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000004: Every regulated claim has approved scoped evidence; research pages cannot offer an operational promise as a released capability. |
| Test scenarios | PMS-TST-MAR-000004: Attempt publish with expired certification evidence; test unsupported jurisdiction rendering; verify research status is visible beside CTA. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.5 Customer stories and outcome evidence

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000005 |
| Name | Customer stories and outcome evidence |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-001 |
| Module | PMS-MOD-MAR-001-005 |
| Purpose | Publish permissioned customer evidence with reproducible context and limitations. |
| Business value | Publish permissioned customer evidence with reproducible context and limitations. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Prospect and buyer; customer reference owner, legal reviewer and publisher. |
| Personas | Prospect and buyer; customer reference owner, legal reviewer and publisher. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Story index; consented identity/logo; baseline and result; measurement period; quote approval; related product/version; withdrawal. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor selects a story or editor submits a revised case study. |
| Main workflow | PMS-WFL-MAR-000005: Editor attaches publication permission and exact quote/result evidence → reviewer validates customer scope and methodology → publisher releases exact revision → visitor reads baseline/results and limitations → related product/contact navigation. |
| Alternate workflows | Anonymous case study uses approved anonymization; permission withdrawal triggers publication withdrawal and asset projection cleanup. |
| Exception workflows | draft → permission pending → review → approved → live → withdrawn; expired evidence blocks republish. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Approved story and measurable claim references; no underlying customer transaction records. |
| UI behavior / components | Story summary, measurable results with methodology, quote attribution, accessible logo alternatives and publication date. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Story revision, customer-approved public name/logo/quotes, baseline/result/period, methodology, product version, permission evidence. |
| Outputs | Approved story and measurable claim references; no underlying customer transaction records. |
| Validation | No fabricated quote, endorsement or metric; percentage requires denominator and baseline; changed quote or scope requires renewed approval; expiration applies to permission and result claims. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | No fabricated quote, endorsement or metric; percentage requires denominator and baseline; changed quote or scope requires renewed approval; expiration applies to permission and result claims. |
| Data entities | PMS-ENT-MAR-000001, PMS-ENT-MAR-000002, PMS-ENT-MAR-000003, PMS-ENT-MAR-000004 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | draft → permission pending → review → approved → live → withdrawn; expired evidence blocks republish. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004, PMS-PER-MAR-000010 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000001, PMS-API-MAR-000002, PMS-API-MAR-000012, PMS-API-MAR-000013, PMS-API-MAR-000014, PMS-API-MAR-000020 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002, PMS-EVT-MAR-000008 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000007 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000004, PMS-NTF-MAR-000005 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Record actor or minimized anonymous receipt context, action, target, exact revision/operation, authorization result, correlation and time. State and required audit intent commit atomically; no personal free text, token or credential in logs. Publication/consent/intake changes remain attributable. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. No fabricated quote, endorsement or metric; percentage requires denominator and baseline; changed quote or scope requires renewed approval; expiration applies to permission and result claims. |
| Privacy requirements | Only explicitly approved public customer material is published; source evidence access is restricted and never embedded in public HTML. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Story summary, measurable results with methodology, quote attribution, accessible logo alternatives and publication date. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Story revision, customer-approved public name/logo/quotes, baseline/result/period, methodology, product version, permission evidence.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | draft → permission pending → review → approved → live → withdrawn; expired evidence blocks republish. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Customer merger/name change, testimonial translation changes meaning, permission expires during scheduled publication. |
| Dependencies | PMS-INT-MAR-000007 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000005: Published quotes/logos/results match approved revision and permission scope; withdrawal cannot be reversed by an older delayed publish event. |
| Test scenarios | PMS-TST-MAR-000005: Reject story lacking publication permission; withdraw logo permission and verify removal; verify result denominator remains available in responsive view. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.6 Resources, blog and event discovery

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000006 |
| Name | Resources, blog and event discovery |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-001 |
| Module | PMS-MOD-MAR-001-006 |
| Purpose | Provide useful categorized resources and explicit event registration without unnecessary data gating. |
| Business value | Provide useful categorized resources and explicit event registration without unnecessary data gating. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Visitor, learner, event attendee; editor and content reviewer. |
| Personas | Visitor, learner, event attendee; editor and content reviewer. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Resource library; blog listing/detail; topic/type filters; downloadable approved assets; event listing; registration handoff; newsletter entry. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor searches resources, opens an article or selects an event. |
| Main workflow | PMS-WFL-MAR-000006: Query bounded published resources → apply topic/type/locale filters → open immutable article or safe scanned asset → show author/date/source/version → optional event/contact or newsletter action uses separate purpose-specific workflow. |
| Alternate workflows | No matches offers filter reset; ended event shows recording or ended state; asset not ready shows unavailable rather than broken download. |
| Exception workflows | loading/filtered/empty/published; asset quarantined/unavailable; event upcoming/full/ended/cancelled. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Published content list/detail/download; event request or newsletter remains separately acknowledged. |
| UI behavior / components | Search field, type/topic filters, results count, articles with headings, labeled downloads and event date/timezone. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Filters, cursor, resource slug, published asset IDs, event schedule/timezone and destination. |
| Outputs | Published content list/detail/download; event request or newsletter remains separately acknowledged. |
| Validation | No free-text reflected HTML; downloads reference scanned approved assets; event times retain timezone and cancellation state; resource availability must not depend on optional marketing consent. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | No free-text reflected HTML; downloads reference scanned approved assets; event times retain timezone and cancellation state; resource availability must not depend on optional marketing consent. |
| Data entities | PMS-ENT-MAR-000001, PMS-ENT-MAR-000002, PMS-ENT-MAR-000003, PMS-ENT-MAR-000005, PMS-ENT-MAR-000011 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | loading/filtered/empty/published; asset quarantined/unavailable; event upcoming/full/ended/cancelled. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000001, PMS-API-MAR-000002, PMS-API-MAR-000005, PMS-API-MAR-000007 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002, PMS-EVT-MAR-000003, PMS-EVT-MAR-000006 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000003, PMS-INT-MAR-000004, PMS-INT-MAR-000007 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000001, PMS-NTF-MAR-000002 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Public reads are not individual business audit events; editorial changes to source content are audited through controlled publication. Keep operational access logs minimized; optional click analytics requires consent. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. No free-text reflected HTML; downloads reference scanned approved assets; event times retain timezone and cancellation state; resource availability must not depend on optional marketing consent. |
| Privacy requirements | Ungated resources are the proposed default; where registration is necessary, its purpose and required fields are distinct from optional promotional subscription. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Search field, type/topic filters, results count, articles with headings, labeled downloads and event date/timezone. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Filters, cursor, resource slug, published asset IDs, event schedule/timezone and destination.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | loading/filtered/empty/published; asset quarantined/unavailable; event upcoming/full/ended/cancelled. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Article slug redirect, daylight-saving transition, full event after click, duplicate newsletter requests. |
| Dependencies | PMS-INT-MAR-000003, PMS-INT-MAR-000004, PMS-INT-MAR-000007 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000001, PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000006: Search/list pagination is stable; every download has safe type/size metadata; event displays correct timezone and terminal status. |
| Test scenarios | PMS-TST-MAR-000006: Empty filters reset correctly; quarantined asset never downloads publicly; event cancellation removes registration promise; newsletter remains unconfirmed until explicit confirmation. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.7 SEO metadata, canonical routing and redirects

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000007 |
| Name | SEO metadata, canonical routing and redirects |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-001 |
| Module | PMS-MOD-MAR-001-007 |
| Purpose | Make approved public content discoverable without indexing private drafts or contradictory route identities. |
| Business value | Make approved public content discoverable without indexing private drafts or contradictory route identities. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Search visitor/crawler; editor, reviewer and publisher. |
| Personas | Search visitor/crawler; editor, reviewer and publisher. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Title/description; canonical URLs; sitemap; robots/index policy; structured data; redirect map; broken-link checks. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Content is reviewed/published, route changes, or crawler requests metadata. |
| Main workflow | PMS-WFL-MAR-000007: Editor sets validated metadata → service derives canonical locale URL → validate redirect graph and structured-data claims → publish metadata with exact revision → regenerate sitemap/projections → monitor broken or withdrawn targets. |
| Alternate workflows | Withdrawn content returns appropriate not-found/gone or approved redirect; intentionally private preview uses noindex and authenticated/private cache policy. |
| Exception workflows | draft metadata → validated → published; redirect conflict; withdrawn target; index-excluded preview. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Consistent canonical/title/description/sitemap/redirect representation of published content. |
| UI behavior / components | SEO editor shows canonical preview, validation errors and redirect impact; public page has consistent semantic title. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Canonical path/locale, metadata strings, content type, approved structured data, old/new route mapping. |
| Outputs | Consistent canonical/title/description/sitemap/redirect representation of published content. |
| Validation | Canonical host allowlisted; no arbitrary external redirect or cycles; sitemap includes live indexable revisions only; structured data must match visible facts; robots instructions are not authorization. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Canonical host allowlisted; no arbitrary external redirect or cycles; sitemap includes live indexable revisions only; structured data must match visible facts; robots instructions are not authorization. |
| Data entities | PMS-ENT-MAR-000001, PMS-ENT-MAR-000002, PMS-ENT-MAR-000003, PMS-ENT-MAR-000008 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | draft metadata → validated → published; redirect conflict; withdrawn target; index-excluded preview. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000001, PMS-API-MAR-000012, PMS-API-MAR-000013, PMS-API-MAR-000014, PMS-API-MAR-000020 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002, PMS-EVT-MAR-000008 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000007 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000004 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Record actor or minimized anonymous receipt context, action, target, exact revision/operation, authorization result, correlation and time. State and required audit intent commit atomically; no personal free text, token or credential in logs. Publication/consent/intake changes remain attributable. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Canonical host allowlisted; no arbitrary external redirect or cycles; sitemap includes live indexable revisions only; structured data must match visible facts; robots instructions are not authorization. |
| Privacy requirements | Strip sensitive query parameters from canonical URLs and telemetry; never place receipt, preview or authentication tokens in indexed metadata. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | SEO editor shows canonical preview, validation errors and redirect impact; public page has consistent semantic title. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Canonical path/locale, metadata strings, content type, approved structured data, old/new route mapping.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | draft metadata → validated → published; redirect conflict; withdrawn target; index-excluded preview. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Slug collision, locale canonical mismatch, delayed cache invalidation, retired campaign URL. |
| Dependencies | PMS-INT-MAR-000007 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000007: Each live localized route has one canonical identity; all active redirect targets resolve without loops; private content is inaccessible regardless of crawler directives. |
| Test scenarios | PMS-TST-MAR-000007: Reject redirect cycle/open redirect; preview never appears in sitemap/cache; structured-data mismatch blocks review. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.8 Localization and translation lifecycle

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000008 |
| Name | Localization and translation lifecycle |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-001 |
| Module | PMS-MOD-MAR-001-008 |
| Purpose | Provide accurate language-specific experiences while retaining source meaning and controlled publication. |
| Business value | Provide accurate language-specific experiences while retaining source meaning and controlled publication. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Visitor, translator, language reviewer and publisher. |
| Personas | Visitor, translator, language reviewer and publisher. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Locale negotiation; manual language choice; translation workbench; source-revision tracking; regional formatting; fallback; RTL review. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor changes locale or source revision requires translation. |
| Main workflow | PMS-WFL-MAR-000008: Resolve content identity and selected locale → serve approved matching translation → translator works from frozen source revision → locale reviewer checks meaning/formatting/legal claims → publish translated revision → preserve user choice across navigation under allowed preference storage. |
| Alternate workflows | Unavailable translation shows named fallback language or language-unavailable page; legal content fallback is disclosed and cannot imply localized legal approval. |
| Exception workflows | missing → draft → reviewed → live → stale after source change; withdrawn locale; fallback disclosed. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Version-linked translated content and explicit fallback status. |
| UI behavior / components | Keyboard-operable language selector, language names in appropriate scripts, correct document language/direction, translation diff and stale-source badge. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Supported BCP-style locale identifier, source revision, translation text, locale-specific approved assets and formatting policy. |
| Outputs | Version-linked translated content and explicit fallback status. |
| Validation | No automatic publication of machine translation; source edits mark translations stale rather than overwrite them; translated price/currency values remain authoritative commercial values; language choice is not inferred jurisdiction consent. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | No automatic publication of machine translation; source edits mark translations stale rather than overwrite them; translated price/currency values remain authoritative commercial values; language choice is not inferred jurisdiction consent. |
| Data entities | PMS-ENT-MAR-000001, PMS-ENT-MAR-000002, PMS-ENT-MAR-000003, PMS-ENT-MAR-000004 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | missing → draft → reviewed → live → stale after source change; withdrawn locale; fallback disclosed. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000003, PMS-PER-MAR-000004, PMS-PER-MAR-000005, PMS-PER-MAR-000010 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000001, PMS-API-MAR-000002, PMS-API-MAR-000012, PMS-API-MAR-000013, PMS-API-MAR-000014 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000007 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000004, PMS-NTF-MAR-000005 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Record actor or minimized anonymous receipt context, action, target, exact revision/operation, authorization result, correlation and time. State and required audit intent commit atomically; no personal free text, token or credential in logs. Publication/consent/intake changes remain attributable. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. No automatic publication of machine translation; source edits mark translations stale rather than overwrite them; translated price/currency values remain authoritative commercial values; language choice is not inferred jurisdiction consent. |
| Privacy requirements | Store only the language preference needed; no precise location or cross-site identifier is required for locale selection. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Keyboard-operable language selector, language names in appropriate scripts, correct document language/direction, translation diff and stale-source badge. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Resolve content identity and selected locale → serve approved matching translation → translator works from frozen source revision → locale reviewer checks meaning/formatting/legal claims → publish translated revision → preserve user choice across navigation under allowed preference storage. |
| Configuration | Allowed locales/routes and feature-specific inputs (Supported BCP-style locale identifier, source revision, translation text, locale-specific approved assets and formatting policy.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | missing → draft → reviewed → live → stale after source change; withdrawn locale; fallback disclosed. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Plural forms, mixed script product names, untranslated link destinations, locale removed while bookmarked. |
| Dependencies | PMS-INT-MAR-000007 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000008: Every published translation records its source revision and reviewer; formatting preserves numeric meaning and displayed currency; fallback is explicitly labeled. |
| Test scenarios | PMS-TST-MAR-000008: Source update marks old translation stale; RTL/long text reflow retains actions; unsupported locale cannot produce mixed-language legal approval. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.9 Legal, privacy and security information

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000009 |
| Name | Legal, privacy and security information |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-001 |
| Module | PMS-MOD-MAR-001-009 |
| Purpose | Provide effective policy versions and scoped security information with accountable approval and historical traceability. |
| Business value | Provide effective policy versions and scoped security information with accountable approval and historical traceability. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Visitor, buyer, legal/security reviewer and publisher. |
| Personas | Visitor, buyer, legal/security reviewer and publisher. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Terms; privacy notice; security overview; legal document history; effective date; policy-change notice; privacy/security contact routing. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor opens legal/security content or legal owner publishes a new version. |
| Main workflow | PMS-WFL-MAR-000009: Load effective approved document by locale/date → display version/effective date/scope and contact → visitor reads historical versions or submits purpose-specific request → publisher validates required legal approval and records effective publication without altering historical text. |
| Alternate workflows | Unavailable approved translation offers clearly labeled controlling-language version; security incident details link to approved status disclosure only. |
| Exception workflows | draft → legal review → approved → scheduled → effective → superseded; withdrawn erroneous version retains history/access policy. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Readable effective/historical policy and approved contact destination; no automatic acceptance inferred from page view. |
| UI behavior / components | Document title/version/date, readable headings, print/download where supported, historical-version selector and accessible contacts. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Document type, locale, effective date, exact legal revision, legal approval, scoped control/certification evidence. |
| Outputs | Readable effective/historical policy and approved contact destination; no automatic acceptance inferred from page view. |
| Validation | Only legal-approved revision may publish; no blanket certification; contractual acceptance where required is captured by the owning signup/purchase workflow against exact version; dates cannot retroactively rewrite previous acceptance. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Only legal-approved revision may publish; no blanket certification; contractual acceptance where required is captured by the owning signup/purchase workflow against exact version; dates cannot retroactively rewrite previous acceptance. |
| Data entities | PMS-ENT-MAR-000001, PMS-ENT-MAR-000002, PMS-ENT-MAR-000003, PMS-ENT-MAR-000004, PMS-ENT-MAR-000005 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | draft → legal review → approved → scheduled → effective → superseded; withdrawn erroneous version retains history/access policy. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004, PMS-PER-MAR-000010 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000001, PMS-API-MAR-000002, PMS-API-MAR-000012, PMS-API-MAR-000013, PMS-API-MAR-000014, PMS-API-MAR-000020, PMS-API-MAR-000005 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002, PMS-EVT-MAR-000003 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000003, PMS-INT-MAR-000007 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000001, PMS-NTF-MAR-000004, PMS-NTF-MAR-000005 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Record actor or minimized anonymous receipt context, action, target, exact revision/operation, authorization result, correlation and time. State and required audit intent commit atomically; no personal free text, token or credential in logs. Publication/consent/intake changes remain attributable. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Only legal-approved revision may publish; no blanket certification; contractual acceptance where required is captured by the owning signup/purchase workflow against exact version; dates cannot retroactively rewrite previous acceptance. |
| Privacy requirements | Privacy/security requests route to restricted operators; public form warns against sending passwords, account credentials or regulated case records. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Document title/version/date, readable headings, print/download where supported, historical-version selector and accessible contacts. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Document type, locale, effective date, exact legal revision, legal approval, scoped control/certification evidence.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | draft → legal review → approved → scheduled → effective → superseded; withdrawn erroneous version retains history/access policy. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Overlapping effective intervals, urgent correction, conflicting locale meanings, evidence covering only one deployment. |
| Dependencies | PMS-INT-MAR-000003, PMS-INT-MAR-000007 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000009: Every effective legal document has owner, approval, version, date and scope; reading does not create a consent/contract acceptance event. |
| Test scenarios | PMS-TST-MAR-000009: Publishing without legal approval fails; old acceptance references still resolve to immutable version; expired security evidence cannot become current certification claim. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.10 Pricing comparison and capacity estimator

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000010 |
| Name | Pricing comparison and capacity estimator |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-002 |
| Module | PMS-MOD-MAR-002-001 |
| Purpose | Let a buyer understand approved fixed/prepaid capacity and usage charges without inventing a quote or mandatory seat fee. |
| Business value | Let a buyer understand approved fixed/prepaid capacity and usage charges without inventing a quote or mandatory seat fee. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Prospect and finance buyer; commercial catalog owner; marketing publisher only presents approved offers. |
| Personas | Prospect and finance buyer; commercial catalog owner; marketing publisher only presents approved offers. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Offer comparison; region/currency/cadence selection; meter quantities; included versus overage breakdown; assumptions; estimate snapshot; purchase/contact handoff. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor opens pricing or edits workload assumptions. |
| Main workflow | PMS-WFL-MAR-000010: Select supported region/currency → load immutable approved offer → enter nonnegative decimal workload quantities → calculate included capacity/overage/eligible credits → display itemized non-binding estimate and expiry → preserve offer version in purchase or contact handoff. |
| Alternate workflows | Unsupported geography/currency shows contact/unavailable; custom enterprise offer uses consultation rather than fabricated amount; expired snapshot must recalculate before action. |
| Exception workflows | loading offers → supported estimate; invalid quantity; retired offer; stale estimate; unavailable rate source. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | PMS-ENT-MAR-000012 estimate with line quantities, rates, included units, tax assumption, total, version and expiry; no payment. |
| UI behavior / components | Accessible comparison table, unit-labeled fields, instant draft estimate with server-confirmed final calculation, itemized summary and non-binding notice. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Offer/version, currency, cadence, typed meter quantities and stated assumptions; participant count may inform capacity but cannot imply core seat fees. |
| Outputs | PMS-ENT-MAR-000012 estimate with line quantities, rates, included units, tax assumption, total, version and expiry; no payment. |
| Validation | Exact decimal math; no mixing currencies or meters; show taxes included/excluded and service exclusions; price withdrawal prevents reuse for purchase; comparison includes required add-ons. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Exact decimal math; no mixing currencies or meters; show taxes included/excluded and service exclusions; price withdrawal prevents reuse for purchase; comparison includes required add-ons. |
| Data entities | PMS-ENT-MAR-000012, PMS-ENT-MAR-000009 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | loading offers → supported estimate; invalid quantity; retired offer; stale estimate; unavailable rate source. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000003, PMS-API-MAR-000004 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | N/A: this feature creates no marketing-owned record of this class; externally owned identity/provisioning effects use the listed integration contract. Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000005 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | N/A for this feature's Marketing-owned business flow; no email is sent merely for reading/clicking/calculating. Integrated identity/lifecycle notifications remain owner-controlled. |
| Audit requirements | Public reads are not individual business audit events; editorial changes to source content are audited through controlled publication. Keep operational access logs minimized; optional click analytics requires consent. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Exact decimal math; no mixing currencies or meters; show taxes included/excluded and service exclusions; price withdrawal prevents reuse for purchase; comparison includes required add-ons. |
| Privacy requirements | Anonymous estimation does not require email; shared/downloadable snapshots contain no personal form fields or secret account references. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Accessible comparison table, unit-labeled fields, instant draft estimate with server-confirmed final calculation, itemized summary and non-binding notice. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Offer/version, currency, cadence, typed meter quantities and stated assumptions; participant count may inform capacity but cannot imply core seat fees.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; offers and rates come only from the commercial owner. Configuration is not a secret store or permission bypass. |
| Error handling | loading offers → supported estimate; invalid quantity; retired offer; stale estimate; unavailable rate source. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Very large quantity, fractional GiB-month, annual prepayment, taxes not yet calculable, two tabs with different offer versions. |
| Dependencies | PMS-INT-MAR-000005 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000005 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000010: Every displayed charge has source offer/version/unit; server calculation matches line arithmetic; no stale or unsupported estimate can be presented as a committed purchase price. |
| Test scenarios | PMS-TST-MAR-000010: Reproduce Volume 1 example total; reject negative and mixed-unit input; retire an offer between selection and calculation; increase participants at fixed usage without core seat fee. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.11 Purpose-specific lead capture

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000011 |
| Name | Purpose-specific lead capture |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-002 |
| Module | PMS-MOD-MAR-002-002 |
| Purpose | Accept a legitimate prospect request durably and route it without exposing or duplicating canonical CRM data. |
| Business value | Accept a legitimate prospect request durably and route it without exposing or duplicating canonical CRM data. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Anonymous prospect, purpose-scoped intake operator, authorized CRM consumer. |
| Personas | Anonymous prospect, purpose-scoped intake operator, authorized CRM consumer. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Inline/demo form; explicit purpose; separate optional marketing preference; abuse controls; idempotent receipt; routing; exception queue. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor explicitly submits the form. |
| Main workflow | PMS-WFL-MAR-000011: Collect minimal fields → validate purpose/field limits and optional preference → submit with retained random idempotency key → authoritative service validates site/abuse policy → transaction commits receipt/audit intent/outbox → show received acknowledgement → route by receipt to owned CRM → show delivery state only to authorized operator. |
| Alternate workflows | Network outcome unknown retries same key; delivery outage preserves accepted receipt and queues recovery; visitor may decline optional marketing and still request contact. |
| Exception workflows | editing → submitting → accepted; validation/rate/unavailable; accepted → routing → delivered/exception; unknown outcome → same-key query/retry. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Opaque receipt and accepted status only; no score, CRM ID, provider tenant ID or promise of activated trial. |
| UI behavior / components | Labeled minimal form, required indicators, separate unchecked optional preference, error summary, retained local input and unambiguous receipt. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Email, optional name/company, chosen public product codes and limited message; purpose and current policy version; explicit marketing choice; idempotency key. |
| Outputs | Opaque receipt and accepted status only; no score, CRM ID, provider tenant ID or promise of activated trial. |
| Validation | Do not update existing lead using email alone; no background abandoned-form PII capture; receipt acceptance requires durable commit; routing uses approved destination and duplicate-safe receipt mapping. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Do not update existing lead using email alone; no background abandoned-form PII capture; receipt acceptance requires durable commit; routing uses approved destination and duplicate-safe receipt mapping. |
| Data entities | PMS-ENT-MAR-000005, PMS-ENT-MAR-000006 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | editing → submitting → accepted; validation/rate/unavailable; accepted → routing → delivered/exception; unknown outcome → same-key query/retry. |
| Permissions | PMS-PER-MAR-000006, PMS-PER-MAR-000007 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000005, PMS-API-MAR-000006, PMS-API-MAR-000017 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000003, PMS-EVT-MAR-000004 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000003, PMS-INT-MAR-000004 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000001, PMS-NTF-MAR-000003 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Record actor or minimized anonymous receipt context, action, target, exact revision/operation, authorization result, correlation and time. State and required audit intent commit atomically; no personal free text, token or credential in logs. Publication/consent/intake changes remain attributable. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Do not update existing lead using email alone; no background abandoned-form PII capture; receipt acceptance requires durable commit; routing uses approved destination and duplicate-safe receipt mapping. |
| Privacy requirements | Encrypt contact/message under intake policy, minimize event payloads, restrict assignment/purpose access and apply retention/erasure across queue and CRM references. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Labeled minimal form, required indicators, separate unchecked optional preference, error summary, retained local input and unambiguous receipt. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Email, optional name/company, chosen public product codes and limited message; purpose and current policy version; explicit marketing choice; idempotency key.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | editing → submitting → accepted; validation/rate/unavailable; accepted → routing → delivered/exception; unknown outcome → same-key query/retry. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Same email submits a genuinely new request; browser refresh after commit; suspicious content; operator reassignment; downstream ID lost after remote success. |
| Dependencies | PMS-INT-MAR-000003, PMS-INT-MAR-000004 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000001, PMS-RPT-MAR-000002 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000011: Success appears only after durable receipt; repeated response-loss retry creates no duplicate lead or notification; unauthorized operator cannot view another assigned purpose. |
| Test scenarios | PMS-TST-MAR-000011: Concurrent duplicate submissions produce one receipt/downstream effect; conflicting same-key payload returns conflict; CRM outage preserves receipt; denial of optional marketing still accepts contact. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.12 Contact sales and service-purpose routing

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000012 |
| Name | Contact sales and service-purpose routing |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-002 |
| Module | PMS-MOD-MAR-002-003 |
| Purpose | Direct sales, existing-customer support, privacy and security requests to the correct accountable team. |
| Business value | Direct sales, existing-customer support, privacy and security requests to the correct accountable team. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Prospect, existing customer, privacy requester, security reporter; purpose-authorized operator. |
| Personas | Prospect, existing customer, privacy requester, security reporter; purpose-authorized operator. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Purpose selection; sales qualification; existing-customer support entry; privacy request; security reporting destination; receipt; restricted operator queue. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor selects a contact purpose. |
| Main workflow | PMS-WFL-MAR-000012: Select purpose → display required/minimal fields and safe-data guidance → existing support may hand off to authenticated support owner → public request uses durable intake → route by purpose/region/product without trusting user-supplied tenant → send purpose-specific receipt → operator resolves routing exceptions. |
| Alternate workflows | Urgent security reports use approved security channel; unauthenticated support request never reveals account existence; unavailable team retains queued receipt. |
| Exception workflows | purpose selected → validated → accepted → assigned/delivery exception → closed; purpose change resets incompatible optional fields. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Opaque receipt and appropriate next-step expectation, or safe owned support/security destination. |
| UI behavior / components | Purpose cards/select, conditional minimal fields, safe-data warning, response expectation and accessible receipt; operator queue masks sensitive fields until authorized. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Purpose enum, contact method, bounded message, optional public product code; authenticated customer context only from owning identity service. |
| Outputs | Opaque receipt and appropriate next-step expectation, or safe owned support/security destination. |
| Validation | Purpose is not a grant to see account records; sales consent is separate from privacy/security/support handling; do not promise response SLA not in an approved policy. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Purpose is not a grant to see account records; sales consent is separate from privacy/security/support handling; do not promise response SLA not in an approved policy. |
| Data entities | PMS-ENT-MAR-000005, PMS-ENT-MAR-000006 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | purpose selected → validated → accepted → assigned/delivery exception → closed; purpose change resets incompatible optional fields. |
| Permissions | PMS-PER-MAR-000006, PMS-PER-MAR-000007 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000005, PMS-API-MAR-000006, PMS-API-MAR-000017 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000003, PMS-EVT-MAR-000004 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000001, PMS-INT-MAR-000003, PMS-INT-MAR-000004 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000001, PMS-NTF-MAR-000003 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Record actor or minimized anonymous receipt context, action, target, exact revision/operation, authorization result, correlation and time. State and required audit intent commit atomically; no personal free text, token or credential in logs. Publication/consent/intake changes remain attributable. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Purpose is not a grant to see account records; sales consent is separate from privacy/security/support handling; do not promise response SLA not in an approved policy. |
| Privacy requirements | Security/privacy content receives restricted scope; keep necessary service communication separate from promotional lists; never ingest passwords or sensitive records as routine qualification fields. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Purpose cards/select, conditional minimal fields, safe-data warning, response expectation and accessible receipt; operator queue masks sensitive fields until authorized. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Purpose enum, contact method, bounded message, optional public product code; authenticated customer context only from owning identity service.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | purpose selected → validated → accepted → assigned/delivery exception → closed; purpose change resets incompatible optional fields. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Wrong-purpose request requires authorized reroute; abusive attachments are not accepted by this bounded JSON form; region unsupported; subject requests deletion while routing pending. |
| Dependencies | PMS-INT-MAR-000001, PMS-INT-MAR-000003, PMS-INT-MAR-000004 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000002 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000012: Each accepted purpose maps to one accountable destination and retention class; no unauthorized tenant/account lookup occurs through public contact. |
| Test scenarios | PMS-TST-MAR-000012: Switch purpose and verify stale hidden fields are not submitted; wrong-purpose operator gets forbidden; unknown account support response is non-enumerating; routing retry does not create a second ticket. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.13 Trial signup and organization handoff

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000013 |
| Name | Trial signup and organization handoff |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-002 |
| Module | PMS-MOD-MAR-002-004 |
| Purpose | Move a verified prospective owner into an explicitly supported trial and observable organization provisioning lifecycle. |
| Business value | Move a verified prospective owner into an explicitly supported trial and observable organization provisioning lifecycle. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Prospective organization owner; IAM and provider lifecycle service principals. |
| Personas | Prospective organization owner; IAM and provider lifecycle service principals. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Supported geography check; trial capacity/terms; identity verification; first-owner intent; provisioning request/status; OCC handoff. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Identity/provisioning actions require their owning service's verified principal and policy; no Marketing role grants substitute authority. |
| Trigger | Visitor chooses a supported trial CTA. |
| Main workflow | PMS-WFL-MAR-000013: Load approved trial applicability/terms → capture minimal organization intent and exact acceptance where required → begin IAM verification → after verified identity call owned idempotent provisioning contract → poll authorized operation → show pending steps honestly → redirect to OCC only when first-owner membership and required resources are ready. |
| Alternate workflows | Existing identity signs in rather than creates local duplicate; manual eligibility review stays pending; failed provisioning offers same-operation recovery or support. |
| Exception workflows | eligibility → identity verification → provisioning pending → ready; verification expired; rejected; partial resource failure; owner-membership pending. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | IAM flow or provider operation identity and eventual OCC destination; no local Marketing tenant/user record. |
| UI behavior / components | Progress steps distinguish identity, organization setup and ready; explain resource limits and export/expiry before start; retries preserve operation context. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Approved trial/offer version, supported geography, organization display name and owned identity-flow context; acceptance version/timestamp recorded by authoritative owner. |
| Outputs | IAM flow or provider operation identity and eventual OCC destination; no local Marketing tenant/user record. |
| Validation | Marketing cannot establish tenant or owner authority; trial terms cannot promise hardcoded duration inconsistent with offer; no paid conversion without explicit purchase authorization; accepted lead is not provisioned trial. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Marketing cannot establish tenant or owner authority; trial terms cannot promise hardcoded duration inconsistent with offer; no paid conversion without explicit purchase authorization; accepted lead is not provisioned trial. |
| Data entities | PMS-ENT-MAR-000009 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | eligibility → identity verification → provisioning pending → ready; verification expired; rejected; partial resource failure; owner-membership pending. |
| Permissions | No Marketing grant is introduced; anonymous entry is bounded, and the integrated owner authenticates/authorizes any protected effect. |
| APIs | PMS-API-MAR-000003 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | N/A: this feature creates no marketing-owned record of this class; externally owned identity/provisioning effects use the listed integration contract. Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000001, PMS-INT-MAR-000002, PMS-INT-MAR-000005 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | N/A for this feature's Marketing-owned business flow; no email is sent merely for reading/clicking/calculating. Integrated identity/lifecycle notifications remain owner-controlled. |
| Audit requirements | Record actor or minimized anonymous receipt context, action, target, exact revision/operation, authorization result, correlation and time. State and required audit intent commit atomically; no personal free text, token or credential in logs. Publication/consent/intake changes remain attributable. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Marketing cannot establish tenant or owner authority; trial terms cannot promise hardcoded duration inconsistent with offer; no paid conversion without explicit purchase authorization; accepted lead is not provisioned trial. |
| Privacy requirements | No password enters Marketing persistence or logs; signup data minimization and retention are owned by IAM/lifecycle; marketing subscription is separate. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Progress steps distinguish identity, organization setup and ready; explain resource limits and export/expiry before start; retries preserve operation context. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Approved trial/offer version, supported geography, organization display name and owned identity-flow context; acceptance version/timestamp recorded by authoritative owner.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | eligibility → identity verification → provisioning pending → ready; verification expired; rejected; partial resource failure; owner-membership pending. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Email verification expires, user changes organization intent, region eligibility changes mid-flow, browser closes during provisioning. |
| Dependencies | PMS-INT-MAR-000001, PMS-INT-MAR-000002, PMS-INT-MAR-000005 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000001 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000013: Only IAM verifies identity and only lifecycle service provisions; first admin is bound to verified principal; UI never displays ready before required owner/resource checks. |
| Test scenarios | PMS-TST-MAR-000013: Duplicate signup creates one lifecycle operation; identity failure creates no active tenant; provisioned resources with missing membership remain pending; login redirect rejects attacker origin. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.14 Authentication entry and safe return navigation

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000014 |
| Name | Authentication entry and safe return navigation |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-002 |
| Module | PMS-MOD-MAR-002-005 |
| Purpose | Send users to the correct owned identity flow without duplicate credentials, open redirects or cross-plane confusion. |
| Business value | Send users to the correct owned identity flow without duplicate credentials, open redirects or cross-plane confusion. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Existing user, organization administrator, content operator; IAM. |
| Personas | Existing user, organization administrator, content operator; IAM. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Customer login; provider/editor login entry; approved product destination; return URL validation; logout/account recovery handoff. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Identity/provisioning actions require their owning service's verified principal and policy; no Marketing role grants substitute authority. |
| Trigger | Visitor selects login or follows an authenticated editor link. |
| Main workflow | PMS-WFL-MAR-000014: Choose allowed product/authority entry → resolve approved IAM client/realm configuration → create protected state/nonce/PKCE context under identity owner → complete IAM flow → validate callback and authorized destination → return to target product, which independently authorizes access. |
| Alternate workflows | Expired flow starts a new owned login; user without target permission sees forbidden at owner; identity outage shows unavailable rather than local fallback. |
| Exception workflows | idle → redirecting → callback validation → target; expired state, cancelled login, forbidden target, identity unavailable. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Identity redirect and authorized target navigation; no Marketing-created token or password database. |
| UI behavior / components | Clearly named organization versus editorial/provider entry, safe recovery link and error guidance without account enumeration. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Allowlisted destination identifier and bounded relative return path; owned authentication flow state. |
| Outputs | Identity redirect and authorized target navigation; no Marketing-created token or password database. |
| Validation | No provider privilege inferred from tenant login; reject arbitrary URL/scheme/userinfo return targets; callback cannot trust unsigned query claims; do not put tokens in analytics URLs. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | No provider privilege inferred from tenant login; reject arbitrary URL/scheme/userinfo return targets; callback cannot trust unsigned query claims; do not put tokens in analytics URLs. |
| Data entities | N/A: this feature creates no marketing-owned record of this class; externally owned identity/provisioning effects use the listed integration contract. Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | idle → redirecting → callback validation → target; expired state, cancelled login, forbidden target, identity unavailable. |
| Permissions | No Marketing grant is introduced; anonymous entry is bounded, and the integrated owner authenticates/authorizes any protected effect. |
| APIs | N/A: this feature creates no marketing-owned record of this class; externally owned identity/provisioning effects use the listed integration contract. Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | N/A: this feature creates no marketing-owned record of this class; externally owned identity/provisioning effects use the listed integration contract. Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000001 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | N/A for this feature's Marketing-owned business flow; no email is sent merely for reading/clicking/calculating. Integrated identity/lifecycle notifications remain owner-controlled. |
| Audit requirements | Public reads are not individual business audit events; editorial changes to source content are audited through controlled publication. Keep operational access logs minimized; optional click analytics requires consent. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. No provider privilege inferred from tenant login; reject arbitrary URL/scheme/userinfo return targets; callback cannot trust unsigned query claims; do not put tokens in analytics URLs. |
| Privacy requirements | No password/token or full callback query appears in Marketing logs, public cache, analytics or browser storage outside approved identity mechanism. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Clearly named organization versus editorial/provider entry, safe recovery link and error guidance without account enumeration. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Allowlisted destination identifier and bounded relative return path; owned authentication flow state.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | idle → redirecting → callback validation → target; expired state, cancelled login, forbidden target, identity unavailable. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Multiple tabs, stale state cookie, logout while returning, unknown organization selector, deep link to withdrawn editor content. |
| Dependencies | PMS-INT-MAR-000001 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000001 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000014: All credentials and tokens handled by owned identity integration; every return destination validated; no cross-plane access is gained by choosing a different entry URL. |
| Test scenarios | PMS-TST-MAR-000014: Open redirect and state/nonce replay rejected; tenant identity cannot enter provider content controls; identity outage cannot activate local credential login. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.15 Campaign landing pages and attribution control

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000015 |
| Name | Campaign landing pages and attribution control |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-002 |
| Module | PMS-MOD-MAR-002-006 |
| Purpose | Publish dated campaign experiences with understandable attribution and consent boundaries. |
| Business value | Publish dated campaign experiences with understandable attribution and consent boundaries. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Visitor, campaign manager, reviewer/publisher and analyst. |
| Personas | Visitor, campaign manager, reviewer/publisher and analyst. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Campaign creation; landing-page revision; source-code allocation; schedule/pause/end; public CTA; attribution version; report. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Manager schedules a campaign or visitor follows its public source link. |
| Main workflow | PMS-WFL-MAR-000015: Create unique non-PII campaign code → bind approved content/offer revision and schedule → review → publish at effective time → visitor sees scoped landing page → consent-eligible attribution records campaign ID → pause/end stops new exposure and preserves report definition. |
| Alternate workflows | Ended campaign shows approved evergreen alternative; no consent allows page and essential CTA without optional attribution; retired offer makes purchase unavailable. |
| Exception workflows | draft → approved → scheduled → active → paused/ended; publication failed; offer expired. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Versioned landing page and consent-eligible campaign aggregates, not a personal audience profile. |
| UI behavior / components | Landing headline/terms/expiry, accessible CTA; manager schedule with timezone, preview and impact of pause/end. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Campaign key, content/offer refs, start/end/timezone, approved source/medium codes and non-sensitive audience description. |
| Outputs | Versioned landing page and consent-eligible campaign aggregates, not a personal audience profile. |
| Validation | Campaign code contains no email/customer ID; schedule revalidates offer and content; no campaign overrides consent or price; attribution model/window version must accompany report. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Campaign code contains no email/customer ID; schedule revalidates offer and content; no campaign overrides consent or price; attribution model/window version must accompany report. |
| Data entities | PMS-ENT-MAR-000001, PMS-ENT-MAR-000002, PMS-ENT-MAR-000003, PMS-ENT-MAR-000007 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | draft → approved → scheduled → active → paused/ended; publication failed; offer expired. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004, PMS-PER-MAR-000009 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000001, PMS-API-MAR-000019, PMS-API-MAR-000014, PMS-API-MAR-000020, PMS-API-MAR-000010 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002, PMS-EVT-MAR-000007, PMS-EVT-MAR-000008 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000005, PMS-INT-MAR-000007, PMS-INT-MAR-000008 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000004 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Record actor or minimized anonymous receipt context, action, target, exact revision/operation, authorization result, correlation and time. State and required audit intent commit atomically; no personal free text, token or credential in logs. Publication/consent/intake changes remain attributable. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Campaign code contains no email/customer ID; schedule revalidates offer and content; no campaign overrides consent or price; attribution model/window version must accompany report. |
| Privacy requirements | Do not persist unrestricted tracking query strings; allowlist attribution keys and apply purpose-specific consent before storage/export. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Landing headline/terms/expiry, accessible CTA; manager schedule with timezone, preview and impact of pause/end. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Campaign key, content/offer refs, start/end/timezone, approved source/medium codes and non-sensitive audience description.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | draft → approved → scheduled → active → paused/ended; publication failed; offer expired. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Clock/DST change, shared source code collision, campaign URL with malicious query, different offer version after click. |
| Dependencies | PMS-INT-MAR-000005, PMS-INT-MAR-000007, PMS-INT-MAR-000008 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000001, PMS-RPT-MAR-000005 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000015: Every active campaign maps to approved revision and bounded schedule; attribution reports disclose model/window and exclude raw personal fields. |
| Test scenarios | PMS-TST-MAR-000015: Ending campaign prevents old scheduled job reactivation; denied consent produces no optional event; expired offer cannot keep active purchase CTA. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.16 Consent-aware acquisition analytics

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000016 |
| Name | Consent-aware acquisition analytics |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-002 |
| Module | PMS-MOD-MAR-002-007 |
| Purpose | Measure public adoption funnels without collecting unrestricted visitor data or misrepresenting conversions. |
| Business value | Measure public adoption funnels without collecting unrestricted visitor data or misrepresenting conversions. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Consenting visitor, marketing analyst, privacy operator; analytics ingestion service. |
| Personas | Consenting visitor, marketing analyst, privacy operator; analytics ingestion service. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Approved event taxonomy; consent checks; bounded batching; deduplication; funnel/cohort definitions; privacy-safe dashboard; freshness/quality. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | An approved public interaction occurs and effective consent permits its purpose. |
| Main workflow | PMS-WFL-MAR-000016: Client checks effective purpose before event creation → construct allowlisted event fields → bounded send with event identity/policy version → server revalidates consent/schema/limits → deduplicate → aggregate under fixed report definition → authorized analyst sees counts and freshness. |
| Alternate workflows | Consent denied/unknown stops optional event creation; analytics unavailable drops or bounded-buffers only under approved retention; essential form submission still works. |
| Exception workflows | not permitted; permitted → queued → accepted/rejected; revoked before delivery → rejected; aggregate current/stale/unavailable. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Accepted safe event count and aggregated reports; no visitor PII or unrestricted session replay. |
| UI behavior / components | Dashboard shows period, cohort, definition version, consent eligibility, freshness and suppressed/N/A cells; error states do not become zero conversions. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Event enum, unique event ID, content/campaign/offer public references, coarse locale/device class, occurrence time and consent proof/version. |
| Outputs | Accepted safe event count and aggregated reports; no visitor PII or unrestricted session replay. |
| Validation | No form text/email/password/token/full URL in telemetry; accepted intake, verified signup and activation are distinct events; no zero denominator invented as 0%; small cohorts suppressed by approved policy. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | No form text/email/password/token/full URL in telemetry; accepted intake, verified signup and activation are distinct events; no zero denominator invented as 0%; small cohorts suppressed by approved policy. |
| Data entities | PMS-ENT-MAR-000006, PMS-ENT-MAR-000007, PMS-ENT-MAR-000009 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | not permitted; permitted → queued → accepted/rejected; revoked before delivery → rejected; aggregate current/stale/unavailable. |
| Permissions | PMS-PER-MAR-000008 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000010, PMS-API-MAR-000018 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000005 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000008 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | N/A for this feature's Marketing-owned business flow; no email is sent merely for reading/clicking/calculating. Integrated identity/lifecycle notifications remain owner-controlled. |
| Audit requirements | Record actor or minimized anonymous receipt context, action, target, exact revision/operation, authorization result, correlation and time. State and required audit intent commit atomically; no personal free text, token or credential in logs. Publication/consent/intake changes remain attributable. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. No form text/email/password/token/full URL in telemetry; accepted intake, verified signup and activation are distinct events; no zero denominator invented as 0%; small cohorts suppressed by approved policy. |
| Privacy requirements | Minimize dimensions and retention, use pseudonymous references only when necessary, enforce scoped aggregate access and approved small-cell thresholds; no hidden fingerprinting. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Dashboard shows period, cohort, definition version, consent eligibility, freshness and suppressed/N/A cells; error states do not become zero conversions. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Event enum, unique event ID, content/campaign/offer public references, coarse locale/device class, occurrence time and consent proof/version.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | not permitted; permitted → queued → accepted/rejected; revoked before delivery → rejected; aggregate current/stale/unavailable. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Clock skew, offline batch after withdrawal, bots changing filter version, duplicate cross-product conversion, privacy deletion in aggregates. |
| Dependencies | PMS-INT-MAR-000008 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000001, PMS-RPT-MAR-000004, PMS-RPT-MAR-000005 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000016: Every optional accepted event has valid purpose evidence; dashboards distinguish request receipt from product activation and explain missing/suppressed data. |
| Test scenarios | PMS-TST-MAR-000016: Withdraw consent before batch arrives and reject it; inject unknown PII field and reject schema; replay event doesn't increase count; missing activation data appears unavailable not zero. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.17 Consent and communication preference management

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000017 |
| Name | Consent and communication preference management |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-002 |
| Module | PMS-MOD-MAR-002-008 |
| Purpose | Let visitors make and withdraw granular optional-data choices without losing essential site functionality. |
| Business value | Let visitors make and withdraw granular optional-data choices without losing essential site functionality. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Visitor/subscriber, privacy reviewer; consent/communication service. |
| Personas | Visitor/subscriber, privacy reviewer; consent/communication service. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Purpose/vendor disclosure; accept/reject optional choices; preference center; consent version; withdrawal; newsletter request/confirm/unsubscribe. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor first encounters optional purposes, revisits preferences or requests newsletter subscription. |
| Main workflow | PMS-WFL-MAR-000017: Load approved purpose/version policy → default optional collection off → visitor chooses accept/reject/custom → persist effective versioned receipt → enable only permitted vendors/events → preference changes immediately stop denied collection → reconcile server and downstream suppression → newsletter remains pending until explicit confirmation. |
| Alternate workflows | Policy service unavailable keeps optional purposes off; anonymous withdrawal works through scoped preference capability; repeated newsletter request returns generic response without reactivating withdrawal. |
| Exception workflows | unknown/off → chosen → recorded; policy changed → re-prompt as required; subscribed → withdrawn; requested → expired/confirmed. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Effective preferences/receipt version and confirmed/withdrawn newsletter state; no consent inferred from navigation. |
| UI behavior / components | Accessible banner with equal clear actions, focus-safe preference dialog, vendor/purpose explanations, persistent reopen control and clear saved state. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Purpose booleans, vendor scopes, policy version and subject binding; separate newsletter contact/request/confirmation token. |
| Outputs | Effective preferences/receipt version and confirmed/withdrawn newsletter state; no consent inferred from navigation. |
| Validation | Reject optional is as usable as accept; service/contact requests cannot require promotional consent; material purpose expansion requires new choice; old confirmation cannot override newer withdrawal. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Reject optional is as usable as accept; service/contact requests cannot require promotional consent; material purpose expansion requires new choice; old confirmation cannot override newer withdrawal. |
| Data entities | PMS-ENT-MAR-000006, PMS-ENT-MAR-000011 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | unknown/off → chosen → recorded; policy changed → re-prompt as required; subscribed → withdrawn; requested → expired/confirmed. |
| Permissions | PMS-PER-MAR-000010, PMS-PER-MAR-000011 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000007, PMS-API-MAR-000008, PMS-API-MAR-000009 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000005, PMS-EVT-MAR-000006 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000004, PMS-INT-MAR-000008 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000002 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Record actor or minimized anonymous receipt context, action, target, exact revision/operation, authorization result, correlation and time. State and required audit intent commit atomically; no personal free text, token or credential in logs. Publication/consent/intake changes remain attributable. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Reject optional is as usable as accept; service/contact requests cannot require promotional consent; material purpose expansion requires new choice; old confirmation cannot override newer withdrawal. |
| Privacy requirements | Consent evidence is minimized and retained under approved legal schedule; suppression and erasure are reconciled so deletion does not accidentally resubscribe a contact. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Accessible banner with equal clear actions, focus-safe preference dialog, vendor/purpose explanations, persistent reopen control and clear saved state. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Purpose booleans, vendor scopes, policy version and subject binding; separate newsletter contact/request/confirmation token.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; purposes/vendors/retention come only from privacy-approved policy. Configuration is not a secret store or permission bypass. |
| Error handling | unknown/off → chosen → recorded; policy changed → re-prompt as required; subscribed → withdrawn; requested → expired/confirmed. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Third-party script loaded before receipt, multiple tabs, policy changed while dialog open, deleted preference storage, bounced subscriber. |
| Dependencies | PMS-INT-MAR-000004, PMS-INT-MAR-000008 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000004 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000017: User can decline/withdraw without deceptive steps; browser stops optional collection immediately; server/downstream current state is version-monotonic and auditable. |
| Test scenarios | PMS-TST-MAR-000017: Before choice no optional vendor runs; reject still permits form/navigation; replay confirmation after withdrawal stays withdrawn; keyboard and screen-reader preference flow completes. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.18 Controlled content authoring, preview and publication

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000018 |
| Name | Controlled content authoring, preview and publication |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-003 |
| Module | PMS-MOD-MAR-003-001 |
| Purpose | Manage public content through immutable reviewed revisions and recoverable publication operations. |
| Business value | Manage public content through immutable reviewed revisions and recoverable publication operations. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Editor, reviewer, legal reviewer, publisher; content service and projection workers. |
| Personas | Editor, reviewer, legal reviewer, publisher; content service and projection workers. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Content list/create/edit; structured blocks/assets; revision diff; review/legal approvals; private preview; schedule; publish; withdraw; restore approved revision. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Editor creates/changes content or publisher schedules an approved revision. |
| Main workflow | PMS-WFL-MAR-000018: Load scoped base revision → edit validated structured blocks → save new immutable revision with expected version → attach current claim/asset/legal evidence → review exact hash → generate scoped expiring private preview → authorize schedule/publication → revalidate at execution → atomic live pointer/outbox → projection serving gate → report final operation outcome. |
| Alternate workflows | Review rejects with reason; concurrent edit creates conflict; publication failure retries same operation; rollback republishes a previously approved revision through a new audited operation. |
| Exception workflows | Draft/InReview/Rejected/Approved/Scheduled/Publishing/Live/Failed/Withdrawn per 3.7.1; preview active/expired/revoked. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Draft/review/publication/operation records and private preview grant; public content only after approved serving state. |
| UI behavior / components | Content workbench with state/version/locale, structured editor, validation, diff, review reason, publication schedule and impact disclosure; preview labeled private and excluded from public caching. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Item/type/locale, base revision, structured content, scanned asset refs, evidence refs, exact approval, schedule/timezone and idempotency key. |
| Outputs | Draft/review/publication/operation records and private preview grant; public content only after approved serving state. |
| Validation | No arbitrary script/HTML injection; preview grant bound to exact revision/path/actor or reviewer capability, persisted hash and expiry; approved revisions immutable; no self-approval where policy separates duties; old jobs cannot override newer withdrawal. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | No arbitrary script/HTML injection; preview grant bound to exact revision/path/actor or reviewer capability, persisted hash and expiry; approved revisions immutable; no self-approval where policy separates duties; old jobs cannot override newer withdrawal. |
| Data entities | PMS-ENT-MAR-000001, PMS-ENT-MAR-000002, PMS-ENT-MAR-000003, PMS-ENT-MAR-000004, PMS-ENT-MAR-000008, PMS-ENT-MAR-000010 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | Draft/InReview/Rejected/Approved/Scheduled/Publishing/Live/Failed/Withdrawn per 3.7.1; preview active/expired/revoked. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004, PMS-PER-MAR-000005, PMS-PER-MAR-000010 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000012, PMS-API-MAR-000013, PMS-API-MAR-000014, PMS-API-MAR-000015, PMS-API-MAR-000016, PMS-API-MAR-000020 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002, PMS-EVT-MAR-000008 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000007 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000004, PMS-NTF-MAR-000005 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Record actor or minimized anonymous receipt context, action, target, exact revision/operation, authorization result, correlation and time. State and required audit intent commit atomically; no personal free text, token or credential in logs. Publication/consent/intake changes remain attributable. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. No arbitrary script/HTML injection; preview grant bound to exact revision/path/actor or reviewer capability, persisted hash and expiry; approved revisions immutable; no self-approval where policy separates duties; old jobs cannot override newer withdrawal. |
| Privacy requirements | Preview tokens, reviewer identities and draft customer evidence never enter public HTML/logs; editor audit is scoped and content history retention follows approved policy. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Content workbench with state/version/locale, structured editor, validation, diff, review reason, publication schedule and impact disclosure; preview labeled private and excluded from public caching. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Item/type/locale, base revision, structured content, scanned asset refs, evidence refs, exact approval, schedule/timezone and idempotency key.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | Draft/InReview/Rejected/Approved/Scheduled/Publishing/Live/Failed/Withdrawn per 3.7.1; preview active/expired/revoked. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Large asset not yet scanned, claim expires before schedule, timezone change, asset removed after approval, partial cache invalidation. |
| Dependencies | PMS-INT-MAR-000007 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000018: Every live revision has exact valid approvals and source hash; private preview cannot be accessed through public cache/index; operation distinguishes committed pointer from projection readiness. |
| Test scenarios | PMS-TST-MAR-000018: Two publishers race and one version wins; preview token for another revision/path fails; revoke editor before scheduled execution; crash after live-pointer commit and replay outbox; withdrawn content cannot reappear from stale worker. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.19 Authoritative documentation discovery

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000019 |
| Name | Authoritative documentation discovery |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-003 |
| Module | PMS-MOD-MAR-003-002 |
| Purpose | Route readers to supported product/version documentation without maintaining a divergent copy of technical truth. |
| Business value | Route readers to supported product/version documentation without maintaining a divergent copy of technical truth. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Visitor, customer administrator, developer; documentation owner and projection consumer. |
| Personas | Visitor, customer administrator, developer; documentation owner and projection consumer. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Docs landing; category/search; quickstart; API/SDK/guides links; version selector; deprecated-version notice; broken-link monitoring. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor selects documentation or searches a supported topic. |
| Main workflow | PMS-WFL-MAR-000019: Load approved documentation projection → select product/version/category → show title/summary/owner/freshness → follow allowlisted authoritative destination → record only eligible navigation event; source withdrawal removes or replaces stale entry. |
| Alternate workflows | No current version available shows unavailable/contact; deprecated version retains clear status and replacement link if owner permits; search no matches suggests supported categories. |
| Exception workflows | current; stale; deprecated; withdrawn; no results; source unavailable. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Discoverable authoritative documentation link and explicit support/version state. |
| UI behavior / components | Product/version filters, categorized quickstart/API/SDK/guides cards, status labels and descriptive external link behavior. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Docs kind/product/version/category/query/cursor; owner-published public metadata and allowlisted URL. |
| Outputs | Discoverable authoritative documentation link and explicit support/version state. |
| Validation | Marketing copy must not override API schema or support window; no private docs indexed; unknown destination host rejected; source freshness and compatibility metadata required. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Marketing copy must not override API schema or support window; no private docs indexed; unknown destination host rejected; source freshness and compatibility metadata required. |
| Data entities | PMS-ENT-MAR-000009 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | current; stale; deprecated; withdrawn; no results; source unavailable. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000011, PMS-API-MAR-000002 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000006 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | N/A for this feature's Marketing-owned business flow; no email is sent merely for reading/clicking/calculating. Integrated identity/lifecycle notifications remain owner-controlled. |
| Audit requirements | Public reads are not individual business audit events; editorial changes to source content are audited through controlled publication. Keep operational access logs minimized; optional click analytics requires consent. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Marketing copy must not override API schema or support window; no private docs indexed; unknown destination host rejected; source freshness and compatibility metadata required. |
| Privacy requirements | Documentation discovery requires no identity; protected destination authenticates itself and receives no Marketing credentials. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Product/version filters, categorized quickstart/API/SDK/guides cards, status labels and descriptive external link behavior. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Docs kind/product/version/category/query/cursor; owner-published public metadata and allowlisted URL.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | current; stale; deprecated; withdrawn; no results; source unavailable. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Owner moves docs host, version removed, locale fallback, redirect chain into unapproved domain. |
| Dependencies | PMS-INT-MAR-000006 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000019: Every entry identifies an authoritative owner/version and approved target; private/unpublished material never appears; stale metadata is not labeled current. |
| Test scenarios | PMS-TST-MAR-000019: Withdraw private/deprecated entry from source and verify correct visibility; reject unsafe target; version selection preserves correct destination. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.20 Public Marketplace discovery

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000020 |
| Name | Public Marketplace discovery |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-003 |
| Module | PMS-MOD-MAR-003-003 |
| Purpose | Introduce approved ecosystem packages and hand off acquisition to the Marketplace owner. |
| Business value | Introduce approved ecosystem packages and hand off acquisition to the Marketplace owner. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Prospect, organization administrator, partner; Marketplace public-catalog consumer. |
| Personas | Prospect, organization administrator, partner; Marketplace public-catalog consumer. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Public featured packages; categories; search/filter; package summary; publisher verification label; compatibility/pricing status; Marketplace handoff. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor opens Marketplace discovery. |
| Main workflow | PMS-WFL-MAR-000020: Query approved public listing projection → filter by package type/product/category → display owner-approved summary/version/compatibility and current price status → follow canonical Marketplace listing → authenticated install/purchase happens only within Marketplace/OCC. |
| Alternate workflows | Suspended/revoked package removed from promotion; source outage shows stale/unavailable status and no transactional claims; unsupported host version is clearly shown. |
| Exception workflows | published/current; stale; incompatible; suspended/withdrawn; catalog unavailable; empty category. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Public listing summary and Marketplace destination; no local purchase, install, review or license. |
| UI behavior / components | Search/category filters, package cards with type and compatibility, clear external product handoff and no fake Install button. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Public catalog filters/cursor, listing ID, approved publisher/compatibility/offer metadata. |
| Outputs | Public listing summary and Marketplace destination; no local purchase, install, review or license. |
| Validation | Only approved published listings; no copied private reviews or customer installations; verification label reflects owner-defined scope; marketing cannot override package suspension or price. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Only approved published listings; no copied private reviews or customer installations; verification label reflects owner-defined scope; marketing cannot override package suspension or price. |
| Data entities | PMS-ENT-MAR-000009 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | published/current; stale; incompatible; suspended/withdrawn; catalog unavailable; empty category. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000011 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | N/A: this feature creates no marketing-owned record of this class; externally owned identity/provisioning effects use the listed integration contract. Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000006 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | N/A for this feature's Marketing-owned business flow; no email is sent merely for reading/clicking/calculating. Integrated identity/lifecycle notifications remain owner-controlled. |
| Audit requirements | Public reads are not individual business audit events; editorial changes to source content are audited through controlled publication. Keep operational access logs minimized; optional click analytics requires consent. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Only approved published listings; no copied private reviews or customer installations; verification label reflects owner-defined scope; marketing cannot override package suspension or price. |
| Privacy requirements | No organization installed-package inventory or private purchase data appears in the public projection. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Search/category filters, package cards with type and compatibility, clear external product handoff and no fake Install button. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Public catalog filters/cursor, listing ID, approved publisher/compatibility/offer metadata.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | published/current; stale; incompatible; suspended/withdrawn; catalog unavailable; empty category. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Package rename, publisher verification expiry, incompatible dependency, price changed after click. |
| Dependencies | PMS-INT-MAR-000006 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000001, PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000020: Marketing performs discovery only; every active listing maps to approved Marketplace ID and current eligibility; installation state never inferred from a click. |
| Test scenarios | PMS-TST-MAR-000020: Revoke listing and ensure promotional projection disappears; unauthorized/private package absent; handoff cannot install without Marketplace authorization. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

### 3A.2.21 Developer Platform discovery

| Field | Specification |
| --- | --- |
| Feature ID | PMS-FEA-MAR-000021 |
| Name | Developer Platform discovery |
| Product | PMS-PRD-MAR — Marketing Site |
| Application | PMS-APP-MAR-003 |
| Module | PMS-MOD-MAR-003-004 |
| Purpose | Show both builder capabilities and professional development paths while preserving Developer Platform authority. |
| Business value | Show both builder capabilities and professional development paths while preserving Developer Platform authority. Outcome is evaluated by the acceptance criteria and linked reports, not page presence. |
| Actors | Developer, technical buyer, publisher; Developer Platform documentation/catalog owner. |
| Personas | Developer, technical buyer, publisher; Developer Platform documentation/catalog owner. Persona is not authorization; assigned permission and record/collection scope are evaluated independently. |
| Capability / feature / sub-features | Application/full-stack builder introduction; Website Builder introduction; SDK/CLI/API discovery; extension/package lifecycle; sample resources; developer login handoff. |
| Preconditions | Approved source content/policy and supported locale are available; referenced owner services expose compatible contracts. Administrative actions require the listed grants and scope; public reading/intake uses the explicitly bounded anonymous policy. |
| Trigger | Visitor follows Developer Platform or builder discovery CTA. |
| Main workflow | PMS-WFL-MAR-000021: Load owner-approved developer capability projection → choose no-code/low-code/full-code or website/app path → show supported runtime/version/prerequisites → open authoritative docs/sample or owned developer workspace login → let Developer Platform create projects and credentials. |
| Alternate workflows | Unsupported runtime feature marked research; unavailable SDK version links approved alternatives; unauthenticated visitor may read public docs without creating a project. |
| Exception workflows | current supported path; planned/research; deprecated SDK; source unavailable; login pending at owner. Failures additionally follow the explicit matrix in Volume 3 section 3.9; an accepted downstream operation is never represented as a completed business result. |
| Postconditions | Developer capability explanation and authoritative workspace/docs handoff; no API key, sandbox or project created by Marketing. |
| UI behavior / components | Two builder paths plus full-code tooling, prerequisite/version labels, accessible sample links and clear workspace CTA. Apply all loading/empty/error/forbidden/offline/conflict behavior defined in 3.2.1 where the action exists. |
| Inputs | Capability path, product version, approved public documentation/sample references and safe destination. |
| Outputs | Developer capability explanation and authoritative workspace/docs handoff; no API key, sandbox or project created by Marketing. |
| Validation | Both builders are under PMS-PRD-DEV; no universal-code/export promise without evidence; sample downloads must be scanned/approved and versioned; credentials generated only by owning service. Enforce schema, allowed enums, size limits and safe URLs at the service boundary (3.5.1), not just in the browser. |
| Business rules | Both builders are under PMS-PRD-DEV; no universal-code/export promise without evidence; sample downloads must be scanned/approved and versioned; credentials generated only by owning service. |
| Data entities | PMS-ENT-MAR-000009, PMS-ENT-MAR-000001, PMS-ENT-MAR-000002, PMS-ENT-MAR-000003, PMS-ENT-MAR-000004 Field/ownership/lifecycle definitions: Volume 3 section 3.4. |
| State transitions | current supported path; planned/research; deprecated SDK; source unavailable; login pending at owner. |
| Permissions | PMS-PER-MAR-000001, PMS-PER-MAR-000002, PMS-PER-MAR-000003, PMS-PER-MAR-000004 These govern the specific administrative actions, not anonymous page reading. Server checks scope and current grant; provider/tenant authority never crosses implicitly. |
| APIs | PMS-API-MAR-000011, PMS-API-MAR-000001 Exact proposed input/output/error/idempotency contracts: Volume 3 section 3.5. |
| Events | PMS-EVT-MAR-000001, PMS-EVT-MAR-000002 Published business events are separate from optional browser analytics; outbox and delivery rules are in 3.6.1. |
| Integrations | PMS-INT-MAR-000001, PMS-INT-MAR-000006 Each owner/destination/retry boundary is defined in 3.6.2. |
| Notifications | PMS-NTF-MAR-000005 Use approved locale templates, consent/purpose, deduplication and safe links; delivery failure does not retry the original business mutation. |
| Audit requirements | Public reads are not individual business audit events; editorial changes to source content are audited through controlled publication. Keep operational access logs minimized; optional click analytics requires consent. |
| Security requirements | Apply deny-by-default administration, explicit anonymous policy, server scope/input checks, output escaping, no private cache/index leakage, safe redirect/egress and bounded abuse controls from 3.3/3.5/3.9. Both builders are under PMS-PRD-DEV; no universal-code/export promise without evidence; sample downloads must be scanned/approved and versioned; credentials generated only by owning service. |
| Privacy requirements | Workspace authentication and developer identifiers remain within the owning platform; public samples contain no secrets or customer data. |
| Performance requirements | Apply proposed measured budgets in 3.8: cached public response P95 ≤300ms, visible content ≤2.5s on declared mobile profile, intake P95 ≤1s where used, projection readiness P95 ≤60s where publishing. Owner service latency is shown as pending/unavailable; no synchronous notification or remote call holds a DB transaction. Budgets require workload approval. |
| Accessibility requirements | Two builder paths plus full-code tooling, prerequisite/version labels, accessible sample links and clear workspace CTA. Verify semantic names/roles, focus/order, errors/live status, keyboard-only operation, screen-reader output, zoom/reflow, contrast and reduced motion under 3.2.1. Diagrams/charts have text/table equivalent. |
| Localization | Use approved locale revision and declared fallback; preserve product identity, decimal/currency/unit meaning and timezone on schedules. Translated legal/claim text retains required review; do not auto-publish machine translation. |
| Configuration | Allowed locales/routes and feature-specific inputs (Capability path, product version, approved public documentation/sample references and safe destination.) are typed, versioned, scoped and reviewed. Rate/size limits use 3.5.1; source content/approval/evidence rules come from the owning content or integrated service. Configuration is not a secret store or permission bypass. |
| Error handling | current supported path; planned/research; deprecated SDK; source unavailable; login pending at owner. Return canonical non-disclosing errors/correlation; retain safe user draft on failure; unknown mutation outcome reuses idempotency or owner operation. Recovery never displays fake success. |
| Edge cases | Runtime support retired, example requires unavailable extension, sample license changes, locale documentation unavailable. |
| Dependencies | PMS-INT-MAR-000001, PMS-INT-MAR-000006 Platform prerequisites: owned UI/tokens, valid contracts, operational correlation, privacy/legal policy and source-of-truth reconciliation. Cross-product dependencies remain in Volume 0/2. |
| Reports / analytics | PMS-RPT-MAR-000001, PMS-RPT-MAR-000003 Only schema-allowlisted, consent-eligible public interaction events; report definitions are in 3.6.2. |
| Requirement / acceptance criteria | PMS-REQ-FUN-MAR-000021: Developer can find the correct owner/version for each supported workflow; Marketing exposes no credentials or private project metadata and creates no extra top-level product. |
| Test scenarios | PMS-TST-MAR-000021: Both builders map to DEV; private sample/credential excluded; deprecated SDK link carries version status; marketing route cannot create privileged project. Also execute applicable invalid input, unauthorized/revoked grant, duplicate/race, network/database/cache/queue/provider outage and recovery cases from 3.9. Expected result is exactly the feature's state/acceptance rule; runtime evidence NOT RUN. |
| Implementation / evidence status | PROPOSED specification; no runtime pass, deployed route or owner approval inferred. Reconcile source contracts and resolve PMS-TBD-0015–0019 before implementation approval. |

## 3A.3 Completeness and test execution boundary

All 21 registered modules have a significant feature record with the source brief's required fields, an explicit workflow, primary screen and requirement/test identity. This is authored field coverage, not proof that every future sub-feature or implementation contract is complete. The shared API/entity proposals and named owner decisions must be reconciled before implementation. Functional scenario execution, accessibility evidence, load tests, security negatives and recovery rehearsals remain required for the product release; no generated document check can establish them.

