<script lang="ts">
	import type { ThemeConfig } from '../config/types';
	import { getThemePreset } from './presets';

	interface Props {
		theme?: ThemeConfig;
	}

	let { theme }: Props = $props();

	// Compute final CSS variables from theme config
	let cssVars = $derived.by(() => {
		if (!theme) return {};

		let vars: Record<string, string> = {};

		// Apply preset if specified
		if (theme.preset) {
			const preset = getThemePreset(theme.preset);
			if (preset) {
				vars = { ...preset.cssVars };
			}
		}

		// Apply custom cssVars (overrides preset)
		if (theme.cssVars) {
			vars = { ...vars, ...theme.cssVars };
		}

		// Legacy support: map old config to new cssVars
		if (theme.primary) {
			vars['--color-primary'] = theme.primary;
			vars['--ptero-color-primary'] = theme.primary;
		}
		if (theme.accent) {
			vars['--color-accent'] = theme.accent;
			vars['--ptero-color-accent'] = theme.accent;
		}
		if (theme.colors) {
			Object.entries(theme.colors).forEach(([key, value]) => {
				vars[`--color-${key}`] = value;
			});
		}

		return vars;
	});

	// Convert cssVars object to inline style string
	let styleString = $derived(
		Object.entries(cssVars)
			.map(([key, value]) => `${key}: ${value};`)
			.join(' ')
	);
</script>

<svelte:head>
	{#if styleString}
		<style>
			:root {
				{styleString}
			}
		</style>
	{/if}
</svelte:head>
