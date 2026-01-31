import type { ParsedDoc, DocMetadata } from './types.ts';
import { parseFrontmatter } from './frontmatter.ts';

/**
 * Extract slug from file path
 * Examples:
 *   /src/content/docs/getting-started/installation.md -> getting-started/installation
 *   /src/content/versioned_docs/v1.0/api/core.md -> api/core
 */
export function extractSlug(filepath: string): string {
	// Remove /src/content/docs/ or /src/content/versioned_docs/vX.Y/
	let slug = filepath
		.replace(/^.*\/src\/content\/docs\//, '')
		.replace(/^.*\/src\/content\/versioned_docs\/[^/]+\//, '')
		.replace(/\.mdx?$/, '')
		.replace(/\.svx$/, '');

	// Remove /index suffix
	if (slug.endsWith('/index')) {
		slug = slug.slice(0, -6);
	}

	return slug || 'index';
}

/**
 * Extract version from file path
 * Examples:
 *   /src/content/versioned_docs/v1.0/api/core.md -> v1.0
 *   /src/content/docs/api/core.md -> latest
 */
export function extractVersion(filepath: string): string {
	const match = filepath.match(/\/versioned_docs\/([^/]+)\//);
	return match ? match[1] : 'latest';
}

/**
 * Load and parse a single document
 */
export function parseDocument(filepath: string, rawContent: string, component?: any): ParsedDoc {
	const { frontmatter, content } = parseFrontmatter(rawContent);
	const slug = extractSlug(filepath);
	const version = extractVersion(filepath);

	return {
		slug,
		filepath,
		frontmatter,
		content,
		version,
		component
	};
}

/**
 * Convert parsed doc to navigation metadata
 */
export function docToMetadata(doc: ParsedDoc, baseUrl = '/docs'): DocMetadata {
	const versionPath = doc.version === 'latest' ? 'latest' : doc.version;
	const href = `${baseUrl}/${versionPath}/${doc.slug}`.replace(/\/index$/, '');

	return {
		title: doc.frontmatter.title,
		href,
		section: doc.frontmatter.section,
		subsection: doc.frontmatter.subsection,
		order: doc.frontmatter.order,
		sdks: doc.frontmatter.sdks,
		scope: doc.frontmatter.scope,
		description: doc.frontmatter.description
	};
}
