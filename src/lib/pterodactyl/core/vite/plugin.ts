import type { Plugin } from 'vite';
import type { PterodactylConfig } from '../config/types.ts';
import fg from 'fast-glob';
import { resolve } from 'node:path';
import { extractSlug, extractVersion } from '../content/loader.ts';
import { parseFrontmatter } from '../content/frontmatter.ts';
import { readFile } from 'node:fs/promises';
import { initializeHighlighter } from '../mdsvex/highlighter.js';

export interface PterodactylPluginOptions {
	config: PterodactylConfig;
	contentDir?: string;
}

/**
 * Scan markdown files and generate a virtual module that exports metadata only.
 * Components are not included here - they should be loaded separately.
 */
async function generateContentModule(root: string, contentDir: string): Promise<string> {
	const contentPath = resolve(root, contentDir);
	const pattern = `${contentPath}/**/*.{md,mdx,svx}`;
	const files = await fg(pattern, { absolute: true });

	// Build docs array with pre-parsed frontmatter only
	const docsArray = await Promise.all(
		files.map(async (filepath) => {
			const rawContent = await readFile(filepath, 'utf-8');
			const { frontmatter } = parseFrontmatter(rawContent);
			const slug = extractSlug(filepath);
			const version = extractVersion(filepath);

			return `{
	slug: ${JSON.stringify(slug)},
	version: ${JSON.stringify(version)},
	filepath: ${JSON.stringify(filepath)},
	frontmatter: ${JSON.stringify(frontmatter)},
	content: ${JSON.stringify(rawContent)}
}`;
		})
	);

	return `
export const docs = [
${docsArray.join(',\n')}
];

export default docs;
	`;
}

/**
 * Pterodactyl Vite plugin for virtual modules and optimization
 */
export function pterodactyl(options: PterodactylPluginOptions): Plugin {
	const contentDir = options.contentDir || 'src/content/docs';
	let root = '';
	let resolvedPteroConfig: PterodactylConfig;

	return {
		name: 'pterodactyl',
		enforce: 'pre', // Run before other plugins

		async configResolved(config) {
			root = config.root;

			// Merge user config with defaults
			const { mergeConfig } = await import('../config/loader.ts');
			resolvedPteroConfig = mergeConfig(options.config);

			// Initialize Shiki highlighter once at startup
			await initializeHighlighter();
		},

		config() {
			// Optimize Fuse.js and other dependencies
			return {
				optimizeDeps: {
					include: ['fuse.js', 'github-slugger']
				}
			};
		},

		resolveId(id) {
			// Handle virtual modules - use consistent ID format
			if (id === 'pterodactyl:config') {
				return 'virtual:pterodactyl:config';
			}
			if (id === 'pterodactyl:navigation') {
				return 'virtual:pterodactyl:navigation';
			}
			if (id === 'pterodactyl:search') {
				return 'virtual:pterodactyl:search';
			}
			if (id === 'pterodactyl:content') {
				return 'virtual:pterodactyl:content';
			}
			return null;
		},

		async load(id) {
			// Virtual module: pterodactyl:config
			if (id === 'virtual:pterodactyl:config') {
				// Inline the resolved config object
				return `
					export const config = ${JSON.stringify(resolvedPteroConfig, null, 2)};
					export default config;
				`;
			}

			// Virtual module: pterodactyl:content
			if (id === 'virtual:pterodactyl:content') {
				return await generateContentModule(root, contentDir);
			}

			// Virtual module: pterodactyl:navigation
			if (id === 'virtual:pterodactyl:navigation') {
				return `
					import { generateSidebar, getPrevNext, generateBreadcrumbs } from 'pterodactyl-core';

					// These will be populated by the consuming app
					export function getSidebar(version) {
						throw new Error('getSidebar must be implemented by your app');
					}

					export function getPrevNextPages(version, slug) {
						return getPrevNext([], '/docs/' + version + '/' + slug);
					}

					export function getBreadcrumbs(path) {
						return generateBreadcrumbs(path);
					}
				`;
			}

			// Virtual module: pterodactyl:search
			if (id === 'virtual:pterodactyl:search') {
				// Generate search index from content at build time
				const contentPath = resolve(root, contentDir);
				const pattern = `${contentPath}/**/*.{md,mdx,svx}`;
				const files = await fg(pattern, { absolute: true });

				// Build docs array with pre-parsed frontmatter (no dynamic imports needed)
				const docsArray = await Promise.all(
					files.map(async (filepath) => {
						const rawContent = await readFile(filepath, 'utf-8');
						const { frontmatter } = parseFrontmatter(rawContent);
						const slug = extractSlug(filepath);
						const version = extractVersion(filepath);

						return `{
	slug: ${JSON.stringify(slug)},
	version: ${JSON.stringify(version)},
	filepath: ${JSON.stringify(filepath)},
	frontmatter: ${JSON.stringify(frontmatter)},
	content: ${JSON.stringify(rawContent)}
}`;
					})
				);

				// Import buildSearchIndex from main exports
				return `
import { buildSearchIndex } from 'pterodactyl-core';

const docs = [
${docsArray.join(',\n')}
];

// Generate search index from docs
const searchIndex = buildSearchIndex(docs, '/docs');

export function getSearchPayload() {
	return searchIndex;
}

export default searchIndex;
			`;
			}

			return null;
		}
	};
}
