---
title: Configuration
description: How to configure your Pterodactyl site.
section: Guides
order: 2
---

# Configuration

Your site is configured via `pterodactyl.config.ts` in the project root.

## Basic Options

```typescript
import type { PterodactylConfig } from 'pterodactyl-core';

const config: PterodactylConfig = {
	site: {
		title: 'My Docs',
		description: 'Awesome documentation site',
		baseUrl: '/docs'
	}
	// ...
};

export default config;
```

## Sidebar Configuration

The sidebar is explicit but flexible. You define the order of sections and subsections.

```typescript
sidebar: {
  // Top-level sections (directories or groups)
  sectionOrder: ['Introduction', 'Guides', 'Reference'],

  // Order of pages within each section
  subsectionOrder: {
    Introduction: ['what-is-pterodactyl', 'installation'],
    // Use the slug (filename without extension)
    Guides: ['project-structure', 'configuration']
  }
}
```

For a full reference of all available options, see the [Configuration Reference](/docs/latest/reference/configuration).
