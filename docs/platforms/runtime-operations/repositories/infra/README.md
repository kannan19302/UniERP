> **Repository evidence:** Relocated from `infra/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# unierp-infra

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

**Layer L7 — Operations** of the [UniERP](https://github.com/kannan19302/unierp-platform) platform.
Depends on: manifests only.

## What this is

Compose stacks, Kubernetes overlays, the control-plane ingress, the package registry, Grafana dashboards, alerts and runbooks.

## The invariant this repository owns

An alert without a runbook fails CI. Environments are overlays, not repositories — splitting infrastructure from infrastructure is how the manifest and the app come to disagree.

## The rule that applies everywhere

A repository may depend only on published artifacts of a **strictly lower
layer** — never sideways within a layer, never upward. A cycle is not
discouraged; it is unrepresentable, because the lower layer's package cannot
name the higher one.

See the [platform overview](https://github.com/kannan19302/unierp-platform) for the full map, and
[`PLATFORM_ARCHITECTURE.md`](https://github.com/kannan19302/unierp-workspace) § 4.2 for
the reasoning.

## Local Docker Services & Ports

Run the complete platform stack locally with:

```bash
docker compose -f docker-compose.dev.yml -f docker-compose.platform.yml up -d --build
```

| Service | Container Name | Host Port | Description |
| :--- | :--- | :--- | :--- |
| **Tenant Portal** | `unerp-web` | `3000` | Tenant Admin Portal (`unierp-web`) |
| **API Backend** | `unerp-api` | `3001` | Modular Monolith REST API (`unierp-api`) |
| **Platform Console** | `unerp-console` | `3002` | Platform Admin Console (`unierp-console`) |
| **Marketing Site** | `unerp-marketing` | `3003` | Corporate Website (`unierp-corporate-website`) |
| **Developer Portal** | `unerp-developer` | `3004` | App Studio & Builder Portal (`unierp-developer`) |
| **Identity Provider** | `unerp-idp` | `3005` | Auth & Identity Provider (`unierp-idp`) |
| **Storybook** | `unerp-storybook` | `6006` | UI Design System Catalog (`unierp-storybook`) |
| **Mobile Client** | `unerp-mobile` | `3006` | Flutter Web Client (`unierp-mobile`) |
| **PostgreSQL** | `unerp-postgres` | `5432` | Primary Database (+pgvector) |
| **Redis** | `unerp-redis` | `6379` | Cache & BullMQ Queues |
| **MinIO** | `unerp-minio` | `9000 / 9001` | S3 Storage & Admin Console |

## Licence

AGPL-3.0.

