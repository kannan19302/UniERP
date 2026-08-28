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

- A connection is inactive until an administrator validates it through a dedicated connection test and records the result. That lifecycle is not fully implemented yet; an active record without a usable issuer is rejected at runtime.
- Endpoint trust is defense in depth. Production networking must also deny federation egress to private, loopback, link-local and metadata addresses through an approved egress control.
- Federation configuration changes, connection tests, activation, key rotation, login success/failure and JIT provisioning require immutable audit events. Durable audit/outbox implementation remains tracked by FND-P0-006.
- `TenantSsoConfig` is a legacy duplicate and must not be consumed by identity code. Its migration/retirement is tracked as a data-convergence item; no new federation feature may depend on it.

## Compatibility

The callback endpoints remain additive. Configurations that do not provide a compliant issuer no longer authenticate users; an authorized tenant administrator must correct the configuration before reactivation.
