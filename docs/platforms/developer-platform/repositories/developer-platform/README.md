> **Repository evidence:** Relocated from `developer-platform/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# unierp-developer

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

**Layer L4 — Presentation** of the UniERP platform. Depends on: the SDK and the design system.

## What this is

The developer platform: App Studio, the workflow/form/report builders, and the surface where a tenant creates or edits business logic and content without touching core source.

## The invariant this repository owns

**Everything it offers must go through the public extension API.** If Studio needs a privileged path that an external developer cannot use, the platform has two APIs and only one of them is honest.

## The rule that applies everywhere

A repository may depend only on published artifacts of a **strictly lower
layer** — never sideways within a layer, never upward. A cycle is not
discouraged; it is unrepresentable, because the lower layer's package cannot
name the higher one.

## Licence

AGPL-3.0.

## Building a container image

This repository has never carried a `Dockerfile`, and that is currently correct
rather than an oversight.

**The image is built from `ERPSys`**, which remains the authoritative build
until § 14 Phase 3 step 4 completes:

```bash
docker compose -f docker-compose.dev.yml --profile developer up -d developer
```

This repository cannot yet build its own image. Its `package.json` still
resolves `@kannan19302/*` through `workspace:*` specifiers, which name nothing
outside the monorepo, and its scripts reach for `../../scripts/*`. Extraction
copied the tree faithfully; it did not make the tree standalone, and § 14 is
explicit that the monorepo stays buildable until every consumer has switched.

What unblocks a per-repo image is a package registry that CI can reach. The
self-hosted Verdaccio in `unierp-infra/registry/` answers on localhost only,
which is why the first cutover was reverted (`ERPSys` a96069e6): every
`pnpm install --frozen-lockfile` on a runner resolved `@kannan19302` against the
runner's own localhost and failed.

Shared services — PostgreSQL, Redis, MinIO — come from
[`unierp-infra`](https://github.com/kannan19302/unierp-infra):
`docker compose -f docker-compose.dev.yml up -d`.

