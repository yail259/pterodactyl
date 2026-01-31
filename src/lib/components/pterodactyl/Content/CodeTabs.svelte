<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	interface CodeTab {
		label: string;
		language: string;
		code: string;
		filename?: string;
	}

	interface Props {
		tabs: CodeTab[];
		storageKey?: string;
		showLineNumbers?: boolean;
		showCopy?: boolean;
	}

	let { tabs, storageKey, showLineNumbers = true, showCopy = true }: Props = $props();

	// Load persisted tab from localStorage
	let activeTab = $state(0);

	$effect(() => {
		if (typeof window !== 'undefined' && storageKey) {
			const saved = localStorage.getItem(`code-tab:${storageKey}`);
			if (saved !== null) {
				const index = parseInt(saved, 10);
				if (index >= 0 && index < tabs.length) {
					activeTab = index;
				}
			}
		}
	});

	function selectTab(index: number) {
		activeTab = index;
		if (typeof window !== 'undefined' && storageKey) {
			localStorage.setItem(`code-tab:${storageKey}`, index.toString());
		}
	}

	function handleKeydown(e: KeyboardEvent, index: number) {
		if (e.key === 'ArrowLeft' && index > 0) {
			selectTab(index - 1);
		} else if (e.key === 'ArrowRight' && index < tabs.length - 1) {
			selectTab(index + 1);
		}
	}
</script>

<div class="code-tabs">
	<div class="tabs-header" role="tablist">
		{#each tabs as tab, index (index)}
			<button
				type="button"
				class="tab-button"
				class:active={activeTab === index}
				onclick={() => selectTab(index)}
				onkeydown={(e) => handleKeydown(e, index)}
				role="tab"
				aria-selected={activeTab === index}
				aria-controls="tabpanel-{index}"
				id="tab-{index}"
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<div class="tabs-content">
		{#each tabs as tab, index (index)}
			{#if activeTab === index}
				<div class="tab-panel" role="tabpanel" id="tabpanel-{index}" aria-labelledby="tab-{index}">
					<CodeBlock
						code={tab.code}
						language={tab.language}
						filename={tab.filename}
						{showLineNumbers}
						{showCopy}
					/>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.code-tabs {
		margin: 1.5rem 0;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		overflow: hidden;
		background: var(--color-code-bg, #1e1e1e);
	}

	.tabs-header {
		display: flex;
		gap: 0.25rem;
		padding: 0.5rem 0.5rem 0;
		background: var(--color-code-header-bg, #2d2d2d);
		border-bottom: 1px solid var(--color-border);
	}

	.tab-button {
		padding: 0.5rem 1rem;
		background: transparent;
		border: none;
		border-radius: 0.375rem 0.375rem 0 0;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		position: relative;
	}

	.tab-button:hover {
		background: var(--color-bg-secondary);
		color: var(--color-text);
	}

	.tab-button.active {
		background: var(--color-code-bg, #1e1e1e);
		color: var(--color-text);
		font-weight: 600;
	}

	.tab-button.active::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--color-primary, #3b82f6);
	}

	.tabs-content {
		position: relative;
	}

	.tab-panel {
		animation: fadeIn 0.2s ease-out;
	}

	.tab-panel :global(.code-block) {
		margin: 0;
		border: none;
		border-radius: 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
