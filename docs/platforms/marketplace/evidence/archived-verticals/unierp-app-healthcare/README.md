> **Archive status:** Historical unierp-app-healthcare repository document. Non-authoritative; retained as Marketplace/extension provenance only.

# unierp-app-healthcare

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

[![CI](https://github.com/kannan19302/unierp-app-healthcare/actions/workflows/ci.yml/badge.svg)](https://github.com/kannan19302/unierp-app-healthcare/actions/workflows/ci.yml)
[![CodeQL](https://github.com/kannan19302/unierp-app-healthcare/actions/workflows/codeql.yml/badge.svg)](https://github.com/kannan19302/unierp-app-healthcare/actions/workflows/codeql.yml)
[![Contract](https://github.com/kannan19302/unierp-app-healthcare/actions/workflows/contract.yml/badge.svg)](https://github.com/kannan19302/unierp-app-healthcare/actions/workflows/contract.yml)
[![License: Proprietary](https://img.shields.io/badge/license-proprietary-lightgrey.svg)](LICENSE)

UniERP **Healthcare** industry app — extracted from the core monorepo. Enterprise EHR/HIS/RCM
suite: clinical charting, CPOE, e-Rx, labs, inpatient ADT, revenue cycle, patient engagement,
analytics, and FHIR interoperability. Ships a marketplace bundle (`bundle/manifest.json`, runtime
`declarative+service`) and a standalone NestJS service with its own database
(`unierp_healthcare`). Core proxies `/api/v1/ext/healthcare/*` to it via the extension gateway.

Part of the [UniERP](https://github.com/kannan19302/ERPSys) poly-repo — see
[docs/EXTENSION_SERVICE_CONTRACT.md](https://github.com/kannan19302/ERPSys/blob/main/docs/EXTENSION_SERVICE_CONTRACT.md)
in the core repo for the gateway contract, and `unierp-app-fieldservice` as the reference
implementation.

## Technology stack

NestJS 11 · Prisma · PostgreSQL (own database, `unierp_healthcare`) · Docker

## Local development

```bash
pnpm install && npx prisma generate
# CREATE DATABASE unierp_healthcare;  (on the shared dev Postgres)
npx prisma migrate dev
EXT_SERVICE_JWT_SECRET=dev-ext-secret-change-me npm run dev   # :4104
```

| Script | Description |
|:---|:---|
| `pnpm dev` | Run the service locally |
| `pnpm typecheck` | TypeScript check |
| `pnpm bundle:validate` | Validate `bundle/manifest.json` against the marketplace schema |
| `pnpm test:contract` | Verify this service honors the extension gateway contract |
| `pnpm migrate:from-core` | One-time idempotent cutover of data from the core monorepo's tables |

Publish bundle: `UNIERP_API_URL=http://localhost:3001 node scripts/publish-bundle.mjs`

## Deployment

Tag `v*` → Release workflow (legacy reference: `.github/workflows/release.yml`) builds/pushes the image to GHCR and
publishes the bundle to the marketplace via the vendor API. Core needs
`HEALTHCARE_SERVICE_URL=http://<this-service>:4104` and the shared `EXT_SERVICE_JWT_SECRET`.
Health check: `GET /svc/health`.

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

- **Issues**: [github.com/kannan19302/unierp-app-healthcare/issues](https://github.com/kannan19302/unierp-app-healthcare/issues)
- **Core repo**: [github.com/kannan19302/ERPSys](https://github.com/kannan19302/ERPSys)
- **Maintainer**: [@kannan19302](https://github.com/kannan19302)


