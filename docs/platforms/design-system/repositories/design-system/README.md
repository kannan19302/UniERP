> **Repository evidence:** Relocated from `design-system/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# unierp-design-system

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

**Layer L1 — Foundation** of the [UniERP](https://github.com/kannan19302/unierp-platform) platform.
Depends on: nothing in the workspace.

## What this is

Tokens → theme → components → charts → data grid → forms → workflow, plus Storybook. Consumed by three frontends and by partner extensions.

## The invariant this repository owns

**No dependency on the API or the database.** That is what makes "a UI component cannot import a service" structural rather than a lint rule. It is one package with subpath exports, not fourteen — publishing fourteen would create 42 version-coherence problems per release.

## The rule that applies everywhere

A repository may depend only on published artifacts of a **strictly lower
layer** — never sideways within a layer, never upward. A cycle is not
discouraged; it is unrepresentable, because the lower layer's package cannot
name the higher one.

See the [platform overview](https://github.com/kannan19302/unierp-platform) for the full map, and
[`PLATFORM_ARCHITECTURE.md`](https://github.com/kannan19302/unierp-workspace) § 4.2 for
the reasoning.

## Licence

AGPL-3.0.

