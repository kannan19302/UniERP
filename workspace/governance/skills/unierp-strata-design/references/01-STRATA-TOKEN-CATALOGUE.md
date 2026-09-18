# 01 — Strata Design Token Catalogue & Variable Dictionary

This reference provides the authoritative token mapping for UniERP Strata Workbench.

## 🎨 Theme Surfaces & Canvas

```css
/* Light Theme [data-theme="strata"] */
--color-bg: #f8fafc;              /* Slate 50 — primary canvas */
--color-bg-elevated: #ffffff;     /* Pure white — card, cell, modal ground */
--color-bg-sunken: #f1f5f9;       /* Slate 100 — table header, filter well */
--color-bg-hover: #f1f5f9;        /* Hover surface */
--color-bg-active: #e2e8f0;       /* Pressed surface */

/* Dark Theme [data-theme="strata-dark"] */
--color-bg: #09090b;              /* Obsidian/Zinc 950 — tactical canvas */
--color-bg-elevated: #18181b;     /* Zinc 900 — card, panel ground */
--color-bg-sunken: #0f172a;       /* Slate 900 — table header, filter well */
--color-bg-hover: #27272a;        /* Zinc 800 — hover surface */
--color-bg-active: #3f3f46;       /* Pressed surface */
```

## 📐 Hairline Structural Borders

```css
/* Light */
--color-border: #e2e8f0;          /* 1px subtle divider (tables, list items) */
--color-border-strong: #94a3b8;   /* Input field outlines, card boundaries */
--color-border-focus: #3b82f6;    /* Accessible focus ring (2px offset) */

/* Dark */
--color-border: #27272a;          /* 1px subtle divider */
--color-border-strong: #3f3f46;   /* Input boundaries */
--color-border-focus: #38bdf8;    /* Sky 400 focus ring */
```

## ⚡ Primary Brand & Interaction Accents

```css
/* Light (Strata Cobalt) */
--color-primary: #2563eb;         /* Blue 600 (WCAG AAA >= 7.2:1 against white) */
--color-primary-hover: #1d4ed8;   /* Blue 700 */
--color-primary-active: #1e40af;  /* Blue 800 */
--on-primary: #ffffff;            /* Text/icon on primary fill */

/* Dark (Electric Sapphire) */
--color-primary: #38bdf8;         /* Sky 400 (high-visibility tactical accent) */
--color-primary-hover: #0ea5e9;   /* Sky 500 */
--color-primary-active: #0284c7;  /* Sky 600 */
--on-primary: #09090b;            /* Dark text on light accent */
```

## 🚥 Semantic Status Ramps

```css
/* Success */
--color-success: #16a34a;
--color-success-light: #f0fdf4;
--color-success-text: #15803d;

/* Warning */
--color-warning: #d97706;
--color-warning-light: #fffbeb;
--color-warning-text: #b45309;

/* Danger / Critical */
--color-danger: #dc2626;
--color-danger-light: #fef2f2;
--color-danger-text: #b91c1c;

/* Info / Telemetry */
--color-info: #0284c7;
--color-info-light: #f0f9ff;
--color-info-text: #0369a1;
```

## 🔠 Typography Roles

```css
--font-display: "Plus Jakarta Sans", "Inter Display", system-ui, sans-serif;
--font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", "Geist Mono", "Martian Mono", monospace;
```
