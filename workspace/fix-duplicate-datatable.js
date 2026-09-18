const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('d:/UniERP/unierp-web/app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Fix duplicate DataTable imports on the same line
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('import {') && lines[i].includes('DataTable') && lines[i].includes('@kannan19302/ui')) {
      // split by DataTable
      const parts = lines[i].split('DataTable');
      if (parts.length > 2) {
         // More than one DataTable!
         // replace the first "DataTable, " with ""
         lines[i] = lines[i].replace('DataTable, ', '');
      }
    }
  }
  content = lines.join('\n');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed duplicates in', file);
  }
});
