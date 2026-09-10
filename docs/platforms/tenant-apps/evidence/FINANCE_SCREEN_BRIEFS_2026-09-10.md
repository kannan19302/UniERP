# Finance screen-by-screen improvement briefs

Dated advisory proposals: 10 September 2026. Generated from the working tree by `node unierp-platform/docs/platforms/tenant-apps/evidence/generate-finance-screen-briefs-2026-09-10.cjs`.

**90 route files / 90 distinct route briefs.** Route-file digest: `e9f7d16e73a19415431402592f31982d6e8c74e32855438327ce32712de0b902`. The accompanying [source inventory](finance-screen-inventory-2026-09-10.json) records per-file hashes, direct source markers and candidate URL literals.

Read with [the master prompt](FINANCE_MASTER_IMPROVEMENT_PROMPT_2026-09-10.md) and [the findings audit](FINANCE_UI_UX_AUDIT_2026-09-10.md). Every brief inherits the master prompt's context, state, permission, table, form, responsive, accessibility and export requirements.

## How to interpret this appendix

Source scan is not complete semantic analysis or runtime proof. A marker indicates direct textual presence, not conformance; absence can mean behavior is inherited through a resource/component. URL literals can be navigation paths, not API calls. Advanced screens not listed in the audit's browser sample remain runtime-unverified. Each screen must be opened and its subviews/forms traced before implementation. Deep-inspected defects are in the audit; the following changes are proposals.

For every screen: deliver loading/refresh/empty/no-results/partial/stale/error/forbidden/not-found/offline/conflict/success states as applicable; keyboard/focus and screen-reader evidence; permission-specific actions; real data lineage; no fake success. Any inherited behavior must be verified at its owner.

## 01. 1099 preparation

**Route:** `/finance/advanced/1099-reporting`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/1099-reporting/page.tsx` (628 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 165, 218; localMoneyConversion at lines 361, 370, 441, 496; localSubTabs at lines 15, 554.

- **Screen structure:** Vendor eligibility/data quality, year/type totals, generated batches and validation results.
- **Workflow and UX improvement:** Replace native alerts/confirm; identify applicable filing year/format and require authorized submission separately.
- **Acceptance evidence:** Prove missing vendor fields, thresholds from effective policy, corrected return linkage and actual file schema.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 02. GL to subledger reconciliation

**Route:** `/finance/advanced/account-reconciliation`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/account-reconciliation/page.tsx` (144 lines at inventory time).  
**Observed direct source signals:** No selected direct markers; inspect imported components/resources..

- **Screen structure:** As-of account comparison with signed GL/subledger/difference and evidence detail.
- **Workflow and UX improvement:** Do not use absolute value for signed balances or turn load errors into empty success.
- **Acceptance evidence:** Prove negative differences remain negative, as-of/book scope matches and variance drill-through explains residuals.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 03. Accounting books and mappings

**Route:** `/finance/advanced/accounting-books`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/accounting-books/page.tsx` (888 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 208, 212, 244, 249; localMoneyConversion at lines 224, 465, 635, 646, 657 …; explicitRouteGuard at lines 17, 254, 885.

- **Screen structure:** Book list/detail with basis, currency, effective period and mapping-rule table.
- **Workflow and UX improvement:** Replace native dialogs; show source/destination accounts by name; preview mapping impact and unmapped accounts.
- **Acceptance evidence:** Prove same-book invalid mapping, missing accounts, effective dates, signed multiplier and controlled deletion.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 04. Financial analytical assistance

**Route:** `/finance/advanced/ai-analytics`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/ai-analytics/page.tsx` (1072 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 211, 634, 643, 802, 811 …; explicitRouteGuard at lines 21, 307, 1069; localSubTabs at lines 22, 366.

- **Screen structure:** Forecast/anomaly run list with source scope, model/version, assumptions and review.
- **Workflow and UX improvement:** Label predictions and uncertainty; show evidence and human decision, never autonomous posting or invented certainty.
- **Acceptance evidence:** Prove data availability, reproducible run metadata, reviewer feedback, permission scope and safe failure.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 05. Allocation rules and runs

**Route:** `/finance/advanced/allocations`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/allocations/page.tsx` (829 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 195; localMoneyConversion at lines 177, 467; localSubTabs at lines 19, 274.

- **Screen structure:** Rule register, source-pool/driver setup, allocation preview and run history.
- **Workflow and UX improvement:** Expose basis, dimensions, effective date, rounding remainder and destination accounts using lookups.
- **Acceptance evidence:** Prove allocated total equals source pool, zero denominator, missing driver, replay and journal lineage.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 06. AP scheduling and payment runs

**Route:** `/finance/advanced/ap-automation`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/ap-automation/page.tsx` (475 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 86, 111, 130; localMoneyConversion at lines 101, 120, 370, 448; explicitRouteGuard at lines 17, 142, 472.

- **Screen structure:** Schedules/run queue with due date, bank account, amount, status and exceptions.
- **Workflow and UX improvement:** Separate proposal, approval, execution and settlement; expose failed items rather than single success toast.
- **Acceptance evidence:** Prove duplicate-run protection, approval expiry, funds/currency constraints and item-level retry.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 07. Invoice matching rules

**Route:** `/finance/advanced/ap-match-rules`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/ap-match-rules/page.tsx` (335 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 92; localMoneyConversion at lines 70, 71, 267, 280; explicitRouteGuard at lines 15, 109, 332.

- **Screen structure:** Rule table with supplier/category scope, quantity/price tolerance and effective dates.
- **Workflow and UX improvement:** Replace terse edit/delete with impact-aware operations; simulate against example bill lines before activating.
- **Acceptance evidence:** Prove overlapping rule precedence, unauthorized tolerance changes and auditable version activation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 08. AR aging analysis

**Route:** `/finance/advanced/ar-aging`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/ar-aging/page.tsx` (407 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 349, 373; explicitRouteGuard at lines 16, 143, 404.

- **Screen structure:** As-of customer/invoice aging matrix with open balance and dispute drill-down.
- **Workflow and UX improvement:** One aging bucket definition and currency policy shared with AR overview and exports.
- **Acceptance evidence:** Prove exact boundary days, credits/partial payments, as-of allocation and aggregate reconciliation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 09. Collections and dunning automation

**Route:** `/finance/advanced/ar-automation`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/ar-automation/page.tsx` (594 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 88, 110, 115, 121, 127 …; localMoneyConversion at lines 104, 465; explicitRouteGuard at lines 23, 176, 591.

- **Screen structure:** Dunning levels, eligibility preview, run history and exclusion controls.
- **Workflow and UX improvement:** Separate rule setup from outbound execution; preview recipients/content and respect holds/disputes.
- **Acceptance evidence:** Prove no unauthorized sends, duplicate-run prevention, exclusion reasons and delivery outcomes.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 10. Advanced asset operations

**Route:** `/finance/advanced/asset-operations`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/asset-operations/page.tsx` (164 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 47, 48, 49, 53, 56 …; explicitRouteGuard at lines 6, 78, 162.

- **Screen structure:** Operation sections and run history over owned asset contracts.
- **Workflow and UX improvement:** Preserve specialized operation inputs; review selection, effective date, valuation and required approval.
- **Acceptance evidence:** Prove multi-asset partial outcomes, tenant scope, idempotency and lifecycle-specific accounting evidence.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 11. Finance audit and control evidence

**Route:** `/finance/advanced/audit-logs`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/audit-logs/page.tsx` (493 lines at inventory time).  
**Observed direct source signals:** explicitRouteGuard at lines 14, 113, 490.

- **Screen structure:** Searchable audit stream and explicitly separate SOX rules/conflicts sections.
- **Workflow and UX improvement:** Page name must match actual controls surface; show actor/action/record/time/outcome and resolution history.
- **Acceptance evidence:** Prove read-only audit integrity, redaction, bounded export, filter persistence and permission-controlled conflict resolution.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 12. Bank account master

**Route:** `/finance/advanced/bank-accounts`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/bank-accounts/page.tsx` (42 lines at inventory time).  
**Observed direct source signals:** explicitRouteGuard at lines 5, 12, 39.

- **Screen structure:** Masked account register/detail with entity, currency, ledger mapping, status and reconciliation setup.
- **Workflow and UX improvement:** Use verified reference lookups; expose ownership and change approval without leaking full sensitive identifiers.
- **Acceptance evidence:** Prove invalid mapping, duplicate identity, role restriction, masking and historical transaction compatibility.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 13. Bank feed connections and import

**Route:** `/finance/advanced/bank-feeds`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/bank-feeds/page.tsx` (692 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 141, 151, 168, 182, 188 …; localMoneyConversion at lines 391; explicitRouteGuard at lines 7, 226, 689.

- **Screen structure:** Connection health, sync history, statement import preview and transaction list.
- **Workflow and UX improvement:** Show provider/source, last successful sync, reauthorization, duplication and mapping errors; never fabricate credentials.
- **Acceptance evidence:** Prove malformed file/duplicate import, connection expiry, retry idempotency and no secret exposure.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 14. Transaction matching

**Route:** `/finance/advanced/bank-recon`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/bank-recon/page.tsx` (448 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 228, 288, 290, 291; explicitRouteGuard at lines 6, 167, 445.

- **Screen structure:** Two-sided statement/ledger workspace with amount/date/reference candidates and residuals.
- **Workflow and UX improvement:** Replace raw entity-ID input with authorized search; explain suggestion and allow deliberate manual match.
- **Acceptance evidence:** Prove ambiguous matches, signed amounts, split residual, already-matched conflict and foreign ID denial.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 15. Budget scenarios

**Route:** `/finance/advanced/budget-scenarios`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/budget-scenarios/page.tsx` (811 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 214; localMoneyConversion at lines 238, 239, 277, 298; explicitRouteGuard at lines 20, 373, 808.

- **Screen structure:** Scenario register with baseline/version, assumptions, owner and comparison action.
- **Workflow and UX improvement:** Meaningful scenario names and clone provenance; delete draft only under policy.
- **Acceptance evidence:** Prove scenario isolation, base preservation, permission and saved comparison state.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 16. Budget versions and control

**Route:** `/finance/advanced/budgeting`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/budgeting/page.tsx` (1270 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 286, 306, 338, 359, 362 …; localMoneyConversion at lines 127, 270, 356, 382, 387 …; explicitRouteGuard at lines 26, 644, 1267; localSubTabs at lines 27, 673.

- **Screen structure:** Budget register/detail, actual comparison, reallocations and setup sections.
- **Workflow and UX improvement:** Separate approved baseline, working draft and transfer approval; clear version owner and currency.
- **Acceptance evidence:** Prove line totals, budget control, reallocation balancing, amendment history and concurrent edit conflict.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 17. Cash forecast

**Route:** `/finance/advanced/cash-flow-forecast`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/cash-flow-forecast/page.tsx` (597 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 138, 158, 163; localMoneyConversion at lines 132, 148, 149, 203, 204 …; explicitRouteGuard at lines 6, 183, 594.

- **Screen structure:** Time-bucket cash forecast grid with scenario, inflow/outflow category and variance.
- **Workflow and UX improvement:** Replace native alerts; distinguish actuals, committed items, assumptions and manual overrides with audit.
- **Acceptance evidence:** Prove opening-to-closing roll-forward, missing rate/data, horizon changes and persisted overrides.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 18. Cash position

**Route:** `/finance/advanced/cash-position`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/cash-position/page.tsx` (324 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 114, 115.

- **Screen structure:** Daily account/entity/currency position with available/restricted balances and source timestamp.
- **Workflow and UX improvement:** Separate baseline from stress simulation, and expose assumptions and actual conversion rates.
- **Acceptance evidence:** Prove multi-currency totals, stale accounts, restricted cash definition and reset without altering actual balances.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 19. Chart of accounts

**Route:** `/finance/advanced/chart-of-accounts`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/chart-of-accounts/page.tsx` (42 lines at inventory time).  
**Observed direct source signals:** explicitRouteGuard at lines 5, 12, 39.

- **Screen structure:** Hierarchical account register with code, type, parent, posting eligibility and activity.
- **Workflow and UX improvement:** Support actual hierarchy and real account lookup; normalize Income/REVENUE terminology by owning contract.
- **Acceptance evidence:** Prove cycles/duplicate codes rejected, posted-account deletion restrictions and account-to-ledger drill-down.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 20. Close management calendar

**Route:** `/finance/advanced/close-management`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/close-management/page.tsx` (1496 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 341, 342, 429, 430; explicitRouteGuard at lines 16, 549, 1493; localSubTabs at lines 17, 613.

- **Screen structure:** Schedule/calendar plus dependencies, SLA policies, deadlines, breaches and task inspector.
- **Workflow and UX improvement:** Preserve existing specialized contracts; show immutable SLA provenance and task-specific amendments distinctly.
- **Acceptance evidence:** Prove dependency cycles/cross-tenant edges rejected, calendar timezone, SLA pagination and audited assignment.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 21. Close task register

**Route:** `/finance/advanced/close-tasks`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/close-tasks/page.tsx` (813 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 192; localMoneyConversion at lines 228, 707, 720, 729, 734 …; explicitRouteGuard at lines 19, 267, 810; localSubTabs at lines 20, 384.

- **Screen structure:** Period-filtered tasks with assignee, due time, dependency, evidence and status.
- **Workflow and UX improvement:** Task generation uses real template/version; bulk changes show selected scope and blocked tasks.
- **Acceptance evidence:** Prove only eligible tasks complete, dependency enforcement, permission checks and persisted evidence.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 22. Group consolidation

**Route:** `/finance/advanced/consolidation`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/consolidation/page.tsx` (289 lines at inventory time).  
**Observed direct source signals:** explicitRouteGuard at lines 13, 171, 286; localSubTabs at lines 14, 225.

- **Screen structure:** Entity/book/period scope, mapping and translation checks, run status and consolidated statements.
- **Workflow and UX improvement:** Expose ownership percentages/translation rules only from approved policy; block missing mappings.
- **Acceptance evidence:** Prove subsidiary-to-group roll-up, elimination reconciliation, run version and partial failure recovery.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 23. Card controls detail

**Route:** `/finance/advanced/corporate-cards/[id]`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/corporate-cards/[id]/page.tsx` (688 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 162, 180, 214, 240, 246 …; explicitRouteGuard at lines 16, 382, 685.

- **Screen structure:** RecordShell: card overview, limits, scoped rules, transactions and audit.
- **Workflow and UX improvement:** Replace scope-ID textbox with permitted entity/team/category lookup; show effective dates and inherited limits.
- **Acceptance evidence:** Prove invalid/foreign scope, concurrent policy edit, spend-limit precedence and audit trail.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 24. Corporate card register

**Route:** `/finance/advanced/corporate-cards`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/corporate-cards/page.tsx` (165 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 54, 63, 121, 136; explicitRouteGuard at lines 7, 93, 162.

- **Screen structure:** Masked cards by holder/team, currency, limit, spend and connection status.
- **Workflow and UX improvement:** Distinguish feed ingestion from issuing/freezing a card; meaningful authorized detail routes.
- **Acceptance evidence:** Prove masked data, currency-aware utilization, unavailable feed and permission-limited controls.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 25. Customer credit controls

**Route:** `/finance/advanced/credit-risk`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/credit-risk/page.tsx` (587 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 80, 107, 145, 153, 165; localMoneyConversion at lines 129, 300, 314; explicitRouteGuard at lines 17, 189, 584.

- **Screen structure:** Exposure register with limit, utilization, aging, hold reason and history.
- **Workflow and UX improvement:** Replace alert/confirm; justify credit/hold changes with authority, effective date and evidence.
- **Acceptance evidence:** Prove currency-consistent exposure, limit threshold, expiry, concurrent updates and downstream hold enforcement.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 26. Currency revaluation compatibility workspace

**Route:** `/finance/advanced/currency-revaluation`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/currency-revaluation/page.tsx` (355 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 88, 191, 219, 279, 288 …; explicitRouteGuard at lines 14, 103, 352.

- **Screen structure:** Comparison of current route semantics with FX runs and exposed currencies/books.
- **Workflow and UX improvement:** Keep separate only if distinct domain purpose; otherwise documented alias to accepted canonical workflow.
- **Acceptance evidence:** Prove no duplicate run across entry points and preserve existing links and supported contract behavior.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 27. Customer statements

**Route:** `/finance/advanced/customer-statement`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/customer-statement/page.tsx` (429 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 75, 99; localMoneyConversion at lines 384, 393, 404, 410; explicitRouteGuard at lines 17, 129, 426.

- **Screen structure:** Customer/date/currency selector and opening/activity/closing statement preview.
- **Workflow and UX improvement:** Create accessible actual document with payments/credits and source references; authorized delivery separate.
- **Acceptance evidence:** Prove opening plus activity equals closing, privacy scope, period selection and actual output format.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 28. Electronic invoice exchange

**Route:** `/finance/advanced/e-invoicing`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/e-invoicing/page.tsx` (304 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 91; explicitRouteGuard at lines 13, 104, 301.

- **Screen structure:** Document/status register with network/jurisdiction, validation and acknowledgment history.
- **Workflow and UX improvement:** Separate generated, submitted, rejected and accepted; preserve provider response and correction route.
- **Acceptance evidence:** Prove schema validation, provider failure, duplicate transmission and secure acknowledgment lineage.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 29. ESG accounting evidence

**Route:** `/finance/advanced/esg-accounting`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/esg-accounting/page.tsx` (1244 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 175, 207, 231, 284, 285 …; explicitRouteGuard at lines 19, 308, 1241; localSubTabs at lines 20, 367.

- **Screen structure:** Emissions/activity, factor version, offsets and KPI register with scope/units/source.
- **Workflow and UX improvement:** Distinguish measurement, estimation and assurance; never mix offsets with gross emissions silently.
- **Acceptance evidence:** Prove unit conversion, factor effective date, duplicate activity and transparent net/gross reconciliation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 30. AP exceptions

**Route:** `/finance/advanced/exception-queue`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/exception-queue/page.tsx` (213 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 157, 158; explicitRouteGuard at lines 13, 87, 210.

- **Screen structure:** Exception-first worklist with category, amount, age, owner and resolution options.
- **Workflow and UX improvement:** Provide actual source mismatch evidence and controlled reasoned resolution, not arbitrary status edit.
- **Acceptance evidence:** Prove duplicate resolution, reopened exceptions, required evidence and no bypass of payment approval.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 31. Exchange rates

**Route:** `/finance/advanced/exchange-rates`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/exchange-rates/page.tsx` (39 lines at inventory time).  
**Observed direct source signals:** explicitRouteGuard at lines 5, 11, 36.

- **Screen structure:** Base/quote/type/date/source register with effective ranges and approval.
- **Workflow and UX improvement:** Distinguish spot/closing/average; show import source and stale/missing status rather than static USD format.
- **Acceptance evidence:** Prove inverted pairs, zero/negative rates, duplicate effective keys and approval history.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 32. Expense policy and rates

**Route:** `/finance/advanced/expense-policies`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/expense-policies/page.tsx` (611 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 124, 125, 140, 151, 190 …; explicitRouteGuard at lines 16, 342, 608.

- **Screen structure:** Policy/category, mileage and per-diem tables with jurisdiction/currency/effective dates.
- **Workflow and UX improvement:** Explain precedence, exception approvals and inherited settings; preview change impact.
- **Acceptance evidence:** Prove overlapping date/rate rules, historical reimbursement invariance and unauthorized policy denial.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 33. Expense reports

**Route:** `/finance/advanced/expense-reports`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/expense-reports/page.tsx` (633 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 48, 128, 200; explicitRouteGuard at lines 17, 344, 630; localSubTabs at lines 18, 386.

- **Screen structure:** Submitter/report register plus line/receipt detail, policy exceptions and approval history.
- **Workflow and UX improvement:** Separate submit, approve, reject and reimburse; OCR is extraction evidence rather than approval.
- **Acceptance evidence:** Prove missing receipt, policy violation, currency conversion, duplicate expense and reimbursement replay.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 34. Instrument accounting

**Route:** `/finance/advanced/financial-instruments`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/financial-instruments/page.tsx` (830 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 51, 57, 155, 156, 183 …; localSubTabs at lines 19, 516; customModalOverlay at lines 562, 701.

- **Screen structure:** Instrument records with valuation date, model inputs, fair value and credit-loss evidence.
- **Workflow and UX improvement:** Keep valuation/provisioning workflows distinct from trade execution; show method/version and sensitivity.
- **Acceptance evidence:** Prove stale inputs, sign/currency/precision, approval and resulting accounting record lineage.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 35. Financial periods

**Route:** `/finance/advanced/financial-periods`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/financial-periods/page.tsx` (39 lines at inventory time).  
**Observed direct source signals:** explicitRouteGuard at lines 5, 11, 36.

- **Screen structure:** Fiscal calendar/register showing book/entity, open/closing/closed and allowed actions.
- **Workflow and UX improvement:** Move actual close/reopen here under explicit control, never cosmetic shell status change.
- **Acceptance evidence:** Prove overlapping periods, posting cutoff, close blockers, role denial and audited reopening.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 36. Financial ratios

**Route:** `/finance/advanced/financial-ratios`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/financial-ratios/page.tsx` (195 lines at inventory time).  
**Observed direct source signals:** No selected direct markers; inspect imported components/resources..

- **Screen structure:** Defined ratio cards/table with numerator, denominator, units, baseline and source links.
- **Workflow and UX improvement:** Remove implied health benchmarks unless sourced/configured; show N/A for undefined ratios.
- **Acceptance evidence:** Prove zero/negative denominator policy, period comparability and exact underlying statement values.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 37. Asset lifecycle record

**Route:** `/finance/advanced/fixed-assets/assets/[id]`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/fixed-assets/assets/[id]/page.tsx` (1297 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 241, 272, 284; localMoneyConversion at lines 187, 208, 209, 255, 377 ….

- **Screen structure:** RecordShell: acquisition, books, schedule, transfers, impairment/disposal and audit.
- **Workflow and UX improvement:** Explain each permitted transition and accounting impact; schedule belongs to selected book/date.
- **Acceptance evidence:** Prove disposed asset controls, transfer history, impairment approval and value-to-journal reconciliation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 38. New asset record

**Route:** `/finance/advanced/fixed-assets/assets/new`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/fixed-assets/assets/new/page.tsx` (473 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 119, 120, 124.

- **Screen structure:** Acquisition/capitalization form with source document, cost/currency and depreciation policy.
- **Workflow and UX improvement:** Use real categories/accounts and explicit in-service/residual/life inputs; no sample defaults.
- **Acceptance evidence:** Prove residual versus cost, date ordering, required mapping, failed save retention and durable creation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 39. Asset records

**Route:** `/finance/advanced/fixed-assets/assets`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/fixed-assets/assets/page.tsx` (261 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 203, 209.

- **Screen structure:** Searchable category/location/custodian/lifecycle register with book values and currency.
- **Workflow and UX improvement:** Share record identities and depreciation source with core assets; detail/new links are canonical.
- **Acceptance evidence:** Prove filter/sort/page totals, disposed/held assets, deep links and selected export scope.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 40. Asset categories and overview

**Route:** `/finance/advanced/fixed-assets`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/fixed-assets/page.tsx` (640 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 139, 146; localMoneyConversion at lines 118, 198, 202, 337, 346 ….

- **Screen structure:** Asset workspace with category/setup section and link to full asset records.
- **Workflow and UX improvement:** Clarify overview versus record register; canonical category, depreciation and account mappings.
- **Acceptance evidence:** Prove category mapping validity, no duplicate master source and actual register totals.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 41. Rolling forecasts

**Route:** `/finance/advanced/forecast-scenarios`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/forecast-scenarios/page.tsx` (507 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 120; explicitRouteGuard at lines 15, 158, 504.

- **Screen structure:** Forecast version/horizon register and driver/actual overlay.
- **Workflow and UX improvement:** Distinguish rolling forecast from annual budget; show actual cutoff, forecast horizon and assumptions.
- **Acceptance evidence:** Prove period roll-forward, overwritten actual prevention, refresh conflict and persisted scenario lineage.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 42. FX revaluation runs

**Route:** `/finance/advanced/fx-revaluation`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/fx-revaluation/page.tsx` (530 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 109, 112, 125, 132; localMoneyConversion at lines 448, 457, 468, 475, 476; explicitRouteGuard at lines 18, 166, 527.

- **Screen structure:** Run list plus context/rate preview wizard and detail journal links.
- **Workflow and UX improvement:** Handle actual source/target currency, exclusions and gain/loss sign; canonical owner shared with core FX.
- **Acceptance evidence:** Prove supported currencies, stale rate rejection, posting/reversal linkage and idempotent run.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 43. Elimination ledger/rules/runs

**Route:** `/finance/advanced/intercompany/eliminations`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/intercompany/eliminations/page.tsx` (928 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 172, 175, 188, 198, 212 …; localMoneyConversion at lines 394, 846; explicitRouteGuard at lines 19, 275, 925; localSubTabs at lines 20, 341.

- **Screen structure:** Consolidation-period rule matrix, preview and resulting journal list.
- **Workflow and UX improvement:** Show elimination basis and unmapped counterpart exceptions; separate proposed from posted entries.
- **Acceptance evidence:** Prove group/book scope, residual reconciliation, replay and actual reversal history.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 44. Netting runs

**Route:** `/finance/advanced/intercompany/netting`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/intercompany/netting/page.tsx` (373 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 105, 110, 119, 129, 135; localMoneyConversion at lines 226, 248, 302, 344; explicitRouteGuard at lines 16, 150, 370.

- **Screen structure:** Eligible obligations, entity-pair balances, proposal and settlement status.
- **Workflow and UX improvement:** Show gross to net calculation, currency/rate/date and excluded disputed items before approval.
- **Acceptance evidence:** Prove net totals, duplicate inclusion, multi-currency policy and partial settlement reconciliation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 45. Intercompany transaction register

**Route:** `/finance/advanced/intercompany`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/intercompany/page.tsx` (556 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 173; explicitRouteGuard at lines 15, 222, 553.

- **Screen structure:** Entity-pair/document/status register with due-to/due-from, currency and agreement.
- **Workflow and UX improvement:** Distinguish loans/fees/trade entries and netting/elimination links; no direct cross-entity mutation from UI.
- **Acceptance evidence:** Prove reciprocal source references, allowed entity scope, balanced accounting and exception resolution.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 46. Invoice analysis

**Route:** `/finance/advanced/invoice-analytics`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/invoice-analytics/page.tsx` (344 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 70; explicitRouteGuard at lines 18, 94, 341.

- **Screen structure:** Metrics and cohort/aging analysis with definitions, filters and drill-through.
- **Workflow and UX improvement:** Separate issued, recognized and collected revenue; expose source period and data coverage.
- **Acceptance evidence:** Prove filtered totals match invoices, no double counting, zero denominator and chart accessible table.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 47. Supplier invoice capture

**Route:** `/finance/advanced/invoice-capture`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/invoice-capture/page.tsx` (1076 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 362; localMoneyConversion at lines 389, 614, 624, 743, 753 …; explicitRouteGuard at lines 24, 396, 1073.

- **Screen structure:** Document upload/preview beside extracted header and line fields.
- **Workflow and UX improvement:** Use real extraction provenance/confidence and field corrections; duplicate check before draft creation.
- **Acceptance evidence:** Prove unreadable document, unsupported type, tax/total mismatch, upload failure and retained human corrections.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 48. New journal

**Route:** `/finance/advanced/journal-entries/new`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/journal-entries/new/page.tsx` (29 lines at inventory time).  
**Observed direct source signals:** explicitRouteGuard at lines 5, 12, 26.

- **Screen structure:** TransactionWorkspace with header context, editable line grid, totals and validation summary.
- **Workflow and UX improvement:** Replace generic flat form if it cannot represent complete balanced lines; blank amounts and draft default.
- **Acceptance evidence:** Prove at least two valid lines, precision, no simultaneous debit/credit misuse, dirty exit and server validation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 49. Advanced journal register

**Route:** `/finance/advanced/journal-entries`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/journal-entries/page.tsx` (44 lines at inventory time).  
**Observed direct source signals:** explicitRouteGuard at lines 6, 14, 41.

- **Screen structure:** Canonical journal lifecycle list with totals and next permitted actions.
- **Workflow and UX improvement:** Map basic and advanced implementations to one authoritative journal model; preserve supported aliases.
- **Acceptance evidence:** Prove list/detail/create continuity, approval/post separation and source-document navigation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 50. Lease detail

**Route:** `/finance/advanced/leases/[id]`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/leases/[id]/page.tsx` (440 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 232, 239, 248, 348, 353 ….

- **Screen structure:** RecordShell with payment schedule, liability/ROU roll-forward, amendments and audit.
- **Workflow and UX improvement:** Compare before/after remeasurement and disclose effective date; preserve original assumptions.
- **Acceptance evidence:** Prove modified payment schedule, termination accounting, replay and journal references under owned policy.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 51. New lease

**Route:** `/finance/advanced/leases/new`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/leases/new/page.tsx` (206 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 45, 46.

- **Screen structure:** Structured term/payment/discount-rate form with schedule preview and basis.
- **Workflow and UX improvement:** Explain units/rate frequency/options; save draft before recognition; use authorized counterparties/accounts.
- **Acceptance evidence:** Prove irregular payments, date/rate validity, rounding and server-owned schedule calculation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 52. Lease register

**Route:** `/finance/advanced/leases`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/leases/page.tsx` (644 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 136, 137, 299, 308, 616 ….

- **Screen structure:** Lessor/asset/classification/currency/term register with liability and ROU balances.
- **Workflow and UX improvement:** State accounting basis and calculation date; remeasurement is controlled versioned amendment.
- **Acceptance evidence:** Prove active/terminated classification, schedule totals and lease-to-journal drill-through.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 53. Finance workspace catalog

**Route:** `/finance/advanced`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/page.tsx` (126 lines at inventory time).  
**Observed direct source signals:** No selected direct markers; inspect imported components/resources..

- **Screen structure:** Searchable permission-aware categorized links with consistent names and descriptions.
- **Workflow and UX improvement:** Derive reachability/counts from one registry; explain task rather than claiming broad capability or readiness.
- **Acceptance evidence:** Prove no dead links, denied-workspace filtering, accurate counts and distinct tab identity for all entries.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 54. Payment batches

**Route:** `/finance/advanced/payment-batches`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/payment-batches/page.tsx` (728 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 170; localMoneyConversion at lines 140, 235, 409, 561, 651; explicitRouteGuard at lines 21, 238, 725.

- **Screen structure:** Batch composer with eligible bills, selected totals, deductions, bank/value date and review.
- **Workflow and UX improvement:** Use durable proposal ID/version; removal changes draft only; no accidental live payment on selection.
- **Acceptance evidence:** Prove partial failure, replay, duplicate bill selection, concurrent settlement and per-item results.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 55. Payment terms master

**Route:** `/finance/advanced/payment-terms`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/payment-terms/page.tsx` (42 lines at inventory time).  
**Observed direct source signals:** explicitRouteGuard at lines 5, 12, 39.

- **Screen structure:** Terms register with due-date calculation, discount window and active/effective state.
- **Workflow and UX improvement:** Preview due date from sample business date using configured calendar; avoid ambiguous free text only.
- **Acceptance evidence:** Prove month-end/leap-year rules, inactive-term usage and historical document preservation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 56. Reconciliation certification

**Route:** `/finance/advanced/reconciliations`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/reconciliations/page.tsx` (468 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 378; explicitRouteGuard at lines 7, 237, 336; localSubTabs at lines 8, 279.

- **Screen structure:** Account/statement/period reconciliation register with difference and supporting evidence.
- **Workflow and UX improvement:** Separate suggested match, matched lines and signed-off reconciliation; canonical book and statement sources.
- **Acceptance evidence:** Prove opening plus movements equals closing, unresolved items disclosed and actual certification audit.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 57. Recurring invoices

**Route:** `/finance/advanced/recurring`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/recurring/page.tsx` (354 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 185, 345; explicitRouteGuard at lines 15, 203, 351.

- **Screen structure:** Schedule register with customer/template/cadence/effective dates and generated documents.
- **Workflow and UX improvement:** Use one schedule owner shared with core recurring page; explicit preview/pause/resume and generation result.
- **Acceptance evidence:** Prove missed-run catch-up policy, month-end cadence, idempotency and no duplicate invoices.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 58. Statement suite

**Route:** `/finance/advanced/reports`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/reports/page.tsx` (968 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 240, 272, 366, 401, 436 …; explicitRouteGuard at lines 20, 792, 965.

- **Screen structure:** Statement selector and dimensions with period comparisons and account drill-through.
- **Workflow and UX improvement:** Share report execution/export semantics with core reports; preserve book and basis context.
- **Acceptance evidence:** Prove P&L/BS/cash-flow/trial-balance identities, filters, missing mappings and reproducible output.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 59. Revenue recognition

**Route:** `/finance/advanced/revenue-schedules`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/revenue-schedules/page.tsx` (301 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 21, 47, 51, 64, 134 ….

- **Screen structure:** Contract/performance obligation schedule with recognized/deferred balances by period.
- **Workflow and UX improvement:** Explain recognition basis and proposed journal; distinguish billing/collection from earned revenue.
- **Acceptance evidence:** Prove schedule allocation totals, period recognition replay, modifications and GL reconciliation under approved policy.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 60. Finance risk register

**Route:** `/finance/advanced/risk-management`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/risk-management/page.tsx` (917 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 438, 568, 628; explicitRouteGuard at lines 21, 268, 914; localSubTabs at lines 22, 327.

- **Screen structure:** Scorecards, supplier assessments and market exposures with owner/action/evidence.
- **Workflow and UX improvement:** Explain score model and version; distinguish measured exposure from qualitative assessment.
- **Acceptance evidence:** Prove score provenance, stale assessment, role-limited changes and mitigation history.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 61. Scenario comparison

**Route:** `/finance/advanced/scenario-comparison`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/scenario-comparison/page.tsx` (341 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 210, 216, 222, 260, 272 …; explicitRouteGuard at lines 15, 118, 338.

- **Screen structure:** Aligned comparison matrix for equal scope/currency/period with absolute/percentage deltas.
- **Workflow and UX improvement:** Block incompatible baselines or explain conversion; drill into differing drivers and lines.
- **Acceptance evidence:** Prove consistent denominator, zero base, scenario version preservation and reconciled exports.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 62. Subscription record

**Route:** `/finance/advanced/subscriptions/[id]`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/subscriptions/[id]/page.tsx` (571 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 118, 128, 135, 142, 150 …; localMoneyConversion at lines 79, 157, 158, 387, 441 ….

- **Screen structure:** RecordShell: contract, billing history, usage, amendments and audit.
- **Workflow and UX improvement:** Usage uses typed metric/unit/period with correction history; lifecycle actions have impact review.
- **Acceptance evidence:** Prove duplicate usage, negative/correction policy, mid-cycle change and invoice/revenue links.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 63. New subscription

**Route:** `/finance/advanced/subscriptions/new`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/subscriptions/new/page.tsx` (369 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 64, 87, 90; localMoneyConversion at lines 73, 74, 76, 80, 81 ….

- **Screen structure:** Transaction form with customer/plan lookup, price/currency, term, billing cycle and start.
- **Workflow and UX improvement:** Replace raw customer ID; review proration, tax and first invoice date before draft/activation.
- **Acceptance evidence:** Prove invalid dates, missing plan, tenant-restricted lookup and exact initial billing preview.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 64. Subscription register

**Route:** `/finance/advanced/subscriptions`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/subscriptions/page.tsx` (440 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 103, 108, 120, 130, 140; localMoneyConversion at lines 169.

- **Screen structure:** Customer/plan/status/currency/cadence register plus defined MRR/ARR metrics.
- **Workflow and UX improvement:** Distinguish billing from revenue recognition and pause from cancel; batch billing review required.
- **Acceptance evidence:** Prove proration policy, duplicate billing, scheduled cancellation and metric reconciliation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 65. Tax rules and withholding

**Route:** `/finance/advanced/tax-engine`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/tax-engine/page.tsx` (428 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 75, 97, 98, 388, 397; explicitRouteGuard at lines 14, 121, 425.

- **Screen structure:** Jurisdiction/type/effective-date rule register with precedence and calculation preview.
- **Workflow and UX improvement:** Expose authoritative source/version and exemption conditions; no globally applied fixed rates.
- **Acceptance evidence:** Prove overlapping rules, date applicability, rounding and missing-rule failure using owner-approved cases.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 66. Tax filing summary

**Route:** `/finance/advanced/tax-filing-summary`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/tax-filing-summary/page.tsx` (217 lines at inventory time).  
**Observed direct source signals:** explicitRouteGuard at lines 15, 72, 214.

- **Screen structure:** Liability/due-date/status summary by entity and jurisdiction with underlying returns.
- **Workflow and UX improvement:** Differentiate no obligation from missing setup; reconcile to tax ledger and source period.
- **Acceptance evidence:** Prove overdue logic, timezone/calendar, liability totals and filtered filing links.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 67. Tax filing preparation

**Route:** `/finance/advanced/tax-filing`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/tax-filing/page.tsx` (296 lines at inventory time).  
**Observed direct source signals:** explicitRouteGuard at lines 13, 88, 293.

- **Screen structure:** Draft return register and guided input/reconciliation/review/output workflow.
- **Workflow and UX improvement:** Replace technical payload entry as primary UX with labelled business fields; submission status requires acknowledgment.
- **Acceptance evidence:** Prove period validity, missing source data, rejected preparation and immutable approved version.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 68. Nexus monitoring

**Route:** `/finance/advanced/tax-nexus`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/tax-nexus/page.tsx` (607 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 126, 190, 206; localMoneyConversion at lines 171, 172, 229, 238, 248 …; localSubTabs at lines 13, 530.

- **Screen structure:** Jurisdiction threshold/measurement dashboard with effective rules and evidence drill-through.
- **Workflow and UX improvement:** Explain sales/transaction basis, exemptions and monitoring date; alert is not automatic legal registration.
- **Acceptance evidence:** Prove configured threshold boundaries, applicable periods, exclusions and auditable rule updates.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 69. Tax operations

**Route:** `/finance/advanced/tax-operations`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/tax-operations/page.tsx` (203 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 53, 56, 62, 70, 72 …; explicitRouteGuard at lines 6, 94, 201; localSubTabs at lines 7, 187.

- **Screen structure:** Specialized jurisdiction versions, certificates, reconciliations, withholding and amendments sections.
- **Workflow and UX improvement:** Preserve published specialized contracts; surface evidence, effective dates and approval separately.
- **Acceptance evidence:** Prove expired certificate, jurisdiction versioning, amended filing lineage and scoped permission denial.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 70. Tax provision workpapers

**Route:** `/finance/advanced/tax-provisioning`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/tax-provisioning/page.tsx` (1348 lines at inventory time).  
**Observed direct source signals:** nativeDialog at lines 301, 429, 478; localMoneyConversion at lines 189, 191, 192, 263, 264 …; explicitRouteGuard at lines 19, 486, 1345; localSubTabs at lines 20, 545.

- **Screen structure:** Provision runs, deferred schedules and uncertain positions with methodology and approvals.
- **Workflow and UX improvement:** Show current/deferred components, assumptions and effective rates; no claim of certification from title.
- **Acceptance evidence:** Prove component reconciliation, missing inputs, sign/rounding and approved journal lineage.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 71. Treasury operations

**Route:** `/finance/advanced/treasury`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/treasury/page.tsx` (816 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 170, 171, 196, 221, 226 …; explicitRouteGuard at lines 16, 237, 813.

- **Screen structure:** Portfolio/transaction register with counterparty, value date, currency, instrument and approval.
- **Workflow and UX improvement:** Map actions to real portfolio/sweep/transfer capabilities; show fees, available funds and settlement status.
- **Acceptance evidence:** Prove date/currency validity, dual authorization, transfer replay and failed settlement reconciliation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 72. Working capital programs

**Route:** `/finance/advanced/working-capital`  
**Current source:** `tenant-apps/app/(dashboard)/finance/advanced/working-capital/page.tsx` (778 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 128, 129, 174, 175, 196 …; explicitRouteGuard at lines 20, 238, 775; localSubTabs at lines 21, 297.

- **Screen structure:** Separate discount offers, supply-chain finance and factoring with cash impact comparison.
- **Workflow and UX improvement:** Explain DSO/DPO/DIO/CCC definitions and offer assumptions; acceptance is a controlled transaction.
- **Acceptance evidence:** Prove denominator rules, offer expiry, disclosed rates/fees and approval before financial commitment.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 73. Payables review queue

**Route:** `/finance/ap`  
**Current source:** `tenant-apps/app/(dashboard)/finance/ap/page.tsx` (905 lines at inventory time).  
**Observed direct source signals:** queryHook at lines 5, 99; customModalOverlay at lines 682, 773.

- **Screen structure:** Bill queue plus selected actual PO/receipt/invoice line comparison.
- **Workflow and UX improvement:** Remove fabricated original-document preview, fixed pagination and implied verification; review variance before payment.
- **Acceptance evidence:** Prove matching tolerances, attachment absence, selection identity, failed payment recovery and approved-state gating.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 74. Receivables collection queue

**Route:** `/finance/ar`  
**Current source:** `tenant-apps/app/(dashboard)/finance/ar/page.tsx` (901 lines at inventory time).  
**Observed direct source signals:** queryHook at lines 5, 100; customModalOverlay at lines 763.

- **Screen structure:** Aging-filtered worklist with invoice/customer inspector, disputes and promises.
- **Workflow and UX improvement:** Replace automatic full-balance ACH receipt with deliberate partial-payment/allocation form; real follow-up history.
- **Acceptance evidence:** Prove aging boundaries, partial settlement, payment replay, concurrent collector conflict and source links.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 75. Asset overview

**Route:** `/finance/assets`  
**Current source:** `tenant-apps/app/(dashboard)/finance/assets/page.tsx` (743 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 127; queryHook at lines 5, 92; customModalOverlay at lines 533, 644.

- **Screen structure:** Asset register plus selected asset lifecycle and depreciation schedule.
- **Workflow and UX improvement:** Remove fallback amounts/default cost/location and fixed depreciation period; route registration to canonical asset form.
- **Acceptance evidence:** Prove valid zero balances, actual asset selection, open-period depreciation and persisted run/journal references.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 76. Banking overview

**Route:** `/finance/banking`  
**Current source:** `tenant-apps/app/(dashboard)/finance/banking/page.tsx` (697 lines at inventory time).  
**Observed direct source signals:** queryHook at lines 5, 96; customModalOverlay at lines 573.

- **Screen structure:** Account/currency balances, sync status, unmatched queue and selected reconciliation context.
- **Workflow and UX improvement:** Bind summary to real bank/book data; import through real file validation and route to owned matching workflow.
- **Acceptance evidence:** Prove bank/ledger balance definitions, duplicate statement handling, stale connection and residual differences.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 77. Budget planning workspace

**Route:** `/finance/budget-planning`  
**Current source:** `tenant-apps/app/(dashboard)/finance/budget-planning/page.tsx` (510 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 104, 132, 374, 390, 406; queryHook at lines 5, 71.

- **Screen structure:** Version/scenario matrix with budget/actual/forecast and driver inspector.
- **Workflow and UX improvement:** Remove fictional KPI fallbacks and saved timestamps; bind drivers and fiscal period to persisted draft.
- **Acceptance evidence:** Prove scenario isolation, save/reload, dirty refetch, signed favorable variance and submission freeze.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 78. Expenses entry hub

**Route:** `/finance/expenses`  
**Current source:** `tenant-apps/app/(dashboard)/finance/expenses/page.tsx` (39 lines at inventory time).  
**Observed direct source signals:** localSubTabs at lines 5, 30.

- **Screen structure:** Task navigation into expense reports, policies and supported card/reimbursement flows.
- **Workflow and UX improvement:** Keep existing embedded views but remove duplicate cross-module navigation; one canonical expense model.
- **Acceptance evidence:** Prove subview deep links, permission filtering and return context from report details.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 79. FX revaluation overview

**Route:** `/finance/fx-revaluation`  
**Current source:** `tenant-apps/app/(dashboard)/finance/fx-revaluation/page.tsx` (676 lines at inventory time).  
**Observed direct source signals:** queryHook at lines 4, 95; customModalOverlay at lines 544.

- **Screen structure:** Rate provenance, foreign balances, preview impact and run history.
- **Workflow and UX improvement:** Converge with advanced FX workflows; no decorative live-rate or successful-post badges.
- **Acceptance evidence:** Prove missing/stale rates, currency/date semantics, balanced journal, replay and reversal references.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 80. General ledger

**Route:** `/finance/gl`  
**Current source:** `tenant-apps/app/(dashboard)/finance/gl/page.tsx` (687 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 113, 114, 174, 175, 601 …; queryHook at lines 4, 88.

- **Screen structure:** DataWorkspace: account/period/book/dimension filters, ledger lines and selected-record inspector.
- **Workflow and UX improvement:** Repair missing provider path and non-durable source behavior before enabling posting; show real balances and source journals.
- **Acceptance evidence:** Prove error states, full-dataset totals, balancing, tenant scope, durable posting/reversal and retained drill-down context.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 81. Intercompany overview

**Route:** `/finance/intercompany`  
**Current source:** `tenant-apps/app/(dashboard)/finance/intercompany/page.tsx` (584 lines at inventory time).  
**Observed direct source signals:** queryHook at lines 4, 80; customModalOverlay at lines 461.

- **Screen structure:** Entity-pair balances and exceptions with elimination/netting drill-through.
- **Workflow and UX improvement:** Distinguish consolidation elimination from settlement netting; no local-only completed state.
- **Acceptance evidence:** Prove both-side identifiers, period/book consistency, unmatched counterpart and durable results.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 82. Customer invoice record

**Route:** `/finance/invoices/[id]`  
**Current source:** `tenant-apps/app/(dashboard)/finance/invoices/[id]/page.tsx` (642 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 206, 207, 209, 213, 218 …; explicitRouteGuard at lines 20, 228, 639; canonicalFloorplan at lines 8, 229, 638.

- **Screen structure:** Record/Transaction workspace: invoice header, items, payments/credits, document, related source and audit.
- **Workflow and UX improvement:** Show immutable issued values and explicit settlement/credit lifecycle; retain parent list state and selected ID.
- **Acceptance evidence:** Prove invalid/foreign ID, partial related-data failure, arithmetic/rounding, payment history and credit balances.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 83. Customer invoice register

**Route:** `/finance/invoices`  
**Current source:** `tenant-apps/app/(dashboard)/finance/invoices/page.tsx` (228 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 57, 58, 86, 87, 88; explicitRouteGuard at lines 6, 94, 225; queryHook at lines 6, 43.

- **Screen structure:** One list toolbar, scoped totals, saved filters, canonical statuses and currency columns.
- **Workflow and UX improvement:** Use one creation/export entry point; totals and export follow applied filters rather than separate capped query.
- **Acceptance evidence:** Prove more than 250 invoices, mixed currencies, status filters, complete export and intentional line-based creation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 84. Journal register

**Route:** `/finance/journal-entries`  
**Current source:** `tenant-apps/app/(dashboard)/finance/journal-entries/page.tsx` (1169 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 150, 151, 948, 962; queryHook at lines 4, 121.

- **Screen structure:** DataWorkspace: lifecycle views, journal totals, author/approver and source.
- **Workflow and UX improvement:** Converge with advanced journal register by contract; separate create, submit, approve, post and reverse.
- **Acceptance evidence:** Prove lifecycle-specific permissions, state transitions, duplicate prevention and recurrence links.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 85. Finance overview

**Route:** `/finance`  
**Current source:** `tenant-apps/app/(dashboard)/finance/page.tsx` (1107 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 194, 250, 257, 269, 270 …; queryHook at lines 6, 208.

- **Screen structure:** Operational floorplan: scoped KPIs, trends, exception queue and close progress.
- **Workflow and UX improvement:** Replace false live/zero semantics; align chart period and aging definitions; drill into exact filtered queues.
- **Acceptance evidence:** Prove all KPI definitions and totals against source, no-data/failed-data distinction, chart table alternative and neutral zero changes.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 86. Recurring billing entry

**Route:** `/finance/recurring`  
**Current source:** `tenant-apps/app/(dashboard)/finance/recurring/page.tsx` (20 lines at inventory time).  
**Observed direct source signals:** No selected direct markers; inspect imported components/resources..

- **Screen structure:** Schedule-focused register with cadence, next run, customer and lifecycle.
- **Workflow and UX improvement:** Name it recurring invoices when that is the resource; do not call it recurring journal entries in shell metadata.
- **Acceptance evidence:** Prove schedule identity, pause/resume, recurrence dates and generated invoice lineage.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 87. Financial statement workspace

**Route:** `/finance/reports`  
**Current source:** `tenant-apps/app/(dashboard)/finance/reports/page.tsx` (463 lines at inventory time).  
**Observed direct source signals:** queryHook at lines 4, 69; customModalOverlay at lines 343.

- **Screen structure:** Report/period/book/entity filters, comparative statement and drill-through.
- **Workflow and UX improvement:** Replace fixed August/July schema and CSV disguised as PDF/XLSX; source-certified outputs only when actually approved.
- **Acceptance evidence:** Prove file format/content, report selection, signed totals, period switching and report-to-ledger reconciliation.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 88. Finance policy settings

**Route:** `/finance/settings`  
**Current source:** `tenant-apps/app/(dashboard)/finance/settings/page.tsx` (401 lines at inventory time).  
**Observed direct source signals:** queryHook at lines 4, 56.

- **Screen structure:** Scoped settings sections with inheritance/locks, validation and save/discard boundary.
- **Workflow and UX improvement:** Prevent background refetch overwriting dirty fields; make policy owner/effective date and historical impact explicit.
- **Acceptance evidence:** Prove save/reload/version conflict, locked policy server denial and audit of valid changes.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 89. Tax compliance overview

**Route:** `/finance/tax`  
**Current source:** `tenant-apps/app/(dashboard)/finance/tax/page.tsx` (1071 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 169; queryHook at lines 5, 123, 132; customModalOverlay at lines 845, 965.

- **Screen structure:** Jurisdiction/entity/period worklist with liability, due date, owner and documented lifecycle.
- **Workflow and UX improvement:** Separate preparation, submission and acknowledged acceptance; actual filing/source evidence only.
- **Acceptance evidence:** Prove due-date context, no-obligation state, missing rules, failed filing dependency and authorized status transitions.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

## 90. Vendor bill register

**Route:** `/finance/vendor-bills`  
**Current source:** `tenant-apps/app/(dashboard)/finance/vendor-bills/page.tsx` (208 lines at inventory time).  
**Observed direct source signals:** localMoneyConversion at lines 53, 76, 77, 78; explicitRouteGuard at lines 6, 84, 205; queryHook at lines 6, 40.

- **Screen structure:** Supplier/date/status/amount register with actual source-document entry and detail access.
- **Workflow and UX improvement:** Align with AP work queue; separate submitted bill data from approval, payment and matching evidence.
- **Acceptance evidence:** Prove duplicate supplier reference, filtered totals, failed upload, draft correction and approved-record immutability.
- **Implementation handoff:** trace this route's actual data resource, embedded sections and action endpoints; map to approved owner and current contract; capture before/after states and verify all relevant master-prompt gates. Do not claim completion from the source signals above.

