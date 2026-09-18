<!-- UniERP-Enterprise-SAAS-Workflow: 1.0.0 -->
# UniERP Enterprise SAAS End-to-End Delivery Workflow

This document details the standardized 7-phase implementation workflow that every AI agent and software engineer must follow when designing, developing, testing, and shipping features across all 31 repositories in the UniERP polyrepo.

```
       L0 CONTRACTS         contracts (DTOs, Zod, OpenAPI, Events)
            │
            ▼
       L2 DATA             data (Prisma multi-schema, setup-rls.sql, seed)
            │
            ▼
       L3 SERVICE          api + idp + auth (NestJS Module, Repo, Svc, Ctrl, @Permissions)
            │
            ▼
       L1/L2 SDK & EXT     sdk + extension-api + extensions (TS & Dart SDKs, Hooks)
            │
            ▼
       L1/L4/L5 UI & APP   design-system + tenant-apps + OCC + PCC + builders + mobile
            │
            ▼
       QUALITY GATES       Unit + 4-Part RLS + Axe a11y + Playwright E2E
            │
            ▼
       GOVERNANCE RUN      run-enterprise-saas-engine.mjs (% progress calculation)
```

---

## Phase 1: Contract-First Modeling (L0 — `unierp-contracts`)

Every new entity, API endpoint, or event starts in `d:\UniERP\unierp-contracts`.

1. **Author DTOs and Zod Validation Schemas**:
   - Define strict input/output contracts with Zod schemas.
   - Example: `src/crm/lead.contract.ts`:
     ```typescript
     import { z } from 'zod';

     export const CreateLeadSchema = z.object({
       companyName: z.string().min(2).max(100),
       contactName: z.string().min(2).max(100),
       email: z.string().email(),
       phone: z.string().optional(),
       estimatedValue: z.number().positive().optional(),
       source: z.enum(['WEBSITE', 'REFERRAL', 'CAMPAIGN', 'INBOUND_CALL', 'PARTNER']),
       industryVertical: z.string().default('MANUFACTURING'),
     });

     export type CreateLeadDto = z.infer<typeof CreateLeadSchema>;
     ```
2. **Author Domain Events**:
   - Define event payload, schema version, and outbox topic:
     ```typescript
     export interface LeadConvertedEvent {
       eventId: string;
       tenantId: string;
       leadId: string;
       opportunityId: string;
       accountId: string;
       contactId: string;
       timestamp: string;
     }
     ```
3. **Export via Package Barrel**: Ensure export in `src/index.ts` and run `pnpm build`.

---

## Phase 2: Database Modeling & PostgreSQL RLS Migration (L2 — `data`)

1. **Add Model to Multi-Schema Prisma**:
   - In `d:\UniERP\data\prisma\schema.prisma` (or appropriate sub-schema under `prisma/schemas/`):
     ```prisma
     model Lead {
       id               String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
       tenantId         String    @db.Uuid
       companyName      String    @db.VarChar(100)
       contactName      String    @db.VarChar(100)
       email            String    @db.VarChar(255)
       phone            String?   @db.VarChar(50)
       status           String    @default("NEW") @db.VarChar(30)
       estimatedValue   Decimal?  @db.Decimal(19, 4)
       source           String    @db.VarChar(50)
       industryVertical String    @default("MANUFACTURING") @db.VarChar(50)
       createdAt        DateTime  @default(now()) @db.Timestamptz(6)
       updatedAt        DateTime  @updatedAt @db.Timestamptz(6)

       @@index([tenantId, status])
       @@index([tenantId, email])
       @@map("leads")
       @@schema("crm")
     }
     ```
2. **Generate Migration & Append RLS Policy**:
   - Create migration: `pnpm prisma migrate dev --create-only --name add_crm_leads`.
   - In the migration SQL file or `setup-rls.sql`, append the mandatory RLS policy:
     ```sql
     ALTER TABLE "crm"."leads" ENABLE ROW LEVEL SECURITY;
     ALTER TABLE "crm"."leads" FORCE ROW LEVEL SECURITY;

     DROP POLICY IF EXISTS crm_leads_tenant_isolation ON "crm"."leads";
     CREATE POLICY crm_leads_tenant_isolation ON "crm"."leads"
       FOR ALL
       USING ("tenantId" = current_setting('app.current_tenant_id', true)::uuid)
       WITH CHECK ("tenantId" = current_setting('app.current_tenant_id', true)::uuid);
     ```
3. **Update Prisma Client**: Run `pnpm prisma generate`.

---

## Phase 3: Backend Domain Service & Secure Endpoints (L3 — `api`)

1. **Domain Repository (`<domain>.repository.ts`)**:
   - Implement data access with tenant isolation passed through context:
     ```typescript
     @Injectable()
     export class LeadRepository {
       constructor(private readonly prisma: PrismaService) {}

       async create(tenantId: string, data: CreateLeadDto): Promise<Lead> {
         return this.prisma.lead.create({
           data: { ...data, tenantId },
         });
       }

       async findById(tenantId: string, id: string): Promise<Lead | null> {
         return this.prisma.lead.findFirst({
           where: { id, tenantId },
         });
       }
     }
     ```
2. **Domain Service (`<domain>.service.ts`)**:
   - Orchestrate business logic, dispatch outbox events within transaction:
     ```typescript
     @Injectable()
     export class LeadService {
       constructor(
         private readonly repo: LeadRepository,
         private readonly outbox: OutboxService,
       ) {}

       async createLead(tenantId: string, dto: CreateLeadDto): Promise<Lead> {
         const lead = await this.repo.create(tenantId, dto);
         await this.outbox.publish({
           tenantId,
           topic: 'crm.lead.created',
           payload: lead,
         });
         return lead;
       }
     }
     ```
3. **Controller (`<domain>.controller.ts`)**:
   - Thin controller with `@Permissions` and `@ZodBody`:
     ```typescript
     @Controller('crm/leads')
     @UseGuards(JwtAuthGuard, RbacGuard)
     export class LeadController {
       constructor(private readonly service: LeadService) {}

       @Post()
       @Permissions('crm:leads:create')
       async create(
         @TenantContext() tenant: TenantSession,
         @ZodBody(CreateLeadSchema) body: CreateLeadDto,
       ) {
         return this.service.createLead(tenant.id, body);
       }
     }
     ```
4. **Register Permissions**: Add `'crm:leads:create'`, `'crm:leads:read'`, etc., to Auth/IDP permission catalog.

---

## Phase 4: SDK, Extension & Developer Platform (L1/L2 — `sdk`, `extension-api`)

1. **Auto-Generate TypeScript & Flutter SDK Clients**:
   - Run SDK generator script in `d:\UniERP\sdk` to produce typed methods:
     `client.crm.leads.create({ companyName: 'Acme Corp', ... })`.
2. **Expose Webhook & Extension Points**:
   - In `d:\UniERP\extension-api`, register lifecycle hooks: `onBeforeLeadCreate`, `onAfterLeadConverted`.

---

## Phase 5: UI Implementation with Strata DL 2.0 Floorplans (L4/L5)

Scaffold page in `tenant-apps` (or appropriate platform) using one of the 8 Canonical Floorplans:

1. **Select Floorplan**: For list of leads, use `DataWorkspace`. For lead detail, use `RecordShell`.
2. **Zero-Mock Data Hook**:
   - Wire using `useApiQuery('/crm/leads')`.
   - Never provide fallback hardcoded arrays.
   - Use `EmptyState` component when data array is empty.
3. **Density & Tokens**:
   - Apply `data-density="compact"`.
   - Use `var(--color-bg-elevated)`, `var(--space-3)`, etc.

---

## Phase 6: Full-Stack Quality Proofs & Boundary Verification

Every PR or agent change must provide 4 proofs:
1. **Unit Test**: Co-located with service and repository (`*.spec.ts`), testing edge cases.
2. **PostgreSQL RLS 4-Part Isolation Test**:
   - Run integration test verifying Tenant A, Tenant B, cross-tenant isolation, and no-context queries using a `NOBYPASSRLS` role.
3. **Vitest-Axe Accessibility Test**:
   - Component test verifying `axe(container)` produces 0 violations.
4. **End-to-End Route Reachability**:
   - Playwright test checking navigation, page loading, table render, and modal action.

---

## Phase 7: Governance Verification & Real-Time Percentage Tracking

1. Execute the master engine runner:
   ```bash
   cd d:\UniERP\unierp-workspace
   node scripts/run-enterprise-saas-engine.mjs
   ```
2. The runner evaluates:
   - UI Token & Floorplan compliance.
   - Database schema & RLS universality.
   - API endpoints, permissions, and DTO validation.
   - Test suites and coverage.
   - Platform & Industry vertical coverage.
3. If percentage < 100%:
   - Read the failing gates and missing items in the console output.
   - Re-enter the remediation loop for the failing repository.
   - Re-run the engine until 100% is achieved.

---

## Phase 8: Polyrepo Git Commit & Push to GitHub (Mandatory Loop Conclusion)

Per `LAW-11`, no autonomous iteration or user-directed cycle is complete without pushing verified changes to GitHub:

1. **Detect Modified Repositories**:
   Scan all 31 repositories for uncommitted changes using `git status --porcelain`.
2. **Execute Pre-Push Gate Validation**:
   Ensure `check-ai-agent-protocol.mjs` and `sync-ai-agent-governance.mjs --check` pass cleanly.
3. **Stage All Modified and Untracked Code**:
   Execute `git add -A` in each repository with changes.
4. **Commit with Conventional Commit Format**:
   ```bash
   git commit -m "feat(enterprise-saas): <summary of verified changes> - <score>% governance pass"
   ```
5. **Push to Remote GitHub Origin**:
   ```bash
   git push origin <current-branch>
   ```
6. **Update Execution Ledger**:
   Record the git commit hashes, branch, and push status in `.agents/memory/ENTERPRISE_SAAS_EXECUTION_LEDGER.json`.
