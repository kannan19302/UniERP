# Tenant model to RLS migration linkage: prisma/schema/compliance.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `ComplianceControl` | `compliance_controls` | no | no | global/ownership review |
| `ComplianceControlEvaluation` | `compliance_control_evaluations` | no | no | global/ownership review |
| `ComplianceEvidence` | `compliance_evidence` | no | no | global/ownership review |

