# Prisma Data Model Inventory

Generated from every current `data/**/*.prisma` model block on 2026-08-21. Structural signals do not prove isolation, correct deletion, constraints or monetary semantics.

## Summary

- Models: 1985
- Models declaring `tenantId`: 1865
- Models declaring `deletedAt`: 86
- Decimal fields: 1895
- Float fields: 198

| Schema file | Models | tenantId | deletedAt | Decimal fields | Float fields | Detail |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `dist/idp-client/schema.prisma` | 24 | 18 | 1 | 0 | 0 | [models](data-models/dist__idp-client__schema.md) |
| `prisma/idp-schema.prisma` | 24 | 18 | 1 | 0 | 0 | [models](data-models/prisma__idp-schema.md) |
| `prisma/schema/ai-governance.prisma` | 10 | 0 | 0 | 0 | 0 | [models](data-models/prisma__schema__ai-governance.md) |
| `prisma/schema/catalogue.prisma` | 4 | 1 | 0 | 0 | 0 | [models](data-models/prisma__schema__catalogue.md) |
| `prisma/schema/compliance.prisma` | 3 | 0 | 0 | 0 | 0 | [models](data-models/prisma__schema__compliance.md) |
| `prisma/schema/config.prisma` | 0 | 0 | 0 | 0 | 0 | [models](data-models/prisma__schema__config.md) |
| `prisma/schema/core-part-1.prisma` | 97 | 93 | 10 | 62 | 2 | [models](data-models/prisma__schema__core-part-1.md) |
| `prisma/schema/core-part-10.prisma` | 106 | 103 | 0 | 121 | 0 | [models](data-models/prisma__schema__core-part-10.md) |
| `prisma/schema/core-part-11.prisma` | 108 | 107 | 3 | 118 | 10 | [models](data-models/prisma__schema__core-part-11.md) |
| `prisma/schema/core-part-12.prisma` | 113 | 113 | 5 | 87 | 114 | [models](data-models/prisma__schema__core-part-12.md) |
| `prisma/schema/core-part-13.prisma` | 128 | 121 | 0 | 28 | 8 | [models](data-models/prisma__schema__core-part-13.md) |
| `prisma/schema/core-part-14.prisma` | 112 | 112 | 0 | 50 | 6 | [models](data-models/prisma__schema__core-part-14.md) |
| `prisma/schema/core-part-15.prisma` | 27 | 27 | 0 | 0 | 4 | [models](data-models/prisma__schema__core-part-15.md) |
| `prisma/schema/core-part-2.prisma` | 104 | 104 | 5 | 125 | 3 | [models](data-models/prisma__schema__core-part-2.md) |
| `prisma/schema/core-part-3.prisma` | 118 | 110 | 0 | 67 | 0 | [models](data-models/prisma__schema__core-part-3.md) |
| `prisma/schema/core-part-4.prisma` | 106 | 105 | 4 | 89 | 3 | [models](data-models/prisma__schema__core-part-4.md) |
| `prisma/schema/core-part-5.prisma` | 113 | 99 | 15 | 55 | 0 | [models](data-models/prisma__schema__core-part-5.md) |
| `prisma/schema/core-part-6.prisma` | 104 | 101 | 3 | 152 | 0 | [models](data-models/prisma__schema__core-part-6.md) |
| `prisma/schema/core-part-7.prisma` | 79 | 79 | 0 | 147 | 0 | [models](data-models/prisma__schema__core-part-7.md) |
| `prisma/schema/core-part-8.prisma` | 89 | 87 | 12 | 121 | 0 | [models](data-models/prisma__schema__core-part-8.md) |
| `prisma/schema/core-part-9.prisma` | 82 | 82 | 0 | 230 | 0 | [models](data-models/prisma__schema__core-part-9.md) |
| `prisma/schema/crm.prisma` | 66 | 66 | 18 | 27 | 2 | [models](data-models/prisma__schema__crm.md) |
| `prisma/schema/custom-objects.prisma` | 2 | 2 | 0 | 0 | 0 | [models](data-models/prisma__schema__custom-objects.md) |
| `prisma/schema/developer-platform.prisma` | 7 | 7 | 1 | 0 | 0 | [models](data-models/prisma__schema__developer-platform.md) |
| `prisma/schema/education.prisma` | 22 | 22 | 0 | 17 | 0 | [models](data-models/prisma__schema__education.md) |
| `prisma/schema/extensions.prisma` | 2 | 2 | 0 | 1 | 0 | [models](data-models/prisma__schema__extensions.md) |
| `prisma/schema/field-service.prisma` | 26 | 26 | 0 | 40 | 7 | [models](data-models/prisma__schema__field-service.md) |
| `prisma/schema/finance.prisma` | 29 | 29 | 1 | 45 | 0 | [models](data-models/prisma__schema__finance.md) |
| `prisma/schema/healthcare.prisma` | 24 | 24 | 0 | 20 | 0 | [models](data-models/prisma__schema__healthcare.md) |
| `prisma/schema/hr.prisma` | 36 | 36 | 1 | 18 | 0 | [models](data-models/prisma__schema__hr.md) |
| `prisma/schema/inventory.prisma` | 31 | 31 | 0 | 89 | 5 | [models](data-models/prisma__schema__inventory.md) |
| `prisma/schema/manufacturing.prisma` | 8 | 8 | 0 | 6 | 11 | [models](data-models/prisma__schema__manufacturing.md) |
| `prisma/schema/marketplace-payouts.prisma` | 2 | 0 | 0 | 5 | 0 | [models](data-models/prisma__schema__marketplace-payouts.md) |
| `prisma/schema/operation-pipeline.prisma` | 7 | 0 | 0 | 0 | 0 | [models](data-models/prisma__schema__operation-pipeline.md) |
| `prisma/schema/org-structure.prisma` | 3 | 3 | 0 | 0 | 0 | [models](data-models/prisma__schema__org-structure.md) |
| `prisma/schema/policy-engine.prisma` | 2 | 0 | 0 | 0 | 0 | [models](data-models/prisma__schema__policy-engine.md) |
| `prisma/schema/pos.prisma` | 16 | 16 | 0 | 25 | 0 | [models](data-models/prisma__schema__pos.md) |
| `prisma/schema/projects.prisma` | 46 | 46 | 4 | 64 | 16 | [models](data-models/prisma__schema__projects.md) |
| `prisma/schema/provider-registry.prisma` | 20 | 6 | 0 | 11 | 2 | [models](data-models/prisma__schema__provider-registry.md) |
| `prisma/schema/real-estate.prisma` | 23 | 23 | 0 | 73 | 2 | [models](data-models/prisma__schema__real-estate.md) |
| `prisma/schema/reconciler.prisma` | 1 | 0 | 0 | 0 | 0 | [models](data-models/prisma__schema__reconciler.md) |
| `prisma/schema/resource-model.prisma` | 15 | 2 | 0 | 0 | 3 | [models](data-models/prisma__schema__resource-model.md) |
| `prisma/schema/runbooks.prisma` | 2 | 0 | 0 | 0 | 0 | [models](data-models/prisma__schema__runbooks.md) |
| `prisma/schema/saas-portal.prisma` | 2 | 1 | 0 | 0 | 0 | [models](data-models/prisma__schema__saas-portal.md) |
| `prisma/schema/web.prisma` | 16 | 15 | 1 | 2 | 0 | [models](data-models/prisma__schema__web.md) |
| `prisma/schema/workflow-runtime.prisma` | 2 | 2 | 0 | 0 | 0 | [models](data-models/prisma__schema__workflow-runtime.md) |
| `src/idp-client/schema.prisma` | 24 | 18 | 1 | 0 | 0 | [models](data-models/src__idp-client__schema.md) |

Models without tenantId require explicit global/provider classification or a tenant-isolation gap. Float fields require semantic review; RLS coverage requires migration and runtime evidence.

