> **Repository evidence:** Relocated from `config/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# unierp-config

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

**Layer L1 — Foundation** of the [UniERP](https://github.com/kannan19302/unierp-platform) platform.
Depends on: nothing.

## What this is

Shared TypeScript and Prettier configuration.

## The invariant this repository owns

Every repo extends this rather than copying it. A hand-copied config is how the Dockerfile bug of § 1.1 propagated to four repositories and was fixed three separate times.

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

