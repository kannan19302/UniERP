const fs = require('fs');

// 1. Fix workflow.dtos.ts
let wfDtOs = fs.readFileSync('d:/UniERP/unierp-api/src/modules/workflow/workflow.dtos.ts', 'utf8');
wfDtOs = wfDtOs.replace(/export type CompleteTaskInput = [^;]+;/g, '');
fs.writeFileSync('d:/UniERP/unierp-api/src/modules/workflow/workflow.dtos.ts', wfDtOs);

// 2. Fix crm-coaching.controller.ts imports
let crmCtrl = fs.readFileSync('d:/UniERP/unierp-api/src/modules/crm/crm-coaching.controller.ts', 'utf8');
crmCtrl = crmCtrl.replace(/CreateScorecardInput,\n/g, ''); // Remove from the service import
if (!crmCtrl.includes('CreateScorecardInput } from "@kannan19302/shared"')) {
  crmCtrl = 'import { CreateScorecardInput } from "@kannan19302/shared";\n' + crmCtrl;
}
fs.writeFileSync('d:/UniERP/unierp-api/src/modules/crm/crm-coaching.controller.ts', crmCtrl);

// 3. Fix inventory/shared/index.ts
let invShared = fs.readFileSync('d:/UniERP/unierp-api/src/modules/inventory/shared/index.ts', 'utf8');
invShared = invShared.replace(/import \{ CreateCategoryInput, UpdateCategoryInput \} from "@kannan19302\/shared";/g, 'export { CreateCategoryInput, UpdateCategoryInput } from "@kannan19302/shared";');
fs.writeFileSync('d:/UniERP/unierp-api/src/modules/inventory/shared/index.ts', invShared);
console.log('Fixed imports and exports');
