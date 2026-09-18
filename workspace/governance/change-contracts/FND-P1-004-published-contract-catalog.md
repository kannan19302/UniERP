# Change Contract — FND-P1-004 Published Contract Catalog

## Cycle status

- Status: `PARTIAL` (Canonical contracts in @kannan19302/contracts published and control-center manifests verified; full boundary inventory and provider/consumer contract testing in progress)
- Objective: publish single source of truth for versioned API contracts, event families, webhook schemas, idempotency tokens, error envelopes, and control-center manifests.
- Risk class: `R2` — cross-package contract governance and external interface compatibility.
- Accountable platforms: Business Services and Developer Platform (`PLT-BIZ`, `PLT-DEV`).

## Delivered Artifacts & Gates

1. **Published Contracts Package (`@kannan19302/contracts`)**:
   - `errors.ts`: RFC 7807 problem details error envelopes.
   - `api-versioning.ts`: RFC 9745 (`Deprecation`) and RFC 8594 (`Sunset`) versioning policy.
   - `pagination.ts`: Canonical cursor and offset pagination schemas.
   - `idempotency.ts`: Idempotency keys and replay protection tokens.
   - `outbox.ts`: Standardized versioned event schemas.
   - `webhook-contracts.ts`: HMAC SHA-256 payload signing and verification.
   - `control-centers.ts`: Provider Control Center (PCC) and Operations Control Center (OCC) catalogs.

2. **Verification Gates**:
   - `npm run check:control-centers`: 44 applications, 278 uniquely owned resource kinds, 44 uniquely owned event families verified.
   - `npm run check:control-center-contracts`: Release harness verified across endpoint fixtures, event fixtures, consumers, and seeded failure cases.
   - `npm run check:control-center-manifests`: Complete 22-app PCC and OCC manifests verified with ownership invariants.
   - `pnpm build`: Clean TypeScript compilation with 0 diagnostics.
