import fs from 'fs';
import path from 'path';

const prismaDir = path.resolve('packages/database/prisma');
const schemaPath = path.join(prismaDir, 'schema.prisma');
const outDir = path.join(prismaDir, 'schema');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const schemaStr = fs.readFileSync(schemaPath, 'utf8');

const blocks = [];
let currentBlock = null;
const lines = schemaStr.split('\n');

for (const line of lines) {
  if (line.match(/^(model|enum|datasource|generator)\s+/)) {
    currentBlock = { type: line.split(' ')[0], name: line.split(' ')[1], lines: [line] };
    blocks.push(currentBlock);
  } else if (currentBlock) {
    currentBlock.lines.push(line);
    if (line.startsWith('}')) {
      currentBlock = null;
    }
  } else {
    // Top-level comments or empty lines
    blocks.push({ type: 'text', lines: [line] });
  }
}

// Group models by prefix
function getContext(name) {
  if (name.startsWith('Web') || name.startsWith('Site')) return 'web';
  if (name.startsWith('Crm') || name.startsWith('Lead') || name.startsWith('Opportunity')) return 'crm';
  if (name.startsWith('Hr') || name.startsWith('Employee') || name.startsWith('Payroll') || name.startsWith('Leave')) return 'hr';
  if (name.startsWith('Fin') || name.startsWith('Account') || name.startsWith('Ledger') || name.startsWith('Invoice') || name.startsWith('Payment')) return 'finance';
  if (name.startsWith('Edu') || name.startsWith('Student') || name.startsWith('Course') || name.startsWith('Class')) return 'education';
  if (name.startsWith('Health') || name.startsWith('Patient') || name.startsWith('Doctor') || name.startsWith('Clinic') || name.startsWith('Appointment')) return 'healthcare';
  if (name.startsWith('Prop') || name.startsWith('Unit') || name.startsWith('Lease') || name.startsWith('RealEstate')) return 'real-estate';
  if (name.startsWith('Field') || name.startsWith('WorkOrder') || name.startsWith('Technician')) return 'field-service';
  if (name.startsWith('Mfg') || name.startsWith('Bom') || name.startsWith('Routing') || name.startsWith('WorkCenter')) return 'manufacturing';
  if (name.startsWith('Inv') || name.startsWith('Stock') || name.startsWith('Warehouse') || name.startsWith('Item')) return 'inventory';
  if (name.startsWith('Pos') || name.startsWith('Register') || name.startsWith('Receipt')) return 'pos';
  if (name.startsWith('Pro') || name.startsWith('Task') || name.startsWith('Milestone')) return 'projects';
  
  return 'core';
}

const contexts = {};

// We extract datasource/generator for the main file
let mainConfig = '';

for (const block of blocks) {
  if (block.type === 'datasource' || block.type === 'generator') {
    let blockStr = block.lines.join('\n');
    if (block.type === 'generator' && blockStr.includes('provider = "prisma-client-js"')) {
      if (!blockStr.includes('previewFeatures')) {
        blockStr = blockStr.replace('}', '  previewFeatures = ["prismaSchemaFolder"]\n}');
      } else if (!blockStr.includes('"prismaSchemaFolder"')) {
        blockStr = blockStr.replace(/previewFeatures\s*=\s*\[(.*?)\]/, 'previewFeatures = [$1, "prismaSchemaFolder"]');
      }
    }
    mainConfig += blockStr + '\n\n';
    continue;
  }
  
  if (block.type === 'text') continue;

  const ctx = getContext(block.name);
  if (!contexts[ctx]) contexts[ctx] = [];
  contexts[ctx].push(block.lines.join('\n'));
}

// Write the main config back to schema.prisma (or rather, schema/base.prisma if using folder, but standard is schema.prisma is ignored or used as base)
// Prisma schema folder feature requires a single schema.prisma OR everything inside schema folder.
// Actually, with prismaSchemaFolder, you usually put everything in `schema/` folder.
fs.writeFileSync(path.join(outDir, 'config.prisma'), mainConfig);

for (const [ctx, blockStrs] of Object.entries(contexts)) {
  fs.writeFileSync(path.join(outDir, `${ctx}.prisma`), blockStrs.join('\n\n') + '\n');
}

// Rename the old schema.prisma to avoid conflicts
fs.renameSync(schemaPath, schemaPath + '.bak');

console.log(`Successfully split 36,000+ line schema into ${Object.keys(contexts).length} context files.`);
