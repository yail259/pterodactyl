import type { PterodactylConfig } from './src/lib/pterodactyl/core';

const config: PterodactylConfig = {
	site: {
		title: 'Pterodactyl',
		description: 'A modern documentation engine built for SvelteKit',
		baseUrl: '/docs'
	},
	versions: {
		current: 'latest',
		available: [
			{ id: 'latest', label: 'v0.1', status: 'latest', releaseDate: '2026-01-31' },
			{ id: 'next', label: 'Next', status: 'next' }
		],
		aliases: {
			latest: 'latest',
			next: 'latest'
		}
	},
	sidebar: {
		sectionOrder: ['Introduction', 'Guides', 'Reference'],
		subsectionOrder: {
			introduction: ['what-is-pterodactyl', 'installation'],
			guides: ['project-structure', 'configuration', 'content-authoring', 'styling'],
			reference: ['cli', 'configuration', 'frontmatter']
		}
	},
	theme: {
		// Use a preset theme (uncomment to try different themes)
		// preset: 'supabase',
		// preset: 'github',
		// preset: 'minimal',
		// Or customize with CSS variables
		// cssVars: {
		// 	'--color-primary': '#3ECF8E',
		// 	'--font-family-base': "'Inter Variable', sans-serif"
		// }
	}
};

export default config;
