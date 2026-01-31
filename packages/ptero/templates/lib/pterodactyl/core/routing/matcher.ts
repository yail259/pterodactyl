import type { VersionConfig } from '../config/types.ts';
import { isValidVersion } from './version.ts';

/**
 * Create SvelteKit param matcher for version validation
 */
export function createVersionMatcher(versionConfig: VersionConfig) {
	return function match(param: string): boolean {
		return isValidVersion(param, versionConfig);
	};
}
