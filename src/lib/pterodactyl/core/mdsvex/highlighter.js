import { createHighlighter } from 'shiki';

/** @typedef {import('shiki').BundledLanguage} BundledLanguage */
/** @typedef {import('shiki').BundledTheme} BundledTheme */
/** @typedef {import('shiki').Highlighter} Highlighter */

/**
 * Default languages to load
 * @type {BundledLanguage[]}
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
 * @type {BundledTheme[]}
 */
export const DEFAULT_THEMES = ['github-light', 'github-dark', 'one-dark-pro'];

const H_KEY = Symbol.for('pterodactyl.highlighter');

/**
 * Shared highlighter instance
 * Initialized once and reused across all markdown processing
 * @returns {Highlighter | null}
 */
function getShared() {
	// @ts-expect-error - symbol-keyed property on globalThis
	return globalThis[H_KEY] || null;
}

/**
 * @param {Highlighter | null} h
 */
function setShared(h) {
	// @ts-expect-error - symbol-keyed property on globalThis
	globalThis[H_KEY] = h;
}

/**
 * Initialize the shared highlighter instance
 * Call this once during build setup
 * @param {Object} [options]
 * @param {BundledLanguage[]} [options.languages]
 * @param {BundledTheme[]} [options.themes]
 * @returns {Promise<Highlighter>}
 */
export async function initializeHighlighter(options) {
	if (getShared()) {
		// @ts-expect-error - symbol-keyed property on globalThis
		return getShared();
	}

	const langs = options?.languages || DEFAULT_LANGUAGES;
	const themes = options?.themes || DEFAULT_THEMES;

	const h = await createHighlighter({
		themes,
		langs
	});

	setShared(h);

	return h;
}

/**
 * Get the shared highlighter instance
 * Throws if not initialized
 * @returns {Highlighter}
 */
export function getHighlighter() {
	const h = getShared();
	if (!h) {
		throw new Error('Highlighter not initialized. Call initializeHighlighter() first.');
	}
	return h;
}

/**
 * Reset the highlighter (useful for testing)
 */
export function resetHighlighter() {
	setShared(null);
}
