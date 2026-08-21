> **Repository evidence:** Relocated from `sandbox/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# unierp-sandbox

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

**Layer L2 — Runtime** of the [UniERP](https://github.com/kannan19302/unierp-platform) platform.
Depends on: L0, L2.

## What this is

The capability-scoped V8 isolate that runs Tier-3 extension code and Studio scripts.

## The invariant this repository owns

**No ambient authority.** No `process`, no `require`, no `fetch`, no filesystem — the identifiers do not exist. Every host capability re-checks its scope on the host side, because a capability handed in is not a capability trusted. Its own repository so the isolation contract is reviewable independently of what runs inside it.

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

