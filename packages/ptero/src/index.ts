#!/usr/bin/env node
import { Command } from 'commander';
import { intro, outro } from '@clack/prompts';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { versionCommand } from './commands/version.js';
import { searchCommand } from './commands/search.js';
import pkg from '../package.json' assert { type: 'json' };

const program = new Command();

intro('ptero');

program
	.name('ptero')
	.description('ShadCN-style CLI to add Pterodactyl to SvelteKit projects')
	.version(pkg.version || '0.0.0');

program.addCommand(initCommand());
program.addCommand(addCommand());
program.addCommand(versionCommand());
program.addCommand(searchCommand());

program.parseAsync().finally(() => {
	outro('Done');
});
