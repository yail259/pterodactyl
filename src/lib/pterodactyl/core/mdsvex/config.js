import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkCodeComponents } from './remark-code-components.js';

const DEBUG = typeof process !== 'undefined' && process.env?.PTERO_DEBUG_CODEBLOCKS === '1';

/**
 * @typedef {Object} PterodactylMdsvexOptions
 * @property {any[]} [rehypePlugins] - Additional rehype plugins
 * @property {any[]} [remarkPlugins] - Additional remark plugins
 * @property {{ languages?: any[]; themes?: any[]; copyButton?: boolean }} [highlight] - Syntax highlighting options
 * @property {any} [smartypants] - Smartypants configuration
 * @property {string[]} [extensions] - File extensions
 */

/**
 * Create mdsvex configuration for Pterodactyl
 * Synchronous - highlighter must be initialized before using mdsvex
 * @param {PterodactylMdsvexOptions} [options]
 * @returns {any}
 */
export function createMdsvexConfig(options = {}) {
	if (DEBUG) {
		console.log('[mdsvex] createMdsvexConfig: highlight=false, remarkCodeComponents enabled');
	}

	return {
		extensions: options.extensions || ['.md', '.svx'],
		smartypants: options.smartypants || {
			dashes: 'oldschool'
		},
		// Disable mdsvex's built-in highlighter so our remark plugin handles code blocks
		highlight: false,
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'wrap'
				}
			],
			...(options.rehypePlugins || [])
		],
		remarkPlugins: [remarkCodeComponents, ...(options.remarkPlugins || [])]
		// No highlight config - remarkCodeComponents handles all code blocks
	};
}
