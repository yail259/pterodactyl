<script lang="ts">
	const features = [
		{
			icon: '⚡️',
			title: 'Lightning Fast',
			description:
				'Powered by Vite and SvelteKit for instant hot module replacement and optimized production builds.'
		},
		{
			icon: '🌀',
			title: 'Tri-Pane Layout',
			description:
				'Responsive sidebar, content area, and table of contents that work seamlessly together across all screen sizes.'
		},
		{
			icon: '🔎',
			title: 'Full-Text Search',
			description:
				'Keyboard-accessible search with fuzzy matching powered by Fuse.js. No backend services or API keys needed.'
		},
		{
			icon: '🧭',
			title: 'Auto Navigation',
			description:
				'Sidebar, breadcrumbs, and prev/next page navigation automatically generated from your content structure.'
		},
		{
			icon: '🎨',
			title: 'Built-in Theming',
			description:
				'Four theme presets, CSS variable customization, and dark mode support with a single config option.'
		},
		{
			icon: '📚',
			title: 'Version Management',
			description:
				'Multi-version documentation with a version switcher, aliases, and snapshot support out of the box.'
		},
		{
			icon: '📝',
			title: 'MDsveX Powered',
			description:
				'Write documentation in Markdown with full Svelte component support. Use interactive components inline.'
		},
		{
			icon: '💅',
			title: 'Syntax Highlighting',
			description:
				'Beautiful code blocks with Shiki integration, language detection, and tabbed code examples.'
		}
	];
</script>

<svelte:head>
	<title>Pterodactyl | Modern SvelteKit Documentation Engine</title>
	<meta
		name="description"
		content="A modern documentation engine for SvelteKit with tri-pane layout, instant search, and zero-config navigation."
	/>
</svelte:head>

<div class="page-wrapper">
	<main class="hero">
		<div class="hero-content">
			<h1>Modern Documentation for SvelteKit</h1>
			<p class="lede">
				Build beautiful, fast documentation sites with tri-pane layout, instant search, and
				auto-generated navigation. Powered by SvelteKit and Vite.
			</p>
			<div class="actions">
				<a class="btn btn-primary" href="/docs/latest">Get Started</a>
				<a
					class="btn btn-secondary"
					href="https://github.com/yao-pterodactyl"
					target="_blank"
					rel="noopener noreferrer"
				>
					View on GitHub
				</a>
			</div>
		</div>
	</main>

	<section class="features">
		<div class="container">
			<h2>Everything you need</h2>
			<div class="feature-grid">
				{#each features as feature}
					<article class="card">
						<span class="feature-icon" aria-hidden="true">{feature.icon}</span>
						<h3>{feature.title}</h3>
						<p>{feature.description}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="quick-start">
		<div class="container">
			<h2>Quick Start</h2>
			<p class="section-intro">Get started in three simple steps:</p>
			<div class="code-steps">
				<div class="code-step">
					<span class="step-number">1</span>
					<code>pnpm add -D ptero mdsvex</code>
				</div>
				<div class="code-step">
					<span class="step-number">2</span>
					<code>pnpm ptero init</code>
				</div>
				<div class="code-step">
					<span class="step-number">3</span>
					<code>pnpm dev</code>
				</div>
			</div>
			<p class="note">
				Visit <code>localhost:5173/docs/latest</code> to see your documentation site with search, theming,
				and navigation fully configured.
			</p>
		</div>
	</section>

	<section class="cta">
		<div class="container">
			<h2>Ready to get started?</h2>
			<p>Build beautiful documentation for your SvelteKit projects.</p>
			<a class="btn btn-primary" href="/docs/latest">Read the Documentation →</a>
		</div>
	</section>
</div>

<style>
	.page-wrapper {
		min-height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
	}

	/* Hero Section */
	.hero {
		max-width: 1200px;
		margin: 0 auto;
		padding: clamp(3rem, 8vw, 6rem) var(--spacing-lg) clamp(4rem, 10vw, 8rem);
		text-align: center;
	}

	.hero-content {
		max-width: 720px;
		margin: 0 auto;
	}

	.hero h1 {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 700;
		margin: 0 0 var(--spacing-lg);
		color: var(--foreground);
		line-height: 1.1;
	}

	.lede {
		font-size: clamp(1.125rem, 2vw, 1.25rem);
		line-height: 1.6;
		color: var(--color-gray);
		margin: 0 0 var(--spacing-xl);
	}

	.actions {
		display: flex;
		gap: var(--spacing-md);
		justify-content: center;
		flex-wrap: wrap;
	}

	/* Features Section */
	.features {
		background: var(--background-secondary);
		padding: clamp(3rem, 8vw, 5rem) var(--spacing-lg);
	}

	.features h2 {
		text-align: center;
		font-size: clamp(2rem, 4vw, 2.5rem);
		margin: 0 0 var(--spacing-2xl);
		color: var(--foreground);
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-lg);
	}

	.feature-icon {
		font-size: 2.5rem;
		display: block;
		margin-bottom: var(--spacing-md);
	}

	.card h3 {
		margin: 0 0 var(--spacing-sm);
		color: var(--foreground);
		font-size: 1.25rem;
		font-weight: 600;
	}

	.card p {
		margin: 0;
		color: var(--color-gray);
		line-height: 1.6;
	}

	/* Quick Start Section */
	.quick-start {
		padding: clamp(3rem, 8vw, 5rem) var(--spacing-lg);
	}

	.quick-start h2 {
		text-align: center;
		font-size: clamp(2rem, 4vw, 2.5rem);
		margin: 0 0 var(--spacing-md);
		color: var(--foreground);
	}

	.section-intro {
		text-align: center;
		font-size: 1.125rem;
		color: var(--color-gray);
		margin: 0 0 var(--spacing-xl);
	}

	.code-steps {
		max-width: 600px;
		margin: 0 auto var(--spacing-xl);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.code-step {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-sm) 0;
		border-bottom: 1px solid var(--border-color);
	}

	.step-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--background-secondary);
		color: var(--foreground);
		font-weight: 600;
		font-size: 0.875rem;
		flex-shrink: 0;
	}

	.code-step code {
		font-family: var(--font-family-mono);
		font-size: 0.9375rem;
		color: var(--foreground);
	}

	.note {
		text-align: center;
		color: var(--color-gray);
		line-height: 1.6;
		max-width: 600px;
		margin: 0 auto;
	}

	.note code {
		font-family: var(--font-family-mono);
		background: var(--background-secondary);
		padding: 2px 6px;
		border-radius: 3px;
		font-size: 0.875rem;
	}

	/* CTA Section */
	.cta {
		background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(37, 99, 235, 0.04));
		padding: clamp(3rem, 8vw, 5rem) var(--spacing-lg);
		text-align: center;
	}

	.cta h2 {
		font-size: clamp(2rem, 4vw, 2.5rem);
		margin: 0 0 var(--spacing-md);
		color: var(--foreground);
	}

	.cta p {
		font-size: 1.125rem;
		color: var(--color-gray);
		margin: 0 0 var(--spacing-xl);
	}

	/* Responsive */
	@media (max-width: 640px) {
		.actions {
			flex-direction: column;
			align-items: stretch;
		}

		.code-step {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-sm);
		}
	}
</style>
