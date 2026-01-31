import type { Version, VersionConfig } from '../config/types.ts';

/**
 * Resolve version alias to actual version ID
 * e.g., 'latest' -> 'v1.0', 'next' -> 'v2.0'
 */
export function resolveVersionAlias(versionParam: string, versionConfig: VersionConfig): string {
	const alias = versionConfig.aliases?.[versionParam];
	return alias || versionParam;
}

/**
 * Get version from path parameter and resolve aliases
 */
export function getVersionFromPath(
	versionParam: string | undefined,
	versionConfig: VersionConfig
): Version | null {
	if (!versionParam) {
		return versionConfig.available.find((v) => v.id === versionConfig.current) || null;
	}

	// Resolve alias first
	const resolvedId = resolveVersionAlias(versionParam, versionConfig);

	// Find version
	return versionConfig.available.find((v) => v.id === resolvedId) || null;
}

/**
 * Check if a version or alias exists
 */
export function isValidVersion(versionId: string, versionConfig: VersionConfig): boolean {
	// Check if it's an alias
	if (versionConfig.aliases && versionId in versionConfig.aliases) {
		return true;
	}

	// Check if it's a direct version
	return versionConfig.available.some((v) => v.id === versionId);
}

/**
 * Get latest version
 */
export function getLatestVersion(versionConfig: VersionConfig): Version | null {
	return (
		versionConfig.available.find((v) => v.status === 'latest') || versionConfig.available[0] || null
	);
}

/**
 * Get next version
 */
export function getNextVersion(versionConfig: VersionConfig): Version | null {
	return versionConfig.available.find((v) => v.status === 'next') || null;
}
