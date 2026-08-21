# Tenant model to RLS migration linkage: prisma/schema/catalogue.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `CatalogueProduct` | `catalogue_products` | no | no | global/ownership review |
| `CatalogueSuite` | `catalogue_suites` | no | no | global/ownership review |
| `CatalogueSuiteItem` | `catalogue_suite_items` | no | no | global/ownership review |
| `CatalogueProvisioning` | `catalogue_provisionings` | yes | yes | STRUCTURAL LINK |

