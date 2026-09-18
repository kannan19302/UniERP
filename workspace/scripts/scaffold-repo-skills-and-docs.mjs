#!/usr/bin/env node
/**
 * scripts/scaffold-repo-skills-and-docs.mjs
 *
 * Estate-wide generation of:
 * 1. Dedicated Project AI Skill (.agents/skills/<name>-standards/SKILL.md) in every repository.
 * 2. Authoritative ARCHITECTURE.md with publication-grade Mermaid diagrams in every repository.
 *
 * Implements ADR-0010 (UniERP Master Platform Goal and Polyrepo Architecture Boundaries).
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const WORKSPACE_DIR = resolve('.');
const PARENT_DIR = resolve('..');

// 31 Repositories Metadata Dictionary
const REPOSITORIES = [
  {
    name: 'unierp-contracts',
    layer: 'L0',
    layerName: 'Contracts',
    packageName: '@kannan19302/contracts',
    skillName: 'contracts-standards',
    title: 'UniERP Contracts Layer',
    desc: 'Single source of truth for all cross-repo DTOs, events, error codes, and interface contracts.',
    allowedOutbound: ['NONE (Depends on nothing)'],
    forbidden: ['Any package or runtime from Layers L1-L7', 'External framework code (NestJS, React, Prisma)'],
    inbound: ['All Layers L1 to L7'],
    techStack: 'TypeScript, Vitest, Zod',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'contracts'
  },
  {
    name: 'auth',
    layer: 'L1',
    layerName: 'Foundation',
    packageName: '@kannan19302/auth',
    skillName: 'auth-security-standards',
    title: 'UniERP Authentication & Security Primitives',
    desc: 'Core authentication primitives, token parsing, RBAC/ABAC verification, and permission bitsets.',
    allowedOutbound: ['@kannan19302/contracts (L0)'],
    forbidden: ['Layers L2-L7', 'Database ORM directly', 'HTTP servers directly'],
    inbound: ['L2-L5 (Runtime, Service, Presentation, Clients)'],
    techStack: 'TypeScript, Jose, Vitest',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'foundation'
  },
  {
    name: 'config',
    layer: 'L1',
    layerName: 'Foundation',
    packageName: '@kannan19302/config',
    skillName: 'config-governance-standards',
    title: 'UniERP Configuration & Secrets Platform',
    desc: 'Environment configuration validation, schema parsing, and KMS/Vault secret resolution adapters.',
    allowedOutbound: ['@kannan19302/contracts (L0)'],
    forbidden: ['Layers L2-L7', 'Direct business runtime logic'],
    inbound: ['L2-L7'],
    techStack: 'TypeScript, Zod, Vitest',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'foundation'
  },
  {
    name: 'design-system',
    layer: 'L1',
    layerName: 'Foundation',
    packageName: '@kannan19302/ui',
    skillName: 'design-system-standards',
    title: 'UniERP Strata Workbench Design System',
    desc: 'Authoritative enterprise UI library, Strata Workbench design tokens, 4-tier density scale, and 5-file uniform component anatomy.',
    allowedOutbound: ['@kannan19302/contracts (L0)'],
    forbidden: ['Layers L2-L7', 'Database ORM', 'Server actions', 'Backend fetch orchestration'],
    inbound: ['L4 (Presentation), L5 (Clients), L1 (Storybook)'],
    techStack: 'React 18/19, CSS Modules, Vitest, vitest-axe, TypeScript',
    testCommand: 'pnpm test && pnpm build',
    diagramType: 'design-system'
  },
  {
    name: 'kernel',
    layer: 'L1',
    layerName: 'Foundation',
    packageName: '@kannan19302/kernel',
    skillName: 'kernel-standards',
    title: 'UniERP Kernel Primitives',
    desc: 'Core domain primitives, immutable UUID generators, Decimal money wrappers, and platform error hierarchy.',
    allowedOutbound: ['@kannan19302/contracts (L0)'],
    forbidden: ['Layers L2-L7', 'UI components', 'Database drivers'],
    inbound: ['L2-L7'],
    techStack: 'TypeScript, decimal.js, Vitest',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'foundation'
  },
  {
    name: 'sdk',
    layer: 'L1',
    layerName: 'Foundation',
    packageName: '@kannan19302/sdk',
    skillName: 'sdk-standards',
    title: 'UniERP Client TypeScript SDK',
    desc: 'Strongly typed client SDK for programmatic consumption of UniERP APIs across web, desktop, and node.',
    allowedOutbound: ['@kannan19302/contracts (L0)', '@kannan19302/kernel (L1)'],
    forbidden: ['Layers L2-L7', 'Direct DB access'],
    inbound: ['L4 (Presentation), L5 (Clients), L6 (Extensions), External developers'],
    techStack: 'TypeScript, Fetch API, Vitest',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'foundation'
  },
  {
    name: 'service-kit',
    layer: 'L1',
    layerName: 'Foundation',
    packageName: '@kannan19302/service-kit',
    skillName: 'service-kit-standards',
    title: 'UniERP Service Kit Framework Utilities',
    desc: 'Shared NestJS guards, decorators, Pino logging interceptors, and RFC 7807 exception filters.',
    allowedOutbound: ['@kannan19302/contracts (L0)', '@kannan19302/kernel (L1)', '@kannan19302/config (L1)'],
    forbidden: ['Layers L2-L7', 'Domain business models directly'],
    inbound: ['L3 (api, idp)'],
    techStack: 'NestJS, Pino, OpenTelemetry, TypeScript',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'foundation'
  },
  {
    name: 'shared',
    layer: 'L1',
    layerName: 'Foundation',
    packageName: '@kannan19302/shared',
    skillName: 'shared-standards',
    title: 'UniERP Shared Utilities',
    desc: 'Cross-cutting algorithmic helpers, date manipulation, string transformers, and formatters.',
    allowedOutbound: ['@kannan19302/contracts (L0)', '@kannan19302/kernel (L1)'],
    forbidden: ['Layers L2-L7'],
    inbound: ['L2-L7'],
    techStack: 'TypeScript, Vitest',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'foundation'
  },
  {
    name: 'storybook',
    layer: 'L1',
    layerName: 'Foundation',
    packageName: '@kannan19302/storybook',
    skillName: 'storybook-standards',
    title: 'UniERP Storybook Component Workshop',
    desc: 'Interactive workshop canvas and visual regression workbench for @kannan19302/ui components.',
    allowedOutbound: ['@kannan19302/ui (L1)', '@kannan19302/contracts (L0)'],
    forbidden: ['Layers L2-L7', 'Backend services'],
    inbound: ['Internal designers and engineers'],
    techStack: 'Storybook 8, React, Vite',
    testCommand: 'pnpm build-storybook',
    diagramType: 'design-system'
  },
  {
    name: 'blockchain',
    layer: 'L2',
    layerName: 'Runtime',
    packageName: '@kannan19302/blockchain',
    skillName: 'blockchain-standards',
    title: 'UniERP Cryptographic Audit & Ledger Proof',
    desc: 'Immutable audit log hashing, merkle tree verification, and tamper-evident enterprise ledger anchoring.',
    allowedOutbound: ['@kannan19302/contracts (L0)', 'L1 packages'],
    forbidden: ['Layers L3-L7'],
    inbound: ['L3 (api)'],
    techStack: 'TypeScript, Node Crypto, Vitest',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'runtime'
  },
  {
    name: 'data',
    layer: 'L2',
    layerName: 'Runtime',
    packageName: '@kannan19302/database',
    skillName: 'data-persistence-standards',
    title: 'UniERP Database & Data Persistence Engine',
    desc: 'Authoritative Prisma schemas (44 schemas), PostgreSQL migrations, connection pooling, and universal Row-Level Security (RLS).',
    allowedOutbound: ['@kannan19302/contracts (L0)', 'L1 packages'],
    forbidden: ['Layers L3-L7', 'HTTP controllers', 'UI components'],
    inbound: ['L3 (api, idp)'],
    techStack: 'Prisma ORM, PostgreSQL 16+, SQL, TypeScript',
    testCommand: 'pnpm test && pnpm build',
    diagramType: 'data'
  },
  {
    name: 'extension-api',
    layer: 'L2',
    layerName: 'Runtime',
    packageName: '@kannan19302/extension-api',
    skillName: 'extension-api-standards',
    title: 'UniERP Extension API & Capability Contracts',
    desc: 'Capability declarations, sandboxed plugin manifests, lifecycle hooks, and external developer contracts.',
    allowedOutbound: ['@kannan19302/contracts (L0)', 'L1 packages'],
    forbidden: ['Layers L3-L7'],
    inbound: ['L4 (developer-platform), L6 (extensions)'],
    techStack: 'TypeScript, Zod, Vitest',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'runtime'
  },
  {
    name: 'framework',
    layer: 'L2',
    layerName: 'Runtime',
    packageName: '@kannan19302/framework',
    skillName: 'framework-standards',
    title: 'UniERP Workflow & Business Rules Runtime',
    desc: 'State machine execution, multi-step approval workflow engine, business rules evaluator, and async job dispatchers.',
    allowedOutbound: ['@kannan19302/contracts (L0)', 'L1 packages'],
    forbidden: ['Layers L3-L7'],
    inbound: ['L3 (api)'],
    techStack: 'TypeScript, BullMQ, Redis, Vitest',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'runtime'
  },
  {
    name: 'sandbox',
    layer: 'L2',
    layerName: 'Runtime',
    packageName: '@kannan19302/sandbox',
    skillName: 'sandbox-standards',
    title: 'UniERP Isolated V8 Extension Sandbox',
    desc: 'Secure multi-tenant V8 execution sandbox for untrusted third-party extension scripts with memory and CPU bounds.',
    allowedOutbound: ['@kannan19302/contracts (L0)', 'L1 packages', '@kannan19302/extension-api (L2)'],
    forbidden: ['Layers L3-L7', 'Node native fs/net bypass'],
    inbound: ['L3 (api), L6 (extensions)'],
    techStack: 'Node.js, isolated-vm, TypeScript',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'runtime'
  },
  {
    name: 'api',
    layer: 'L3',
    layerName: 'Service',
    packageName: '@kannan19302/api',
    skillName: 'api-architecture-standards',
    title: 'UniERP Core Enterprise Business API',
    desc: '33 modular business domains (Finance, HR, CRM, SCM, etc.) adhering to the strict 6-part module anatomy with thin controllers and domain repositories.',
    allowedOutbound: ['@kannan19302/contracts (L0)', 'L1 packages', 'L2 packages (data, framework, blockchain)'],
    forbidden: ['Layers L4-L7', 'Direct UI imports'],
    inbound: ['L4 (Presentation apps), L5 (Clients)'],
    techStack: 'NestJS, Fastify, Prisma, Pino, OpenTelemetry, TypeScript',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'service-api'
  },
  {
    name: 'idp',
    layer: 'L3',
    layerName: 'Service',
    packageName: '@kannan19302/idp',
    skillName: 'idp-standards',
    title: 'UniERP Identity Provider (IdP)',
    desc: 'Central authentication and identity authority: OIDC/OAuth2 server, WebAuthn passkeys, session management, and multi-factor auth.',
    allowedOutbound: ['@kannan19302/contracts (L0)', 'L1 packages', '@kannan19302/database (L2)'],
    forbidden: ['Layers L4-L7'],
    inbound: ['L4 (Presentation apps), L5 (Clients), External Identity Federations'],
    techStack: 'NestJS, OIDC Provider, WebAuthn, TypeScript',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'service-idp'
  },
  {
    name: 'developer-platform',
    layer: 'L4',
    layerName: 'Presentation',
    packageName: '@kannan19302/developer',
    skillName: 'developer-platform-standards',
    title: 'UniERP Developer Platform Portal',
    desc: 'Developer console for building, testing, previewing, and submitting extensions, custom objects, and APIs.',
    allowedOutbound: ['@kannan19302/ui (L1)', '@kannan19302/contracts (L0)', '@kannan19302/auth (L1)', 'L3 via HTTP/SDK'],
    forbidden: ['Direct database ORM', 'L2 runtime internal bypass', 'L5-L7'],
    inbound: ['Third-party developers, ecosystem partners'],
    techStack: 'Next.js 14/15, React, Strata Workbench tokens, TypeScript',
    testCommand: 'pnpm typecheck',
    diagramType: 'presentation'
  },
  {
    name: 'marketing-site',
    layer: 'L4',
    layerName: 'Presentation',
    packageName: 'unierp-corporate-website',
    skillName: 'marketing-site-standards',
    title: 'UniERP Corporate Marketing Website',
    desc: 'Public-facing corporate portal, pricing matrices, product feature tours, customer stories, and documentation landing.',
    allowedOutbound: ['@kannan19302/ui (L1)', '@kannan19302/contracts (L0)'],
    forbidden: ['Direct database ORM', 'L2-L3 internals', 'L5-L7'],
    inbound: ['Public web visitors, prospective customers'],
    techStack: 'Next.js, React, Strata Workbench tokens, TypeScript',
    testCommand: 'pnpm typecheck',
    diagramType: 'presentation'
  },
  {
    name: 'marketplace',
    layer: 'L4',
    layerName: 'Presentation',
    packageName: '@kannan19302/marketplace',
    skillName: 'marketplace-standards',
    title: 'UniERP App Marketplace',
    desc: 'Catalog for browsing, installing, licensing, and reviewing extensions and business industry packs.',
    allowedOutbound: ['@kannan19302/ui (L1)', '@kannan19302/contracts (L0)', 'L3 via HTTP/SDK'],
    forbidden: ['Direct database ORM', 'L2-L3 internals', 'L5-L7'],
    inbound: ['Tenants, ecosystem developers'],
    techStack: 'Next.js, React, Strata Workbench tokens, TypeScript',
    testCommand: 'pnpm typecheck',
    diagramType: 'presentation'
  },
  {
    name: 'provider-admin-os',
    layer: 'L4',
    layerName: 'Presentation',
    packageName: '@kannan19302/console',
    skillName: 'provider-admin-standards',
    title: 'UniERP Provider Admin OS (Control Plane)',
    desc: 'Platform operator control plane: tenant provisioning, cluster health, cross-tenant metering, and license enforcement.',
    allowedOutbound: ['@kannan19302/ui (L1)', '@kannan19302/contracts (L0)', '@kannan19302/auth (L1)', 'L3 via HTTP/SDK'],
    forbidden: ['Direct database ORM', 'L2 internals', 'Bypassing ControlPlaneGuard'],
    inbound: ['Platform operators, SREs, super-administrators'],
    techStack: 'Next.js, React, Strata Workbench Dark Theme, TypeScript',
    testCommand: 'pnpm typecheck',
    diagramType: 'presentation'
  },
  {
    name: 'tenant-admin',
    layer: 'L4',
    layerName: 'Presentation',
    packageName: '@kannan19302/tenant-admin',
    skillName: 'tenant-admin-standards',
    title: 'UniERP Tenant Administration Portal',
    desc: 'Tenant self-service administration: user management, role assignments, SSO federation configuration, and billing subscriptions.',
    allowedOutbound: ['@kannan19302/ui (L1)', '@kannan19302/contracts (L0)', '@kannan19302/auth (L1)', 'L3 via HTTP/SDK'],
    forbidden: ['Direct database ORM', 'L2 internals', 'Provider control plane routes'],
    inbound: ['Tenant IT administrators, enterprise security officers'],
    techStack: 'Next.js, React, Strata Workbench Dark Theme, TypeScript',
    testCommand: 'pnpm typecheck',
    diagramType: 'presentation'
  },
  {
    name: 'tenant-apps',
    layer: 'L4',
    layerName: 'Presentation',
    packageName: '@kannan19302/web',
    skillName: 'tenant-apps-standards',
    title: 'UniERP Tenant Business Suite (Dashboard ERP)',
    desc: 'Primary ERP application suite (810 pages across 40+ business modules) providing operational workspaces powered by Strata Workbench.',
    allowedOutbound: ['@kannan19302/ui (L1)', '@kannan19302/contracts (L0)', '@kannan19302/auth (L1)', 'L3 via HTTP/SDK'],
    forbidden: ['Direct database ORM (@kannan19302/database)', 'Bypassing tenant scope', 'L5-L7'],
    inbound: ['Tenant business users, accountants, inventory managers, HR'],
    techStack: 'Next.js 14/15, React 19, Strata Workbench, TypeScript',
    testCommand: 'pnpm typecheck',
    diagramType: 'presentation-tenant'
  },
  {
    name: 'tenant-site-template',
    layer: 'L4',
    layerName: 'Presentation',
    packageName: '@kannan19302/corporate-site-template',
    skillName: 'tenant-site-template-standards',
    title: 'UniERP Tenant Corporate Site Template',
    desc: 'Customizable corporate website starter template for tenant organizations.',
    allowedOutbound: ['@kannan19302/ui (L1)', '@kannan19302/contracts (L0)'],
    forbidden: ['Direct database ORM', 'L2-L3 internals', 'L5-L7'],
    inbound: ['Tenant website builders'],
    techStack: 'Next.js, React, Strata Workbench tokens, TypeScript',
    testCommand: 'pnpm typecheck',
    diagramType: 'presentation'
  },
  {
    name: 'tenant-sites',
    layer: 'L4',
    layerName: 'Presentation',
    packageName: '@kannan19302/tenant-sites',
    skillName: 'tenant-sites-standards',
    title: 'UniERP Multi-Tenant Hosted Customer Sites',
    desc: 'Multi-tenant hosted e-commerce storefronts, customer portals, and partner landing pages.',
    allowedOutbound: ['@kannan19302/ui (L1)', '@kannan19302/contracts (L0)', 'L3 via HTTP/SDK'],
    forbidden: ['Direct database ORM', 'L2-L3 internals', 'L5-L7'],
    inbound: ['Tenant end-customers, partners'],
    techStack: 'Next.js, React, Strata Workbench tokens, TypeScript',
    testCommand: 'pnpm typecheck',
    diagramType: 'presentation'
  },
  {
    name: 'web-studio',
    layer: 'L4',
    layerName: 'Presentation',
    packageName: '@kannan19302/web-studio',
    skillName: 'web-studio-standards',
    title: 'UniERP Web Studio Redirect Shell',
    desc: 'Lightweight redirect shell directing visual design traffic to the unified Developer Platform.',
    allowedOutbound: ['@kannan19302/contracts (L0)'],
    forbidden: ['Direct database ORM', 'L2-L3 internals', 'L5-L7'],
    inbound: ['Legacy Web Studio URL callers'],
    techStack: 'Next.js, TypeScript',
    testCommand: 'pnpm typecheck',
    diagramType: 'presentation'
  },
  {
    name: 'desktop-app',
    layer: 'L5',
    layerName: 'Clients',
    packageName: '@kannan19302/desktop',
    skillName: 'desktop-app-standards',
    title: 'UniERP Desktop Application (Tauri Shell)',
    desc: 'Institutional desktop application providing offline caching, SQLite local storage, hardware POS printer/scanner access, and background syncing.',
    allowedOutbound: ['@kannan19302/contracts (L0)', 'tokens.g.css (Strata tokens)', 'L3 via HTTP/SDK'],
    forbidden: ['Direct database ORM', 'L2-L4 internals', 'L6-L7'],
    inbound: ['Desktop power users, POS cashiers, warehouse depot operators'],
    techStack: 'Tauri, Rust, Web前端 (React/Vite), SQLite, TypeScript',
    testCommand: 'pnpm build',
    diagramType: 'client'
  },
  {
    name: 'unierp-mobile',
    layer: 'L5',
    layerName: 'Clients',
    packageName: 'unierp_mobile',
    skillName: 'mobile-app-standards',
    title: 'UniERP Mobile Application (Flutter)',
    desc: 'Enterprise Flutter mobile client (430 screens) with native gestures, barcode/RFID scanning, camera receipt uploads, and offline queueing.',
    allowedOutbound: ['@kannan19302/contracts (L0)', 'tokens.g.dart (Strata mobile tokens)', 'L3 via HTTP/SDK'],
    forbidden: ['Direct database ORM', 'L2-L4 internals', 'L6-L7'],
    inbound: ['Field service workers, warehouse pickers, executives on mobile'],
    techStack: 'Flutter, Dart 3+, Provider/Bloc, SQLite',
    testCommand: 'dart analyze lib/src/tokens/',
    diagramType: 'client'
  },
  {
    name: 'extensions',
    layer: 'L6',
    layerName: 'Extensions',
    packageName: 'unierp-extensions',
    skillName: 'extensions-standards',
    title: 'UniERP Curated Extension Ecosystem',
    desc: 'First-party and ecosystem business extensions running strictly inside the L2 Sandbox against public extension contracts.',
    allowedOutbound: ['@kannan19302/contracts (L0)', '@kannan19302/extension-api (L2)'],
    forbidden: ['Direct database ORM', 'L3-L5 internal code', 'Private kernel APIs'],
    inbound: ['Marketplace runtime, tenant apps'],
    techStack: 'TypeScript, Sandbox SDK',
    testCommand: 'pnpm test && pnpm typecheck',
    diagramType: 'extensions'
  },
  {
    name: 'infra',
    layer: 'L7',
    layerName: 'Operations',
    packageName: 'unierp-infra',
    skillName: 'infra-operations-standards',
    title: 'UniERP Cloud Infrastructure & Orchestration',
    desc: 'Terraform IaC, Kubernetes Helm charts, Docker Compose, ArgoCD deployment pipelines, and Cloudflare edge network configurations.',
    allowedOutbound: ['All layers (Deployment & runtime configuration only)'],
    forbidden: ['Business domain code', 'Product feature logic'],
    inbound: ['SREs, DevOps engineers, release pipelines'],
    techStack: 'Terraform, Kubernetes, Docker, Helm, Bash/PowerShell',
    testCommand: 'docker-compose config',
    diagramType: 'operations'
  },
  {
    name: 'unierp-workspace',
    layer: 'L7',
    layerName: 'Operations',
    packageName: 'unierp-programme',
    skillName: 'workspace-governance-standards',
    title: 'UniERP Polyrepo Workspace & Governance Engine',
    desc: 'Polyrepo governance verification, CI fitness gates, change contracts, static architectural inventory scanners, and enterprise brain state.',
    allowedOutbound: ['All layers (Static inspection, verification, and linting only)'],
    forbidden: ['Runtime production code imports'],
    inbound: ['All contributors, CI workflows, platform architects'],
    techStack: 'Node.js, ESM, Bash, PowerShell',
    testCommand: 'node scripts/test-discovery-gates.mjs',
    diagramType: 'operations'
  },
  {
    name: 'unierp-platform',
    layer: 'Normative',
    layerName: 'Governance',
    packageName: 'unierp-platform-docs',
    skillName: 'platform-governance-standards',
    title: 'UniERP Platform Architecture Specifications & Standards',
    desc: 'Authoritative platform specifications, Architecture Decision Records (ADRs), Product Requirement Documents (PRDs), and traceability catalogs.',
    allowedOutbound: ['NONE (Normative specifications depend on no code)'],
    forbidden: ['Runtime code dependencies'],
    inbound: ['All human and AI engineers across all 31 repositories'],
    techStack: 'Markdown, Mermaid, JSON schemas',
    testCommand: 'node scripts/validate-truth.mjs (via workspace)',
    diagramType: 'governance'
  }
];

function generateMermaidDiagram(repo) {
  switch (repo.diagramType) {
    case 'contracts':
      return `\`\`\`mermaid
graph TD
  Contracts["<b>@kannan19302/contracts (L0)</b><br/>DTOs · Events · Errors · Interfaces"]
  
  L1["Layer L1: Foundation<br/>(auth, config, ui, kernel)"]
  L2["Layer L2: Runtime<br/>(data, framework, extension-api)"]
  L3["Layer L3: Service<br/>(api, idp)"]
  L4["Layer L4: Presentation<br/>(tenant-apps, admin-os)"]
  L5["Layer L5: Clients<br/>(desktop, mobile)"]

  Contracts --> L1
  Contracts --> L2
  Contracts --> L3
  Contracts --> L4
  Contracts --> L5

  classDef c fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
  classDef sub fill:#0f172a,stroke:#64748b,stroke-width:1px,color:#94a3b8;
  class Contracts c;
  class L1,L2,L3,L4,L5 sub;
\`\`\``;

    case 'design-system':
      return `\`\`\`mermaid
graph TD
  Tokens["Design Language 2.0 Tokens<br/>(themes/strata.css, density.css)"] --> Primitives["UI Primitives<br/>(button, input, badge)"]
  Primitives --> Layout["Layout & Shell Components<br/>(StrataBar, TabbedConsole, SplitViewShell)"]
  Layout --> DataDisplay["Data Display Grids<br/>(data-grid, table, metrics-card)"]
  
  Tokens --> Storybook["Storybook Workshop (:4006)"]
  Layout --> Storybook
  
  Tokens -.-> FlutterTokens["tokens.g.dart (Mobile)"]
  Tokens -.-> DesktopTokens["tokens.g.css (Desktop)"]

  classDef main fill:#052e16,stroke:#22c55e,stroke-width:2px,color:#fff;
  classDef tok fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
  class Layout,DataDisplay,Primitives main;
  class Tokens,FlutterTokens,DesktopTokens,Storybook tok;
\`\`\``;

    case 'data':
      return `\`\`\`mermaid
graph LR
  PrismaSchemas["Prisma Schemas (44 Parts)<br/>(data/prisma/schema/*.prisma)"] --> Migrations["PostgreSQL Migrations<br/>(data/prisma/migrations/)"]
  Migrations --> Tables["1,865 Multi-Tenant Tables<br/>(schema public)"]
  Tables --> RLS["Universal RLS RESTRICTIVE Policy<br/>tenant_id = current_setting('app.current_tenant_id')"]
  RLS --> Role["App DB Role: unierp_app_role<br/>(NOBYPASSRLS Enforced)"]

  classDef d fill:#1e1b4b,stroke:#6366f1,stroke-width:2px,color:#fff;
  class PrismaSchemas,Migrations,Tables,RLS,Role d;
\`\`\``;

    case 'service-api':
      return `\`\`\`mermaid
graph TD
  Client["Client (Web / Mobile / SDK)"] -->|HTTPS + JWT| Controller["Controller (Thin Handler)<br/>@UseGuards(JwtAuthGuard, RbacGuard)<br/>@Permissions(...) · @ZodBody()"]
  Controller --> Service["Domain Service<br/>(Pure Orchestration & Business Rules)"]
  Service --> Repository["Domain Repository<br/>(finance.repository.ts, etc.)"]
  Repository --> PrismaClient["PrismaClient (Database Access)"]
  PrismaClient --> Postgres[("PostgreSQL (NOBYPASSRLS)")]
  
  Service --> Outbox["Transactional Outbox (Atomic)"]
  Outbox --> Kafka[("Apache Kafka Event Stream")]
  Service --> Audit["AuditLog Engine (Zero Drops)"]
  Audit --> Postgres

  classDef s fill:#31104b,stroke:#a855f7,stroke-width:2px,color:#fff;
  class Client,Controller,Service,Repository,PrismaClient,Postgres,Outbox,Kafka,Audit s;
\`\`\``;

    case 'presentation-tenant':
      return `\`\`\`mermaid
graph TD
  User["Tenant User"] --> Shell["Root Shell (app/layout.tsx)<br/>data-theme='strata' · ThemeProvider"]
  Shell --> DashboardLayout["Dashboard Layout (app/(dashboard)/layout.tsx)<br/>&lt;StrataBar&gt; Context Header"]
  
  DashboardLayout --> Wave1["Core Finance & Operations<br/>(finance, inventory, sales, procurement)<br/>data-density='ultra-compact' (24px)"]
  DashboardLayout --> Wave2["Pipelines & Triage<br/>(crm, projects, manufacturing)<br/>data-density='compact' (28px)"]
  DashboardLayout --> Wave3["Verticals & Administration<br/>(healthcare, education, hr, real-estate)"]

  Wave1 --> API["Backend API (:4000)<br/>via @kannan19302/sdk"]
  Wave2 --> API
  Wave3 --> API

  classDef p fill:#052e16,stroke:#22c55e,stroke-width:2px,color:#fff;
  class User,Shell,DashboardLayout,Wave1,Wave2,Wave3,API p;
\`\`\``;

    default:
      return `\`\`\`mermaid
graph LR
  Callers["Allowed Inbound Callers<br/>${repo.inbound.join(', ')}"] --> Repo["<b>${repo.name} (${repo.layer})</b><br/>${repo.title}"]
  Repo --> Outbound["Allowed Outbound Dependencies<br/>${repo.allowedOutbound.join(', ')}"]
  
  Forbidden["Strictly Forbidden<br/>${repo.forbidden.join(', ')}"] -.-x Repo

  classDef r fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
  classDef c fill:#1e293b,stroke:#64748b,stroke-width:1px,color:#fff;
  classDef f fill:#450a0a,stroke:#ef4444,stroke-width:1px,color:#fca5a5;
  class Repo r;
  class Callers,Outbound c;
  class Forbidden f;
\`\`\``;
  }
}

function generateSkillContent(repo) {
  return `---
name: ${repo.skillName}
description: Authoritative standards, architectural boundaries, coding anatomy, and verification gates for ${repo.name}.
version: 1.0.0
author: UniERP Architecture Governance
---

# ${repo.title} — AI Agent Guidance & Project Skill

This skill governs all code modification, analysis, and testing within \`${repo.name}\` (**Layer ${repo.layer}: ${repo.layerName}**). Every AI agent and software engineer working in this repository MUST follow these rules without exception.

---

## 🏛️ 1. Architectural Position & Boundary Rules

- **Repository**: \`${repo.name}\`
- **Layer**: **${repo.layer} (${repo.layerName})**
- **Package Identity**: \`${repo.packageName}\`
- **Allowed Inbound Callers**: ${repo.inbound.join('; ')}
- **Allowed Outbound Dependencies**: ${repo.allowedOutbound.join('; ')}
- **STRICTLY FORBIDDEN DEPENDENCIES**:
${repo.forbidden.map((f) => `  - ❌ ${f}`).join('\n')}

> **Unidirectional Rule**: You may ONLY import published artifacts from strictly lower layers. Sibling imports within the same layer are prohibited unless mediated through L0 contracts.

---

## 🎯 2. The Platform Goal & Repository Mandate

> **Platform North Star Goal**:  
> "Build the world's premier autonomous, multi-tenant Enterprise SaaS Operating System: 100% Zero-Trust Multi-Tenant Isolation, Absolute Decimal(19,4) Numeric Precision, Atomic Durable Audit Logging, Sub-100ms P99 Latency, and Strata Workbench High-Density UI."

### Repository Responsibility Mandate
${repo.desc}

---

## 📐 3. Repository-Specific Coding Standards

${
  repo.name === 'design-system'
    ? `### Mandatory 5-File Uniform Component Anatomy
Every component under \`src/<category>/<component-name>/\` MUST contain exactly 5 files:
1. \`<name>.tsx\`: Component logic, strict TypeScript interfaces.
2. \`<name>.module.css\`: Scoped styles referencing Strata tokens (NO hardcoded pixels/hex).
3. \`<name>.stories.tsx\`: Storybook CSF 3.0 story.
4. \`<name>.test.tsx\`: Vitest + \`vitest-axe\` test with zero accessibility violations.
5. \`index.ts\`: Encapsulated barrel re-export.`
    : repo.name === 'api'
    ? `### Mandatory 6-Part Module Anatomy
Every business module under \`src/modules/<module-name>/\` MUST contain:
1. \`<name>.module.ts\`: NestJS dependency injection container.
2. \`controllers/<name>.controller.ts\`: Thin HTTP handler with \`@UseGuards(JwtAuthGuard, RbacGuard)\`, \`@Permissions(...)\`, and \`@ZodBody()\`.
3. \`services/<name>.service.ts\`: Pure business domain orchestration.
4. \`repositories/<name>.repository.ts\`: Domain repository encapsulating all Prisma access.
5. \`events/<name>.event-handler.ts\`: Async event dispatchers and outbox publishers.
6. \`tests/\`: Co-located unit and repository tests.`
    : repo.name === 'data'
    ? `### Mandatory Database Persistence Standards
1. **Universal RLS**: Every table with \`tenantId\` MUST have an explicit, restrictive RLS policy.
2. **Exact Decimal Math**: Financial and stock fields MUST use \`@db.Decimal(19,4)\`. Zero \`Float\` permitted.
3. **Immutable Migrations**: Never mutate existing committed migrations. Always author new migrations.`
    : repo.name === 'tenant-apps'
    ? `### Mandatory Tenant Apps Standards
1. **Strata Workbench Only**: Use design system tokens (\`var(--strata-*)\`). Zero hardcoded hex colors.
2. **Floorplan Selection**: Use standard floorplans (Analytical Workspace, Multi-Tab Console, Split Triage).
3. **Density Scaling**: Core financial routes must use \`data-density="ultra-compact"\` (24px row height).`
    : `### Core Implementation Standards
1. Maintain strict modular boundaries and single-responsibility interfaces.
2. Export all public types from the root \`index.ts\`.
3. Ensure zero TypeScript compilation errors under \`tsc --noEmit\`.`
}

---

## 🛡️ 4. Mandatory Pre-Commit Verification Gate

Before submitting or reporting completion on any change in this repository, run and verify:

\`\`\`bash
${repo.testCommand}
\`\`\`

All tests must pass with 0 failures and 0 type errors.
`;
}

function generateArchitectureContent(repo) {
  return `# Architecture Specification: ${repo.title} (\`${repo.name}\`)

- **Layer**: Layer ${repo.layer} (${repo.layerName})
- **Package Identity**: \`${repo.packageName}\`
- **Owning ADR**: [ADR-0010: UniERP Master Platform Goal and Polyrepo Architecture Boundaries](../unierp-platform/docs/adr/ADR-0010-platform-north-star-and-polyrepo-boundaries.md)
- **Status**: Authoritative & Production-Active

---

## 1. Executive Summary & Purpose

${repo.desc}

This repository is one delivery unit in the UniERP 31-repository polyrepo estate, anchored by the **UniERP Master Platform North Star Goal**:
> "Build the world's premier autonomous, multi-tenant Enterprise SaaS Operating System: delivering 100% Zero-Trust Multi-Tenant Isolation with PostgreSQL Row-Level Security on every tenant table, Absolute Decimal(19,4) Numeric Precision across all ledgers, Atomic Durable Audit Logging, Sub-100ms P99 Transaction Latency, and a Unified High-Density Strata Workbench Design Language across all 1,198 web routes, native mobile, and desktop clients."

---

## 2. System Context & Architectural Boundaries

${generateMermaidDiagram(repo)}

### Boundary Contract
- **Allowed Inbound Consumers**: ${repo.inbound.join('; ')}
- **Allowed Outbound Dependencies**: ${repo.allowedOutbound.join('; ')}
- **Strictly Forbidden Dependencies**:
${repo.forbidden.map((f) => `  - ❌ ${f}`).join('\n')}

---

## 3. Technology Stack & Key Primitives

- **Core Runtime & Languages**: ${repo.techStack}
- **Primary Interface**: \`${repo.packageName}\`
- **Verification Harness**: \`${repo.testCommand}\`

---

## 4. Quality Engineering & Verification Gates

To maintain institutional reliability, this repository is governed by the following continuous quality gates:
1. **Type Safety Gate**: Zero TypeScript/type-checker errors under strict mode.
2. **Layer Boundary Gate**: Verified by \`scripts/check-layer.mjs\` in \`unierp-workspace\` to prevent illegal upward or sideways coupling.
3. **Automated Test Suite**: Must execute cleanly with 100% pass rate before branch integration.

---

## 5. Associated AI Skills & Governance Links

- **Project Skill**: [\`.agents/skills/${repo.skillName}/SKILL.md\`](.agents/skills/${repo.skillName}/SKILL.md)
- **Workspace Governance**: [\`../unierp-workspace/governance/UNIERP_MASTER_PLATFORM_GOAL.md\`](../unierp-workspace/governance/UNIERP_MASTER_PLATFORM_GOAL.md)
- **Canonical Protocol**: [\`../unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md\`](../unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md)
`;
}

// Main Execution
console.log('Scaffolding skills and architecture documentation across all 31 repositories...');

let createdSkills = 0;
let createdDocs = 0;

for (const repo of REPOSITORIES) {
  const repoPath = resolve(PARENT_DIR, repo.name);
  if (!existsSync(repoPath)) {
    console.warn(`⚠️ Repository directory not found: ${repoPath} (skipping)`);
    continue;
  }

  // 1. Scaffold Skill (.agents/skills/<skill-name>/SKILL.md)
  const skillDir = join(repoPath, '.agents', 'skills', repo.skillName);
  if (!existsSync(skillDir)) {
    mkdirSync(skillDir, { recursive: true });
  }
  const skillFile = join(skillDir, 'SKILL.md');
  const skillContent = generateSkillContent(repo);
  writeFileSync(skillFile, skillContent, 'utf8');
  createdSkills++;

  // 2. Scaffold ARCHITECTURE.md in repository root
  const archFile = join(repoPath, 'ARCHITECTURE.md');
  const archContent = generateArchitectureContent(repo);
  writeFileSync(archFile, archContent, 'utf8');
  createdDocs++;

  console.log(`✅ [${repo.layer}] ${repo.name} -> Skill: .agents/skills/${repo.skillName}/SKILL.md & ARCHITECTURE.md`);
}

console.log(`\n🎉 Completed estate-wide scaffolding:`);
console.log(`   - ${createdSkills} Project AI Skills deployed`);
console.log(`   - ${createdDocs} ARCHITECTURE.md specifications authored with Mermaid diagrams.`);
