# Tenant model to RLS migration linkage: prisma/schema/saas-portal.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `DataBreach` | `data_breaches` | yes | yes | STRUCTURAL LINK |
| `DataBreachTimeline` | `data_breach_timeline` | no | no | global/ownership review |

