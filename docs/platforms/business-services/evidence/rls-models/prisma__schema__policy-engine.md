# Tenant model to RLS migration linkage: prisma/schema/policy-engine.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `Policy` | `policies` | no | no | global/ownership review |
| `PolicyOverride` | `policy_overrides` | no | no | global/ownership review |

