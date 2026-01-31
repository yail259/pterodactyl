import type { ParsedDoc } from '../content/types.ts';
import type { VersionConfig } from '../config/types.ts';

/**
 * Generate prerender entries for all docs pages
 */
export function generateEntries(
	docs: ParsedDoc[],
	versionConfig: VersionConfig
): Array<{
	version?: string;
	slug: string;
}> {
	const entries: Array<{ version?: string; slug: string }> = [];

	// Group docs by version
	const docsByVersion = new Map<string, ParsedDoc[]>();
	for (const doc of docs) {
		if (!doc.frontmatter.hidden && !doc.frontmatter.draft) {
			const versionDocs = docsByVersion.get(doc.version) || [];
			versionDocs.push(doc);
			docsByVersion.set(doc.version, versionDocs);
		}
	}

	// Create entries for each version
	for (const [version, versionDocs] of docsByVersion) {
		for (const doc of versionDocs) {
			// Use alias for latest version
			const versionParam =
				version === 'latest' || version === versionConfig.current ? 'latest' : version;

			entries.push({
				version: versionParam,
				slug: doc.slug
			});
		}
	}

	return entries;
}
