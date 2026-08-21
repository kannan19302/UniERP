# Tenant model to RLS migration linkage: prisma/schema/org-structure.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `OrgUnit` | `org_units` | yes | yes | STRUCTURAL LINK |
| `OrgPosition` | `org_positions` | yes | yes | STRUCTURAL LINK |
| `ApprovalRouting` | `approval_routings` | yes | yes | STRUCTURAL LINK |

