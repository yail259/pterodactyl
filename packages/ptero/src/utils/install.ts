import execa from 'execa';
import type { PackageManager } from './project.js';

export const REQUIRED_DEV_DEPENDENCIES = [
	'mdsvex',
	'shiki',
	'rehype-slug',
	'rehype-autolink-headings',
	'gray-matter',
	'fast-glob',
	'fuse.js',
	'github-slugger',
	'zod',
	'@sveltejs/adapter-auto'
];

export const REQUIRED_DEPENDENCIES = ['@lucide/svelte'];

export async function installPackages(pm: PackageManager, deps: string[], { dev = false } = {}) {
	if (deps.length === 0) return;

	const args: string[] = [];
	if (pm === 'pnpm') {
		args.push('add');
		if (dev) args.push('-D');
		args.push(...deps);
	} else if (pm === 'npm') {
		args.push('install');
		if (dev) args.push('--save-dev');
		args.push(...deps);
	} else if (pm === 'yarn') {
		args.push('add');
		if (dev) args.push('-D');
		args.push(...deps);
	} else if (pm === 'bun') {
		args.push('add');
		if (dev) args.push('-d');
		args.push(...deps);
	}

	await execa(pm, args, { stdio: 'inherit' });
}
