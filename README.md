# Pterodactyl

A modern documentation engine for SvelteKit -- fast, flexible, and feature-complete.

## Features

- **Lightning Fast** -- Instant HMR and optimized production builds powered by SvelteKit + Vite
- **MDsveX Integration** -- Write docs in Markdown with full Svelte component support
- **Built-in Theming** -- 4 theme presets (default, supabase, github, minimal), CSS variable customization, and dark mode
- **Full-Text Search** -- Client-side fuzzy search with Fuse.js, no backend required
- **Version Management** -- Multi-version documentation with version switcher, aliases, and snapshots
- **Auto-Generated Navigation** -- Sidebar, breadcrumbs, and prev/next page links from your content structure
- **Syntax Highlighting** -- Beautiful code blocks with Shiki integration and tabbed code examples
- **CLI Tooling** -- Scaffold projects, add components shadcn-style, build search indexes, and manage versions
- **Tri-Pane Layout** -- Responsive sidebar, content area, and table of contents out of the box
- **Simple Configuration** -- Single TypeScript config file with sensible defaults

## Quick Start

Install Pterodactyl into an existing SvelteKit project:

```bash
# Add the CLI and mdsvex
pnpm add -D ptero mdsvex

# Run the installer (idempotent)
pnpm ptero init

# Start your dev server
pnpm dev
```

Starting from scratch? Create a SvelteKit app first:

```bash
pnpm dlx create-svelte@latest my-docs
cd my-docs
pnpm add -D ptero mdsvex
pnpm ptero init
pnpm dev
```

Your docs will be available at `http://localhost:5173/docs/latest`.

## Installation

If you prefer manual setup, install mdsvex and wire up SvelteKit yourself. The Pterodactyl core ships in `$lib/pterodactyl`, so there's no separate core package to install.

```bash
pnpm add -D mdsvex
```

### Add components (shadcn-style)

```bash
pnpm ptero add sidebar
pnpm ptero add code-block
```

Components are copied into your project so you have full control to customize them.

### Configuration

Create `pterodactyl.config.ts`:

```typescript
import type { PterodactylConfig } from 'pterodactyl-core';

export default {
	site: {
		title: 'My Documentation',
		description: 'Comprehensive docs for my project',
		url: 'https://docs.example.com'
	},
	versions: {
		current: 'latest',
		available: [{ id: 'latest', label: 'Latest', status: 'latest' }]
	},
	theme: {
		// Use a preset theme
		preset: 'supabase', // 'default' | 'supabase' | 'github' | 'minimal'

		// Or customize with CSS variables
		cssVars: {
			'--color-primary': '#3ECF8E',
			'--font-family-base': "'Inter Variable', sans-serif"
		}
	},
	search: {
		enabled: true,
		placeholder: 'Search docs...',
		hotkeys: ['ctrl+k', 'cmd+k']
	}
} satisfies PterodactylConfig;
```

### Content Structure

Create docs in `src/content/docs/`:

```markdown
---
title: Getting Started
description: Learn the basics
section: getting-started
order: 1
---

# Getting Started

Your documentation content here...
```

## CLI Reference

The `ptero` CLI provides four commands:

| Command                     | Description                                                |
| --------------------------- | ---------------------------------------------------------- |
| `ptero init`                | Initialize Pterodactyl in an existing SvelteKit project    |
| `ptero add <component>`     | Copy a prebuilt component into your project (shadcn-style) |
| `ptero version create <id>` | Create a versioned snapshot of your documentation          |
| `ptero search build`        | Generate the Fuse.js search index from your markdown files |

## Theming

Four built-in presets with dark mode support:

| Preset     | Description                        |
| ---------- | ---------------------------------- |
| `default`  | Pterodactyl blue accents           |
| `supabase` | Green accents inspired by Supabase |
| `github`   | Minimal blue inspired by GitHub    |
| `minimal`  | Clean, subtle gray tones           |

Customize any of the 40+ CSS variables (`--color-primary`, `--font-family-base`, `--spacing-*`, etc.) or combine a preset with overrides.

## Search

Full-text search powered by Fuse.js:

- Search index built at compile time, no backend required
- Fuzzy matching for better results
- Version-aware search capabilities
- Keyboard accessible (Cmd+K / Ctrl+K)

## Versioning

Support multiple documentation versions:

```typescript
// pterodactyl.config.ts
export default {
	versions: {
		current: 'v1.0',
		available: [
			{ id: 'v1.0', label: 'v1.0', status: 'latest' },
			{ id: 'v0.9', label: 'v0.9', status: 'legacy' },
			{ id: 'v2.0', label: 'v2.0-beta', status: 'next' }
		],
		aliases: {
			latest: 'v1.0',
			next: 'v2.0'
		}
	}
};
```

## Components

Pterodactyl ships 17 Svelte 5 components across four categories:

**Layout**: DocsLayout, Header, TOC, ThemeToggle, PresetSelector
**Navigation**: Sidebar, Breadcrumbs, VersionSelector, PrevNext
**Content**: CodeBlock, CodeTabs, Callout, LiveExample, PackageBadge
**Search**: SearchBar, SearchModal, SearchResult

## Project Structure

```
pterodactyl/
├── src/
│   ├── lib/pterodactyl/core/      # Core engine (config, content, nav, search, themes, mdsvex, vite plugin)
│   ├── lib/components/pterodactyl/ # 17 prebuilt Svelte 5 UI components
│   ├── routes/                     # Demo site routes (landing page + docs)
│   └── content/docs/               # Sample documentation content
├── packages/
│   └── ptero/                      # CLI package (init, add, version, search)
├── pterodactyl.config.ts           # Demo site configuration
├── svelte.config.js                # SvelteKit + mdsvex config
└── vite.config.ts                  # Vite config with Pterodactyl plugin
```

## Development

```bash
# Clone the repo
git clone https://github.com/user/pterodactyl.git
cd pterodactyl

# Install dependencies
pnpm install

# Run the demo site
pnpm dev

# Type check
pnpm check

# Lint and format
pnpm lint
pnpm format

# Build for production
pnpm build
```

## Roadmap

### v0.1 (Current)

- Core engine with content loading, navigation, and routing
- 17 UI components with Svelte 5 runes
- Full-text search with Fuse.js
- Version management with aliases
- MDsveX integration with Shiki syntax highlighting
- CLI installer with init, add, version, and search commands
- CSS variable theming with 4 presets and dark mode

### v1.0 (Future)

- Plugin system
- i18n support
- Algolia integration
- Advanced customization hooks

## Acknowledgments

Pterodactyl is inspired by and extracts patterns from:

- [Docusaurus](https://docusaurus.io/)
- [Martini Kit Docs](https://github.com/BlueprintLabIO/martini-kit)
- [VitePress](https://vitepress.dev/)
- [Starlight](https://starlight.astro.build/)
