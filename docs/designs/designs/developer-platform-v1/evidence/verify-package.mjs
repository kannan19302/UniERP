import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8').replace(/^\uFEFF/,'');
const json=p=>JSON.parse(read(p));
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex').toUpperCase();
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};
const rows=json('design/SCREEN_MANIFEST.json').screens,stories=json('prerequisites/STORY_BACKLOG.json').stories,trace=json('prerequisites/TRACEABILITY.json');
check(rows.length===108,'Expected108 screens');
check(new Set(rows.map(r=>r.id)).size===108,'Duplicate ID');
check(new Set(rows.map(r=>r.originId)).size===108,'Duplicate origin');
check(rows.every((r,i)=>r.id===i+1&&r.screenId==='DP-'+String(i+1).padStart(3,'0')),'Noncontiguous sequence');
check(fs.readdirSync(path.join(root,'design')).filter(x=>x.endsWith('.png')).length===108,'Selected folder PNG count');
const images=[];
for(const r of rows){const p=path.join(root,'design',r.file);if(!fs.existsSync(p)){errors.push('Missing '+r.file);continue;}const b=fs.readFileSync(p);check(b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),'Invalid PNG '+r.file);const width=b.readUInt32BE(16),height=b.readUInt32BE(20);check(width>=1000&&height>=700,'Low dimensions '+r.file);check(b.subarray(-8,-4).toString()==='IEND','Missing PNG end '+r.file);if(r.originId<=76)check(hash(p)===hash(r.source),'Changed selected original '+r.screenId);images.push({screen:r.screenId,file:r.file,width,height,sha256:hash(p)});}
const baseline=json('evidence/BASELINE_HASHES.json');for(const x of baseline)check(fs.existsSync(x.Path)&&hash(x.Path)===x.Hash,'Previous file modified '+x.Path);
check(stories.length===120,'Expected120 stories');check(new Set(stories.map(s=>s.id)).size===120,'Duplicate story');
const ids=new Set(stories.map(s=>s.id));for(const s of stories){check(s.dependencies.every(d=>ids.has(d)),'Unknown story dependency '+s.id);check(s.status==='Not started','Unsupported implementation status '+s.id);check(s.acceptance.length>=3,'Missing acceptance '+s.id);}
for(const r of rows){check(stories.filter(s=>s.screenId===r.screenId).length===1,'Missing/duplicate screen story '+r.screenId);check(trace.screens.some(s=>s.screen===r.screenId),'Missing trace '+r.screenId);}
const validScreens=new Set(rows.map(r=>r.screenId));for(const x of [...trace.routeMap,...trace.registry])check(x.screens.length>0&&x.screens.every(s=>validScreens.has(s)),'Invalid route/registry mapping');
check(trace.routeMap.length===73&&trace.registry.length===34&&Object.keys(trace.requirements).length===10,'Baseline inventory mapping counts');
for(const values of Object.values(trace.requirements))check(values.every(s=>validScreens.has(s)),'Invalid requirement mapping');
const mdFiles=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(p.endsWith('.md'))mdFiles.push(p);}}walk(root);
let checkedLinks=0;for(const f of mdFiles){const text=fs.readFileSync(f,'utf8');for(const m of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)){let target=m[1].replace(/^<|>$/g,'');if(/^(https?:|#)/.test(target))continue;target=target.split('#')[0];check(fs.existsSync(path.resolve(path.dirname(f),target)),'Broken link '+path.relative(root,f)+' -> '+target);checkedLinks++;}}
const html=read('design/index.html');check((html.match(/<article /g)||[]).length===108,'Gallery card count');
for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){const t=m[1];if(t.startsWith('#')||/^https?:/.test(t))continue;check(fs.existsSync(path.resolve(root,'design',t)),'Gallery broken link '+t);}
const elements={};for(const id of ['search','group','reset','count','empty'])elements[id]={value:'',hidden:false,listeners:{},addEventListener(event,fn){this.listeners[event]=fn;},focus(){this.focused=true;}};
const cards=rows.map(r=>({dataset:{group:r.group,search:(r.screenId+' '+r.originId+' '+r.title+' '+r.group+' '+(r.gap||'')).toLowerCase()},hidden:false}));
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];vm.runInNewContext(script,{document:{getElementById:id=>elements[id],querySelectorAll:()=>cards}});
elements.search.value='DP-108';elements.search.listeners.input();check(cards.filter(c=>!c.hidden).length===1,'Search filter');
elements.search.value='no-such-screen-xyz';elements.search.listeners.input();check(!elements.empty.hidden&&cards.every(c=>c.hidden),'Empty filter');
elements.reset.listeners.click();check(cards.every(c=>!c.hidden)&&elements.search.focused,'Reset filter');
elements.group.value=rows[0].group;elements.group.listeners.change();check(cards.filter(c=>!c.hidden).length===rows.filter(r=>r.group===rows[0].group).length,'Group filter');
const result={date:new Date().toISOString(),status:errors.length?'FAIL':'PASS',screens:rows.length,originalCopies:rows.filter(r=>r.originId<=76).length,enterpriseAdditions:rows.filter(r=>r.originId>76).length,preservedPreviousFiles:baseline.length,stories:stories.length,routes:trace.routeMap.length,registryDefinitions:trace.registry.length,owningRequirementIds:Object.keys(trace.requirements).length,markdownFiles:mdFiles.length,checkedLocalMarkdownLinks:checkedLinks,galleryFilterChecks:4,images,errors,limitations:['Static gallery logic tested with a minimal DOM harness, not a browser accessibility audit','Application tests/builds/RLS/accessibility/performance not run: design-only change','Source declarations are not runtime evidence']};
fs.writeFileSync(path.join(root,'evidence/VERIFICATION_RESULTS.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({...result,images:undefined},null,2));process.exitCode=errors.length?1:0;
