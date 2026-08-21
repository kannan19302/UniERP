# Tenant model to RLS migration linkage: prisma/schema/extensions.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `TenantExtensionInstallation` | `tenant_extension_installations` | yes | yes | STRUCTURAL LINK |
| `ExtensionInvocationUsage` | `extension_invocation_usage` | yes | yes | STRUCTURAL LINK |

