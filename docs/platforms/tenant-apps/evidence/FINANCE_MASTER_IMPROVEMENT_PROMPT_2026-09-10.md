# UniERP Finance — master improvement prompt

Draft date: 10 September 2026. This is a proposed execution brief grounded in the working tree, not accepted product authority. Read [the audit and its evidence limits](FINANCE_UI_UX_AUDIT_2026-09-10.md) and [the exhaustive route briefs](FINANCE_SCREEN_BRIEFS_2026-09-10.md) with this prompt. All three documents form the brief. The route appendix contains one entry for every discovered route; do not substitute a ten-screen redesign for this scope.

---

## Copy-ready execution prompt

Act as the accountable finance product designer and implementation reviewer for UniERP. Improve Finance into a consistent, truthful and accessible enterprise workspace for accountants, AR collectors, AP specialists, treasury analysts, controllers, FP&A planners, tax specialists and auditors. Work from the current code and verified running build. Preserve the existing user’s modifications and apply the UniERP governance protocol before implementation.

Your outcome is not a collection of attractive screenshots. Users must know which entity, ledger/book, period, currency and records they are working with; understand whether data is current; complete authorized financial workflows deliberately; recover from errors; and trace every material result to durable source records.

The dated audit discovered 90 route files and serious source/runtime gaps. Reinspect before changing anything: the working tree can change, the running GL API returned 404 despite a source declaration, and some source services use fallback financial data and in-memory mutations. Treat audit findings as leads with evidence, not permission to rewrite everything or assertions that production behaves identically.

### 1. Authority, boundaries and execution rules

1. Read workspace/repository AGENTS, the enterprise-brain skill, canonical protocol, owning requirements/experience, published finance contracts and relevant accepted ADRs. Map PLT-ERP, PLT-BIZ, PLT-DS, PLT-IAM and PLT-OPS owners explicitly. Use existing shared UI and resource framework.
2. Write an R2 change contract before cross-repository/public UI changes. Record actors, requirements, scope, permissions, entity/book/period context, data lifecycle, compatibility, failure/retry, migrations, audit/outbox, observability, rollout/rollback and proof. Update proposed requirements and contracts before implementing changed behavior. Do not edit accepted ADRs in place.
3. Separate evidence from intent. Every screen gets an observed baseline, proposed design, endpoint/action mapping and acceptance proof. “Endpoint exists”, “button is wired”, “test contains a string”, “uses RouteGuard”, and “looks correct” are insufficient.
4. Do not deploy, publish, send reminders, execute bank payments, file tax returns, reset data, weaken permissions, or commit/push unrelated work. Obtain exact authorization when required. Use only the approved synthetic account for authentication; never embed credentials in prompts, artifacts or screenshots. Negative role/tenant testing requires sanctioned fixtures; the super-admin account cannot prove denial behavior.
5. No fake financial records, fixed operational counts, invented source documents, decorative live statuses, fabricated time stamps, fallback money, or silent success. A database failure is an error; a valid empty dataset is empty; a valid zero is zero.
6. Consolidate capabilities by published owner and lifecycle, not similar names. Existing basic and advanced routes may represent distinct models. Produce a mapping and compatibility plan before consolidating; preserve deep links until replacement acceptance criteria pass.
7. Use exact decimal handling and currency metadata according to approved contracts. Do not perform authoritative accounting in React or silently change numeric contract serialization. Plan additive compatibility and migrations explicitly.
8. Use small vertical slices, with truthful completion reports and evidence. Do not expand into speculative AI, statutory features or new navigation sections to make the product appear broader.

### 2. Mandatory discovery outputs

Produce an up-to-date route registry from app/(dashboard)/finance and navigation/resource descriptors. Include actual tabs, embedded views, drawers, modals, record/create routes, redirections and query-parameter entry points. Map each route to user task, canonical floorplan, read/create/approve/post/export permissions, API calls, response schema, data owner, persistence, lifecycle transitions, and matching tests. Count physical routes separately from workflows, subviews and aliases.

Record source revision plus working-tree digest, API build/process identity, proxy route and environment. Resolve why `/finance/gl/summary` is missing locally before claiming the source service is the live provider. Inventory all `/finance/*` and `/advanced-finance/*` consumers; classify unmatched endpoints and compatibility aliases without creating duplicate APIs merely to satisfy a count.

For each business mutation, draw the actual path: user intent → validated request → server authorization/context → domain transition → database transaction → audit/outbox → response → updated UI → reload/reconciliation. Trace failure and retry as carefully as success. Extend the existing finance integration inventory only after checking that its generator does not overwrite another agent’s evidence.

### 3. Consistent information architecture and scope

Use one canonical descriptor registry for sidebar, workspace catalog, command palette, route titles and tab identity. Avoid separate manual route maps that drift. Navigation groups should use business tasks: Overview; Accounting & Close; Receivables & Billing; Payables & Expenses; Banking & Treasury; Assets & Leases; Tax & Compliance; Planning & Reporting; Controls & Settings. This grouping is a proposal to map to existing descriptors, not an instruction to rename URLs without review.

Keep one breadcrumb/context owner. Do not layer another module-wide tab strip beneath the shell. Object subviews such as Invoice Items/Payments/Audit are legitimate local navigation; distinguish them from duplicate cross-module navigation. If document tabs are retained, ensure they are an approved shell capability with record-specific identities and dirty-state semantics. They must not contradict ERP-UX-015; resolve that design decision in owning experience authority before expanding the custom shell.

The scope bar contains only consequential context: authorized legal entity, book, period/as-of date, business unit if relevant, and display currency. Explicitly distinguish reporting currency from transaction and functional currency. Fetch allowed values; never list fictional companies. Switching context updates requests, cache keys, totals, detail panels, exports, URLs and titles atomically or shows a loading boundary. Warn before abandoning unsaved work. Period status is server-derived and read-only here; Close/Reopen is a separate controlled workflow.

Give each route a clear noun title in sentence case and one primary verb action. Avoid “Hub”, “Workbench”, “Enterprise”, “Advanced”, and “AI-powered” as substitutes for task meaning. Provide recognizable synonyms in search without exposing internal endpoint terminology. Catalog counts are permission-filtered route counts, not feature-readiness scores. Create menu entries must open a real, authorized form, including after refresh and back navigation.

### 4. Design system and visual specification

Use @kannan19302/ui semantic tokens, primitives and supported floorplans. Shared improvements belong to PLT-DS with behavior and accessibility evidence, rather than new local copies of buttons, dialogs, tables or status badges. Apply the authoritative task/device density matrix: ultra-compact ledger rows where appropriate, readable forms and touch alternatives. Higher-level PLT-DS task-specific guidance takes precedence over a blanket local density rule.

Build a consistent hierarchy: context → title/command bar → optional independently useful summary strip → filters → primary work surface → status/pagination. Inspectors are conditional, correctly associated with selection and collapsible. Do not show a large empty financial-detail panel with invented reviewer or source information. Detail pages must remain deep-linkable independently of an inspector.

Use typography roles from the owning design system. Tabular lining numerals for business amounts; right alignment for numeric columns; stable decimal formatting; identifiers may use the approved mono face. Preserve minus signs and use the agreed accounting-negative style. Body text must remain readable at compact density; avoid miniature chart labels and using uppercase microtext for all content. Color communicates status in addition to text/icon, never alone.

Keep status vocabulary distinct by domain. Journal: draft/submitted/approved/posted/reversed/rejected; invoice: draft/issued/partially settled/settled/void where compatible with contracts; reconciliation: unmatched/suggested/matched/reconciled; job: queued/running/partial/completed/failed/cancelled. Map existing enums to these labels only after validating canonical lifecycle semantics. Payment “recorded”, “scheduled”, “submitted to bank” and “settled” must never be synonyms.

Use responsive container widths, not only viewport breakpoints. At narrow widths the sidebar becomes a dismissible overlay and the work area fills available width. An optional inspector becomes a drawer/detail route. Show priority table columns and a labelled horizontal scrolling region or record summary alternative, preserving access to all data. At 320/390/768/1024/1440/1920 widths, verify action visibility, text wrapping, focus and local scroll. Test 200% zoom and applicable 400% reflow. Avoid permanent app rail plus expanded sidebar consuming most of the screen. Floating copilot/help controls must not cover rows, footers or focused actions.

### 5. Universal table, filter and export contract

All operational registers use stable record IDs, deterministic server pagination/sort, searchable references, meaningful default sort, labelled filters, removable filter chips and reset. Show count and scope honestly: visible records versus all matching records. Saved views preserve supported filters/columns/sort and respect permissions. Invalidate stale selection when dataset or scope changes. Distinguish selecting this page from selecting all matching results; bulk actions show count, amount, currency and excluded records before execution.

Column order should support the task: primary reference; counterparty/account; business dates; amount/currency; outstanding or variance; lifecycle; owner/exception; contextual actions. Sticky identity/amount columns must not obscure focus or create confusing duplicated screen-reader content. Sort controls announce direction. Accessible row action buttons duplicate any context-menu gesture; right-click or hover can never be the only path.

Use server-calculated totals for the full filtered dataset. A 10-row/250-row page is not the ledger or total AR. Do not sum different currencies without a disclosed conversion policy, rate type/date and missing-rate handling. Show zero only when the server establishes zero. Explain excluded void/draft/disputed documents, aging date basis and amount definition.

Use one export entry point. Offer selected/current view/all matching with exact scope and permissions. Validate MIME type, bytes and extension: a .pdf must be a PDF and .xlsx a real workbook, not CSV renamed. Respect report type, period, entity/book, currency, filters and rows. Include generated-at, data-as-of, filter summary and reconciliation total. Large exports run as bounded authorized jobs with progress, expiration and partial-failure behavior. Protect CSV against spreadsheet-formula injection and escape XML/HTML fields. Test with separators, quotes, newlines, Unicode and leading =/+/-/@ values according to the approved export-security policy.

### 6. Universal forms, review and state handling

Forms use persistent labels, business descriptions, real reference lookups, accessible required indicators, field-level and summary errors, keyboard entry, retained values after errors and a clear save/discard boundary. Avoid raw customer/account/UUID input when the user needs a business record lookup. Dates follow legal-entity timezone/calendar and valid accounting periods. Currency is explicit on amount entry and totals.

Provide empty draft values unless a default comes from authorized policy or selected source data. Never prefill monetary transactions with sample amounts. Use line-item grids for journals, invoices and allocations where the domain needs lines. Preview server-validated totals, tax, balancing and posting implications before commitment. Only show actions allowed by permission and lifecycle; server enforcement is mandatory even if controls are hidden.

Differentiate Save draft, Submit for review, Approve, Post, Execute, Reverse, Void and Delete. High-impact confirmation identifies document/entity/book/date/amount and recovery mechanism. Posted/approved records are amended or reversed under the canonical policy. A UI click or 200 response is not enough: verify durable transition, audit, outbox and result reference. On timeout, reconcile operation status before retrying; preserve idempotency keys.

Every route/subview defines: initial loading; background refresh; genuine first-use empty; no search results; partial data; stale data; validation failure; 403; 404; dependency failure; offline; conflict; success; job progress/partial failure. Keep visible old data marked stale during refresh where safe. Do not translate rejected promises into empty arrays without a visible error. Do not show “In balance”, “OCR verified”, “Compliant”, “Live” or “100% complete” before the corresponding evidence exists. Percentages with zero/unknown denominator display N/A or an explicitly defined alternative. Neutral changes use neutral indicators.

Use shared dialogs with focus containment, Escape where safe, return-to-invoker focus, background inertness and appropriate labelling. Protect dirty forms from route changes, tab close, scope switch and polling. Shared notifications complement persistent workflow feedback; do not rely on a disappearing success toast for a payment or close run.

### 7. Screen-specific instructions

Implement every route brief in FINANCE_SCREEN_BRIEFS_2026-09-10.md. Each route inherits Sections 1–6 and the matching workflow acceptance tests below. Do not apply cosmetic consistency and leave the endpoint or lifecycle unsafe. The following core-screen instructions are intentionally more detailed because these are primary daily entry points.

#### Finance overview — /finance

Use an operational overview with task-specific summaries rather than an executive marketing dashboard. Show revenue, operating cash flow, margin and DSO only with definitions, selected period, comparison baseline and data-as-of. Distinguish not applicable from zero. Align trend selector, chart labels and query date range. Provide an accessible data table; use an axis range appropriate to returned data rather than flattening values into an arbitrary million-scale plot.

Exceptions prioritize material overdue AR, unmatched bank items and journals awaiting action. Each count/amount is derived from the same filtered query as its destination; clicking a row opens the exact worklist context. Show no-exception state neutrally. Aging buckets must be mutually exclusive, based on days overdue or another explicitly named basis. Close progress uses actual required tasks; zero tasks means no checklist configured, not 100% complete. Replace invented notification counts and source-certification badges. Keep visual freshness tied to data timestamp rather than the local render clock.

#### General ledger — /finance/gl

Build a ledger DataWorkspace with book/entity/period/account/dimensions/posted-state filters, debit/credit/currency columns and full-dataset aggregates. Show opening, movement and closing balances where the canonical API supports them. Preserve drill-through from account to journal to source document; retain return filters. A selected inspector must load the selected durable record, not a default journal.

Resolve FIN-01–05 first. Missing API/permission shows unavailable data. “In balance” requires a completed valid scoped calculation. Separate journal creation from posting an existing approved journal; header “Post journal entry” must not ambiguously open a prefilled creation dialog. Posting checks open period, permission, balanced lines, account/dimension eligibility, version and approval. Do not promise a posting when only a process-memory set changed.

#### Journals — /finance/journal-entries and advanced journal routes

Provide one canonical register of draft/submitted/approved/posted/reversed journals, with author/approver, source, date, period, debit/credit, currency and exception columns. Preserve authorized aliases for different entry points. Create as a dedicated transaction workspace for multi-line keyboard entry; stable row validation, real account lookup, copy-line shortcuts, attachments and balanced totals. Use explicit save-draft default. Submission/approval/post/reversal are separate server-owned transitions. Recurring journals are templates with cadence, next run, effective dates, approval policy and generated-document links; they are not recurring sales invoices.

#### Receivables — /finance/ar

Make this a collections work queue, with aging, disputed status, collector, promise date and customer filters. Show original amount, settled amount and open balance with currency; explain aging date. Inspector contains actual invoice, payment allocation, customer communication history and source links. Record payment opens a form supporting partial payment, method, bank/cash account, date, reference, unapplied cash and authorized allocation. Do not immediately post the entire balance with an invented ACH reference. Follow-up requires intentional notes/action; preview communications and obey sending authorization. Dunning exclusions, disputed accounts and stale balances remain explicit.

#### Customer invoices — /finance/invoices and /finance/invoices/[id]

One New invoice and one Export action. Connect summary metrics to ListView filters and the full dataset. Keep searchable invoice/customer references, date/currency/terms, net/tax/gross/open balance and lifecycle. Creation collects customer, currency, terms, dates and lines with server-owned tax/discount/rounding. Paid amount/status must follow lifecycle and settlements, not arbitrary editing. Detail presents line items, payments/credits, document, audit and related sales/source transaction. Issuance and delivery are distinct; preview output before an authorized send. Preserve balance signs and credit state instead of universally clamping negative values to zero.

#### Payables — /finance/ap and /finance/vendor-bills

AP is a review/payment-preparation queue; vendor bills are the detailed register and entry flow. Share record identity and filters. Three-way match shows actual PO, receipt and bill lines with quantity/unit/price/tax tolerances and unmatched residuals. Never synthesize an “Original Invoice” from a total. Surface missing attachment, extraction confidence and human verification separately. Resolve variance uses reason, threshold, role and audit; payment uses explicit selection, dates/accounts, review, approval and execution status. Pagination and KPI counts must be derived, not static “1–8 of 32”.

#### Banking — /finance/banking

Show each authorized bank account, currency, ledger/statement/available balance definitions, last successful sync, pending/unmatched items and reconciliation period. Import uploads a real file through the owned document/import pipeline with schema/mapping preview, duplicate detection, validation and errors; a file identifier textbox is not the full business workflow. Matching explains candidate evidence and differences, supports one-to-many/split only where contracts support it, and verifies residuals. “Reconcile” must not invent balances or mask a mismatch. Route to the owned matching and reconciliation-certification workflows rather than cloning them.

#### Fixed assets — /finance/assets

Show actual cost, accumulated depreciation and carrying value for selected entity/book/as-of, including legitimate zero. Remove example asset registration values and fixed posting period. Register acquisition, category, custodian/location, in-service date, cost/currency, residual, life/method and source document through validated lookups. Depreciation review states assets/period/basis and proposed journal; exclude held/disposed/fully depreciated records per policy. After execution show durable run and journal references. Asset inspector’s lifecycle and schedule belong to selected record and accounting book, with accessible detailed schedule and drill-through.

#### Tax — /finance/tax

Make tax an evidence-based compliance worklist by jurisdiction/type/entity/period/due date/owner/status. Distinguish calculated liability, prepared return, approval, submission and acknowledged acceptance. UI labels must not equate a manually changed status with statutory filing. Provide actual source-document evidence, reconciliations, errors and due-date rules. 1099 and other jurisdiction-specific capabilities are explicitly scoped; do not hardcode current rules or claim broad statutory compliance. Use specialized contract-backed workflows for detailed operations.

#### Budget & planning — /finance/budget-planning

Bind fiscal year, version/scenario, entity, department, currency and workflow state. Show true budget/actual/forecast with consistent signed variance and favorable/unfavorable semantics for revenue versus expense. Driver changes are proposed edits with formula impact and dirty state; scenario selection must change persisted version/query. “Last saved” comes from the saved record. Save draft and Submit have real distinct outcomes. Remove fixed million-value fallbacks and invented chart profiles. Freeze approved versions; use a new revision or controlled amendment.

#### Financial reports — /finance/reports

Choose report, entity/book, period/as-of, comparison, consolidation and currency using supported contract options. Columns are metadata-driven, not aug2026/jul2026 fields. Show data freshness, accounting basis and generated/source period. Signed movements and totals reconcile to GL under declared inclusion rules. Drill from statement line to accounts, journals and source. Export selected report’s actual data in its actual format, with reproducible parameters and source time. Separate uncertified draft statement from approved report using real approval provenance.

#### FX revaluation and intercompany core pages

Core /finance/fx-revaluation must share a source of truth with advanced FX/currency workflows. Show transaction versus functional/reporting currency, rate source/type/date, preview gains/losses, missing-rate blockers, authorized post and reversal references. Do not label a static rate as real-time.

Core /finance/intercompany must resolve to entity-pair balances and agreements with both-side status, transaction currency, elimination/netting basis and exceptions. Elimination is a consolidation accounting operation; netting is settlement preparation. Neither is a decorative status toggle. Explain scope, applicable book/period and durable resulting journals/settlements before completion.

#### Finance settings — /finance/settings

Use a scoped SettingsWorkspace with accounting, periods, approvals, numbering, payment/tax references and policy sections only where owned. Show inherited/locked controls and why they are locked; disabling a checkbox is not server enforcement. No speculative settings with no persistence contract. Protect dirty edits from 30-second polling; retain baseline version and surface conflicts. Show effective dates, policy owner and audit from actual records. Currency/precision/calendar changes require impact analysis and compatibility rules; never silently reinterpret historical postings.

### 8. End-to-end acceptance scenarios

For each scenario record build/revision, entity/book/period, permitted actor, denied actor, synthetic fixture, exact steps, expected financial invariants, actual results and durable evidence references. Do not use the real environment for mutation without the required authorization.

1. **Journal to ledger to statement:** enter unequal lines → field/summary rejection; correct → save draft → reload → submit → independently approve → post → ledger and report reconcile. Retry does not duplicate. Closed period, unauthorized user, cross-tenant ID and stale version fail. Reverse creates balanced linked entries and leaves original history intact. Restart does not lose state.
2. **Invoice to receipt:** create lines/tax/discount in supported currencies → issue → record partial payment → reconcile open amount and aging → second payment → settle. Replay, overpayment, concurrent collectors, credit note and void follow documented policy. Customer statement and export reconcile to allocations.
3. **Procure to pay:** supplier bill tied to PO/receipt → quantity/price discrepancy → authorized exception approval → approved batch → payment submission/settlement → journal and audit. Missing document, duplicate invoice, duplicate payment, expired approval and denied role cannot produce false success.
4. **Statement import to reconciliation:** import valid and malformed files → duplicate detection → resolve ambiguous candidates and splits → remaining difference → reconcile only when policy allows → certificate and ledger drill-through. Failure/retry never loses lines or duplicates matches.
5. **Asset lifecycle:** register → capitalize → preview depreciation → post in valid period → verify schedule/carrying value/journal → transfer or disposal under policy. Same-period rerun, zero residual, fully depreciated asset, foreign currency and future in-service date tested.
6. **Close:** configure/assign tasks → dependencies and SLA provenance → blocked tasks → completion evidence → review → close controlled period. Reject cycles, missing dependencies, unauthorized close/reopen and concurrent state changes. Reports reflect the closed scope.
7. **Planning:** open version → change driver → inspect impact → save → reload → submit → approve/freeze → compare scenarios. Background refresh and tab close do not silently discard edits. Zero budget, negative variance and mixed currency have defined output.
8. **Tax preparation:** valid jurisdiction/effective rules → source reconciliation → draft computation → review → authorized preparation/output. Missing registration, expired certificate, amended return and provider rejection retain evidence; generated output is not described as filed until acknowledged.
9. **Context:** switch legal entity/book/period from list, inspector, dirty form and export. Verify every query/data/result changes consistently. No stale cross-scope totals or private cached records. Same record numbers across tenants do not share state.
10. **Failure recovery:** each critical read returns 403/404/500/timeout/offline; each critical mutation fails before commit and times out after commit. Verify distinction, input retention, safe reconciliation/retry and absence of false success/zero balances.
11. **Accessibility:** keyboard-only list/filter/create/validation/review/submit/detail/export, modal focus restoration, screen-reader narration and chart/table alternatives across density/theme/width. A compact row must still satisfy applicable WCAG 2.2 target-size/spacing requirements. Financial submission must support applicable error prevention through review/confirmation or correction.
12. **Enterprise volume:** more than one page, more than 250 rows, a representative agreed large fixture, long references/translations and multiple currencies. Totals match full filtered data, selection scope stays clear, export is bounded, and latency/resource budgets are measured rather than invented.

### 9. Sequencing and completion gates

**Wave 0 — baseline and authority:** regenerate inventory; establish running build; record scope/owner/contract/lifecycle mapping and approved design decisions. Capture existing source and runtime defects. Do not spend this wave repainting controls.

**Wave 1 — trust:** fix API availability and truthful load/error states; remove simulated provider data and process-memory business mutation; implement actual entity/book/period scope; repair financial export; prove critical tenant and journal invariants. Keep unsafe unfinished controls unavailable with an honest reason until completed.

**Wave 2 — shared experience:** canonical descriptors, single context, supported floorplans, keyboard/table/form/dialog/export patterns, responsive navigation, money/date/status presentation, freshness and dirty-state behavior. Validate against one register, one transaction and one detail page before broad adoption.

**Wave 3 — daily finance:** overview, GL/journals, AR/invoices, AP/vendor bills, banking, assets, tax, budget, reports and settings. Complete each vertical workflow and its aliases before moving on.

**Wave 4 — advanced screens:** apply every route brief, replacing raw technical inputs with business workflows and converging overlapping routes by approved mapping. Prioritize close, payment batches, reconciliation, account masters and tax operations over ornamental intelligence dashboards.

**Wave 5 — qualification:** run full contract/provider/consumer and role/tenant tests; UI state/a11y/visual/volume matrix; produce route-by-route acceptance ledger and review complete diffs. Re-run only when changes/failures warrant it. Deployment/release are separately authorized outcomes, not implied by passing local tests.

Use scripts actually present in each package. Tenant-apps currently has typecheck, lint, build, check:tokens, test and test:e2e:journeys. Changed production UI requires applicable gates, interaction tests and relevant real journeys. API auth/route changes require security:plane1 and matching authorization/tenant evidence; data changes require generation, disposable migration and RLS tests. A passWithNoTests configuration must not turn zero discovered tests into valid proof. Report existing unrelated failures without altering assertions to hide them.

Deliver: change contract; updated authority/contracts/traceability as applicable; route inventory; annotated before/after states; implementation; tests with exact command/results; accessibility manual evidence; migration and compatibility plan; rollout/rollback plan; residual risks and next required action. For each route report designed, implemented, tested, integrated, deployed and released separately. Use one honest cycle status. Do not claim complete finance modernization while an in-scope route, error state, consumer or required proof remains missing.

### 10. Quality bar for the final result

A controller can complete a close review without guessing period scope. An AR specialist can record a partial receipt deliberately. An AP reviewer can inspect the actual source document. A journal author cannot confuse draft creation with approved posting. An analyst can reconcile an export to the on-screen filters and ledger. A keyboard or narrow-screen user can perform the supported workflow. A database failure cannot masquerade as healthy financial data. The same concepts, controls and lifecycle actions behave consistently across all finance screens.

Do not declare SAP/Oracle/Dynamics parity or statutory compliance from visual similarity. Reference the pattern benchmarks and W3C standard in the audit, while treating UniERP’s owning specifications and real acceptance evidence as the completion authority.

---

Authoring note: this prompt is intentionally demanding but does not itself approve new statutory/accounting policy, contract-breaking changes, deployment, external messages or payments. Screen requirements below are proposals until accepted through the owning governance process.
