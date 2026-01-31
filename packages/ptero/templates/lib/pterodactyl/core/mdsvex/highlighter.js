import { createHighlighter } from 'shiki';
/**
 * Default languages to load
 */
export const DEFAULT_LANGUAGES = [
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
export const DEFAULT_THEMES = ['github-dark', 'github-light'];
/**
 * Shared highlighter instance
 * Initialized once and reused across all markdown processing
 */
let sharedHighlighter = null;
/**
 * Initialize the shared highlighter instance
 * Call this once during build setup
 */
export async function initializeHighlighter(options) {
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
export function getHighlighter() {
	if (!sharedHighlighter) {
		throw new Error('Highlighter not initialized. Call initializeHighlighter() first.');
	}
	return sharedHighlighter;
}
/**
 * Reset the highlighter (useful for testing)
 */
export function resetHighlighter() {
	sharedHighlighter = null;
}
//# sourceMappingURL=highlighter.js.map
