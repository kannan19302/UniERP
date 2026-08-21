# API and Event Compatibility Standard

## Inspected baseline

The legacy policy declares `/api/v1` for tenant APIs, `/api/platform/v1` for control APIs,
`@kannan19302/extension-api` v1, additive-only changes within a major, at most two concurrent API majors,
12 months' deprecation notice and a three-year public extension-API support goal. Contracts source includes an
API version lifecycle type. Enforcement and telemetry claims remain `UNVERIFIED`.

## Requirements

- `STD-API-001`: Breaking HTTP, event, SDK or extension changes shall use a new major contract version.
- `STD-API-002`: Additive changes shall preserve existing valid requests and documented response semantics.
- `STD-API-003`: Deprecation shall publish replacement, announcement date, earliest sunset, affected consumers and usage evidence.
- `STD-API-004`: Retired HTTP endpoints shall emit standards-compliant deprecation/sunset metadata before removal.
- `STD-API-005`: Event consumers shall tolerate unknown additive fields and reject unsupported major versions safely.
- `STD-API-006`: Published packages shall declare compatibility ranges and provide migration guidance.
- `STD-API-007`: A compatibility promise is IMPLEMENTED only when consumer/provider tests and release gates prove it.

## Current compatibility policy requiring verification

| Boundary | Declared policy | Evidence status |
| --- | --- | --- |
| Tenant/control HTTP APIs | maximum two majors; 12-month notice | UNVERIFIED |
| Public extension API | minimum three-year support; 12-month notice | PARTIAL: versioned types exist; replay gate unverified |
| Contracts ↔ API | same release train ±1 | UNVERIFIED |
| Database ↔ API | backward-compatible migration for one train | UNVERIFIED |

No endpoint is recorded as deprecated in the inspected legacy table. That absence does not prove none exists.
