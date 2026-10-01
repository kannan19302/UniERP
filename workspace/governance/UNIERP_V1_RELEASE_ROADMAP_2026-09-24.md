# UniERP v1 release roadmap

Status: PROPOSED; execution and production remain gated.
Planning date: 2026-09-24. Target availability: 2027-01-01.
Owners: Product, Architecture, Security, Data, QA and Operations.
This time-bound plan does not override the [product PRD](../../docs/product/PRD.md),
[ADR-0012](../../docs/adr/ADR-0012-polyrepo-consolidation-to-14-core-roots.md),
the [foundation plan](UNIERP_FOUNDATION_REMEDIATION_PLAN.md), or owning
platform requirements.

## Customer outcome and scope

Ship three connected customer products:
1. **Business Suite:** one selected industry's complete sales, purchasing,
   inventory, finance and reporting journeys in a single tenant.
2. **Tenant Admin:** organization setup, users, roles, policies, entitled
   applications, integrations and tenant audit without provider intervention.
3. **Developer Platform:** versioned API and SDK discovery, scoped credential
   lifecycle, one supported external integration and actionable diagnostics.
   Extension publishing or marketplace promises require separate lifecycle proof.

Two internal products are release dependencies:
- **Provider Admin:** provision, suspend, restore, observe and support tenants
  under provider-only authority and durable audit.
- **Marketing Site:** explain verified customer outcomes, capture consented
  interest, and pass campaign intent into usable registration and onboarding.

Finance v1 is the connected spine: chart of accounts and periods -> journal
approval/posting -> receivables and collection -> payables and payment ->
cash/bank reconciliation -> trial balance and close -> correction or reversal.
Sales, purchasing, stock and selected industry effects must reconcile to it.
Advanced Finance breadth is included only by an explicit scope decision and
end-to-end qualification. Visible modules are not release commitments.

## Industry selection

Run discovery campaigns for wholesale/distribution, professional services,
light manufacturing, field service/specialty contracting and multi-location
retail. Rank real buyers by recurring loss, current workaround, buying intent,
core reuse, migration effort and jurisdiction/integration burden. Select one
lead industry by the scope gate; add a second to v1 only if capacity and
customer acceptance permit. A campaign may gather interest before product
qualification, but must not describe an unqualified industry as available.

A released industry must work from configuration and data import through
the actual transaction, approval/exception, invoice/payment, finance posting,
reporting, reconciliation, recovery and support. Measure time to first value,
onboarding effort, support cost and willingness to pay with real design partners.

## Schedule and decisions

| Date | Work | Exit |
| --- | --- | --- |
| Sep 24-Oct 4 | Name owners and capacity; refresh exact-build baseline; customer interviews; choose geography, industry and v1 journeys; agree shared design/navigation anatomy. | G0: feasible scoped release contract. |
| Oct 5-18 | Close required P0 and P1 foundation work: IAM, RLS, authorization, audit/outbox, contracts, data, CI, test environment and UI baseline. | G1/G2: documented continuation decision; no broad expansion before it. |
| Oct 19-Nov 15 | Build complete journeys in dependency order; keep design system one increment ahead; weekly integrated customer demos across all five surfaces. | G3: integrated internal candidate. |
| Nov 16-29 | Restricted-role and cross-tenant tests, accounting/stock reconciliation, accessibility, load, security, migrations, restore and rollback rehearsals. | G4: pilot admission. |
| Nov 30-Dec 13 | Customer pilot, import and training rehearsal, UAT, support practice, defect closure and measured first value. | G5: exact-build release dossier and owner sign-off. |
| Dec 14-31 | Contingency, evidence refresh after fixes, staffed operations and final launch decision. | Explicit GO/NO-GO and production action authorization. |
| Jan 1 | Controlled public availability only if gates and staffing hold. | Monitor technical health and business reconciliation; abort owner on duty. |

A failed gate moves dependent work and the forecast. It never reduces tenant,
security, money, audit, accessibility or recovery proof to protect the date.

## Agent execution law

Each packet starts with a named customer problem, actor, measurable outcome,
owner, numbered acceptance criteria, scope, dependencies and knowledge delta.
Work follows owning requirement and L0 contract -> L2 data -> L3 service/IAM ->
L1 shared UI validation -> L4 product consumer -> L5 client if included ->
L7 operational proof. Shared UI may be developed in parallel only when its
contract and independent ownership are clear. Provider and tenant authority
never cross; UI visibility never substitutes for server policy.

The workspace [AGENTS.md](../../../AGENTS.md) and the one AGENTS.md at each of
the 14 active Git roots contain mandatory agent and coding rules. The
[documentation index](../../docs/README.md) routes PRD, architecture, contracts,
standards and evidence to their one accountable source. Historical Markdown is
non-authoritative. Code, route counts, generated scores and successful demos
do not prove a release. Every packet ends with exact checks, diff review,
knowledge update and truthful designed/implemented/tested/integrated/deployed/
released status.

## Release gate

Production is NO-GO until all committed journeys pass representative
customer UAT, two-tenant and restricted-role negatives, finance/stock
reconciliation, migration and rollback, accessibility, security, load,
observability and restore evidence on the exact immutable candidate. Product,
Architecture, Security, Data, QA and Operations approve the dossier; the
human authorizes the exact production action and target separately.
