---
title: Architecture Overview
description: Understanding how Pterodactyl works under the hood.
section: Core Concepts
order: 1
---

# Architecture Overview

Pterodactyl is built on a modular architecture that integrates deeply with SvelteKit while maintaining flexibility and extensibility. This guide explains how the pieces fit together.

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Your SvelteKit App                 │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────────┐    ┌─────────────────────────┐ │
│  │  pterodactyl-  │────│  UI components          │ │
│  │  core          │    │  (added via CLI)        │ │
│  │                │    │                         │ │
│  │ - Content      │    │ - Layout primitives     │ │
│  │ - Navigation   │    │ - UI elements           │ │
│  │ - Search       │    │ - Styles                │ │
│  │ - Versioning   │    │                         │ │
│  └────────────────┘    └─────────────────────────┘ │
│           │                      │                  │
│           └──────────┬───────────┘                  │
│                      │                              │
│              ┌───────▼────────┐                     │
│              │   MDsveX       │                     │
│              │   + Shiki      │                     │
│              └───────┬────────┘                     │
│                      │                              │
│              ┌───────▼────────┐                     │
│              │  Markdown      │                     │
│              │  Content       │                     │
│              └────────────────┘                     │
└─────────────────────────────────────────────────────┘
```

## Core Packages

### Bundled Core

Pterodactyl ships its content/navigation/search logic inside the app (no separate `pterodactyl-core` install). It provides the fundamental functionality for documentation sites:

**Content Management:**

- Parses Markdown files with frontmatter validation
- Loads and processes documentation content
- Handles versioned content directories
- Provides content APIs for SvelteKit routes

**Navigation:**

- Generates sidebar navigation from content structure
- Creates breadcrumb trails
- Provides prev/next page navigation
- Supports custom navigation configuration

**Search:**

- Builds search indices at compile time
- Provides search API for client-side querying
- Supports version-scoped search
- Uses Fuse.js for fuzzy matching

**Versioning:**

- Manages multiple documentation versions
- Handles version aliases (latest, next, etc.)
- Routes version-specific content requests

### UI Components

Use `pterodactyl add <component>` to pull prebuilt components into your app (shadcn-style). You can also bring your own layouts and styles; Pterodactyl core is UI-agnostic.

### pterodactyl-cli

The CLI package provides tooling for setup and management:

- `pterodactyl init` - Initialize Pterodactyl in existing projects
- `pterodactyl version create` - Create new documentation versions
- `pterodactyl search build` - Build search indices
- Template scaffolding

## Content Processing Pipeline

### 1. File Discovery

When SvelteKit builds or runs in dev mode, Pterodactyl scans the `src/content/docs` directory:

```typescript
src/content/docs/
├── intro/
│   └── getting-started.md
└── guides/
    └── configuration.md
```

### 2. Frontmatter Parsing

Each file's frontmatter is validated using Zod schemas:

```typescript
import { z } from 'zod';

const FrontmatterSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	section: z.string(),
	order: z.number().optional(),
	hidden: z.boolean().optional()
});
```

### 3. MDsveX Processing

Markdown content is processed by MDsveX:

- Parses Markdown to HTML
- Processes Svelte components
- Applies syntax highlighting with Shiki
- Generates component output

### 4. Route Generation

SvelteKit's dynamic routing serves processed content:

```
/docs/[version]/[...slug]
  ↓
/docs/latest/guides/configuration
  ↓
Loads: src/content/docs/guides/configuration.md
```

## Data Flow

### Page Load Sequence

1. **User navigates to `/docs/latest/guides/configuration`**

2. **SvelteKit calls `+page.server.ts` load function**

   ```typescript
   export async function load({ params }) {
   	const doc = await loadDoc(params.version, params.slug);
   	return { doc };
   }
   ```

3. **`loadDoc` retrieves content from core**
   - Checks version validity
   - Finds corresponding file
   - Returns parsed frontmatter + component

4. **Page renders with DocsLayout**
   - Sidebar shows navigation
   - Content area displays MDsveX component
   - TOC extracts headings

5. **Client-side hydration enables**
   - Instant navigation between pages
   - Search functionality
   - Theme switching

## Routing Strategy

Pterodactyl uses SvelteKit's file-based routing with dynamic segments:

```
src/routes/
└── docs/
    └── [version]/
        ├── +layout.svelte          # Applies DocsLayout
        ├── +layout.server.ts       # Loads sidebar/config
        ├── +page.svelte            # Version index page
        └── [...slug]/
            ├── +page.svelte        # Doc page component
            └── +page.server.ts     # Loads doc content
```

### Version Parameter

The `[version]` parameter supports:

- Explicit versions: `v1.0`, `v2.0`
- Aliases: `latest`, `next`
- Resolution to actual version folders

### Slug Catch-All

The `[...slug]` parameter captures the full page path:

- `guides/configuration` → `['guides', 'configuration']`
- `intro/installation` → `['intro', 'installation']`

## Search Implementation

### Index Building

Search indices are built at compile time:

1. **Scan all documentation files**
2. **Extract searchable content**
   - Title
   - Description
   - Headings
   - Body text (stripped of Markdown)
3. **Create Fuse.js index with weights**
   ```typescript
   {
   	keys: [
   		{ name: 'title', weight: 3 },
   		{ name: 'description', weight: 2 },
   		{ name: 'content', weight: 1 }
   	];
   }
   ```
4. **Serialize index to JSON**

### Client-Side Search

The search component uses the pre-built index:

```typescript
import Fuse from 'fuse.js';
import searchIndex from '$lib/search-index.json';

const fuse = new Fuse(searchIndex.docs, {
	keys: ['title', 'description', 'content'],
	threshold: 0.3
});

const results = fuse.search(query);
```

## Theme System

### CSS Variables

The theme uses CSS custom properties for customization:

```css
:root {
	--color-primary: #3b82f6;
	--color-background: #ffffff;
	--color-text: #1f2937;
	--font-family-sans: system-ui, sans-serif;
	--font-family-mono: 'Fira Code', monospace;
}

.dark {
	--color-background: #0f172a;
	--color-text: #f1f5f9;
}
```

### Component Slots

Components provide slots for customization:

```svelte
<DocsLayout>
	<svelte:fragment slot="header">
		<!-- Custom header content -->
	</svelte:fragment>

	<svelte:fragment slot="sidebar-top">
		<!-- Custom sidebar header -->
	</svelte:fragment>

	{@render children()}
</DocsLayout>
```

## Build Process

### Development Mode

```
pnpm dev
  ↓
1. Vite starts dev server
2. SvelteKit processes routes
3. MDsveX preprocesses .md files
4. Content APIs load on-demand
5. HMR updates on file changes
```

### Production Build

```
pnpm build
  ↓
1. SvelteKit builds routes
2. MDsveX processes all .md files
3. Search index is generated
4. Static assets are optimized
5. Client code is minified
6. Output to /build directory
```

## Performance Optimizations

### Code Splitting

Each page is code-split automatically:

- Only load content for current page
- Lazy load images and heavy components
- Preload links on hover

### Static Generation

Static content is pre-rendered:

- Sidebar navigation computed at build time
- Search index built once
- Markdown processed during build

### Client-Side Caching

Loaded content is cached:

- SvelteKit caches loaded pages
- Search index loaded once
- Navigation state preserved

## Extension Points

Pterodactyl provides several ways to extend functionality:

### Custom Components

Create and use custom Svelte components in docs

### Custom Themes

Create themes by implementing the layout interface

### Plugins (Planned)

Future plugin system for extending core functionality

### MDsveX Plugins

Use remark/rehype plugins for advanced Markdown processing

## Next Steps

- Learn about [Content Organization](/docs/latest/concepts/content-organization)
- Understand [Navigation](/docs/latest/concepts/navigation)
- Explore [Search Configuration](/docs/latest/concepts/search)
