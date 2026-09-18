import fs from 'fs';
import path from 'path';

const devAppDir = path.resolve('apps/developer');
const builderSrc = path.resolve('apps/web/app/(dashboard)/builder');

if (!fs.existsSync(devAppDir)) {
  fs.mkdirSync(devAppDir, { recursive: true });
}

// Scaffold basic Next.js structure for Developer Studio
fs.writeFileSync(path.join(devAppDir, 'package.json'), JSON.stringify({
  name: "@kannan19302/developer",
  version: "0.0.1",
  private: true,
  scripts: {
    "dev": "next dev -p 3004",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  dependencies: {
    "next": "15.3.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@kannan19302/ui": "workspace:*",
    "@kannan19302/sdk": "workspace:*"
  },
  devDependencies: {
    "typescript": "^5.7.0",
    "@types/react": "^19.0.0",
    "@types/node": "^22.0.0",
    "@kannan19302/config": "workspace:*"
  }
}, null, 2));

fs.writeFileSync(path.join(devAppDir, 'tsconfig.json'), JSON.stringify({
  extends: "@kannan19302/config/typescript/nextjs.json",
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"]
    }
  },
  include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  exclude: ["node_modules"]
}, null, 2));

const srcDir = path.join(devAppDir, 'src/app');
fs.mkdirSync(srcDir, { recursive: true });

// If the old builder exists, move it. If not, just create a stub.
if (fs.existsSync(builderSrc)) {
  const destDir = path.join(srcDir, 'builder');
  fs.cpSync(builderSrc, destDir, { recursive: true });
  fs.rmSync(builderSrc, { recursive: true, force: true });
}

// Add a landing page for Developer Studio
fs.writeFileSync(path.join(srcDir, 'page.tsx'), `
import React from 'react';

export default function DeveloperStudioHome() {
  return (
    <div>
      <h1>UniERP Developer Studio</h1>
      <p>Workflow Designer, Form Builder, Report Builder, and Extension SDK integration.</p>
    </div>
  );
}
`);

console.log("Created apps/developer (Phase 5 Studio)");
