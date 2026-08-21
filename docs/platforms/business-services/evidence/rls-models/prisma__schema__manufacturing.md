# Tenant model to RLS migration linkage: prisma/schema/manufacturing.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `RoutingRule` | `routing_rules` | yes | no | RLS LINK GAP |
| `WorkCenterCapacity` | `work_center_capacities` | yes | no | RLS LINK GAP |
| `MfgSpcChart` | `mfg_spc_charts` | yes | no | RLS LINK GAP |
| `MfgSpcDataPoint` | `mfg_spc_data_points` | yes | no | RLS LINK GAP |
| `MfgCostEntry` | `mfg_cost_entries` | yes | no | RLS LINK GAP |
| `MfgMaintenanceWorkOrder` | `mfg_maintenance_work_orders` | yes | no | RLS LINK GAP |
| `MfgDocumentControl` | `mfg_document_controls` | yes | no | RLS LINK GAP |
| `MfgDocumentVersion` | `mfg_document_versions` | yes | no | RLS LINK GAP |

