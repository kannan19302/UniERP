> **Archive status:** Historical unierp-app-healthcare repository document. Non-authoritative; retained as Marketplace/extension provenance only.

# Contributing to unierp-app-healthcare

This repository is source-available under an all-rights-reserved LICENSE (legacy reference: `LICENSE`). Contributions
are welcome from authorized collaborators.

## Before you start

This service implements the **Healthcare** industry extension for [UniERP](https://github.com/kannan19302/ERPSys).
Read `docs/EXTENSION_SERVICE_CONTRACT.md` in that repo first — every endpoint here must honor the
signed tenant-context token contract described there.

## Development setup

See README § Local development (legacy reference: `README.md#local-development`).

## Branching & commits

- Branch from `main`: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/).

## Before opening a PR

```bash
pnpm typecheck
pnpm bundle:validate
pnpm test:contract
```

CI (.github/workflows/ci.yml (legacy reference: `.github/workflows/ci.yml`)) runs the same checks plus a Docker build —
must be green before merge. CODEOWNERS (legacy reference: `.github/CODEOWNERS`) auto-requests review.

## Code of Conduct

This project follows the Code of Conduct (legacy reference: `CODE_OF_CONDUCT.md`).


