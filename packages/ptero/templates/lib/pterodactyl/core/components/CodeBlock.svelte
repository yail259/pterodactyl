<script lang="ts">
	export let code: string;
	export let lang: string = 'text';
	export let title: string | null = null;

	let copied = false;

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => (copied = false), 1200);
		} catch (e) {
			console.error('Copy failed', e);
		}
	}
</script>

<div class="ptero-codeblock" data-lang={lang}>
	{#if title}
		<div class="ptero-codeblock__title">{title}</div>
	{/if}
	<button class="ptero-copy" aria-label="Copy code" on:click={copy} data-copied={copied}>
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
	<div class="ptero-codeblock__inner">
		{@html code}
	</div>
</div>

<style>
	.ptero-codeblock {
		position: relative;
		border-radius: 12px;
		border: 1px solid rgba(0, 0, 0, 0.08);
		background: var(--ptero-code-bg, #0b1220);
		overflow: hidden;
	}

	.ptero-codeblock__title {
		padding: 0.65rem 1rem;
		font-size: 0.85rem;
		letter-spacing: 0.01em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.8);
		background: rgba(255, 255, 255, 0.05);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.ptero-codeblock__inner :global(.shiki) {
		position: relative;
		padding: 1rem 1.2rem;
		overflow: auto;
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
		background: rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.15);
		cursor: pointer;
		opacity: 0;
		transition:
			opacity 0.15s ease,
			background 0.15s ease,
			border-color 0.15s ease;
	}

	.ptero-codeblock:hover .ptero-copy {
		opacity: 1;
	}

	.ptero-copy:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.25);
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
