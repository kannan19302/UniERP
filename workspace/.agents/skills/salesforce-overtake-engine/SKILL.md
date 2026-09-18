---
name: salesforce-overtake-engine
description: Operational intelligence, recipes, and automation procedures to achieve global enterprise SaaS market leadership ('Stand at the top of the market' surpassing Salesforce, SAP, Oracle, Dynamics 365, ServiceNow, and Workday) with the tagline 'Enterprise SAAS business platform' across all 15 industry verticals and all 31 repositories in the UniERP polyrepo.
metadata:
  short-description: Enterprise SAAS market leadership engine and multi-platform development standard
---

# Salesforce & Market Dominance Overtake Engine (`salesforce-overtake-engine`)

This skill equips AI coding agents with the exact commands, recipes, blueprints, and verification steps necessary to build, audit, and benchmark UniERP into the world's leading **Enterprise SAAS business platform**.

---

## 🚀 Quick Execution Commands

```bash
# 1. Run full enterprise market dominance audit with percentage progress meters:
cd d:\UniERP\unierp-workspace
node scripts/run-enterprise-saas-engine.mjs

# 2. Run continuous iteration mode (auto-remediates until 100% completion):
node scripts/run-enterprise-saas-engine.mjs --continuous

# 3. View real-time percentage progress only:
node scripts/run-enterprise-saas-engine.mjs --progress-only

# 4. Verify AI Agent Protocol conformance across all 31 repos:
node scripts/check-ai-agent-protocol.mjs
```

---

## 🛠️ The 10 Super-Platform Moats & Recipes

### 1. CRM-to-Ledger Convergence Pipeline Recipe
When implementing an enterprise sales or commerce deal in `tenant-apps`:
* Step 1: Ensure Opportunity model in `data/prisma/schemas/crm.prisma` has `convertedToSalesOrderId`.
* Step 2: In `api/src/modules/crm/crm.service.ts`, implement `convertOpportunityToOrder(tenantId, oppId)`:
  * Creates `SalesOrder` in `erp.sales_orders`.
  * Checks stock in `inventory.bin_locations`.
  * Emits outbox event `crm.opportunity.converted`.
* Step 3: Event consumer in `api/src/modules/finance/finance.event-handler.ts`:
  * Creates Draft AR Invoice.
  * Posts Journal Entry to `finance.general_ledger`.

### 2. Visual DAG Flow Builder Recipe (Replacing Salesforce Flow)
In `tenant-apps/app/(dashboard)/crm/automation/`:
* Tab `overview`: KPI cards on active flows, execution count, average execution time (< 2ms), failure rate (0%).
* Tab `flow-builder`: Node-based visual canvas where each node represents an event trigger, filter, condition, or action (Send WhatsApp, Generate Quote, Create Work Order, Post Ledger Entry).
* Tab `assignment-rules`: Territory and round-robin lead allocation matrix.
* Tab `escalation-rules`: SLA tier breach escalation with automated notifications.
* Tab `scoring-models`: Real-time behavioral lead scoring rules.
* Tab `sequences`: Multi-step email and call cadences.

### 3. Autonomous Agent Studio Recipe (Crushing Salesforce Agentforce)
* Add AI agents into `developer-platform` and `tenant-apps`:
  * Domain agents consume typed tool definitions from `@kannan19302/contracts`.
  * Context retrieval queries `data` via `pgvector` embeddings (`SELECT ... ORDER BY embedding <=> $1 LIMIT 5`).
  * Critical actions (discount > 20%, credit extension) yield a `HumanApprovalRequiredException` and queue into the admin triage tray.

### 4. Sub-50ms Matrix CPQ Recipe
In `api/src/modules/cpq/`:
* Pricing engine evaluates product bundles, volume tiers, customer group multipliers, and promotional coupons using `decimal.js`.
* Employs WebAssembly-accelerated pricing algorithms to compute cart totals with 200+ line items in under 50ms.

### 5. 1-Click Salesforce Migration Bridge Recipe
In `api/src/modules/migration/`:
* Connect to Salesforce instance via OAuth2 Refresh Token.
* Introspect Salesforce `DescribeGlobal` and `DescribeSObject` APIs.
* Map standard and custom fields (`*__c`) into PostgreSQL columns.
* Stream historical data with cursor pagination and insert with `ON CONFLICT DO NOTHING`.

### 6. Bidirectional Round-Trip Visual Studio Recipe
In `web-studio`:
* Visual component tree parses standard Next.js / Strata TSX via Babel/SWC parser into AST.
* Drag-and-drop property updates mutate the AST and write clean, formatted TypeScript back to disk.
* Direct code edits in the IDE re-render the visual canvas via HMR with zero proprietary format lock-in.

### 7. Native Omnichannel WebRTC & WhatsApp Recipe
In `tenant-apps/src/components/communication/`:
* Embedded WebRTC audio dialer connecting via SIP/Twilio credentials stored in `tenant-admin`.
* Direct integration with WhatsApp Cloud API for outbound notifications and inbound two-way customer support chat.

### 8. Sovereign Cloud & Air-Gapped Cell Recipe
In `provider-admin-os`:
* Ability to provision a tenant on a shared cell or spin up a dedicated single-tenant PostgreSQL instance and worker pod.
* For air-gapped deployments, enable the `blockchain` immutable audit trail module to cryptographically hash every transaction.

### 9. Offline-First CRDT Edge Mode Recipe
In `unierp-mobile` (Flutter) and `desktop-app`:
* SQLite local cache synchronized with the central API via state-based CRDTs.
* POS cashiers and field service technicians continue processing sales and work orders with zero internet.

### 10. Automated Market Benchmark Recipe
Run:
```bash
node d:\UniERP\unierp-workspace\scripts\run-enterprise-saas-engine.mjs --benchmark
```
* Compares UniERP endpoint response times (< 40ms) with Salesforce REST API baseline (250–600ms).
* Verifies feature coverage across all 15 industry clouds.

---

## 📋 Pre-Commit Verification Checklist

Before completing any task, execute:
```bash
cd d:\UniERP\unierp-workspace
node scripts/run-enterprise-saas-engine.mjs
```
Confirm:
1. Progress is displayed in exact mathematical percentages (0% to 100%).
2. Zero simulated or mocked test passes.
3. Every table has PostgreSQL RLS enabled with `NOBYPASSRLS` assertions.
4. Every API route has `@Permissions` and `@UseGuards(JwtAuthGuard, RbacGuard)`.
5. All UI components use Strata DL 2.0 tokens and meet WCAG 2.2 AA.
