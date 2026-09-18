# Part I — Business, Market, Strategy, Business Model, Revenue and Pricing

Document ID PMS-VOL-001 · Version 0.1.0 · Updated 2026-09-14 · Status DRAFT.

Owner: Product Strategy and Commercial Governance; named accountable individuals TBD. Scope references: S04–S07, S11, S49–S53. This volume is a proposed business design except decisions already CONFIRMED in Volume 0. Financial examples are synthetic scenarios, not approved prices, forecasts or accounting advice. Engineering implementation remains unverified.

## 1.1 Vision, mission and product principles

### 1.1.1 Vision and mission

**PROPOSED vision:** An organization should be able to operate its business, adapt its software and understand its cost through one coherent, governed platform.

**PROPOSED mission:** Deliver reliable business transactions and accessible workflows across the six UniERP products, with transparent capacity economics, explicit data ownership and an extension ecosystem that preserves customer control.

The customer problem is fragmented execution: a sale, stock movement, invoice, payment, staffing decision and service obligation can reside in disconnected systems. The resulting manual reconciliation, identity duplication and unclear support ownership become business costs. This problem hypothesis requires customer interviews; it is not a claim about every prospective customer.

### 1.1.2 Principles and decision tests

| Principle | Product decision test | Rejection condition |
| --- | --- | --- |
| Correct business effects | Can each committed effect be explained and reconciled? | Posted money or stock silently changes |
| One authoritative owner | Can the team identify who owns each record and lifecycle? | Two modules independently mutate the same business truth |
| Organization control | Can the administrator see and revoke access, installations and spending authority? | Hidden grants, silent paid overage or irreversible installation |
| Participation without mandatory seat licensing | Can more people join without a compulsory core per-user charge? | Adding an employee automatically changes core subscription fees |
| Explicit capacity limits | Can customers forecast cost and see their remaining allowance? | A resource is marketed as unlimited while a hidden paid limit exists |
| Extensible without hidden privilege | Can a package operate with enumerated capabilities? | Unreviewed code receives host or provider authority |
| Evidence-backed claims | Is each public promise tied to a supported release and proof? | Feature count substitutes for a tested journey |
| Accessible operation | Can critical work be completed using keyboard and assistive technology? | A mouse-only or visually encoded state blocks business work |
| Recoverable change | Is failed execution visible and safely repairable? | Retry creates duplicate invoices, payments or stock effects |

### 1.1.3 Strategic objectives

| Goal ID | Goal | Proposed measure and acceptance | Owner |
| --- | --- | --- | --- |
| PMS-GOL-0001 | Reduce reconciliation work | Pilot comparison of documented baseline versus supported order-to-cash close; target 30% reduction in manual reconciliation hours, sample and period disclosed | Product/finance |
| PMS-GOL-0002 | Make organization spending predictable | Every invoiced charge traceable to accepted rate version, usage or fixed fee; no unconsented paid overage | Commercial |
| PMS-GOL-0003 | Enable safe adaptation | Each installed package has verified provenance, declared grants, compatibility and tested revocation | Developer/Marketplace |
| PMS-GOL-0004 | Shorten first supported value | Proposed pilot median under one business day from verified organization creation to a reconciled sample workflow, excluding customer data cleanup | Customer success |
| PMS-GOL-0005 | Preserve enterprise trust | No unresolved critical isolation, accounting correctness or recovery defect in release scope | Security/QA/SRE |

Targets are PROPOSED and must not appear as achieved marketing claims. Baselines, sample exclusions and failure outcomes remain visible.

### 1.1.4 Long-term strategy and moat

The proposed sequence is coherent core transactions, usable administration, dependable operations, then extension and industry breadth. A moat is not feature inventory. Candidate advantages are accumulated domain correctness tests, migration and reconciliation tooling, reusable governed contracts, customer-controlled extension portability, auditable usage economics and partner delivery expertise. Each must be demonstrated against the same customer workload and total-cost boundary as alternatives.

Industry packs extend owned domain models through explicit contracts. They cannot fork ledger correctness, authentication or tenant isolation. AI may assist discovery, extraction and suggestions; deterministic validation and authorized human or policy approval remain responsible for financial and operational effects.

## 1.2 Market definition and segmentation

### 1.2.1 Evidence boundaries

The World Bank describes SMEs as roughly 90% of businesses globally. OECD reports a 99% SME share in its area and provides size classifications. These are enterprise-population facts, not an ERP expenditure estimate. Different jurisdictions and datasets use different populations and definitions. [World Bank SME Finance](https://www.worldbank.org/ext/en/topic/competitiveness/small-and-medium-enterprises-smes-finance), [OECD SME indicators](https://www.oecd.org/en/topics/sme-indicators-benchmarking-and-monitoring.html), [OECD business-size indicator](https://www.oecd.org/en/data/indicators/enterprises-by-business-size.html). Accessed 2026-09-14.

Do not multiply a global business count by a single enterprise ERP price and label the result a validated TAM. Informal firms, sole traders, subsidiaries, inactive companies and overlapping commercial datasets require explicit handling.

### 1.2.2 Proposed customer segments

| Segment | Operational characteristic | Buyer / decision makers | Initial value hypothesis | Qualification boundary |
| --- | --- | --- | --- | --- |
| Small operating organization | Several connected workflows; spreadsheet or point-tool reconciliation | Founder, finance lead, operations lead | Unified transactions and simple administration | Must fit a supported legal/tax and operating model |
| Growing mid-market organization | Multiple teams, warehouses or legal entities | CFO, COO, IT leader, department heads | Controlled scale, consolidation and integration | Require demonstrable migration and reconciliation readiness |
| Enterprise division or subsidiary | Procurement, SSO, audit and integration obligations | CIO/CISO/CFO plus procurement | Governed deployment with bounded domain scope | No broad enterprise promise without supported controls |
| Developer or implementation partner | Repeated deployment and extension work | Practice lead, architect, publisher | Reusable packages, APIs and delivery evidence | Capability declaration, compatibility and support obligations |
| Existing suite customer adding a bounded workflow | Established systems of record | Domain owner and integration/security teams | Incremental value without replacing all systems | Contract owner and source-of-record mapping required |

Employee count is an analysis dimension, not a mandatory billing unit. A small organization may have high compute usage; a large one may have low activity per participant.

### 1.2.3 Geography and industry selection

**PROPOSED launch research priority:** English-language professional services and wholesale/distribution operating in one jurisdiction, with one billing currency per account. This is a testable sequencing proposal, not a confirmed launch commitment. India, the UK, the EU and North America are research candidates; deployment, taxation, payroll, residency and support obligations must be evaluated separately for each.

Manufacturing follows when MRP, costing, traceability and shop-floor recovery are proven. Healthcare, financial services, public sector and other regulated industry solutions remain gated by specific domain and compliance evidence. The fifteen industry modules in the application registry are investigation scope, not fifteen ready products.

### 1.2.4 TAM, SAM and SOM calculation specification

| Measure | Definition | Required inputs | Exclusions / controls |
| --- | --- | --- | --- |
| TAM | Annual addressable spend for the defined capability bundle across eligible organizations | Deduplicated business population by geography/size/industry; observed annual spend or validated willingness-to-pay ranges | No duplicate CRM/ERP/platform spend; distinguish software from services and GMV |
| SAM | Portion of TAM serviceable by supported geography, capabilities, language, residency and delivery model | Release scope, legal support matrix, customer requirements and delivery constraints | Unsupported payroll/tax/regulatory use cases excluded |
| SOM | Revenue realistically attainable within a dated operating plan | Qualified pipeline, win rate, deployment capacity, sales cycle, activation, retention and realized annual revenue | Capped by acquisition and implementation capacity; not an arbitrary TAM percentage |

`TAM = sum(eligible organizations in segment × annual spend attributable to the non-overlapping bundle)`.

`SAM = sum(TAM segment contribution × validated serviceable fraction)`.

`SOM customers = min(qualified opportunities × win rate × activation rate, delivery capacity)`; annualized run-rate revenue then uses segment-specific realized recurring revenue. Recognized revenue during a year also depends on activation date and contract delivery.

**Synthetic illustration:** 100,000 eligible organizations × USD 6,000 annual addressable spend = USD 600 million TAM. A 20% serviceable fraction gives USD 120 million SAM. A twelve-month plan of 2,000 qualified opportunities × 15% win rate × 80% activation yields 240 customers; if delivery capacity is 200, the capacity-limited result is 200 customers. At USD 6,000 annualized recurring spend, exit run rate is USD 1.2 million. These numbers are ASSUMPTIONS, not market findings. Actual TAM/SAM/SOM remain TBD under PMS-TBD-0003.

### 1.2.5 Research execution and acceptance

Research records capture source URL, retrieval date, original publication period, country definition, organization size basis, active/inactive status, sample bias and overlap treatment. Customer interviews capture current workflow, volumes, reconciliation time, cost baseline, migration blockers, buying authority, required controls and willingness to pay. Use anonymized findings in the PMS.

Research gate: strategy owner accepts a dated segment model with low/base/high inputs, sensitivity to price and win rate, geography-specific serviceability, delivery-capacity constraint and evidence for each non-synthetic input. No external market-size claim passes this gate while input evidence remains TBD.

## 1.3 Competitive architecture

### 1.3.1 Primary-source concept comparison

Sources accessed 2026-09-14. The observations below concern vendor-described concepts; no comparative performance, completeness or superiority is asserted. UniERP responses are PROPOSED inferences.

| Vendor | Observed concept | UniERP design implication / hypothesis | Primary source |
| --- | --- | --- | --- |
| SAP | Business applications accompanied by platform services and development tools | Separate customer packaging from engineering ownership; demonstrate business-process integration | [SAP products](https://www.sap.com/products.html) |
| Salesforce | Sales, service, marketing, integration and consumption-related products | Treat cross-product entitlements and consumption visibility as core experiences | [Salesforce pricing portfolio](https://www.salesforce.com/pricing) |
| Microsoft Dynamics 365 | Business Central presents per-user licensing editions | Test whether organization capacity pricing improves broad participation without losing cost control | [Business Central pricing](https://www.microsoft.com/en-us/dynamics-365/products/business-central/pricing) |
| Oracle | ERP spans finance, procurement, projects and related supply-chain products | Define shared party, legal-entity and financial boundaries early | [Oracle ERP](https://www.oracle.com/erp/) |
| NetSuite | Integrated accounting, orders, inventory and operations; platform/module/user license components | Make transaction-to-ledger reconciliation and total implementation cost explicit | [NetSuite ERP](https://www.netsuite.com/portal/products/erp.shtml) |
| ServiceNow | Service, asset, incident, integration and risk products | Specify operational work, escalation and evidence as first-class workflows | [ServiceNow products](https://www.servicenow.com/products-by-category.html) |
| Workday | HCM, talent, workforce and planning capabilities | Preserve effective-dated workforce semantics and restricted HR records | [Workday portfolio](https://www.workday.com/en-us/enterprise-resource-planning.html) |
| Zoho | Unified business-suite positioning | Evaluate unified administration and discovery rather than isolated app onboarding | [Zoho One](https://www.zoho.com/one/) |
| Odoo | Standard and Custom plans bundle applications | Distinguish packaged applications from customization/runtime entitlements | [Odoo pricing](https://www.odoo.com/pricing) |
| Atlassian | Project, knowledge and service collaboration products | Connect execution records, knowledge and service work without duplicating business truth | [Atlassian products](https://www.atlassian.com/software) |
| Shopify | Commerce plans expose checkout and POS-related capabilities | Treat checkout, tender, fulfillment and back-office reconciliation as one tested chain | [Shopify pricing](https://www.shopify.com/pricing) |
| HubSpot | Marketing and customer-facing product portfolio | Preserve consent, lead attribution and customer lifecycle handoffs | [HubSpot products](https://www.hubspot.com/products) |

### 1.3.2 Differentiation experiments

| Experiment | Same-workload comparison | Required evidence | Disqualifier |
| --- | --- | --- | --- |
| Order-to-cash continuity | Quote → approved order → reservation → dispatch → invoice → receipt → ledger | Per-step reconciliation and exception recovery; identical data volume | Comparing a mock UniERP path to a real competitor deployment |
| Cost predictability | Fixed participants with variable resource consumption; then growing participants with fixed workload | Full invoice model including hosting, add-ons, integrations, support and services | Omitting required components from either side |
| Extension portability | Build, export, re-import, upgrade and revoke one bounded extension | Source artifacts, compatibility tests, documented limits | Treating source export as proof of runtime equivalence |
| Administration clarity | Invite, grant, install, cap spend and revoke across product surfaces | Task success, errors, time and security negatives | Hidden provider authority or manually repaired failures |
| Migration trust | Import and reconcile a representative historical dataset | Dry-run errors, control totals, rollback/forward recovery | Counting imported rows without business reconciliation |

Competitive research refreshes before public use, material pricing decisions and annual planning. Marketing must cite supported evidence and identify comparison scope. Vendor list prices are not negotiated customer total cost.

## 1.4 Personas and buying process

| Persona | Primary job | Decision / access boundary | Success criterion |
| --- | --- | --- | --- |
| Economic buyer: CFO/founder | Approve economics and business outcome | Contract approval; no implicit system privilege | Reconciled value and predictable obligation |
| Executive sponsor: COO/CIO | Coordinate adoption and integrations | Cross-department governance | Supported process delivered with accountable owners |
| CISO/security reviewer | Assess controls and threat exposure | Evidence access, not tenant business mutation | Required controls proven for target deployment |
| Procurement/legal | Review terms, data processing and vendor commitments | Contract workflow | Clear obligations, exit and support terms |
| Organization owner | Establish account ownership and delegate administration | Tenant-scoped ownership and recovery | No orphaned account or hidden grants |
| Organization administrator | Manage users, apps, policy and integrations | OCC; explicit permissions | Auditable setup without provider operations |
| Department administrator | Configure bounded department workflows | Delegated record/domain scope | Correct local configuration without HR/finance escalation |
| Manager | Approve and monitor team work | Assigned approval scope; separation of duties | Timely decisions and traceable exceptions |
| Employee/business user | Perform assigned tasks | Least-privilege business role | Complete accessible workflow without duplicate entry |
| Finance user | Post, reconcile, close and report | Legal entity/ledger scope; maker/checker | Balanced and reproducible financial records |
| HR user | Maintain restricted workforce lifecycles | Field/record sensitivity and effective dates | Correct employee outcomes with minimized access |
| Sales user | Manage pipeline, quotes and customer handoffs | Account/territory and pricing limits | Accurate commitments and fulfillment visibility |
| Developer | Build and operate authorized extensions | Environment, capability and quota scope | Testable deployment and recoverable change |
| Publisher/partner | Deliver and support packages or implementations | Publisher organization and contractual obligations | Safe installation, compatible updates and settlement |
| Customer/supplier/external partner | Interact with permitted business records | Explicit external identity and record relationship | Complete portal action without wider tenant visibility |
| Provider operator | Operate platform and tenant lifecycle | PCC provider permissions | Recoverable operations and clear blast radius |
| Provider security team | Investigate and contain threats | Provider security scope; audited support process | Containment without uncontrolled data access |
| Provider finance | Bill and reconcile provider revenue | Provider commercial records | Accurate settlement and accounting export |
| Provider support | Diagnose customer issues | Time-, purpose- and target-bound access | Resolved issue with attributable access history |
| Marketplace reviewer | Assess package and publisher compliance | Review evidence and publication decision | Reproducible decision and revocation path |
| Provider super administrator | Exceptional provider administration | Controlled privileged workflow; no default business impersonation | Complete audited operation with separation of duties |

Personas do not themselves grant permissions. Full role/permission matrices are authored with the IAM and product functional volumes.

### 1.4.1 Self-service and enterprise buying journeys

Self-service: discover supported capability → estimate expected usage → verify identity → create organization/trial → complete guided supported workflow → review capacity/terms → purchase → activate paid entitlement → receive invoice and spending controls. Failure paths preserve the trial organization when payment fails, prevent duplicate purchases on retry and show unsupported geography before collecting unnecessary data.

Enterprise: qualify business problem → define bounded scope and system owners → security/legal assessment → representative proof of value → migration/reconciliation plan → commercial approval → signed order and implementation statement of work → controlled onboarding → acceptance and support handover. A contract cannot convert an unimplemented capability into a release-ready promise; unsupported obligations require delivery approval and dated scope.

## 1.5 Business Model Canvas

| Canvas element | Proposed operating model |
| --- | --- |
| Customer segments | Qualified operating organizations, enterprise divisions, developers and implementation partners |
| Value propositions | Connected and auditable business transactions, customer-controlled administration, capacity economics, governed customization |
| Channels | Marketing Site, product documentation, self-service trial, direct sales, implementation partners, Marketplace discovery |
| Customer relationships | Guided onboarding, transparent billing, support tiers, success reviews, developer support and documented exit |
| Revenue streams | Fixed capacity subscription, metered overage with consent, premium apps, add-ons, marketplace commission, support and services |
| Key activities | Domain engineering, secure operations, compatibility testing, migration, billing reconciliation, ecosystem review and support |
| Key resources | Owned contracts, domain models/tests, platform operations, design system, partner network and customer trust |
| Key partners | Infrastructure providers, identity/payment/tax/communication vendors, publishers, implementation and audit specialists |
| Cost structure | Compute/storage/network, external AI, operational staffing, support, payment costs, engineering, security/compliance and partner delivery |

### 1.5.1 Commercial offers and fulfillment boundaries

| Offer | Buyer obligation | UniERP obligation | Acceptance / recognition input |
| --- | --- | --- | --- |
| SaaS subscription | Pay fixed recurring capacity fee | Provide contracted supported service during term | Service period and availability evidence |
| Metered capacity | Authorize overage or buy prepaid balance | Measure and rate attributable resource usage | Immutable accepted usage, rate version and corrections |
| Premium application | Purchase separately disclosed entitlement | Provide named supported functionality | Activation and contracted delivery obligations |
| Marketplace package | Accept package license and requested grants | Govern acquisition/distribution and applicable platform obligations | Installation/license state; principal-versus-agent assessment |
| Support plan | Pay separately disclosed support fee | Provide stated channels/hours/response objectives | Support service period; no implied resolution guarantee |
| Implementation service | Approve scoped statement of work | Deliver specified migration/configuration/training | Milestone evidence and acceptance criteria |
| Enterprise agreement | Commit term, capacity and special requirements | Fulfill explicitly approved obligations | Signed order version, delivery schedule and exceptions |
| Partner delivery | Contract through declared channel | Define responsibility split and escalation | Customer acceptance and partner settlement evidence |

Professional services revenue is reported separately from recurring software revenue. Marketplace GMV is not automatically UniERP revenue. Premium support must not be used to withhold basic incident communication or statutory rights.

## 1.6 Revenue architecture

### 1.6.1 Commercial objects and ownership

Proposed commercial domain owns BillingAccount, OfferVersion, Subscription, EntitlementGrant, MeterDefinition, UsageFact, RatingRun, CreditLot, CreditReservation, Invoice, Payment, Adjustment and Settlement. These are conceptual candidates awaiting reconciliation with owning schemas, not instructions to create parallel tables. PCC manages provider commercial operations; OCC reads and administers its authorized billing account. IAM owns entitlement evaluation under the existing architecture; commercial subscription state supplies versioned inputs through contracts.

Organizations, tenants, legal entities, payer accounts and publisher accounts remain distinct concepts. A payer may pay for several authorized organizations only under an explicit relationship. Selecting a billing account in the client never establishes authority to view another organization.

### 1.6.2 Meter catalog and charge triggers

| Proposed meter | Base unit / aggregation | Charge trigger | Exclusions and correction rule |
| --- | --- | --- | --- |
| Application compute | Allocated vCPU-second and GiB-second, separately recorded | Execution interval attributable to customer workload | Provider health checks and infrastructure failure overhead excluded; no overlapping interval double count |
| Object storage | Byte-seconds integrated over period, displayed as GiB-month using stated period divisor | Customer-retained logical bytes by storage class | Replicas/backups included only if separately disclosed; deletion stops live storage accrual at effective deletion |
| Database capacity | Reserved capacity tier or explicit byte-seconds; chosen offer determines one method | Contracted reservation or measured footprint | Do not charge both for the same included capacity |
| Public API | Accepted billable request count, summed | Versioned business operation accepted for execution | Authentication failures, validation rejects, provider 5xx and idempotent replays excluded in proposed policy |
| Background work | Worker vCPU/GiB duration or named job unit | Actual attributable execution | Internal retries caused by provider failure excluded; customer-requested rerun separately identified |
| AI inference | Input, cached input and output tokens by model/rate version | Provider-confirmed usage for a completed or contractually billable attempt | No raw prompt content in billing facts; retry credits and partial cancellation policy explicit |
| GPU | GPU-type seconds by allocation policy | Reserved exclusive interval or metered shared allocation | Model startup charge only if disclosed; no mixing GPU types in one unit |
| Data transfer | Billable egress bytes by destination class | Measured outbound transfer | Ingress and internal replication excluded in proposed policy; region-specific rate version |
| Premium application | Application-period quantity | Entitlement starts for contracted period | No hidden user multiplier |
| Support | Plan-period quantity | Contracted support service starts | Incident count is not an implicit usage charge |
| Services | Accepted milestone or approved time quantity | Contracted acceptance trigger | Travel/taxes/pass-through expenses separately disclosed |

Every meter records unit scale, aggregation, rounding, inclusion rules, tenant/billing-account derivation, producer identity, event time, receipt time, unique source operation, correction link and rate dimensions. Monetary calculations use decimal amounts and currency. Technical quantity precision and invoice rounding are separate.

### 1.6.3 Offer and rate versioning

An offer specifies fixed fee, included capacity per meter, eligible credit types, overage rate, caps, trial rules, tax treatment inputs, billing cadence, support tier, premium entitlements and geographic availability. Offer versions are immutable after activation. A subscription binds the accepted version and effective date; a later catalog change cannot silently reprice historical usage.

Mid-period upgrades require a preview with effective time, unused allowance treatment and any prorated fee. Proposed default: immediate additive capacity after payment/credit approval, downgrades at the next period boundary, no retroactive usage repricing. Enterprise exceptions are explicit contract versions. A downgrade below retained storage shows a remediation window and prevents new allocations rather than deleting data.

### 1.6.4 Rating algorithm

1. Resolve authenticated producer and canonical billing account from the usage owner.
2. Deduplicate by producer + source operation + meter + interval/version; conflicting payloads quarantine for reconciliation.
3. Validate event time, unit, nonnegative raw quantity and dimension cardinality. Corrections are linked adjustment facts, not edits to accepted facts.
4. Select subscription and immutable rate version effective for event time. Unknown mapping is unrated, never silently free or billed at a guessed rate.
5. Aggregate compatible quantities by account, meter, rate version and period; preserve lineage to usage facts.
6. Apply included units once, then explicitly ordered eligible credit lots, then consented overage. Do not spend the same credit twice.
7. Apply eligible discounts in the disclosed order, then tax calculation using approved jurisdictional rules.
8. Round at the configured invoice-line boundary; retain precise quantities, rates and rounding deltas.
9. Produce reproducible draft lines with rating-run ID and input watermark. Re-running the same frozen inputs yields identical results.
10. Reconcile aggregates and missing intervals before finalization. Late valid usage becomes a transparent adjustment under the contract's cutoff policy.

The meter-versus-aggregation separation and idempotent reporting are established industry patterns; UniERP's exact policy above is proposed and provider-neutral. [Stripe usage billing model](https://docs.stripe.com/billing/subscriptions/usage-based/how-it-works), [Stripe usage recording](https://docs.stripe.com/billing/subscriptions/usage-based/recording-usage-api?locale=en-GB).

### 1.6.5 Prepaid balances and spending controls

Prepaid money is not indistinguishable from promotional capacity. Each credit lot records currency or meter-unit denomination, purchased/promotional type, grant source, eligible meters, effective/expiry times, refundability and original liability reference. Display purchased and promotional balances separately. Expiration, transferability and rollover require contract disclosure and legal review.

Before a bounded costly operation, atomically reserve the maximum authorized cost or quantity against available balance/cap. Available = granted minus settled minus active reservations minus expired/reversed amounts. On completion settle actual eligible consumption and release the remainder. A timeout keeps an unknown-outcome reservation until reconciliation establishes whether work ran; expiry alone must not allow free duplicate execution. Insufficient balance prevents new discretionary work, while billing views, support, data export and recovery paths remain available according to policy.

Hard cap and soft warning are distinct. Proposed warnings occur at 50%, 80% and 100% of period budget, once per threshold/version; they do not authorize overage. Raising a cap requires an authorized billing actor and an audited confirmation. No UI warning is a substitute for server-side reservation.

### 1.6.6 Discounts, coupons and trials

Discount records specify eligible accounts/offers/meters, amount or percentage, currency where monetary, start/end, redemption limit, per-account limit, stacking priority and approval source. Atomic redemption prevents concurrent limit overshoot. Do not combine discounts unless the offer explicitly defines order and maximum reduction. Historical invoices retain applied discount version.

Proposed trial: time-bounded capacity with no automatic paid conversion absent explicit purchase authorization. Trial duration, units and card requirement remain commercial configuration. Trial abuse controls evaluate verified account/domain and rate limits without exposing other organizations. Expiry blocks new paid resource allocation, shows export/upgrade options and applies disclosed retention. No silent deletion at trial expiry.

### 1.6.7 Invoicing, payments, refunds and dunning

Draft invoice → validated → finalized → open → partially paid/paid/voided or credited follows immutable accounting references. Finalized monetary lines are corrected with linked credit/debit documents, not overwritten. Invoice numbering, mandatory fields, tax IDs and e-invoice requirements are jurisdiction-specific decisions. Payment tokens are provider references; raw card data is outside the proposed UniERP application boundary.

Payment initiation creates one attempt with idempotency and expected amount/currency. A browser redirect cannot mark payment paid. Verified provider notification plus server reconciliation establishes settlement. Duplicate or reordered callbacks are deduplicated and state-monotonic; inconsistent amounts quarantine for finance review. A timeout shows pending verification and reuses the attempt, not a fresh charge.

Refunds reference original settled payment and available refundable amount, account for prior refunds/disputes, require approval according to amount/risk and remain pending until provider confirmation. Marketplace payout recovery is separate from the customer refund. Failed recovery does not rewrite the refund obligation.

Proposed dunning states: current → past due → grace → restricted → suspended → recovered or cancelled. Schedules, notice periods and remedies are contract/jurisdiction configuration. Payment failure alone does not authorize data deletion. Recovery recomputes entitlements from settled obligations and clears only the restrictions attributable to that debt. Security suspension remains independent.

### 1.6.8 Marketplace commissions and settlement

Define merchant of record, invoicing party, tax obligations, refund responsibility, chargeback liability and principal/agent treatment before a paid listing is enabled. Commission percentage, minimum fee, payout schedule, reserve and currencies remain TBD. Each settlement statement links gross customer consideration, taxes, refunds, processor fees, commission, reserve changes and publisher payable. Total statement components must reconcile.

Package installation and purchase are distinct lifecycles: payment does not prove install success, and uninstall does not automatically cancel a recurring license. Show both states and explicit cancellation/refund choices. A failed install triggers retry or support/refund policy without duplicating purchase.

### 1.6.9 Revenue recognition and accounting interface

IFRS 15 uses a contract/performance-obligation model, including transaction-price allocation and recognition when obligations are satisfied. This supports the need to distinguish invoicing, cash collection, prepaid balances and earned revenue. [IFRS 15 overview](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/). Applicable accounting policy, tax rules and marketplace principal/agent conclusions require qualified finance approval.

The proposed accounting export carries contract version, performance-obligation reference, service period, invoice/credit reference, currency, consideration, recognized/deferred amounts and reconciliation identifiers. Fixed SaaS service, usage, implementation milestones, support and marketplace commission must be separable. Export retries are idempotent; ledger postings are reversed/amended rather than deleted. UniERP customer ERP accounting and UniERP provider revenue accounting remain different ledgers and authority scopes.

## 1.7 Pricing architecture and synthetic examples

### 1.7.1 Proposed packaging

| Offer family | Core charging structure | Capacity/control boundary | Unapproved decisions |
| --- | --- | --- | --- |
| Trial | Time-bounded free included capacity | Small fixed allowance, no implicit overage | Duration, limits, card requirement |
| Operating | Monthly fixed fee with meter-specific included quantities | Explicit hard cap or opted-in overage | Price, included quantities, eligible apps |
| Scale | Larger prepaid capacity plus disclosed overage | Budgets, alerts and capacity visibility | Volume discounts and support tier |
| Enterprise | Negotiated committed capacity and approved obligations | Contract-specific residency, isolation and support | Dedicated deployment cost, term and commitments |

No family implies unlimited compute/storage or mandatory per-user charges. Users still face security, concurrency and resource quotas. Dedicated infrastructure and premium services are separately priced where applicable; no enterprise exception may weaken isolation or audit.

### 1.7.2 Worked invoice scenario

All amounts below are synthetic USD amounts; zero tax is an arithmetic assumption, not a tax conclusion. Fee USD 100 includes 1,000,000 accepted API requests and 20 GiB-month storage. The month uses 1,400,000 accepted requests and 30 GiB-month. Overage rates are USD 0.00002/request and USD 0.10/GiB-month. A separately eligible AI charge is USD 12. Promotional credits of USD 5 apply only to usage, after included units; no other discounts.

| Line | Calculation | Amount |
| --- | --- | --- |
| Fixed fee | 1 × 100.00 | 100.00 |
| API overage | 400,000 × 0.00002 | 8.00 |
| Storage overage | 10 × 0.10 | 1.00 |
| AI usage | Eligible rated usage | 12.00 |
| Promotional usage credit | min(5.00, 21.00 eligible usage) | -5.00 |
| Subtotal | 100 + 8 + 1 + 12 - 5 | 116.00 |
| Tax | Synthetic zero-tax assumption | 0.00 |
| Amount due | Subtotal + tax | 116.00 |

If API usage contains 50,000 repeated deliveries of already accepted operation IDs, the rated quantity remains 1,400,000, not 1,450,000. If 100,000 previously accepted billable requests are later credited, the usage adjustment is USD 2 at the original rate; the finalized original invoice remains unchanged.

### 1.7.3 Unit economics scenario

Synthetic monthly recurring customer revenue USD 116; direct infrastructure USD 15, AI vendor cost USD 6, support allocation USD 10 and payment processing USD 3.48. Direct service cost is USD 34.48; gross profit USD 81.52; gross margin 70.2759%, displayed 70.28%. Definitions must be applied consistently across cohorts.

If acquisition cost is USD 600, gross-profit CAC payback is 600 / 81.52 = 7.36 months at steady state. A simplified lifetime estimate at 2% monthly churn gives 81.52 / 0.02 = USD 4,076 gross-profit LTV. This approximation ignores changing margins, expansion, discounting and cohort differences; use cohort cash-flow models for decisions, not this illustration alone.

### 1.7.4 SaaS and marketplace KPI definitions

| KPI ID | Measure | Formula / window | Exclusions / control |
| --- | --- | --- | --- |
| PMS-KPI-SHARED-000001 | Contracted MRR | Monthly normalized active recurring commitments at period end | Exclude tax, one-time services, uncommitted usage and GMV |
| PMS-KPI-SHARED-000002 | Usage revenue | Earned metered revenue for service period | Show credits/corrections and preliminary/final state |
| PMS-KPI-SHARED-000003 | ARR | 12 × contracted MRR | Label usage run rate separately |
| PMS-KPI-SHARED-000004 | Logo churn | Lost starting-period customers / starting customers | Define churn effective date; exclude duplicate account merges |
| PMS-KPI-SHARED-000005 | NRR | (Starting cohort recurring revenue + expansion - contraction - churn) / starting cohort revenue | Exclude new customers; use consistent currency policy |
| PMS-KPI-SHARED-000006 | GRR | (Starting cohort revenue - contraction - churn) / starting cohort revenue | Exclude expansion |
| PMS-KPI-SHARED-000007 | CAC | Attributable acquisition sales/marketing spend / new activated paid customers | Separate channels and disclose allocation method |
| PMS-KPI-SHARED-000008 | Gross margin | (Recognized revenue - defined direct service costs) / recognized revenue | Exclude marketplace GMV unless policy establishes principal revenue |
| PMS-KPI-SHARED-000009 | Activation rate | Eligible created organizations completing first supported workflow / eligible created organizations | Fixed cohort and activation window; failures retained |
| PMS-KPI-SHARED-000010 | Marketplace take rate | Recognized commission / eligible settled GMV | State refunds/tax exclusions and gross/net basis |
| PMS-KPI-SHARED-000011 | Billing dispute rate | Disputed finalized invoices / finalized invoices in cohort | Track amount-weighted measure separately |
| PMS-KPI-SHARED-000012 | Bill-to-meter reconciliation | Rated usage with complete fact lineage / total rated usage | Target 100%; missing lineage blocks finalization |

Division by zero yields N/A with reason, not zero or infinity. Revenue metrics use one reporting currency with documented FX policy and preserve source currencies. Cohort definitions are versioned. Privacy-safe aggregated metrics avoid exposing individual employee activity to unauthorized roles.

## 1.8 Commercial requirements and proof

| Requirement ID | Obligation | Goal | Acceptance / test ID | Proposed release |
| --- | --- | --- | --- | --- |
| PMS-REQ-BUS-SHARED-000001 | Customer invoice charges have explainable contract and usage lineage | PMS-GOL-0002 | Reproduce every line from frozen inputs; PMS-TST-SHARED-000005 | Foundation |
| PMS-REQ-BUS-SHARED-000002 | Core participation is not subject to mandatory per-user licensing | PMS-GOL-0002 | Increase authorized participant count at fixed usage without a core seat fee; PMS-TST-SHARED-000006 | MVP |
| PMS-REQ-FUN-PCC-000001 | Rate accepted usage once using its effective offer version | PMS-GOL-0002 | Duplicate, late and reordered facts preserve expected total; PMS-TST-PCC-000001 | Foundation |
| PMS-REQ-FUN-OCC-000001 | Customer controls paid overage and sees included, reserved and available capacity | PMS-GOL-0002 | Concurrent reservations cannot exceed authorized limit; PMS-TST-OCC-000001 | MVP |
| PMS-REQ-FUN-PCC-000002 | Finalized invoices are corrected by linked adjustments | PMS-GOL-0001 | Original lines remain immutable after correction; PMS-TST-PCC-000002 | MVP |
| PMS-REQ-SEC-SHARED-000001 | Billing authority is checked independently of client account selection | PMS-GOL-0005 | Wrong-tenant and no-context reads/mutations denied; PMS-TST-SHARED-000007 | Foundation |
| PMS-REQ-OPS-SHARED-000002 | Payment uncertainty is reconciled before another charge | PMS-GOL-0005 | Lost callback then retry yields one charge; PMS-TST-SHARED-000008 | MVP |
| PMS-REQ-REG-SHARED-000001 | Jurisdiction/accounting decisions precede commercial activation | PMS-GOL-0005 | Unsupported jurisdiction cannot enable paid checkout; PMS-TST-SHARED-000009 | MVP |

These requirements are PROPOSED except the explicit pricing preference and existing inherited invariants. Test IDs here reserve scenarios; no runtime test has run. Detailed screen/API/event/entity links are pending the PCC/OCC commercial functional chapters and architecture reconciliation. The requirements cannot be marked implementation-ready until those edges are completed.

## 1.9 Decisions, risks and continuation

| ID | Type | Decision / open item | Owner / gate |
| --- | --- | --- | --- |
| PMS-ASM-0003 | ASSUMPTION | One billing currency per account in initial commercial design | Finance / before contract finalization |
| PMS-ASM-0004 | ASSUMPTION | Numerical market, price and unit-economics examples are synthetic only | Strategy/finance / any public use |
| PMS-DEC-0006 | PROPOSED | Immediate additive upgrades; downgrades at period boundary | Commercial / offer design |
| PMS-DEC-0007 | PROPOSED | No automatic paid conversion without purchase authorization | Commercial/legal / trial design |
| PMS-TBD-0008 | TBD | Merchant of record, commission, payout and reserve policy | Marketplace/legal/finance / paid listings |
| PMS-TBD-0009 | TBD | Offer amounts, discounts, credit expiry/rollover, dunning schedule and tax provider | Commercial/legal / checkout activation |
| PMS-TBD-0010 | TBD | Domain/schema mapping for billing objects and permission names | Architecture / PCC commercial functional chapter |

Primary risks: overlapping market populations, unsupported differentiation, cost overruns under uncapped usage, double billing, credit overspend, accounting treatment errors and marketplace settlement liability. Mitigations are sourced segment models, benchmark parity, server-side reservations, immutable usage/corrections, reconciliation gates and finance/legal ownership. If these controls are unavailable, suspend the affected paid offer rather than guess a charge or erase customer data.

Next sequential volume: **Volume 2 — Global Product and Functional Architecture**. Preserve these requirements and KPI IDs; fill their architecture and detailed functional traceability in the owning volumes. Volume 1 is an authored proposed baseline, not owner-approved commercial policy.
