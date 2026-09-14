# Finance — round 2 verification and next improvement plan

Date: 10 September 2026, following the earlier finance audit and the subsequent working-tree changes. This is a proposed plan and dated review, not accepted product authority or release approval.

## Recommendation

Continue with **server-enforced financial scope and reliable transactions**, then complete **report lineage, canonical workflow navigation and advanced-screen consistency**. The first update made visible progress, but the full previous improvement program is not complete. Do not close the earlier audit wholesale or start another broad cosmetic redesign.

This plan is incremental. Retain the useful error-state, mobile-layout and draft-entry improvements. Fix the remaining mechanisms behind them, then extend consistent patterns across advanced workflows. The earlier [master prompt](FINANCE_MASTER_IMPROVEMENT_PROMPT_2026-09-10.md) and [90 screen briefs](FINANCE_SCREEN_BRIEFS_2026-09-10.md) remain the detailed screen reference; this document changes their execution order based on fresh evidence.

## What I checked

- Compared the 90 original page hashes with the current working tree: **17 page files changed; 73 unchanged**. Shared shell/resource changes can affect unchanged pages, so this is change coverage, not completion coverage.
- Reviewed the new FinanceScopeContext, FinanceErrorState/Boundary, core query consumers, invoice resource, report export, journal/payment/asset/settings service paths and changed tests.
- Rechecked local GL and reports in the browser. Used the existing authorized synthetic test session. Changed only view context and opened a blank create form; did not save/post/pay/depreciate/file anything. Restored August after the July scope check.
- Ran frontend and API typechecks and 35 focused tests. No product source was edited during this review.
- Retained the previous evidence unchanged. The repository HEADs remain those in the first audit; changes are in the working tree. The [round 2 evidence snapshot](finance-round2-evidence-2026-09-10.json) records inspected source hashes, route delta, commands and limitations.

Review ownership: PLT-ERP product/experience, PLT-BIZ finance domain/API/data/contracts, PLT-DS shared UI, PLT-IAM authorization, PLT-OPS runtime identity and release evidence. This review is R0; writing this local proposal/evidence is R1. The proposed implementation is R2, with R3 approval only for separately restricted actions. No requirement, accepted ADR, schema, permission, deployment or public contract was changed by this review.

## Verified progress to preserve

| Area | Fresh evidence | What can be concluded |
| --- | --- | --- |
| GL availability | Browser GET `/api/v1/finance/gl/summary?entity=Acme%20Corp&period=Aug%202026` returned 200 after initial authentication recovery; actual journal rows rendered. | The former local GL 404 is resolved in this sampled session. This does not prove every summary endpoint or deployed environment. |
| Mobile content space | At viewport 390×844 the GL content region measured approximately 390.4px instead of the previous 106.4px. The new screenshot shows the rail removed and content usable at full width. | The severe width-loss defect is addressed. Header/table overflow, focus and full reflow still need testing. |
| Query error presentation | Core pages now import FinanceErrorState and render conditional connection badges; GL debit/credit failure output is “Unavailable”. | Source improvement verified. A fresh injected 403/404/500/offline matrix was not run. |
| GL draft defaults | Source now uses blank account/amount lines and `postImmediately=false`; opening the local create form showed blank monetary inputs. | The prefilled sample transaction/default-post defect is addressed at form initialization. Posting permission, persistence and modal accessibility remain separate issues. |
| AR payment intent | Source adds amount, method, date, reference, balance validation and a submit form. | Deliberate input is implemented in source. The provider does not yet honor all inputs safely. |
| AP source-document honesty | The fabricated 90%/10% lines and street address were replaced with “Original PDF Attachment Not Stored”. | The synthetic document lines are removed. Actual attachment retrieval and business-friendly missing-document UX remain incomplete. |
| Several fallback summaries | Service removes the old fallback GL records and hardcoded minimum account count; several summary methods now query records. | Selected fallbacks were removed. Error-to-empty conversion, capped totals and other fixed financial outputs remain. |
| Signed reconciliation display | Account-reconciliation formatter now preserves a negative sign and has an error state. | Specific source-level sign/error fixes are present. Currency, dataset and runtime proof remain. |
| Export encoding | Custom report export now produces CSV or SpreadsheetML .xls; PDF invokes print instead of renaming CSV bytes. | The old CSV masquerading mechanism changed. Report correctness, XLSX labelling, XML escaping and print-completion semantics remain unresolved. |
| Verification | 25 frontend source/catalog tests, 10 API tests and both typechecks pass. | Compile compatibility and those assertions pass. The tested API paths use mocks; this is not durable ledger, tenant isolation or money precision certification. |

## Fresh findings that determine the next work

### R2-01 — Context is sent but not enforced (P0)

The new provider stores display-name entity/unit/period/currency/status in sessionStorage. Core pages add entity and period to query keys/URLs. However, finance.controller.ts still calls `getGlSummary(req.user.tenantId)` without query scope; similar summary methods remain tenant-only. Unit/currency/book are also not consistently represented in these requests. Period status remains a user-set local value.

**Runtime reproduction:** from GL, select July 2026. The request returns 200 for `period=Jul%202026`, but its eight lines are dated August 15, 20 and 31. The behavior is now demonstrated, not merely inferred from source. This is a financial-context correctness issue even when all users belong to one tenant.

Next: add the owned validated scope contract and bind it through controller, domain queries, aggregate calculation, cache and export. Use authorized IDs and fiscal/as-of semantics; a display name or client tenant field cannot establish authority. Preserve query compatibility through an explicit migration/default policy.

### R2-02 — Journal success still does not guarantee a transaction (P0)

`finance.service.ts:1479` postGlJournal returns success even if no journal is found. `reverseGlJournal:1520` now creates reversal lines inside a transaction when it finds a record, but still returns a successful reversal response when no record is found. `createManualJournal:1596` catches failures and returns a fallback success/reference at line 1691.

The create path also auto-creates missing accounts based on debit/credit direction, outside the journal creation transaction; uses a count-derived document number; accepts immediate posted state; and uses Number arithmetic. These are concrete next targets, not proof that an authorized runtime mutation was attempted. Do not add more wrappers around this path; integrate the owned journal lifecycle and repository.

### R2-03 — Partial receipt UI and provider disagree (P0)

AR now submits a selected paymentDate. The published RecordArPaymentSchema accepts it, but recordArPayment’s method signature ignores it and writes `paidAt: new Date()`. It updates invoice settlement before creating the payment without an enclosing transaction, catches exceptions and returns success, and always returns response status PAID even when the calculated invoice status is PARTIALLY_PAID. Missing invoices also reach a success response. No outbox, idempotency or concurrent-allocation proof was established for this path.

Next: one atomic receipt/allocation domain operation, exact decimal handling, actual chosen business date, durable result and accurate returned state. Client-side balance validation is useful feedback, not concurrency or authorization enforcement.

### R2-04 — P&L remains synthetic despite the live claim (P0)

`getReportsPnlSummary:2567` constructs fixed August/July monetary rows, fixed source timestamp and lineage without using tenant or period to calculate them. The live local report returned 200 and rendered these values, while the page also says **“Zero synthetic alterations • 100% reconciled to posted journals.”**

This claim must be removed until a matching reconciliation exists. A real HTTP response is not evidence of real ledger calculations. Statement type, book, period, currency, posting inclusion and mappings must drive the result. Report content comes before output format.

### R2-05 — Settings, FX and eliminations retain process memory (P0)

The service still declares `fxRevaluationRuns`, `intercompanyEliminations` and a single `persistedSettings` at lines 31–33. Settings reads return that global object irrespective of tenant; FX/elimination lookups use period keys. A comment saying static state was removed is contradicted by these remaining declarations.

Next: tenant/entity/book-scoped durable owned records and operations. Verify same period/reference across two tenants and restart/multi-instance behavior. Source mechanism supports the concern; cross-tenant access was not exercised against the running environment.

### R2-06 — Asset registration/depreciation still claim unproven results (P0)

`registerAsset:2262` catches failures and still returns success. It picks the first account whose code starts with 16 and uses it for both asset and accumulated depreciation. `depreciateAssets:2305` returns a queued message and generated journal reference without enqueuing or persisting a run in that method.

Next: actual category/book account mappings, durable depreciation job/preview/post lifecycle and returned run status. “Queued” requires a durable queued job; “posted” requires linked accounting entries.

### R2-07 — Register, inspector and export semantics still drift (P1)

Invoices still calculate KPIs/export from an independent 250-row query, not the ListView’s applied filters. GL summary sums only its capped journal query (take 100) and caps accounts at 150. Selecting a GL line constructs a one-line “journal inspector”, hardcodes reviewer/source lineage, and uses the selected line amount rather than the whole journal. The local posted journal still shows a pending Finance Manager review narrative.

Next: complete filtered aggregates and selected-record detail queries. Summary, list, inspector and exports share the same query context and record identity; journal detail groups all lines of the selected journal.

### R2-08 — Advanced screens and shared accessibility remain uneven (P1)

Seventeen of the 90 page hashes changed; most advanced page files did not. A scoped search found **100 matching source lines** with alert/confirm under finance/advanced, and no direct useFinanceScope matches there. These counts are source observations, not 100 distinct dialogs or proof that inherited scope is absent. Trace shared owners before changing each screen.

Two main landmarks remain in the live GL page. Its blank create overlay had no role=dialog at the inspection point. The current mobile screenshot still shows a cramped/clipped global header and a dense grid whose essential amount columns are outside the initial view. Accessibility conformance remains unverified.

### R2-09 — Export still misrepresents type or completion (P1)

The export UI offers XLSX, but its branch creates legacy SpreadsheetML .xls. It uses current P&L rows regardless of selected reportType, which affects the filename rather than the executed report. XML inserts lineItem without escaping. PDF opens window.print and then sets exportSuccess, even though the user can cancel. Currency and columns remain August/July/USD in several paths.

Next: canonical report execution and supported-format contract. Prefer the already available API Excel/PDF tooling after verifying its ownership and supported path; no dependency addition is assumed. If only print or XLS is supported temporarily, label it truthfully and do not imply a downloaded/saved PDF.

### R2-10 — Source checks are too weak to close the findings (P1)

The new trustworthiness tests mostly assert strings such as useFinanceScope, CSS rules and MIME values. They pass while July returns August, reports are hardcoded, and journal fallbacks still return success. The two API suites mock Prisma/Decimal and do not prove the newly changed journal or receipt paths with a real database. The decimal mock was moved/rewired by the current diff; it was already a Number-based approximation, so this review does not mislabel that entire technique as newly introduced.

Next: behavioral consumer tests, provider contract tests and real transactional/tenant proof. Keep static tests for structural rules, but do not count them as financial correctness evidence.

## Disposition of the previous 24 findings

“Improved” below means a specific mechanism changed, not that the full acceptance criteria passed.

| Earlier ID | Recheck disposition | Next packet |
| --- | --- | --- |
| FIN-01 availability/error truth | GL 200 verified; shared error display added; full failure matrix outstanding | A, J |
| FIN-02 synthetic summaries | GL fallbacks reduced; fixed P&L/tax verification claims and error-to-empty behavior remain | C, J |
| FIN-03 durable journal transitions | Persistence attempts added; false success and incomplete lifecycle still present | B |
| FIN-04 global business state | Journal sets removed; global settings and period-keyed FX/IC state remain | D |
| FIN-05 context | Provider and query keys added; July/August mismatch reproduced | A |
| FIN-06 exports | Byte-extension masquerade changed; type/data/completion mismatch remains | C |
| FIN-07 aggregates | 250-row invoice query and independent ListView still present | E |
| FIN-08 unsafe entry defaults | Blank GL draft verified; AR review form added; backend receipt semantics still wrong | B, E |
| FIN-09 original bill preview | Fabricated lines removed; real attachment flow incomplete | F |
| FIN-10 asset/budget fallbacks | Named frontend fallbacks removed; asset execution remains unproven | D, J |
| FIN-11 mobile width | Width-loss repair observed; complete responsive workflow evidence pending | G |
| FIN-12 landmarks/dialogs | Two main landmarks remain; blank GL overlay has no dialog role | G |
| FIN-13 recovery | Shared errors added; swallowed service errors remain | B, D, J |
| FIN-14 native dialogs | Advanced native alerts/confirmations remain | H |
| FIN-15 navigation consistency | Separate route maps and broad advanced tab identity remain | G |
| FIN-16 create destinations | Query intent and redirects added in inspected core routes; complete global-create journey unverified | E, G |
| FIN-17 permission semantics | Core post/reverse still use finance.journal.create; full action/role matrix not proven | B, J |
| FIN-18 overview semantics | Source still contains unconditional 100% total and directional zero handling; not rerendered in this review | I |
| FIN-19 forms/terminology | Resource fields changed but aggregate/list/creation integration still needs behavioral proof | E |
| FIN-20 fixed notifications | Shell still passes unreadNotifications=12; fixed notification prose remains | I |
| FIN-21 dirty settings | Poll-to-editable-state useEffect remains without dirty protection | D, G |
| FIN-22 money presentation | Negative reconciliation sign fixed in source; shared currency/precision not completed | A, E, H |
| FIN-23 visual density | Mobile width improved; header/grid/inspector refinements still needed | G, I |
| FIN-24 evidence | More tests and both typechecks pass; critical behavioral proof still missing | J |

## Delivery sequence and work packages

Priority is dependency order, not a calendar promise. Estimate delivery only after the owner selects the canonical domain APIs and inspects actual migration needs. Do not parallelize edits across shared contracts or scopes without an explicit ownership plan.

### A. Enforce financial scope end to end — first

**Outcome:** every amount, list, inspector and export corresponds to the visible authorized entity/book/period.

**Affected screens:** finance shell; overview; GL/journals; AR/AP; banking/assets/tax; budgets/reports; then all advanced consumers through their owned resources.

**Design and contract:** resolve tenant from authentication; legalEntityId/bookId from authorized lookups; financialPeriodId or explicit asOf/from/to dates with business timezone; display currency plus conversion metadata. Reject invalid combinations and permissions. Business-unit filtering is included only where meaningful. Keep current URL compatibility through explicit validated default behavior; do not silently reinterpret existing callers.

**Implementation:** pass validated scope through controllers, repositories and aggregates. Include every consequential dimension in cache keys. Cancel/reset stale requests and selections on context change. Replace fictional dropdown choices. Read period status from the server and route close/reopen to the owned workflow. Session persistence is namespaced by principal/tenant and cannot authorize data access. Missing provider/context fails closed instead of returning demo defaults.

**Acceptance:** July query contains no August-period postings under the agreed date basis; two entities in one tenant do not mix; two tenants with equal labels do not share cache/data; unavailable rate/book rejects or explicitly marks output unavailable; export matches selected scope; dirty form requires safe resolution before switching. Validate service and RLS as separate boundaries.

**Exit gate:** one real scope contract, provider/consumer compatibility proof, runtime scope-switch evidence and tenant/no-context tests. No new “scope is complete” assertion based solely on React context presence.

### B. Make journals and receipts fail closed and durable — first alongside A's contract definition

**Outcome:** a successful action always identifies a committed valid domain transition.

**Screens:** GL/journal creation/approval/reversal; AR payment form; invoice payment history; AP/payment entry points after the receipt/journal foundation.

**Journal work:** remove all success fall-throughs; missing record produces canonical not-found; persistence failure propagates a safe error; no automatic account creation from debit/credit direction. Validate actual account/entity/book/dimensions and positive debit/credit rules, period, currency, balanced decimal totals and lifecycle. Use atomic numbering/idempotency and concurrency controls. Separate author, reviewer and poster according to owning permissions. Reversal must reference a posted source and commit balanced opposite lines plus audit/outbox atomically.

**Receipt work:** invoice lookup/allocation/payment/audit/outbox in one transaction; preserve chosen payment date/method/reference; accurate PAID/PARTIALLY_PAID response; prevent concurrent over-allocation with approved overpayment behavior. Do not retry unknown outcomes blindly. Align receipt journal generation and document history with canonical operation, not a second hand-built route.

**Acceptance:** DB failure before commit leaves no account/journal/receipt/settlement residue; missing/foreign record fails; partial payment stays partial and uses chosen date; concurrent/replayed requests do not double-post; unauthorized author cannot approve/post; restart preserves all results; reversal balances and remains linked. Test via approved synthetic disposable fixtures, not production transactions.

### C. Rebuild report execution and lineage — immediately after scope is defined

**Outcome:** reports reconcile to the scoped ledger and downloads represent the report actually selected.

**Screens:** core reports, advanced reports, ratios, statement drill-through, dashboard metrics and exports.

**Design:** report-type selector, entity/book, fiscal/as-of period and comparison, basis and currency. Dynamic column metadata replaces aug2026/jul2026 keys in an approved compatible contract. Report lines identify mapping and drill-through queries. Data-as-of and reviewer status come from execution/evidence records.

**Implementation:** remove fixed P&L arrays and invented reconciliation claims. Use canonical report queries/aggregation with exact decimals and configured classifications. Validate statement identities and disclose unmapped accounts. Generate supported output via existing owned tooling; real XLSX/PDF or accurately labelled alternatives. Escape content and handle CSV formula-leading input. Return job/artifact state, never “saved” because print opened.

**Acceptance:** mutate synthetic fixture through approved test harness and see the expected report delta; period/entity filters affect content; each statement type returns its own lines; BS/trial-balance/cash-flow identities hold under documented accounting basis; output header/currency/totals match screen; PDF cancellation is not success; format validators open output; malformed fields do not corrupt or execute content.

### D. Finish settings, asset and period-operation persistence

**Outcome:** settings and long-running financial operations survive restart and remain correctly scoped.

**Screens:** settings, assets/asset operations, depreciation, FX revaluation, intercompany/netting/eliminations.

**Implementation:** remove single/global settings and period-only maps; reuse existing settings/run ownership. Add audited version/effective-date policy and safe dirty-form refresh. Asset registration uses selected approved category/book mappings, distinct asset/accumulated-depreciation accounts, exact life/date/currency inputs and transactional persistence. Depreciation creates a real durable queued run before saying queued; exposes preview, approvals, item results, partial failure and linked journals. Revaluation/elimination require real input provenance and durable results.

**Acceptance:** same period in two tenants never shares settings/run result; process restart and second server instance see the same state; lost dependency does not return success; depreciation rerun is idempotent; no eligible assets produces a truthful no-op result, not a fabricated journal; concurrent settings save returns conflict; polling never overwrites edited values.

### E. Unify operational registers and record detail

**Outcome:** the data the user sees, filters, selects and exports is one coherent dataset.

**Screens:** invoice/vendor-bill registers, GL/journals, AR/AP worklists and shared list/resource framework.

**UI specification:** one primary create action; one export action; labelled search/filters, applied chips and clear reset; server pagination/sort with total matching count; visible-page versus all-matching selection; right-aligned currency amounts and tabular numerals; consistent status labels and source references. Put lifecycle actions in the record action area, not generic editable status fields. Invoice entry uses source-driven lines/tax/discount and payment-derived settlement.

**Data work:** full filtered aggregates replace 250-row KPI calculations; preserve transaction currency versus converted totals. Fetch a selected journal by journal identity, with all lines and actual author/approval/source history. Changing selection/scope cancels stale inspector work. Keep list filters on return from record/create pages and test deep-link action=new behavior.

**Acceptance:** over 250 records with multiple currencies; list/filter totals agree with export; selected line opens its complete journal; no pending-review prose on a posted record without an actual outstanding task; create menus open exactly one form; refresh/back/forward retain supported context.

### F. Complete document capture and matching workflows

**Outcome:** reviewers can inspect authentic evidence and resolve exceptions without reconstructing documents manually.

**Screens:** AP preview, invoice capture, bills, bank feeds/import, bank matching and reconciliation reporting.

**UI specification:** source document preview beside extracted header/lines; clear unverified/extracted/human-verified states; controlled replace/upload action; field provenance; duplicate warning. Three-way match compares real PO/receipt/bill lines, tolerances and residuals. Bank matching shows candidate reference/date/amount/account, reason/confidence where justified, and meaningful record lookup rather than a raw UUID textbox. All source links are authorized and redacted appropriately.

**Copy:** replace implementation-facing “zero-mock financial policy” and “Simulated line items are prohibited” with actionable business wording, such as “No source document is attached. Attach the supplier invoice to review line items.” Do not retain “verified” labels when the underlying evidence is missing.

**Acceptance:** missing/expired attachment, failed upload, duplicate bill/file, ambiguous candidate and partial match have distinct states; source documents cannot be accessed from another tenant; resolution requires actor/reason/approval where required; failed operation retains edits and evidence references.

### G. Standardize shell, dialogs, keyboard and responsive behavior

**Outcome:** every supported screen remains navigable with keyboard and at narrow widths.

**Changes:** consolidate navigation titles/sidebar/catalog/command palette/tab metadata into one owned descriptor source. Use distinct advanced-route and record tab identities; preserve parameters/dirty state. Resolve the shell's document-tab policy against ERP experience authority rather than adding another navigation strip. Use one main landmark. Migrate custom overlays to the owned dialog/drawer; implement labels, initial focus, focus containment, background inertness, Escape behavior and focus return. Make row/context actions accessible without right-click/hover.

**Responsive:** retain the new mobile overlay navigation, then fit global header actions and scope controls; provide labelled table scrolling and a priority-column/detail alternative; avoid hiding amount and state without a discoverable path. Dialog actions remain reachable with software keyboard/zoom. Copilot/help buttons do not obstruct rows or focused controls. Differentiate draft close confirmation from navigation tab close.

**Acceptance:** 320/390/768/1024/1440 widths, 200% zoom/applicable 400% reflow, keyboard-only create/review/filter/detail, reduced motion, light/dark/high-contrast and representative screen-reader session. Test the opened mobile navigation as well as the closed state. Width alone is not the accessibility gate.

### H. Apply the shared pattern to advanced workflows in bounded clusters

Use the 90-screen appendix; do not create 73 independent redesigns or treat unchanged files as failed screens without checking shared behavior. Each cluster must have a baseline, owned resource, action map, state matrix and real representative journey.

| Order | Cluster and routes | Required next UX improvement | Representative exit scenario |
| --- | --- | --- | --- |
| H1 | Accounting books, chart of accounts, financial periods, close tasks/management, allocations | Real business lookups; task/period/approval state; no raw IDs; dependency and SLA provenance; safe rule edits | Approved balanced allocation and dependency-controlled close task |
| H2 | Bank accounts/feeds/recon/reconciliations, AP automation, payment batches, exception queue, match rules | Triage → preview → approve → execute → reconcile; meaningful reasons and item-level failures | Duplicate-safe statement import and payment-batch retry |
| H3 | AR aging/automation, statements, credit risk, invoice analytics, recurring/subscriptions/revenue schedules | Separate invoice/collection/recognition lifecycle; holds/exclusions; schedule and usage units | Partial receipt flows to aging; scheduled billing creates one invoice |
| H4 | Assets/asset operations, leases/detail/create, FX/currency revaluation, consolidation/intercompany | Shared run and preview pattern; basis/date/book/source; actual journal references | Idempotent depreciation or revaluation run with reversal evidence |
| H5 | Tax engine/operations/filing/summary/nexus/provisioning/1099 | Effective-date jurisdiction rules, source reconciliation, review and acknowledged submission states | Draft preparation with invalid/expired source evidence blocked |
| H6 | Budgets/scenarios/rolling forecast/comparison/cash forecast/working capital | Versioned assumptions, actual cutoff, signed variance, dirty protection and meaningful compare | Saved forecast survives reload and remains isolated from baseline |
| H7 | Audit logs/risk/financial instruments/ESG/AI analytics | Clearly separate observations, estimates, predictions and approvals; model/source/units/lineage | Reproducible evidence-backed assessment with no automatic financial posting |

Native alert/confirm replacement belongs in the shared mechanism with route-specific business impact wording. Scope is inherited only after actual request/permission tests prove it. Tax/accounting labels require owning policy; this plan does not certify statutory correctness.

### I. Refine overview, terminology and operational signal

**Outcome:** attention indicators help users choose their next action and remain internally consistent.

**Changes:** replace fixed 12 notifications and other static badges with permission-scoped event/work counts. Neutral no-change and zero-denominator values; non-overlapping aging buckets; actual chart period and scale; explicit comparison baseline; data timestamp rather than render time. Every exception card links to an applied filtered worklist. Distinguish alert counts from alert categories and explain denominators. Align workflow terminology across overview, sidebar, list, inspector and exports.

**Acceptance:** no records does not become a 100% ratio or a positive trend; zero exceptions produces no invented notification; drilling from a count opens that exact eligible dataset; chart has accessible table and clear units; narrow layout preserves meaningful chart/table content.

### J. Replace completion-by-source-assertion with behavioral evidence

**Outcome:** tests fail for the real defects found in this recheck.

Keep existing structural tests, but add explicit regression cases for R2-01–10. Use real decimal implementation for numeric-property tests; mock only boundaries appropriate to the claim. Provider tests must assert queries apply scope, actions reject missing records and errors propagate. Integration tests must verify actual DB rows, balance, audit/outbox, idempotency, retry and RLS with NOBYPASSRLS. Consumer tests must verify selected period, paymentDate, report type and error state—not string presence.

Generate route/action coverage from the source inventory, and record route/subview/action counts separately. Never accept zero discovered tests. Update stale journey selectors to current accessible names while retaining substantive assertions. Add a screenshot matrix for representative floorplans and manual keyboard/screen-reader evidence. Record runtime build identity, exact commands, results and residual failures. Typecheck/build passes cannot close business-invariant findings.

## Suggested first implementation handoff

Copy the following into the implementation task with this review attached:

> Reinspect current source and follow UniERP governance. Implement packets A and B from FINANCE_NEXT_IMPROVEMENT_PLAN_ROUND2_2026-09-10.md as a bounded contract-first vertical slice. Start with the reproduced GL July/August mismatch, then remove false-success paths from journal create/post/reverse and AR receipt. Preserve the existing mobile/error/default-entry improvements and unrelated working-tree edits. Identify canonical scope and journal/receipt owners before editing. Do not invent accounts, tenants, dates, source documents or success references. Prove validated entity/book/period filtering, missing/foreign record denial, DB failure atomicity, partial-payment date/status correctness, idempotency, actual audit/outbox and restart persistence. Update contracts/requirements/traceability as appropriate. Return exact typecheck, focused test, integration, security-plane and tenant/RLS evidence, with no completion claim based on source strings. Do not deploy, send communications, execute external payments, reset shared data or commit/push without exact authority. Then prepare packet C from actual ledger data; do not broaden into advanced-screen cosmetic work until these gates pass.

## Verification record for this review

| Check | Result | Limits |
| --- | --- | --- |
| Tenant-apps: `node node_modules/vitest/vitest.mjs run src/components/finance/__tests__/finance-trustworthiness.test.ts src/components/finance/__tests__/finance-strata-actionability.test.ts src/components/finance/__tests__/finance-workspaces.test.tsx` | PASS — 25 tests in 3 files | Structural/source/catalog proof, not financial execution |
| API: `node node_modules/vitest/vitest.mjs run src/modules/finance/tests/finance.service.spec.ts src/modules/finance/tests/finance-payment-decimal.service.spec.ts` | PASS — 10 tests in 2 files | Mocked unit coverage; no real RLS/transaction proof |
| Tenant-apps: `node --max-old-space-size=8192 ./node_modules/typescript/bin/tsc --noEmit --incremental false` | PASS | Types only; incremental disabled to avoid updating build-info |
| API: `node --max-old-space-size=8192 ./node_modules/typescript/bin/tsc --noEmit --incremental false -p tsconfig.json` | PASS | Types only |
| Browser GL read and mobile geometry | PASS for availability and width repair | Initial navigation timed out but subsequent page and 200 responses loaded; does not prove all UI states |
| Browser July scope switch | FAIL — 200 response contains eight August lines | Confirmed scope defect; restored August afterwards |
| Browser report source truth | FAIL — live report renders fixed source values and reconciliation claim | No transaction was created to alter the report; source inspection confirms fixed array |
| Real financial mutations, full route journeys, negative role/tenant/RLS, manual screen reader, axe, volume tests | NOT RUN | Review/plan scope; remain mandatory for implementation qualification |
| Lint/build/security plane | NOT RUN in this review | No product edits by reviewer; passing implementation gates still required before release |

Vite CJS deprecation warnings occurred in both test commands. They do not change the test results. No full production readiness or statutory conformance claim is made.

## Delivery safety and knowledge lifecycle

Existing governance still applies. Requirements tied to this plan include ERP-FR-001/008, ERP-NFR-001/002/003/005/006/007, ERP-UX-001–010 and applicable DS-UX/accessibility requirements. Read owning standards/ADRs before accepting new design decisions. Scope and state contracts are coordinated across tenant-apps, api, data, unierp-contracts and shared UI as needed; no breaking change is pre-approved.

For each packet, use AI_CHANGE_CONTRACT_TEMPLATE: define data/contract owner, accepted behavior, auth/tenant, failure/retry, audit/outbox, migration/compatibility and matching proof. Schema changes, if needed, are additive immutable migrations with disposable rehearsal and roll-forward; do not reset shared data. Route convergence preserves aliases until consumers migrate. Rollback must not revive simulated success or leak broader scope; unavailable with an honest reason is safer than fabricated results. Reconcile committed work before retrying after timeout. Existing policy and financial data remain protected; use synthetic/minimized evidence.

No new dependencies are proposed without inspecting installed capabilities and license/security constraints. No deployment, release, publication, external messages or real payments are authorized by this document. The broad market runner was not run: the earlier audit verified that it writes ledgers and commits/pushes unrelated working trees. It is not a read-only audit gate.

Knowledge delta: **UPDATED — dated evidence and proposed plan only.** Earlier artifacts remain historical; they were not regenerated over the original hashes. No owning requirement/ADR/contract was changed by this advisory cycle. Implementation must update those sources before claiming completed behavior.

## Cycle report

Status: **PARTIAL** for verification of the claimed finance completion. The review and next improvement plan are delivered. Confirmed improvements, remaining defects, dependency order and acceptance criteria are documented. **This is not done.** Full finance implementation/qualification is still incomplete.

Designed: next plan drafted. Implemented: no product code changed in this review; prior implementation has the partial improvements described. Tested: 35 focused tests and two typechecks passed; two runtime correctness findings reproduced. Integrated: not certified. Deployed: no reviewer action. Released: no. No migrations or compatibility changes executed. Incomplete: packets A–J and matching full runtime/security/accessibility evidence. Next required action: begin the bounded A/B handoff and remove the fixed report output through C before polishing remaining advanced surfaces.
