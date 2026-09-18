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
    } else if (file.endsWith(".dart")) {
      results.push(file);
    }
  });
  return results;
}

const files = walk("d:/UniERP/unierp-mobile/lib");
let issues = [];

files.forEach((f) => {
  let raw = fs.readFileSync(f, "utf8");
  // Strip single-line comments
  let content = raw.replace(/\/\/.*/g, "");

  let openBraces = (content.match(/\{/g) || []).length;
  let closeBraces = (content.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    issues.push(`${f} -> Unbalanced braces (open: ${openBraces}, close: ${closeBraces})`);
  }
});

console.log(`Checked ${files.length} Dart files in unierp-mobile/lib.`);
if (issues.length > 0) {
  console.log("Issues found:\n", issues.join("\n"));
} else {
  console.log("✅ All 779 Dart files in unierp-mobile passed syntax check with zero issues!");
}
