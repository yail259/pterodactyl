<script lang="ts">
	import type { SearchEntry } from 'pterodactyl-core';

	interface Props {
		result: {
			item: SearchEntry;
			matches?: ReadonlyArray<{
				indices: ReadonlyArray<readonly [number, number]>;
				value?: string;
				key?: string;
			}>;
		};
		selected?: boolean;
		onclick?: () => void;
	}

	let { result, selected = false, onclick }: Props = $props();

	function highlightMatches(
		text: string,
		matches?: ReadonlyArray<{ indices: ReadonlyArray<readonly [number, number]> }>
	): string {
		if (!matches || matches.length === 0) return text;

		const indices = matches[0].indices;
		let highlighted = '';
		let lastIndex = 0;

		for (const [start, end] of indices) {
			highlighted += text.slice(lastIndex, start);
			highlighted += `<mark>${text.slice(start, end + 1)}</mark>`;
			lastIndex = end + 1;
		}
		highlighted += text.slice(lastIndex);

		return highlighted;
	}

	let titleMatches = $derived(result.matches?.filter((m) => m.key === 'title'));
	let contentMatches = $derived(result.matches?.filter((m) => m.key === 'content'));
</script>

<button
	type="button"
	class="search-result"
	class:selected
	{onclick}
	role="option"
	aria-selected={selected}
>
	<div class="result-header">
		<h3 class="result-title">
			{@html highlightMatches(result.item.title, titleMatches)}
		</h3>
		{#if result.item.section}
			<span class="result-section">{result.item.section}</span>
		{/if}
	</div>

	{#if result.item.description}
		<p class="result-description">{result.item.description}</p>
	{/if}

	{#if result.item.content}
		<p class="result-content">
			{@html highlightMatches(result.item.content, contentMatches)}
		</p>
	{/if}

	<div class="result-footer">
		<span class="result-version">{result.item.version}</span>
	</div>
</button>

<style>
	.search-result {
		display: block;
		width: 100%;
		padding: 0.75rem 1rem;
		text-align: left;
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--color-border);
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.search-result:hover,
	.search-result.selected {
		background: var(--color-bg-secondary);
	}

	.result-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.result-title {
		margin: 0;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text);
		flex: 1;
	}

	.result-title :global(mark) {
		background: var(--color-highlight);
		color: var(--color-text);
		font-weight: 700;
	}

	.result-section {
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
		background: var(--color-bg-tertiary);
		padding: 0.125rem 0.5rem;
		border-radius: 0.25rem;
	}

	.result-description {
		margin: 0.25rem 0;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		line-height: 1.4;
	}

	.result-content {
		margin: 0.25rem 0;
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
		line-height: 1.4;
	}

	.result-content :global(mark) {
		background: var(--color-highlight);
		color: var(--color-text);
	}

	.result-footer {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.result-version {
		font-size: 0.625rem;
		color: var(--color-text-tertiary);
		background: var(--color-bg-tertiary);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		text-transform: uppercase;
		font-weight: 600;
	}
</style>
