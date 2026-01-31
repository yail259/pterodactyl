<script lang="ts">
	import type { PrevNext } from 'pterodactyl-core';

	interface Props {
		prev: PrevNext['prev'];
		next: PrevNext['next'];
	}

	let { prev, next }: Props = $props();
</script>

{#if prev || next}
	<nav class="prev-next">
		{#if prev}
			<a href={prev.href} class="prev-link">
				<span class="label">← Previous</span>
				<span class="title">{prev.title}</span>
			</a>
		{/if}
		{#if next}
			<a href={next.href} class="next-link">
				<span class="label">Next →</span>
				<span class="title">{next.title}</span>
			</a>
		{/if}
	</nav>
{/if}

<style>
	.prev-next {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--ptero-color-border, #e5e7eb);
	}

	.prev-link,
	.next-link {
		display: flex;
		flex-direction: column;
		padding: 0.75rem;
		border: none;
		border-radius: 0.5rem;
		text-decoration: none;
		transition: all 0.2s;
		background: transparent;
	}

	.prev-link:hover,
	.next-link:hover {
		background: rgba(99, 102, 241, 0.05);
	}

	.next-link {
		grid-column: 2;
		align-items: flex-end;
		text-align: right;
	}

	.label {
		font-size: 0.875rem;
		color: var(--ptero-color-primary, #3b82f6);
		font-weight: 500;
		margin-bottom: 0.25rem;
	}

	.title {
		color: var(--ptero-color-text, #111827);
		font-weight: 500;
	}
</style>
