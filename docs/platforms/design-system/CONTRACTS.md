# Design Platform API, Data and Integration Contracts

- `DS-API-001`: Every API shall declare version, authentication, authorization, tenant scope, schemas and errors.
- `DS-API-002`: Long-running work shall return a durable operation identifier and queryable outcome.
- `DS-DATA-001`: Every persistent resource shall declare owner, tenant scope, lifecycle, retention and concurrency.
- `DS-INT-001`: Events shall include ID, type/version, tenant where applicable, aggregate, time, correlation and causation.
- `DS-INT-002`: Integrations shall define delivery, ordering, retry, deduplication, timeout and reconciliation.

Canonical failures include unauthenticated, forbidden, validation, conflict, rate limit, dependency unavailable and internal failure, all with safe correlation identifiers. Source-derived endpoint, schema and event inventories remain required before coverage is IMPLEMENTED.

## UI package compatibility contract

- `DS-PKG-001`: `@kannan19302/ui` is the Design Platform's published web contract. Applications shall consume
  documented subpath exports and semantic tokens rather than cross-repository source paths.
- `DS-PKG-002`: The current major evolves additively. Existing valid imports and documented token semantics remain
  valid until a major-version migration is approved and published.
- `DS-PKG-003`: Each release shall declare supported React/Next/runtime ranges, generated artifact provenance,
  consumer compatibility results, known debt, deprecations and rollback guidance.
- `DS-PKG-004`: A deprecation shall name its replacement, owner, registered consumers, compatibility window,
  removal criteria and usage evidence. A root export may be discouraged without being removed inside the major.
- `DS-PKG-005`: CSS token artifacts are side-effectful public assets. Their ordered layers shall produce the same
  typography and semantic roles whether consumed directly or through the supported aggregate stylesheet.

## Shell adaptation contract

Every application shell declares:

- `data-theme`: `meridian`, `meridian-dark` or `high-contrast` after preference resolution;
- `data-density`: `comfortable`, `standard` or `compact` after accessible resolution;
- `data-platform`: a registered platform identity such as `apps`;
- locale and direction;
- design-language compatibility version.

The shell may persist a user preference but shall render a deterministic server-safe fallback. Theme and density
do not alter authorization, business validation, tenant context or record scope.

## Cross-platform token contract

Generated clients consume semantic roles rather than web-specific selector or component names. At minimum the
contract covers surface, text, border, interaction, focus, status, typography, spacing, radius, elevation,
motion, density and platform identity. Generation is deterministic and the check mode fails when output differs
from its source or no expected target is discovered.

## Visual evidence contract

A visual record identifies component or route, source revision, viewport, theme, density, platform, direction and
state. Critical components and journeys use the complete required matrix; lower-risk stories may use a documented
pairwise matrix. Updating a baseline requires reviewed intent and may not hide a rendering or accessibility defect.
