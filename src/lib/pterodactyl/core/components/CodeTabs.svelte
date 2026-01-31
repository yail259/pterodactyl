<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	interface Tab {
		label: string;
		code: string;
		lang?: string;
	}

	interface Props {
		tabs?: Tab[];
		initialIndex?: number;
	}

	let { tabs = [], initialIndex = 0 }: Props = $props();

	let active = $state(initialIndex);

	const hasTabs = $derived(tabs && tabs.length > 1);
</script>

<div class="ptero-codetabs">
	{#if hasTabs}
		<div class="ptero-codetabs__list" role="tablist">
			{#each tabs as tab, i}
				<button
					class="ptero-codetabs__tab"
					class:active={i === active}
					role="tab"
					aria-selected={i === active}
					onclick={() => (active = i)}
				>
					{tab.label}
				</button>
			{/each}
		</div>
	{/if}
	<div class="ptero-codetabs__panel" role="tabpanel">
		{#if tabs[active]}
			<CodeBlock
				code={tabs[active].code}
				lang={tabs[active].lang ?? 'text'}
				title={tabs[active].label}
			/>
		{/if}
	</div>
</div>

<style>
	.ptero-codetabs {
		border-radius: 14px;
		border: 1px solid rgba(0, 0, 0, 0.08);
		background: rgba(11, 18, 32, 0.85);
		overflow: hidden;
	}

	.ptero-codetabs__list {
		display: flex;
		gap: 0.25rem;
		padding: 0.5rem 0.6rem;
		background: rgba(255, 255, 255, 0.04);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.ptero-codetabs__tab {
		border: 1px solid transparent;
		background: transparent;
		color: rgba(255, 255, 255, 0.7);
		padding: 0.35rem 0.75rem;
		border-radius: 0.65rem;
		font-size: 0.9rem;
		cursor: pointer;
		transition:
			background 0.15s ease,
			color 0.15s ease,
			border-color 0.15s ease;
	}

	.ptero-codetabs__tab:hover {
		background: rgba(255, 255, 255, 0.08);
	}

	.ptero-codetabs__tab.active {
		color: #fff;
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.ptero-codetabs__panel {
		padding: 0.75rem;
	}
</style>
