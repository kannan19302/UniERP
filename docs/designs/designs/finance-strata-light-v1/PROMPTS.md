# Finance Strata light v1 generation prompts

Date: 2026-09-07. Built-in image generation. Non-normative design exploration; synthetic data.

## Shared prompt

Use case: ui-mockup. Create a meticulously polished UniERP Finance Strata Workbench LIGHT MODE desktop application screen, a new professional design version of the reference. Wide 16:10 high resolution, straight-on full screen UI, sharp readable text. Reference is workflow inspiration only: thoroughly redesign composition, correct nonsensical labels, use synthetic coherent data. No dark areas, no perspective, no device, no decorative background or marketing captions.
Authoritative Strata design: slate #f8fafc canvas, white #ffffff work surfaces/sidebar, #f1f5f9 recessed headers, hairline #e2e8f0 dividers, navy #0f172a text, #475569 secondary text, restrained cobalt #2563eb accent and #1d4ed8 primary button. Emerald/amber/crimson only with meaningful icons and status words. Small 4–6px corners, virtually no shadows. Inter Display headings, Inter body with tabular figures, JetBrains Mono identifiers. Precise column alignment and consistent spacing. Data-dense yet legible; do not cram meaningless tiny text. Strong hierarchy rather than card soup.
Consistent product shell: 190px white sidebar, a small cobalt layered geometric mark and UniERP wordmark; workspace switcher Finance; nav Overview, General ledger, Receivables, Payables, Banking, Fixed assets, Tax, Planning, Reports, Settings with understated line icons and appropriate active cobalt highlight. Bottom help and role Finance manager. Slim white topbar with global search and compact utility icons. Single Strata context band reads Acme Corp / US Operations / FY 2026 / Aug 2026 and USD, period status, with small chevron segments and a cobalt left edge. No redundant nav tab bars. Main screen title, short contextual subtitle, one clear primary action. Show 'Demo data' discreetly and 'Updated 09:42 UTC'. Financial amounts currency explicitly declared, consistent dates. White workspace surfaces divided by hairlines, tables and inspectors integrated, not nested floating rounded cards. Footer record count and pagination when appropriate. All totals and arithmetic must be coherent. Enterprise credibility through useful operational details, no competitor logos or invented compliance certifications.

## 01_executive_dashboard

Finance overview. Comfortable executive overview: action Review close. Summary strip: Revenue USD 4.82M, Operating cash flow USD 1.24M, EBITDA margin 28.4%, DSO 34 days, each comparison explicitly vs prior month. Main left large Revenue and operating expenses trend with two clean lines, Jan–Aug, USD millions axis and legend. Right exception worklist '3 need attention' with overdue receivables, unmatched transactions, journals awaiting approval; counts and Review links. Bottom left receivables aging HORIZONTAL bars, five labelled buckets; bottom right Month-end close progress '8 of 10 tasks complete', compact checklist and owner initials. Clear freshness and View source link.

Reference: ../finance/01_executive_dashboard.jpg.

## 02_general_ledger

General ledger. Ultra-compact data workspace, action New journal. Slim total debits USD 1,245,000.00 / total credits USD 1,245,000.00 / Difference USD 0.00 Balanced. Filter toolbar Journal entries, Status, Account, Search. Center journal table 10 realistic rows date, journal ID, memo, debit, credit, status; selected JE-2026-0842. Right 30% inspector: journal JE-2026-0842 'Monthly software accrual', lifecycle Draft > Review > Posted, Review active. Two lines Software expense debit 12,000.00 credit dash; Accrued liabilities debit dash credit 12,000.00. Balanced totals 12,000.00 each. Reference and audit timeline. Primary inspector action Review journal, no direct unsafe posting. Table footer compact density.

Reference: ../finance/02_general_ledger.jpg, plus 01_executive_dashboard.png for visual shell consistency.

## 03_accounts_receivable

Accounts receivable. Collections data workspace action New invoice. Summary outstanding USD 842,500.00 / Overdue USD 124,300.00 / Collected this month USD 530,200.00 / DSO 34 days. Thin aging band labelled Current, 1–30, 31–60, 61–90, 90+ with amounts. Invoice grid synthetic companies Northstar Labs, Atlas Works, Juniper Systems, Cobalt Supply. Columns Invoice, Customer, Due, Amount USD, Balance USD, Status; paid records always zero balance. Right selected invoice inspector with overdue invoice USD 18,400.00, aging 12 days, recent activity, promised payment date and Review follow-up button. No delete icons on posted invoices.

Reference: ../finance/03_accounts_receivable.jpg, plus 01_executive_dashboard.png for visual shell consistency.

## 04_accounts_payable

Accounts payable. Compact split review workspace action New bill. Summary open payables USD 418,900.00, Due this week USD 74,200.00, Discounts available USD 3,450.00. Filter chips All bills, Needs review 8, Approved 24. Bills table 8 rows with supplier, bill ID, due date, amount USD, matching, approval. Selected Atlas Components bill 4,900.00 Needs review. Right inspector 'Three-way match' shows Purchase order 4,900.00, Goods received 4,700.00, Supplier invoice 4,900.00, amber 'USD 200.00 receipt variance'; lifecycle Captured > Matched > Approved > Scheduled with Matched flagged. Small document thumbnail and link View invoice, specific review action Resolve variance. Do not show payable action enabled for unmatched bills.

Reference: ../finance/04_accounts_payable.jpg, plus 01_executive_dashboard.png for visual shell consistency.

## 05_banking_treasury

Banking & treasury. Operational reconciliation workspace action Import statement. Three restrained account summaries Operating USD 2,840,500.00, Payroll USD 650,200.00, Reserve USD 1,420,000.00, masked synthetic accounts, freshness labels (one 'Sync delayed'). Main reconciliation grid bank amount versus ledger amount, selected deposit 12,500.00 vs 12,500.00 Suggested match and matching reference. Exception fee row -85.00 vs dash Needs entry. Right matching inspector explicit Difference USD 0.00, 2 sources, Review match. Bottom 13-week cash forecast chart with solid actual and dotted forecast, uncertainty shaded pale blue, labelled USD M axes. Counts and no real bank logos.

Reference: ../finance/05_banking_treasury.jpg, plus 01_executive_dashboard.png for visual shell consistency.

## 06_fixed_assets

Fixed assets. Asset register data workspace action Register asset. Summary Cost USD 3,420,000.00, Accumulated depreciation USD 1,150,400.00, Net book value USD 2,269,600.00. Dense register realistic synthetic assets with ID, asset, location, acquisition date, cost USD, book value USD, method, status. Right selected asset 'CNC machining centre', asset FA-0042, cost 120,000.00, accumulated depreciation 36,000.00, book value 84,000.00. Straight-line 5 years, residual 0, monthly depreciation 2,000.00. Lifecycle Acquired > In service > Retired. Mini depreciation schedule and line chart, action Review depreciation run; no silent deletion.

Reference: ../finance/06_fixed_assets.jpg, plus 01_executive_dashboard.png for visual shell consistency.

## 07_tax_compliance

Tax & compliance. Operational filing workspace with clear 'Illustrative schedule' label; do not invent real tax rates or claim compliance certification. Action Prepare return. Summary Draft returns 6, Needs review 2, Ready for approval 4, Filed this period 8. Filing worklist jurisdiction, entity, reporting period Aug 2026, internal target date, owner initials, state. Jurisdictions US, UK, Germany, India but dates expressly internal targets, no legal claims. Right selected 'US sales tax return' inspector with Draft > Validated > Approved > Filed lifecycle, reconciliation checks Source transactions reconciled, Exceptions 2 open, Approval pending; action Review exceptions. Bottom evidence checklist and source history. Light amber exception strip; no large calendar decoration.

Reference: ../finance/07_tax_compliance.jpg, plus 01_executive_dashboard.png for visual shell consistency.

## 08_budget_planning

Budget & planning. PlanningWorkspace. Action Submit for review. Scenario segmented selector Base, Growth, Downside with Base active; FY 2026 Annual Plan / Working draft. Summary Budget USD 18.50M, Forecast USD 18.84M, Cost variance USD 0.34M / 1.8% unfavorable. Main spreadsheet matrix Department, FY budget, Forecast, Variance USD, Variance %. Rows Engineering 8,000,000 /8,200,000 /200,000 /2.5%; Sales 5,000,000 /5,100,000 /100,000 /2.0%; Operations 3,500,000 /3,550,000 /50,000 /1.4%; G&A 2,000,000 /1,990,000 /-10,000 /-0.5%. Totals consistent. Right driver inspector Revenue growth 8%, Headcount growth 3%, unit cost inflation 2%, numeric controls with tiny sliders. Bottom forecast comparison lines with actual solid / forecast dashed. Show unsaved draft boundary and small commentary count.

Reference: ../finance/08_budget_planning.jpg, plus 01_executive_dashboard.png for visual shell consistency.

## 09_financial_reports

Financial reports. Statement workspace action Export report, secondary Schedule. Scope August 2026 vs July 2026, USD, accrual. Main P&L statement hierarchical table columns Line item, Aug 2026, Jul 2026, Change; exact data Revenue 4,820,000 /4,600,000 /220,000; Cost of revenue 1,900,000 /1,850,000 /50,000; Gross profit 2,920,000 /2,750,000 /170,000; Operating expenses 1,550,000 /1,500,000 /50,000; EBITDA 1,370,000 /1,250,000 /120,000; Depreciation 120,000 /110,000 /10,000; Operating profit 1,250,000 /1,140,000 /110,000. Right Source & review inspector status Draft, source General ledger, updated timestamp, reviewer pending, source lineage GL > Consolidation > Statement, related reports Balance sheet, Cash flow. Table subtotal rules and strong spacing, no false GAAP certification.

Reference: ../finance/09_financial_reports.jpg, plus 01_executive_dashboard.png for visual shell consistency.

## 10_financial_settings

Finance settings. SettingsShell standard density, action Review changes. Within main content slim section nav Accounting, Fiscal periods, Currencies, Approvals, Tax policies, Audit history. Accounting active. Aligned label/control rows on white separator-led surface: Base currency USD / US Dollar locked after first posting; Fiscal year January–December; Posting precision 2 decimal places; Current period Aug 2026 Open; latest locked period Jul 2026. Approval controls Two-person journal approval Required with lock icon; Backdated posting Requires approval. Right policy context inspector Applies to Acme Corp / US Operations, last reviewed 01 Aug 2026, Policy owner Finance operations. Bottom sticky '2 unsaved changes' Discard and Review changes; concise impact note Changes require review before taking effect. No security weakening toggles or invented encryption badges.

Reference: ../finance/10_financial_settings.jpg, plus 01_executive_dashboard.png for visual shell consistency.

## Refinement prompts

03_accounts_receivable: Keep the design unchanged except these corrections: ONLY Receivables selected with solid cobalt background, Overview plain white inactive. Overdue total replace 124,300.00 with 159,950.00. Aging Current replace 682,150.00 with 682,550.00. Percentages Current 81.0%, 1–30 9.3%, 31–60 5.3%, 61–90 2.6%, 90+ 1.7%. Footer replace with 'Showing 1–8 of 24 invoices' and '8 / page'. Preserve everything else.

07_tax_compliance: Keep design unchanged except: source history SAP S/4HANA replace with UniERP general ledger. Add small subtitle 'Illustrative internal schedule' below Tax & compliance title. Evidence checklist summary replace '4 of 5 complete' with '3 of 5 complete'. Change top context US Operations to All entities to match multi-entity filing scope. Add Prepare return secondary button in page title area. Preserve all other design.

08_budget_planning: Keep design unchanged except sidebar: remove extra Budget & planning entry below Overview. Keep exactly this order: Overview, General ledger, Receivables, Payables, Banking, Fixed assets, Tax, Planning, Reports, Settings. Select ONLY Planning (between Tax and Reports) in solid cobalt. Preserve the matrix and all numbers. In bottom draft bar replace 'Auto-saved 2 minutes ago' with 'Last saved 2 minutes ago'. Preserve all other design.

