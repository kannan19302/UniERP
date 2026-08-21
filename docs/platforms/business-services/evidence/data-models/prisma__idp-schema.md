# Models in prisma/idp-schema.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `User` | yes | yes | 0 | 0 | 3 | tenant signal |
| `UserProfile` | yes | no | 0 | 0 | 4 | tenant signal |
| `UserIdentity` | yes | no | 0 | 0 | 2 | tenant signal |
| `Role` | yes | no | 0 | 0 | 2 | tenant signal |
| `UserRole` | no | no | 0 | 0 | 0 | ownership review |
| `ApiKey` | yes | no | 0 | 0 | 1 | tenant signal |
| `AuthApiToken` | yes | no | 0 | 0 | 2 | tenant signal |
| `UserSession` | yes | no | 0 | 0 | 1 | tenant signal |
| `UserGroup` | yes | no | 0 | 0 | 1 | tenant signal |
| `UserGroupMember` | no | no | 0 | 0 | 0 | ownership review |
| `PasswordResetToken` | yes | no | 0 | 0 | 2 | tenant signal |
| `EmailVerificationToken` | yes | no | 0 | 0 | 2 | tenant signal |
| `PushSubscription` | yes | no | 0 | 0 | 1 | tenant signal |
| `MfaPushChallenge` | yes | no | 0 | 0 | 1 | tenant signal |
| `OAuthClient` | no | no | 0 | 0 | 2 | ownership review |
| `AuthorizationCode` | yes | no | 0 | 0 | 2 | tenant signal |
| `RefreshGrant` | yes | no | 0 | 0 | 3 | tenant signal |
| `ClientConsent` | yes | no | 0 | 0 | 2 | tenant signal |
| `OidcSigningKey` | no | no | 0 | 0 | 1 | ownership review |
| `LoginAttemptCounter` | no | no | 0 | 0 | 1 | ownership review |
| `Platform` | no | no | 0 | 0 | 0 | ownership review |
| `PlatformGrant` | yes | no | 0 | 0 | 2 | tenant signal |
| `AgentDefinition` | yes | no | 0 | 0 | 2 | tenant signal |
| `AgentDelegation` | yes | no | 0 | 0 | 3 | tenant signal |

