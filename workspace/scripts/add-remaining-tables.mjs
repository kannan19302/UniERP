import fs from "fs";

const files = [
  "d:/UniERP/unierp-web/app/(dashboard)/manufacturing/scheduling/page.tsx",
  "d:/UniERP/unierp-web/app/(dashboard)/search/page.tsx",
  "d:/UniERP/unierp-web/app/(dashboard)/supply-chain/operations/AsnsTab.tsx",
  "d:/UniERP/unierp-web/src/components/builder/DynamicFormRenderer.tsx",
];

files.forEach((f) => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, "utf8");
    if (!/import.*Table.*from/.test(content)) {
      if (/import\s+\{([^}]+)\}\s+from\s+["']@kannan19302\/ui["']/.test(content)) {
        content = content.replace(/import\s+\{([^}]+)\}\s+from\s+["']@kannan19302\/ui["']/, (m, g) => `import { ${g.trim()}, Table } from "@kannan19302/ui"`);
      } else {
        content = 'import { Table } from "@kannan19302/ui";\n' + content;
      }
      fs.writeFileSync(f, content, "utf8");
    }
  }
});
console.log("Added Table import to remaining files.");
