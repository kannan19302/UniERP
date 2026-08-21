# Design Platform Architecture and TRD

## Boundary

This platform owns tokens, themes, density, components, accessibility semantics, form/list/dashboard patterns, visual regression and application framework primitives. It consumes other platforms only through published contracts; repository proximity or direct imports do not transfer ownership.

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

Primary implementation: `design-system`, `storybook`, `framework`.

Inspected evidence: Design system has 200 implementation files/30 tests; Storybook 8/3 visual tooling; framework 22/3 with API client, navigation, permissions and provider context.

Current risk: Two accessibility Markdown documents already exist and may conflict; consumer adoption and visual/accessibility coverage across platforms are not yet measured.

