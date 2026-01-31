---
title: Installation
description: Get Pterodactyl up and running in minutes.
section: Introduction
order: 2
---

# Installation

This guide will help you install and set up Pterodactyl in your project. Choose the installation method that best fits your workflow.

## Prerequisites

Before installing Pterodactyl, make sure you have:

- **Node.js** version 18.0 or above
- **pnpm**, **npm**, or **yarn** package manager
- A **SvelteKit** project (or willingness to create one)

## Quick Start

The fastest way to get started is using the Pterodactyl CLI in an existing SvelteKit project:

```bash
# Install Pterodactyl packages
pnpm add -D pterodactyl-cli mdsvex

# Run the initialization command
pnpm pterodactyl init

# Start your development server
pnpm dev
```

Visit `http://localhost:5173/docs/latest` to see your documentation site.

:::note
The `pterodactyl init` command is idempotent - you can run it multiple times safely. It will only add missing files and configurations.
:::

### Starting from Scratch

If you don't have a SvelteKit project yet:

```bash
# Create a new SvelteKit project
pnpm create svelte@latest my-docs
cd my-docs

# Install dependencies
pnpm install

# Add Pterodactyl
pnpm add -D pterodactyl-cli mdsvex
pnpm pterodactyl init

# Start developing
pnpm dev
```

## What Gets Installed

When you run `pterodactyl init`, the CLI will:

1. **Install docs packages** (if not already present):
   - `mdsvex` - Markdown processing with Svelte support
   - UI components added via `pterodactyl add <component>`

2. **Create configuration files**:
   - `pterodactyl.config.ts` - Main configuration file
   - Updates to `svelte.config.js` for MDsveX integration

3. **Scaffold directory structure**:

   ```
   src/
   ├── content/
   │   └── docs/              # Your markdown files go here
   │       ├── intro/
   │       │   └── index.md
   │       └── guides/
   │           └── getting-started.md
   ├── routes/
   │   └── docs/
   │       ├── [version]/
   │       │   ├── +layout.svelte
   │       │   ├── +layout.server.ts
   │       │   ├── +page.svelte
   │       │   └── [...slug]/
   │       │       ├── +page.svelte
   │       │       └── +page.server.ts
   ```

4. **Add example content**:
   - Sample markdown files to help you get started
   - Frontmatter examples
   - Basic navigation structure

## Manual Installation

If you prefer more control over the installation process:

### Step 1: Install Dependencies

```bash
pnpm add -D mdsvex
```

### Step 2: Configure MDsveX

Update your `svelte.config.js`:

```javascript
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				docs: './src/lib/layouts/DocsLayout.svelte'
			}
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
```

### Step 3: Create Configuration

Create `pterodactyl.config.ts` in your project root:

```typescript
import type { PterodactylConfig } from 'pterodactyl-core';

const config: PterodactylConfig = {
	site: {
		title: 'My Documentation',
		description: 'Comprehensive documentation for my project',
		url: 'https://docs.example.com'
	},
	versions: {
		current: 'latest',
		available: [{ id: 'latest', label: 'Latest', status: 'latest' }]
	},
	sidebar: {
		sections: [
			{
				title: 'Introduction',
				items: [{ title: 'Getting Started', slug: 'intro/getting-started' }]
			}
		]
	}
};

export default config;
```

### Step 4: Set Up Routes

Create the following route structure:

**`src/routes/docs/[version]/+layout.server.ts`:**

```typescript
import { loadSidebar, loadConfig } from 'pterodactyl-core';

export async function load({ params }) {
	const config = await loadConfig();
	const sidebar = await loadSidebar(params.version);

	return {
		sidebar,
		config,
		version: params.version
	};
}
```

**`src/routes/docs/[version]/+layout.svelte`:**

```svelte
<script lang="ts">
	let { children, data } = $props();
</script>

<DocsLayout sidebar={data.sidebar} currentVersion={data.version}>
	{@render children()}
</DocsLayout>
```

**`src/routes/docs/[version]/[...slug]/+page.server.ts`:**

```typescript
import { loadDoc } from 'pterodactyl-core';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const doc = await loadDoc(params.version, params.slug);

	if (!doc) {
		throw error(404, 'Page not found');
	}

	return { doc };
}
```

**`src/routes/docs/[version]/[...slug]/+page.svelte`:**

```svelte
<script lang="ts">
	let { data } = $props();
</script>

<svelte:component this={data.doc.component} />
```

### Step 5: Create Content

Create your first documentation file at `src/content/docs/intro/getting-started.md`:

```markdown
---
title: Getting Started
description: Learn the basics
section: Introduction
order: 1
---

# Getting Started

Welcome to your documentation!
```

## Add components (optional)

Use the CLI to pull in prebuilt UI components (shadcn-style):

```bash
pnpm pterodactyl add avatar
```

## Package Managers

Pterodactyl works with all major package managers:

### pnpm (Recommended)

```bash
pnpm add -D pterodactyl-cli mdsvex
pnpm pterodactyl init
```

### npm

```bash
npm install --save-dev pterodactyl-cli mdsvex
npm exec pterodactyl init
```

### yarn

```bash
yarn add -D pterodactyl-cli mdsvex
yarn pterodactyl init
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, you can specify a different port:

```bash
pnpm dev -- --port 3000
```

### MDsveX Not Processing Files

Make sure your `svelte.config.js` includes `.md` in the extensions array and has mdsvex in the preprocess chain.

### TypeScript Errors in Config

Ensure you have the correct types installed:

```bash
pnpm add -D @types/node
```

### Build Errors

If you encounter build errors, try clearing the `.svelte-kit` directory:

```bash
rm -rf .svelte-kit
pnpm dev
```

## Next Steps

Now that you have Pterodactyl installed:

- [Understand the Project Structure](/docs/latest/guides/project-structure)
- [Configure Your Site](/docs/latest/guides/configuration)
- [Start Writing Content](/docs/latest/guides/content-authoring)
- [Customize the Theme](/docs/latest/guides/styling)

## Upgrading

To upgrade to the latest version of Pterodactyl:

```bash
pnpm update pterodactyl-cli
```

Check the [changelog](https://github.com/your-username/pterodactyl/releases) for breaking changes before upgrading major versions.
