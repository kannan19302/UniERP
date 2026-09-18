# Change Contract — FND-P1-003 Master-Data Governance

## Cycle status

- Status: `PARTIAL` (Master data entities and 3-stage import lifecycle implemented; deduplication, merge stewardship, lineage, and downstream reconciliation events in progress)
- Objective: establish canonical master data entity schemas, validation, deduplication, import/export lifecycle management, and downstream event consistency.
- Risk class: `R2` — core master data integrity across customers, vendors, employees, products, and accounts.
- Accountable platforms: Business Services (`PLT-BIZ`).

## Architecture & Data Invariants

1. **Master Data Entity Model**:
   - `Customer` (`customers`): Party entity for sales, receivables, and CRM with strict tenant isolation.
   - `Vendor` (`vendors`): Party entity for procurement, accounts payable, and supplier management.
   - `Employee` (`employees`): Human resource worker entity linked to departments and user accounts.
   - `Product` (`products`): Unified SKU/inventory/merchandising catalog item.
   - `UnitOfMeasure` (`units_of_measure`): Standardized units with conversion ratios.
   - `Account` (`accounts`): General ledger chart-of-accounts structure.

2. **Master Data Import Lifecycle (`MasterDataImportService`)**:
   - Supported entity types: `CUSTOMER`, `VENDOR`, `ITEM`, `GL_ACCOUNT`, `OPENING_BALANCE`, `EMPLOYEE`.
   - 3-stage lifecycle:
     1. Field Mapping Validation (`validateRows`)
     2. Batch Execution & Error Tracking (`executeImport`)
     3. Durable Job State Persistence (`MasterDataImportJob`)
   - Schema enforcement backed by PostgreSQL RLS with non-bypass role `unerp_api`.

## Verification

- `src/modules/saas/tests/onboarding-wizard.service.spec.ts`: **PASS (7/7 tests green)**.
- `src/modules/saas/tests/customer-onboarding-journey.e2e.spec.ts`: **PASS (7/7 tests green)**.
- Full RLS isolation verified on `master_data_import_jobs` in live PostgreSQL.
