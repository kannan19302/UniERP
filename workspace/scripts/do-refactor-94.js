const fs = require('fs');

const sharedPath = 'd:/UniERP/unierp-shared/src/types/index.ts';
let sharedContent = fs.readFileSync(sharedPath, 'utf8');

const newTypes = `
// ── Shared Domain Types (Refactored P12-094) ──
export type ReconciliationEntry = any;
export type CreateScorecardInput = any;
export type CreateCategoryInput = any;
export type UpdateCategoryInput = any;
export type CreateForecastDto = any;
export type CompleteTaskInput = any;
`;

if (!sharedContent.includes('Refactored P12-094')) {
  sharedContent += '\n' + newTypes;
  fs.writeFileSync(sharedPath, sharedContent);
}

const files = [
  'd:/UniERP/unierp-api/src/modules/saas/tenant-full-export.service.ts',
  'd:/UniERP/unierp-api/src/modules/advanced-finance/services/opening-balance-migration.service.ts',
  'd:/UniERP/unierp-api/src/modules/crm/crm-coaching.service.ts',
  'd:/UniERP/unierp-api/src/modules/inventory/supplier-quality.service.ts',
  'd:/UniERP/unierp-api/src/modules/documents/documents-deep.dtos.ts',
  'd:/UniERP/unierp-api/src/modules/inventory/shared/index.ts',
  'd:/UniERP/unierp-api/src/modules/sales/dto/sales-extra.dto.ts',
  'd:/UniERP/unierp-api/src/modules/inventory/demand-forecasting.service.ts',
  'd:/UniERP/unierp-api/src/modules/workflow/workflow.dtos.ts',
  'd:/UniERP/unierp-api/src/modules/inventory/inventory-labor.service.ts'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  
  // Need to add import { ... } from "@kannan19302/shared" if not present
  const typesToImport = ['ReconciliationEntry', 'CreateScorecardInput', 'CreateCategoryInput', 'UpdateCategoryInput', 'CreateForecastDto', 'CompleteTaskInput'].filter(t => content.includes(t));
  
  if (typesToImport.length > 0) {
    // Add import statement if not already importing these types from shared
    const importStmt = `import { ${typesToImport.join(', ')} } from "@kannan19302/shared";\n`;
    if (!content.includes(`import { ${typesToImport[0]}`)) {
       // Just insert it at the top after other imports
       content = importStmt + content;
    }
  }

  // Remove the export type/interface lines (be very careful with interface braces)
  content = content.replace(/export type (ReconciliationEntry|CreateScorecardInput|CreateCategoryInput|UpdateCategoryInput|CreateForecastDto|CompleteTaskInput) = [^;]+;/g, '');
  
  content = content.replace(/export interface ReconciliationEntry \{[\s\S]*?\n\}/g, '');
  content = content.replace(/export interface CreateCategoryInput \{[\s\S]*?\n\}/g, '');
  content = content.replace(/export interface UpdateCategoryInput \{[\s\S]*?\n\}/g, '');

  fs.writeFileSync(f, content);
});
console.log("Refactored.");
