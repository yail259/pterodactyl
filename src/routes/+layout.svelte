<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import SiteNavbar from '$lib/components/SiteNavbar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-shell">
	<SiteNavbar />
	<div class="app-body">
		{@render children()}
	</div>
</div>

<style>
	:global(:root) {
		color-scheme: light;
		--ptero-color-bg: #f9fafb;
		--ptero-color-bg-secondary: #ffffff;
		--ptero-color-bg-tertiary: #eef2ff;
		--ptero-color-border: #e2e8f0;
		--ptero-color-border-hover: #cbd5f5;
		--ptero-color-text: #0f172a;
		--ptero-color-text-secondary: #475569;
		--ptero-color-text-tertiary: #94a3b8;
		--ptero-color-primary: #6366f1;
		--ptero-color-accent: #14b8a6;
		--color-bg: #ffffff;
		--color-bg-secondary: #f8fafc;
		--color-bg-tertiary: #eef2ff;
		--color-border: #e2e8f0;
		--color-border-hover: #cbd5f5;
		--color-text: #0f172a;
		--color-text-secondary: #475569;
		--color-text-tertiary: #94a3b8;
		--panel-surface: #ffffff;
		--panel-border: rgba(14, 30, 53, 0.08);
		background-color: var(--ptero-color-bg);
	}

	:global(:root.dark) {
		color-scheme: dark;
		--ptero-color-bg: #0b1021;
		--ptero-color-bg-secondary: #141a33;
		--ptero-color-bg-tertiary: #1f2544;
		--ptero-color-border: rgba(255, 255, 255, 0.08);
		--ptero-color-border-hover: rgba(255, 255, 255, 0.18);
		--ptero-color-text: #e5e7eb;
		--ptero-color-text-secondary: #cbd5f5;
		--ptero-color-text-tertiary: #94a3b8;
		--ptero-color-primary: #818cf8;
		--ptero-color-accent: #34d399;
		--color-bg: #11152b;
		--color-bg-secondary: #1b203a;
		--color-bg-tertiary: #252b47;
		--color-border: rgba(255, 255, 255, 0.08);
		--color-border-hover: rgba(255, 255, 255, 0.18);
		--color-text: #f1f5f9;
		--color-text-secondary: #cbd5f5;
		--color-text-tertiary: #9ca3af;
		--panel-surface: rgba(17, 23, 52, 0.9);
		--panel-border: rgba(129, 140, 248, 0.4);
		background-color: var(--ptero-color-bg);
	}

	:global(body.dark) {
		background-color: #050715;
	}

	/* Modern CSS Grid App Shell - Zero calculations needed! */
	.app-shell {
		display: grid;
		grid-template-rows: auto 1fr; /* navbar takes natural height, body fills rest */
		height: 100dvh; /* dynamic viewport height accounts for mobile chrome */
		overflow: hidden;
	}

	.app-body {
		overflow-y: auto; /* allow natural scrolling for non-docs pages */
		min-height: 0; /* critical for grid children to respect overflow */
	}
</style>
