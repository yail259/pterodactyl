---
title: Content Authoring
description: Writing documentation with Markdown and MDsveX.
section: Guides
order: 3
---

# Content Authoring

Pterodactyl uses MDsveX to process your documentation, giving you the power of standard Markdown combined with Svelte components. This guide covers everything you need to know about writing and organizing your content.

## Markdown Basics

Pterodactyl supports all standard Markdown syntax through MDsveX:

### Headings

```markdown
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

Headings automatically appear in the table of contents (TOC) on the right side of the page.

### Text Formatting

```markdown
**Bold text**
_Italic text_
~~Strikethrough~~
`Inline code`
[Link text](https://example.com)
```

**Bold text**
_Italic text_
~~Strikethrough~~
`Inline code`
[Link text](https://example.com)

### Lists

**Unordered lists:**

```markdown
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3
```

**Ordered lists:**

```markdown
1. First item
2. Second item
3. Third item
```

### Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
```

> This is a blockquote.
> It can span multiple lines.

### Tables

```markdown
| Feature    | Supported | Notes             |
| ---------- | --------- | ----------------- |
| Search     | Yes       | Built-in          |
| Versioning | Yes       | Multiple versions |
| Themes     | Yes       | Customizable      |
```

| Feature    | Supported | Notes             |
| ---------- | --------- | ----------------- |
| Search     | Yes       | Built-in          |
| Versioning | Yes       | Multiple versions |
| Themes     | Yes       | Customizable      |

## Frontmatter

Every documentation page requires frontmatter at the top of the file. Frontmatter provides metadata used for navigation, SEO, and organization:

```markdown
---
title: My Page Title
description: A short description for search results and SEO.
section: Guides
order: 10
---
```

### Required Fields

- **`title`** (string): The page title shown in navigation and browser tabs
- **`section`** (string): The sidebar section this page belongs to

### Optional Fields

- **`description`** (string): Page description for SEO and search results
- **`order`** (number): Sort order within the section (lower numbers appear first)
- **`hidden`** (boolean): Hide the page from sidebar navigation
- **`keywords`** (string[]): Additional keywords for search indexing

### Example

```markdown
---
title: Advanced Configuration
description: Deep dive into configuration options for power users.
section: Guides
order: 20
keywords: [config, advanced, customization]
---

# Advanced Configuration

Your content here...
```

## Code Blocks

Syntax highlighting is powered by Shiki and works out of the box. Specify the language after the opening backticks:

````markdown
```typescript
interface User {
	name: string;
	email: string;
}

const user: User = {
	name: 'Alice',
	email: 'alice@example.com'
};
```
````

### Supported Languages

Pterodactyl supports syntax highlighting for 100+ languages including:

- JavaScript/TypeScript
- HTML/CSS/SCSS
- JSON/YAML/TOML
- Bash/Shell
- Python/Ruby/PHP
- Rust/Go/C++
- And many more...

### Line Highlighting

Highlight specific lines by adding line numbers after the language:

````markdown
```typescript {2,4-6}
function greet(name: string) {
	const message = `Hello, ${name}!`; // This line is highlighted

	return {
		message,
		timestamp: Date.now()
	};
}
```
````

### File Names

Add a file name to code blocks:

````markdown
```typescript title="src/lib/utils.ts"
export function formatDate(date: Date): string {
	return date.toISOString().split('T')[0];
}
```
````

### Line Numbers

Show line numbers in code blocks:

````markdown
```javascript showLineNumbers
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log(doubled);
```
````

## Using Svelte Components

One of Pterodactyl's most powerful features is the ability to use Svelte components directly in your Markdown:

```markdown
<script>
  import { Alert, Tabs, CodeBlock } from '$lib/components';
  import CustomComponent from '$lib/CustomComponent.svelte';
</script>

# My Documentation Page

<Alert type="info">
  This is an informational alert using a Svelte component!
</Alert>

<CustomComponent prop="value" />
```

### Built-in Components

Pterodactyl Theme Classic provides several built-in components:

#### Alert/Callout

```markdown
<Alert type="info">
  This is an informational message.
</Alert>

<Alert type="warning">
  This is a warning message.
</Alert>

<Alert type="danger">
  This is a danger/error message.
</Alert>

<Alert type="success">
  This is a success message.
</Alert>
```

#### Tabs

````markdown
<Tabs>
  <Tab label="npm">
    ```bash
    npm install my-package
    ```
  </Tab>
  <Tab label="pnpm">
    ```bash
    pnpm add my-package
    ```
  </Tab>
  <Tab label="yarn">
    ```bash
    yarn add my-package
    ```
  </Tab>
</Tabs>
````

### Creating Custom Components

You can create and use your own components. Create a component in `src/lib/components/`:

**`src/lib/components/ApiEndpoint.svelte`:**

```svelte
<script lang="ts">
	let { method, path, description } = $props();
</script>

<div class="api-endpoint">
	<code class="method {method.toLowerCase()}">{method}</code>
	<code class="path">{path}</code>
	<p>{description}</p>
</div>

<style>
	.api-endpoint {
		border: 1px solid var(--border-color);
		padding: 1rem;
		border-radius: 4px;
	}

	.method {
		font-weight: bold;
		margin-right: 0.5rem;
	}

	.method.get {
		color: #10b981;
	}
	.method.post {
		color: #3b82f6;
	}
	.method.delete {
		color: #ef4444;
	}
</style>
```

**Use it in your documentation:**

```markdown
<script>
  import ApiEndpoint from '$lib/components/ApiEndpoint.svelte';
</script>

# API Reference

<ApiEndpoint
  method="GET"
  path="/api/users"
  description="Fetch all users"
/>

<ApiEndpoint
  method="POST"
  path="/api/users"
  description="Create a new user"
/>
```

## Images and Assets

### Markdown Images

Use standard Markdown syntax for images:

```markdown
![Alt text](/images/screenshot.png)
![Alt text with title](/images/screenshot.png 'Screenshot title')
```

### Image Location

Store images in the `static` directory:

```
static/
└── images/
    ├── logo.png
    ├── screenshots/
    │   └── dashboard.png
    └── diagrams/
        └── architecture.svg
```

Reference them with absolute paths from the root:

```markdown
![Dashboard](/images/screenshots/dashboard.png)
```

### Svelte Image Component

For more control, use a Svelte component:

```markdown
<script>
  import Image from '$lib/components/Image.svelte';
</script>

<Image
  src="/images/screenshot.png"
  alt="Application screenshot"
  width={800}
  caption="The main dashboard view"
/>
```

## Links

### Internal Links

Link to other documentation pages using relative or absolute paths:

```markdown
See the [Configuration Guide](/docs/latest/guides/configuration) for more details.

Check out [Styling](./styling) in the same section.
```

### External Links

External links work as expected:

```markdown
Visit the [SvelteKit documentation](https://kit.svelte.dev) for more information.
```

External links automatically open in a new tab and include `rel="noopener noreferrer"`.

### Anchor Links

Link to specific headings on the same page:

```markdown
Jump to [Code Blocks](#code-blocks)
```

Heading IDs are automatically generated from the heading text.

## Admonitions

Use special syntax for callouts and admonitions:

```markdown
:::note
This is a note admonition.
:::

:::tip
This is a helpful tip!
:::

:::warning
This is a warning. Be careful!
:::

:::danger
This is dangerous. Proceed with caution!
:::

:::info
This is additional information.
:::
```

### With Titles

```markdown
:::warning Custom Warning Title
The content of the warning goes here.
You can use **Markdown** inside admonitions.
:::
```

## File Organization

Organize your content logically within `src/content/docs/`:

```
src/content/docs/
├── intro/
│   ├── what-is-pterodactyl.md
│   └── installation.md
├── guides/
│   ├── project-structure.md
│   ├── configuration.md
│   ├── content-authoring.md
│   └── styling.md
├── reference/
│   ├── cli.md
│   ├── configuration.md
│   └── frontmatter.md
└── advanced/
    ├── custom-themes.md
    ├── plugins.md
    └── deployment.md
```

### Naming Conventions

- Use lowercase file names
- Use hyphens (`-`) instead of spaces or underscores
- Make file names descriptive but concise
- Group related files in folders

### Index Pages

Create an `index.md` file in each folder to serve as the section landing page:

```
guides/
├── index.md          # Landing page for Guides
├── getting-started.md
├── configuration.md
└── deployment.md
```

## Best Practices

### Write Clear Headings

- Use descriptive, scannable headings
- Maintain proper heading hierarchy (don't skip levels)
- Keep headings concise

### Structure Your Content

- Start with an overview or introduction
- Use headings to create clear sections
- Include code examples for technical concepts
- Add a "Next Steps" section at the end

### Optimize for Search

- Include relevant keywords naturally
- Use descriptive frontmatter descriptions
- Add alt text to images
- Use clear, descriptive link text

### Code Examples

- Keep examples focused and minimal
- Include comments for complex code
- Show both simple and advanced examples
- Test your code examples

### Accessibility

- Use descriptive alt text for images
- Ensure sufficient color contrast
- Use semantic heading hierarchy
- Provide text alternatives for diagrams

## Next Steps

- Learn about [Project Structure](/docs/latest/guides/project-structure)
- Explore [Configuration Options](/docs/latest/guides/configuration)
- Customize your site with [Styling & Theming](/docs/latest/guides/styling)
