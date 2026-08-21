> **Repository evidence:** Relocated from `extension-api/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# unierp-extension-api

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

**Layer L2 — Runtime** of the [UniERP](https://github.com/kannan19302/unierp-platform) platform.
Depends on: L0, L1.

## What this is

The public contract customer code compiles against: manifest schema, extension points, capability scopes, resource budgets, signed-bundle format.

## The invariant this repository owns

**3 years' support, 12 months' deprecation notice.** Its own repository because that promise outlives any platform release. Scopes are the intersection of what the manifest requests and what the installing admin actually holds — an extension can never exceed its installer.

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

