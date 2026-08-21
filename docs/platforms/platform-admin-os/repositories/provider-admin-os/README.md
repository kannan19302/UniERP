> **Repository evidence:** Relocated from `provider-admin-os/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# unierp-console

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

**Layer L4** of the UniERP layered repository architecture
(`PLATFORM_ARCHITECTURE.md` § 4.2). Publishes container image.

## Why it is its own repository

Platform Admin Console. A separate repository reinforces the trust boundary: console code cannot accidentally import a tenant component, and after this split tenant-plane code cannot link against control-plane handlers at all (§ 1.2).

## The invariant

**A repository may depend only on published artifacts of a strictly lower
layer. Never sideways within a layer. Never upward.** A cycle is not
discouraged — it is unrepresentable, because the lower layer's package cannot
name the higher one.

## Extraction status

Extracted from the `ERPSys` monorepo as § 14 Phase 3, with history preserved
via `git-filter-repo`.

**The monorepo copy remains authoritative.** Consumers switch to published
packages only once those packages are publishable; the monorepo stays buildable
at each extraction tag until they do. Rollback is a one-line `pnpm` override
pointing consumers back at the workspace path.

## Building a container image

This repository has never carried a `Dockerfile`, and that is currently correct
rather than an oversight.

**The image is built from `ERPSys`**, which remains the authoritative build
until § 14 Phase 3 step 4 completes:

```bash
docker compose -f docker-compose.dev.yml --profile console up -d console
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

