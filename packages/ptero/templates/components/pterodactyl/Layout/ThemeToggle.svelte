<script lang="ts">
	type Theme = 'light' | 'dark' | 'auto';

	interface Props {
		storageKey?: string;
	}

	let { storageKey = 'pterodactyl-theme' }: Props = $props();

	let theme = $state<Theme>('auto');
	let mounted = $state(false);
	let isOpen = $state(false);
	let dropdownElement: HTMLDivElement;

	const themeOptions: Theme[] = ['light', 'dark', 'auto'];

	// Load theme from localStorage and apply it
	$effect(() => {
		if (typeof window === 'undefined') return;

		mounted = true;
		const stored = localStorage.getItem(storageKey) as Theme | null;
		if (stored && themeOptions.includes(stored)) {
			theme = stored;
		}

		applyTheme(theme);
	});

	// Watch for theme changes
	$effect(() => {
		if (!mounted) return;
		applyTheme(theme);
		localStorage.setItem(storageKey, theme);
	});

	function setModeClasses(isDark: boolean, isLight: boolean) {
		const root = document.documentElement;
		const body = document.body;
		root.classList.toggle('dark', isDark);
		root.classList.toggle('light', isLight);
		body.classList.toggle('dark', isDark);
		body.classList.toggle('light', isLight);
	}

	function applyTheme(selectedTheme: Theme) {
		if (typeof window === 'undefined') return;

		if (selectedTheme === 'auto') {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setModeClasses(prefersDark, !prefersDark);
		} else {
			setModeClasses(selectedTheme === 'dark', selectedTheme === 'light');
		}
	}

	function handleThemeChange(newTheme: Theme) {
		theme = newTheme;
		isOpen = false;
	}

	function handleClickOutside(e: MouseEvent) {
		if (!isOpen) return; // Don't process if already closed
		if (dropdownElement && !dropdownElement.contains(e.target as Node)) {
			isOpen = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			isOpen = false;
		}
	}

	function getThemeIcon(currentTheme: Theme): string {
		switch (currentTheme) {
			case 'light':
				return '☀️';
			case 'dark':
				return '🌙';
			case 'auto':
				return '💫';
		}
	}

	function getThemeLabel(currentTheme: Theme): string {
		switch (currentTheme) {
			case 'light':
				return 'Light';
			case 'dark':
				return 'Dark';
			case 'auto':
				return 'Auto';
		}
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div class="theme-selector" bind:this={dropdownElement}>
	<button
		type="button"
		class="theme-button"
		onclick={(e) => {
			e.stopPropagation();
			isOpen = !isOpen;
		}}
		aria-haspopup="listbox"
		aria-expanded={isOpen}
	>
		<span class="theme-icon" role="img" aria-hidden="true">
			{getThemeIcon(theme)}
		</span>
		<span class="theme-label">{getThemeLabel(theme)}</span>
		<svg
			class="chevron"
			class:open={isOpen}
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3 4.5L6 7.5L9 4.5"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>

	{#if isOpen}
		<div class="theme-dropdown" role="listbox">
			{#each themeOptions as option}
				<button
					type="button"
					class="theme-option"
					class:active={option === theme}
					onclick={() => handleThemeChange(option)}
					role="option"
					aria-selected={option === theme}
				>
					<span class="option-icon" role="img" aria-hidden="true">
						{getThemeIcon(option)}
					</span>
					<span class="option-label">{getThemeLabel(option)}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.theme-selector {
		position: relative;
	}

	.theme-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 0.375rem;
		font-size: 0.875rem;
		color: var(--color-text);
		cursor: pointer;
		transition: all 0.2s;
		width: 100%;
	}

	.theme-button:hover {
		background: var(--color-bg-tertiary);
		border-color: var(--color-border-hover);
	}

	.theme-icon {
		font-size: 1rem;
		line-height: 1;
		flex-shrink: 0;
	}

	.theme-label {
		flex: 1;
		text-align: left;
		font-weight: 500;
	}

	.chevron {
		flex-shrink: 0;
		color: var(--color-text-tertiary);
		transition: transform 0.2s;
	}

	.chevron.open {
		transform: rotate(180deg);
	}

	.theme-dropdown {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		right: 0;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
		z-index: 100;
		overflow: hidden;
		animation: slideDown 0.2s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.theme-option {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.75rem 1rem;
		background: transparent;
		border: none;
		text-align: left;
		cursor: pointer;
		transition: background-color 0.15s;
		border-bottom: 1px solid var(--color-border);
	}

	.theme-option:last-child {
		border-bottom: none;
	}

	.theme-option:hover {
		background: var(--color-bg-secondary);
	}

	.theme-option.active {
		background: var(--color-bg-tertiary);
		font-weight: 600;
	}

	.option-icon {
		font-size: 1rem;
		line-height: 1;
		flex-shrink: 0;
	}

	.option-label {
		flex: 1;
		color: var(--color-text);
		font-size: 0.875rem;
	}

	@media (max-width: 640px) {
		.theme-label {
			display: none;
		}
	}
</style>
