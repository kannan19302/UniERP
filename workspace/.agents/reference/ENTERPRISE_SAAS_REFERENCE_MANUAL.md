<!-- UniERP-Enterprise-SAAS-Reference: 1.0.0 -->
# Enterprise SAAS Reference Manual: Canonical Code Blueprints

This manual provides authoritative, copy-pasteable code blueprints for UI floorplans, NestJS modules, database migrations with RLS, and end-to-end test suites.

---

## Blueprint 1: The 8 Canonical Strata Floorplans (`@kannan19302/ui/shell`)

### 1. `DataWorkspace` (High-Density Tabular Workspace)
Use for lists of leads, accounts, invoices, employees, and inventory items.
```tsx
'use client';

import React, { useState } from 'react';
import { DataWorkspace } from '@kannan19302/ui/shell';
import { DataTable } from '@kannan19302/ui/data-display';
import { Button, Input } from '@kannan19302/ui/primitives';
import { useApiQuery } from '@/hooks/useApiQuery';

export function LeadsWorkspace() {
  const [search, setSearch] = useState('');
  const { data, loading, error, refetch } = useApiQuery<Lead[]>('/crm/leads', { search });

  return (
    <DataWorkspace
      data-density="compact"
      title="Leads & Inbound Triage"
      subtitle="Manage, score, and convert sales prospects across all channels"
      actions={
        <Button variant="primary" size="sm" onClick={() => openCreateModal()}>
          + New Lead
        </Button>
      }
      filterBar={
        <Input
          placeholder="Filter by company, contact, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    >
      <DataTable
        columns={[
          { key: 'companyName', header: 'Company', sortable: true },
          { key: 'contactName', header: 'Contact', sortable: true },
          { key: 'email', header: 'Email' },
          { key: 'status', header: 'Status', render: (val) => <StatusBadge status={val} /> },
          { key: 'estimatedValue', header: 'Est. Value', align: 'right', render: (val) => formatMoney(val) },
        ]}
        data={data?.items || []}
        loading={loading}
        emptyStateTitle="No leads found"
        emptyStateDescription="Get started by creating your first sales lead or importing contacts."
      />
    </DataWorkspace>
  );
}
```

### 2. `RecordShell` (3-Column Object Detail Floorplan)
Use for detail views of customers, patients, properties, and purchase orders.
```tsx
export function LeadDetailShell({ leadId }: { leadId: string }) {
  const { data: lead } = useApiQuery<Lead>(`/crm/leads/${leadId}`);

  return (
    <RecordShell
      data-density="compact"
      header={
        <RecordHeader
          title={lead?.companyName || 'Loading...'}
          subtitle={lead?.contactName}
          status={<StatusBadge status={lead?.status} />}
          actions={<Button variant="primary">Convert to Deal</Button>}
        />
      }
      leftSidebar={<AnchorNavigation items={['Overview', 'Timeline', 'Quotes', 'Notes']} />}
      mainContent={<LeadSummaryCard lead={lead} />}
      rightSidebar={<ActivityTimeline leadId={leadId} />}
    />
  );
}
```

### 3. `TransactionWorkspace` (Financial / Document Line-Items Floorplan)
Use for Sales Orders, Invoices, Purchase Orders, and Bill of Materials.
```tsx
export function InvoiceTransactionWorkspace() {
  return (
    <TransactionWorkspace
      data-density="ultra-compact"
      headerCard={<InvoiceHeaderMetadata />}
      lineItemsGrid={<EditableDataGrid columns={invoiceColumns} data={lines} onCellChange={handleRecalc} />}
      summaryCard={<TotalsCalculation subtotal={subtotal} tax={tax} grandTotal={grandTotal} />}
      actionBar={<Button variant="primary">Post to General Ledger</Button>}
    />
  );
}
```

---

## Blueprint 2: NestJS 6-Part Backend Module Blueprint

### 1. Module (`src/modules/crm/crm.module.ts`)
```typescript
import { Module } from '@nestjs/common';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { LeadRepository } from './lead.repository';
import { LeadEventHandler } from './lead.event-handler';

@Module({
  controllers: [LeadController],
  providers: [LeadService, LeadRepository, LeadEventHandler],
  exports: [LeadService, LeadRepository],
})
export class CrmModule {}
```

### 2. Controller with Permissions & Zod (`src/modules/crm/lead.controller.ts`)
```typescript
import { Controller, Get, Post, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RbacGuard, Permissions, TenantContext, TenantSession, ZodBody } from '@kannan19302/auth';
import { CreateLeadSchema, CreateLeadDto } from '@kannan19302/contracts';
import { LeadService } from './lead.service';

@Controller('crm/leads')
@UseGuards(JwtAuthGuard, RbacGuard)
export class LeadController {
  constructor(private readonly service: LeadService) {}

  @Get()
  @Permissions('crm:leads:read')
  async list(@TenantContext() tenant: TenantSession, @Query() query: any) {
    return this.service.list(tenant.id, query);
  }

  @Post()
  @Permissions('crm:leads:create')
  async create(@TenantContext() tenant: TenantSession, @ZodBody(CreateLeadSchema) body: CreateLeadDto) {
    return this.service.create(tenant.id, body);
  }
}
```

---

## Blueprint 3: PostgreSQL RLS Policy & 4-Part Isolation Test

### SQL Migration (`setup-rls.sql`)
```sql
ALTER TABLE "crm"."leads" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "crm"."leads" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS crm_leads_isolation ON "crm"."leads";
CREATE POLICY crm_leads_isolation ON "crm"."leads"
  FOR ALL
  USING ("tenantId" = current_setting('app.current_tenant_id', true)::uuid)
  WITH CHECK ("tenantId" = current_setting('app.current_tenant_id', true)::uuid);
```

### Vitest 4-Part Isolation Test (`lead-isolation.spec.ts`)
```typescript
import { describe, it, expect } from 'vitest';
import { createNonSuperuserClient } from '@/test/test-db-client';

describe('CRM Leads PostgreSQL RLS Isolation (NOBYPASSRLS)', () => {
  const tenantA = 'a0000000-0000-0000-0000-000000000001';
  const tenantB = 'b0000000-0000-0000-0000-000000000002';

  it('proves 4-part isolation under NOBYPASSRLS', async () => {
    const client = await createNonSuperuserClient();

    // 1. Tenant A inserts lead
    await client.query(`SET LOCAL app.current_tenant_id = '${tenantA}'`);
    await client.query(`INSERT INTO crm.leads ("id", "tenantId", "companyName", "email") VALUES (gen_random_uuid(), '${tenantA}', 'Acme Corp', 'info@acme.com')`);

    // 2. Tenant A queries and sees 1 row (Positive Assertion)
    const resA = await client.query(`SELECT * FROM crm.leads`);
    expect(resA.rowCount).toBe(1);

    // 3. Tenant B queries and sees 0 rows (Negative Assertion)
    await client.query(`SET LOCAL app.current_tenant_id = '${tenantB}'`);
    const resB = await client.query(`SELECT * FROM crm.leads`);
    expect(resB.rowCount).toBe(0);

    // 4. Session without tenant context sees 0 rows (Fail-Closed Assertion)
    await client.query(`RESET app.current_tenant_id`);
    const resNone = await client.query(`SELECT * FROM crm.leads`);
    expect(resNone.rowCount).toBe(0);
  });
});
```
