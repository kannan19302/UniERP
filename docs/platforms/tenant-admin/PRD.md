# Tenant Admin PRD

## Outcomes

Tenant owners shall configure their organization, users, access, policies, branding, integrations and data
governance without provider intervention and without visibility into another tenant or provider controls.

## Business requirements

- `TAD-BR-001`: Every action shall be scoped to the active tenant.
- `TAD-BR-002`: Delegated administration shall use least privilege and separation of duties.
- `TAD-BR-003`: Policy changes shall be versioned, auditable and reversible where safe.
- `TAD-BR-004`: Tenant administrators shall never receive provider-estate authority.
- `TAD-BR-005`: Subscription entitlements shall constrain available configuration and modules.

In scope: tenant organization, people/access, authentication preferences, branding/localization, integrations,
workflow configuration, retention/privacy, audit review and tenant subscription view. Provider tenant creation,
global plans, shared infrastructure and cross-tenant support operations belong to Platform Admin OS.
