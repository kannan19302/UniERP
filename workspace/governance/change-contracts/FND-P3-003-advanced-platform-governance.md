# Change Contract — FND-P3-003 Advanced Platform Governance

## Cycle status

- Status: `PARTIAL` (Extension API versioning [1.0.0] and compatibility windows passing; extension marketplace sandboxing, escape/egress controls, and fine-grained capability licensing in progress)
- Objective: enforce extension API contract versioning, sandbox isolation, and capability licensing.
- Risk class: `R2` — extension safety and API contract compatibility.
- Accountable platforms: Developer Platform (`PLT-DEV`).

## Delivered Invariants

1. **Extension API Contract Versioning**:
   - `check-extension-api-contract.mjs`: Asserts canonical extension API contracts in `@kannan19302/extension-api` (`CANONICAL_EXTENSION_API_VERSIONS = ['1.0.0']`).
   - Confirms backward-compatible contract resolution for extensions within their window and fails retired/unsupported versions.
2. **Sandbox Isolation**:
   - `sandbox` repository isolates untrusted extension scripts from host resources.

## Verification Evidence

```bash
pnpm -C d:\UniERP\extension-api run build
node scripts/check-extension-api-contract.mjs
```
Extension API build and contract compatibility gates pass cleanly.
