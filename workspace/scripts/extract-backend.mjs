import fs from 'fs';
import path from 'path';

function extractControllers(baseDir) {
  const controllers = [];
  function recurse(current) {
    try {
      const items = fs.readdirSync(current, { withFileTypes: true });
      for (const item of items) {
        if (['node_modules', '.git', 'dist', 'coverage'].includes(item.name)) continue;
        const full = path.join(current, item.name);
        if (item.isDirectory()) {
          recurse(full);
        } else if (/controller\.(ts|js)$/i.test(item.name)) {
          const content = fs.readFileSync(full, 'utf8');
          const rel = path.relative(baseDir, full).replace(/\\/g, '/');
          const ctrlMatch = content.match(/@Controller\(['"]?(.*?)['"]?\)/);
          const ctrlRoute = ctrlMatch ? ctrlMatch[1] : '';
          
          const methodRegex = /@(Get|Post|Put|Delete|Patch)\((?:['"](.*?)['"])?\)/g;
          let match;
          const endpoints = [];
          while ((match = methodRegex.exec(content)) !== null) {
            endpoints.push({ http: match[1], path: match[2] || '' });
          }
          
          const permRegex = /@Permissions\((.*?)\)/g;
          let pMatch;
          const perms = [];
          while ((pMatch = permRegex.exec(content)) !== null) {
            perms.push(pMatch[1].replace(/['"]/g, '').trim());
          }
          
          controllers.push({
            file: rel,
            prefix: ctrlRoute,
            endpointsCount: endpoints.length,
            endpoints: endpoints,
            permissions: perms
          });
        }
      }
    } catch(e) {}
  }
  recurse(baseDir);
  return controllers;
}

const apiControllers = extractControllers('d:/UniERP/api/src');
const idpControllers = extractControllers('d:/UniERP/idp/src');

console.log('API Controllers count:', apiControllers.length);
console.log('IDP Controllers count:', idpControllers.length);

fs.writeFileSync('d:/UniERP/unierp-workspace/scripts/api-controllers.json', JSON.stringify({ apiControllers, idpControllers }, null, 2));
