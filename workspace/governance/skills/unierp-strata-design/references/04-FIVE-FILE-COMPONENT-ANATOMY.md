# 04 — Mandatory 5-File Uniform Component Anatomy

Every single component in `@kannan19302/ui` MUST live inside its own directory with these 5 co-located files:

```
src/<category>/<component-name>/
├── <component-name>.tsx         # Logic, Props, & TypeScript Interfaces
├── <component-name>.module.css  # Scoped CSS Module (DL 2.0 / Strata Tokens)
├── <component-name>.stories.tsx # Storybook Story (CSF 3.0)
├── <component-name>.test.tsx    # Vitest + vitest-axe Unit & A11y Test Suite
└── index.ts                     # Encapsulated Re-export
```

### 1. Component Logic (`<name>.tsx`)
```tsx
import type { FC, ReactNode } from "react";
import styles from "./my-component.module.css";

export interface MyComponentProps {
  children?: ReactNode;
  variant?: "default" | "elevated";
}

export const MyComponent: FC<MyComponentProps> = ({ children, variant = "default" }) => {
  return (
    <div className={`${styles.root} ${styles[variant]}`}>
      {children}
    </div>
  );
};
```

### 2. Scoped CSS Module (`<name>.module.css`)
```css
.root {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  padding: var(--density-cell-padding-y, 8px) var(--density-cell-padding-x, 12px);
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm, 4px);
  color: var(--color-text);
  font-family: var(--font-sans);
}

.elevated {
  background-color: var(--color-surface-elevated);
  box-shadow: var(--shadow-sm);
}
```

### 3. Storybook Story (`<name>.stories.tsx`)
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./my-component";

const meta: Meta<typeof MyComponent> = {
  title: "Primitives/MyComponent",
  component: MyComponent,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: { children: "Strata Primitive" },
};
```

### 4. Unit & A11y Test (`<name>.test.tsx`)
```tsx
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { MyComponent } from "./my-component";

describe("MyComponent", () => {
  it("renders children cleanly", () => {
    const { getByText } = render(<MyComponent>Hello</MyComponent>);
    expect(getByText("Hello")).toBeDefined();
  });

  it("has zero accessibility violations", async () => {
    const { container } = render(<MyComponent>Accessible Content</MyComponent>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 5. Barrel Export (`index.ts`)
```typescript
export { MyComponent, type MyComponentProps } from "./my-component";
```
