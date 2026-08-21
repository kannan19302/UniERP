# Tenant model to RLS migration linkage: prisma/schema/provider-registry.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `Provider` | `providers` | no | no | global/ownership review |
| `ProviderBinding` | `provider_bindings` | no | no | global/ownership review |
| `ProviderCredential` | `provider_credentials` | no | no | global/ownership review |
| `ProviderCapability` | `provider_capabilities` | no | no | global/ownership review |
| `ProviderHealthConfig` | `provider_health_configs` | no | no | global/ownership review |
| `ProviderHealthCheck` | `provider_health_checks` | no | no | global/ownership review |
| `ProviderQuota` | `provider_quotas` | no | no | global/ownership review |
| `TenantProviderOverride` | `tenant_provider_overrides` | yes | yes | STRUCTURAL LINK |
| `StickyRouteAssignment` | `sticky_route_assignments` | yes | yes | STRUCTURAL LINK |
| `ProviderCircuitState` | `provider_circuit_states` | no | no | global/ownership review |
| `ProviderPriceSheetEntry` | `provider_price_sheet_entries` | no | no | global/ownership review |
| `CostIngestionBatch` | `cost_ingestion_batches` | no | no | global/ownership review |
| `CostLineItem` | `cost_line_items` | no | no | global/ownership review |
| `BudgetPolicy` | `budget_policies` | yes | yes | STRUCTURAL LINK |
| `ProviderConsumptionReport` | `provider_consumption_reports` | yes | yes | STRUCTURAL LINK |
| `FinOpsRecommendation` | `finops_recommendations` | no | no | global/ownership review |
| `StepUpMfaVerification` | `step_up_mfa_verifications` | no | no | global/ownership review |
| `PrivilegeElevation` | `privilege_elevations` | no | no | global/ownership review |
| `SloDefinition` | `slo_definitions` | yes | yes | STRUCTURAL LINK |
| `Incident` | `incidents` | yes | yes | STRUCTURAL LINK |

