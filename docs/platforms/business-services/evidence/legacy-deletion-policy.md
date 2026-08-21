> **Migration status:** Legacy deletion evidence. Normative requirements are in `docs/standards/DATA_LIFECYCLE.md`; cited monorepo paths and bypass behavior are unverified.

# UniERP Deletion Policy

> **Status:** Sealed — Track G.4 (2026-07-18). Companion to
> `DATA_RETENTION_MATRIX.md` (legacy reference: `DATA_RETENTION_MATRIX.md`) (platform retention classes)
> and `ARCHITECTURE_FOUNDATION.md` (legacy reference: `../.ai/ARCHITECTURE_FOUNDATION.md`) § 15.3 (data longevity).
>
> Every entity mutation has a defined deletion class. The Prisma soft-delete middleware
> (`packages/database/src/soft-delete.ts`) enforces read filtering automatically;
> service code must still choose the correct operation (soft-delete via `update` or
> hard-delete via `delete`).

---

## 1. Deletion classes

| Class  | Label           | Behavior                                                                                                                                       | Examples                                      |
| ------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **SD** | Soft-delete     | `deletedAt` set on `update`; record hidden from all normal queries by middleware; visible only via explicit `deletedAt: { not: null }` filter. | Business documents, master records            |
| **HD** | Hard-delete     | Record physically removed via `delete`. No recovery.                                                                                           | Operational/log data, drafts, temp data       |
| **ER** | Erasure         | Soft-delete + GDPR/legal erasure workflow (H.1 PII registry). Anonymize or purge after retention window.                                       | PII-carrying records                          |
| **RT** | Retention-based | Hard-delete after retention period expires. Enforced by `scripts/enforce-retention.mjs` (H.4).                                                 | Audit logs, change history, outbox deliveries |

---

## 2. Per-entity policy

### 2.1 Business documents (SD)

| Model                      | Class | Notes                                                        |
| -------------------------- | ----- | ------------------------------------------------------------ |
| `Invoice`                  | SD    | Cannot hard-delete posted invoices; reversal via credit note |
| `Quotation`                | SD    |                                                              |
| `SalesOrder`               | SD    |                                                              |
| `PurchaseOrder`            | SD    |                                                              |
| `PurchaseRequisition`      | SD    |                                                              |
| `RFQ`                      | SD    |                                                              |
| `Contract`                 | SD    |                                                              |
| `Campaign`                 | SD    |                                                              |
| `QuotationTemplate`        | SD    |                                                              |
| `BlanketPurchaseAgreement` | SD    |                                                              |
| `DemandForecastRun`        | SD    |                                                              |

### 2.2 Master records (SD)

| Model                     | Class | Notes                                       |
| ------------------------- | ----- | ------------------------------------------- |
| `Customer`                | SD    | ER if contains PII; use `anonymize` process |
| `Vendor`                  | SD    | ER if contains PII                          |
| `Contact`                 | SD    | ER — always contains PII                    |
| `Lead`                    | SD    | ER — always contains PII                    |
| `Opportunity`             | SD    |                                             |
| `Product`                 | SD    |                                             |
| `ProductVariant`          | SD    |                                             |
| `PriceBook`               | SD    |                                             |
| `User`                    | SD    | ER — always contains PII                    |
| `Employee`                | SD    | ER — always contains PII                    |
| `SalesTerritory`          | SD    |                                             |
| `TerritoryAssignmentRule` | SD    |                                             |
| `WebToLeadForm`           | SD    |                                             |

### 2.3 CRM operational records (SD)

| Model                   | Class | Notes                   |
| ----------------------- | ----- | ----------------------- |
| `CadenceAutoEnrollRule` | SD    |                         |
| `EmailSequence`         | SD    |                         |
| `SalesPlaybook`         | SD    |                         |
| `Battlecard`            | SD    |                         |
| `CommissionPlan`        | SD    |                         |
| `GamificationBadge`     | SD    |                         |
| `ApprovalProcess`       | SD    |                         |
| `CrmDashboard`          | SD    |                         |
| `CrmDocument`           | SD    |                         |
| `CrmNote`               | SD    |                         |
| `CrmComment`            | SD    |                         |
| `CrmCustomField`        | SD    |                         |
| `CrmRecordType`         | SD    |                         |
| `CrmWorkflowRule`       | SD    |                         |
| `SavedReport`           | SD    |                         |
| `APMatchRule`           | SD    | Also tracks `deletedBy` |

### 2.4 Communications (SD)

| Model      | Class | Notes                                            |
| ---------- | ----- | ------------------------------------------------ |
| `Message`  | SD    | Only model with `@@index([tenantId, deletedAt])` |
| `Folder`   | SD    |                                                  |
| `Document` | SD    |                                                  |

### 2.5 Project & operations (SD)

| Model      | Class | Notes |
| ---------- | ----- | ----- |
| `Project`  | SD    |       |
| `Contract` | SD    |       |

---

## 3. Enforcement

### 3.1 Automatic read filtering (middleware)

The soft-delete Prisma middleware (`packages/database/src/soft-delete.ts`) injects
`deletedAt: null` into the `where` clause of every read and mutation operation for
all models in `SOFT_DELETE_ENABLED_MODELS`. This is transparent to service code.

**Operations affected:**

- `findMany`, `findFirst`, `findUnique`, `findFirstOrThrow`, `findUniqueOrThrow`
- `count`, `aggregate`, `groupBy`
- `update`, `updateMany`, `delete`, `deleteMany`

### 3.2 Soft-delete operation

Service code performs soft-delete by setting `deletedAt`:

```typescript
await prisma.customer.update({
  where: { id },
  data: { deletedAt: new Date() },
});
```

### 3.3 Viewing deleted records

To query deleted records explicitly, pass `deletedAt: { not: null }`:

```typescript
// Only deleted records
await prisma.customer.findMany({
  where: { deletedAt: { not: null } },
});

// All records including deleted
await prisma.customer.findMany({
  where: { deletedAt: undefined }, // bypasses middleware
});
```

Note: `deletedAt: undefined` is a special case — the middleware only injects
`deletedAt: null` when no `deletedAt` filter is present in the args at all.
Passing `undefined` explicitly overrides the middleware (this is how trash/recycle
views work).

### 3.4 Hard-delete

Only for models NOT in `SOFT_DELETE_ENABLED_MODELS`:

```typescript
await prisma.recycleBinItem.delete({ where: { id } });
```

### 3.5 Recycle bin / trash view

The existing recycle-bin pattern (`documents.service.ts`) uses an explicit
`deletedAt: { not: null }` filter to show only trashed items. This is the
recommended pattern for all modules that need trash support.

---

## 4. Migration guidance

When adding a new model:

1. Determine its deletion class from § 2.
2. If SD/ER: add `deletedAt DateTime? @map("deleted_at")` field.
3. Add an `@@index([tenantId, deletedAt])` for query performance.
4. Register the model in `SOFT_DELETE_ENABLED_MODELS` in `soft-delete.ts`.

The scaffolder (`scripts/scaffold-entity.mjs`) generates SD-class models by default.


