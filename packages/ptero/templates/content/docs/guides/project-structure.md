---
title: Project Structure
description: Understanding the Pterodactyl project layout.
section: Guides
order: 1
---

# Project Structure

A typical Pterodactyl documention project looks like this:

```
my-docs/
├── src/
│   ├── content/
│   │   └── docs/           # Your markdown documentation
│   │       ├── intro/
│   │       ├── guides/
│   │       └── reference/
│   ├── routes/             # SvelteKit routes
│   └── app.html
├── pterodactyl.config.ts   # Main configuration file
└── package.json
```

## Key Directories

### `src/content/docs`

This is where your content lives. Pterodactyl supports a nested structure here to better organize your documentation. Changes here are instantly reflected in your dev environment.

### `pterodactyl.config.ts`

The single source of truth for your specific site configuration, including:

- Site title and description
- Sidebar navigation structure
- Theme customization
- Versioning setup

### `src/routes/docs`

These are the SvelteKit routes that power the documentation. You can modify these files to customize the layout, add global providers, or change data fetching logic.
