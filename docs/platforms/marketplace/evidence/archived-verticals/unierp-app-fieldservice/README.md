> **Archive status:** Historical unierp-app-fieldservice repository document. Non-authoritative; retained as Marketplace/extension provenance only.

# unierp-app-fieldservice

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

[![CI](https://github.com/kannan19302/unierp-app-fieldservice/actions/workflows/ci.yml/badge.svg)](https://github.com/kannan19302/unierp-app-fieldservice/actions/workflows/ci.yml)
[![CodeQL](https://github.com/kannan19302/unierp-app-fieldservice/actions/workflows/codeql.yml/badge.svg)](https://github.com/kannan19302/unierp-app-fieldservice/actions/workflows/codeql.yml)
[![Contract](https://github.com/kannan19302/unierp-app-fieldservice/actions/workflows/contract.yml/badge.svg)](https://github.com/kannan19302/unierp-app-fieldservice/actions/workflows/contract.yml)
[![License: Proprietary](https://img.shields.io/badge/license-proprietary-lightgrey.svg)](LICENSE)

UniERP **Field Service** industry app — the reference implementation for poly-repo industry
extensions, living outside the core monorepo. Manages service tickets with SLA deadlines,
dispatches technicians from a live board, captures on-site checklists with signatures, and
schedules recurring preventative maintenance. Ships two artifacts:

- **`bundle/manifest.json`** — marketplace bundle (`runtime: declarative+service`), published to
  the UniERP marketplace. Install/uninstall is real-time; no core rebuild.
- **`src/`** — a standalone NestJS service with its **own database**. Core proxies
  `/api/v1/ext/field-service/*` to it through the extension gateway, attaching a signed
  tenant-context token per request (see
  [docs/EXTENSION_SERVICE_CONTRACT.md](https://github.com/kannan19302/ERPSys/blob/main/docs/EXTENSION_SERVICE_CONTRACT.md)
  in the core repo).

## Technology stack

NestJS 11 · Prisma · PostgreSQL (own database, `unierp_fieldservice`) · Docker

## Endpoints (behind the gateway)

`tickets`, `dispatches`, `checklists`, `preventative`, `dispatch/board`, `dispatch/assign`,
`dispatch/:id/status`, `dispatch/sla`, `dispatch/preventive-maintenance` — all under
`/api/v1/ext/field-service/` on core.

## Local development

```bash
npm install
npx prisma generate
# service DB on the shared dev Postgres (create once):
#   CREATE DATABASE unierp_fieldservice;
npx prisma migrate dev
EXT_SERVICE_JWT_SECRET=dev-ext-secret-change-me npm run dev   # listens on :4103
```

Or with core's dev network: `docker compose up -d` (joins the external `unierp` network).

Core needs `FIELD_SERVICE_SERVICE_URL=http://localhost:4103` (already the manifest default) and
the same `EXT_SERVICE_JWT_SECRET`. Health check: `GET /svc/health`.

| Script | Description |
|:---|:---|
| `pnpm dev` | Run the service locally |
| `pnpm typecheck` | TypeScript check |
| `pnpm bundle:validate` | Validate `bundle/manifest.json` against the marketplace schema |
| `pnpm test:contract` | Verify this service honors the extension gateway contract |
| `pnpm migrate:from-core` | One-time idempotent cutover of data from the core monorepo's tables |

## Cutover from core

`CORE_DATABASE_URL=... DATABASE_URL=... npm run migrate:from-core` — idempotent copy with
row-count verification.

## Deployment

Tag `v*` → Release workflow (legacy reference: `.github/workflows/release.yml`) builds/pushes the image to GHCR and
publishes the bundle to the marketplace via the vendor API.

## Security

Every request arrives through core's extension gateway with a signed, short-lived tenant-context
JWT — this service is not meant to be exposed directly to the public internet. See
SECURITY.md (legacy reference: `SECURITY.md`) to report a vulnerability.

## Contributing

See CONTRIBUTING.md (legacy reference: `CONTRIBUTING.md`). This project follows the
Code of Conduct (legacy reference: `CODE_OF_CONDUCT.md`).

## License

Proprietary — All rights reserved. See LICENSE (legacy reference: `LICENSE`).

## Contact

- **Issues**: [github.com/kannan19302/unierp-app-fieldservice/issues](https://github.com/kannan19302/unierp-app-fieldservice/issues)
- **Core repo**: [github.com/kannan19302/ERPSys](https://github.com/kannan19302/ERPSys)
- **Maintainer**: [@kannan19302](https://github.com/kannan19302)


