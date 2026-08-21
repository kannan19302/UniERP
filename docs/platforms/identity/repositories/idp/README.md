> **Repository evidence:** Relocated from `idp/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# unierp-idp

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

**Layer L3 — Service** of the UniERP platform. Depends on: L0, L1, L2.

## What this is

The identity provider. Issues and validates sessions for each plane.

## The invariant this repository owns

**Separate realms per plane (§ 5.2).** No customer identity can obtain a control-plane token, because the realm is separate — not because a claim is checked.

## The rule that applies everywhere

A repository may depend only on published artifacts of a **strictly lower
layer** — never sideways within a layer, never upward. A cycle is not
discouraged; it is unrepresentable, because the lower layer's package cannot
name the higher one.

## Licence

AGPL-3.0.

## Building a container image

A `Dockerfile` used to sit at the root of this repository. It was a copy of the
monorepo image, `COPY`ing `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `apps/` and
`packages/` — four paths that have never existed here — so it failed on its
first instruction. `unierp-idp` carried the API image verbatim, header comment
included. It has been removed rather than left in place: a Dockerfile at a
repository root asserts that `docker build .` works, and this one never could.

**The image is built from `ERPSys`**, which remains the authoritative build
until § 14 Phase 3 step 4 completes:

```bash
docker compose -f docker-compose.dev.yml --profile idp up -d idp
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

