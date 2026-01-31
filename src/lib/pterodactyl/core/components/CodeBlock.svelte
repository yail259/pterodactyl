<script lang="ts">
	let {
		code,
		source,
		lang = 'text',
		title = null
	}: {
		code: string; // Highlighted HTML
		source: string; // Plain text source for copying
		lang?: string;
		title?: string | null;
	} = $props();

	let copied = $state(false);

	async function copy() {
		console.log('[Copy] Function called');
		console.log('[Copy] source prop:', source);
		console.log('[Copy] source type:', typeof source);
		console.log('[Copy] source length:', source?.length);
		console.log('[Copy] code fallback (first 100 chars):', code?.substring(0, 100));

		try {
			const textToCopy = source || code;
			console.log('[Copy] Text to copy (first 100 chars):', textToCopy?.substring(0, 100));
			console.log('[Copy] Attempting clipboard write...');
			await navigator.clipboard.writeText(textToCopy);
			console.log('[Copy] ✓ Success! Copied', textToCopy?.length, 'characters');
			copied = true;
			setTimeout(() => (copied = false), 1200);
		} catch (e: unknown) {
			const err = e as Error;
			console.error('[Copy] ✗ Failed:', e);
			console.error('[Copy] Error name:', err?.name);
			console.error('[Copy] Error message:', err?.message);
			console.error('[Copy] Navigator clipboard available?:', !!navigator.clipboard);
		}
	}
</script>

<div class="ptero-codeblock" data-lang={lang}>
	{#if title}
		<div class="ptero-codeblock__title">{title}</div>
	{/if}
	<div class="ptero-codeblock__inner">
		{@html code}
	</div>
	<button class="ptero-copy" aria-label="Copy code" onclick={copy} data-copied={copied}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
			<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
		</svg>
		<span class="visually-hidden">Copy</span>
	</button>
</div>

<style>
	.ptero-codeblock {
		position: relative;
		border-radius: 12px;
		border: 1px solid var(--border-color);
		background: var(--background);
		overflow: hidden;
	}

	.ptero-codeblock__title {
		padding: 0.65rem 1rem;
		font-size: 0.85rem;
		letter-spacing: 0.01em;
		text-transform: uppercase;
		color: var(--foreground);
		background: var(--background-secondary);
		border-bottom: 1px solid var(--border-color);
	}

	.ptero-codeblock__inner :global(.shiki),
	.ptero-codeblock__inner :global(pre) {
		position: relative;
		padding: 1rem 1.2rem;
		overflow: auto;
		margin: 0;
		background: transparent !important;
	}

	.ptero-copy {
		position: absolute;
		top: 0.6rem;
		right: 0.6rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 0.65rem;
		background: var(--background-secondary);
		color: var(--foreground);
		border: 1px solid var(--border-color);
		cursor: pointer;
		opacity: 1;
		transition:
			opacity 0.15s ease,
			background 0.15s ease,
			border-color 0.15s ease;
	}

	.ptero-copy:hover {
		background: var(--background-tertiary);
		border-color: var(--border-color-hover);
	}

	.ptero-copy[data-copied='true'] svg {
		color: #34d399;
	}

	.ptero-copy svg {
		width: 1rem;
		height: 1rem;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
