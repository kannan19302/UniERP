import { spawnSync } from 'child_process';
import path from 'path';

const packages = [
  { name: 'contracts', dir: 'unierp-contracts' },
  { name: 'shared', dir: 'unierp-shared' },
  { name: 'ui', dir: 'unierp-design-system' },
  { name: 'database', dir: 'unierp-data' },
  { name: 'auth', dir: 'unierp-auth' },
  { name: 'kernel', dir: 'unierp-kernel' },
  { name: 'sandbox', dir: 'unierp-sandbox' },
  { name: 'extension-api', dir: 'unierp-extension-api' },
  { name: 'sdk', dir: 'unierp-sdk' },
  { name: 'service-kit', dir: 'unierp-service-kit' },
  { name: 'blockchain', dir: 'unierp-blockchain' },
  { name: 'framework', dir: 'unierp-framework' }
];

const root = 'd:/UniERP';

for (const pkgObj of packages) {
  const pkg = pkgObj.name;
  const dir = path.join(root, pkgObj.dir);
  
  try {
    const existingVer = spawnSync('npm.cmd', ['view', '@kannan19302/' + pkg, 'version'], { stdio: 'pipe', shell: true }).stdout.toString().trim();
    if (existingVer) {
      console.log('⏭️ Skipping ' + pkg + ', already published version ' + existingVer);
      continue;
    }
  } catch (e) {}

  console.log('Publishing ' + pkg + '...');
  try {
    const res = spawnSync('npm.cmd', ['publish', '--access', 'public'], { cwd: dir, stdio: 'pipe', shell: true });
    if (res.error) throw res.error;
    if (res.status !== 0) {
      const out = res.stderr ? res.stderr.toString() : '';
      if (out.includes('previously published version') || out.includes('E403')) {
        console.log('✅ ' + pkg + ' was already published.');
      } else {
        throw new Error('Exit ' + res.status + ': ' + out);
      }
    } else {
      console.log('✅ ' + pkg + ' published successfully.');
    }
    
    // Verify
    let ver = '';
    for (let i = 0; i < 10; i++) {
      ver = spawnSync('npm.cmd', ['view', '@kannan19302/' + pkg, 'version'], { stdio: 'pipe', shell: true }).stdout.toString().trim();
      if (ver) break;
      spawnSync('node.exe', ['-e', 'setTimeout(()=>{}, 2000)'], { shell: true });
    }
    console.log('   Verified version on registry: ' + ver);
  } catch (err) {
    console.error('❌ Failed to publish ' + pkg + ': ' + err.message);
    process.exit(1);
  }
}
