import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { createMdsvexConfig } from './src/lib/pterodactyl/core/mdsvex/config.js';

const mdsvexConfig = createMdsvexConfig();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...(mdsvexConfig.extensions || [])],
	preprocess: [
		vitePreprocess(),
		mdsvex(mdsvexConfig),
		{
			name: 'inject-code-components',
			/** @param {{ content: string, filename?: string }} arg */
			markup: ({ content, filename }) => {
				if (!filename || !/\.(md|svx)$/.test(filename)) return;

				if (content.includes('CodeBlock') || content.includes('CodeTabs')) {
					const importStmt = `import { CodeBlock, CodeTabs } from 'pterodactyl-core';`;

					// Naive injection - works for standard mdsvex output
					if (content.includes('<script')) {
						return {
							code: content.replace(/<script(.*?)>/, `<script$1>\n${importStmt}`)
						};
					} else {
						return {
							code: `<script>\n${importStmt}\n</script>\n${content}`
						};
					}
				}
			}
		}
	],
	kit: {
		adapter: adapter(),
		alias: {
			'pterodactyl-core': './src/lib/pterodactyl/core'
		}
	}
};

export default config;
