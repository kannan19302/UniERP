const fs = require('fs');
const path = require('path');

const webAppDir = path.join(__dirname, '..', '..', 'unierp-web', 'app', '(dashboard)');
const tenantAdminAppDir = path.join(__dirname, '..', '..', 'unierp-tenant-admin', 'src', 'app', '(dashboard)');
const marketplaceAppDir = path.join(__dirname, '..', '..', 'unierp-marketplace', 'src', 'app', '(dashboard)');

// Ensure target directories exist
[tenantAdminAppDir, marketplaceAppDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const developerAppDir = path.join(__dirname, '..', '..', 'unierp-developer', 'src', 'app');
const webStudioAppDir = path.join(__dirname, '..', '..', 'unierp-web-studio', 'src', 'app');

if (!fs.existsSync(webStudioAppDir)) {
  fs.mkdirSync(webStudioAppDir, { recursive: true });
}

const builderSrc = path.join(developerAppDir, 'builder');
const builderDest = path.join(webStudioAppDir, 'builder');

if (fs.existsSync(builderSrc)) {
  console.log(`Moving ${builderSrc} to ${builderDest}`);
  fs.renameSync(builderSrc, builderDest);
}

marketplaceRoutes.forEach(route => {
  const src = path.join(webAppDir, route);
  const dest = path.join(marketplaceAppDir, route);
  if (fs.existsSync(src)) {
    console.log(`Moving ${src} to ${dest}`);
    fs.renameSync(src, dest);
  }
});

console.log('Done migrating routes.');
