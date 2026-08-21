> **Archive status:** Historical unierp-app-healthcare repository document. Non-authoritative; retained as Marketplace/extension provenance only.

# Security Policy

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Report suspected vulnerabilities privately via GitHub Security Advisories (legacy reference: `../../security/advisories/new`)
for this repository.

Include, where possible: affected endpoint/version or commit SHA, steps to reproduce, impact
assessment (data exposure, tenant isolation bypass, etc.), and any suggested remediation.

## Scope

This service handles the **Healthcare** industry extension for [UniERP](https://github.com/kannan19302/ERPSys).
It is reached exclusively through core's extension gateway (`/api/v1/ext/healthcare/*`), authenticated by a
signed, short-lived tenant-context JWT (`EXT_SERVICE_JWT_SECRET`) — it is not meant to be exposed directly
to the public internet. In scope: this repository's code and `Dockerfile`/`docker-compose.yml`. Out of
scope: the core UniERP gateway itself (report there) and upstream dependencies (report to Dependabot's
upstream advisory instead).

## Supported Versions

Only the latest commit on `main` receives security fixes; there are no long-lived release branches.

## Our Practices

- Dependency scanning: Dependabot (weekly)
- Static analysis: CodeQL on every push/PR to `main`
- Secret scanning: GitHub secret scanning + push protection enabled
- Every request is tenant-scoped via the signed gateway token — see `docs/EXTENSION_SERVICE_CONTRACT.md`
  in [ERPSys](https://github.com/kannan19302/ERPSys) for the full contract.


