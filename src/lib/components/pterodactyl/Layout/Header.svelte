<script lang="ts">
	interface Props {
		siteTitle: string;
		sidebarOpen?: boolean;
		actions?: import('svelte').Snippet;
	}

	let { siteTitle, sidebarOpen = $bindable(false), actions }: Props = $props();
</script>

<header class="docs-header">
	<button class="menu-btn" onclick={() => (sidebarOpen = !sidebarOpen)} aria-label="Toggle menu">
		☰
	</button>
	<div class="header-title">{siteTitle}</div>
	<div class="header-actions">
		{@render actions?.()}
	</div>
</header>

<style>
	.docs-header {
		height: 64px;
		border-bottom: 1px solid var(--ptero-color-border, #e5e7eb);
		display: flex;
		align-items: center;
		padding: 0 2rem;
		background: var(--ptero-color-bg, #ffffff);
		/* Removed sticky positioning - not needed in grid layout */
	}

	.menu-btn {
		display: none;
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0.5rem;
		margin-right: 1rem;
	}

	.header-title {
		font-weight: 600;
		font-size: 1.25rem;
		color: var(--ptero-color-text, #111827);
	}

	.header-actions {
		margin-left: auto;
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	@media (max-width: 1024px) {
		.menu-btn {
			display: block;
		}
	}
</style>
