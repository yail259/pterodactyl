<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';

	interface TocItem {
		id: string;
		text: string;
		level: number;
	}

	let tocItems = $state<TocItem[]>([]);
	let activeId = $state('');
	let contentObserver: MutationObserver | null = null;
	let headingObserver: IntersectionObserver | null = null;
	let currentPath = $derived($page.url.pathname);

	function teardownObservers() {
		headingObserver?.disconnect();
		headingObserver = null;
		contentObserver?.disconnect();
		contentObserver = null;
	}

	function setupHeadingObserver(headings: NodeListOf<Element>) {
		headingObserver?.disconnect();

		if (headings.length === 0) return;

		headingObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
						break;
					}
				}
			},
			{ rootMargin: '-100px 0px -66% 0px' }
		);

		headings.forEach((heading) => headingObserver?.observe(heading));
	}

	function refreshToc() {
		const container = document.querySelector('.doc-content');
		if (!container) {
			tocItems = [];
			return;
		}

		const headings = container.querySelectorAll('h2, h3');
		tocItems = Array.from(headings).map((heading) => ({
			id: heading.id,
			text: (heading.textContent || '').replace(/`/g, ''),
			level: parseInt(heading.tagName[1])
		}));

		setupHeadingObserver(headings);

		if (tocItems.length === 0) {
			activeId = '';
		} else if (!tocItems.find((item) => item.id === activeId)) {
			activeId = tocItems[0].id;
		}
	}

	onMount(() => {
		refreshToc();

		const content = document.querySelector('.doc-content');
		if (content) {
			contentObserver = new MutationObserver(() => refreshToc());
			contentObserver.observe(content, { childList: true, subtree: true });
		}

		return () => teardownObservers();
	});

	$effect(() => {
		// Track currentPath to re-run on navigation
		void currentPath;
		queueMicrotask(refreshToc);
	});

	onDestroy(() => teardownObservers());
</script>

{#if tocItems.length > 0}
	<nav class="toc">
		<h4>On This Page</h4>
		<ul>
			{#each tocItems as item}
				<li class:active={item.id === activeId}>
					<a href="#{item.id}" style="padding-left: {(item.level - 2) * 0.75 + 0.5}rem"
						>{item.text}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.toc {
		font-size: 0.875rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		position: sticky;
		top: 0.75rem;
	}

	.toc h4 {
		font-size: 0.75rem;
		font-weight: 700;
		margin: 0 0 0.35rem 0;
		color: var(--ptero-color-text-tertiary, #94a3b8);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding-bottom: 0.35rem;
		border-bottom: none;
	}

	.toc ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.toc li {
		margin: 0;
		transition: border-color 0.2s ease;
		border-left: 2px solid transparent;
	}

	.toc a {
		color: var(--ptero-color-text-secondary, #6b7280);
		text-decoration: none;
		display: block;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		padding-right: 0.5rem;
		line-height: 1.4;
		transition: color 0.2s ease;
		font-size: 0.85rem;
	}

	.toc a:hover {
		color: var(--ptero-color-text, #111827);
	}

	.toc li.active {
		border-left-color: var(--ptero-color-primary, #6366f1);
		background: linear-gradient(90deg, rgba(99, 102, 241, 0.05), transparent);
	}

	.toc li.active a {
		color: var(--ptero-color-primary, #6366f1);
		font-weight: 600;
	}
</style>
