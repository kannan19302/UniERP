# Models in prisma/schema/manufacturing.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `RoutingRule` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkCenterCapacity` | yes | no | 3 | 0 | 2 | tenant signal |
| `MfgSpcChart` | yes | no | 0 | 5 | 1 | tenant signal; Float review |
| `MfgSpcDataPoint` | yes | no | 0 | 4 | 1 | tenant signal; Float review |
| `MfgCostEntry` | yes | no | 2 | 1 | 1 | tenant signal; Float review |
| `MfgMaintenanceWorkOrder` | yes | no | 1 | 1 | 2 | tenant signal; Float review |
| `MfgDocumentControl` | yes | no | 0 | 0 | 1 | tenant signal |
| `MfgDocumentVersion` | yes | no | 0 | 0 | 1 | tenant signal |

