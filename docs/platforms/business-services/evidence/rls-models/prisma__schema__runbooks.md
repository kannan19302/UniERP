# Tenant model to RLS migration linkage: prisma/schema/runbooks.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `Runbook` | `runbooks` | no | no | global/ownership review |
| `RunbookExecution` | `runbook_executions` | no | no | global/ownership review |

