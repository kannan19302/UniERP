# Change Contract — FND-P1-005 Shared Capability Convergence

## Cycle status

- Status: `PARTIAL` (Numbering, temporal wrapper, capability registry, permissions, and blocks converged in @kannan19302/shared with 116 passing tests; approvals, notifications, files, search, reporting, config, entitlements, scheduler, import/export, and billing/metering convergence in progress)
- Objective: converge cross-cutting platform engines (numbering, permissions, temporal workflows, capabilities, blocks, auth guards) into single owned runtimes within `@kannan19302/shared`.
- Risk class: `R2` — platform shared primitives across frontend and backend services.
- Accountable platforms: Service Kit and Shared Platform (`PLT-KIT`, `PLT-SHR`).

## Delivered Capabilities & Converged Runtimes

1. **Document Numbering Engine (`src/numbering/numbering.service.ts`)**:
   - Deterministic sequence generation, fiscal year and org prefixes, zero-padded serial numbers.
   - Verified with 15/15 tests covering sequence gaps, concurrency, and rollover.

2. **Temporal & Workflow Engine (`src/temporal/`)**:
   - Standardized client wrapper and task queue orchestration for long-running workflows.

3. **Capability & Plugin Registry (`src/capability-registry/`)**:
   - Central registry for dynamic ERP capabilities, service endpoints, and health probes.

4. **Permission & Role Matrix (`src/utils/permission-matrix.ts`, `control-plane-roles.ts`)**:
   - Formalized 24-permission taxonomy, tenant vs control-plane role separation, and route guard integration.

5. **Blocks & UI Schema Engine (`src/blocks/`)**:
   - Declarative form and grid schema validation schemas using Zod.

## Verification

```bash
pnpm -C d:\UniERP\shared run build
pnpm -C d:\UniERP\shared test
```
- **14/14 test files passed (116/116 tests green)**.
- **TypeScript build passes with 0 diagnostics**.
