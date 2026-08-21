> **Migration status:** Legacy cross-product journey specification; current product/platform requirements and traceability are authoritative.

# APP FLOW — Architecture & User Journey

> **Every journey, screen, action, and state across the platform.** One file. Amended, never replaced.
> Established 2026-07-30 · Read `README.md` § 0 before editing.

---

## 1. System flow — a request's full path

Every authenticated request travels this path. Each numbered stage can reject; nothing skips a stage.

```
 Browser / Mobile / Desktop
        │
        │ 1. HTTPS (TLS 1.3), HSTS, CSP
        ▼
 ┌─────────────────┐
 │ Traefik         │  rate limit (IP) · WAF rules · TLS termination
 └────────┬────────┘
          ▼
 ┌─────────────────┐
 │ Next.js         │  2. middleware.ts: session cookie → route guard
 │ (web)           │     unauthenticated ⇒ 302 /login?next=…
 └────────┬────────┘
          │ 3. Server Component fetch OR client TanStack Query
          ▼
 ┌──────────────────────────────────────────────────────────┐
 │ NestJS API  /api/v1/*                                    │
 │                                                          │
 │  4. Helmet + CORS allowlist + CSRF double-submit         │
 │  5. ThrottlerGuard      → 429 on burst                   │
 │  6. AuthGuard           → 401: session/JWT/API key valid?│
 │  7. TenantContext       → resolve tenant_id, bind ALS    │
 │  8. PermissionsGuard    → 403: module.resource.action    │
 │  9. ZodValidationPipe   → 422 with field-level errors    │
 │ 10. ChangeHistory interceptor (opens capture)            │
 │                                                          │
 │ 11. Controller  (routing only — zero business logic)     │
 │        ▼                                                 │
 │ 12. Service     (all business logic; only Prisma caller) │
 │        ▼                                                 │
 │ 13. TRANSACTION                                          │
 │      ├ SET LOCAL app.tenant_id  (RLS enforcement)        │
 │      ├ business writes                                   │
 │      ├ outbox INSERT  (domain events, same txn)          │
 │      └ change-history INSERT (field-level audit)         │
 │        ▼ COMMIT                                          │
 │ 14. Response: { data, meta } or RFC 7807 problem+json    │
 └──────────────────────────────────────────────────────────┘
          │
          ├─▶ 15. Outbox relay → BullMQ → consumers (idempotent receipt)
          │                              ├─ notifications
          │                              ├─ cross-module reactions
          │                              ├─ webhooks (tenant subscribers)
          │                              └─ search/embedding indexer
          │
          └─▶ 16. Socket.IO push → live UI update
```

**Invariants.** Stage 7 always precedes any data access. Stage 13's `SET LOCAL` runs on the
_same_ transaction client as the writes — never a different connection. The outbox insert is
_inside_ the business transaction; if the commit fails, the event never existed.

---

## 2. Error and empty-state contract

Every screen must handle all six states. A screen missing one is incomplete.

| State                           | UI treatment                                                                          |
| :------------------------------ | :------------------------------------------------------------------------------------ |
| **Loading**                     | Skeleton matching final layout (never a spinner over blank space; never layout shift) |
| **Empty (no data yet)**         | Illustration + one sentence of explanation + the primary create action                |
| **Empty (filtered to nothing)** | "No results for X" + a one-click clear-filters action                                 |
| **Error (recoverable)**         | Inline message + Retry. Preserve the user's input — never clear a form.               |
| **Error (forbidden)**           | "You don't have access to this" + who to ask. Never a raw 403.                        |
| **Partial / degraded**          | Render what loaded; mark the failed region distinctly; do not fail the page           |

API errors are RFC 7807 `application/problem+json`:

```json
{
  "type": "https://unierp.dev/errors/validation",
  "title": "Validation failed",
  "status": 422,
  "detail": "3 fields are invalid",
  "instance": "/api/v1/sales/orders",
  "errors": { "customerId": ["Required"], "lines[0].qty": ["Must be > 0"] },
  "traceId": "01JD..."
}
```

`traceId` is displayed in the UI error state so a user can quote it to support.

---

## 3. Global navigation model

```
┌──────────────────────────────────────────────────────────────────┐
│ TOP BAR                                                          │
│ [☰] UniERP  │ Apps▾ │  ⌘K Search…  │  [+ New]  🔔3  ?  [Avatar▾] │
├──────────┬───────────────────────────────────────────────────────┤
│ SIDEBAR  │ BREADCRUMB:  Apps / Sales / Orders / SO-2026-0142     │
│          │───────────────────────────────────────────────────────│
│ ⌂ Home   │                                                       │
│ ★ Pinned │  PAGE CONTENT                                         │
│ ─────    │                                                       │
│ Finance ▾│                                                       │
│  Invoices│                                                       │
│  Payments│                                                       │
│ Sales   ▸│                                                       │
│ Inventory▸│                                                      │
│ HR      ▸│                                                       │
│ …        │                                                       │
│ ─────    │                                                       │
│ ⚙ Settings│                                                      │
└──────────┴───────────────────────────────────────────────────────┘
```

| Element         | Behaviour                                                                                                    |
| :-------------- | :----------------------------------------------------------------------------------------------------------- |
| **Apps ▾**      | Grid launcher of every module the user's role permits. Modules with zero permissions are absent, not greyed. |
| **⌘K / Ctrl+K** | Global command palette: records, actions, navigation, settings, help. Every action reachable by keyboard.    |
| **[+ New]**     | Context-aware quick create; on a module page it defaults to that module's primary entity.                    |
| **🔔**          | Notification drawer: unread first, grouped by module, each row deep-links to the source record.              |
| **Avatar ▾**    | Profile · Preferences · Theme · Language · Switch tenant · Sign out                                          |
| **Breadcrumb**  | Mandatory on every page: `Apps / [Module] / [Section] / [Record]`. Every segment is a link.                  |
| **Sidebar**     | Collapsible, remembers state per user, supports pinned favourites.                                           |

---

## 3a. Global Platform Wizard

Because UniERP consists of 10 discrete platforms, the root navigation experience is a central switcher. Upon authentication, users who hold roles across multiple platforms (e.g., a Tenant Admin who also uses the Tenant ERP and Web Studio) are presented with a unified Platform Wizard.
*   **Role-Gated Tiles:** The wizard displays only the platforms the user is authorized to access.
*   **Seamless SSO:** Navigating between the Tenant Admin (Platform 6) and Web Studio (Platform 5) requires zero re-authentication, managed by `unierp-idp`.

## 3b. Tenant App Wizard

Within Platform 3 (Tenant Apps / ERP), a secondary App Wizard manages the tenant's installed business capabilities.
*   **Module Launcher:** Displays installed modules (Finance, HR, Sales, etc.).
*   **Marketplace Bridge:** Uninstalled or suggested modules link directly to Platform 7 (Marketplace) for provisioning.

---

## 4. Journey A — Onboarding a new organisation (Dev, IT Admin)

The single most important journey: **bare metal → usable tenant in under 30 minutes.**

```
1  Landing (marketing site) ─▶ [Start free] ─▶ /signup
2  SIGN UP
   Fields: work email · password (zxcvbn strength ≥ 3) · org name · country
   Actions: [Create account]  |  [Continue with Google]  [Continue with Microsoft]
   ⇒ POST /auth/register → tenant row + owner user + verification email
   ⇒ ERRORS: email in use → inline, offer sign-in; weak password → live meter
3  VERIFY EMAIL
   6-digit code (10-min TTL, 5 attempts) · [Resend] cooldown 60 s
4  SETUP WIZARD  (7 steps, resumable, progress bar, every step skippable except 1)
   ├ 1 Organisation  legal name, tax id, address, fiscal year start, base currency
   ├ 2 Industry      Generic | Healthcare | Education | Real Estate | Field Service
   │                  ⇒ preselects modules + seeds a vertical chart of accounts
   ├ 3 Modules       toggle grid; dependencies auto-enable with an explanatory note
   ├ 4 Team          invite by email w/ role; or [Skip — invite later]
   ├ 5 Data          [Import CSV/Excel] (column mapper + dry-run preview)
   │                  | [Load demo data] | [Start empty]
   ├ 6 Branding      logo, primary colour, subdomain (live availability check)
   └ 7 Security      enforce MFA? · session lifetime · IP allowlist · [Finish]
5  ⇒ POST /tenants/:id/provision  (async job, live progress via socket)
      creates schema defaults · seeds COA + roles + permissions · warms caches
6  FIRST-RUN DASHBOARD
   Checklist card: ✓ Org set up · ○ Invite your team · ○ Connect a bank ·
                   ○ Create your first invoice · ○ Set up approvals
   Each item deep-links to the exact screen. Card auto-dismisses at 100%.
```

**Failure paths:** provisioning failure rolls back the tenant completely and emails the owner
a support reference. A wizard abandoned mid-way resumes at the last completed step on next login.

---

## 5. Journey B — Daily sign-in

```
/login
 ├ email + password ─▶ POST /auth/login
 │    ├ 200 + mfaRequired:false ─▶ set httpOnly session ─▶ /dashboard
 │    ├ 200 + mfaRequired:true  ─▶ /login/mfa
 │    │      ├ TOTP 6 digits  ─▶ verify ─▶ /dashboard
 │    │      ├ [Use a recovery code]  (single-use, 10 issued at enrolment)
 │    │      └ [Approve on my device] (push challenge; 60 s to accept)
 │    ├ 401  ─▶ "Email or password is incorrect"  (never reveal which)
 │    ├ 423  ─▶ locked after 5 failures / 15 min; unlock link emailed
 │    └ 403  ─▶ tenant suspended → billing contact page
 ├ [Continue with Google]     ─▶ OAuth ─▶ callback ─▶ link-or-create ─▶ /dashboard
 ├ [Continue with Microsoft]  ─▶ Entra ─▶ callback ─▶ …
 ├ [Single sign-on]           ─▶ enter domain ─▶ tenant IdP (OIDC/SAML) ─▶ …
 └ [Forgot password]          ─▶ email a 30-min single-use token
                                 (always shows "check your inbox", regardless of existence)
```

Post-login: multi-tenant users land on a **tenant chooser**; single-tenant users go straight to
the dashboard. Session is httpOnly + Secure + SameSite=Lax, sliding expiry, device-bound, and
revocable from Profile → Sessions.

---

## 6. Journey C — The universal record lifecycle

**Every business entity in every module follows this identical pattern.** Learn it once, and
all 45 modules are predictable. It is rendered by `@kannan19302/framework` from a schema declaration,
not hand-built per module.

### C1 — List page `/{module}/{entity}`

```
Apps / Sales / Orders                                    [⋯] [+ New Order]
┌──────────────────────────────────────────────────────────────────────┐
│ [Search…]  [Status ▾] [Customer ▾] [Date ▾] [+ Filter]   Saved: All▾ │
├──────────────────────────────────────────────────────────────────────┤
│ ☐ │ Order #  ↕│ Customer ↕│ Date ↕ │ Total ↕│ Status  │ Actions      │
│ ☐ │ SO-0142   │ Acme Ltd  │ 28 Jul │ ₹4,200 │ ●Draft  │ 👁 ✏ ⋯       │
│ ☑ │ SO-0141   │ Globex    │ 27 Jul │ ₹1,150 │ ●Sent   │ 👁 ✏ ⋯       │
├──────────────────────────────────────────────────────────────────────┤
│ 2 selected ▸ [Approve] [Export] [Delete]   ◀ 1 2 3 … 47 ▶  25/page ▾ │
└──────────────────────────────────────────────────────────────────────┘
```

| Element        | Contract                                                                                    |
| :------------- | :------------------------------------------------------------------------------------------ |
| Search         | Debounced 300 ms, server-side, across the entity's indexed fields                           |
| Filters        | Composable; encoded in the URL so any view is shareable and bookmarkable                    |
| Saved views    | Per user and per role; one may be set as the user's default                                 |
| Sort           | Server-side, single column, indicator via the shared `.dt-sort-th` convention               |
| Pagination     | **Server-side always.** Any list that can exceed 20 rows must paginate.                     |
| Row click      | Opens detail. Action buttons call `stopPropagation()`.                                      |
| Bulk bar       | Appears only on selection; every bulk action requires confirmation and is audited           |
| Actions column | View / Edit / Delete, permission-filtered. Omitted only where no backend route exists.      |
| Export         | CSV / XLSX / PDF of the **current filter**, generated server-side as a job for > 5,000 rows |
| Density        | Comfortable / Compact toggle, persisted per user                                            |

### C2 — Detail page `/{module}/{entity}/{id}`

```
Apps / Sales / Orders / SO-2026-0142        [Edit] [Approve] [Print] [⋯]
┌────────────────────────────────────────────┬─────────────────────────┐
│ SO-2026-0142            ●Pending Approval  │ SIDEBAR                 │
│ Acme Ltd · 28 Jul 2026 · ₹4,200            │ Owner    Priya S.       │
│                                            │ Created  28 Jul 09:14   │
│ [Overview][Lines][Payments][Docs][History] │ Modified 28 Jul 11:02   │
│ ─────────────────────────────────────────  │ Source   Quote QT-0088  │
│                                            │ ───────────────────     │
│  … tab content …                           │ RELATED                 │
│                                            │ ▸ Invoice INV-0301      │
│                                            │ ▸ Delivery DN-0210      │
│                                            │ ───────────────────     │
│                                            │ APPROVALS               │
│                                            │ ✓ Ops    28 Jul 10:40   │
│                                            │ ⏳ Finance  pending      │
├────────────────────────────────────────────┴─────────────────────────┤
│ CHANGE HISTORY  (mandatory, every detail page, collapsed by default)  │
│ Priya S. changed Status  Draft → Pending Approval    28 Jul 11:02     │
│ Priya S. changed Total   ₹3,900 → ₹4,200             28 Jul 10:55     │
└──────────────────────────────────────────────────────────────────────┘
```

**Mandatory on every detail page:** status pill, primary + overflow actions (permission-gated),
related-records panel, approval trail where a workflow applies, and the change-history
component at the bottom.

### C3 — Create / Edit `/{module}/{entity}/new` · `/{id}/edit`

- Rendered by `@kannan19302/form-engine` from the same Zod schema the API validates with — client and
  server validation **cannot** diverge.
- Validation on blur; submit disabled until valid; first invalid field receives focus on
  failed submit.
- Autosave draft every 30 s for long forms; unsaved-changes guard on navigate away.
- Optimistic UI on submit with rollback and an inline error on failure.
- Line-item grids: keyboard-first (Tab to add a row, Enter to commit, Esc to cancel).

### C4 — State machine (statuses are module-specific; transitions are universal)

```
 DRAFT ──submit──▶ PENDING ──approve──▶ APPROVED ──post──▶ POSTED
   │                  │                     │                 │
   │                  ├──reject──▶ REJECTED │                 ├──▶ CANCELLED (reversal entry)
   └──delete──▶ (gone)                      └──▶ CANCELLED    └──▶ CLOSED
```

**Rule:** once a record is POSTED it is immutable. Correction is a reversing entry, never an
edit. Deletion is permitted only from DRAFT; everything else is cancelled or reversed, and the
audit trail is preserved.

---

## 7. Journey D — Approval workflow

```
Requester submits
   └─▶ WorkflowEngine matches rules (module, entity, conditions, amount thresholds)
        └─▶ instantiates chain: Step 1 → Step 2 → …
             ├ notify approver (in-app + email + push)
             ├ approver opens: inbox row │ email deep link │ push tap
             │    ▼
             │  APPROVAL SCREEN
             │  record summary · what changed · [Approve] [Reject] [Request info]
             │  comment box (mandatory on Reject)
             │    ├ Approve  ─▶ next step, or final ⇒ record APPROVED + event emitted
             │    ├ Reject   ─▶ record REJECTED, requester notified with the reason
             │    └ Request info ─▶ pauses SLA, returns to requester, resumes on reply
             ├ SLA timer per step ─▶ breach ⇒ escalate to the delegate/manager
             └ Out-of-office ⇒ auto-route to the configured delegate
```

Every transition is written to the audit trail with actor, timestamp, comment, and IP.

---

## 8. Journey E — Frontline mobile (Sam)

Design target: **complete the core task in 3 taps, offline, with no training.**

```
 App launch
  ├ biometric unlock (or PIN)
  ├ offline? ─▶ load cached shell + queued work; banner "Offline — 3 items queued"
  └ HOME: today's assignments, big touch targets (≥ 44 px), no dense tables
      │
      ├ Field tech:  ticket ─▶ navigate ─▶ checklist ─▶ parts used ─▶ signature ─▶ done
      ├ Nurse:       patient ─▶ vitals ─▶ chart note ─▶ sign
      ├ Teacher:     class ─▶ attendance grid ─▶ submit
      └ Cashier:     scan ─▶ cart ─▶ tender ─▶ receipt (print/email)
      │
      └ every write ─▶ local queue (Isar/IndexedDB) ─▶ on reconnect: sync
            ├ success            ─▶ clear from queue, toast confirmation
            └ server-side change ─▶ CONFLICT SCREEN: mine │ theirs │ merge
```

Sync is last-write-wins **only** for non-financial records. Any financial or clinical conflict
escalates to explicit human resolution — never auto-merged.

---

## 9. Journey F — AI Copilot

```
 ⌘K  or  the Copilot dock
  └─▶ "why is cash flow down this month?"
       ├ intent classification (local model)
       ├ retrieval — pgvector + SQL, executed AS THE ASKING USER
       │   ⇒ RLS + RBAC apply to the AI exactly as to the human.
       │     The Copilot can never surface a row the user could not open themselves.
       ├ generation with inline citations to source records
       └ response
            ├ narrative answer, every figure linked to its origin document
            ├ chart (if the shape suits it)
            └ suggested actions ─▶ [Create reminder] [Draft email] [Open report]
                 ⇒ every action is a PROPOSAL. Nothing executes without a tap.
                 ⇒ executed actions are tagged "via Copilot" in the audit trail.
```

**Hard boundary:** the Copilot may read, summarise, draft, and propose. It may not post a
journal entry, approve a workflow, send an external message, or delete a record without an
explicit, separately-recorded human confirmation.

---

## 10. Journey G — Extending without forking (Ravi, partner)

```
 Settings ─▶ Developer
  ├ API keys        generate · scope to permissions · rotate · revoke · usage graph
  ├ Webhooks        subscribe to domain events · HMAC signature · retry log · replay
  ├ Custom fields   add a field to any entity ─▶ appears in form, list, API, export
  ├ Custom entities define a new entity ─▶ full CRUD UI generated by the framework
  ├ Builder Studio  visual page/form/workflow builder — NO CODE, ever
  └ Extensions      install a bundle · apiVersion compatibility check · sandbox · permissions prompt
```

**Builder Studio is strictly no-code.** An agent that responds to a Builder request with a code
snippet has violated the product's core promise.

---

## 11. Cross-cutting behavioural rules

| Rule                            | Detail                                                                         |
| :------------------------------ | :----------------------------------------------------------------------------- |
| **URL is state**                | Filters, tabs, pagination, and sort live in the URL. Every view is shareable.  |
| **Keyboard complete**           | Every action reachable without a mouse. `⌘K` is the universal entry.           |
| **Destructive = confirm**       | Typed confirmation for anything irreversible; the record's name must be typed. |
| **Optimistic + reversible**     | Instant UI feedback; a toast with Undo where a rollback is possible.           |
| **Permission-shaped UI**        | Actions the user cannot perform are **absent**, not disabled — no dead ends.   |
| **Never lose input**            | Errors, timeouts, and navigation never discard typed data.                     |
| **Audit everything**            | Every mutation writes actor, timestamp, before/after, IP, and origin.          |
| **Tenant-safe by construction** | No screen can ever request data outside its tenant; the database refuses it.   |

---

## 12. Amendment log

| Date       | Change                                                         | By          |
| :--------- | :------------------------------------------------------------- | :---------- |
| 2026-07-30 | Document established; replaces the deleted `.ai/` document set | Claude Code |
| 2026-08-16 | Added § 3a/3b (Platform Wizard / App Wizard)                   | Antigravity |

