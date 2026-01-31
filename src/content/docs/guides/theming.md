---
title: Theming Guide
description: Customize Pterodactyl's appearance with CSS variables and theme presets
section: guides
order: 4
---

# Theming Guide

Pterodactyl provides a flexible theming system based on CSS custom properties (variables), allowing you to customize every aspect of your documentation's appearance.

## Quick Start

The simplest way to customize your theme is to use a preset:

```typescript
// pterodactyl.config.ts
export default {
	theme: {
		preset: 'supabase' // or 'github', 'minimal'
	}
} satisfies PterodactylConfig;
```

## Available Presets

### Default

The default Pterodactyl theme with blue accents and a modern feel.

```typescript
theme: {
	preset: 'default';
}
```

### Supabase

Inspired by Supabase documentation with green accents.

```typescript
theme: {
	preset: 'supabase';
}
```

### GitHub

Minimal theme inspired by GitHub documentation.

```typescript
theme: {
	preset: 'github';
}
```

### Minimal

Clean, minimal theme with subtle colors.

```typescript
theme: {
	preset: 'minimal';
}
```

## Custom CSS Variables

Override specific CSS variables to customize colors, fonts, and spacing:

```typescript
// pterodactyl.config.ts
export default {
	theme: {
		cssVars: {
			'--color-primary': '#3ECF8E',
			'--color-accent': '#14b8a6',
			'--font-family-base': "'Inter Variable', sans-serif",
			'--font-family-mono': "'JetBrains Mono', monospace",
			'--border-radius': '8px'
		}
	}
} satisfies PterodactylConfig;
```

## Available CSS Variables

### Colors

#### Primary & Accent

- `--color-primary` - Primary brand color (links, active states)
- `--color-accent` - Secondary accent color (gradients, highlights)
- `--color-blue` - Blue accent color
- `--color-gray` - Gray accent color

#### Background Colors

- `--background` - Main background color
- `--foreground` - Main text color
- `--background-secondary` - Secondary background (cards, sidebars)
- `--background-tertiary` - Tertiary background (hovers, highlights)

#### Text Colors

- `--color-text` - Primary text color (same as foreground)
- `--color-text-secondary` - Secondary text (less emphasis)
- `--color-text-tertiary` - Tertiary text (minimal emphasis)

#### Border Colors

- `--border-color` - Default border color
- `--border-color-hover` - Border color on hover

#### Legacy Pterodactyl Tokens

For backward compatibility, these are also available:

- `--ptero-color-bg` - Main background
- `--ptero-color-bg-secondary` - Secondary background
- `--ptero-color-bg-tertiary` - Tertiary background
- `--ptero-color-text` - Primary text
- `--ptero-color-text-secondary` - Secondary text
- `--ptero-color-text-tertiary` - Tertiary text
- `--ptero-color-primary` - Primary brand color
- `--ptero-color-accent` - Accent color
- `--ptero-color-border` - Border color
- `--ptero-color-border-hover` - Border hover color

### Typography

- `--font-family-base` - Base font family for body text
- `--font-family-mono` - Monospace font family for code
- `--font-size-body` - Base font size (default: 1rem)
- `--font-size-h1` - H1 heading size (default: 2.25rem)
- `--font-size-h2` - H2 heading size (default: 1.875rem)
- `--font-size-h3` - H3 heading size (default: 1.5rem)
- `--font-size-button` - Button font size (default: 0.875rem)
- `--line-height-body` - Body line height (default: 1.5)
- `--line-height-heading` - Heading line height (default: 1.2)

### Spacing

- `--spacing-xs` - Extra small spacing (4px)
- `--spacing-sm` - Small spacing (8px)
- `--spacing-md` - Medium spacing (16px)
- `--spacing-lg` - Large spacing (24px)
- `--spacing-xl` - Extra large spacing (32px)
- `--spacing-2xl` - 2X large spacing (48px)

### Borders

- `--border-radius` - Small border radius (default: 4px)
- `--border-radius-lg` - Large border radius (default: 8px)

### Components

- `--button-padding` - Button padding (default: 12px 24px)
- `--input-padding` - Input padding (default: 12px 16px)
- `--card-padding` - Card padding (default: 24px)
- `--card-shadow` - Card box shadow

## Combining Presets and Custom Variables

You can start with a preset and override specific variables:

```typescript
export default {
	theme: {
		preset: 'github',
		cssVars: {
			// Override just the primary color
			'--color-primary': '#FF6B6B'
		}
	}
} satisfies PterodactylConfig;
```

## Dark Mode

Pterodactyl automatically includes dark mode support. The theme toggle button (☀️/🌙/💫) cycles between:

- **Light** - Force light mode
- **Dark** - Force dark mode
- **Auto** - Match system preference

Dark mode uses the same CSS variables with different values. To customize dark mode specifically, you can add custom CSS in your `src/app.css`:

```css
:root.dark {
	--color-primary: #818cf8;
	--color-accent: #34d399;
}
```

## Advanced Customization

For complete control, you can override any CSS in your `src/app.css`:

```css
/* Override component-specific styles */
.sidebar-nav {
	background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
}

.nav-items a.active {
	background: var(--color-primary);
	box-shadow: 0 4px 20px rgba(var(--color-primary), 0.4);
}
```

## Custom Fonts

To use custom fonts, import them in your `src/app.css` and reference them in your theme config:

```css
/* src/app.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
```

```typescript
// pterodactyl.config.ts
export default {
	theme: {
		cssVars: {
			'--font-family-base': "'Poppins', sans-serif"
		}
	}
};
```

## Examples

### Brand Colors Only

```typescript
theme: {
  cssVars: {
    '--color-primary': '#FF6B6B',
    '--color-accent': '#4ECDC4'
  }
}
```

### Complete Custom Theme

```typescript
theme: {
  cssVars: {
    // Colors
    '--color-primary': '#FF6B6B',
    '--color-accent': '#4ECDC4',
    '--background': '#FFFBF0',
    '--foreground': '#2C3E50',

    // Typography
    '--font-family-base': "'Poppins', sans-serif",
    '--font-family-mono': "'Fira Code', monospace",

    // Spacing
    '--border-radius': '12px',
    '--border-radius-lg': '16px'
  }
}
```

## Tips

- **Start with a preset** - Choose the closest preset and customize from there
- **Use design tokens** - Keep your brand colors consistent across variables
- **Test dark mode** - Always test your custom theme in both light and dark modes
- **Browser DevTools** - Use browser inspector to see which variables affect which elements
- **Incremental changes** - Make small changes and see the results immediately with HMR

## Next Steps

- Explore [Configuration Reference](/docs/latest/reference/configuration) for all config options
- Learn about [Component Customization](/docs/latest/guides/components) (coming soon)
- Check out [Advanced Styling](/docs/latest/guides/styling) for CSS tips
