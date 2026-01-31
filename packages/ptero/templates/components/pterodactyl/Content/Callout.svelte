<script lang="ts">
	interface Props {
		type?: 'info' | 'warning' | 'danger' | 'success' | 'tip';
		title?: string;
		children: import('svelte').Snippet;
	}

	let { type = 'info', title, children }: Props = $props();

	const icons = {
		info: 'ℹ️',
		warning: '⚠️',
		danger: '🚫',
		success: '✅',
		tip: '💡'
	};
</script>

<div class="callout callout-{type}">
	<div class="callout-header">
		<span class="callout-icon">{icons[type]}</span>
		{#if title}
			<strong class="callout-title">{title}</strong>
		{/if}
	</div>
	<div class="callout-content">
		{@render children()}
	</div>
</div>

<style>
	.callout {
		padding: 0.75rem;
		border-radius: 0.5rem;
		margin: 0.75rem 0;
		border-left: 4px solid;
	}

	.callout-info {
		background: #eff6ff;
		border-color: #3b82f6;
	}

	.callout-warning {
		background: #fffbeb;
		border-color: #f59e0b;
	}

	.callout-danger {
		background: #fef2f2;
		border-color: #ef4444;
	}

	.callout-success {
		background: #f0fdf4;
		border-color: #10b981;
	}

	.callout-tip {
		background: #faf5ff;
		border-color: #8b5cf6;
	}

	.callout-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.35rem;
	}

	.callout-icon {
		font-size: 1.25rem;
	}

	.callout-title {
		font-weight: 600;
	}

	.callout-content {
		color: var(--ptero-color-text, #111827);
	}

	.callout-content :global(p:first-child) {
		margin-top: 0;
	}

	.callout-content :global(p:last-child) {
		margin-bottom: 0;
	}
</style>
