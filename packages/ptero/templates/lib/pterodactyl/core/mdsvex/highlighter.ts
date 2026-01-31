import {
	createHighlighter,
	type BundledLanguage,
	type BundledTheme,
	type Highlighter
} from 'shiki';

/**
 * Default languages to load
 */
export const DEFAULT_LANGUAGES: BundledLanguage[] = [
	'javascript',
	'typescript',
	'bash',
	'json',
	'dockerfile',
	'svelte',
	'html',
	'css',
	'markdown',
	'yaml',
	'toml'
];

/**
 * Default themes
 */
export const DEFAULT_THEMES: BundledTheme[] = ['github-dark', 'github-light'];

/**
 * Shared highlighter instance
 * Initialized once and reused across all markdown processing
 */
let sharedHighlighter: Highlighter | null = null;

/**
 * Initialize the shared highlighter instance
 * Call this once during build setup
 */
export async function initializeHighlighter(options?: {
	languages?: BundledLanguage[];
	themes?: BundledTheme[];
}): Promise<Highlighter> {
	if (sharedHighlighter) {
		return sharedHighlighter;
	}

	const langs = options?.languages || DEFAULT_LANGUAGES;
	const themes = options?.themes || DEFAULT_THEMES;

	sharedHighlighter = await createHighlighter({
		themes,
		langs
	});

	return sharedHighlighter;
}

/**
 * Get the shared highlighter instance
 * Throws if not initialized
 */
export function getHighlighter(): Highlighter {
	if (!sharedHighlighter) {
		throw new Error('Highlighter not initialized. Call initializeHighlighter() first.');
	}
	return sharedHighlighter;
}

/**
 * Reset the highlighter (useful for testing)
 */
export function resetHighlighter(): void {
	sharedHighlighter = null;
}
