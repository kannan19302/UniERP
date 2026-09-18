import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const dirs = [
  'D:\\UniERP\\ERPSys\\apps\\web\\src',
  'D:\\UniERP\\ERPSys\\apps\\web\\app'
];

let changedCount = 0;

for (const dir of dirs) {
  if (fs.existsSync(dir)) {
    const files = walk(dir);
    for (const file of files) {
      let content = fs.readFileSync(file, 'utf8');
      const original = content;
      
      // Replace @kannan19302/ui-components -> @kannan19302/ui/components
      // Replace @kannan19302/ui-layout -> @kannan19302/ui/layout
      // etc
      content = content.replace(/@kannan19302\/ui-([a-zA-Z0-9-]+)/g, '@kannan19302/ui/$1');
      
      if (content !== original) {
        fs.writeFileSync(file, content);
        changedCount++;
      }
    }
  }
}

console.log(`Updated imports in ${changedCount} files.`);
