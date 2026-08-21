# Tenant model to RLS migration linkage: prisma/schema/custom-objects.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `CustomObjectDefinition` | `custom_object_definitions` | yes | yes | STRUCTURAL LINK |
| `CustomObjectFieldDefinition` | `custom_object_field_definitions` | yes | yes | STRUCTURAL LINK |

