<script lang="ts">
	type BadgeVariant = 'sdk' | 'package' | 'version' | 'compatibility';
	type BadgeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';

	interface Props {
		label: string;
		variant?: BadgeVariant;
		color?: BadgeColor;
		version?: string;
		href?: string;
	}

	let { label, variant = 'package', color = 'blue', version, href }: Props = $props();

	const variantColors: Record<BadgeVariant, BadgeColor> = {
		sdk: 'purple',
		package: 'blue',
		version: 'green',
		compatibility: 'orange'
	};

	const effectiveColor = $derived(color || variantColors[variant]);
</script>

{#if href}
	<a class="package-badge {effectiveColor}" {href} target="_blank" rel="noopener noreferrer">
		<span class="badge-label">{label}</span>
		{#if version}
			<span class="badge-version">{version}</span>
		{/if}
	</a>
{:else}
	<span class="package-badge {effectiveColor}">
		<span class="badge-label">{label}</span>
		{#if version}
			<span class="badge-version">{version}</span>
		{/if}
	</span>
{/if}

<style>
	.package-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.25rem 0.625rem;
		border-radius: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s;
		vertical-align: middle;
	}

	a.package-badge:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}

	.badge-label {
		line-height: 1;
	}

	.badge-version {
		padding: 0.125rem 0.375rem;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 0.25rem;
		font-size: 0.625rem;
		font-weight: 700;
		line-height: 1;
	}

	/* Color variants */
	.blue {
		background: #dbeafe;
		color: #1e40af;
	}

	.green {
		background: #dcfce7;
		color: #16a34a;
	}

	.purple {
		background: #f3e8ff;
		color: #7c3aed;
	}

	.orange {
		background: #fed7aa;
		color: #c2410c;
	}

	.red {
		background: #fee2e2;
		color: #dc2626;
	}

	.gray {
		background: #f3f4f6;
		color: #4b5563;
	}
</style>
