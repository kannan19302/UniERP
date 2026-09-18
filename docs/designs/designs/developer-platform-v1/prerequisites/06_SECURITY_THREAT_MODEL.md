# Security, privacy and threat model

Scope: browser authoring, API, metadata persistence, package supply chain, preview/build workers, extensions, public sites, connectors and operator actions. Controls are requirements; this document does not assert they are implemented.

## Permission and identity model

Hosted Identity owns sign-in, federation, session recovery and machine principals. The API derives tenant and principal from verified credentials, resolves project membership and evaluates action plus record/field policy. UI capability filtering improves clarity only. OCC organization policy is inherited; Developer cannot grant provider pcc.* authority.

Observed builder.read/write/manage names exist in controllers. Product roles Maker, Reviewer, Release operator and Security admin are proposed mappings, not new permission strings. Reuse the canonical catalog and authorizer; publish additions before implementation.

| Action | Maker | Reviewer | Release operator | Tenant security admin |
| --- | --- | --- | --- | --- |
| Read authorized source | Scoped | Scoped | Scoped | Scoped |
| Edit draft | Granted project only | Only if separately granted | Only if separately granted | Only if separately granted |
| Approve candidate | No self-approval | Granted scope, independent | Independent if granted | Policy review if granted |
| Promote release | Not implied by edit | Not implied by review | Granted target + approved digest | Not implied by admin title |
| Rotate binding/revoke extension | Request if granted | Review if granted | Operational action if granted | Granted scope and audit |
| Export source/audit | Separate permission | Separate permission | Separate permission | Separate permission |

Effective access is intersection of tenant/project grants, resource policy, environment, capability, entitlement and current revocation. Deny unknown/missing context. A platform test SUPER_ADMIN is for authorized setup and smoke only; negative tests require controlled limited-role fixtures and an application database role without BYPASSRLS. Never treat super-admin success as isolation proof. Retrieve approved test credentials from the existing secure setup; do not copy them into this package.

## Threat-to-control-to-proof matrix

| ID | Threat / boundary | Required control | Failure proof |
| --- | --- | --- | --- |
| T01 | Cross-tenant resource ID / API | Verified scope + RLS + scoped lookup | Tenant A cannot read/write B; no-context denied |
| T02 | Forged project membership | Authoritative membership check | Same tenant, unauthorized project denied |
| T03 | UI role escalation | Server catalog and action enforcement | Hidden control invoked directly still denied |
| T04 | OIDC callback replay | State/nonce/PKCE, issuer/audience/expiry checks | Replayed/mismatched callback creates no session |
| T05 | Draft/source injection | Schema validation, safe preview isolation | Script/HTML payload cannot escape permitted runtime |
| T06 | Sandbox escape | Isolate + no ambient host objects + host checks | Escape suite cannot access host filesystem/process/network |
| T07 | SSRF / egress bypass | Approved HTTPS hosts; DNS/private-address/redirect controls | Private/metadata/rebinding/redirect targets rejected |
| T08 | Resource exhaustion | CPU/memory/query/bytes/concurrency budgets | Infinite loop, large result and fanout terminated safely |
| T09 | Tampered package | Canonical manifest + file digests + trusted signer | Modified capability or file invalidates verification |
| T10 | Revoked signer/extension | Shared durable revocation, bounded freshness | New execution denied after revocation; unknown state fails closed |
| T11 | Secret exfiltration | Vault references, scoped host bridge, redaction | No secret in bundle, export, logs or browser response |
| T12 | Supply-chain vulnerability | SBOM/license/provenance review on exact digest | Critical finding/unknown signature blocks release |
| T13 | Concurrent approval/edit | Approval bound to immutable candidate | Edit after approval invalidates promotion |
| T14 | Duplicate command/event | Idempotency + optimistic concurrency + dedup | Retry yields one effect; mismatch rejects |
| T15 | Unsafe public data | Public projection and anonymous route policy | Anonymous user cannot access private fields/project APIs |
| T16 | Restore/export privilege abuse | Purpose/target-bound authorization + audit | Wrong tenant/region/expired access cannot restore/export |
| T17 | AI prompt/tool injection | Untrusted content, allowlisted tools, draft-only review | Embedded instruction cannot grant tools or publish |
| T18 | Audit loss or tampering | Mandatory durable audit/outbox and immutable storage | Required audit failure cannot silently report completed action |
| T19 | Stale policy during outage | Explicit policy freshness and fail-closed privileged actions | Runtime degradation follows policy, no stale privileged grant |
| T20 | Dangerous upload/import | Size/path/type limits, scan, archive-bomb protection | Traversal, oversized or malicious archive rejected before writes |

The existing [sandbox implementation](../../../../sandbox/src/index.ts) and [threat evidence](../../../../unierp-platform/docs/platforms/developer-platform/evidence/sandbox-threat-model.md) are starting points; re-run proof against the exact build and deployed isolation mechanism.

## Privacy and lifecycle

Classify source IP, principals, business fixture data, audit, telemetry, bindings and public content separately. Minimize collection, use purpose-bound exports, enforce field masking server-side, and keep real data out of preview by default. Retention, residency, consent and legal-hold values must come from owning policies, not generated imagery. Implement rights requests in their owning platform with Developer contribution/export hooks; do not create a second account/privacy center.

## Quarantine and incident actions

Tenant-scoped disable/revoke is distinct from provider fleet containment. Show affected installations, active runs, serving versions, data side effects and recovery dependencies. A request is not effective until propagation is acknowledged. Bound revocation latency and test shared-state loss. Signing-key compromise requires identifying every signed release, preventing new trust, assessing current serving policy and issuing a reviewed remediation package.

Every production action needs the exact human authorization required by repository governance. Security review produces scoped evidence and findings, never a blanket compliant/certified badge.
