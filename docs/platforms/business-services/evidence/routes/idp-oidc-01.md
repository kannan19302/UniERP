# Route decorators: idp/modules/oidc — batch 1

Generated lexical route evidence. Route arguments are source expressions; class/composed guards and DTO contracts require AST/runtime verification.

| Controller | Prefix | Verb | Route argument | Permission decorators | Public | Skip tenant | Adjacent spec |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| `authorize.controller.ts` | `"oidc"` | GET | `"authorize"` | 0 | 0 | 0 | no |
| `discovery.controller.ts` | `` | GET | `".well-known/openid-configuration"` | 0 | 0 | 0 | no |
| `discovery.controller.ts` | `` | GET | `"oidc/jwks.json"` | 0 | 0 | 0 | no |
| `login.controller.ts` | `"oidc"` | GET | `"login"` | 0 | 0 | 0 | no |
| `login.controller.ts` | `"oidc"` | POST | `"login"` | 0 | 0 | 0 | no |
| `login.controller.ts` | `"oidc"` | POST | `"login/mfa"` | 0 | 0 | 0 | no |
| `platforms.controller.ts` | `"auth"` | GET | `"platforms"` | 0 | 0 | 0 | no |
| `session.controller.ts` | `"oidc"` | GET | `"userinfo"` | 0 | 0 | 0 | no |
| `session.controller.ts` | `"oidc"` | POST | `"revoke"` | 0 | 0 | 0 | no |
| `session.controller.ts` | `"oidc"` | POST | `"introspect"` | 0 | 0 | 0 | no |
| `session.controller.ts` | `"oidc"` | GET | `"end_session"` | 0 | 0 | 0 | no |
| `session.controller.ts` | `"oidc"` | GET | `"consent"` | 0 | 0 | 0 | no |
| `session.controller.ts` | `"oidc"` | POST | `"consent"` | 0 | 0 | 0 | no |
| `token.controller.ts` | `"oidc"` | POST | `"token"` | 0 | 0 | 0 | no |

