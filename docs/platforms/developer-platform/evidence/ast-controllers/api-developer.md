# AST controller summary: api/developer

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `builder/builder-enterprise.controller.ts` | `"builder/enterprise"` | 5 | 5 | 0 | 0 | 0 | 7/7 | no | `AuthenticatedRequest` |
| `builder/builder-expansion.controller.ts` | `"builder"` | 21 | 21 | 0 | 0 | 0 | 47/47 | no | `CreateFormFieldInput`, `CreateFormSubmissionInput`, `CreateFormTemplateInput`, `CreatePageTemplateInput`, `CreateWorkflowDefinitionInput`, `CreateWorkflowStepInput`, `UpdateFormTemplateInput`, `UpdatePageTemplateInput`, `UpdateWorkflowDefinitionInput` |
| `builder/builder.controller.ts` | `"builder"` | 143 | 143 | 0 | 0 | 0 | 322/322 | no | `AddAppComponentInput`, `AddAppDataModelInput`, `AddAppPageInput`, `ApproveBuilderWorkflowRunStepInput`, `AuthenticatedRequest`, `BuilderAiGenerateInput`, `BuilderAnalyticsEventInput`, `CreateBuilderFormInput`, `CreateDataImportInput`, `CreatePageRegistryInput`, `CreateSchemaRegistryInput`, `CreateWebCollectionInput`, `CreateWebCollectionItemInput`, `CustomRecordDataInput`, `ExecuteBuilderWorkflowRunInput`, `ExecuteDataImportInput`, `InstallBuilderAppInput`, `PublishModuleInput`, `RestorePageRegistryHistoryInput`, `ResumeBuilderWorkflowRunInput`, `RollbackModuleInput`, `SeedWebCollectionInput`, `UpdateAppPageInput`, `UpdateBuilderFormInput`, `UpdatePageRegistryInput`, `UpdateSchemaRegistryInput`, `UpdateWebCollectionInput`, `UpdateWebCollectionItemInput` |
| `builder/controllers/ab-testing.controller.ts` | `"builder"` | 17 | 17 | 0 | 0 | 0 | 36/36 | no | `AuthenticatedRequest` |
| `builder/controllers/advanced-forms.controller.ts` | `"builder"` | 11 | 11 | 0 | 0 | 0 | 26/26 | no | `AuthenticatedRequest` |
| `builder/controllers/api-builder.controller.ts` | `"builder"` | 10 | 10 | 0 | 0 | 0 | 22/22 | no | `AuthenticatedRequest` |
| `builder/controllers/bpmn.controller.ts` | `"builder"` | 15 | 15 | 0 | 0 | 0 | 36/36 | no | `AuthenticatedRequest` |
| `builder/controllers/builder-deep-expansion.controller.ts` | `"builder/deep-expansion"` | 15 | 15 | 0 | 0 | 0 | 32/32 | no | — |
| `builder/controllers/data-objects.controller.ts` | `"builder/data-objects"` | 5 | 5 | 0 | 0 | 0 | 10/10 | no | `AddCustomObjectFieldInput`, `AuthenticatedRequest`, `CreateCustomObjectInput` |
| `builder/controllers/etl.controller.ts` | `"builder"` | 13 | 13 | 0 | 0 | 0 | 28/28 | no | `AuthenticatedRequest` |
| `builder/controllers/mobile-builder.controller.ts` | `"builder"` | 14 | 14 | 0 | 0 | 0 | 32/32 | no | `AuthenticatedRequest` |
| `builder/controllers/rules-engine.controller.ts` | `"builder"` | 12 | 12 | 0 | 0 | 0 | 25/25 | no | `AuthenticatedRequest` |
| `builder/controllers/theme-manager.controller.ts` | `"builder"` | 12 | 12 | 0 | 0 | 0 | 24/24 | no | `AuthenticatedRequest` |
| `builder/governance.controller.ts` | `"builder/governance"` | 20 | 20 | 0 | 0 | 0 | 37/37 | no | — |
| `builder/web-public.controller.ts` | `"public/web"` | 7 | 0 | 7 | 0 | 0 | 17/17 | no | `CreateWebFormSubmissionInput`, `WebCheckoutInput` |
| `builder/web-studio.controller.ts` | `"builder/web-studio"` | 12 | 12 | 0 | 0 | 0 | 29/29 | no | `AuthenticatedRequest` |
| `platform/dev-home.controller.ts` | `"dev"` | 6 | 6 | 0 | 0 | 0 | 10/10 | no | `AuthenticatedRequest`, `z.infer<typeof createAppSchema>`, `z.infer<typeof createSiteSchema>` |
| `platform/library.controller.ts` | `"library"` | 4 | 4 | 0 | 0 | 0 | 10/10 | no | `AuthenticatedRequest`, `z.infer<typeof attachSchema>` |
| `platform/project-artifacts.controller.ts` | `"dev"` | 3 | 3 | 0 | 0 | 0 | 4/4 | no | `AuthenticatedRequest` |
| `platform/project-releases.controller.ts` | `"dev/projects"` | 4 | 4 | 0 | 0 | 0 | 11/11 | no | `AuthenticatedRequest`, `z.infer<typeof pinSchema>`, `z.infer<typeof publishSchema>`, `z.infer<typeof rollbackSchema>` |

