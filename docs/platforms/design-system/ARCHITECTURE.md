# Design Platform Architecture and TRD

## Boundary

This platform owns tokens, themes, density, components, accessibility semantics, form/list/dashboard patterns, visual regression and application framework primitives. It consumes other platforms only through published contracts; repository proximity or direct imports do not transfer ownership.

Tenant Apps owns business workflow composition and domain meaning. Design Platform owns reusable presentation,
interaction and accessibility behavior. A UI control may reflect an authorization result but never establishes
provider, tenant, permission or record authority.

## Meridian Workbench architecture

```text
authoritative token model
  -> generated CSS / mobile / desktop token artifacts
  -> theme + density + platform identity contract
  -> headless behavior and accessibility primitives
  -> styled controls
  -> enterprise data, form and workflow composites
  -> workspace floorplans and shells
  -> framework/application adapters
  -> tenant, provider, developer, marketplace, sites, mobile and desktop clients

Storybook + conformance inventory + token/density/a11y/visual gates observe every supported layer.
```

### Layer 1 — authoritative tokens

One structured token source owns primitive, semantic, component and pattern values. Generated artifacts are
deterministic and checked into or published from their owning build according to repository policy. Theme,
density, direction and platform identity are orthogonal axes; import order must not redefine semantic typography
or colour roles.

### Layer 2 — behavior primitives

Headless behavior owns keyboard interaction, focus, selection, disclosure, sorting announcements, overlay
lifecycle and recovery semantics. It does not fetch business data or make authorization decisions.

### Layer 3 — styled controls

Controls bind semantic tokens and behavior primitives. Every public component has typed props, scoped styles,
stories, behavioral/accessibility tests and a local export according to repository policy.

### Layer 4 — enterprise composites

Data grids, trees, filter builders, bulk actions, money/quantity inputs, validation summaries, audit history and
approval presentations compose lower layers. They accept bounded data and application callbacks rather than
calling domain services directly.

### Layer 5 — floorplans

Data, Record, Transaction, Operational, Planning, Settings and Studio workspaces own responsive composition and
supported UI states. Existing shells and templates converge into these contracts; a second parallel set is not
created when semantics already match.

### Layer 6 — adapters

Framework and application adapters connect platform identity, theme, density, locale, direction, user preference
and permission results. Shared server-rendered shells use explicit package subpaths so client boundaries do not
depend on a root star-export barrel.

### Layer 7 — conformance and evidence

Storybook is the component workshop. Generated inventories enumerate package exports, registered components,
stories and application routes. Gates fail on zero discovery, unsupported token literals, missing density axes,
new accessibility debt or a stale visual matrix.

## Package contract

The target public groups are tokens/theme, primitives, forms/inputs, data/data-display, patterns/blocks,
shells/layout, studio and testing. Existing subpath names remain compatible during the current major. The root
entry point is a compatibility bridge, not the recommended server-rendered integration path.

Deprecation records name an owner, replacement, affected consumers, compatibility window, removal criteria and
observed migration evidence. Breaking default, export or semantic changes require a new major and explicit human
approval.

## Density resolution

Density resolves in this order: accessible device/input constraint; explicit user preference; workspace default;
platform default; standard fallback. A nested floorplan may recommend a density but cannot silently override a
user accessibility need. Row, header, toolbar, filter and pagination geometry are governed as one density family.

## Rollout and rollback

Applications adopt Meridian Workbench at their shared shell under a versioned design-language flag. The additive
release retains current theme/token aliases and package subpaths. Rollback restores the preceding shell setting
and token entry point without data migration. Package publication, deployment and legacy-major removal remain
separately authorized actions.

## Required design views

- actor, tenant and provider trust zones;
- owned resources and lifecycle state machines;
- synchronous APIs, events and integration dependencies;
- persistent data ownership and retention;
- failure, retry, idempotency and reconciliation paths;
- deployment topology, scaling and recovery;
- implementation-to-test evidence.

## Architecture rules

Business invariants execute in authoritative services, authorization is server-side, tenant context is verified rather than client-trusted, and asynchronous effects carry correlation/causation. Shared behavior is consumed from its owning platform rather than copied.

Primary implementations are `design-system`, `storybook` and `framework`; current observations and proof gaps are
maintained in [traceability](TRACEABILITY.md) rather than copied into this architecture.
