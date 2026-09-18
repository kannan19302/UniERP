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
let updated = 0;

files.forEach((f) => {
  let content = fs.readFileSync(f, "utf8");
  if (/<Table[\s>]/.test(content) && !/import.*Table.*from/.test(content)) {
    if (/import\s+\{([^}]+)\}\s+from\s+["']@kannan19302\/ui["']/.test(content)) {
      content = content.replace(/import\s+\{([^}]+)\}\s+from\s+["']@kannan19302\/ui["']/, (match, group) => {
        if (!group.includes("Table")) {
          return `import { ${group.trim()}, Table } from "@kannan19302/ui"`;
        }
        return match;
      });
    } else {
      content = `import { Table } from "@kannan19302/ui";\n` + content;
    }
    fs.writeFileSync(f, content, "utf8");
    updated++;
  }
});

console.log(`Successfully added Table import to ${updated} files.`);
