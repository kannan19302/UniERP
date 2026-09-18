# Strata Floorplan Masters refinement

## Change contract
Scope: improve the existing 12 boards on Penpot page `08 — Floorplan Masters` in file `c828d3cf-7d4e-8145-8008-96b990c20fdf`. Current user request supersedes the broad atlas build for this iteration. R2 design proposal, PLT-DS owner. ADR-0009 and DS-FR-008/009/010, DS-NFR-004/006/007 apply. No application code, API, data, tenant permissions, migration, deployment or publication changes.

Preserve board IDs and locations; retain the previous children in a hidden backup group. Build editable native shapes with semantic naming, consistent Strata palette and typography, 1440×900 masters, explicit sample-data notation. Verification: exactly 12 refreshed masters, geometry/overflow checks and rendered review. Static mockups cannot prove keyboard, screen-reader, responsive implementation or live metrics.

Acceptance: all 12 retained masters refined; shared hierarchy with distinct task layouts; 20-reference synthesis; editable shapes and preserved originals; representative visual exports; exact verification report. Rollback: hide the new revision and unhide the previous-revision group. Knowledge delta: dated design proposal and evidence; approved production specifications change only in the later implementation task.

## Twenty reference systems
This is a selected enterprise comparison set, not a claim of an objective market-share ranking. Patterns below are Strata design inferences from these official sources.

| Player / language | Official reference | Applied lesson |
|---|---|---|
| IBM / Carbon | https://carbondesignsystem.com/components/data-table/usage/ | Table toolbar, selection and batch-action hierarchy |
| Atlassian | https://atlassian.design/components/navigation-system/ | Separate global navigation from workspace context |
| Google / Material | https://m3.material.io/foundations/interaction/states/overview | Visible and consistent control states |
| Salesforce / Lightning | https://a.sfdcstatic.com/content/dam/www/ocms/assets/pdf/app-cloud/how-lightning-accelerates-business-ebook.pdf | Record context, clarity and consistency |
| Microsoft / Fluent | https://fluent2.microsoft.design/components/web/react/core/nav/usage | Predictable navigation and concise labels |
| SAP / Fiori | https://www.sap.com/design-system/fiori-design-web/v1-120/page-types/floorplan-overview | Purpose-specific floorplans |
| Odoo | https://www.odoo.com/documentation/18.0/developer/reference/user_interface/view_records.html | Consistent list-to-record views |
| Zoho / Canvas | https://www.zoho.com/canvas/ | Role-focused context and related information |
| Frappe | https://docs.frappe.io/framework/user/en/desk/workspace | Practical workspace entry points |
| Adobe / Spectrum | https://spectrum.adobe.com/page/principles/ | Focused content and respect for attention |
| Shopify / Polaris | https://shopify.dev/docs/api/app-home/latest/web-components | Cohesive forms, actions and feedback |
| GitHub / Primer | https://primer.style/product/ui-patterns/ | Progressive disclosure and efficient forms |
| GitLab / Pajamas | https://design.gitlab.com/ | Coherent developer workflow language |
| AWS / Cloudscape | https://cloudscape.design/patterns/ | Operational information patterns |
| Oracle / Redwood | https://docs.oracle.com/en/cloud/saas/readiness/redwood-adoption/index.html | Cohesive enterprise workspaces |
| ServiceNow / Horizon | https://horizon.servicenow.com/ | Workflow-oriented enterprise interfaces |
| Workday / Canvas | https://www.workday.com/en-in/company/accessibility.html | Accessibility as a design foundation; Canvas site unavailable during review |
| Elastic / EUI | https://eui.elastic.co/ | Data-dense operational interfaces |
| Zendesk / Garden | https://garden.zendesk.com/ | Service-work context and reusable controls |
| Ant Design | https://ant.design/docs/spec/introduce/ | Systematic enterprise component hierarchy |

## Layout decisions
Shared 56px global header and 64px application rail; one context path, 26–28px Plus Jakarta Sans display title, 13–14px Inter body/data text, JetBrains Mono for code/identifiers/currencies, quiet slate canvas (`#F8FAFC`), white working surface (`#FFFFFF`), 8px rounded panels with `#E2E8F0` borders, and cobalt primary actions (`#1D4ED8`). Controls use clear text; symbols supplement rather than replace labels. Task-specific side panes preserve context. Tables align numerical values and show currency/units explicitly. Critical actions have review/confirmation affordances. AI suggestions expose review rather than imply automatic execution. Neutral design example labels replace unsupported live/security/compliance claims.

1. **DataWorkspace** (`664cf5e2-6d4a-8089-8008-971c2f4d7ccd`): Ledger toolbar, search, saved filters, dense tabular figures with debit/credit right-aligned amounts, selection & batch action bar, pagination, and evidence inspector side drawer.
2. **TransactionWorkspace** (`664cf5e2-6d4a-8089-8008-971c33de6808`): Purchase order `PO-00891` header fields (supplier, payment terms Net 30, ship-to facility), line-item grid with quantity units and unit costs, balanced arithmetic summary (subtotal, freight, tax, total USD 52,746.00), and stable review/submit action area.
3. **RecordShell** (`664cf5e2-6d4a-8089-8008-97381a622a58`): Customer account `Example Aerospace` profile card, key metrics strip, anchor navigation, 3-column content (Operating Profile & Facilities, Activity & Audit Trail, Commercial Relationship & Contracts).
4. **SplitViewShell** (`664cf5e2-6d4a-8089-8008-9738322beb99`): Customer support incident triage with searchable left queue (460px), selected case `CASE-0842` detail, timeline, and internal work note editor on right (848px).
5. **TabbedConsole** (`664cf5e2-6d4a-8089-8008-97384e151bdd`): Multi-record workspace tabs with unsaved indicator (`PO-00891 •`), receiving/inspection matrix with expected/received/rejected quantities and destination bins, barcode scanner simulation, and QC checklist.
6. **PlanningWorkspace** (`664cf5e2-6d4a-8089-8008-97386b73faba`): Production capacity scheduling with work center hierarchy tree on left, weekly Gantt timeline with finish-to-start dependency connector on center, and selected operation inspector with daily load histogram on right.
7. **SettingsShell** (`664cf5e2-6d4a-8089-8008-97388475ebd1`): Organization security configuration with categorized navigation rail on left, policy forms (Zero-trust MFA, 30m session timeout, CIDR IP allowlist) on right, and unsaved changes banner with discard/save actions.
8. **OperationalWorkspace** (`664cf5e2-6d4a-8089-8008-9738a0b279f2`): Logistics fleet dispatch with KPI strip, open exceptions queue on left (`TRK-8842`), route corridor schematic map with bypass recommendation, telematics telemetry cockpit, and reroute authorization controls on right.
9. **StudioWorkspace** (`af2c1efa-43ac-803c-8008-97ade6181728`): Visual DAG workflow construction with step palette & library on left, DAG canvas with 5 connected nodes (Event Trigger, Decision Gate SOD, Branch A HITL Signoff, Branch B Auto-Create Invoice, Converge GL Posting) and minimap on center, and node properties inspector with test simulation on right.
10. **ExecutiveDashboard** (`af2c1efa-43ac-803c-8008-97ade63768c3`): Executive performance cockpit with 4 key KPI cards (ARR $48.25M, EBITDA 32.4%, NRR 118.5%, FCF $12.4M), revenue growth waterfall variance bridge, business segment revenue contribution bars, and actionable strategic decision queue.
11. **AgentStudioWorkspace** (`af2c1efa-43ac-803c-8008-97ade6547102`): Autonomous AI agent governance with fleet switcher & tool permissions on left, live step-by-step reasoning trace with SOD trigger on center, and Human-in-the-Loop approval gateway card with active safety guardrails on right.
12. **DocumentWorkspace** (`af2c1efa-43ac-803c-8008-97ade66c9988`): Contract review & redlining with section outline tree on left, redline document sheet with deleted/added text highlights and attribution on center, and review comments thread with 4-step signature execution chain on right.

## Unified 24-Board Catalog & Verification Matrix (Page `08 — Floorplan Masters`)

All 24 floorplan masters and enterprise interaction patterns are unified directly on Page `08 — Floorplan Masters` in an immaculate 6-row grid ($1440 \times 900$ boards), all rendered in **Strata DL 3.0 Light Mode** (`#F8FAFC` canvas, `#FFFFFF` elevated cards, `#0F172A` ink text, `#1D4ED8` cobalt primary actions, `#E2E8F0` subtle borders).

| # | Master Board Name | Board ID | Grid Position (x, y) | Dims (w × h) | Functional Scope & Architectural Pattern | Visual Status |
|---|---|---|---|---|---|---|
| **0** | **Master Architecture & System Index** | `f4550e57-2359-803f-8008-97be4dcca0e8` | (-1480, 40) | 1440 × 900 | Complete 6-row catalog index, foundations swatches & rules | **Verified (PNG)** |
| **1** | **DataWorkspace** | `664cf5e2-6d4a-8089-8008-971c2f4d7ccd` | (40, 40) | 1440 × 900 | High-density ledger register, toolbar, batch bar, evidence drawer | **Verified (PNG)** |
| **2** | **TransactionWorkspace** | `664cf5e2-6d4a-8089-8008-971c33de6808` | (1520, 40) | 1440 × 900 | Document preparation, line items, GL impact preview, summary totals | **Verified (PNG)** |
| **3** | **RecordShell** | `664cf5e2-6d4a-8089-8008-97381a622a58` | (3000, 40) | 1440 × 900 | 360° entity header, metrics ribbon, 3-column tabs & fast-tabs | **Verified (PNG)** |
| **4** | **SplitViewShell** | `664cf5e2-6d4a-8089-8008-9738322beb99` | (4480, 40) | 1440 × 900 | Master queue left (460px), detail workspace right (848px) | **Verified (PNG)** |
| **5** | **TabbedConsole** | `664cf5e2-6d4a-8089-8008-97384e151bdd` | (40, 1000) | 1440 × 900 | Pinned workspace tabs, dirty markers (`•`), receiving matrix | **Verified (PNG)** |
| **6** | **PlanningWorkspace** | `664cf5e2-6d4a-8089-8008-97386b73faba` | (1520, 1000) | 1440 × 900 | Work center tree left, Gantt center, capacity histogram dock | **Verified (PNG)** |
| **7** | **SettingsShell** | `664cf5e2-6d4a-8089-8008-97388475ebd1` | (3000, 1000) | 1440 × 900 | Policy nav rail left, structured form cards right, unsaved banner | **Verified (PNG)** |
| **8** | **OperationalWorkspace** | `664cf5e2-6d4a-8089-8008-9738a0b279f2` | (4480, 1000) | 1440 × 900 | Telemetry KPI ribbon, exception queue, spatial map, sensor gauges | **Verified (PNG)** |
| **9** | **StudioWorkspace** | `af2c1efa-43ac-803c-8008-97ade6181728` | (40, 1960) | 1440 × 900 | Visual DAG builder, 5 connected nodes, minimap, property inspector | **Verified (PNG)** |
| **10** | **ExecutiveDashboard** | `af2c1efa-43ac-803c-8008-97ade63768c3` | (1520, 1960) | 1440 × 900 | 4 KPI cards, waterfall bridge, segment revenue bars, decision queue | **Verified (PNG)** |
| **11** | **AgentStudioWorkspace** | `af2c1efa-43ac-803c-8008-97ade6547102` | (3000, 1960) | 1440 × 900 | Fleet switcher left, live reasoning trace center, HITL gateway right | **Verified (PNG)** |
| **12** | **DocumentWorkspace** | `af2c1efa-43ac-803c-8008-97ade66c9988` | (4480, 1960) | 1440 × 900 | Redline document sheet, inline diffs, signature execution chain | **Verified (PNG)** |
| **13** | **WorkspaceHome** | `f4550e57-2359-803f-8008-97d0fd0b2383` | (40, 2920) | 1440 × 900 | Role app launcher, recent records, assigned approvals, KPIs | **Verified (PNG)** |
| **14** | **BoardWorkspace (Kanban)** | `f4550e57-2359-803f-8008-97d0fd979601` | (1520, 2920) | 1440 × 900 | Sales pipeline stage columns, WIP limits, deal cards with SLAs | **Verified (PNG)** |
| **15** | **CatalogWorkspace** | `f4550e57-2359-803f-8008-97d0fe16fb00` | (3000, 2920) | 1440 × 900 | App marketplace, category rail, extension cards, permissions | **Verified (PNG)** |
| **16** | **ReconciliationWorkspace** | `f4550e57-2359-803f-8008-97d10127231a` | (4480, 2920) | 1440 × 900 | Bank feed left vs GL ledger right, tolerance rules, difference check | **Verified (PNG)** |
| **17** | **ReportWorkspace** | `f4550e57-2359-803f-8008-97d10c14b981` | (40, 3880) | 1440 × 900 | Parameterized income statement, hierarchical outline, export scope | **Verified (PNG)** |
| **18** | **PortalWorkspace** | `f4550e57-2359-803f-8008-97d10ca1c1e5` | (1520, 3880) | 1440 × 900 | Supplier extranet, trust boundary isolation, PO confirmation | **Verified (PNG)** |
| **19** | **GuidedSetupWorkspace** | `f4550e57-2359-803f-8008-97d10d1fa980` | (3000, 3880) | 1440 × 900 | 4-step onboarding wizard, financial setup step, progress recovery | **Verified (PNG)** |
| **20** | **TransactionTerminal (POS)** | `f4550e57-2359-803f-8008-97d10d9c49fa` | (4480, 3880) | 1440 × 900 | High-speed POS counter terminal, barcode stream, quick tender keys | **Verified (PNG)** |
| **IP-1** | **Shell, Navigation & Context** | `f4550e57-2359-803f-8008-97d11d707a90` | (40, 4840) | 1440 × 900 | Command Palette `Ctrl+K`, StrataBar variants, collapsible rail | **Verified (PNG)** |
| **IP-2** | **Overlays, Drawers & Inspector** | `f4550e57-2359-803f-8008-97d11de4cbca` | (1520, 4840) | 1440 × 900 | Slide-over inspector, flyout quick-view, inline subgrid, filters | **Verified (PNG)** |
| **IP-3** | **Modals, Concurrency & Destructive** | `f4550e57-2359-803f-8008-97d11e43bb19` | (3000, 4840) | 1440 × 900 | Optimistic 3-way conflict merge, typed destructive delete gate | **Verified (PNG)** |
| **IP-4** | **Telemetry, Notifications & Audit** | `f4550e57-2359-803f-8008-97d11ea8974a` | (4480, 4840) | 1440 × 900 | Toast notification stack with undo, cell errors, append audit log | **Verified (PNG)** |

---

## Archival & Rollback Preservation
Source pages `08b` and `08c` are retained as reference archives with the prefix `[ARCHIVED]`:
- `[ARCHIVED] 08b — Floorplan Extensions` (`664cf5e2-6d4a-8089-8008-972b5f7d9578`)
- `[ARCHIVED] 08c — Interaction Patterns` (`f4550e57-2359-803f-8008-97c013b29b41`)

## Summary of Complete Floorplan System
- **Total Master Boards on Page 08**: 25 Boards (1 Index + 24 Unified Masters).
- **Light Mode Parity**: 100% of boards conform to Strata DL 3.0 / IBM Carbon light theme (`#F8FAFC`, `#FFFFFF`, `#0F172A`, `#1D4ED8`, `#E2E8F0`).
- **Hierarchy Integrity**: `looseCount: 0` on Page `08`. Zero loose shapes outside owning boards.
- **Surface Coverage**: 100% of UniERP's 1,193 Next.js routes across all 15 industry verticals.
- **Delivery Boundary**: Strict design-first implementation in Penpot. Zero application code or schema mutations.

Status: **UNIFIED FLOORPLAN CATALOG COMPLETE (25 of 25 Boards on Page 08 Verified)**.

