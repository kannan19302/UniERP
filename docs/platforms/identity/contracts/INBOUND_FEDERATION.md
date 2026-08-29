# Inbound Federation Contract

Owner: PLT-IAM. Tenant administrators configure the federation connection through the PLT-TAD security surface; only the canonical `SsoConfig` record is consumed by the Identity Platform.

## OIDC connection

- `issuerUrl` is required and identifies the exact OIDC issuer. It must be HTTPS, public, credential-free and non-local.
- The Identity Platform obtains authorization, token and JWKS locations from `{issuer}/.well-known/openid-configuration`; tenant-supplied endpoint URLs are not a source of runtime trust.
- Discovery metadata must repeat the exact configured issuer and its authorization, token and JWKS endpoints must be HTTPS, credential-free and non-local. Endpoint placement is trusted only through issuer metadata; production egress controls remain the network-level SSRF boundary.
- An authorization request uses `response_type=code`, a one-time opaque `state`, `nonce`, and S256 PKCE. The callback exchanges the code only with the stored verifier.
- A received ID token must use an allowed asymmetric algorithm and validate through the discovered JWKS. The Identity Platform requires exact issuer, configured client audience (and `azp` where required), expiry, issued-at age and the stored nonce before provisioning or session issuance.
- Invalid configuration, discovery, network, code, key, signature or claim data fails closed. Callers receive no raw token, upstream response or tenant-secret detail.

## Lifecycle and security

- Every new or edited connection is forced inactive and `UNVERIFIED`. The OIDC connection-test route validates the configured issuer, exact discovery metadata and a compatible identified signing key from JWKS, then records `VERIFIED`, `lastVerifiedAt` and the tenant administrator who ran the test. Failure records `FAILED`, clears prior verification and disables the connection. Activation rejects any record without current verification evidence.
- Administrative lifecycle routes are additive under `/saas-portal/security/sso/:providerType/{test,activate,deactivate}` and require `admin.security.update`. The older `/saas/sso` surface is a compatibility adapter over the same `SsoConfig` record and cannot report synthetic success.
- The connection test is a metadata/JWKS preflight, not proof of client credentials or a complete browser login. Production acceptance still requires a successful end-to-end federation exercise with the configured provider.
- OIDC client secrets use an authenticated AES-256-GCM envelope and are never returned by administrative reads. `SSO_CONFIG_ENCRYPTION_KEYS` is a JSON keyring of base64-encoded 32-byte keys and `SSO_CONFIG_ENCRYPTION_ACTIVE_KEY_ID` selects the write key. Reads accept retained previous keys during rotation; plaintext, unknown-key and tampered envelopes fail closed.
- Endpoint trust is defense in depth. Production networking must also deny federation egress to private, loopback, link-local and metadata addresses through an approved egress control.
- Federation configuration changes, connection tests, activation, key rotation, login success/failure and JIT provisioning require immutable audit events. Durable audit/outbox implementation remains tracked by FND-P0-006.
- `TenantSsoConfig` is a legacy duplicate and is no longer consumed by active SSO administration, identity or feature-adoption code. Its table is retained pending an explicitly authorized data migration/drop; no new feature may read or write it.

## Compatibility

The callback endpoints remain additive. Migration `20260829010000_sso_connection_verification` disables existing connections and requires authorized tenant administrators to re-save plaintext legacy credentials into encrypted envelopes, run connection preflight and reactivate. Configurations without a compliant issuer do not authenticate users.
