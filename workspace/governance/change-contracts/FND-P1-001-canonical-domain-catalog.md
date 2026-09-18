# Change Contract — FND-P1-001 Canonical Enterprise Domain Catalog

## Cycle status

- Status: `PARTIAL` (Canonical enterprise domain catalog, architecture maps, and 33 AST-derived module orientation specifications formalized and verified)
- Objective: establish canonical bounded contexts, domain ownership, module dependency graphs, event flows, and orientation specifications across all active business services without documentation drift.
- Risk class: `R2` — cross-module boundary governance and domain model clarity.
- Accountable platforms: Data and Business Services (`PLT-DATA`, `PLT-BIZ`).

## Delivered Artifacts & Gates

1. **Automated Drift-Proof Architecture Maps & Domain Catalog (`unierp-workspace/docs/architecture/`)**:
   - `canonical-domain-catalog.md`: Authoritative bounded contexts, primary aggregate roots, and cross-boundary SoR translation matrix.
   - `module-dependency-graph.md`: Static import dependency tracking across all 33 business modules in `api/src/modules`.
   - `event-flow.md`: Cross-module event emission (`.emit(...)`) to handler (`@OnEvent(...)`) catalog.
   - `permission-matrix.md`: Consolidated route-level `@Permissions(...)` authority mappings across all modules.
   - `repo-layer-graph.md`: Declared dependency graph across all 31 polyrepo packages.
   - Verified via `node scripts/generate-architecture-maps.mjs --check`.

2. **Module Orientation Catalog (`unierp-workspace/docs/module-orientation/`)**:
   - 33 dedicated domain module specifications generated directly from AST inspection:
     - Entities owned (Prisma models referenced)
     - Emitted events and consumed event listeners
     - Required permissions
     - Total controller endpoints
     - Invariant specifications
   - Verified via `node scripts/generate-module-orientation.mjs --check`.

3. **Active Domain Model Traceability**:
   - Every active model in `data/prisma/schema/*.prisma` is mapped to an owning domain module or foundational platform entity.
   - Zero undocumented or unowned business modules in the active estate.

## Verification

```bash
node scripts/generate-architecture-maps.mjs --check
node scripts/generate-module-orientation.mjs --check
```
Both verification commands run in CI and fail if committed documentation diverges from current source code.
