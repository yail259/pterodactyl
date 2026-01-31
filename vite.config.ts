import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';
import { pterodactyl } from './src/lib/pterodactyl/core/vite/plugin.ts';
import { searchForWorkspaceRoot } from 'vite';
import path from 'node:path';
import config from './pterodactyl.config';

export default defineConfig({
	plugins: [
		sveltekit(),
		pterodactyl({
			config,
			contentDir: 'src/content/docs'
		}),
		devtoolsJson()
	],
	resolve: {
		alias: {
			'pterodactyl-core': path.resolve('./src/lib/pterodactyl/core')
		}
	},
	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()), path.resolve(process.cwd(), 'packages')]
		}
	},
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
