> **Migration status:** Legacy schema design and measurements; current contracts/standards and source-derived evidence are authoritative.

# BACKEND SCHEMA — Data Model, Auth, Storage & Encryption

> **How data is shaped, related, protected, and destroyed.** One file. Amended, never replaced.
> Established 2026-07-30 · Read `README.md` § 0 before editing.

---

## 1. Current scale

| Metric                     | Value                                                                    |
| :------------------------- | :----------------------------------------------------------------------- |
| Prisma models              | **1,836**                                                                |
| Enums                      | 65                                                                       |
| Models carrying `tenantId` | 1,794 (97.7%)                                                            |
| Indexes declared           | 3,063                                                                    |
| Applied migrations         | 170                                                                      |
| Schema file                | `packages/database/prisma/schema.prisma` — **40,577 lines, single file** |

> ⚠️ **The single-file schema is a known structural problem.** At 40,577 lines it exceeds what
> any human or AI agent can hold in context, which means changes are made without seeing the
> surrounding model graph. Splitting it into per-domain `.prisma` files via Prisma's multi-file
> schema support is remediation item **R2** in `ARCHITECTURE_REVIEW.md` (legacy reference: `ARCHITECTURE_REVIEW.md`).

---

## 2. The universal entity contract

**Every business table has these columns.** No exceptions, no "small lookup table" carve-outs.

```prisma
model <Entity> {
  id        String   @id @default(cuid())
  tenantId  String   @map("tenant_id")          // ← MANDATORY on every business table
  // ... domain fields ...
  createdAt DateTime @default(now())  @map("created_at")
  updatedAt DateTime @updatedAt       @map("updated_at")
  createdBy String?  @map("created_by")
  updatedBy String?  @map("updated_by")
  deletedAt DateTime? @map("deleted_at")        // soft delete; never a hard DELETE
  version   Int      @default(1)                // optimistic concurrency control

  tenant    Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  @@index([tenantId])                           // MANDATORY — first column of every index
  @@index([tenantId, createdAt])
  @@map("<snake_case_plural>")
}
```

### Naming conventions (enforced by `pnpm schema:lint`)

| Thing           | Convention                             | Example                         |
| :-------------- | :------------------------------------- | :------------------------------ |
| Model           | `PascalCase`, singular                 | `SalesOrder`                    |
| Table (`@@map`) | `snake_case`, plural                   | `sales_orders`                  |
| Field           | `camelCase`                            | `customerId`                    |
| Column (`@map`) | `snake_case`                           | `customer_id`                   |
| Enum            | `PascalCase`; values `SCREAMING_SNAKE` | `OrderStatus.PENDING_APPROVAL`  |
| Foreign key     | `<entity>Id`                           | `warehouseId`                   |
| Join table      | `<a>_<b>` alphabetical                 | `role_permissions`              |
| Money           | `Decimal @db.Decimal(19,4)`            | **never `Float`**               |
| Timestamp       | `DateTime` stored UTC                  | rendered in the user's timezone |

### Hard rules

1. **`tenantId` is the first column of every composite index.** Without it, Postgres cannot use
   the index under an RLS predicate and every query degrades to a sequential scan.
2. **Money is `Decimal(19,4)`. Never `Float`, never `Number`.** A float in a ledger is a
   correctness defect that will eventually be discovered by an auditor.
3. **No hard deletes on business data.** `deletedAt` + a filtered read. Physical deletion
   happens only through the retention/erasure job in § 8.
4. **`version` is checked on every update.** A mismatch returns `409 Conflict`; the UI shows a
   merge screen. Last-write-wins is not acceptable on financial records.
5. **Every foreign key has an explicit `onDelete`.** Never rely on the default.
6. **Enums for closed sets, not strings.** A status column typed `String` is a future bug.

---

## 3. Domain map

The 1,836 models fall into 12 bounded contexts. **Cross-context references are by ID only** —
never a Prisma relation that couples two contexts' lifecycles.

```
┌───────────────────────────────────────────────────────────────────┐
│ PLATFORM                                                          │
│  Tenant · Organization · User · Role · Permission · UserSession   │
│  AuditLog · OutboxEvent · OutboxDelivery · OutboxConsumerReceipt  │
│  Notification · FileObject · CustomField · SavedView · ApiKey     │
└───────────────┬───────────────────────────────────────────────────┘
                │ tenantId (every table below)
   ┌────────────┼────────────┬───────────┬───────────┬────────────┐
   ▼            ▼            ▼           ▼           ▼            ▼
┌────────┐ ┌─────────┐ ┌──────────┐ ┌────────┐ ┌─────────┐ ┌──────────┐
│FINANCE │ │  SALES  │ │PROCURE-  │ │INVENTORY│ │   HR    │ │ PROJECTS │
│Account │ │Customer │ │  MENT    │ │Product  │ │Employee │ │Project   │
│Journal │ │Quote    │ │Vendor    │ │Warehouse│ │Payroll  │ │Task      │
│Invoice │ │SalesOrd │ │RFQ       │ │StockMove│ │Leave    │ │Timesheet │
│Payment │ │Delivery │ │PurchOrd  │ │Batch    │ │Attend.  │ │Milestone │
│TaxRate │ │Return   │ │Receipt   │ │Serial   │ │Appraisal│ │Budget    │
│Asset   │ │Contract │ │          │ │BOM      │ │         │ │          │
└────────┘ └─────────┘ └──────────┘ └────────┘ └─────────┘ └──────────┘
   ┌────────────┬────────────┬───────────┬───────────┬────────────┐
   ▼            ▼            ▼           ▼           ▼            ▼
┌────────┐ ┌─────────┐ ┌──────────┐ ┌────────┐ ┌─────────┐ ┌──────────┐
│MANUFAC-│ │ RETAIL  │ │ANALYTICS │ │   AI   │ │WORKFLOW │ │VERTICALS │
│TURING  │ │POS      │ │Dashboard │ │AiModel │ │WfDefn   │ │Healthcare│
│WorkOrd │ │Shift    │ │Report    │ │AiConv  │ │WfInst   │ │Education │
│Routing │ │Register │ │Widget    │ │AiAgent │ │WfStep   │ │RealEstate│
│MrpRun  │ │Storefront│ │Query     │ │AiDoc   │ │Approval │ │FieldSvc  │
└────────┘ └─────────┘ └──────────┘ └────────┘ └─────────┘ └──────────┘
```

### Core relationships

```
Tenant 1──∞ Organization 1──∞ Department 1──∞ Employee
Tenant 1──∞ User ∞──∞ Role ∞──∞ Permission
User   1──∞ UserSession · LoginHistory · OauthIdentity · PushDeviceToken

Customer 1──∞ Quotation 1──1 SalesOrder 1──∞ SalesOrderLine
SalesOrder 1──∞ DeliveryNote 1──∞ StockMovement
SalesOrder 1──∞ Invoice 1──∞ Payment 1──∞ JournalEntryLine
Vendor 1──∞ RFQ 1──∞ PurchaseOrder 1──∞ GoodsReceipt 1──∞ StockMovement
Product 1──∞ StockLevel ∞──1 Warehouse 1──∞ Bin
Product 1──∞ Batch 1──∞ SerialNumber
Account (self-referencing tree) 1──∞ JournalEntryLine ∞──1 JournalEntry
```

### The `Tenant` god-model problem

`model Tenant` currently declares **109 lines of back-relations**. This is a structural smell,
not a functional bug: every new module adds a line, making the model a permanent merge-conflict
hotspot and giving a false impression that `Tenant` is coupled to everything. Remediation R2
removes most back-relations in favour of one-directional `tenantId` references with an explicit
index — Prisma does not require the reverse relation to be declared.

---

## 4. Multi-tenancy — the most important guarantee in the system

**Model: shared database, shared schema, row-level isolation, enforced by PostgreSQL.**

Chosen over database-per-tenant (does not reach 10,000 tenants; migrations become an operational
nightmare) and schema-per-tenant (Postgres degrades past a few thousand schemas; connection
pooling becomes pathological).

### 4.1 Four layers of defence

| Layer | Mechanism                              | Role                                                                          |
| :---- | :------------------------------------- | :---------------------------------------------------------------------------- |
| 1     | JWT/session claim                      | Establishes which tenant the caller belongs to                                |
| 2     | `AsyncLocalStorage` tenant context     | Propagates it through the request without threading a parameter               |
| 3     | Prisma middleware injecting `tenantId` | Catches developer error early with a clear message                            |
| 4     | **PostgreSQL Row-Level Security**      | **The actual guarantee.** Layers 1–3 are convenience; only this one is proof. |

### 4.2 The RLS mechanism

```sql
CREATE OR REPLACE FUNCTION current_tenant_id() RETURNS VARCHAR AS $$
  SELECT NULLIF(current_setting('app.current_tenant_id', true), '')::VARCHAR;
$$ LANGUAGE sql STABLE;

ALTER TABLE sales_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_sales_orders ON sales_orders
  USING      (tenant_id = current_tenant_id())
  WITH CHECK (tenant_id = current_tenant_id());
```

Applied in bulk by `packages/database/prisma/setup-rls.sql` and by migrations that loop over
every table possessing a `tenant_id` column.

### 4.3 The non-negotiable runtime rules

1. **The application connects as a `NOBYPASSRLS` role.** A superuser or table-owner connection
   silently ignores every policy — which is exactly how tenant-isolation breaches happen in
   production. The migration role (`DATABASE_OWNER_URL`) is separate and is used only by
   `db:deploy`.
2. **`SET LOCAL app.current_tenant_id` runs inside the same transaction, on the same client, as
   the query.** `set_config(..., true)` is transaction-scoped. Setting it on a pooled connection
   outside a transaction leaks the value to the next request — a critical vulnerability class.
3. **Every protected read and write goes through the transaction-scoped client.** There is no
   "just this one query" exception.
4. **A new table is not shippable until it has an RLS policy and a passing two-tenant test.**

```ts
// The mandatory test shape for every protected table.
it("does not leak across tenants", async () => {
  const a = await asTenant("tenant-a", (db) =>
    db.salesOrder.create({ data: orderFixture }),
  );
  const rows = await asTenant("tenant-b", (db) =>
    db.salesOrder.findMany({ where: { id: a.id } }),
  );
  expect(rows).toHaveLength(0); // not "filtered" — the database must refuse
});
```

### 4.4 Known drift risk (open)

RLS is applied by point-in-time migrations that loop over then-existing tables. **Tables created
after the most recent RLS migration have no policy until one is added.** `scripts/check-rls-verify.mjs`
exists to detect this, but was **not wired into CI** — it is added to the pipeline as part of
this document set's CI rework. Treat any gap it reports as a **P0 security issue**, not a chore.

---

## 5. Authentication

### 5.1 Supported methods

| Method           | Implementation                          | Notes                                                                      |
| :--------------- | :-------------------------------------- | :------------------------------------------------------------------------- |
| Email + password | Argon2id                                | Time cost 3, memory 64 MB, parallelism 4. **Never bcrypt for new hashes.** |
| TOTP MFA         | `otplib`, RFC 6238                      | 30 s window, ±1 step drift, secret encrypted at rest                       |
| Recovery codes   | 10 single-use codes                     | Stored hashed; shown exactly once at enrolment                             |
| Push approval    | Web Push (VAPID)                        | 60 s challenge; device-bound                                               |
| Google OAuth     | OIDC                                    | —                                                                          |
| Microsoft Entra  | OIDC, per-tenant directory              | —                                                                          |
| Generic OIDC     | Any conformant IdP                      | Keycloak / Authentik / Zitadel — **the open default**                      |
| SAML 2.0         | Per-tenant IdP metadata                 | Enterprise SSO                                                             |
| API keys         | `ue_live_<32 bytes>`, stored as SHA-256 | Scoped to explicit permissions, rotatable, revocable                       |
| Service JWT      | `EXT_SERVICE_JWT_SECRET`                | Core ⇄ vertical microservice trust only                                    |

### 5.2 Session model

```
Login ──▶ UserSession { id, userId, tenantId, deviceId, ip, userAgent,
                        createdAt, lastSeenAt, expiresAt, revokedAt }
      ──▶ httpOnly · Secure · SameSite=Lax cookie (opaque session id — never a JWT in a cookie)
```

- Idle timeout 8 h (tenant-configurable); absolute maximum 30 days.
- Sliding renewal refreshes `lastSeenAt`, not the absolute expiry.
- Every session is listed in Profile → Sessions with device, location, and last-seen, and is
  individually revocable. Password change revokes all other sessions.
- Rotate the session id on privilege change (login, MFA completion, role change).

### 5.3 Password and lockout policy

Minimum 12 characters, `zxcvbn` strength ≥ 3, checked against the k-anonymity HaveIBeenPwned
range API (which never transmits the password). **No forced rotation** — NIST SP 800-63B
explicitly advises against it. Five failed attempts triggers a 15-minute lockout, per account
_and_ per IP, with exponential backoff.

---

## 6. Authorization

### 6.1 Permission model

Three-part string: `module.resource.action` — e.g. `finance.invoice.approve`,
`hr.employee.read`, `inventory.stock.adjust`.

```
User ∞──∞ Role ∞──∞ Permission
       │
       └──∞ DirectPermission   (grant or explicit DENY, overrides role)
```

**Resolution order:** explicit DENY → direct grant → role grant → **deny by default**.
An unlisted permission is always denied.

### 6.2 Record-level rules

Beyond the permission string, a policy may narrow the row set:
`own` (created by me) · `team` (my department) · `org` (my organization) · `all` (tenant-wide).
Composed into the Prisma `where` clause _in addition to_ the RLS predicate — never instead of it.

### 6.3 Enforcement (mandatory on every endpoint)

```ts
@Permissions('sales.order.approve')
@UseInterceptors(ChangeHistoryInterceptor)
@TrackChanges('SalesOrder')
@Post(':id/approve')
approve(@Param('id') id: string, @Body() dto: ApproveDto) { … }
```

An endpoint without `@Permissions` is a security defect. CI rejects it. In the UI, any
privileged control is wrapped in `<ProtectedComponent permission="…">` so that unusable actions
are **absent rather than disabled**.

---

## 7. Encryption and secrets

### 7.1 In transit

TLS 1.3 externally (TLS 1.2 floor for legacy integrations). HSTS with preload. Internal
service-to-service traffic uses mTLS in the Kubernetes topology. Postgres connections use
`sslmode=verify-full` in production.

### 7.2 At rest

| Layer              | Mechanism                                                       |
| :----------------- | :-------------------------------------------------------------- |
| Full disk / volume | LUKS or provider-managed volume encryption                      |
| Database           | Postgres TDE where available; otherwise encrypted block storage |
| Backups            | age/GPG encrypted **before** leaving the host                   |
| Object storage     | MinIO SSE-S3, per-tenant key derivation                         |

### 7.3 Application-level field encryption

Sensitive columns are encrypted **inside the application** so that a database dump alone is
insufficient. Algorithm: **AES-256-GCM**, per-field random 96-bit IV, authentication tag stored
alongside, key derived from `PII_ENCRYPTION_KEY` via HKDF with the field path as info.

Encrypted today (suffix `_enc`, e.g. `access_token_enc`, `refresh_token_enc`):

| Category       | Fields                                                                       |
| :------------- | :--------------------------------------------------------------------------- |
| Auth secrets   | OAuth access/refresh tokens, TOTP seeds, SAML private keys, API-key material |
| Financial      | Bank account numbers, IBAN, routing, tax identifiers, payment tokens         |
| Personal       | National ID, passport, driving licence, date of birth, home address          |
| Health (HIPAA) | Diagnosis, medication, lab results, clinical notes                           |
| Compensation   | Salary, bank details, payroll components                                     |

**Rules:** an encrypted field is never indexed directly — use a separate blind index (HMAC of
the normalised value) when lookup is required. Encrypted fields never appear in logs, error
messages, exports, or AI prompts. Every encrypted field is registered in
`scripts/pii-registry.json`, and `pnpm check:pii` fails the build if a field matching a PII
pattern is added without registration.

### 7.4 Key management

| Key                      | Purpose             | Rotation                                                    |
| :----------------------- | :------------------ | :---------------------------------------------------------- |
| `PII_ENCRYPTION_KEY`     | Field-level PII     | Annual, versioned; both versions valid during re-encryption |
| `MFA_ENCRYPTION_KEY`     | TOTP seeds          | Annual                                                      |
| `NEXTAUTH_SECRET`        | Session signing     | Quarterly                                                   |
| `EXT_SERVICE_JWT_SECRET` | Inter-service trust | Quarterly                                                   |
| `VAPID_*`                | Web push            | On compromise only                                          |

Keys carry a version prefix so ciphertext identifies the key that produced it, enabling
rolling re-encryption without downtime. Storage is **OpenBao** (Vault fork) or SOPS+age.
**Keys are never in `.env` in production, never in CI logs, never in git.** A commit containing
a key-shaped string is blocked by gitleaks at pre-commit, pre-push, and in CI.

---

## 8. Audit, retention, and erasure

### 8.1 Change history

Every entity mutation writes a field-level record: entity type, entity id, field, old value,
new value, actor, timestamp, IP, user agent, and origin (`ui` | `api` | `import` | `copilot` |
`system`). Written **in the same transaction as the mutation** — an audit trail that can be
missing is not an audit trail. Append-only: `UPDATE` and `DELETE` on the audit table are
revoked at the database role level.

Financial and clinical records additionally support optional blockchain anchoring
(`packages/blockchain`) — a periodic Merkle root written to an immutable ledger, so tampering
is detectable even by a database administrator.

### 8.2 Retention

Driven by `scripts/retention-matrix.json`, enforced by a nightly job.

| Data                    | Retention                          | Basis                                 |
| :---------------------- | :--------------------------------- | :------------------------------------ |
| Financial records       | 7–10 years                         | Statutory (jurisdiction-configurable) |
| Payroll                 | 7 years                            | Statutory                             |
| Health records          | 6 years after last contact (HIPAA) | Statutory                             |
| Audit logs              | 7 years                            | Compliance                            |
| Session / login history | 90 days                            | Security                              |
| Application logs        | 30 days hot, 1 year cold           | Operations                            |
| AI conversations        | 90 days, tenant-configurable       | Privacy                               |
| Soft-deleted rows       | 30 days, then physical purge       | Operations                            |

### 8.3 GDPR

- **Erasure** — pseudonymises the subject in transactional records that must be retained for
  statutory reasons and hard-deletes everything else. Every erasure is itself audited.
- **Portability** — full subject export as JSON + CSV within 30 days, generated as a background
  job and delivered via an expiring link.
- **Rectification** — standard edit, fully captured in change history.
- **Consent** — recorded per purpose with timestamp, version, and mechanism.

---

## 9. Migrations

```
schema change ──▶ pnpm db:migrate --name <module>_<change>   (dev: generates SQL)
              ──▶ review the generated SQL BY HAND            (mandatory, never skipped)
              ──▶ commit schema + migration together          (never separately)
              ──▶ CI applies with db:deploy against a fresh database
              ──▶ production: db:deploy inside the CD job, before the new image is routed to
```

**Rules**

1. **`db:push` is disabled at the script level** (`scripts/forbid-db-push.mjs`). It destroys
   migration history and therefore the data model's audit trail.
2. **Never edit an applied migration.** Correct it forward with a new one.
3. **Expand → migrate → contract.** Add the new column, dual-write, backfill, switch reads,
   then drop the old column in a _later_ release. Every migration must be compatible with the
   previously deployed application version.
4. **No destructive DDL in an automated deploy.** Drops require a separate, manually triggered,
   approved release.
5. **A migration that takes a lock for more than 5 seconds on a large table must be rewritten**
   (`CREATE INDEX CONCURRENTLY`, batched backfill, `NOT VALID` constraints then `VALIDATE`).
6. Startup **fails closed** on migration drift. A running application on a drifted schema is
   worse than a down application.

---

## 10. Performance

| Concern           | Rule                                                                                                                                       |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| Indexing          | `tenantId` first in every composite index. Index every foreign key. Index every column used in a default sort.                             |
| N+1               | Forbidden. Use Prisma `include`/`select`; assert query counts in tests for hot paths.                                                      |
| Pagination        | Cursor-based for large sets; offset only where a user needs page numbers. Hard cap `limit ≤ 100`.                                          |
| Partitioning      | Time-partition high-volume tables (audit logs, stock movements, outbox, AI logs) by month.                                                 |
| Read replicas     | Reporting and analytics read from a replica. Never the primary.                                                                            |
| Caching           | Redis for permissions, tenant settings, and reference data. Explicit invalidation on write — never TTL-only for correctness-relevant data. |
| Connection pool   | PgBouncer transaction pooling. Note: transaction pooling forbids session-level state, which is precisely why RLS uses `SET LOCAL`.         |
| Slow query budget | Anything over 100 ms is logged with its plan and triaged weekly.                                                                           |

---

## 11. Amendment log

| Date       | Change                                                                                             | By          |
| :--------- | :------------------------------------------------------------------------------------------------- | :---------- |
| 2026-07-30 | Document established; records measured state (1,836 models, 170 migrations) and the RLS drift risk | Claude Code |


