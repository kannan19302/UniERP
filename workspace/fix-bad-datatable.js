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

  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('import {') && lines[i].includes('DataTable')) {
      if (!lines[i].includes('@kannan19302/ui')) {
        lines[i] = lines[i].replace(/DataTable,\s*/, '');
      } else {
        // If it's @kannan19302/ui but has multiple DataTables
        const parts = lines[i].split('DataTable');
        if (parts.length > 2) {
           lines[i] = lines[i].replace(/DataTable,\s*/, '');
        }
      }
    }
  }
  content = lines.join('\n');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed bad datatable import in', file);
  }
});
