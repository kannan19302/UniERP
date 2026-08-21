# Tenant model to RLS migration linkage: prisma/idp-schema.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `User` | `users` | yes | no | RLS LINK GAP |
| `UserProfile` | `user_profiles` | yes | no | RLS LINK GAP |
| `UserIdentity` | `user_identities` | yes | no | RLS LINK GAP |
| `Role` | `roles` | yes | no | RLS LINK GAP |
| `UserRole` | `user_roles` | no | no | global/ownership review |
| `ApiKey` | `api_keys` | yes | no | RLS LINK GAP |
| `AuthApiToken` | `auth_api_tokens` | yes | yes | STRUCTURAL LINK |
| `UserSession` | `user_sessions` | yes | no | RLS LINK GAP |
| `UserGroup` | `user_groups` | yes | no | RLS LINK GAP |
| `UserGroupMember` | `user_group_members` | no | no | global/ownership review |
| `PasswordResetToken` | `password_reset_tokens` | yes | no | RLS LINK GAP |
| `EmailVerificationToken` | `email_verification_tokens` | yes | no | RLS LINK GAP |
| `PushSubscription` | `push_subscriptions` | yes | no | RLS LINK GAP |
| `MfaPushChallenge` | `mfa_push_challenges` | yes | no | RLS LINK GAP |
| `OAuthClient` | `oauth_clients` | no | no | global/ownership review |
| `AuthorizationCode` | `oauth_authorization_codes` | yes | yes | STRUCTURAL LINK |
| `RefreshGrant` | `oauth_refresh_grants` | yes | yes | STRUCTURAL LINK |
| `ClientConsent` | `oauth_client_consents` | yes | yes | STRUCTURAL LINK |
| `OidcSigningKey` | `oidc_signing_keys` | no | no | global/ownership review |
| `LoginAttemptCounter` | `login_attempt_counters` | no | no | global/ownership review |
| `Platform` | `platforms` | no | no | global/ownership review |
| `PlatformGrant` | `platform_grants` | yes | yes | STRUCTURAL LINK |
| `AgentDefinition` | `agent_definitions` | yes | yes | STRUCTURAL LINK |
| `AgentDelegation` | `agent_delegations` | yes | yes | STRUCTURAL LINK |

