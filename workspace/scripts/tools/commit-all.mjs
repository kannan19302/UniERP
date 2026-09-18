import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const root = path.join(process.cwd(), '..');
const repos = fs.readdirSync(root).filter(n => n.startsWith('unierp-') && fs.statSync(path.join(root, n)).isDirectory());

for (const repo of repos) {
  const dir = path.join(root, repo);
  try {
    execSync('git add .', { cwd: dir });
    execSync('git commit -m "Fix TS configs and finalize Track A and B"', { cwd: dir, stdio: 'ignore' });
    console.log(`Committed in ${repo}`);
  } catch (e) {
    // ignore if nothing to commit
  }
}
