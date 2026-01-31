import type { SvelteComponent } from 'svelte';

export interface CodeTab {
	label: string;
	code: string;
	lang?: string;
}

export interface CodeTabsProps {
	tabs: CodeTab[];
	initialIndex?: number;
}

export default class CodeTabs extends SvelteComponent<CodeTabsProps, {}, {}> {}
