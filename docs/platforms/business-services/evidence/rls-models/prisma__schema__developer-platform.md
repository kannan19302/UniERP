# Tenant model to RLS migration linkage: prisma/schema/developer-platform.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `DevProject` | `dev_projects` | yes | yes | STRUCTURAL LINK |
| `DevProjectRecent` | `dev_project_recents` | yes | yes | STRUCTURAL LINK |
| `BuilderArtifact` | `builder_artifacts` | yes | yes | STRUCTURAL LINK |
| `BuilderArtifactAttachment` | `builder_artifact_attachments` | yes | yes | STRUCTURAL LINK |
| `ProjectRelease` | `project_releases` | yes | yes | STRUCTURAL LINK |
| `BuilderModulePage` | `builder_module_pages` | yes | yes | STRUCTURAL LINK |
| `BuilderModuleDataModel` | `builder_module_data_models` | yes | yes | STRUCTURAL LINK |

