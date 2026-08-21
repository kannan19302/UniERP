> **Repository evidence:** Relocated from `framework/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# @kannan19302/framework

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

UniERP's unified frontend framework. Provides a declarative metadata layer: modules describe their **resources** declaratively, and the framework generates data fetching, validation, navigation, and full list/detail/form views — the same way for every app and module.

Sits **above** `@kannan19302/ui` (design system) and **below** each host app (`apps/web`, future apps). It is also the shared runtime that Studio-rendered pages should consume — do not fork a second rendering engine.

## Layers

| Layer | Import | What it does |
|---|---|---|
| Metadata | `ResourceSchema`, `FieldDef`, `ModuleDefinition` | Declarative description of a module and its entities |
| Registry | `defineModule`, `createRegistry` | Modules self-register; hosts derive routes/nav from it |
| Client | `ApiClient` | One configured HTTP gateway (auth, CSRF, tenant, errors) |
| Data | `useResourceList/Doc`, `useCreate/Update/DeleteResource` | Tenant-scoped TanStack Query hooks with cache invalidation |
| Schema | `buildZodSchema`, `validateValues` | Zod validation generated from FieldDefs + custom validators |
| Permissions | `Guarded`, `RouteGuard`, `usePermission` | RBAC (`module.resource.action`) gating for nav, routes, actions, fields |
| Views | `ListView`, `FormView`, `DetailView` | Schema-driven pages with escape hatches (custom cells, sections, children) |

## Quick start

**1. Define a module** (one file per module, e.g. `modules/crm.ts`):

```ts
import { defineModule, defineResource } from '@kannan19302/framework';

const customer = defineResource({
  name: 'customer',
  labelSingular: 'Customer',
  labelPlural: 'Customers',
  endpoint: '/crm/customers',
  titleField: 'name',
  permissions: { read: 'crm.customer.read', create: 'crm.customer.create', update: 'crm.customer.update' },
  status: { field: 'status', tones: { ACTIVE: 'success', CHURNED: 'danger' } },
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'type', label: 'Type', type: 'select', options: [
      { value: 'COMPANY', label: 'Company' }, { value: 'INDIVIDUAL', label: 'Individual' },
    ]},
    { name: 'creditLimit', label: 'Credit Limit', type: 'currency', min: 0,
      visibleIf: (v) => v.type === 'COMPANY' },
  ],
  list: { columns: ['name', 'email', 'type', 'status'], searchable: true, pageSize: 25 },
  form: { sections: [{ title: 'General', fields: ['name', 'email', 'type', 'creditLimit'] }] },
});

export const crmModule = defineModule({
  id: 'crm', title: 'CRM', basePath: '/crm',
  resources: [customer],
});
```

**2. Mount the provider once** in the host app:

```tsx
<FrameworkProvider
  api={{
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
    getToken: () => localStorage.getItem('token'),
    getCsrfToken: () => readCookie('csrf_token'),
    getTenantId: () => activeTenantId,
  }}
  modules={[crmModule]}
  queryClient={existingQueryClient} // or createQueryClient
>
  {children}
</FrameworkProvider>
```

**3. Pages become one-liners:**

```tsx
// /crm/customer — list
<RouteGuard permission="crm.customer.read">
  <ListView resource={customer} onRowClick={(row) => router.push(`/crm/customer/${row.id}`)}
            onCreate={() => router.push('/crm/customer/new')} />
</RouteGuard>

// /crm/customer/[id] — detail (children slot for tabs, history, related lists)
<DetailView resource={customer} id={id} onEdit={() => router.push(`/crm/customer/${id}/edit`)} />

// create / edit
<FormView resource={customer} id={id} onSuccess={(rec) => router.push(`/crm/customer/${rec.id}`)} />
```

**4. Navigation** is derived, not hand-written:

```ts
const nav = buildAppNav(registry.getModules(), hasPermission);
```

## Conventions

- **Tenant safety**: every cache key is prefixed with the tenant id from `getTenantId()`; switching tenants can never surface another tenant's cached rows.
- **Permissions**: RBAC codes follow `module.resource.action`. Missing `read` hides the nav item; `RouteGuard` blocks the route with a 403 view; `Guarded` hides buttons/fields.
- **Server contract**: list endpoints accept `page`, `pageSize`, `search`, `sortField`, `sortDirection` plus arbitrary filter params, and return `{ data, total }` (bare arrays and `{ items, total }` also accepted).
- **Escape hatches**: `list.render` for custom cells, `toolbar`/`actions`/`children`/`footer` slots on every view, and all data hooks are usable standalone for fully custom pages.

## Out of scope (v1)

i18n wiring, saved views, offline, dashboards/reports, Studio editor changes. See `.ai/MODULE_REGISTRY.md` and the enterprise hardening plan for the roadmap.

