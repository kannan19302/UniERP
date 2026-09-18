import fs from 'fs';
import path from 'path';

const root = path.join(process.cwd(), '..');
const repos = fs.readdirSync(root).filter(n => n.startsWith('unierp-') && fs.statSync(path.join(root, n)).isDirectory());

const ciContent = `name: CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  ci:
    uses: kannan19302/unierp-workspace/.github/workflows/reusable-ci.yml@main
`;

let count = 0;
for (const repo of repos) {
  const ciPath = path.join(root, repo, '.github', 'workflows', 'ci.yml');
  if (fs.existsSync(ciPath)) {
    fs.writeFileSync(ciPath, ciContent);
    count++;
  }
}
console.log(`Updated ${count} ci.yml files.`);
