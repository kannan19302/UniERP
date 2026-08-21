> **Repository evidence:** Relocated from `shared/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# unierp-shared

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

**Layer L1 — Foundation** of the [UniERP](https://github.com/kannan19302/unierp-platform) platform.
Depends on: L0.

## What this is

Cross-cutting types, validators, constants, the permission registry and outbox contracts.

## The invariant this repository owns

`hasPermission` lives here. It refuses to let a tenant-scoped grant — including a bare `*` — satisfy a control-plane permission. That refusal closed a confirmed escalation.

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

