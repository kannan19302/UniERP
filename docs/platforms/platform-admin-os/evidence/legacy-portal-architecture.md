> **Migration status:** Legacy portal architecture retained as implementation evidence; current PAO architecture and ADRs are authoritative.

# UniERP Platform Admin Console — Control-Plane Architecture

> **This document is the frozen information architecture of the Provider Control Plane.** Future
> features must be added inside this structure — the sidebar architecture itself is never redesigned.
> It is the single source of truth that the build agents and the stable navigation (`src/lib/navigation.tsx`)
> derive from.

- Repository: `@kannan19302/console` (port 3002, L4 Presentation)
- Backing API: `unierp-api` L3 (real control-plane controllers under `/api/v1/platform/v1/*`)
- Design system: `@kannan19302/ui` (L1, tokens only — no hardcoded hex/px)
- Session realm: `provider` (ControlPlaneGuard, mandatory MFA, `system.*`/`platform.*` permission namespaces)

---

## 1. Navigation rule (frozen)

> Use ONLY these 14 sidebar items. Never add individual features to the sidebar.
> Structure: Sidebar → Overview → Primary Tabs → Secondary Tabs/Sub-tabs → List/Detail/Create/Edit/Action views.

The `NavigationItem[]` model in `src/lib/navigation.ts`:

```ts
interface NavItem {
  id: string;            // stable slug, used as route segment + command id
  label: string;         // sidebar label
  icon: IconName;        // lucide icon, resolved by the shell
  root: string;          // base route, e.g. "/stable-home/tenants"
  permission: string;    // gate for the whole item (usePermission)
  tabs: NavTab[];        // PRIMARY tabs
}
interface NavTab {
  id: string; label: string; icon?: IconName; permission?: string;
  subTabs: NavSubTab[];  // SECONDARY sub-tabs (list/detail/create) — optional
}
interface NavSubTab { id: string; label: string; path: string; permission?: string; scope: "list"|"detail"|"create"|"edit"|"settings"|"monitor"; }
```

Never add a new `id` at the top level. Tabs and sub-tabs are the expansion mechanism.

---

## 2. The 14 sidebar items (frozen)

### 1. OVERVIEW — `/overview`
Primary tabs: Dashboard, Platform Health, Business, Usage, Operations, Security, Activity.
Sub-tabs: KPI board (revenue/MRR/ARR/growth/churn), health (SLO/SLI/incidents/alerts), business (tenants/user health), usage (API), operations (jobs/queues), security (threat posture), activity (timeline).
Permissions: `platform.overview.read` (view), `system.analytics.read` (KPIs), `system.health.read` (health).

### 2. TENANTS — `/tenants`
Primary: Overview, Directory, Structure, Lifecycle, Users, Subscription, Usage, Modules, Configuration, Security, Integrations, Data, Activity, Support.
Real backend: `platform/v1/tenants*` (TenantLifecycleController), `platform/v1/migrations`, `platform/v1/offboarding`, `platform/v1/quotas`, `platform/v1/subscriptions`.
- Permissions: `system.tenant.create|update|suspend|unsuspend|offboard|purge|export`, `system.tenant.lifecycle.read`, `system.superadmin.access`.

### 3. USERS & ACCESS — `/access`
Primary: Directory, Roles, Permissions, Authentication, Sessions, Governance, Audit.
Backing: SaaS portal + IdP (`.auth/me`, own control-plane user tables) via `platform/v1/super-admin`.
- Permissions: `admin.user.*`, `system.superadmin.access`.

### 4. BILLING — `/billing`
Primary: Overview, Plans, Subscriptions, Customers, Invoices, Payments, Usage, Revenue, Configuration.
Backing: `platform/v1/plans`, `platform/v1/subscriptions`, `platform/v1/invoices`, `platform/v1/dunning`, `platform/v1/metering`, `platform/v1/quotas`, `admin/subscription`, `admin/custom-fields`.
- Permissions: `admin.billing.read|write`, `platform.revenue.read`.

### 5. MARKETPLACE — `/marketplace`
Primary: Catalog, Applications, Extensions, Versions, Publishing, Approvals, Installations, Reviews.
Backing: `platform/v1/marketplace`, `admin/imports`.
- Permissions: `admin.marketplace.*`, `platform.marketplace.*`.

### 6. DEVELOPERS — `/developers`
Primary: Overview, Apps, APIs, Keys, OAuth, Scopes, Webhooks, Rate Limits, SDKs, Sandbox, Docs, Changelog.
Backing: `platform/v1/api-platform*`, `api-platform` module.
- Permissions: `admin.developers.read|write`.

### 7. INTEGRATIONS — `/integrations`
Primary: Catalog, Connections, Credentials, Sync, Mapping, Events, Logs, Health.
- Backing: `platform-credentials` module (`admin/platform-credentials`), ext-gateway.

### 8. PLATFORM OPERATIONS — `/operations`
Primary: Services, Environments, Releases, Deployments, Jobs, Queues, Workflows, Automation, Monitoring, Incidents, Maintenance.
Backing: `platform/v1/releases`, `platform/v1/operations`, `admin/alerts`, `admin/announcements`, `admin/automation-rules`, `admin/bulk-operations`.
- Permissions: `platform.sre.*`, `system.superadmin.access`.

### 9. INFRASTRUCTURE — `/infrastructure`
Primary: Compute, Kubernetes, Database, Storage, Network, Capacity, Queues, Regions, Backups, DR.
Backing: `platform/v1/operations`, `platform/v1/enterprise-scale`, `platform/v1/cluster-routing`, admin/platform.
- Permissions: `system.superadmin.access`, `platform.infra.read`.

### 10. SECURITY & COMPLIANCE — `/security`
Primary: Threats, Policies, Identity, Secrets, Certificates, Privacy, Compliance, Audit.
Backing: `platform/v1/soc` (SecurityOperationsController), `platform/v1/quotas`, `admin/alerts`.
- Permissions: `system.security.admin`, `platform.secops.*`.

### 11. SUPPORT — `/support`
Primary: Overview, Tickets, Customers, SLA, Knowledge, Communications, Incidents.
Backing: `platform/v1/support`, `admin/alerts`, `admin/announcements`, `admin/imports`.
- Permissions: `admin.support.*`.

### 12. ANALYTICS — `/analytics`
Primary: Platform, Customers, Product, Usage, Financial, Performance, Support, Reports.
Backing: `system.analytics.read`, `admin/data-quality`, `platform/v1/operations`.
- Permissions: `system.analytics.read`, `admin.analytics.*`; exports CSV/Excel/PDF via `reporting` module.

### 13. AI PLATFORM — `/ai`
Primary: Overview, Providers, Models, Agents, Workflow, Knowledge, Usage, Cost, Governance, Audit.
- Backing: `ai` module (platform view).

### 14. SETTINGS — `/settings`
Primary: Platform, Defaults, Localization, Templates, Branding, Policies, Features, Configuration.
Backing: `admin/platform`, `admin/settings` (legacy) — real config, localized, versioned.

---

## 3. Route map (Next.js App Router, `app/(control-plane)/`)

- Shell layout: `layout.tsx` (sidebar + topbar + command palette + notifications).
- Each item is a route folder `/overview`, `/tenants`, ... `/settings`.
- Within each folder: `page.tsx` renders the primary-tab shell (`ModuleTabLayout`) with `?tab=` param, `[tabs]/*page.tsx` for real sub-paths where a direct URL is desired, `[id]/page.tsx` for detail views.
- All routes run through middleware session check + `PermissionContext` (permission-aware rendering).

| Item | Root | Example routes |
|---|---|---|
| Overview | `/overview` | `/overview`, `/overview/health`, `/overview/activity` |
| Tenants | `/tenants` | `/tenants`, `/tenants/new`, `/tenants/[id]`, `/tenants/[id]/quotas` |
| Access | `/access` | `/access`, `/access/users`, `/access/users/[id]` |
| Billing | `/billing` | `/billing`, `/billing/plans`, `/billing/invoices/[id]` |
| Marketplace | `/marketplace` | `/marketplace`, `/marketplace/apps/[id]` |
| Developers | `/developers` | `/developers`, `/developers/apps/[id]` |
| Integrations | `/integrations` | `/integrations`, `/integrations/jobs` |
| Operations | `/ops` | `/ops`, `/ops/releases`, `/ops/incidents` |
| Infrastructure | `/infrastructure` | `/infrastructure`, `/infrastructure/nodes` |
| Security | `/security` | `/security`, `/security/policies` |
| Support | `/support` | `/support`, `/support/tickets/[id]` |
| Analytics | `/analytics` | `/analytics`, `/analytics/reports` |
| AI | `/ai` | `/ai`, `/ai/models`, `/ai/agents` |
| Settings | `/settings` | `/settings`, `/settings/features` |

## 4. Page inventory (build list)

Per item: 1 tab-shell page + (for data-heavy tabs) a sub-page per real resource (list/detail/create). The build agents
shall not invent new resources — each page binds to the real control-plane API controller listed above.

## 5. Domain boundaries / dependencies

- **Console is L4.** Cannot import other app modules; only `@unierc/ui`, `@unierc/framework`, `@unierc/auth` and the API via HTTP.
- DB owns device-registry/tenant data (`unier-data`, L2), served to console through L1 API controllers — never direct DB in console.
- Billing → plans/subscriptions/metering/dunning (API). *Nothing else writes those tables.*

## 6. Permission matrix (console surface)

| Code | Guard effect |
|---|---|
| `platform.overview.read` | Overview dashboard & activity |
| `system.analytics.read` | Analytics + overview KPIs/usage |
| `system.health.read` | Health tab, incidents |
| `system.tenant.*` | Tenant lifecycle actions (create/update/suspend/etc.) |
| `system.superadmin.access` | super-admin, infrastructure, ops actions |
| `platform.sre.*` | operations/releases/infrastructure details |
| `admin.*` | everything else (users, billing, marketplace, support, etc.) |

Unauthorized console routes render a 403 page; the API enforces its own `@Permissions` so both layers agree.

## 7. Component/navigation architecture (reusable)

- `src/lib/navigation.ts` — single frozen nav model + `useNavItems()` (permission-filtered).
- `src/lib/api.ts` — typed API client (Bearer `auth_token`/`__session`, CSRF, 401→refresh→replay).
- `src/lib/context/*` — `PermissionProvider`, `SessionProvider`, `Toast`, theme.
- `src/components/*` — shared: `StatCardRow`, `PageContentTabs`, `ListPage`, `DetailPage`, `EmptyState`, `PageHeader`, `CommandPaletteFeed`.
- `src/lib/telemetry.ts` — client correlation id + console-side audit breadcrumbs.
- Everything else (per-route) lives in the route folders and is composed from the shared kit; the DS provides the primitives (Card, DataTable, Tabs, Drawer, Modal, Badge…).

## 7. `docs` pointers

- Real controllers: `unier-api/src/platform/v1/*.controller.ts`, `unier-api/src/modules/admin/*`
- Permissions registry: `unier-shared/src/permissions/registry.ts`
- Schema: `unier-data/prisma/schema/*`
