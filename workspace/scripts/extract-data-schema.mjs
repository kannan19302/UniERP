import fs from 'fs';
import path from 'path';

const schemaDir = 'd:/UniERP/data/prisma/schema';
const files = fs.readdirSync(schemaDir).filter(f => f.endsWith('.prisma'));

const schemaReport = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(schemaDir, file), 'utf8');
  const models = [];
  const modelRegex = /model\s+([A-Za-z0-9_]+)\s+\{([\s\S]*?)\}/g;
  let mMatch;
  while ((mMatch = modelRegex.exec(content)) !== null) {
    const modelName = mMatch[1];
    const body = mMatch[2];
    const fields = body.split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('//') && !l.startsWith('@@'))
      .map(l => l.split(/\s+/)[0]);
    const hasTenantId = body.includes('tenantId');
    models.push({ modelName, fieldCount: fields.length, hasTenantId, fields: fields.slice(0, 8) });
  }
  
  const enums = [];
  const enumRegex = /enum\s+([A-Za-z0-9_]+)\s+\{([\s\S]*?)\}/g;
  let eMatch;
  while ((eMatch = enumRegex.exec(content)) !== null) {
    enums.push(eMatch[1]);
  }
  
  schemaReport.push({
    file,
    modelsCount: models.length,
    models,
    enumsCount: enums.length,
    enums
  });
}

console.log('Schema files count:', schemaReport.length);
console.log('Total models:', schemaReport.reduce((acc, f) => acc + f.modelsCount, 0));
console.log('Total enums:', schemaReport.reduce((acc, f) => acc + f.enumsCount, 0));

fs.writeFileSync('d:/UniERP/unierp-workspace/scripts/data-schema-report.json', JSON.stringify(schemaReport, null, 2));
