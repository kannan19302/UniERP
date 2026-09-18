import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'../../..');
const files=execFileSync('rg',['--files','unierp-mobile/lib','-g','*.dart'],{cwd:root,encoding:'utf8'}).trim().split(/\r?\n/).map(x=>x.replaceAll('\\','/'));
const screens=[];
for(const file of files){const src=fs.readFileSync(path.join(root,file),'utf8');const route=src.match(/static const(?: String)? routePath\s*=\s*['"]([^'"]+)['"]/)?.[1];if(!route)continue;const labels=[...new Set([...src.matchAll(/(?:labelText|title|hintText):\s*(?:const )?(?:Text\()?['"]([^'"\n]{2,70})['"]/g)].map(m=>m[1]))];screens.push({id:'',repo:'unierp-mobile',file,route,module:route.split('/')[1]||'home',title:labels[0]||path.basename(file,'.dart').replaceAll('_',' '),kind:/form|new|edit/.test(file)?'form':/detail/.test(file)?'record':/login|register|auth/.test(file)?'identity':'data',labels:labels.slice(0,8),columns:[],states:[],status:'SOURCE_DISCOVERED',designStatus:'PENDING'});}
screens.sort((a,b)=>a.file.localeCompare(b.file));screens.forEach((s,i)=>s.id='MOB-'+String(i+1).padStart(4,'0'));
fs.writeFileSync(path.join(import.meta.dirname,'mobile-inventory.json'),JSON.stringify({generatedAt:new Date().toISOString(),command:'node unierp-workspace/governance/strata-penpot-2026-09-05/mobile-inventory.mjs',limitations:'Static routePath declarations, not runtime route reachability or Flutter interaction evidence.',screens},null,2)+'\n');console.log(JSON.stringify(screens));
