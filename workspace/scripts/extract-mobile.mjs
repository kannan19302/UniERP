import fs from 'fs';
import path from 'path';

const mobileDir = 'd:/UniERP/unierp-mobile/lib';
function scanDart(dir) {
  let files = [];
  function recurse(current) {
    try {
      const items = fs.readdirSync(current, { withFileTypes: true });
      for (const item of items) {
        const full = path.join(current, item.name);
        if (item.isDirectory()) {
          recurse(full);
        } else if (item.name.endsWith('.dart')) {
          files.push(path.relative(mobileDir, full).replace(/\\/g, '/'));
        }
      }
    } catch(e) {}
  }
  recurse(dir);
  return files;
}

const dartFiles = scanDart(mobileDir);
const screens = dartFiles.filter(f => /screen\.dart$/i.test(f) || /view\.dart$/i.test(f) || /page\.dart$/i.test(f));
const blocs = dartFiles.filter(f => /bloc\.dart$/i.test(f) || /cubit\.dart$/i.test(f));
const repos = dartFiles.filter(f => /repository\.dart$/i.test(f) || /service\.dart$/i.test(f));

console.log('Mobile Total Dart files:', dartFiles.length);
console.log('Mobile Screens/Views/Pages:', screens.length);
console.log('Mobile BLoCs/Cubits:', blocs.length);
console.log('Mobile Repositories/Services:', repos.length);

fs.writeFileSync('d:/UniERP/unierp-workspace/scripts/mobile-summary.json', JSON.stringify({
  totalDartFiles: dartFiles.length,
  screens,
  blocs,
  repos
}, null, 2));
