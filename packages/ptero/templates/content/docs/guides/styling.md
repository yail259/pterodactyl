---
title: Styling & Theming
description: Customizing the look and feel of your docs.
section: Guides
order: 4
---

# Styling & Theming

Pterodactyl comes with a default theme that supports light and dark modes, but you can customize it to match your brand.

## CSS Variables

The easiest way to theme your site is by overriding CSS variables in your `app.css` or global stylesheet.

```css
:root {
	--pt-color-primary: #3b82f6;
	--pt-color-bg: #ffffff;
	--pt-color-text: #111827;
}

.dark {
	--pt-color-bg: #0f172a;
	--pt-color-text: #f3f4f6;
}
```

## Configuration

You can also set primary colors in `pterodactyl.config.ts`:

```typescript
theme: {
  primary: '#ff3e00',
}
```
