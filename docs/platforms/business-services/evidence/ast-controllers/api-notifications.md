# AST controller summary: api/modules/notifications

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `device-tokens.controller.ts` | `"notifications/devices"` | 2 | 2 | 0 | 0 | 0 | 4/4 | no | `AuthenticatedRequest` |
| `notification-preferences.controller.ts` | `"notifications"` | 2 | 2 | 0 | 0 | 0 | 3/3 | no | `AuthenticatedRequest` |
| `notifications-deep.controller.ts` | `"notifications"` | 19 | 19 | 0 | 0 | 0 | 39/39 | no | `AuthenticatedRequest`, `z.infer<typeof batchSchema>`, `z.infer<typeof digestSchema>`, `z.infer<typeof preferenceSchema>`, `z.infer<typeof renderSchema>`, `z.infer<typeof templateSchema>`, `{ preferences: z.infer<typeof preferenceSchema>[] }` |
| `notifications-generated.controller.ts` | `"notifications"` | 200 | 200 | 0 | 0 | 0 | 400/400 | no | `AuthenticatedRequest` |
| `notifications.controller.ts` | `"notifications-config"` | 4 | 4 | 0 | 0 | 0 | 6/6 | no | `AuthenticatedRequest` |

