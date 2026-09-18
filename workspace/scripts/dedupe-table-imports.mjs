import fs from "fs";
import path from "path";

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (/\.(tsx|jsx)$/.test(file)) {
      results.push(file);
    }
  });
  return results;
}

const files = walk("d:/UniERP/unierp-web/app");
let fixedDuplicates = 0;

files.forEach((f) => {
  let content = fs.readFileSync(f, "utf8");
  const matches = content.match(/import\s+.*Table.*from\s+["']@kannan19302\/ui["']/g);
  if (matches && matches.length > 1) {
    // Remove the standalone import line at top
    content = content.replace(/^import\s+\{\s*Table\s*\}\s+from\s+["']@kannan19302\/ui["'];?\r?\n/, "");
    fs.writeFileSync(f, content, "utf8");
    fixedDuplicates++;
  }
});

console.log(`Fixed duplicate Table imports in ${fixedDuplicates} files.`);
