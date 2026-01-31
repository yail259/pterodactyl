import type { SvelteComponent } from 'svelte';

export interface CodeBlockProps {
	code: string;
	lang?: string;
	title?: string | null;
}

export default class CodeBlock extends SvelteComponent<CodeBlockProps, {}, {}> {}
