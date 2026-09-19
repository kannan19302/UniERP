<!-- UniERP-Storybook-Enterprise-Standards: 1.0.0 -->
# Enterprise-Grade Storybook Standards & Best Practices

> **Scope**: Applies to all UI components, primitives, layouts, blocks, and floorplans in `@kannan19302/ui` and across the UniERP Design System polyrepo.
> **Authority**: Subordinate to accepted ADRs and `AI_AGENT_DEVELOPMENT_PROTOCOL.md`. Mandatory for all human engineers and AI coding agents.

---

## 1. Executive Summary & Core Principles

Storybook is the single source of truth for the visual, behavioral, accessibility, and documentation contracts of `@kannan19302/ui`. Every component published in the library must satisfy four foundational pillars:

1. **Self-Documenting Autodocs**: Every component must have a rich, interactive Documentation page in Storybook displaying JSDoc descriptions, default values, prop types, controls, and accessibility guidelines.
2. **"All States in One Place" (The State Matrix)**: Engineers and designers must be able to audit all component lifecycle and interaction states (Default, Hover/Focus, Active/Selected, Disabled/Readonly, Loading/Submitting, Error/Validation, Empty) in a single visual canvas without clicking through dozens of separate tabs.
3. **Anatomy & Sub-Elements Breakdown**: Multi-part and compound components must explicitly visualize their internal anatomy, sub-elements, and slot composition (e.g. `AvatarGroup`, `Alert.Title` + `Alert.Description`, `SplitButton` main + trigger menu, `UserChip` avatar + label + remove button).
4. **4-Tier Density & BiDi Conformance**: Components must prove responsive fidelity across the 4-tier density matrix (`ultra-compact` 24px, `compact` 28px, `standard` 32px, `comfortable` 40px) and Right-to-Left (RTL) text directions.

---

## 2. Component Story Format (CSF 3) Standards

All story files must strictly adhere to **CSF 3 (Component Story Format 3)** using TypeScript:

### 2.1 Metadata Structure (`default export`)
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered", // or "padded", "fullscreen"
    docs: {
      description: {
        component: "Primary interactive button element supporting 6 visual hierarchies, 4 density tiers, and tactile press micro-interactions.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "danger", "link"],
      description: "Visual hierarchy and semantic intent of the button.",
      table: {
        type: { summary: "ButtonVariant" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Ergonomic sizing tier conforming to ADR-0009 4-tier density scale.",
      table: {
        type: { summary: "ButtonSize" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables user interaction and applies accessible muted styling.",
    },
    loading: {
      control: "boolean",
      description: "Replaces leading icon with a spinner and sets aria-busy.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;
```

### 2.2 Standard Story Taxonomy
Story titles must follow the canonical categorization:
- `Primitives/<ComponentName>` (e.g., `Primitives/Button`, `Primitives/Avatar`, `Primitives/Badge`)
- `Inputs/<ComponentName>` (e.g., `Inputs/TextField`, `Inputs/Combobox`)
- `DataDisplay/<ComponentName>` (e.g., `DataDisplay/Card`, `DataDisplay/Timeline`)
- `DataGrid/<ComponentName>` (e.g., `DataGrid/Table`, `DataGrid/DataGrid`)
- `Navigation/<ComponentName>` (e.g., `Navigation/Tabs`, `Navigation/Breadcrumb`)
- `Overlays/<ComponentName>` (e.g., `Overlays/Modal`, `Overlays/Tooltip`, `Overlays/Popover`)
- `Blocks/<ComponentName>` (e.g., `Blocks/AuthCard`, `Blocks/PricingTable`)
- `Layout/<ComponentName>` (e.g., `Layout/PageHeader`, `Layout/ListPageTemplate`)
- `Shell/<ComponentName>` (e.g., `Shell/DataWorkspace`, `Shell/TransactionWorkspace`)

---

## 3. Mandatory Story Requirements for Every Component

Every component story file must contain at minimum the following 4 canonical exports:

### 1. Primary Default Story (`Default`)
Shows the component in its canonical, interactive default state with controls attached.
```tsx
export const Default: Story = {
  args: {
    children: "Save Changes",
    variant: "primary",
    size: "md",
  },
};
```

### 2. Sub-Elements & Anatomy Breakdown (`Anatomy` or `Compound`)
Illustrates how the component's internal sub-elements or slots assemble together.
```tsx
export const AnatomyAndComposition = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
    <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
      Sub-elements: Leading Icon + Label + Badge Counter + Trailing Shortcut
    </div>
    <Button variant="secondary">
      <Sparkles size={14} />
      <span>Generate Forecast</span>
      <Badge variant="pill" size="xs">AI</Badge>
    </Button>
  </div>
);
```

### 3. The "All States in One Place" State Matrix (`AllStatesGallery` or `StateMatrix`)
**MANDATORY**: Displays all lifecycle and interactive states simultaneously in an easy-to-scan grid:
- Normal / Default
- Hover / Focus-Visible simulation
- Active / Pressed
- Loading / Submitting
- Disabled / Readonly
- Error / Invalid
- Empty / Initial
```tsx
export const AllStatesGallery = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
    {/* Row 1: Interactive Lifecycle */}
    <div>
      <h4 style={{ margin: "0 0 var(--space-2) 0", fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
        Interaction & Lifecycle States
      </h4>
      <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <span style={{ fontSize: "var(--type-micro)", display: "block", color: "var(--color-text-muted)" }}>Default</span>
          <Button variant="primary">Default State</Button>
        </div>
        <div>
          <span style={{ fontSize: "var(--type-micro)", display: "block", color: "var(--color-text-muted)" }}>Loading / Busy</span>
          <Button variant="primary" loading>Submitting</Button>
        </div>
        <div>
          <span style={{ fontSize: "var(--type-micro)", display: "block", color: "var(--color-text-muted)" }}>Disabled</span>
          <Button variant="primary" disabled>Disabled State</Button>
        </div>
      </div>
    </div>

    {/* Row 2: Density Tiers */}
    <div>
      <h4 style={{ margin: "0 0 var(--space-2) 0", fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
        Ergonomic Density Tiers
      </h4>
      <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
        <Button size="xs">Micro (xs: 24px)</Button>
        <Button size="sm">Compact (sm: 28px)</Button>
        <Button size="md">Default (md: 32px)</Button>
        <Button size="lg">Spacious (lg: 40px)</Button>
      </div>
    </div>
  </div>
);
```

### 4. Hierarchy / Variations Matrix (`HierarchyMatrix` or `VariantsMatrix`)
Shows all stylistic variants (e.g., Primary, Secondary, Ghost, Outline, Danger) side-by-side.

---

## 4. Documentation & JSDoc Standards

To generate accurate, rich documentation in Storybook Autodocs:
1. **Component Interface JSDoc**:
   Every exported prop in the component's TypeScript interface must carry a descriptive JSDoc block:
   ```ts
   export interface AlertProps {
     /** The semantic tone and visual accent border of the alert. */
     variant?: "info" | "success" | "warning" | "danger";
     /** Bold summary title rendered at the top of the alert banner. */
     title?: string;
     /** Action button or interactive dismiss handler. */
     onDismiss?: () => void;
     /** Main descriptive message or rich markdown content. */
     children: ReactNode;
   }
   ```
2. **Component Functional Header**:
   ```ts
   /**
    * `<Alert>` — High-visibility feedback banner for status notifications,
    * warnings, and system alerts.
    */
   export const Alert: FC<AlertProps> = ({ ... }) => { ... };
   ```

---

## 5. Accessibility Testing Standards in Storybook

1. **Zero Violations in A11y Panel**:
   - Every story must show `0 accessibility violations` under the Accessibility tab powered by axe-core.
   - Proper roles (`role="alert"`, `role="status"`, `role="progressbar"`, `role="button"`) and accessible labels (`aria-label`, `aria-labelledby`, `aria-describedby`) are mandatory.
2. **Keyboard Navigation Verification**:
   - Interactive elements must show clear `:focus-visible` styling with accessible outline offset (`var(--focus-ring)`).
3. **Contrast Compliance**:
   - Every state (normal, hover, active, disabled) must meet WCAG 2.2 AA (>= 4.5:1 text, >= 3.0:1 graphics).

---

## 6. Storybook Quality Checklist for Engineers & AI Agents

Before submitting or committing any UI component changes:
- [ ] Story file co-located as `<component-name>.stories.tsx`.
- [ ] `tags: ["autodocs"]` present in story metadata.
- [ ] JSDocs documented on all interface props.
- [ ] `AllStatesGallery` or `StateMatrix` story included visualizing all states in one place.
- [ ] Sub-elements and compound anatomy visualized.
- [ ] 4-Tier density variations demonstrated.
- [ ] Story compilation gate clean (`node scripts/check-stories-compilation.mjs` passes with zero syntax or JSX transform errors).
- [ ] Zero unescaped `>` or `<` inside JSX text nodes (strictly use `&gt;`, `&lt;`, or string literals `{"..."}`).
- [ ] Universal Strata typography enforced: uses `var(--font-sans)` with Inter & system fallbacks; zero unstyled browser serif fonts.
- [ ] Zero accessibility violations in Storybook A11y addon.
- [ ] Token gate clean (`node scripts/check-tokens.mjs` passes).
- [ ] Storybook standards gate clean (`node scripts/check-storybook-standards.mjs` passes).
