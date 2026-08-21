> **Migration status:** Legacy umbrella-repository architecture; current platform catalog and ADRs are authoritative.

# How UniERP fits together

A map for someone who has just landed here and wants to know what these
repositories are, why there are so many, and where to make a change.

---

## The one-paragraph version

UniERP is a **multi-tenant application platform** that ships an ERP as its first
app suite. Thirty repositories build **three** running things: a backend, a
customer web app, and a provider admin console. The repository count is high
because each boundary is a *published contract*; the deployable count is low
because splitting a ledger across processes is how ERPs corrupt data.

---

## The rule that explains the whole layout

> A repository may depend only on published artifacts of a **strictly lower
> layer**. Never sideways. Never upward.

This is not a convention. Each repo's CI runs `scripts/check-layer.mjs`, and a
package cannot import what is not in its `package.json`. So "the UI must not
call the database" is not a code-review note anyone can forget — the design
system has no dependency on the API, and a component that tried to import a
service would fail to resolve.

```
L7  OPERATIONS     workspace ── infra
                        │        (orchestrate everything; nothing depends on them)
L6  EXTENSIONS     extensions
                        │        (may use ONLY the public extension API)
L5  CLIENTS        mobile
                        │
L4  PRESENTATION   web ── console ── corporate-website
                        │
L3  SERVICE        api ── idp
                        │
L2  RUNTIME        data ── framework ── extension-api ── sandbox
                        │
L1  FOUNDATION     kernel ── design-system ── sdk ── shared ── auth ── config
                        │
L0  CONTRACT       contracts        (depends on nothing at all)
```

---

## Follow one request all the way through

A salesperson opens the app and saves an invoice. Here is every repository it
touches, in order:

1. **`unierp-web`** renders the page. Its components come from
   **`unierp-design-system`**, and the page itself is described by a schema the
   **`unierp-framework`** runtime interprets — the same runtime a customer-built
   page uses, which is why a custom module looks native.

2. The browser posts to `/api/v1/finance/invoices`. Web's proxy sends `/auth/*`
   to **`unierp-idp`** and everything else to **`unierp-api`** — identity is a
   separate service because § 5.2 gives each plane its own realm.

3. **`unierp-api`** receives it. `JwtAuthGuard` verifies the signature using a
   secret it shares with the IdP, then checks the session is not revoked.
   `RbacGuard` reads the `permissions` claim the IdP minted. `TenantGuard` pins
   the tenant from the token — never from a header or the request body.

4. The DTO's shape comes from **`unierp-contracts`**, which is where every API
   and event shape is defined and from which the SDK and OpenAPI are generated.
   Nothing may define an endpoint the contracts do not describe.

5. The service writes through **`unierp-data`**. Its Prisma client sets
   `app.current_tenant_id` inside the query's own transaction, so PostgreSQL's
   row-level security — `ENABLE` *and* `FORCE`, under a `NOBYPASSRLS` role —
   scopes the write at the database, not in application code.

6. The write emits a domain event to the transactional outbox in
   **`unierp-kernel`**. Any extension in **`unierp-extensions`** subscribed to
   `finance.invoice.created` receives it, and its handler runs inside
   **`unierp-sandbox`** — a V8 isolate with no `process`, no `require`, no
   filesystem, and metered CPU, memory, query and egress budgets.

7. The provider's own view of the tenant lives in **`unierp-console`**, on a
   different origin with a different IdP realm. It talks to `/api/platform/v1`,
   never to `/api/v1`.

Every arrow in that story crosses a version number, not a folder.

---

## Where do I make my change?

| I want to… | Repository |
| :--------- | :--------- |
| Change what an endpoint returns | **contracts** first, then **api** |
| Add a database table or migration | **data** |
| Change how a button looks | **design-system** |
| Add a page to the customer app | **web** |
| Add a provider-only screen | **console** |
| Add business logic to a module | **api** |
| Build an add-on without touching core | **extensions**, against **extension-api** |
| Change how login works | **idp** |
| Change deployment or the dev stack | **infra** |
| Change a CI gate | **workspace** (gates are shared, never copied) |

The ordering matters. Changing the API's response shape without changing the
contract first will fail the consumer-driven contract gate, which replays every
consumer's published expectations against the provider on each change. That gate
exists because the TypeScript compiler stops seeing across a repository
boundary, and something has to take its place.

---

## Why one backend and not forty-five services

The 45 business modules live together in `unierp-api` on purpose. A stock
movement posts a general-ledger entry; an invoice reserves inventory. Splitting
those into separate services turns each of those into a distributed transaction
on the most correctness-critical paths in the system. Extraction is *earned* —
one module at a time, when it demonstrates an independent scaling or release
profile. None currently does.

Repository topology and runtime topology are different decisions, and they are
made differently here.

---

## The four planes

| Plane | What it is | Who reaches it |
| :---- | :--------- | :------------- |
| **0 Public** | Marketing, docs, signup, published tenant websites | Anyone |
| **1 Control** | Tenant lifecycle, billing, licensing, impersonation | Provider staff, separate origin and realm, MFA, restricted ingress |
| **2 Tenant admin** | Users, roles, settings, branding | A customer's administrators |
| **3 Application** | The 45 business modules | A customer's users |
| **4 Developer** | Studio, builders, extension authoring | Whoever the tenant permits |

Plane 1 is separate because the blast radius differs. A bug in plane 3 affects
one tenant; a bug in plane 1 affects all of them. That is why the console is its
own deployable on its own origin — after the split, tenant-plane code cannot
even link against control-plane handlers.

---

## What is deliberately not split

- **The 45 modules** stay in one backend. See above.
- **The control-plane API** stays in `unierp-api` behind a separate router and
  guard. A second process would add a distributed transaction to every
  provisioning operation and close nothing further; the boundary that matters is
  origin, realm, ingress and guard.
- **Infrastructure** is one repo with environment overlays, not a repo per
  environment. Splitting infrastructure from infrastructure is how the manifest
  and the application come to disagree.

---

## Running it

```bash
git clone https://github.com/kannan19302/ERPSys
cd ERPSys
pnpm install
pnpm dev            # datastores + api + web
pnpm smoke          # walks register → login → read tenant data over HTTP
```

`pnpm dev` starts what you need every day. The console, developer platform and
IdP are opt-in — each is a full Next.js or Nest process, and running all five at
once will exhaust a 16 GB machine.

See [`unierp-infra`](https://github.com/kannan19302/unierp-infra) for deployment
and [`ERPSys/docs/PLATFORM_ARCHITECTURE.md`](https://github.com/kannan19302/ERPSys/blob/main/docs/PLATFORM_ARCHITECTURE.md)
for the full reasoning, including the parts that are still in progress.

