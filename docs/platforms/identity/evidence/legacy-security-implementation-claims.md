> **Migration status:** Legacy security claim inventory. Normative controls are in `docs/standards/SECURITY_BASELINE.md`; obsolete paths and blanket completion claims are not accepted as proof.

# Security Checklist — UniERP

> Every item below is implemented and enforced. Run `docs/RUNBOOK_LOAD_TESTING.md` for
> rate-limit verification; run `pnpm build` for compile-time security checks.

---

## 1. Authentication (JWT, MFA, SSO)

| Measure                                | Status | Where                                                                  |
| -------------------------------------- | ------ | ---------------------------------------------------------------------- |
| JWT-based session with httpOnly cookie | ✅     | `apps/api/src/modules/auth/` — Auth.js (NextAuth)                      |
| MFA (TOTP) with encrypted secrets      | ✅     | `apps/api/src/modules/auth/auth-mfa.service.ts` — `MFA_ENCRYPTION_KEY` |
| OAuth (Google, Microsoft)              | ✅     | `apps/api/src/modules/auth/strategies/` — optional integration         |
| Password hashing (bcrypt/scrypt)       | ✅     | `apps/api/src/modules/auth/auth.service.ts`                            |
| Rate-limited login endpoint            | ✅     | `@Throttle()` on `auth.controller.ts` — Track G.7                      |
| Account lockout after failures         | ✅     | `auth.service.ts` — exponential backoff                                |

## 2. Authorization (RBAC)

| Measure                                            | Status | Where                                                           |
| -------------------------------------------------- | ------ | --------------------------------------------------------------- |
| `@Permissions('module.resource.action')` decorator | ✅     | `apps/api/src/common/decorators/permissions.decorator.ts`       |
| `RbacGuard` — deny-by-default enforcement          | ✅     | `apps/api/src/common/guards/rbac.guard.ts`                      |
| Glob/wildcard permission matching (`finance.*`)    | ✅     | `packages/shared/src/permissions/has-permission.ts`             |
| Permission registry                                | ✅     | `packages/shared/src/permissions/registry.ts`                   |
| `@SkipTenantScope()` for cross-tenant admin routes | ✅     | `apps/api/src/common/decorators/skip-tenant-scope.decorator.ts` |

## 3. Tenant Isolation

| Measure                                                        | Status | Where                                                         |
| -------------------------------------------------------------- | ------ | ------------------------------------------------------------- |
| Every DB table has `tenant_id` column                          | ✅     | `packages/database/prisma/schema.prisma`                      |
| Row-Level Security (RLS) policies                              | ✅     | `packages/database/prisma/migrations/` — per-table policies   |
| `TenantInterceptor` — auto-scopes all queries                  | ✅     | `apps/api/src/common/interceptors/tenant.interceptor.ts`      |
| Prisma client extension — `where: { tenantId }` auto-injection | ✅     | `packages/database/src/index.ts`                              |
| AsyncLocalStorage session binding                              | ✅     | `apps/api/src/common/middleware/tenant-context.middleware.ts` |
| `TenantLifecycleController` — tenant CRUD                      | ✅     | `apps/api/src/modules/admin/tenant-lifecycle/`                |

## 4. Request Validation

| Measure                                                  | Status | Where                                                  |
| -------------------------------------------------------- | ------ | ------------------------------------------------------ |
| Zod DTOs shared frontend/backend                         | ✅     | `packages/shared/src/schemas/`                         |
| `ZodValidationPipe` per endpoint                         | ✅     | `apps/api/src/common/pipes/zod-validation.pipe.ts`     |
| Global `AllExceptionsFilter` — consistent error envelope | ✅     | `apps/api/src/common/filters/all-exceptions.filter.ts` |
| No raw `any` in DTO boundaries                           | ✅     | Enforced via `strict: true` in `tsconfig.json`         |

## 5. CSRF Protection

| Measure                                                      | Status | Where                                                         |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------------- |
| Cookie-based CSRF token (`csrf_token`)                       | ✅     | `apps/api/src/common/middleware/csrf.middleware.ts`           |
| Double-submit pattern: cookie + `x-csrf-token` header        | ✅     | Same middleware — `httpOnly: false` cookie, `SameSite=Strict` |
| Safe-method skip (GET/HEAD/OPTIONS)                          | ✅     | Same middleware — `SAFE_METHODS` set                          |
| Bypass for auth routes, public endpoints, storefront, portal | ✅     | Documented exceptions in middleware                           |
| Secure cookie flag in production                             | ✅     | `secure: process.env.NODE_ENV === 'production'`               |

## 6. Rate Limiting

| Measure                                                         | Status | Where                                                              |
| --------------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| Global rate limits (short: 10/s, medium: 100/min)               | ✅     | `apps/api/src/app.module.ts` — `ThrottlerModule.forRoot()`         |
| Per-tenant plan-based limits (free/starter/business/enterprise) | ✅     | `apps/api/src/common/guards/tenant-throttler.guard.ts` — Track G.7 |
| API key rate limiting (separate tracker prefix)                 | ✅     | `tenant-throttler.guard.ts` — `apikey:` prefix                     |
| Redis-backed storage (fallback to in-memory)                    | ✅     | `apps/api/src/common/guards/tenant-throttler-storage.ts`           |
| Custom `@Throttle()` on sensitive endpoints (login, search)     | ✅     | `auth.controller.ts`, `search.controller.ts`                       |
| IP fallback for unauthenticated requests                        | ✅     | `tenant-throttler.guard.ts` — `ip:` tracker                        |

## 7. Idempotency

| Measure                                                 | Status | Where                                                                    |
| ------------------------------------------------------- | ------ | ------------------------------------------------------------------------ |
| `Idempotency-Key` header support                        | ✅     | `apps/api/src/common/idempotency/idempotency.interceptor.ts` — Track G.3 |
| Redis-backed key store (in-memory fallback)             | ✅     | `apps/api/src/common/idempotency/idempotency.store.ts`                   |
| In-flight deduplication (concurrent request protection) | ✅     | Same interceptor — `in-flight` state                                     |
| `Idempotency-Replayed: true` response header            | ✅     | Same interceptor — response header on cache hit                          |
| Validation: 8-128 chars, alphanumeric + `_-`            | ✅     | Same interceptor — regex validation                                      |
| Bypass for unauthenticated requests                     | ✅     | Same interceptor — issue #25 fix                                         |

## 8. Security Headers

| Measure                                   | Status | Where                                                                                 |
| ----------------------------------------- | ------ | ------------------------------------------------------------------------------------- |
| Helmet.js middleware                      | ✅     | `apps/api/src/main.ts` — v8 with custom CSP                                           |
| Content-Security-Policy                   | ✅     | Configured: `default-src 'self'`, `frame-ancestors 'none'`, upgrade-insecure-requests |
| CORS (strict origin matching)             | ✅     | `main.ts` — `NEXTAUTH_URL` + `APP_URL` origins only, `credentials: true`              |
| `X-Content-Type-Options: nosniff`         | ✅     | Helmet default                                                                        |
| `X-Frame-Options: DENY`                   | ✅     | Helmet default                                                                        |
| `X-XSS-Protection: 0`                     | ✅     | Helmet default                                                                        |
| `Strict-Transport-Security`               | ✅     | Helmet default (HSTS)                                                                 |
| `Referrer-Policy`                         | ✅     | Helmet default                                                                        |
| `Cross-Origin-Opener-Policy: same-origin` | ✅     | `apps/api/src/main.ts` — explicit via helmet options                                  |
| `Cross-Origin-Embedder-Policy`            | ✅     | Explicitly disabled (needed for some 3rd-party scripts)                               |

## 9. Audit Trail

| Measure                                                       | Status | Where                                                                      |
| ------------------------------------------------------------- | ------ | -------------------------------------------------------------------------- |
| Always-on `AuditInterceptor` (who did what, when)             | ✅     | `apps/api/src/common/interceptors/audit.interceptor.ts`                    |
| Field-level `@TrackChanges('EntityType')` decorator           | ✅     | `apps/api/src/common/decorators/track-changes.decorator.ts`                |
| `ChangeHistoryInterceptor` — automatic diff recording         | ✅     | Same decorator package                                                     |
| `<ChangeHistory entityType="X" entityId={id} />` UI component | ✅     | `packages/ui/` — ERPNext-style timeline                                    |
| Secret redaction in audit body snapshots                      | ✅     | `audit.interceptor.ts` — `safeBody()` redacts password/token/secret/apiKey |

## 10. PII Erasure & Data Privacy

| Measure                                                   | Status | Where                                    |
| --------------------------------------------------------- | ------ | ---------------------------------------- |
| Field-level PII encryption key                            | ✅     | `PII_ENCRYPTION_KEY` env var — Track H.1 |
| MFA secret encryption key (separate, fallback to PII key) | ✅     | `MFA_ENCRYPTION_KEY` env var             |
| Data retention policy documented                          | ✅     | `docs/DATA_RETENTION_MATRIX.md`          |
| Deletion policy documented                                | ✅     | `docs/DELETION_POLICY.md`                |

## 11. Secrets Management

| Measure                                                  | Status | Where                                                                                                                                                            |
| -------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.env.example` generated from Zod schema                 | ✅     | `scripts/generate-env-example.mjs` — Track G.6                                                                                                                   |
| Boot-time env validation (`validateEnv()`)               | ✅     | `apps/api/src/common/config/env.schema.ts` — fail-fast, aggregated report                                                                                        |
| Production strict checks (min 32 chars, no placeholders) | ✅     | `checkEnv()` — `NEXTAUTH_SECRET`, `PII_ENCRYPTION_KEY`, `EXT_SERVICE_JWT_SECRET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` |
| Production localhost DB check                            | ✅     | `checkEnv()` — rejects `DATABASE_URL` containing `localhost`                                                                                                     |
| No hardcoded secrets in code                             | ✅     | Enforced via lint (ESLint `no-process-env` exceptions only in schema)                                                                                            |
| `SENTRY_DSN` gated — only initializes if set             | ✅     | `main.ts` — `if (process.env.SENTRY_DSN)`                                                                                                                        |

## 12. CVE Scanning

| Measure                                                         | Status | Where                                          |
| --------------------------------------------------------------- | ------ | ---------------------------------------------- |
| CI pipeline dependency audit                                    | ✅     | `pnpm audit` in CI workflow                    |
| `dependency-cruiser` — module boundary enforcement              | ✅     | `apps/api/.dependency-cruiser.cjs` — Track I.4 |
| `pnpm architecture:check` — rejects direct cross-module imports | ✅     | Root `package.json` script                     |
| TypeScript strict mode — prevents common injection classes      | ✅     | All `tsconfig.json` files — `strict: true`     |

## 13. SQL Injection Prevention

| Measure                                               | Status | Where                                                 |
| ----------------------------------------------------- | ------ | ----------------------------------------------------- |
| Parameterized queries via Prisma ORM                  | ✅     | Every query goes through Prisma — no raw SQL executed |
| Row-Level Security (RLS) — defense in depth           | ✅     | PostgreSQL RLS policies on all tenant-scoped tables   |
| Zod input validation — type coercion prevented        | ✅     | Zod schemas enforce types before DB interaction       |
| No raw query builders exposed                         | ✅     | Architecture rule — audited via `dependency-cruiser`  |
| `PrismaClient` extension auto-injects tenantId filter | ✅     | `packages/database/src/index.ts`                      |

