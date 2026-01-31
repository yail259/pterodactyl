import { Command } from 'commander';
import path from 'node:path';
import fs from 'fs-extra';
import fg from 'fast-glob';
import { multiselect, confirm, isCancel } from '@clack/prompts';
import { resolveTemplate } from '../utils/paths.js';
import { log } from '../utils/logger.js';

export function addCommand() {
	const command = new Command('add');

	command
		.description('Add Pterodactyl components to your project (ShadCN-style copier)')
		.argument('[components...]', 'Component names to add')
		.option('--path <dir>', 'Destination directory', 'src/lib/components/pterodactyl')
		.option('--dry-run', 'Preview without writing files', false)
		.action(async (components: string[], options) => {
			const targetDir = path.resolve(process.cwd(), options.path);
			const templatesDir = resolveTemplate('components/pterodactyl');
			const available = await fg(['**/*.{svelte,ts}'], {
				cwd: templatesDir,
				ignore: ['**/*.d.ts']
			});

			let selected = components;
			if (!selected || selected.length === 0) {
				const choice = await multiselect({
					message: 'Select components to add',
					options: available.map((c) => ({ value: c, label: c })),
					required: true
				});
				if (isCancel(choice)) return;
				selected = choice as string[];
			}

			const missing = selected.filter((name) => !available.includes(name));
			if (missing.length) {
				log.error(`Unknown components: ${missing.join(', ')}`);
				log.info(`Available: ${available.join(', ')}`);
				return;
			}

			if (options.dryRun) {
				log.info(`[dry-run] Would copy ${selected.join(', ')} to ${targetDir}`);
				return;
			}

			for (const name of selected) {
				const from = path.join(templatesDir, name);
				const to = path.join(targetDir, name);
				await fs.mkdirp(path.dirname(to));
				const exists = await fs.pathExists(to);
				if (exists) {
					const overwrite = await confirm({
						message: `${name} already exists. Overwrite?`,
						initialValue: false
					});
					if (isCancel(overwrite)) return;
					if (!overwrite) {
						log.warn(`Skipped ${name}`);
						continue;
					}
				}
				await fs.copy(from, to, { overwrite: true });
				log.success(`Added ${name}`);
			}
		});

	return command;
}
