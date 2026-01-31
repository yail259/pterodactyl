<script lang="ts">
	import type { Version } from 'pterodactyl-core';
	import { goto } from '$app/navigation';

	interface Props {
		versions: Version[];
		currentVersion: string;
		currentPath: string;
	}

	let { versions, currentVersion, currentPath }: Props = $props();

	let isOpen = $state(false);
	let dropdownElement: HTMLDivElement;

	const versionPattern = /\/docs\/(latest|next|v[\d.]+)(?=\/|$)/;

	function buildVersionPath(versionId: string): string {
		if (versionPattern.test(currentPath)) {
			return currentPath.replace(versionPattern, `/docs/${versionId}`);
		}

		if (currentPath.startsWith('/docs')) {
			const suffix = currentPath.slice('/docs'.length) || '/';
			return `/docs/${versionId}${suffix.startsWith('/') ? suffix : `/${suffix}`}`.replace(
				/\/+$/,
				''
			);
		}

		return `/docs/${versionId}`;
	}

	function handleVersionChange(versionId: string) {
		if (versionId === currentVersion) {
			isOpen = false;
			return;
		}

		const newPath = buildVersionPath(versionId);
		goto(newPath);
		isOpen = false;
	}

	function handleClickOutside(e: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(e.target as Node)) {
			isOpen = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			isOpen = false;
		}
	}

	function getVersionBadge(version: Version): string | null {
		if (version.status === 'latest') return 'Latest';
		if (version.status === 'next') return 'Next';
		return null;
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div class="version-selector" bind:this={dropdownElement}>
	<button
		type="button"
		class="version-button"
		onclick={() => (isOpen = !isOpen)}
		aria-haspopup="listbox"
		aria-expanded={isOpen}
	>
		<span class="version-label">
			{versions.find((v) => v.id === currentVersion)?.label || currentVersion}
		</span>
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
		<div class="version-dropdown" role="listbox">
			{#each versions as version (version.id)}
				<button
					type="button"
					class="version-option"
					class:active={version.id === currentVersion}
					onclick={() => handleVersionChange(version.id)}
					role="option"
					aria-selected={version.id === currentVersion}
				>
					<span class="option-label">{version.label}</span>
					{#if getVersionBadge(version)}
						<span
							class="version-badge"
							class:latest={version.status === 'latest'}
							class:next={version.status === 'next'}
						>
							{getVersionBadge(version)}
						</span>
					{/if}
					{#if version.releaseDate}
						<span class="release-date">{new Date(version.releaseDate).toLocaleDateString()}</span>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.version-selector {
		position: relative;
	}

	.version-button {
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
		min-width: 120px;
	}

	.version-button:hover {
		background: var(--color-bg-tertiary);
		border-color: var(--color-border-hover);
	}

	.version-label {
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

	.version-dropdown {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		min-width: 200px;
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

	.version-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.75rem 1rem;
		background: transparent;
		border: none;
		text-align: left;
		cursor: pointer;
		transition: background-color 0.15s;
		border-bottom: 1px solid var(--color-border);
	}

	.version-option:last-child {
		border-bottom: none;
	}

	.version-option:hover {
		background: var(--color-bg-secondary);
	}

	.version-option.active {
		background: var(--color-bg-tertiary);
		font-weight: 600;
	}

	.option-label {
		flex: 1;
		color: var(--color-text);
		font-size: 0.875rem;
	}

	.version-badge {
		padding: 0.125rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.625rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.025em;
	}

	.version-badge.latest {
		background: var(--color-success-bg, #dcfce7);
		color: var(--color-success, #16a34a);
	}

	.version-badge.next {
		background: var(--color-warning-bg, #fef3c7);
		color: var(--color-warning, #d97706);
	}

	.release-date {
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
	}
</style>
