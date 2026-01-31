import Fuse from 'fuse.js';
import type { ParsedDoc } from '../content/types.ts';
import type { SearchEntry, SearchIndex } from './types.ts';
import { defaultFuseConfig } from './fuse-config.ts';

/**
 * Strip markdown formatting from content
 */
function stripMarkdown(content: string): string {
	return (
		content
			// Remove code blocks
			.replace(/```[\s\S]*?```/g, '')
			// Remove inline code
			.replace(/`[^`]+`/g, '')
			// Remove headings
			.replace(/#{1,6}\s+/g, '')
			// Remove bold/italic
			.replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
			// Remove links but keep text
			.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
			// Remove images
			.replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
			// Remove HTML tags
			.replace(/<[^>]+>/g, '')
			// Normalize whitespace
			.replace(/\s+/g, ' ')
			.trim()
	);
}

/**
 * Create search entry from parsed document
 */
export function createSearchEntry(doc: ParsedDoc, baseUrl = '/docs'): SearchEntry {
	const versionPath = doc.version === 'latest' ? 'latest' : doc.version;
	const href = `${baseUrl}/${versionPath}/${doc.slug}`.replace(/\/index$/, '');

	// Strip markdown and truncate content for search
	const strippedContent = stripMarkdown(doc.content);
	const truncatedContent =
		strippedContent.length > 500 ? strippedContent.slice(0, 500) + '...' : strippedContent;

	return {
		id: `${doc.version}:${doc.slug}`,
		title: doc.frontmatter.title,
		description: doc.frontmatter.description,
		content: truncatedContent,
		section: doc.frontmatter.section,
		subsection: doc.frontmatter.subsection,
		version: doc.version,
		href,
		keywords: [] // Can be extracted from content or frontmatter
	};
}

/**
 * Build search index from documents
 */
export function buildSearchIndex(
	docs: ParsedDoc[],
	baseUrl = '/docs',
	fuseConfig = defaultFuseConfig
): SearchIndex {
	// Create search entries
	const entries = docs
		.filter((doc) => !doc.frontmatter.hidden && !doc.frontmatter.draft)
		.map((doc) => createSearchEntry(doc, baseUrl));

	// Build Fuse index
	const fuseIndex = Fuse.createIndex(fuseConfig.keys || [], entries);

	return {
		entries,
		fuseIndex: fuseIndex.toJSON()
	};
}

/**
 * Search entries using Fuse.js
 */
export function searchEntries(
	query: string,
	searchIndex: SearchIndex,
	fuseConfig = defaultFuseConfig
) {
	const fuse = new Fuse(
		searchIndex.entries,
		fuseConfig,
		searchIndex.fuseIndex ? Fuse.parseIndex(searchIndex.fuseIndex) : undefined
	);

	return fuse.search(query);
}
