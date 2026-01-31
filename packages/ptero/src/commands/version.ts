import { Command } from 'commander';
import path from 'node:path';
import fs from 'fs-extra';
import { confirm, select, isCancel } from '@clack/prompts';
import { log } from '../utils/logger.js';

export function versionCommand() {
	const command = new Command('version');

	command
		.command('create')
		.argument('<version>', 'Version id (e.g., v1.0)')
		.option('--source <dir>', 'Source docs directory', 'src/content/docs')
		.option('--force', 'Overwrite existing version directory', false)
		.option('--dry-run', 'Preview changes', false)
		.action(async (versionId, options) => {
			const cwd = process.cwd();
			const sourceDir = path.resolve(cwd, options.source);
			const targetDir = path.resolve(cwd, 'src/content/versioned_docs', versionId);
			const configPath = path.join(cwd, 'pterodactyl.config.ts');

			if (!(await fs.pathExists(sourceDir))) {
				log.error(`Source docs not found at ${sourceDir}`);
				return;
			}

			if ((await fs.pathExists(targetDir)) && !options.force) {
				const overwrite = await confirm({
					message: `Version ${versionId} already exists. Overwrite?`,
					initialValue: false
				});
				if (isCancel(overwrite) || !overwrite) return;
			}

			const status = await select({
				message: 'Version status',
				options: [
					{ value: 'latest', label: 'latest' },
					{ value: 'next', label: 'next' },
					{ value: 'legacy', label: 'legacy' }
				],
				initialValue: 'legacy'
			});
			if (isCancel(status)) return;

			if (options.dryRun) {
				log.info(
					`[dry-run] Would copy ${sourceDir} -> ${targetDir} and update pterodactyl.config.ts`
				);
				return;
			}

			await fs.copy(sourceDir, targetDir, { overwrite: true });
			log.success(`Created version folder ${targetDir}`);

			if (await fs.pathExists(configPath)) {
				const content = await fs.readFile(configPath, 'utf-8');
				if (content.includes(`id: '${versionId}'`)) {
					log.warn(`Config already contains version ${versionId}; not adding duplicate.`);
				} else {
					const newEntry = `\t\t{ id: '${versionId}', label: '${versionId}', status: '${status}' },\n`;
					let updated = '';
					if (content.includes('available: [')) {
						updated = content.replace(/available:\s*\[/, (m) => `${m}\n${newEntry}`);
					} else {
						updated = content.replace(
							/versions:\s*{/,
							(m) => `${m}\n\tavailable: [\n${newEntry}\t],`
						);
					}
					await fs.writeFile(configPath, updated, 'utf-8');
					log.success('Updated pterodactyl.config.ts');
				}
			} else {
				log.warn('pterodactyl.config.ts not found; please add the new version manually.');
			}
		});

	return command;
}
