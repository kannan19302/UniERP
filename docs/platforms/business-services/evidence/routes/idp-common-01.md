# Route decorators: idp/common — batch 1

Generated lexical route evidence. Route arguments are source expressions; class/composed guards and DTO contracts require AST/runtime verification.

| Controller | Prefix | Verb | Route argument | Permission decorators | Public | Skip tenant | Adjacent spec |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| `bulk-operations.controller.ts` | `"bulk"` | POST | `":modelName/create"` | 5 | 0 | 0 | no |
| `bulk-operations.controller.ts` | `"bulk"` | PATCH | `":modelName/update"` | 5 | 0 | 0 | no |
| `bulk-operations.controller.ts` | `"bulk"` | DELETE | `":modelName/delete"` | 5 | 0 | 0 | no |
| `bulk-operations.controller.ts` | `"bulk"` | POST | `":modelName/restore"` | 5 | 0 | 0 | no |
| `bulk-operations.controller.ts` | `"bulk"` | PATCH | `":modelName/status"` | 5 | 0 | 0 | no |
| `change-history.controller.ts` | `"change-history"` | GET | `":entityType/:entityId"` | 0 | 0 | 0 | no |
| `data-quality.controller.ts` | `"data-quality"` | POST | `":modelName/deduplicate"` | 5 | 0 | 0 | no |
| `data-quality.controller.ts` | `"data-quality"` | POST | `":modelName/merge"` | 5 | 0 | 0 | no |
| `data-quality.controller.ts` | `"data-quality"` | GET | `":modelName/validate"` | 5 | 0 | 0 | no |
| `data-quality.controller.ts` | `"data-quality"` | POST | `"normalize/address"` | 5 | 0 | 0 | no |
| `data-quality.controller.ts` | `"data-quality"` | POST | `"normalize/phone"` | 5 | 0 | 0 | no |
| `enterprise-audit.controller.ts` | `"audit"` | GET | `":entityType/:entityId"` | 5 | 0 | 0 | no |
| `enterprise-audit.controller.ts` | `"audit"` | GET | `"user/:userId"` | 5 | 0 | 0 | no |
| `enterprise-audit.controller.ts` | `"audit"` | GET | `"security"` | 5 | 0 | 0 | no |
| `enterprise-audit.controller.ts` | `"audit"` | GET | `"export"` | 5 | 0 | 0 | no |
| `enterprise-audit.controller.ts` | `"audit"` | GET | `"compliance-report"` | 5 | 0 | 0 | no |
| `export-v2.controller.ts` | `"export/v2"` | POST | `":modelName"` | 4 | 0 | 0 | no |
| `export-v2.controller.ts` | `"export/v2"` | POST | `"schedule"` | 4 | 0 | 0 | no |
| `export-v2.controller.ts` | `"export/v2"` | GET | `"history"` | 4 | 0 | 0 | no |
| `export-v2.controller.ts` | `"export/v2"` | POST | `"bulk/:modelName"` | 4 | 0 | 0 | no |
| `import.controller.ts` | `"import"` | POST | `":modelName/csv"` | 5 | 0 | 0 | no |
| `import.controller.ts` | `"import"` | POST | `":modelName/xlsx"` | 5 | 0 | 0 | no |
| `import.controller.ts` | `"import"` | POST | `":modelName/json"` | 5 | 0 | 0 | no |
| `import.controller.ts` | `"import"` | GET | `"history"` | 5 | 0 | 0 | no |
| `import.controller.ts` | `"import"` | GET | `"history/:id"` | 5 | 0 | 0 | no |
| `platform-credentials.controller.ts` | `"admin/platform-credentials"` | GET | `` | 2 | 0 | 0 | no |
| `platform-credentials.controller.ts` | `"admin/platform-credentials"` | PUT | `":provider"` | 2 | 0 | 0 | no |

