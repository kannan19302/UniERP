# Information Architecture and Sidebar/Tab Hierarchy  
## ERP SaaS Platform Console (unierp-console)  
  
> **The complete navigation model for the provider control plane.** One file. Amended, never replaced.  
> Established 2026-08-09 ú Read \README.md  0\ before editing.  
  
--- 
 

## 1. Sidebar Structure (14 Items, Fixed)

The Platform Console sidebar contains exactly **14 top-level navigation items**. This number is invariant -- no additional items may be added. Each item maps to a distinct domain of control-plane responsibility derived from Track C phases. Items are ordered by operational frequency and dependency: daily operations first, commercial operations second, support and platform administration third, security last.

| Order | Sidebar Item | Icon Suggestion (Lucide) | Route Prefix | Track C Coverage | Primary Audience |
|-------|--------------|--------------------------|--------------|------------------|------------------|
| 1 | **Dashboard** | LayoutDashboard | /dashboard | C05 | SRE, Platform Admin |
| 2 | **Tenants** | Users | /tenants | C06-C12 | Support L1/L2, Billing, SRE |
| 3 | **Plans & Pricing** | Tag | /plans | C13 | Product, Billing |
| 4 | **Metering & Usage** | Activity | /metering | C14 | Billing, Finance, Product |
| 5 | **Subscriptions** | CreditCard | /subscriptions | C15 | Billing, Sales, Support |
| 6 | **Invoicing & Billing** | FileText | /invoicing | C16 | Finance, Billing |
| 7 | **Dunning & Collections** | AlertTriangle | /dunning | C17 | Finance, Collections |
| 8 | **Quotas & Limits** | Gauge | /quotas | C18 | SRE, Product, Support |
| 9 | **Resellers & Partners** | Handshake | /resellers | C19 | Channel, Sales |
| 10 | **Support** | LifeBuoy | /support | C20 | Support L1/L2/L3 |
| 11 | **Communications** | Megaphone | /communications | C21 | Marketing, SRE, Support |
| 12 | **Migration & Data** | Database | /migration | C22-C24 | SRE, Data Engineering |
| 13 | **Platform Administration** | Settings | /platform | C25-C29 | Platform Admin, Release Manager |
| 14 | **Security** | Shield | /security | C28 | Security, SRE, Compliance |

### Sidebar Behaviour Rules

1. **Collapsible** -- Expanded (260px) and collapsed (64px) states; preference persisted per user.
2. **Pinned Favourites** -- Users may pin up to 5 items to a " Pinned\ section above the main list.
3. **Permission-Aware** -- Items for which the user holds **zero** platform.* permissions are **absent**, not disabled.
4. **Group Dividers** -- Visual separators between groups: *Operations* (1-2), *Commercial* (3-9), *Support & Platform* (10-13), *Security* (14).
5. **Badge Indicators** -- Real-time counts on Tenants (suspended), Support (open tickets), Security (active alerts), Quotas (tenants near limit).
6. **Keyboard Navigation** -- Up/Down to traverse, Right to expand sub-menu, Enter to navigate, Esc to collapse.

---
## 2. Complete Tab Hierarchy for Each Sidebar Item

### 2.1 Dashboard (/dashboard)
**Primary Tabs** (contextual tabs, always visible):
| Tab | Route | View Types | Description |
|-----|-------|------------|-------------|
| **Overview** | /dashboard | List (KPI cards), Detail (drill-down) | Platform health: SLO status, error budgets, active tenants, revenue MRR, queue depths |
| **Tenants** | /dashboard/tenants | List (tenant health cards), Detail | Per-tenant SLO, error rate, queue lag, migration status, last activity |
| **Infrastructure** | /dashboard/infrastructure | List (cluster nodes), Detail | Node health, capacity, replication lag, backup status |
| **Alerts** | /dashboard/alerts | List (alert feed), Detail, Action (acknowledge, silence) | Active alerts across all tenants, grouped by severity |

**Secondary Tabs** (on Detail views):
- Tenant Detail > **Health**, **Usage**, **Billing**, **Migrations**, **Audit**
- Cluster Node Detail > **Metrics**, **Pods**, **Logs**, **Events**

**Navigation Patterns:**
- Command Palette: \u2318K > " Dashboard: Tenant Health\, \Dashboard: Infrastructure\
- Deep links: /dashboard/tenants/{tenantId}?tab=health
- Breadcrumbs: Dashboard / Tenants / acme-corp / Health

### 2.2 Tenants (/tenants)
**Primary Tabs** (contextual tabs):
| Tab | Route | View Types | Description |
|-----|-------|------------|-------------|
| **Directory** | /tenants | List (searchable, filterable), Create, Action (bulk) | All tenants with plan, status, region, health, MRR, user count |
| **Lifecycle** | /tenants/lifecycle | List (transition queue), Action (provision, activate, suspend, archive, delete) | Pending/active transitions with approval status |
| **Impersonation** | /tenants/impersonation | List (active sessions), Detail, Action (revoke) | Active impersonation sessions with consent status, expiry |
| **Audit Trail** | /tenants/audit | List (provider view), Detail, Export | Cross-tenant audit search with justification logging |

**Secondary Tabs** (on Tenant Detail \u2014 accessed from Directory row click):
| Sub-tab | Route | View Types | Description |
|---------|-------|------------|-------------|
| **Overview** | /tenants/{id} | Detail | Plan, usage, health, region, contract, lifecycle state |
| **Users** | /tenants/{id}/users | List, Create, Edit, Action (invite, suspend, transfer) | Tenant users with roles, status, last login |
| **Apps** | /tenants/{id}/apps | List, Action (enable, disable, configure) | Installed modules with entitlements and feature flags |
| **Usage** | /tenants/{id}/usage | List (metered dimensions), Detail (event drill-down) | Per-dimension usage with reconciliation view |
| **Billing** | /tenants/{id}/billing | List (invoices), Detail, Action (credit note, adjust) | Subscription, invoices, payments, dunning status |
| **Migrations** | /tenants/{id}/migrations | List, Detail, Action (rehearse, cutover, rollback) | Migration history and in-progress operations |
| **Configuration** | /tenants/{id}/config | List (feature flags), Edit, Action (override, expire) | Per-tenant flags, entitlements, limits, overrides |
| **Audit** | /tenants/{id}/audit | List, Detail, Export | Tenant-scoped audit trail (provider view) |
| **Support** | /tenants/{id}/support | List (tickets), Detail, Action (escalate, replay) | Support tickets, session replays, known-issue matches |

**View Types per Tab:**
- **Directory**: List (server-paginated, filterable, sortable), Create (provision wizard), Bulk Actions (suspend, activate, export)
- **Lifecycle**: List (transition queue with status), Action (execute transition with approval)
- **Impersonation**: List (active sessions), Action (revoke session), Detail (session transcript)
- **Audit Trail**: List (cross-tenant search results), Detail (record), Export (CSV/JSON)

**Navigation Patterns:**
- Contextual tabs at top of Tenant Detail (Overview | Users | Apps | Usage | Billing | Migrations | Config | Audit | Support)
- Drawer for quick actions (impersonate, suspend, view invoice) from Directory row
- Modal for provisioning wizard (multi-step), confirmation dialogs (destructive actions)
- Command Palette: \u2318K > " Tenant: acme-corp\, \Tenant: Provision New\
- Deep linking: /tenants/{id}/billing?status=overdue&tab=invoices
- Breadcrumbs: Tenants / acme-corp / Billing / INV-2026-0142

### 2.3 Plans & Pricing (/plans)
**Primary Tabs:**
| Tab | Route | View Types | Description |
|-----|-------|------------|-------------|
| **Plans** | /plans | List, Create, Edit, Detail, Action (archive, duplicate) | Plan definitions with feature matrices, entitlements, versioning |
| **Price Books** | /plans/price-books | List, Create, Edit, Detail | Price books per currency/region with versioning and grandfathering |
| **Entitlements** | /plans/entitlements | List, Edit | Feature-to-plan mapping, limit definitions, metered dimensions |
| **Versions** | /plans/versions | List, Detail, Action (promote, deprecate) | Plan version history with migration impact analysis |

**Secondary Tabs** (on Plan Detail):
- **Features** \u2014 Feature matrix with toggle grid
- **Pricing** \u2014 Price book assignments per currency
- **Limits** \u2014 Quota definitions (users, storage, API calls, custom)
- **Subscriptions** \u2014 Active subscriptions on this plan (read-only link to Subscriptions)
- **History** \u2014 Version changelog with grandfathering rules

**Navigation Patterns:**
- Drawer for plan creation/edit (multi-section form)
- Modal for price book currency/region matrix
- Command Palette: \u2318K > " Plan: Enterprise\, \Plan: Create New\
- Deep links: /plans/{planId}?tab=features

### 2.4 Metering & Usage (/metering)
**Primary Tabs:**
| Tab | Route | View Types | Description |
|-----|-------|------------|-------------|
| **Explorer** | /metering | List (tenant x dimension matrix), Detail (event drill-down), Export | Per-tenant usage by metered dimension with reconciliation |
| **Reconciliation** | /metering/reconciliation | List (discrepancies), Detail, Action (investigate, resolve) | Invoiced vs. metered quantities, double-counting detection |
| **Dimensions** | /metering/dimensions | List, Create, Edit, Detail | Metered dimension definitions, aggregation rules, retention |
| **Events** | /metering/events | List (raw events), Detail, Export | Raw metering events with search, filter, replay capability |

**Secondary Tabs** (on Tenant Usage Detail):
- **Summary** \u2014 Aggregated usage across dimensions
- **Events** \u2014 Raw event stream with pagination
- **Invoices** \u2014 Linked invoice lines (cross-reference to Invoicing)
- **Anomalies** \u2014 Flagged unusual patterns (AI-detected)

**Navigation Patterns:**
- Inline detail drawer for event drill-down (preserves list context)
- Command Palette: \u2318K > " Metering: acme-corp API calls\, \Metering: Reconcile August\
- Deep links: /metering/explorer?tenant=acme-corp&dimension=api_calls&period=2026-08

### 2.5 Subscriptions (/subscriptions)
**Primary Tabs:**
| Tab | Route | View Types | Description |
|-----|-------|------------|-------------|
| **Active** | /subscriptions | List, Detail, Action (upgrade, downgrade, pause, cancel, prorate) | All active subscriptions with plan, status, billing cycle, MRR |
| **Trials** | /subscriptions/trials | List, Detail, Action (convert, extend, cancel) | Trial subscriptions with conversion tracking |
| **Churned** | /subscriptions/churned | List, Detail, Action (win-back, analyze) | Cancelled/expired subscriptions with churn reason |
| **Transitions** | /subscriptions/transitions | List (pending), Detail, Action (execute, approve) | Pending plan changes, prorations, mid-cycle adjustments |

**Secondary Tabs** (on Subscription Detail):
- **Overview** \u2014 Plan, status, dates, MRR, payment method
- **Billing** \u2014 Invoice history, upcoming invoice preview
- **Usage** \u2014 Current period usage vs. limits (link to Metering)
- **Changes** \u2014 Plan change history with proration calculations
- **Dunning** \u2014 Dunning status if applicable (link to Dunning)

**Navigation Patterns:**
- Modal for plan change wizard (upgrade/downgrade with proration preview)
- Drawer for subscription detail (preserves list filter state)
- Command Palette: \u2318K > " Subscription: acme-corp\, \Subscription: Upgrade to Enterprise\
- Breadcrumbs: Subscriptions / acme-corp / Overview

### 2.6 Invoicing & Billing (/invoicing)
**Primary Tabs:**
| Tab | Route | View Types | Description |
|-----|-------|------------|-------------|
| **Invoices** | /invoicing | List, Detail, Create (manual), Action (send, credit, refund, write-off) | All invoices with status, amount, due date, payment status |
| **Credit Notes** | /invoicing/credit-notes | List, Detail, Create, Action (refund, apply) | Credit notes linked to invoices with reason codes |
| **Adjustments** | /invoicing/adjustments | List, Detail, Create, Action (approve, post) | Manual adjustments requiring approver |
| **Tax** | /invoicing/tax | List (tax rates), Detail, Edit | Tax rate definitions, exemptions, jurisdictional rules |
| **Payments** | /invoicing/payments | List, Detail, Action (refund, reconcile) | Payment records with gateway reference, reconciliation status |

**Secondary Tabs** (on Invoice Detail):
- **Lines** \u2014 Invoice lines with tax breakdown
- **Payments** \u2014 Applied payments, remaining balance
- **Credit Notes** \u2014 Issued credits against this invoice
- **History** \u2014 Status changes, sends, views, downloads
- **PDF** \u2014 Rendered invoice (view/download)

**Navigation Patterns:**
- Modal for invoice creation (line-item grid with product selector)
- Drawer for invoice detail (preserves list context)
- Command Palette: \u2318K > " Invoice: INV-2026-0142\, \Invoice: Create Credit Note\
- Deep links: /invoicing/invoices/{id}?tab=lines

### 2.7 Dunning & Collections (/dunning)
**Primary Tabs:**
| Tab | Route slash Route | View Types | Description |
| Tab | Route | View Types | Description |
|-----|-------|------------|-------------|
| **Active Dunning** | /dunning | List, Detail, Action (pause, retry, escalate, suspend) | Tenants in dunning with stage, next action, amount due |
| **Schedules** | /dunning/schedules | List, Create, Edit, Detail | Dunning schedule definitions (retry intervals, email templates, grace periods) |
| **History** | /dunning/history | List, Detail, Export | Completed dunning cycles with outcome |
| **Involuntary Churn** | /dunning/churn | List, Detail, Action (recover, analyze) | Tenants churned via dunning with recovery tracking |

**Secondary Tabs** (on Dunning Case Detail):
- **Timeline** \u2014 Chronological events (emails sent, retries, suspensions, recovery)
- **Invoices** \u2014 Overdue invoices driving the dunning
- **Communications** \u2014 Sent emails, SMS, in-app notifications
- **Actions** \u2014 Manual interventions, pauses, escalations

**Navigation Patterns:**
- Inline actions on list (pause, retry now, escalate)
- Modal for schedule editor (visual timeline builder)
- Command Palette: \u2318K > " Dunning: acme-corp\, \Dunning: Schedule Editor\
- Breadcrumbs: Dunning / acme-corp / Timeline

### 2.8 Quotas & Limits (/quotas)
**Primary Tabs:**
| Tab | Route | View Types | Description |
|-----|-------|------------|-------------|
| **Tenant Quotas** | /quotas | List (tenant x quota matrix), Detail, Edit, Action (increase, alert) | Per-tenant quota consumption with % used, alerts, enforcement status |
| **Quota Definitions** | /quotas/definitions | List, Create, Edit, Detail | Quota types (users, storage, API, custom), default limits, hard/soft enforcement |
| **Alerts** | /quotas/alerts | List, Detail, Action (acknowledge, notify tenant) | Tenants approaching or exceeding limits |
| **Enforcement Log** | /quotas/enforcement | List, Detail | Automated enforcement actions (blocks, throttles, suspensions) |

**Secondary Tabs** (on Tenant Quota Detail):
- **Consumption** \u2014 Current usage by quota type with trend
- **History** \u2014 Limit changes, overrides, enforcement events
- **Alerts** \u2014 Active and historical alerts for this tenant

**Navigation Patterns:**
- Inline editable quota limits (with approval for increases)
- Drawer for quota detail
- Command Palette: \u2318K > " Quota: acme-corp API\, \Quota: Increase Storage\
- Deep links: /quotas/tenant/acme-corp?quota=api_calls

### 2.9 Resellers & Partners (/resellers)
**Primary Tabs:**
| Tab | Route | View Types | Description |
|-----|-------|------------|-------------|
| **Partners** | /resellers | List, Create, Edit, Detail, Action (suspend, terminate) | Partner accounts with tier, status, margin, sub-tenant count |
| **Sub-Tenants** | /resellers/sub-tenants | List, Detail, Action (transfer, reassign) | Tenants provisioned under partners with commission tracking |
| **Commissions** | /resellers/commissions | List, Detail, Export, Action (approve, pay) | Commission statements with reconciliation to invoiced revenue |
| **Co-branding** | /resellers/cobranding | List, Edit, Detail | Partner branding assets, domains, email sender identity |

**Secondary Tabs** (on Partner Detail):
- **Overview** \u2014 Tier, margin, status, contact, contract
- **Sub-Tenants** \u2014 List with MRR, health, commission
- **Commissions** \u2014 Statement history with payment status
- **Branding** \u2014 Configured assets, domain status, certificate expiry
- **Performance** \u2014 Activation rate, churn, expansion MRR

**Navigation Patterns:**
- Modal for partner onboarding wizard
