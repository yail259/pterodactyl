import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkCodeComponents } from './remark-code-components.js';

export interface PterodactylMdsvexOptions {
	/** Additional rehype plugins */
	rehypePlugins?: any[];

	/** Additional remark plugins */
	remarkPlugins?: any[];

	/** Syntax highlighting options */
	highlight?: {
		languages?: any[];
		themes?: any[];
		copyButton?: boolean;
	};

	/** Smartypants configuration */
	smartypants?: any;

	/** File extensions */
	extensions?: string[];
}

/**
 * Create mdsvex configuration for Pterodactyl
 * Synchronous - highlighter initializes lazily on first use
 */
export function createMdsvexConfig(options: PterodactylMdsvexOptions = {}): any {
	return {
		extensions: options.extensions || ['.md', '.svx'],
		smartypants: options.smartypants || {
			dashes: 'oldschool'
		},
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
		remarkPlugins: [remarkCodeComponents(), ...(options.remarkPlugins || [])]
		// No highlight config - remarkCodeComponents handles all code blocks
	};
}
