import { Command } from 'commander';
import path from 'node:path';
import fs from 'fs-extra';
import { confirm, spinner, isCancel } from '@clack/prompts';
import {
	copyTemplateDir,
	detectPackageJson,
	detectPackageManager,
	detectScriptLanguage,
	isSvelteKitProject
} from '../utils/project.js';
import { resolveTemplate } from '../utils/paths.js';
import {
	patchSvelteConfig,
	patchViteConfig,
	resolveSvelteConfigPath,
	resolveViteConfigPath
} from '../utils/configPatcher.js';
import { log } from '../utils/logger.js';
import {
	installPackages,
	REQUIRED_DEPENDENCIES,
	REQUIRED_DEV_DEPENDENCIES
} from '../utils/install.js';

export function initCommand() {
	const command = new Command('init');

	command
		.description('Install Pterodactyl into an existing SvelteKit project (ShadCN-style)')
		.argument('[dir]', 'Target directory', '.')
		.option('--pm <pm>', 'Package manager to use')
		.option('--base-url <path>', 'Base docs path', '/docs')
		.option('--no-install', 'Skip installing dependencies')
		.option('--force', 'Overwrite existing files', false)
		.action(async (dir, options) => {
			const targetDir = path.resolve(process.cwd(), dir);
			const pkg = detectPackageJson(targetDir);
			if (!pkg) {
				log.error(`No package.json found in ${targetDir}.`);
				return;
			}
			const isKit = isSvelteKitProject(pkg.json as any);
			if (!isKit) {
				const shouldContinue = await confirm({
					message: "@sveltejs/kit isn't detected in dependencies. Continue anyway?",
					initialValue: false
				});
				if (isCancel(shouldContinue) || !shouldContinue) return;
			}

			const pm = (options.pm as string) || detectPackageManager(targetDir);
			const baseUrl = options.baseUrl || '/docs';
			const scriptLang = detectScriptLanguage(targetDir);

			const proceed = await confirm({
				message: `Set up Pterodactyl in ${targetDir}? (pm: ${pm}, base: ${baseUrl})`,
				initialValue: true
			});
			if (isCancel(proceed) || !proceed) return;
			log.info(`Detected ${scriptLang.toUpperCase()} SvelteKit project using ${pm}.`);

			const s = spinner();
			s.start('Copying templates');

			const libTarget = path.join(targetDir, 'src', 'lib', 'pterodactyl');
			const componentsTarget = path.join(targetDir, 'src', 'lib', 'components', 'pterodactyl');
			const routesTarget = path.join(targetDir, 'src', 'routes', 'docs');
			const contentTarget = path.join(targetDir, 'src', 'content', 'docs');

			await fs.mkdirp(libTarget);
			await fs.mkdirp(componentsTarget);
			await fs.mkdirp(routesTarget);
			await fs.mkdirp(contentTarget);

			await copyTemplateDir(resolveTemplate('lib/pterodactyl'), libTarget, {
				overwrite: options.force
			});
			await copyTemplateDir(resolveTemplate('components/pterodactyl'), componentsTarget, {
				overwrite: options.force
			});
			await copyTemplateDir(resolveTemplate('routes/docs'), routesTarget, {
				overwrite: options.force
			});

			// Content: only copy if empty or force
			const contentExists = await fs.pathExists(path.join(contentTarget, 'intro'));
			if (!contentExists || options.force) {
				await copyTemplateDir(resolveTemplate('content/docs'), contentTarget, {
					overwrite: options.force
				});
			}

			// Config file
			const configTarget = path.join(targetDir, 'pterodactyl.config.ts');
			if (!(await fs.pathExists(configTarget)) || options.force) {
				await fs.copy(resolveTemplate('config/pterodactyl.config.ts'), configTarget, {
					overwrite: true
				});
				// align baseUrl
				const configContent = await fs.readFile(configTarget, 'utf-8');
				const updated = configContent.replace(/baseUrl:\s*['"][^'"]+['"]/, `baseUrl: '${baseUrl}'`);
				await fs.writeFile(configTarget, updated, 'utf-8');
			} else {
				log.warn('pterodactyl.config.ts already exists; not overwriting.');
			}

			// Patch configs
			const svelteConfigPath = resolveSvelteConfigPath(targetDir);
			if (svelteConfigPath) {
				patchSvelteConfig(svelteConfigPath);
			} else {
				log.warn('Could not find svelte.config.* to patch.');
			}

			const viteConfigPath = resolveViteConfigPath(targetDir);
			if (viteConfigPath) {
				patchViteConfig(viteConfigPath);
			} else {
				log.warn('Could not find vite.config.* to patch.');
			}

			s.stop('Scaffold complete');

			if (options.install !== false) {
				const installDeps = await confirm({
					message: `Install dependencies with ${pm}?`,
					initialValue: true
				});
				if (isCancel(installDeps)) return;
				if (installDeps) {
					const deps = REQUIRED_DEPENDENCIES.filter((d) => !hasDependency(pkg.json, d));
					const devDeps = REQUIRED_DEV_DEPENDENCIES.filter((d) => !hasDependency(pkg.json, d));
					await installPackages(pm, deps, { dev: false });
					await installPackages(pm, devDeps, { dev: true });
				}
			}

			log.success('Pterodactyl installed.');
			log.info('Next steps:');
			log.info(`- Update baseUrl in pterodactyl.config.ts if needed (current ${baseUrl}).`);
			log.info(`- Run ${pm} dev to start the docs at ${baseUrl}/latest.`);
		});

	return command;
}

function hasDependency(pkgJson: Record<string, any>, dep: string) {
	const deps = { ...(pkgJson.dependencies || {}), ...(pkgJson.devDependencies || {}) };
	return Boolean(deps[dep]);
}
