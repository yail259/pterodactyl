import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkCodeComponents } from './remark-code-components.js';
/**
 * Create mdsvex configuration for Pterodactyl
 * Synchronous - highlighter initializes lazily on first use
 */
export function createMdsvexConfig(options = {}) {
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
//# sourceMappingURL=config.js.map
