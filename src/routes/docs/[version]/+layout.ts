import type { LayoutLoad } from './$types';
import type { DocMetadata, DocFrontmatter } from 'pterodactyl-core';
import { docToMetadata, generateSidebar } from 'pterodactyl-core';
import { docs as parsedDocs } from 'pterodactyl:content';
import { config } from 'pterodactyl:config';

type DocEntry = {
	slug: string;
	version: string;
	metadata: DocMetadata;
	frontmatter: DocFrontmatter;
	filepath: string;
};

// Filter out hidden/draft docs and convert to DocEntry format
const docs: DocEntry[] = parsedDocs
	.filter((doc) => !doc.frontmatter.hidden && !doc.frontmatter.draft)
	.map((doc) => ({
		slug: doc.slug,
		version: doc.version,
		metadata: docToMetadata(doc, '/docs'),
		frontmatter: doc.frontmatter,
		filepath: doc.filepath
	}));

function resolveVersionSlug(slug: string): string {
	const aliases = config.versions.aliases || {};
	return aliases[slug] || slug;
}

export const load: LayoutLoad = async ({ params, url }) => {
	const requestedVersion = params.version || config.versions.current || 'latest';
	const canonicalVersion = resolveVersionSlug(requestedVersion);

	let filteredDocs = docs.filter((doc) => doc.version === canonicalVersion);

	// Fallback to latest docs if version folder not generated yet
	if (filteredDocs.length === 0 && canonicalVersion !== 'latest') {
		filteredDocs = docs.filter((doc) => doc.version === 'latest');
	}

	const sidebar = generateSidebar(
		filteredDocs.map((doc) => doc.metadata),
		config.sidebar
	);

	return {
		version: requestedVersion,
		sidebar,
		docs: filteredDocs,
		currentPath: url.pathname,
		site: config.site,
		versions: config.versions.available,
		theme: config.theme
	};
};
