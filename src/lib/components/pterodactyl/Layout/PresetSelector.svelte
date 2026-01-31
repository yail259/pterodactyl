<script lang="ts">
	import { themePresets } from '$lib/pterodactyl/core/themes/presets';
	import { browser } from '$app/environment';

	interface Props {
		storageKey?: string;
	}

	let { storageKey = 'pterodactyl-preset' }: Props = $props();

	let currentPreset = $state('default');

	const presets = Object.keys(themePresets);

	// Load preset from URL or localStorage
	$effect(() => {
		if (!browser) return;

		// Check URL parameter first
		const urlParams = new URLSearchParams(window.location.search);
		const urlPreset = urlParams.get('preset');

		if (urlPreset && presets.includes(urlPreset)) {
			currentPreset = urlPreset;
			applyPreset(urlPreset);
			return;
		}

		// Fall back to localStorage
		const stored = localStorage.getItem(storageKey);
		if (stored && presets.includes(stored)) {
			currentPreset = stored;
			applyPreset(stored);
		} else {
			applyPreset('default');
		}
	});

	function applyPreset(presetName: string) {
		if (!browser) return;

		const preset = themePresets[presetName];
		if (!preset) return;

		// Apply CSS variables to root
		const root = document.documentElement;
		Object.entries(preset.cssVars).forEach(([key, value]) => {
			root.style.setProperty(key, value);
		});
	}

	function handlePresetChange(event: Event) {
		const select = event.currentTarget as HTMLSelectElement;
		const newPreset = select.value;

		currentPreset = newPreset;
		applyPreset(newPreset);
		localStorage.setItem(storageKey, newPreset);

		// Update URL parameter
		if (browser) {
			const url = new URL(window.location.href);
			url.searchParams.set('preset', newPreset);
			window.history.replaceState({}, '', url.toString());
		}
	}

	function formatPresetLabel(presetKey: string): string {
		const preset = themePresets[presetKey];
		return preset?.name || presetKey;
	}
</script>

<div class="preset-selector">
	<select
		class="preset-select"
		value={currentPreset}
		onchange={handlePresetChange}
		aria-label="Select theme preset"
	>
		{#each presets as preset}
			<option value={preset}>
				{formatPresetLabel(preset)}
			</option>
		{/each}
	</select>
</div>

<style>
	.preset-selector {
		flex: 1;
		min-width: 0;
	}

	.preset-select {
		width: 100%;
		padding: 0.5rem 0.75rem;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text);
		cursor: pointer;
		transition: all 0.2s;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.75rem center;
		padding-right: 2.5rem;
	}

	.preset-select:hover {
		background-color: var(--color-bg-tertiary);
		border-color: var(--color-border-hover);
	}

	.preset-select:focus {
		outline: 2px solid var(--ptero-color-primary, #6366f1);
		outline-offset: 2px;
		border-color: var(--ptero-color-primary, #6366f1);
	}

	@media (max-width: 640px) {
		.preset-select {
			font-size: 0.8rem;
			padding: 0.4rem 0.6rem;
			padding-right: 2rem;
			background-position: right 0.5rem center;
		}
	}
</style>
