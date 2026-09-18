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

  // Fix rowKey={(...: any) => idx} to rowKey={(...: any, idx: number) => String(idx)}
  content = content.replace(/rowKey=\{\((.*?): any\) => idx\}/g, 'rowKey={($1: any, idx: number) => String(idx)}');
  content = content.replace(/rowKey=\{\((.*?): any\) => index\}/g, 'rowKey={($1: any, index: number) => String(index)}');
  content = content.replace(/rowKey=\{\((.*?): any\) => i\}/g, 'rowKey={($1: any, i: number) => String(i)}');
  
  // Fix Cannot find name 'DataTable' in files that have <DataTable but no import
  if (content.includes('<DataTable') && !content.includes('DataTable } from "@kannan19302/ui"')) {
    content = content.replace('import {', 'import { DataTable,');
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
});
