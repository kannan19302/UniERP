> **Repository evidence:** Relocated from `marketing-site/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# UniERP Corporate Marketing Website

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

> The official corporate landing page, product pitch, SaaS pricing, and documentation gateway for the **UniERP Platform**.

---

## 🏛️ System Architecture

This repository is the dedicated standalone corporate site for **UniERP Company**. It connects seamlessly with the core **UniERP Multi-Tenant Platform**:

```
 ┌──────────────────────────────────────────────┐          ┌──────────────────────────────────────────────┐
 │   UniERP Corporate Website (This Repo)       │          │      UniERP Core Platform (ERPSys Repo)     │
 │  - SaaS product pitch & features             │ ────────►│  - '/' Tenant Website & CMS Engine           │
 │  - Industry solution showcase                │          │  - '/apps' ERP Desk (Finance, HR, POS)       │
 │  - SaaS Pricing plans & sign-up CTA          │          │  - '/apps/builder' No-Code Studio Builder    │
 └──────────────────────────────────────────────┘          └──────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 2. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_ERP_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Run Locally

```bash
pnpm dev
# App runs on http://localhost:3002
```

---

## 🔗 Cross-Navigation Integration

- **Log In / ERP Desk CTA**: Links directly to `${NEXT_PUBLIC_ERP_APP_URL}/login` or `${NEXT_PUBLIC_ERP_APP_URL}/apps`.
- **Tenant Website Portal**: Links directly to `${NEXT_PUBLIC_ERP_APP_URL}/` to demonstrate tenant-customizable website rendering powered by Builder Studio.
- **API Swagger Documentation**: Links to `${NEXT_PUBLIC_API_URL}/swagger`.

