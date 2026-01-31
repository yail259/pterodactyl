<script lang="ts">
	interface Props {
		code: string;
		language?: string;
		filename?: string;
		showLineNumbers?: boolean;
		highlightLines?: number[];
		startLine?: number;
		showCopy?: boolean;
	}

	let {
		code,
		language = 'text',
		filename,
		showLineNumbers = true,
		highlightLines = [],
		startLine = 1,
		showCopy = true
	}: Props = $props();

	let copied = $state(false);

	const lines = $derived(code.split('\n'));

	function isHighlighted(lineNumber: number): boolean {
		return highlightLines.includes(lineNumber);
	}

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy code:', err);
		}
	}
</script>

<div class="code-block">
	{#if filename}
		<div class="code-header">
			<span class="filename">{filename}</span>
		</div>
	{/if}

	{#if showCopy}
		<button
			type="button"
			class="copy-button"
			onclick={copyCode}
			aria-label="Copy code"
			title={copied ? 'Copied!' : 'Copy code'}
		>
			{#if copied}
				<svg
					width="20"
					height="20"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.5 4.5L6 12L2.5 8.5"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{:else}
				<svg
					width="20"
					height="20"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						x="5.5"
						y="5.5"
						width="8"
						height="8"
						rx="1"
						stroke="currentColor"
						stroke-width="1.5"
					/>
					<path
						d="M10.5 5.5V3.5C10.5 2.94772 10.0523 2.5 9.5 2.5H3.5C2.94772 2.5 2.5 2.94772 2.5 3.5V9.5C2.5 10.0523 2.94772 10.5 3.5 10.5H5.5"
						stroke="currentColor"
						stroke-width="1.5"
					/>
				</svg>
			{/if}
		</button>
	{/if}

	<div class="code-content">
		<pre class="code-pre"><code class="language-{language}"
				>{#each lines as line, index}<span
						class="code-line"
						class:highlighted={isHighlighted(startLine + index)}
						data-line={startLine + index}
						>{#if showLineNumbers}<span class="line-number">{startLine + index}</span>{/if}<span
							class="line-content">{line}</span
						></span
					>{/each}</code
			></pre>
	</div>
</div>

<style>
	.code-block {
		position: relative;
		background: var(--color-code-bg, #1e1e1e);
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		overflow: hidden;
		margin: 0.5rem 0;
		font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
	}

	.code-header {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0.5rem 1rem;
		background: var(--color-code-header-bg, #2d2d2d);
		border-bottom: 1px solid var(--color-border);
	}

	.filename {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		font-weight: 500;
	}

	.copy-button {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(4px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.375rem;
		color: var(--color-text-secondary);
		cursor: pointer;
		transition: all 0.2s;
	}

	.copy-button:hover {
		background: rgba(255, 255, 255, 0.2);
		color: var(--color-text);
		transform: scale(1.05);
	}

	.code-content {
		overflow-x: auto;
	}

	.code-pre {
		margin: 0;
		padding: 1rem;
		overflow: visible;
	}

	.code-pre code {
		display: block;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--color-code-text, #d4d4d4);
	}

	.code-line {
		display: block;
		min-height: 1.6em;
	}

	.code-line.highlighted {
		background: var(--color-code-highlight, rgba(255, 255, 255, 0.1));
		border-left: 3px solid var(--color-primary, #3b82f6);
		padding-left: 0.5rem;
		margin-left: -0.5rem;
	}

	.line-number {
		display: inline-block;
		width: 3rem;
		text-align: right;
		margin-right: 1.5rem;
		color: var(--color-text-tertiary);
		user-select: none;
	}

	.line-content {
		white-space: pre;
	}
</style>
