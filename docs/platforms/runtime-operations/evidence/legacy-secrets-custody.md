> **Migration status:** Legacy secrets procedure; current security baseline is normative and environment-specific mechanisms require verification.

# SECRETS-CUSTODY.md — Secrets & Key Management Architecture

> **PLATFORM_ARCHITECTURE § 8 & TRD § 9 / Phase A24 / G-21**

## 1. Central Secret Store & Custody Policy

In production, no application component reads secrets from repository source files, Docker image layers, or environment files (`.env`).

1. **Identity & Secret Injection**: Applications authenticate via OIDC (Kubernetes Service Account / AWS IAM Roles Anywhere) to fetch secrets dynamically at runtime from AWS Secrets Manager / HashiCorp Vault into memory.
2. **Zero In-Repo Credentials**: The CI gate `node scripts/ci/check-secrets.mjs --all` blocks any committed API keys, tokens, or private key blocks.
3. **No Process Listing Exposure**: Secrets are passed via in-memory secure context rather than CLI arguments or unmasked environment variables visible to `ps aux`.

## 2. Key Rotation Protocol

Secret rotation is automated and executed on a 90-day cadence or immediately upon any suspected compromise.

| Secret Class | Rotation Mechanism | Dual-Key Grace Period | Automation Script |
| :--- | :--- | :--- | :--- |
| **JWT Signing Keys** | Asymmetric RSA/ECDSA keypair rotation | 24 Hours | `scripts/rehearse-secret-rotation.mjs` |
| **Database Credentials** | PostgreSQL password rotation via Vault plugin | 1 Hour | `scripts/rehearse-secret-rotation.mjs` |
| **PII Encryption Keys** | Master envelope key rotation | Instant (re-encrypting data keys) | `scripts/rehearse-secret-rotation.mjs` |

## 3. Rotation Rehearsal

To rehearse secret rotation on demand:
```bash
node scripts/rehearse-secret-rotation.mjs
```
The script generates synthetic keypairs, simulates secret promotion, asserts dual-key verification during grace period, and verifies `check-secrets.mjs` remains clean throughout.

