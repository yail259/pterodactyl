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
			{ id: 'latest', label: 'v0.1 alpha', status: 'latest', releaseDate: '2024-12-01' },
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
	}
};

export default config;
