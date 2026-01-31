---
title: Configuration Reference
description: Complete API reference for pterodactyl.config.ts.
section: Reference
order: 2
---

# Configuration Reference

This reference documents all available configuration options for `pterodactyl.config.ts`. The configuration file uses TypeScript for type safety and IDE autocomplete.

## Configuration File

Create `pterodactyl.config.ts` in your project root:

```typescript
import type { PterodactylConfig } from 'pterodactyl-core';

const config: PterodactylConfig = {
	// Your configuration here
};

export default config;
```

## Top-Level Options

### `site`

**Type:** `SiteConfig`
**Required:** Yes

Global site settings and metadata.

```typescript
site: {
  title: 'My Documentation',
  description: 'Comprehensive documentation for my project',
  url: 'https://docs.example.com',
  logo: '/logo.svg',
  favicon: '/favicon.ico',
  social: {
    github: 'https://github.com/username/repo',
    twitter: 'https://twitter.com/username'
  }
}
```

#### `site.title`

**Type:** `string`
**Required:** Yes

The title of your documentation site. Appears in the browser tab, header, and meta tags.

```typescript
title: 'Pterodactyl Documentation';
```

#### `site.description`

**Type:** `string`
**Required:** No

A short description of your documentation site for SEO and social media sharing.

```typescript
description: 'Modern documentation engine for SvelteKit';
```

#### `site.url`

**Type:** `string`
**Required:** Yes

The canonical URL where your documentation is hosted. Used for generating absolute URLs in sitemaps and social meta tags.

```typescript
url: 'https://docs.example.com';
```

#### `site.baseUrl`

**Type:** `string`
**Default:** `'/'`

The base path for your documentation if hosted in a subdirectory.

```typescript
baseUrl: '/docs'; // Site accessible at example.com/docs
```

#### `site.logo`

**Type:** `string`
**Required:** No

Path to your site logo, relative to the `static` directory.

```typescript
logo: '/images/logo.svg';
```

#### `site.favicon`

**Type:** `string`
**Default:** `'/favicon.ico'`

Path to your favicon.

```typescript
favicon: '/favicon.ico';
```

#### `site.social`

**Type:** `SocialLinks`
**Required:** No

Social media and repository links displayed in the header/footer.

```typescript
social: {
  github: 'https://github.com/username/repo',
  twitter: 'https://twitter.com/username',
  discord: 'https://discord.gg/invite',
  linkedin: 'https://linkedin.com/company/name'
}
```

### `versions`

**Type:** `VersionConfig`
**Required:** Yes

Configuration for documentation versioning.

```typescript
versions: {
  current: 'v2.0',
  available: [
    { id: 'v2.0', label: 'v2.0', status: 'latest' },
    { id: 'v1.5', label: 'v1.5', status: 'stable' },
    { id: 'v1.0', label: 'v1.0', status: 'legacy' },
    { id: 'v3.0', label: 'v3.0-beta', status: 'next' }
  ],
  aliases: {
    latest: 'v2.0',
    stable: 'v1.5',
    next: 'v3.0'
  }
}
```

#### `versions.current`

**Type:** `string`
**Required:** Yes

The current/default version. Users are redirected here when visiting `/docs`.

```typescript
current: 'latest';
```

#### `versions.available`

**Type:** `Version[]`
**Required:** Yes

Array of all available documentation versions.

```typescript
available: [
	{
		id: 'v2.0', // Version identifier (folder name)
		label: 'v2.0', // Display label
		status: 'latest' // Badge: latest, stable, legacy, next
	}
];
```

**Status options:**

- `'latest'` - Current recommended version
- `'stable'` - Stable production version
- `'legacy'` - Older, maintained version
- `'next'` - Beta/preview version

#### `versions.aliases`

**Type:** `Record<string, string>`
**Required:** No

URL-friendly aliases that map to version IDs.

```typescript
aliases: {
  latest: 'v2.0',    // /docs/latest → /docs/v2.0
  next: 'v3.0'       // /docs/next → /docs/v3.0
}
```

### `sidebar`

**Type:** `SidebarConfig`
**Required:** No

Configuration for sidebar navigation. If omitted, sidebar is auto-generated from content structure.

```typescript
sidebar: {
	sections: [
		{
			title: 'Introduction',
			items: [
				{ title: 'What is Pterodactyl?', slug: 'intro/what-is-pterodactyl' },
				{ title: 'Installation', slug: 'intro/installation' }
			]
		},
		{
			title: 'Guides',
			items: [
				{ title: 'Configuration', slug: 'guides/configuration' },
				{ title: 'Content Authoring', slug: 'guides/content-authoring' }
			]
		}
	];
}
```

#### `sidebar.sections`

**Type:** `SidebarSection[]`
**Required:** No

Explicit sidebar structure. Each section can contain pages or nested sections.

```typescript
sections: [
	{
		title: 'Getting Started',
		collapsed: false,
		items: [
			{ title: 'Introduction', slug: 'intro' },
			{
				title: 'Installation',
				slug: 'installation',
				items: [
					// Nested items
					{ title: 'Quick Start', slug: 'installation/quick-start' },
					{ title: 'Manual Setup', slug: 'installation/manual' }
				]
			}
		]
	}
];
```

**SidebarSection fields:**

- `title` (string, required) - Section heading
- `collapsed` (boolean, optional) - Initially collapsed state
- `items` (SidebarItem[], required) - Pages in this section

**SidebarItem fields:**

- `title` (string, required) - Link text
- `slug` (string, required) - Page path (without version prefix)
- `items` (SidebarItem[], optional) - Nested items
- `badge` (string, optional) - Badge text (e.g., "New", "Beta")

### `theme`

**Type:** `ThemeConfig`
**Required:** No

Theme customization options.

```typescript
theme: {
  primary: '#3b82f6',
  dark: {
    primary: '#60a5fa'
  },
  font: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'Fira Code, monospace'
  },
  darkMode: 'class',
  defaultMode: 'light'
}
```

#### `theme.primary`

**Type:** `string`
**Default:** `'#3b82f6'`

Primary brand color for light mode.

```typescript
primary: '#ff3e00'; // Svelte orange
```

#### `theme.dark`

**Type:** `Partial<ThemeColors>`
**Required:** No

Color overrides for dark mode.

```typescript
dark: {
  primary: '#ff6b35',
  background: '#0a0a0a',
  text: '#f5f5f5'
}
```

#### `theme.font`

**Type:** `FontConfig`
**Required:** No

Font family configuration.

```typescript
font: {
  sans: 'Inter, -apple-system, system-ui, sans-serif',
  mono: '"Fira Code", "JetBrains Mono", monospace'
}
```

#### `theme.darkMode`

**Type:** `'class' | 'media'`
**Default:** `'class'`

Dark mode strategy:

- `'class'` - Manual toggle with class on `<html>`
- `'media'` - Respect OS preference only

```typescript
darkMode: 'class';
```

#### `theme.defaultMode`

**Type:** `'light' | 'dark' | 'system'`
**Default:** `'system'`

Default color mode on first visit.

```typescript
defaultMode: 'dark';
```

### `search`

**Type:** `SearchConfig`
**Required:** No

Search functionality configuration.

```typescript
search: {
  enabled: true,
  placeholder: 'Search documentation...',
  hotkey: 'k',
  resultsLimit: 20,
  fuzzyThreshold: 0.3,
  indexFields: ['title', 'description', 'content', 'headings']
}
```

#### `search.enabled`

**Type:** `boolean`
**Default:** `true`

Enable or disable search functionality.

```typescript
enabled: true;
```

#### `search.placeholder`

**Type:** `string`
**Default:** `'Search documentation...'`

Placeholder text in search input.

```typescript
placeholder: 'Search docs (⌘K)';
```

#### `search.hotkey`

**Type:** `string`
**Default:** `'k'`

Keyboard shortcut key (used with Cmd/Ctrl).

```typescript
hotkey: 'k'; // Cmd+K / Ctrl+K
```

#### `search.resultsLimit`

**Type:** `number`
**Default:** `20`

Maximum number of search results to display.

```typescript
resultsLimit: 10;
```

#### `search.fuzzyThreshold`

**Type:** `number` (0-1)
**Default:** `0.3`

Fuse.js fuzzy matching threshold. Lower = stricter matches.

```typescript
fuzzyThreshold: 0.2; // More strict
```

#### `search.indexFields`

**Type:** `string[]`
**Default:** `['title', 'description', 'content']`

Fields to include in search index.

```typescript
indexFields: ['title', 'description', 'content', 'headings', 'keywords'];
```

### `navigation`

**Type:** `NavigationConfig`
**Required:** No

Additional navigation configuration.

```typescript
navigation: {
  breadcrumbs: true,
  prevNext: true,
  editLink: {
    pattern: 'https://github.com/user/repo/edit/main/src/content/docs/{slug}.md',
    text: 'Edit this page'
  },
  feedback: {
    enabled: true,
    helpful: 'Was this page helpful?',
    yes: 'Yes',
    no: 'No'
  }
}
```

#### `navigation.breadcrumbs`

**Type:** `boolean`
**Default:** `true`

Show breadcrumb navigation.

```typescript
breadcrumbs: true;
```

#### `navigation.prevNext`

**Type:** `boolean`
**Default:** `true`

Show previous/next page navigation at the bottom.

```typescript
prevNext: true;
```

#### `navigation.editLink`

**Type:** `EditLinkConfig`
**Required:** No

Configuration for "Edit this page" links.

```typescript
editLink: {
  pattern: 'https://github.com/user/repo/edit/main/src/content/docs/{slug}.md',
  text: 'Edit this page on GitHub'
}
```

The `{slug}` placeholder is replaced with the page path.

#### `navigation.feedback`

**Type:** `FeedbackConfig`
**Required:** No

Page feedback widget configuration.

```typescript
feedback: {
  enabled: true,
  helpful: 'Was this helpful?',
  yes: 'Yes',
  no: 'No',
  onFeedback: (helpful, page) => {
    // Track feedback
    analytics.track('page_feedback', { helpful, page });
  }
}
```

### `metadata`

**Type:** `MetadataConfig`
**Required:** No

SEO and social media metadata.

```typescript
metadata: {
  openGraph: {
    type: 'website',
    siteName: 'My Docs',
    image: '/og-image.png'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@username',
    creator: '@username'
  }
}
```

## Complete Example

```typescript
import type { PterodactylConfig } from 'pterodactyl-core';

const config: PterodactylConfig = {
	site: {
		title: 'Pterodactyl Documentation',
		description: 'Modern documentation engine for SvelteKit',
		url: 'https://pterodactyl.dev',
		logo: '/logo.svg',
		social: {
			github: 'https://github.com/username/pterodactyl'
		}
	},

	versions: {
		current: 'latest',
		available: [{ id: 'v1.0', label: 'v1.0', status: 'latest' }]
	},

	sidebar: {
		sections: [
			{
				title: 'Introduction',
				items: [
					{ title: 'What is Pterodactyl?', slug: 'intro/what-is-pterodactyl' },
					{ title: 'Installation', slug: 'intro/installation' }
				]
			}
		]
	},

	theme: {
		primary: '#3b82f6',
		font: {
			sans: 'Inter, sans-serif',
			mono: 'Fira Code, monospace'
		}
	},

	search: {
		enabled: true,
		resultsLimit: 20
	},

	navigation: {
		editLink: {
			pattern: 'https://github.com/user/repo/edit/main/src/content/docs/{slug}.md'
		}
	}
};

export default config;
```

## TypeScript Types

Import types for autocomplete and validation:

```typescript
import type {
	PterodactylConfig,
	SiteConfig,
	VersionConfig,
	SidebarConfig,
	ThemeConfig,
	SearchConfig
} from 'pterodactyl-core';
```

## Validation

Configuration is validated at build time using Zod schemas. Invalid configuration will produce helpful error messages pointing to the issue.

## Next Steps

- Explore [Frontmatter Reference](/docs/latest/reference/frontmatter)
- Learn about [CLI Commands](/docs/latest/reference/cli)
- See [Theme Customization](/docs/latest/guides/styling)
