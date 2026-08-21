> **Migration status:** Legacy policy evidence. Normative compatibility requirements are in `docs/standards/API_COMPATIBILITY.md`; implementation and telemetry claims here are unverified.

# API Versioning Policy

> **Canonical document.** Per `PLATFORM_ARCHITECTURE.md § 9`, deprecation requires a `Sunset` header,  
> 12 months' notice, telemetry proving no active caller, **and an entry in this file**.  
> Two majors supported concurrently, maximum.

## Current API Versions

| API Surface   |       Current Major       | Previous Major | Status                            |
| :------------ | :-----------------------: | :------------: | :-------------------------------- |
| Tenant Plane  |         `/api/v1`         |       —        | Active                            |
| Control Plane |    `/api/platform/v1`     |       —        | Active                            |
| Extension API | `@kannan19302/extension-api` v1 |       —        | Active — 3-year support guarantee |

## Versioning Rules

1. **URL-versioned major:** `/api/v1`, `/api/platform/v1`. Additive-only within a major.
2. **Maximum two majors concurrent.** When `v3` ships, `v1` enters end-of-life with 12 months' notice.
3. **Breaking changes require a new major** — never introduced within a major.
4. **Every deprecation MUST have all four of:**
   - A `Sunset` header on the deprecated endpoint: `Sunset: <date>`
   - 12 months' minimum notice in this file
   - Telemetry evidence that no active caller remains
   - An entry in the Deprecated Endpoints table below

## Compatibility Windows

| Boundary                          | Window                                             |
| :-------------------------------- | :------------------------------------------------- |
| `@kannan19302/extension-api` (public)   | 3 years support, 12 months deprecation notice      |
| `@unierp/sdk` ↔ API major         | 2 majors concurrent                                |
| `@kannan19302/contracts` ↔ `unierp-api` | Same train ± 1                                     |
| `@kannan19302/database` ↔ `unierp-api`  | Migration backward-compatible for one full train   |
| Internal L0/L1 packages           | Same train; may break between trains subject to M2 |

## Deprecated Endpoints

| Endpoint | Deprecated In | Sunset Date | Replacement | Active Callers (telemetry) |
| :------- | :-----------: | :---------: | :---------- | :------------------------- |
| (none)   |       —       |      —      | —           | —                          |

## Process: Adding a Deprecation

1. Add the `Sunset: <date>` header to the deprecated endpoint handler
2. Verify via telemetry (Grafana: `http_requests_total{path="<endpoint>"}`) that callers are notified
3. Confirm active caller count drops to zero in the 12-month window
4. Add an entry to the table above with: endpoint, train version, sunset date, replacement, caller count
5. Open a PR to this file — CI verifies the sunset date is at least 12 months in the future

## Extension API Compatibility

The extension API compatibility promise is the contract that makes the marketplace safe:

> An extension built against `extension-API v1` runs unmodified on every platform release for the life of `v1` — minimum 3 years' support, 12 months' deprecation notice.

A CI job replays the reference extension corpus (`real-estate`, `education`, `healthcare`, `field-service`) against every platform build. A break is a release blocker.

