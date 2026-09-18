import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const root = path.join(process.cwd(), '..');
const repos = fs.readdirSync(root).filter(n => n.startsWith('unierp-') && fs.statSync(path.join(root, n)).isDirectory());

for (const repo of repos) {
  const dir = path.join(root, repo);
  try {
    // Check if there is a remote named 'origin'
    const remotes = execSync('git remote', { cwd: dir }).toString();
    if (remotes.includes('origin')) {
      console.log(`Pushing ${repo}...`);
      execSync('git push origin main', { cwd: dir, stdio: 'ignore' });
      console.log(`Successfully pushed ${repo}`);
    } else {
      console.log(`Skipping ${repo}: No 'origin' remote found.`);
    }
  } catch (e) {
    console.error(`Failed to push ${repo}`);
  }
}
