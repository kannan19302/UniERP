# AST controller summary: idp/modules/auth

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `auth-deep.controller.ts` | `"auth"` | 12 | 12 | 0 | 0 | 0 | 25/25 | no | `AuthenticatedRequest` |
| `auth.controller.ts` | `"auth"` | 33 | 17 | 0 | 1 | 0 | 54/54 | no | `AuthenticatedRequest`, `ForgotPasswordInput`, `MfaLoginInput`, `RegisterInput`, `Request`, `ResendVerificationInput`, `ResetPasswordInput`, `SendOtpInput`, `VerifyEmailInput`, `VerifyOtpInput` |
| `oauth.controller.ts` | `"auth/oauth"` | 3 | 0 | 0 | 0 | 0 | 9/9 | no | `Request` |
| `onboarding.controller.ts` | `"auth/onboarding"` | 2 | 0 | 0 | 0 | 0 | 3/3 | no | — |
| `sso.controller.ts` | `"auth/sso"` | 5 | 0 | 0 | 0 | 4 | 16/16 | no | `Request` |

