# Change Contract — FND-P1-002 Organization and Legal-Entity Model

## Cycle status

- Status: `PARTIAL` (Organization, department, cost center, warehouse, intercompany models, and temporal effective-dating hierarchy versioning engine verified)
- Objective: formalize the multi-tier enterprise organization and legal-entity hierarchy, intercompany accounting relationships, departmental hierarchies, cost centers, and warehouse locations.
- Risk class: `R2` — core tenant structural taxonomy and financial consolidation boundaries.
- Accountable platforms: Tenant Admin and Business Services (`PLT-ADM`, `PLT-BIZ`).

## Architecture & Data Invariants

1. **Entity Hierarchy**:
   - `Organization` (`organizations`): Root legal entity model per tenant, carrying `currency`, `timezone`, `taxId`, `fiscalYearStart`, and multi-book accounting linkages.
   - `Department` (`departments`): Departmental tree hierarchy with recursive self-relation (`DeptHierarchy`: `parentId` -> `children`).
   - `CostCenter` (`cost_centers`): Financial cost attribution hierarchy with recursive self-relation (`CostCenterHierarchy`: `parentId` -> `children`), scoped by `@@unique([tenantId, orgId, code])`.
   - `Warehouse` (`warehouses`): Physical inventory location nodes linked to organizations.
   - `Position` (`positions`): Organizational role nodes mapped to departments.

2. **Temporal Effective Dating & Hierarchy Versioning**:
   - `@kannan19302/shared/temporal`: Bi-temporal effective-dating engine (`effective-dating.ts`):
     - `assertValidInterval`: Enforces logical consistency (`validFrom < validTo`).
     - `validateNoOverlaps`: Prevents overlapping version slices for identical entity identities.
     - `resolveEffectiveAt`: Point-in-time entity state resolution at past, intermediate, and current dates.
     - `reconstructHierarchyAt`: Point-in-time recursive tree reconstruction across legal reorganizations.
     - `applyReorganizationSlice`: Manages reorganization transitions with automated prior-slice closure.

3. **Intercompany Accounting**:
   - `InterCompanyTransfer` (`inter_company_transfers`): Dual-organization transfer tracking with `fromOrgId` (`FromOrganization`) and `toOrgId` (`ToOrganization`), enforced under tenant isolation.

4. **Tenant & Data Isolation Proof**:
   - Every organizational table carries `tenant_id` and is enforced with PostgreSQL `ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY`.
   - Verified via `node scripts/check-rls-verify.mjs` against live PostgreSQL using the non-bypass role `unerp_api` (0 failures).

## Verification Evidence

- RLS universality and live PostgreSQL schema verification: **PASS (100%)**.
- Vitest suite `src/modules/saas/tests/organization-entitlements.spec.ts`: **PASS (4/4 tests green)**.
- Vitest suite `@kannan19302/shared` `src/temporal/effective-dating.test.ts`: **PASS (10/10 tests green)**.

