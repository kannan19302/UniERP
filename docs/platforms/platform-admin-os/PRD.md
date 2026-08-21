# Platform Admin OS Product Requirements

## Users and outcomes

- Provider operator: safely provisions and manages tenants and shared services.
- SRE/incident commander: understands health, deployments, incidents, capacity and recovery.
- Security/compliance operator: governs identity, policy, secrets, threats, privacy and audit evidence.
- Billing/support operator: manages provider-side subscription, revenue and customer-support workflows.

## Business requirements

- `PAO-BR-001`: The platform shall separate provider-wide authority from tenant administration authority.
- `PAO-BR-002`: Every provider mutation shall be attributable to a principal, reason, time and target.
- `PAO-BR-003`: Destructive or high-impact operations shall expose preview, authorization and confirmation.
- `PAO-BR-004`: Tenant lifecycle operations shall be idempotent and observable from request through completion.
- `PAO-BR-005`: Platform status shall distinguish measured health from unknown or unavailable telemetry.

## Scope

In scope: provider tenant lifecycle, estate operations, platform IAM governance, infrastructure visibility,
provider billing, marketplace governance, support and compliance evidence. Tenant business configuration and
ERP transactions are out of scope and owned by Tenant Admin and Tenant Apps.

## Success measures

- Zero tenant-principal access to provider-only actions.
- 100% audit coverage for privileged mutations.
- Provisioning and recovery objectives measured from telemetry, not UI assertions.
- Every surfaced action backed by a contract and an automated authorization/failure-path test.
