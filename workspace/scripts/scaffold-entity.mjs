#!/usr/bin/env node
/**
 * scripts/scaffold-entity.mjs — Code generator for new UniERP entity slices.
 *
 * Generates NestJS module boilerplate, DTOs, service, controller, and Next.js listing/form pages.
 *
 * Usage:
 *   node scripts/scaffold-entity.mjs --module crm --entity LeadSource --fields "name:string,code:string,active:boolean"
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
};

const moduleName = arg('module');
const entityName = arg('entity');
const fieldsRaw = arg('fields') || '';

if (!moduleName || !entityName) {
  console.log(`
Usage:
  node scripts/scaffold-entity.mjs --module <module-name> --entity <EntityName> [--fields <field-definitions>]

Example:
  node scripts/scaffold-entity.mjs --module hr --entity LeaveRequest --fields "employeeId:string,status:string,durationDays:number"
`);
  process.exit(0);
}

const entityLower = entityName.toLowerCase();
const entityKebab = entityLower.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const fields = fieldsRaw.split(',').filter(Boolean).map(f => {
  const [name, type] = f.split(':');
  return { name: name.trim(), type: (type || 'string').trim() };
});

const moduleDir = path.join(root, 'apps', 'api', 'src', 'modules', moduleName);
if (!existsSync(moduleDir)) {
  console.error(`Error: Module directory ${moduleDir} does not exist. Create the module first.`);
  process.exit(1);
}

const dtoDir = path.join(moduleDir, 'dto');
mkdirSync(dtoDir, { recursive: true });

// 1. Generate DTO files
const dtoContent = `import { z } from 'zod';

export const create${entityName}Schema = z.object({
${fields.map(f => `  ${f.name}: z.${f.type === 'number' ? 'number()' : f.type === 'boolean' ? 'boolean()' : 'string()'},`).join('\n')}
});

// Track G.2: updates carry the version the client loaded (optimistic locking).
export const update${entityName}Schema = create${entityName}Schema.partial().extend({
  expectedVersion: z.coerce.number().int().min(1),
});

export type Create${entityName}Input = z.infer<typeof create${entityName}Schema>;
export type Update${entityName}Input = z.infer<typeof update${entityName}Schema>;
`;

const dtoPath = path.join(dtoDir, `${entityKebab}.dto.ts`);
writeFileSync(dtoPath, dtoContent, 'utf8');
console.log(`✅ Generated DTO: ${dtoPath}`);

// 2. Generate Service file
const serviceContent = `import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService, updateWithVersionGuard } from '@kannan19302/database';
// Track G.9 platform contracts: list query + pagination meta come from @kannan19302/shared.
import { buildPaginationMeta, listQuerySchema, type ListQuery } from '@kannan19302/shared';
import { Create${entityName}Input, Update${entityName}Input } from './dto/${entityKebab}.dto';

@Injectable()
export class ${entityName}Service {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, input: Create${entityName}Input, userId: string) {
    return this.prisma.${entityLower}.create({
      data: {
        ...input,
        tenantId,
        createdBy: userId,
        updatedBy: userId,
      },
    });
  }

  async findAll(tenantId: string, rawQuery: unknown & { search?: string }) {
    const { page, limit, sortBy, sortOrder }: ListQuery = listQuerySchema.parse(rawQuery);
    const search = typeof rawQuery === 'object' && rawQuery ? (rawQuery as { search?: string }).search : undefined;
    const where: any = { tenantId, deletedAt: null };

    if (search) {
      where.OR = [
        { id: { contains: search, mode: 'insensitive' } },
        // Add searchable text fields here
      ];
    }

    // Allowlist sortable fields — never pass client input straight to orderBy.
    const sortableFields = new Set(['createdAt', 'updatedAt']);
    const orderBy = sortBy && sortableFields.has(sortBy) ? { [sortBy]: sortOrder } : { createdAt: 'desc' as const };

    const [data, total] = await Promise.all([
      this.prisma.${entityLower}.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy,
      }),
      this.prisma.${entityLower}.count({ where }),
    ]);

    return { data, meta: buildPaginationMeta(page, limit, total) };
  }

  async findOne(tenantId: string, id: string) {
    const record = await this.prisma.${entityLower}.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!record) {
      throw new NotFoundException(\`${entityName} not found\`);
    }
    return record;
  }

  // Track G.2 optimistic locking: clients send the version they loaded; a
  // concurrent edit surfaces as HTTP 409 STALE_WRITE via the global filter.
  async update(tenantId: string, id: string, input: Update${entityName}Input & { expectedVersion: number }, userId: string) {
    const { expectedVersion, ...data } = input;
    await updateWithVersionGuard(this.prisma.${entityLower}, { entity: '${entityName}', id, tenantId, expectedVersion }, {
      ...data,
      updatedBy: userId,
    });
    return this.findOne(tenantId, id);
  }

  async remove(tenantId: string, id: string, userId: string) {
    await this.findOne(tenantId, id);
    return this.prisma.${entityLower}.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedBy: userId,
      },
    });
  }
}
`;

const servicePath = path.join(moduleDir, `${entityKebab}.service.ts`);
writeFileSync(servicePath, serviceContent, 'utf8');
console.log(`✅ Generated Service: ${servicePath}`);

// 3. Generate Controller file
const controllerContent = `import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ${entityName}Service } from './${entityKebab}.service';
import { Create${entityName}Input, update${entityName}Schema, create${entityName}Schema } from './dto/${entityKebab}.dto';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { TrackChanges } from '../../common/decorators/track-changes.decorator';
import { ChangeHistoryInterceptor } from '../../common/interceptors/change-history.interceptor';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('api/v1/${moduleName}/${entityKebab}s')
@UseInterceptors(ChangeHistoryInterceptor)
export class ${entityName}Controller {
  constructor(private readonly ${entityLower}Service: ${entityName}Service) {}

  @Post()
  @Permissions('${moduleName}.${entityLower}.create')
  @TrackChanges('${entityName}')
  create(
    @Body(new ZodValidationPipe(create${entityName}Schema)) input: Create${entityName}Input,
    // Add user/tenant extraction decorators based on your auth implementation
  ) {
    const tenantId = 'dummy-tenant-id'; // Replace with real tenant extraction
    const userId = 'dummy-user-id'; // Replace with real user extraction
    return this.${entityLower}Service.create(tenantId, input, userId);
  }

  @Get()
  @Permissions('${moduleName}.${entityLower}.read')
  findAll(@Query() query: any) {
    const tenantId = 'dummy-tenant-id'; // Replace with real tenant extraction
    return this.${entityLower}Service.findAll(tenantId, query);
  }

  @Get(':id')
  @Permissions('${moduleName}.${entityLower}.read')
  findOne(@Param('id') id: string) {
    const tenantId = 'dummy-tenant-id'; // Replace with real tenant extraction
    return this.${entityLower}Service.findOne(tenantId, id);
  }

  @Patch(':id')
  @Permissions('${moduleName}.${entityLower}.update')
  @TrackChanges('${entityName}')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(update${entityName}Schema)) input: any,
  ) {
    const tenantId = 'dummy-tenant-id'; // Replace with real tenant extraction
    const userId = 'dummy-user-id'; // Replace with real user extraction
    return this.${entityLower}Service.update(tenantId, id, input, userId);
  }

  @Delete(':id')
  @Permissions('${moduleName}.${entityLower}.delete')
  @TrackChanges('${entityName}')
  remove(@Param('id') id: string) {
    const tenantId = 'dummy-tenant-id'; // Replace with real tenant extraction
    const userId = 'dummy-user-id'; // Replace with real user extraction
    return this.${entityLower}Service.remove(tenantId, id, userId);
  }
}
`;

const controllerPath = path.join(moduleDir, `${entityKebab}.controller.ts`);
writeFileSync(controllerPath, controllerContent, 'utf8');
console.log(`✅ Generated Controller: ${controllerPath}`);

console.log(`
Scaffolding Complete!
Next Steps:
1. Register service and controller in ${moduleName}.module.ts
2. Add table to packages/database/prisma/schema.prisma:
   model ${entityName} {
     id         String    @id @default(cuid())
     tenantId   String    @map("tenant_id")
     version    Int       @default(1) // Track G.2 optimistic locking
     createdAt  DateTime  @default(now()) @map("created_at")
     updatedAt  DateTime  @updatedAt @map("updated_at")
     deletedAt  DateTime? @map("deleted_at")
     createdBy  String    @map("created_by")
     updatedBy  String    @map("updated_by")
     // Fields (Track G.8: numbers are Decimal — Float is lint-forbidden):
     ${fields.map(f => `${f.name} ${f.type === 'number' ? 'Decimal @db.Decimal(18, 2)' : f.type === 'boolean' ? 'Boolean' : 'String'}`).join('\n     ')}
   }
3. Create the migration (db:push is disabled): prisma migrate dev --create-only, review, then \`pnpm db:deploy\`; run \`pnpm migration:discipline\`.
`);
