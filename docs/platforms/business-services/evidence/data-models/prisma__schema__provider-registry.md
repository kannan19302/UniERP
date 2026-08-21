# Models in prisma/schema/provider-registry.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `Provider` | no | no | 0 | 0 | 1 | ownership review |
| `ProviderBinding` | no | no | 0 | 0 | 2 | ownership review |
| `ProviderCredential` | no | no | 0 | 0 | 2 | ownership review |
| `ProviderCapability` | no | no | 0 | 0 | 1 | ownership review |
| `ProviderHealthConfig` | no | no | 0 | 0 | 0 | ownership review |
| `ProviderHealthCheck` | no | no | 0 | 0 | 1 | ownership review |
| `ProviderQuota` | no | no | 0 | 0 | 1 | ownership review |
| `TenantProviderOverride` | yes | no | 0 | 0 | 1 | tenant signal |
| `StickyRouteAssignment` | yes | no | 0 | 0 | 1 | tenant signal |
| `ProviderCircuitState` | no | no | 0 | 0 | 0 | ownership review |
| `ProviderPriceSheetEntry` | no | no | 1 | 0 | 1 | ownership review |
| `CostIngestionBatch` | no | no | 1 | 0 | 1 | ownership review |
| `CostLineItem` | no | no | 1 | 0 | 1 | ownership review |
| `BudgetPolicy` | yes | no | 1 | 0 | 1 | tenant signal |
| `ProviderConsumptionReport` | yes | no | 0 | 0 | 1 | tenant signal |
| `FinOpsRecommendation` | no | no | 5 | 0 | 1 | ownership review |
| `StepUpMfaVerification` | no | no | 0 | 0 | 0 | ownership review |
| `PrivilegeElevation` | no | no | 0 | 0 | 1 | ownership review |
| `SloDefinition` | yes | no | 1 | 1 | 0 | tenant signal; Float review |
| `Incident` | yes | no | 1 | 1 | 0 | tenant signal; Float review |

