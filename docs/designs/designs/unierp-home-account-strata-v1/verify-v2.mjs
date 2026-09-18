import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath,pathToFileURL} from 'node:url';
import crypto from 'node:crypto';
import puppeteer from 'puppeteer';
const root=path.dirname(fileURLToPath(import.meta.url));
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'v2-screens.js'),'utf8'),context);
const screens=context.window.designScreens;
const assert=(ok,message)=>{if(!ok)throw Error(message)};
assert(screens.length>50,'Expected substantial nonzero screen coverage');
const ids=new Set(screens.map(s=>s.id));assert(ids.size===screens.length,'Duplicate screen ID');
let localLinks=0;
for(const file of fs.readdirSync(root).filter(f=>/\.(md|html)$/.test(f))){
 const source=fs.readFileSync(path.join(root,file),'utf8');
 const links=file.endsWith('.md')?[...source.matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1]):[...source.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
 for(let target of links){if(/^(https?:|#)/.test(target))continue;target=target.split('#')[0];if(!target)continue;localLinks++;assert(fs.existsSync(path.resolve(root,target)),`Missing local link ${file}: ${target}`)}
}
assert(localLinks>0,'No local links discovered');
for(const s of screens){assert(typeof s.body==='string'&&s.body.length>30,`Missing body: ${s.id}`);assert(s.note&&s.actions.length,`Missing actions/note: ${s.id}`);for(const [,target] of s.actions)assert(ids.has(target),`Unknown action: ${target}`);for(const m of s.body.matchAll(/href="#([^"]+)"/g))assert(ids.has(m[1]),`Unknown body link: ${m[1]}`)}
const hashes=JSON.parse(fs.readFileSync(path.join(root,'V1_IMAGE_HASHES.json'),'utf8').replace(/^\uFEFF/,''));
for(const file of hashes){const hash=crypto.createHash('sha256').update(fs.readFileSync(file.Path)).digest('hex');assert(hash.toUpperCase()===file.Hash,`Original image changed: ${file.Path}`)}
const browser=await puppeteer.launch({headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const url=pathToFileURL(path.join(root,'index.html')).href;
await page.setViewport({width:1440,height:1000});await page.goto(url);
let overflowChecks=0,stateChecks=0;
for(const width of [1440,390]){
 await page.setViewport({width,height:1000});
 for(const s of screens){
  await page.evaluate(id=>{location.hash=id},s.id);await page.waitForFunction(id=>document.querySelector('#screen-picker').value===id,{},s.id);
  assert(await page.$eval('h1',(el,title)=>el.textContent===title,s.title),`Wrong title: ${s.id}`);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow ${width}: ${s.id}`);overflowChecks++;
  if(width===1440)await page.screenshot({path:path.join(root,`v2_${String(screens.indexOf(s)+1).padStart(2,'0')}_${s.id}.png`),fullPage:true});
  if(width===390&&['daily','signin','choose-apps','account'].includes(s.id))await page.screenshot({path:path.join(root,`v2_mobile_${s.id}.png`),fullPage:true});
  for(const state of ['Loading','Empty','Partial','Offline','Error','Validation','Stale','Conflict']){
   await page.select('#state-picker',state);assert(await page.$eval('#state-content',e=>e.textContent.trim().length>0),`Missing state ${s.id}/${state}`);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`State overflow ${width}/${s.id}/${state}`);stateChecks++;
  }
  await page.select('#state-picker','default');
 }
}
await page.setViewport({width:1440,height:1000});await page.select('#screen-picker','signin');await page.waitForFunction(()=>location.hash==='#signin');await page.click('#actions a');await page.waitForFunction(()=>location.hash==='#resolve');
await page.select('#screen-picker','personal');await page.waitForFunction(()=>location.hash==='#personal');await page.select('#state-picker','Validation');assert(await page.$('[aria-invalid="true"]'),'Validation lacks invalid field');await page.click('[data-reset-state]');assert(!(await page.$('[aria-invalid="true"]')),'Validation not cleared');
await page.select('#screen-picker','applications');await page.waitForFunction(()=>location.hash==='#applications');await page.click('[data-filter="setup"]');assert(await page.$$eval('.app',els=>els.filter(e=>getComputedStyle(e).display!=='none').length===1),'Setup filter failed');
await page.setViewport({width:390,height:844});await page.click('.mobile-menu');assert(await page.$eval('.mobile-menu',e=>e.getAttribute('aria-expanded')==='true'),'Menu did not open');await page.keyboard.press('Escape');assert(await page.$eval('.mobile-menu',e=>e.getAttribute('aria-expanded')==='false'),'Escape did not close menu');
assert(errors.length===0,`Browser errors: ${errors.join('; ')}`);
await browser.close();
const rows=screens.map((s,i)=>`| ${String(i+1).padStart(2,'0')} | ${s.group} | [${s.title}](index.html#${s.id}) | [PNG](v2_${String(i+1).padStart(2,'0')}_${s.id}.png) | ${s.note} |`).join('\n');
fs.writeFileSync(path.join(root,'SCREEN_INVENTORY_V2.md'),`# Home v2 screen inventory\n\nGenerated from v2-screens.js by node verify-v2.mjs on ${new Date().toISOString()}. Non-normative design coverage, not production route discovery or runtime proof.\n\n${screens.length} distinct screen specimens. Every screen has Loading, Empty, Partial, Offline, Error, Validation, Stale and Conflict review variants. These shared specimens establish layout conventions; applicability and per-flow recovery are specified in UX_SPEC_V2.md. They are not ${screens.length*9} independently designed workflows. Existing 14 v1 concepts are refreshed in this atlas; all original PNGs remain intact.\n\n| # | Area | Interactive screen | Export | Behavior / acceptance intent |\n| --- | --- | --- | --- | --- |\n${rows}\n`);
const result={generatedAt:new Date().toISOString(),scope:'Local static design artifact only',screens:screens.length,originalImagesPreserved:hashes.length,desktopAndMobileScreenChecks:overflowChecks,sharedStateChecks:stateChecks,browserErrors:errors,screenshots:screens.length+4,interactionChecks:['sign-in to routing specimen','validation and recovery','application setup filter','mobile menu and Escape'],limitations:['No backend, authentication or real provisioning exercised','No screen-reader or production accessibility certification','Screenshots require human visual review','No deployed or released application']};
result.localLinks=localLinks;
fs.writeFileSync(path.join(root,'VERIFICATION_V2.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
