# Tenant model to RLS migration linkage: prisma/schema/workflow-runtime.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `BuilderWorkflowRun` | `builder_workflow_runs` | yes | yes | STRUCTURAL LINK |
| `BuilderWorkflowRunStep` | `builder_workflow_run_steps` | yes | yes | STRUCTURAL LINK |

