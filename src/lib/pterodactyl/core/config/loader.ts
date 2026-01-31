import { PterodactylConfigSchema, type ValidatedConfig } from './schema.ts';
import type { PterodactylConfig } from './types.ts';
import { defaultConfig } from './types.ts';

/**
 * Merge user config with defaults and validate
 */
export function mergeConfig(userConfig: Partial<PterodactylConfig>): PterodactylConfig {
	// Merge with defaults
	const merged: PterodactylConfig = {
		...defaultConfig,
		...userConfig,
		site: {
			...defaultConfig.site,
			...userConfig.site
		},
		versions: {
			...defaultConfig.versions,
			...userConfig.versions
		},
		search: {
			...defaultConfig.search,
			...userConfig.search
		}
	} as PterodactylConfig;

	// Validate configuration
	try {
		PterodactylConfigSchema.parse(merged);
	} catch (error) {
		console.error('Invalid Pterodactyl configuration:', error);
		throw error;
	}

	return merged;
}

/**
 * Validate configuration without loading from file
 */
export function validateConfig(config: unknown): ValidatedConfig {
	return PterodactylConfigSchema.parse(config);
}
