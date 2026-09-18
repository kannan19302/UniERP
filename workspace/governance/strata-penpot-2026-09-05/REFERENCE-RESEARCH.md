# Strata reference research — 2026-09-05

Design synthesis, not copied branding. These references inform proposed interaction patterns, enterprise layouts, high-density data workspaces, and state machines; they do not prove UniERP implementation.

---

## 1. Enterprise Design Systems & Design Languages (1–25)

| # | Reference / Design System | Primary Evidence URL | Strata UI/UX Architecture Application |
|---|---|---|---|
| 1 | **IBM Carbon Design System** | https://carbondesignsystem.com/components/data-table/usage/ | High-density data table toolbars, batch operations, deterministic selection, explicit AI presence, dark/light token hierarchy |
| 2 | **Atlassian Design System** | https://atlassian.design/components/navigation-system/ | Two-tier layout: global workspace rail separated from contextual domain tree, collapsible left navigation, command bar integration |
| 3 | **Google Material Design 3 (M3)** | https://m3.material.io/foundations/interaction/states/overview | Mathematical state layers (hover, focus-visible, pressed, disabled), elevated surfaces, tonal palettes, accessible color tokens |
| 4 | **Microsoft Fluent 2** | https://fluent2.microsoft.design/components/web/react/core/nav/usage | Enterprise desktop density, command ribbon ergonomics, fluent acrylic surfaces, sentence-case microcopy hierarchy |
| 5 | **SAP Fiori Web (v1.120+)** | https://www.sap.com/design-system/fiori-design-web/v1-120/page-types/floorplan-overview | Canonical enterprise floorplans: List Report, Object Page, Analytical Dashboard, Flexible Column Workspace |
| 6 | **SAP UI5 Flexible Column Layout** | https://help.sap.com/docs/SAPUI5/b2f662dd9d7a4ec680056733050b4d34/75631b78e3444231bb31cf80b3b50922.html | Master-detail-detail multi-column inspection preserving list context without opening intrusive dialog overlays |
| 7 | **Salesforce Lightning Design System (SLDS)** | https://www.lightningdesignsystem.com/guidelines/overview/ | Record home layouts, compact header metadata strips, utility bar, path/stage chevron progression indicators |
| 8 | **Shopify Polaris** | https://polaris.shopify.com/components/data-display/index-table | E-commerce transaction UX, badge semantic indicators, sticky bulk action bars, filter bar chip mechanics |
| 9 | **GitHub Primer** | https://primer.style/design/components/action-list | Ultra-dense developer workspaces, keyboard shortcuts, accessible disclosure triangles, command palettes, markdown previews |
| 10 | **GitLab Pajamas** | https://design.gitlab.com/components/data-visualization | Complex devops state display, multi-tier breadcrumb navigation, merge/audit diff representations, pipeline flow trees |
| 11 | **Workday Canvas Design System** | https://canvas.workday.com/ | HCM/Finance dual-pane transaction forms, prompt selectors, inline validation, enterprise approval workflows |
| 12 | **ServiceNow Design System (Next Experience)** | https://developer.servicenow.com/dev.do#!/guide/quebec/now-experience/ux-framework/overview | ITIL incident workspaces, configurable multi-tab record shells, activity streams, real-time agent sidebars |
| 13 | **Oracle Redwood Design System** | https://redwood.oracle.com/ | Consumer-grade enterprise aesthetic, telemetry hero cards, AI assist flyouts, clean sans typography over deep slate |
| 14 | **Stripe Design & Components (Sail)** | https://stripe.com/docs/elements | Flawless payment state machines, ultra-crisp micro-interactions, contextual error recovery, zero-friction inline edits |
| 15 | **Uber Base Web** | https://baseweb.design/components/table-semantic/ | Strict theme contract, responsive data grid pagination, ultra-accessible accessible date-time & slider primitives |
| 16 | **Palantir Blueprint** | https://blueprintjs.com/docs/#core/components | Complex desktop analytical applications, numeric matrix manipulation, hotkey command tables, popover hierarchies |
| 17 | **Adobe Spectrum** | https://spectrum.adobe.com/page/action-bar/ | Creative/production tooling ergonomics, floating contextual action docks, unified canvas property inspectors |
| 18 | **Airbnb DLS (Design Language System)** | https://airbnb.design/building-a-visual-language/ | Unified cross-platform component tokens, card spacing rhythm, high-clarity typography scale |
| 19 | **Audi Design System** | https://www.audi.com/ci/en/renewed-brand/design-system.html | Strict functional minimalism, high-contrast monochrome foundations, razor-sharp technical grid layouts |
| 20 | **Porsche Design System** | https://designsystem.porsche.com/ | Precision industrial aesthetics, high-performance web components, compact controls, structured forms |
| 21 | **Goldman Sachs Design System** | https://design.gs.com/ | Financial data density, high-velocity trading table interactions, numeric formatting, audit compliance indicators |
| 22 | **Morningstar Design System (MDS)** | https://designsystem.morningstar.com/ | Investment analytical charts, historical trend sparklines, dense portfolio comparison matrices, dark data modes |
| 23 | **Intuit Design System (DS2)** | https://designsystem.intuit.com/ | Small-to-medium business accounting workflows, guided tax wizard step progressions, trust cues |
| 24 | **Square Market Design System** | https://developer.squareup.com/docs/sdks/web | Point-of-Sale touch-and-keyboard ergonomics, instant split-bill flows, item catalogue grid-to-ticket transitions |
| 25 | **Cisco Momentum Design** | https://momentum.design/ | Collaboration toolbars, meeting telemetry badges, responsive network node canvas inspectors |

---

## 2. Cloud ERP, Financial & CRM Platforms (26–45)

| # | Reference Platform | Primary Evidence URL | Strata UI/UX Architecture Application |
|---|---|---|---|
| 26 | **Salesforce CRM Lightning Experience** | https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/lightning.pdf | Complex B2B customer 360, related record child tabs, activity timeline events, Kanban drag-and-drop opportunity pipelines |
| 27 | **Odoo ERP UI Architecture** | https://www.odoo.com/documentation/18.0/developer/reference/user_interface/view_records.html | Multi-view parity (form, tree/list, kanban, pivot, calendar, graph) backed by declarative domain model metadata |
| 28 | **Zoho Canvas & CRM Studio** | https://www.zoho.com/canvas/ | Drag-and-drop record layout personalization, visual field groupings, contextual quick action side-drawers |
| 29 | **Frappe Framework / ERPNext Desk** | https://docs.frappe.io/framework/user/en/desk/workspace | Module desk workspace tiles, shortcut command cards, inline quick-entry popups, DocType audit timelines |
| 30 | **NetSuite SuiteCloud UI** | https://www.netsuite.com/portal/products/erp.shtml | Multi-subsidiary accounting consoles, subledger transaction tables, sub-tabbed tax and fulfillment records |
| 31 | **Microsoft Dynamics 365 Business Central** | https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-pages-overview | FactBox sidebar panels providing live telemetry without navigating away from the active transaction record |
| 32 | **Acumatica Cloud ERP** | https://www.acumatica.com/cloud-erp-software/ | Generic inquiry filter builders, tabbed document entry screens, release/hold status flow orchestrations |
| 33 | **Workday Financial Management** | https://www.workday.com/en-us/products/financial-management.html | Period close dashboards, multi-currency ledger reconciliation grids, drill-down journal voucher inspectors |
| 34 | **Coupa Spend Management** | https://www.coupa.com/products/procurement/ | Requisition-to-PO automated matching flows, invoice deviation warnings, multi-level purchase approval chains |
| 35 | **Xero Accounting** | https://www.xero.com/us/accounting-software/bank-reconciliation/ | High-speed bank rule reconciliation UX, side-by-side statement matching, instant transaction creation |
| 36 | **QuickBooks Online Advanced** | https://quickbooks.intuit.com/online/advanced/ | Batch transaction invoicing, custom user permission matrix builders, real-time cash flow forecast cards |
| 37 | **HubSpot CRM** | https://www.hubspot.com/products/crm | Activity log stream, bi-directional email/call logging, left-pane properties panel with right-pane association cards |
| 38 | **Pipedrive** | https://www.pipedrive.com/ | Visual sales funnel pipelines, decay time indicators on stagnating deals, velocity metric badges |
| 39 | **Sage Intacct** | https://www.sage.com/en-us/products/sage-intacct/ | Dimensional chart-of-accounts selection, drill-down financial report builders, multi-entity consolidation views |
| 40 | **Tipalti Global Payables** | https://tipalti.com/product/mass-payments/ | Multi-subsidiary supplier onboarding forms, tax form (W-9/W-8BEN) verification flows, remittance batch approvals |
| 41 | **Bill.com** | https://www.bill.com/ | Split-screen AP workflow: scanned invoice PDF viewer on left, OCR field extraction form on right |
| 42 | **Brex Financial OS** | https://www.brex.com/product/spend-management/ | Corporate card spend limit visualizers, automatic receipt matching notifications, modern expense tagging |
| 43 | **Ramp Spend Management** | https://ramp.com/ | Intelligent expense policy guardrails, automated receipt extraction drawers, real-time savings insights |
| 44 | **Carta Equity Management** | https://carta.com/ | Cap table scenario modeling sliders, option vesting schedules, share certificate cryptographic visualizers |
| 45 | **Mercury Banking OS** | https://mercury.com/ | Minimalist fintech UI, wire transfer dual-approval modals, multi-account cash sweep visualizations |

---

## 3. High-Density Data Grids, BI & Analytics (46–65)

| # | Reference Platform / Library | Primary Evidence URL | Strata UI/UX Architecture Application |
|---|---|---|---|
| 46 | **AG Grid Enterprise** | https://www.ag-grid.com/javascript-data-grid/ | Pivoting, row grouping, tree data, virtualized rendering (100k+ rows), column pin/resize, cell renderer pipelines |
| 47 | **Handsontable** | https://handsontable.com/ | Excel-grade spreadsheet UX inside web browsers, formula recalculation, auto-fill drag handles, copy-paste TSV/CSV |
| 48 | **Snowflake Snowsight** | https://docs.snowflake.com/en/user-guide/ui-snowsight | Multi-tab worksheet editors, inline chart generation from query results, role-based database object tree navigation |
| 49 | **Databricks Workspace UI** | https://docs.databricks.com/en/workspace-index.html | Computational notebook cells, cluster compute status pills, catalog schema explorer sidebar, SQL query lineage maps |
| 50 | **Tableau Public & Server** | https://help.tableau.com/current/pro/desktop/en-us/default.htm | Visual analytical marks, drag-and-drop dimension shelves, coordinated interactive cross-filtering dashboards |
| 51 | **Looker (Google Cloud)** | https://cloud.google.com/looker/docs/exploring-data | Explore query builder, measure/dimension categorization, drill-down data modal sheets, scheduled report triggers |
| 52 | **Grafana Observability Dashboards** | https://grafana.com/docs/grafana/latest/dashboards/ | Real-time streaming time-series graphs, threshold heatmaps, variable dropdown selectors, panel inspection drawers |
| 53 | **Datadog Dashboard & APM** | https://docs.datadoghq.com/dashboards/ | Incident timeline scrubbing, flame graphs for distributed traces, faceted search filters with auto-complete |
| 54 | **Elastic Kibana Discover** | https://www.elastic.co/guide/en/kibana/current/discover.html | Document field hit lists, histogram time interval brushes, Lucene/KQL query bar ergonomics, JSON doc expansion |
| 55 | **Airtable Grid & Interfaces** | https://www.airtable.com/product/interface-designer | Relational field link chips, inline record expansion, grouped view headers, conditional cell highlighting rules |
| 56 | **Metabase Open Source BI** | https://www.metabase.com/docs/latest/questions/sharing/visualizations | Natural question query builder, frictionless aggregation toggles, automatic X-ray exploratory dashboards |
| 57 | **Hex Interactive Notebooks** | https://hex.tech/ | Logic graph DAG visualizer, interactive parameter sliders, reactive downstream cell updates, publish app layouts |
| 58 | **Mode Analytics** | https://mode.com/ | Unified SQL, Python and visual reporting canvas, shared enterprise data catalog tags, parameter query forms |
| 59 | **Power BI Service** | https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions | Matrix visuals with conditional formatting icons, drill-through page links, visual filter pane accordions |
| 60 | **D3.js Observable** | https://observablehq.com/ | High-performance interactive SVG/Canvas charts, custom layout algorithms, reactive computational flow |
| 61 | **Apache Superset** | https://superset.apache.org/docs/intro/ | Enterprise chart library integration, SQL Lab IDE with query history and schema navigation, granular RBAC slicing |
| 62 | **PostHog Analytics** | https://posthog.com/docs/product-analytics | Funnel drop-off visualization, session replay scrubbers with network/console sync, feature flag cohort builders |
| 63 | **Mixpanel** | https://mixpanel.com/ | Retention cohort analysis curves, event flow step diagrams, interactive metric comparison breakdown bars |
| 64 | **ClickHouse Cloud Console** | https://clickhouse.com/docs/en/cloud/manage/console | High-throughput query execution meters, real-time memory/CPU consumption monitors, cluster topology maps |
| 65 | **Dune Analytics** | https://dune.com/docs/ | Multi-query dashboards, blockchain parameter forms, collaborative SQL code fork and edit flows |

---

## 4. Modern Enterprise Productivity, Workspace & Canvas Tools (66–80)

| # | Reference Platform | Primary Evidence URL | Strata UI/UX Architecture Application |
|---|---|---|---|
| 66 | **Linear** | https://linear.app/method | Ultra-fast keyboard-first navigation (`Cmd+K`, hotkeys), minimalist typography, subtle dark/light contrast, issue triage |
| 67 | **Notion** | https://www.notion.so/help/guides/category/workspaces | Block-based content canvas, slash commands (`/`), inline relational database views, clean collapsible toggle lists |
| 68 | **Figma & FigJam** | https://help.figma.com/hc/en-us/articles/360040450173 | Multi-user spatial collaboration canvas, context property inspector docks, layer tree hierarchy, zoom-to-fit |
| 69 | **Penpot Open Source Design** | https://penpot.app/ | SVG-native web canvas, flexbox/CSS grid layout inspectors, component library publishing and token linking |
| 70 | **Miro Enterprise Canvas** | https://miro.com/ | Infinite whiteboarding ergonomics, minimap panning, clustering sticky notes, multi-cursor presence indicators |
| 71 | **Asana Enterprise** | https://asana.com/guide/help/views/list | Multi-view project tracking (list, board, timeline, workload capacity heatmaps), task detail slide-over panes |
| 72 | **Monday.com Work OS** | https://monday.com/work-management/ | Color-coded status pulses, customizable board columns, automation trigger-action visual recipe builders |
| 73 | **ClickUp 3.0** | https://clickup.com/ | Unified workspace hierarchy (spaces, folders, lists, tasks), custom field managers, task relationship linkers |
| 74 | **Basecamp 4** | https://basecamp.com/ | Card-based project homepages, Hill Charts for intuitive project progress tracking, asynchronous check-in threads |
| 75 | **Coda.io** | https://coda.io/ | Document-app hybrid, interactive buttons triggering API mutations, formula-driven interactive canvas controls |
| 76 | **Slack Web App** | https://slack.com/help/articles/115004071768 | Split-pane channel/thread layout, message compose rich-text toolbar, quick switcher (`Cmd+K`), notification badges |
| 77 | **Raycast** | https://www.raycast.com/ | Keyboard command launcher design, search list action panels, contextual accessory views, keyboard shortcut badges |
| 78 | **Superhuman** | https://superhuman.com/ | Sub-100ms keyboard interaction latency, split inboxes, triage state indicators, contextual command palette |
| 79 | **Pitch Presentations** | https://pitch.com/ | Smart layout templates, collaborative slide property bars, fine-grained asset library modals |
| 80 | **Cron / Notion Calendar** | https://www.notion.so/product/calendar | High-density multi-calendar overlay, time-zone scrubbing, quick meeting hold availability selectors |

---

## 5. Developer Platforms, Infrastructure & Cloud Consoles (81–100)

| # | Reference Platform | Primary Evidence URL | Strata UI/UX Architecture Application |
|---|---|---|---|
| 81 | **Amazon Web Services (AWS) Console** | https://aws.amazon.com/console/ | Global resource navigation header, AWS CloudWatch metrics widgets, unified IAM policy permission visualizers |
| 82 | **Google Cloud Platform (GCP) Console** | https://cloud.google.com/docs | Breadcrumb project switcher, contextual Cloud Shell bottom drawer, resource table filter chips, IAM audit tables |
| 83 | **Microsoft Azure Portal** | https://portal.azure.com/ | Horizontal blade/drill-down scrolling navigation architecture, resource group maps, Azure Monitor telemetry |
| 84 | **Cloudflare Dashboard** | https://dash.cloudflare.com/ | Edge DNS record management tables, security firewall event visualizers, zero-trust access policy builders |
| 85 | **Vercel Dashboard** | https://vercel.com/docs | Deployment timeline cards, environment variable encrypted key-value editors, instant preview URL badges |
| 86 | **Netlify App UI** | https://docs.netlify.com/ | Build log streaming terminals, branch deploy preview status indicators, form submission audit views |
| 87 | **Supabase Studio** | https://supabase.com/docs/guides/platform | PostgREST table editor, database schema visualizers, SQL query runner with explain plans, storage bucket browser |
| 88 | **Hasura Console** | https://hasura.io/docs/ | GraphQL schema relationship builders, granular field-level permission matrices, remote database connector wizards |
| 89 | **Docker Desktop & Hub** | https://docs.docker.com/desktop/ | Container lifecycle controls, real-time log output tailing, port forwarding indicators, image layer inspectors |
| 90 | **Portainer Container Management** | https://www.portainer.io/ | Multi-cluster Kubernetes/Docker resource monitors, container exec terminal popups, stack compose editors |
| 91 | **Postman API Client** | https://learning.postman.com/docs/getting-started/introduction/ | Tabbed request builders, environment variable switchers, test assertion response visualizers, mock server inspectors |
| 92 | **Insomnia REST Client** | https://insomnia.rest/ | Clean minimalist API testing layout, OAuth2 token auto-refresh flows, schema linting error ribbons |
| 93 | **Harness CI/CD** | https://www.harness.io/ | Visual pipeline stage builders, automated deployment rollback status monitors, cloud cost anomaly cards |
| 94 | **Argo CD UI** | https://argo-cd.readthedocs.io/en/stable/user-guide/ui/ | Kubernetes declarative application dependency trees, sync status health badges, live resource manifest diffs |
| 95 | **Tailscale Admin Console** | https://tailscale.com/kb/1017/install/ | Mesh network machine list, exit node toggle switches, ACL policy JSON editors with syntax linting |
| 96 | **Sentry Error Tracking** | https://docs.sentry.io/product/issues/ | Exception stack trace scrubbers, issue grouping rules, suspect commit attribution, release adoption graphs |
| 97 | **LaunchDarkly Feature Management** | https://launchdarkly.com/ | Feature flag targeting rule builders, percentage rollout sliders, live user evaluation telemetry monitors |
| 98 | **PagerDuty Incident Response** | https://support.pagerduty.com/docs | Incident escalation trees, on-call schedule rotation calendars, postmortem incident timeline builders |
| 99 | **Grafana Loki Log Explorer** | https://grafana.com/docs/loki/latest/explore/ | LogQL query builder, line stream highlighters, label facet breakdown panels, timestamp range zoom |
| 100 | **Stripe API Documentation & Explorer** | https://stripe.com/docs/api | Triple-column documentation layout (explanation, code/SDK snippets, live payload response viewer) |

---

## 6. Industry-Specific Enterprise Platforms (101–115)

| # | Reference Platform | Primary Evidence URL | Strata UI/UX Architecture Application |
|---|---|---|---|
| 101 | **Epic Systems Hyperspace (Healthcare)** | https://www.epic.com/software | EHR patient chart navigation, vital signs telemetry trend lines, clinical decision support alerts, order entry |
| 102 | **Cerner Millennium / Oracle Health** | https://www.oracle.com/health/ | Inpatient ward bed management boards, medication administration verification (eMAR) split-screen checks |
| 103 | **Canvas LMS (Education)** | https://community.canvaslms.com/ | SpeedGrader split-screen submission review, gradebook student/assignment score matrices, module course outlines |
| 104 | **Blackboard Learn** | https://help.blackboard.com/Learn | Institutional course hierarchy, assessment rubric grading forms, student activity analytics |
| 105 | **Yardi Voyager (Real Estate)** | https://www.yardi.com/products/yardi-voyager/ | Multi-property leasing unit matrices, rent roll financial schedules, tenant maintenance work order tracking |
| 106 | **AppFolio Property Manager** | https://www.appfolio.com/ | Tenant screening scorecards, vendor invoice routing, unit vacancy turnaround timeline pipelines |
| 107 | **Toast POS (Hospitality / Food & Beverage)** | https://pos.toasttab.com/ | Restaurant floorplan table status maps, kitchen display system (KDS) order ticket racks, split check modals |
| 108 | **Lightspeed Restaurant & Retail** | https://www.lightspeedhq.com/ | Touch-optimized barcode scan register, matrix inventory variants (size/color), vendor PO generation |
| 109 | **Manhattan Associates WMS (Supply Chain)** | https://www.manh.com/products/warehouse-management | Warehouse zone/aisle inventory pick maps, outbound wave order dispatch consoles, dock door appointment schedules |
| 110 | **Blue Yonder Luminate (Logistics)** | https://blueyonder.com/ | Global supply chain disruption heatmaps, predictive lead time variance cards, shipment tracking nodes |
| 111 | **Procore (Construction Management)** | https://www.procore.com/ | Architectural drawing sheet viewers with pin-drop punch item markers, RFI submission workflows, subcontractor submittals |
| 112 | **Autodesk Construction Cloud (BIM 360)** | https://construction.autodesk.com/ | 3D BIM model interactive canvas viewers, issue overlay pins, revision version comparison split views |
| 113 | **Clio (Legal Practice Management)** | https://www.clio.com/ | Billable time tracker floating stopwatch docks, matter trust accounting ledgers, court deadline calendar sync |
| 114 | **Ironclad (Contract Lifecycle Management)** | https://ironcladapp.com/ | Redline contract markup comparison viewers, signature approval workflow nodes, clause library slide-over drawers |
| 115 | **Guidewire ClaimCenter (Insurance)** | https://www.guidewire.com/products/claimcenter | Insurance policy coverage verification checklists, loss reserve adjustment ledgers, claim litigation task flows |

---

## 7. Interaction Design, UI/UX Pattern Libraries & Accessibility Benchmarks (116–125)

| # | Reference Research / Organization | Primary Evidence URL | Strata UI/UX Architecture Application |
|---|---|---|---|
| 116 | **Nielsen Norman Group (NN/g)** | https://www.nngroup.com/articles/enterprise-ux/ | Enterprise UX heuristics: complex data retrieval, error recovery, mental model mapping, expert-level accelerators |
| 117 | **W3C WAI-ARIA 1.2 Authoring Practices** | https://www.w3.org/WAI/ARIA/apg/patterns/grid/ | Standardized keyboard navigation contracts for data grids, comboboxes, tree views, focus trapping inside dialogs |
| 118 | **Page Flows (SaaS Interactions)** | https://pageflows.com/ | Real-world SaaS onboarding, checkout, subscription upgrade, and workspace settings UX user journeys |
| 119 | **Mobbin (Web & Mobile UI Archive)** | https://mobbin.com/browse/web/apps | Comprehensive catalog of responsive web app screens, modal overlays, search filters, and profile management flows |
| 120 | **GoodUI Benchmark Experiments** | https://goodui.org/ | Statistically validated A/B UX patterns: form layout single-columns, explicit vs implicit submit actions, trust badges |
| 121 | **UI Garage Pattern Archive** | https://uigarage.net/ | Filter menus, data comparison tables, pagination styles, notification dropdown drawer patterns |
| 122 | **SaaS Interface Gallery** | https://saasinterface.com/ | High-density enterprise SaaS dashboard layouts, analytics cards, team management tables, billing interfaces |
| 123 | **Design Vault Patterns** | https://designvault.io/ | Practical component patterns: zero-data empty states, complex multiselect dropdowns, multi-step stepper navigations |
| 124 | **Baymard Institute E-Commerce & Transaction UX** | https://baymard.com/research | Large-scale empirical usability research: address form autofill, order review screens, error messaging precision |
| 125 | **Gov.uk Design System** | https://design-system.service.gov.uk/ | World-benchmark accessibility: high-contrast form elements, clear error summary boxes, accessible table markup |

---

## Own identity
Strata is the authoritative enterprise design language for UniERP — engineered for data-dense, mission-critical enterprise SaaS workflows. Inspired by Palantir Blueprint 5, Salesforce Lightning (SLDS), SAP Fiori Horizon, and Linear/Stripe:
- **Foundations & Palette**: Quiet Slate canvas ground (`#F8FAFC` / `var(--color-bg)` in light mode, `#09090b` / Obsidian in dark mode), pure white working surfaces (`#FFFFFF` / `var(--color-bg-elevated)`), hairline borders (`#E2E8F0` / `var(--color-border)`), and authoritative Cobalt primary action points (`#1D4ED8` or `#2563eb` / `var(--color-brand)`).
- **Typography Triad**: Display/header scale in Inter/Plus Jakarta Sans (`var(--font-display)` with `-0.02em` tracking), interface body and dense labels in Inter (`var(--font-sans)`), and strict monospace/numeric precision in IBM Plex Mono / JetBrains Mono (`var(--font-mono)` with mandatory `font-variant-numeric: tabular-nums lining-nums` for all financial figures, currencies, ISO codes, and ledger lines).
- **Hierarchy & Layout Ergonomics**: A 3-layer architecture representing *Context* (workspace chrome and application rail), *Work* (white working surface floorplans), and *Evidence* (contextual inspector drawers and FactBox sidebars). The single-source shell `ContextBar` (`StrataBar`) is the sole breadcrumb owner. High-velocity keyboard navigation (`Cmd+K`, hotkeys) and explicit state machines ensure zero cognitive fatigue.

## Code and current design differences
- **Codebase Scope**: Across 1,193 Next.js pages and 794 `tenant-apps` views, layout structures adhere to the 8 canonical Strata floorplans (`DataWorkspace`, `TransactionWorkspace`, `RecordShell`, `TabbedConsole`, `SplitViewShell`, `PlanningWorkspace`, `SettingsShell`, `StudioShell`) with strict 4-tier density controls (`ultra-compact` 24px, `compact` 28px, `standard` 32px, `comfortable` 40px).
- **Design Mockups & Penpot Parity**: 24 unified floorplan master boards on Penpot Page `08 — Floorplan Masters` ($1440 \times 900$ canvas) map 1-to-1 to production floorplans. Domain boards that previously had legacy naming conventions (e.g. `hrm` vs `hr`, `assets` vs `fixed-assets`, `retail` vs `pos`) or orphaned children have been normalized to match the canonical workspace catalogue.
- **Authentication & Multi-Tenancy**: The hosted Identity Provider (IDP) exclusively owns login, registration, password recovery, MFA verification, and account center sessions. Application redirect routes do not duplicate ad-hoc password inputs.
- **Transaction Complexity**: Modules like Sales Orders and AP Invoicing encapsulate creation, GL distribution, line-item entry, and delivery modal/drawer steps within unified transaction workspaces without redundant sub-tab nesting or layout fragmentation.

## Design evidence boundaries
- **Source-Informed Low-Fidelity & High-Density Proposals**: Generated route atlas entries, Penpot board designs, and interactive prototypes are source-informed design proposals. They require interaction review, token audits (`check-tokens.mjs`), accessibility audits (`vitest-axe`), and runtime verification before merge.
- **Strict Zero-Mock Mandate**: Synthetic demonstration fixtures and sample records (e.g., `Example Aerospace`, `PO-00891`) are strictly isolated for design review and layout preview. In production code and runtime environments, all cards, KPI badges, charts, and data grids must be bound exclusively to truthful backend APIs and database queries (`useApiQuery`) or truthful empty states.
- **Zero Raw Literals & Tenant Privacy**: No hardcoded color/pixel values are permitted outside design token definitions, and no real customer/tenant operational data is ever copied into design canvases or documentation.
