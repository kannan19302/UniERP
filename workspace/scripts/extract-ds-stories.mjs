import fs from 'fs';
import path from 'path';

const dsDir = 'd:/UniERP/design-system/src';
function scanStories(dir) {
  let stories = [];
  function recurse(current) {
    try {
      const items = fs.readdirSync(current, { withFileTypes: true });
      for (const item of items) {
        const full = path.join(current, item.name);
        if (item.isDirectory()) {
          recurse(full);
        } else if (item.name.endsWith('.stories.tsx') || item.name.endsWith('.stories.ts')) {
          stories.push(path.relative(dsDir, full).replace(/\\/g, '/'));
        }
      }
    } catch(e) {}
  }
  recurse(dir);
  return stories;
}

const stories = scanStories(dsDir);
console.log('Design System stories count:', stories.length);
fs.writeFileSync('d:/UniERP/unierp-workspace/scripts/ds-stories.json', JSON.stringify(stories, null, 2));
