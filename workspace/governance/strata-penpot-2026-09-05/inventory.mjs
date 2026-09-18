import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../../..');
const repos = ['tenant-apps','tenant-admin','provider-admin-os','developer-platform','marketplace','marketing-site','web-studio','tenant-sites','tenant-site-template','auth','idp','desktop-app','unierp-mobile'];
const clean = s => s.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const human = s => s.replace(/\[|\]/g,'').replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
const unique = x => [...new Set(x)];
const screens=[];
for(const repo of repos){
 const files=execFileSync('rg',['--files',repo,'-g','!node_modules','-g','!.next','-g','!build'],{cwd:root,encoding:'utf8'}).trim().split(/\r?\n/).map(x=>x.replaceAll('\\','/'));
 for(const file of files.filter(f=> /\/page\.(tsx|jsx|ts|js)$/.test(f))){
  const src=fs.readFileSync(path.join(root,file),'utf8');
  const route='/'+file.split('/app/')[1]?.replace(/page\.(tsx|jsx|ts|js)$/,'').split('/').filter(x=>x&&!x.startsWith('(')).join('/');
  const labels=unique([...src.matchAll(/(?:label|header|title|placeholder)\s*[:=]\s*["']([^"'\n]{2,90})["']/g)].map(m=>clean(m[1])));
  const headings=unique([...src.matchAll(/<h[1-3][^>]*>([^<{]{2,90})<\/h[1-3]>/g)].map(m=>clean(m[1])));
  const columns=unique([...src.matchAll(/(?:header|label)\s*:\s*["']([^"'\n]{2,55})["']/g)].map(m=>clean(m[1])));
  const states=unique([...src.matchAll(/\[([a-zA-Z]*(?:Modal|Drawer|Dialog|Tab|Step)[a-zA-Z]*),/g)].map(m=>m[1]));
  const components=unique([...src.matchAll(/<([A-Z][A-Za-z0-9]+)/g)].map(m=>m[1]));
  const floorplans=components.filter(c=>/Workspace|Shell|Floorplan|ListPage|Dashboard|Console|Wizard|Kanban|Calendar|Chart|Builder/.test(c));
  const segment=route.split('/').filter(Boolean);
  let kind= /register|login|verify|password|oauth|callback/.test(route)?'identity': /onboarding/.test(route)?'wizard':/builder|studio|designer|configurator/.test(route)?'studio': /settings|preferences|configuration/.test(route)?'settings':/new|create|edit/.test(segment.at(-1)||'')?'form': /\[/.test(route)?'record':/kanban|pipeline/.test(route)?'kanban':/calendar|scheduling|planning|gantt|timeline/.test(route)?'planning': /analytics|dashboard|cockpit|overview/.test(route)||segment.length<2?'overview':'data';
  const pageTitle=src.match(/<PageHeader[\s\S]{0,250}?title=["']([^"']+)["']/)?.[1];
  screens.push({id:'',repo,file,route,module:segment[0]||'home',title:pageTitle||headings[0]||human(segment.at(-1)||repo),kind,headings,labels,columns,states,components,floorplans,sourceBytes:src.length,status:'SOURCE_DISCOVERED',designStatus:'PENDING'});
 }
}
screens.sort((a,b)=>(a.repo+a.route).localeCompare(b.repo+b.route));
screens.forEach((s,i)=>s.id='SW-'+String(i+1).padStart(4,'0'));
const result={generatedAt:new Date().toISOString(),command:'node unierp-workspace/governance/strata-penpot-2026-09-05/inventory.mjs',scope:repos,limitations:'Static source discovery, not runtime verification. Dynamic paths represent route patterns. Imported component subviews and identity-server HTML require additional review. Desktop and Flutter are not Next.js routes.',screens};
if(!screens.length)throw new Error('Zero screens discovered');
fs.writeFileSync(path.join(import.meta.dirname,'screen-inventory.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({total:screens.length,byRepo:Object.fromEntries(repos.map(r=>[r,screens.filter(s=>s.repo===r).length])),tenantModules:Object.fromEntries(unique(screens.filter(s=>s.repo==='tenant-apps').map(s=>s.module)).map(m=>[m,screens.filter(s=>s.repo==='tenant-apps'&&s.module===m).length])),stateful:screens.filter(s=>s.states.length).length},null,2));
