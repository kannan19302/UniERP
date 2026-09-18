import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const programmeDocs = [
  { file: '43-PROGRAMME-15-TENANT-SITES.md', title: 'PROGRAMME 15 — Tenant Sites (Platform 4)', prefix: 'P15' },
  { file: '44-PROGRAMME-16-WEB-STUDIO.md', title: 'PROGRAMME 16 — Web Studio (Platform 5)', prefix: 'P16' },
  { file: '45-PROGRAMME-17-TENANT-ADMIN.md', title: 'PROGRAMME 17 — Tenant Admin (Platform 6)', prefix: 'P17' },
  { file: '46-PROGRAMME-18-MARKETPLACE.md', title: 'PROGRAMME 18 — Marketplace (Platform 7)', prefix: 'P18' },
  { file: '47-PROGRAMME-19-PROVIDER-OS.md', title: 'PROGRAMME 19 — Provider Admin OS (Platform 2)', prefix: 'P19' },
  { file: '48-PROGRAMME-20-MOBILE-PLATFORM.md', title: 'PROGRAMME 20 — Mobile Platform (Platform 9)', prefix: 'P20' },
  { file: '49-PROGRAMME-21-REVENUE-BILLING.md', title: 'PROGRAMME 21 — Revenue & Billing (Global)', prefix: 'P21' }
];

const docsDir = path.join(__dirname, '..', 'docs', 'programme');

for (const doc of programmeDocs) {
  const content = `# ${doc.title}

> **Governing Repository**: \`unierp-workspace\`
> **Track Lead**: AI Agent

## 1. Waves

### Wave 0 · "Initial scaffold"
**Phases:** ${doc.prefix}-001–${doc.prefix}-002 · Initial scaffolding

## 2. Stage A · Scaffold (Wave 0)

| ID | Phase | Depends | Deliverable | Exit | Status |
| :- | :---- | :------ | :---------- | :--- | :----- |
| **${doc.prefix}-001** | Scaffold Platform | — | Scaffold Platform | \`echo scaffolded\` | OPEN |
| **${doc.prefix}-002** | Configure Docker Profile | ${doc.prefix}-001 | Configure Docker Profile | \`docker compose config\` | OPEN |
`;

  fs.writeFileSync(path.join(docsDir, doc.file), content);
  console.log(`Created ${doc.file}`);
}
