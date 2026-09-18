import fs from 'node:fs';
import path from 'node:path';
const data=JSON.parse(fs.readFileSync(path.join(import.meta.dirname,'screen-inventory.json'),'utf8'));
console.log(JSON.stringify(data.screens.map(s=>({id:s.id,repo:s.repo,route:s.route,file:s.file,module:s.module,title:s.title,kind:s.kind,labels:s.labels.slice(0,8),columns:s.columns.slice(0,6),states:s.states}))));
