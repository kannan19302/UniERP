import fs from 'fs';
import path from 'path';

const uiDir = path.resolve('D:\\UniERP\\ERPSys\\packages\\ui');
const pkgPath = path.join(uiDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const subPkgs = [
  'charts', 'components', 'layout', 'data-grid', 'dashboard',
  'notifications', 'hooks', 'icons', 'theme', 'utils',
  'form-engine', 'workflow'
];

pkg.exports = {
  ".": {
    types: "./dist/index.d.ts",
    import: "./dist/index.js",
    require: "./dist/index.js",
    default: "./dist/index.js"
  },
  "./styles": "./src/styles/globals.css",
  "./tokens": "./src/tokens/design-tokens.css"
};

for (const sub of subPkgs) {
  // Create proxy files
  fs.writeFileSync(path.join(uiDir, `${sub}.d.ts`), `export * from "@kannan19302/ui-${sub}";\n`);
  fs.writeFileSync(path.join(uiDir, `${sub}.js`), `export * from "@kannan19302/ui-${sub}";\n`);
  fs.writeFileSync(path.join(uiDir, `${sub}.cjs`), `module.exports = require("@kannan19302/ui-${sub}");\n`);

  // Update exports
  pkg.exports[`./${sub}`] = {
    types: `./${sub}.d.ts`,
    import: `./${sub}.js`,
    require: `./${sub}.cjs`,
    default: `./${sub}.js`
  };
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('Created proxy files and updated @kannan19302/ui package.json');
