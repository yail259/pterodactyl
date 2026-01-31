<script lang="ts">
	import Breadcrumbs from '$lib/components/pterodactyl/Navigation/Breadcrumbs.svelte';
	import PrevNext from '$lib/components/pterodactyl/Navigation/PrevNext.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.doc.frontmatter.title} | {data.siteTitle}</title>
	{#if data.doc.frontmatter.description}
		<meta name="description" content={data.doc.frontmatter.description} />
	{/if}
</svelte:head>

<Breadcrumbs items={data.breadcrumbs} />

<article class="doc-content">
	<data.doc.component />
</article>

<PrevNext prev={data.prevNext.prev} next={data.prevNext.next} />

<style>
	.doc-content {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 780px;
		width: 100%;
		margin: 0 auto;
		line-height: 1.75;
	}

	.doc-content :global(h1) {
		font-size: clamp(2.25rem, 3.5vw, 3rem);
		margin: 0 0 0.5rem 0;
		color: var(--ptero-color-text, #0f172a);
		line-height: 1.15;
		font-weight: 800;
		letter-spacing: -0.02em;
		scroll-margin-top: calc(var(--site-nav-height, 0px) + var(--docs-header-height, 68px) + 2rem);
	}

	.doc-content :global(h2) {
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		margin: 0.75rem 0 0.25rem;
		color: var(--ptero-color-text, #0f172a);
		line-height: 1.2;
		font-weight: 700;
		letter-spacing: -0.01em;
		padding-bottom: 0;
		scroll-margin-top: calc(var(--site-nav-height, 0px) + var(--docs-header-height, 68px) + 2rem);
	}

	.doc-content :global(h3) {
		font-size: clamp(1.25rem, 1.8vw, 1.5rem);
		margin: 0.5rem 0 0.25rem;
		color: var(--ptero-color-text, #0f172a);
		line-height: 1.3;
		font-weight: 600;
		scroll-margin-top: calc(var(--site-nav-height, 0px) + var(--docs-header-height, 68px) + 2rem);
	}

	.doc-content :global(h4),
	.doc-content :global(h5),
	.doc-content :global(h6) {
		margin: 0.5rem 0 0.25rem;
		color: var(--ptero-color-text, #0f172a);
		font-weight: 600;
		line-height: 1.4;
		scroll-margin-top: calc(var(--site-nav-height, 0px) + var(--docs-header-height, 68px) + 2rem);
	}

	.doc-content :global(p) {
		color: var(--ptero-color-text-secondary, #475569);
		line-height: 1.8;
		margin: 0 0 0.5rem 0;
		font-size: 1.0625rem;
	}

	.doc-content :global(p:last-child) {
		margin-bottom: 0;
	}

	.doc-content :global(a) {
		color: var(--ptero-color-primary, #6366f1);
		text-decoration: none;
		border-bottom: 1px solid rgba(99, 102, 241, 0.3);
		transition:
			color 0.2s ease,
			border-color 0.2s ease;
		font-weight: 500;
	}

	.doc-content :global(a:hover) {
		color: var(--ptero-color-accent, #14b8a6);
		border-color: rgba(20, 184, 166, 0.5);
	}

	.doc-content :global(a:focus-visible) {
		outline: 2px solid var(--ptero-color-primary, #6366f1);
		outline-offset: 3px;
		border-radius: 2px;
	}

	.doc-content :global(code) {
		background: rgba(99, 102, 241, 0.12);
		color: var(--ptero-color-text, #0f172a);
		padding: 0.2rem 0.4rem;
		border-radius: 0.35rem;
		font-size: 0.9em;
		font-family: 'JetBrains Mono', 'SFMono-Regular', Menlo, monospace;
		font-weight: 500;
		border: 1px solid rgba(99, 102, 241, 0.2);
	}

	.doc-content :global(pre) {
		position: relative; /* Ensure relative positioning for copy button */
		background: #0f172a;
		color: #e2e8f0;
		padding: 1rem 1.25rem;
		border-radius: 0.5rem;
		border: 1px solid rgba(99, 102, 241, 0.35);
		box-shadow:
			0 15px 35px rgba(15, 23, 42, 0.35),
			0 5px 15px rgba(99, 102, 241, 0.2);
		overflow: auto;
		max-width: 100%;
		font-size: 0.95rem;
		line-height: 1.65;
		margin: 0.75rem 0;
	}

	.doc-content :global(.rehype-pretty-copy) {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.375rem;
		background-color: rgba(40, 44, 52, 0.8);
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'%3E%3C/path%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: center;
		background-size: 1.25rem;
		padding: 0.25rem;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		opacity: 1;
		z-index: 100;
		backdrop-filter: blur(4px);
		transition: all 0.2s ease;
	}

	.doc-content :global(.rehype-pretty-copy:hover) {
		background-color: rgba(40, 44, 52, 1);
		border-color: rgba(255, 255, 255, 0.4);
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.doc-content :global(.rehype-pretty-copy.rehype-pretty-copied) {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgb(52, 211, 153)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
		border-color: rgba(52, 211, 153, 0.4);
	}

	.doc-content :global(.rehype-pretty-copy svg) {
		display: none; /* Hide any existing SVG if it appears to avoid double icons */
	}

	.doc-content :global(pre code) {
		background: transparent;
		color: inherit;
		padding: 0;
		border-radius: 0;
		font-size: inherit;
		border: none;
	}

	.doc-content :global(blockquote) {
		margin: 0.75rem 0;
		padding: 0.75rem 1rem;
		background: rgba(20, 184, 166, 0.08);
		border-left: 4px solid var(--ptero-color-accent, #14b8a6);
		border-radius: 0.5rem;
		color: var(--ptero-color-text-secondary, #475569);
		font-style: italic;
	}

	.doc-content :global(blockquote p) {
		margin: 0;
	}

	.doc-content :global(ul),
	.doc-content :global(ol) {
		padding-left: 1.5rem;
		margin: 0 0 0.75rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.doc-content :global(li) {
		color: var(--ptero-color-text-secondary, #475569);
		line-height: 1.8;
		padding-left: 0.35rem;
	}

	.doc-content :global(li strong) {
		color: var(--ptero-color-text, #0f172a);
		font-weight: 600;
	}

	.doc-content :global(ul ul),
	.doc-content :global(ol ol),
	.doc-content :global(ul ol),
	.doc-content :global(ol ul) {
		margin-top: 0.35rem;
		margin-bottom: 0;
	}

	.doc-content :global(hr) {
		height: 1px;
		border: 0;
		background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), transparent);
		margin: 0.75rem 0;
	}

	.doc-content :global(table) {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		border: 1px solid var(--ptero-color-border, #e2e8f0);
		border-radius: 0.5rem;
		overflow: hidden;
		background: var(--ptero-color-bg-secondary, #ffffff);
		box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
		margin: 0.75rem 0;
	}

	.doc-content :global(thead) {
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(20, 184, 166, 0.08));
		border-bottom: 2px solid var(--ptero-color-primary, #6366f1);
	}

	.doc-content :global(th) {
		padding: 0.95rem 1.1rem;
		text-align: left;
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--ptero-color-text, #0f172a);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-bottom: 2px solid var(--ptero-color-primary, #6366f1);
	}

	.doc-content :global(td) {
		padding: 0.85rem 1.1rem;
		border-bottom: 1px solid var(--ptero-color-border, #e2e8f0);
		text-align: left;
		font-size: 0.95rem;
		color: var(--ptero-color-text-secondary, #475569);
		line-height: 1.6;
	}

	.doc-content :global(tbody tr) {
		transition: background 0.2s ease;
	}

	.doc-content :global(tbody tr:nth-child(even)) {
		background: rgba(99, 102, 241, 0.03);
	}

	.doc-content :global(tbody tr:hover) {
		background: rgba(99, 102, 241, 0.08);
	}

	.doc-content :global(tbody tr:last-child td) {
		border-bottom: none;
	}

	.doc-content :global(td code) {
		font-size: 0.85em;
	}

	.doc-content :global(img) {
		border-radius: 0.5rem;
		border: 1px solid rgba(15, 23, 42, 0.08);
		max-width: 100%;
		height: auto;
		box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
		margin: 0.75rem 0;
	}

	.doc-content :global(strong) {
		color: var(--ptero-color-text, #0f172a);
		font-weight: 600;
	}

	@media (max-width: 640px) {
		.doc-content {
			padding: 0 0.5rem;
		}
	}
</style>
