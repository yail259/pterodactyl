<script lang="ts">
	import { searchEntries } from 'pterodactyl-core';
	import { getSearchPayload } from 'pterodactyl:search';
	import { goto } from '$app/navigation';
	import SearchResult from './SearchResult.svelte';

	interface Props {
		isopen: boolean;
		onclose: () => void;
	}

	let { isopen = $bindable(), onclose }: Props = $props();

	let query = $state('');
	let selectedIndex = $state(0);
	let searchInput = $state<HTMLInputElement | null>(null);
	let modalElement = $state<HTMLElement | null>(null);

	const searchIndex = getSearchPayload();

	let results = $derived(query.length >= 2 ? searchEntries(query, searchIndex).slice(0, 10) : []);

	$effect(() => {
		if (isopen && searchInput) {
			searchInput.focus();
			selectedIndex = 0;
		}
	});

	$effect(() => {
		if (results.length > 0 && selectedIndex >= results.length) {
			selectedIndex = results.length - 1;
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (!isopen) return;

		switch (e.key) {
			case 'Escape':
				e.preventDefault();
				handleClose();
				break;
			case 'ArrowDown':
				e.preventDefault();
				if (results.length > 0) {
					selectedIndex = (selectedIndex + 1) % results.length;
				}
				break;
			case 'ArrowUp':
				e.preventDefault();
				if (results.length > 0) {
					selectedIndex = selectedIndex === 0 ? results.length - 1 : selectedIndex - 1;
				}
				break;
			case 'Enter':
				e.preventDefault();
				if (results.length > 0 && selectedIndex >= 0) {
					handleSelect(results[selectedIndex].item.href);
				}
				break;
		}
	}

	function handleClose() {
		query = '';
		selectedIndex = 0;
		isopen = false;
		onclose();
	}

	function handleSelect(href: string) {
		goto(href);
		handleClose();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isopen}
	<div class="search-modal-backdrop" onclick={handleBackdropClick} role="presentation">
		<div
			class="search-modal"
			bind:this={modalElement}
			role="dialog"
			aria-modal="true"
			aria-labelledby="search-title"
		>
			<div class="search-header">
				<div class="search-input-wrapper">
					<svg
						class="search-icon"
						width="20"
						height="20"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12zM15 15l-4-4"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<input
						bind:this={searchInput}
						bind:value={query}
						type="text"
						class="search-input"
						placeholder="Search documentation..."
						aria-label="Search"
						id="search-title"
					/>
					<button
						type="button"
						class="search-close"
						onclick={handleClose}
						aria-label="Close search"
					>
						<kbd>Esc</kbd>
					</button>
				</div>
			</div>

			<div class="search-results" role="listbox">
				{#if query.length < 2}
					<div class="search-hint">Type at least 2 characters to search...</div>
				{:else if results.length === 0}
					<div class="search-no-results">
						No results found for "<strong>{query}</strong>"
					</div>
				{:else}
					{#each results as result, index (result.item.id)}
						<SearchResult
							{result}
							selected={index === selectedIndex}
							onclick={() => handleSelect(result.item.href)}
						/>
					{/each}
				{/if}
			</div>

			<div class="search-footer">
				<div class="search-shortcuts">
					<span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
					<span><kbd>Enter</kbd> Select</span>
					<span><kbd>Esc</kbd> Close</span>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.search-modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 10vh 1rem 1rem;
		z-index: 9999;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.search-modal {
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		max-width: 42rem;
		width: 100%;
		max-height: 70vh;
		display: flex;
		flex-direction: column;
		animation: slideUp 0.2s ease-out;
	}

	@keyframes slideUp {
		from {
			transform: translateY(20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.search-header {
		padding: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.search-input-wrapper {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.search-icon {
		flex-shrink: 0;
		color: var(--color-text-tertiary);
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: 1rem;
		color: var(--color-text);
	}

	.search-input::placeholder {
		color: var(--color-text-tertiary);
	}

	.search-close {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.search-close kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem 0.5rem;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-family: ui-monospace, monospace;
		color: var(--color-text-tertiary);
	}

	.search-results {
		flex: 1;
		overflow-y: auto;
		min-height: 200px;
		max-height: 50vh;
	}

	.search-hint,
	.search-no-results {
		padding: 2rem 1rem;
		text-align: center;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
	}

	.search-footer {
		padding: 0.75rem 1rem;
		border-top: 1px solid var(--color-border);
		background: var(--color-bg-secondary);
		border-bottom-left-radius: 0.75rem;
		border-bottom-right-radius: 0.75rem;
	}

	.search-shortcuts {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
	}

	.search-shortcuts kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.25rem;
		padding: 0.125rem 0.25rem;
		margin: 0 0.25rem;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 0.25rem;
		font-size: 0.625rem;
		font-family: ui-monospace, monospace;
	}
</style>
