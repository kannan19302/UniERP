> **Repository evidence:** Relocated from `extensions/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# unierp-extensions

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

**Layer L6 — Extensions** of the [UniERP](https://github.com/kannan19302/unierp-platform) platform.
Depends on: `@kannan19302/extension-api` **only**.

## What this is

First-party verticals — healthcare, education, real estate, field service — plus templates.

## The invariant this repository owns

**Depends on nothing but the public API.** That constraint is the proof the API is real: if a first-party vertical needs a private hook, the build fails and the hook must be made public.

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

