<!-- UniERP-Enterprise-SAAS-Rules: 1.0.0 -->
# Enterprise SaaS agent rules

This operational guide applies the [canonical agent protocol](../../../docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md).
It does not override accepted ADRs, platform specifications, or explicit task scope. Product ambition is not
implementation evidence. Resolve ownership through the [platform catalog](../../../docs/PLATFORM_CATALOG.md)
and current topology through workspace inventory and accepted ADR-0012.

## LAW-01: Scoped persistence and honest completion

Continue authorized work while a useful next step exists. Derive numbered acceptance criteria from the request,
not from the entire product backlog. Diagnose failed gates, distinguish pre-existing failures, and retry after a
material fix or changed prerequisite. Report a concrete blocker when progress requires missing authority or an
external dependency. Never fabricate success or turn an unrelated score into the task's completion condition.

## LAW-02: Truthful production data

Do not disguise API failures with fictional business records or metrics. Preserve distinct loading, empty,
error and stale states; an unavailable total is not zero. Synthetic fixtures and isolated unit-test doubles can
prove caller behavior, but cannot establish integration, RLS, runtime or recovery correctness.

## LAW-03: Tenant isolation

Tenant-owned persistence enforces server-established scope in services and PostgreSQL ENABLE plus FORCE RLS,
including USING and WITH CHECK as appropriate. Follow immutable migration policy. Prove tenant A, tenant B,
cross-tenant denial and no-context behavior with a NOBYPASSRLS role. A privileged smoke account is not this proof.
Global/provider-owned records follow their owning security specification; do not invent tenant ownership.

## LAW-04: Server-side authorization

Use the owning service's complete enforcing guard chain and published permission vocabulary. Public routes need
an explicit documented basis and proof. Preserve provider/tenant separation and contract-defined denial semantics;
do not globally replace 401/403/404 responses or infer authorization from decorators or UI visibility.

## LAW-05: Financial and quantity semantics

Money carries decimal amount and currency; quantities carry units. Precision, scale and rounding follow the
owning contract. Posted or approved records use amendment or reversal, with audit evidence.

## LAW-06: Accessible design-system usage

Use published @kannan19302/ui components and approved tokens for supported UI surfaces. Prove relevant states,
keyboard interaction and WCAG 2.2 AA; automated accessibility checks alone are insufficient.

## LAW-07: UI conventions

Apply component anatomy and density rules from the owning design-system specification and repository guidance.
Do not generate unused stories, tests or wrappers solely to satisfy a copied file-count recipe.

## LAW-08: Service conventions

Inspect the owning backend module conventions. Keep transport, domain policy, persistence and event delivery
responsibilities clear. Examples do not establish APIs or justify cross-repository private imports.

## LAW-09: Atomic outbox

Business state and required events commit in the same transaction. Consumers are version-aware, idempotent,
retryable and reconcilable. A publish call after a committed business write does not prove atomicity.

## LAW-10: Compatible contracts

Change published contracts before providers and consumers. Changes remain additive within a major. Breaking
changes require explicit owner authorization, versioning, migration and deprecation evidence.

## LAW-11: Authorized source control

Commit, push and publication require the exact authorization defined by AIP-SCM-001. Editing permission alone
is insufficient. Preserve all pre-existing changes. When a commit is requested, stage only reviewed task-owned
paths or hunks; never sweep all repositories with git add -A. Local task completion does not require an
unrequested push. Report commit/push state independently from implementation and verification.

## Execution

Follow the [workflow](../workflow/ENTERPRISE_SAAS_WORKFLOW.md) and
[evidence guidance](../governance/ENTERPRISE_SAAS_GOVERNANCE.md). Inspect executable scripts and their side effects
before running them. Reuse recorded authorization; do not repeatedly ask for an already authorized local action.
