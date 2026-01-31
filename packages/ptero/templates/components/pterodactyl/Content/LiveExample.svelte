<script lang="ts">
	interface Props {
		src?: string;
		code?: string;
		language?: string;
		title?: string;
		height?: string;
		splitView?: boolean;
	}

	let {
		src,
		code,
		language = 'javascript',
		title = 'Live Example',
		height = '400px',
		splitView = false
	}: Props = $props();

	let iframeElement: HTMLIFrameElement;

	$effect(() => {
		if (code && iframeElement) {
			// Create a simple HTML document with the code
			const html = [
				'<!DOCTYPE html>',
				'<html>',
				'<head>',
				'\t<meta charset=\"UTF-8\">',
				'\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">',
				'\t<style>',
				'\t\tbody {',
				'\t\t\tmargin: 0;',
				'\t\t\tpadding: 1rem;',
				'\t\t\tfont-family: system-ui, -apple-system, sans-serif;',
				'\t\t}',
				'\t</style>',
				'</head>',
				'<body>',
				'\t<script type=\"module\">',
				String(code ?? ''),
				'\t</' + 'script>',
				'</body>',
				'</html>'
			].join('\n');

			const blob = new Blob([html], { type: 'text/html' });
			const url = URL.createObjectURL(blob);
			iframeElement.src = url;

			return () => {
				URL.revokeObjectURL(url);
			};
		}
	});
</script>

<div class="live-example" class:split={splitView}>
	<div class="example-header">
		<h4 class="example-title">{title}</h4>
		<span class="example-badge">Live</span>
	</div>

	<div class="example-content" style="--height: {height}">
		{#if splitView && code}
			<div class="split-container">
				<div class="code-panel">
					<pre><code class="language-{language}">{code}</code></pre>
				</div>
				<div class="preview-panel">
					{#if src}
						<iframe
							bind:this={iframeElement}
							{src}
							{title}
							sandbox="allow-scripts allow-same-origin"
						></iframe>
					{:else if code}
						<iframe bind:this={iframeElement} {title} sandbox="allow-scripts allow-same-origin"
						></iframe>
					{/if}
				</div>
			</div>
		{:else}
			<div class="preview-only">
				{#if src}
					<iframe bind:this={iframeElement} {src} {title} sandbox="allow-scripts allow-same-origin"
					></iframe>
				{:else if code}
					<iframe bind:this={iframeElement} {title} sandbox="allow-scripts allow-same-origin"
					></iframe>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.live-example {
		margin: 1.5rem 0;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		overflow: hidden;
		background: var(--color-bg);
	}

	.example-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		background: var(--color-bg-secondary);
		border-bottom: 1px solid var(--color-border);
	}

	.example-title {
		margin: 0;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text);
	}

	.example-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.5rem;
		background: var(--color-success-bg, #dcfce7);
		color: var(--color-success, #16a34a);
		border-radius: 0.25rem;
		font-size: 0.625rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.example-badge::before {
		content: '';
		display: inline-block;
		width: 6px;
		height: 6px;
		background: currentColor;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.example-content {
		height: var(--height);
	}

	.split-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: 100%;
	}

	.code-panel {
		overflow: auto;
		background: var(--color-code-bg, #1e1e1e);
		border-right: 1px solid var(--color-border);
	}

	.code-panel pre {
		margin: 0;
		padding: 1rem;
		height: 100%;
	}

	.code-panel code {
		font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--color-code-text, #d4d4d4);
	}

	.preview-panel,
	.preview-only {
		position: relative;
		height: 100%;
		background: white;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}

	@media (max-width: 768px) {
		.split-container {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
		}

		.code-panel {
			border-right: none;
			border-bottom: 1px solid var(--color-border);
		}
	}
</style>
