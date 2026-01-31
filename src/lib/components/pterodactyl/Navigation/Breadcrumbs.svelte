<script lang="ts">
	import type { Breadcrumb } from 'pterodactyl-core';

	interface Props {
		items: Breadcrumb[];
		maxItems?: number;
		maxLabelLength?: number;
	}

	let { items, maxItems = 5, maxLabelLength = 32 }: Props = $props();

	type DisplayBreadcrumb = Breadcrumb & { isEllipsis?: boolean };

	function truncateLabel(label: string) {
		if (label.length <= maxLabelLength) return label;
		return `${label.slice(0, maxLabelLength - 1)}…`;
	}

	const displayItems: DisplayBreadcrumb[] = $derived.by(() => {
		if (items.length <= maxItems) return items as DisplayBreadcrumb[];

		const head = items.slice(0, 2);
		const tailCount = Math.max(1, maxItems - head.length - 1);
		const tail = items.slice(-tailCount);

		return [...head, { label: '…', isEllipsis: true }, ...tail] as DisplayBreadcrumb[];
	});
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
	{#each displayItems as crumb, index (index)}
		{#if crumb.isEllipsis}
			<span class="crumb ellipsis" aria-hidden="true">…</span>
		{:else if crumb.href && index < displayItems.length - 1}
			<a class="crumb link" href={crumb.href} title={crumb.label}>
				{truncateLabel(crumb.label)}
			</a>
		{:else}
			<span class="crumb current" aria-current="page" title={crumb.label}>
				{truncateLabel(crumb.label)}
			</span>
		{/if}

		{#if index < displayItems.length - 1}
			<span class="separator" aria-hidden="true">/</span>
		{/if}
	{/each}
</nav>

<style>
	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		color: var(--ptero-color-text-secondary, #6b7280);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.crumb {
		max-width: 180px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.link {
		color: inherit;
		text-decoration: none;
		border-bottom: 1px dotted transparent;
		transition:
			color 0.15s ease,
			border-color 0.15s ease;
	}

	.link:hover {
		color: var(--ptero-color-primary, #2563eb);
		border-color: var(--ptero-color-primary, #2563eb);
	}

	.current {
		color: var(--ptero-color-text, #111827);
		font-weight: 600;
	}

	.separator {
		color: var(--ptero-color-border, #e5e7eb);
	}

	.ellipsis {
		color: var(--ptero-color-text-tertiary, #9ca3af);
	}
</style>
