import { Command } from 'commander';
import path from 'node:path';
import fs from 'fs-extra';
import fg from 'fast-glob';
import matter from 'gray-matter';
import Fuse from 'fuse.js';
import { log } from '../utils/logger.js';
import { z } from 'zod';

const FrontmatterSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	section: z.string().optional(),
	subsection: z.string().optional(),
	order: z.number().optional(),
	scope: z.string().optional(),
	sdks: z.array(z.string()).optional(),
	hidden: z.boolean().optional(),
	draft: z.boolean().optional(),
	editUrl: z.string().optional()
});

const defaultFuseConfig: Fuse.IFuseOptions<SearchEntry> = {
	keys: [
		{ name: 'title', weight: 3 },
		{ name: 'description', weight: 2 },
		{ name: 'content', weight: 1 }
	],
	threshold: 0.35
};

type ParsedDoc = {
	slug: string;
	version: string;
	filepath: string;
	frontmatter: z.infer<typeof FrontmatterSchema>;
	content: string;
};

type SearchEntry = {
	id: string;
	title: string;
	description?: string;
	content: string;
	section?: string;
	subsection?: string;
	version: string;
	href: string;
	keywords: string[];
};

type SearchIndex = {
	entries: SearchEntry[];
	fuseIndex: Fuse.FuseIndexJSON;
};

function extractSlug(filepath: string): string {
	let slug = filepath
		.replace(/^.*\/src\/content\/docs\//, '')
		.replace(/^.*\/src\/content\/versioned_docs\/[^/]+\//, '')
		.replace(/\.mdx?$/, '')
		.replace(/\.svx$/, '');
	if (slug.endsWith('/index')) slug = slug.slice(0, -6);
	return slug || 'index';
}

function extractVersion(filepath: string): string {
	const match = filepath.match(/\/versioned_docs\/([^/]+)\//);
	return match ? match[1] : 'latest';
}

function stripMarkdown(content: string): string {
	return content
		.replace(/```[\s\S]*?```/g, '')
		.replace(/`[^`]+`/g, '')
		.replace(/#{1,6}\s+/g, '')
		.replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
		.replace(/<[^>]+>/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

function createSearchEntry(doc: ParsedDoc, baseUrl: string): SearchEntry {
	const versionPath = doc.version === 'latest' ? 'latest' : doc.version;
	const href = `${baseUrl}/${versionPath}/${doc.slug}`.replace(/\/index$/, '');
	const strippedContent = stripMarkdown(doc.content);
	const truncated =
		strippedContent.length > 500 ? strippedContent.slice(0, 500) + '...' : strippedContent;

	return {
		id: `${doc.version}:${doc.slug}`,
		title: doc.frontmatter.title,
		description: doc.frontmatter.description,
		content: truncated,
		section: doc.frontmatter.section,
		subsection: doc.frontmatter.subsection,
		version: doc.version,
		href,
		keywords: []
	};
}

export function searchCommand() {
	const command = new Command('search');

	command
		.command('build')
		.option('--base-url <path>', 'Docs base URL', '/docs')
		.option('-o, --output <path>', 'Output JSON path', 'static/search-index.json')
		.action(async (options) => {
			const cwd = process.cwd();
			const patterns = [
				path.join(cwd, 'src/content/docs/**/*.{md,mdx,svx}'),
				path.join(cwd, 'src/content/versioned_docs/**/*.{md,mdx,svx}')
			];

			const files = await fg(patterns, { absolute: true });
			if (!files.length) {
				log.warn('No docs found to index.');
				return;
			}

			const docs: ParsedDoc[] = [];
			for (const file of files) {
				const raw = await fs.readFile(file, 'utf-8');
				const { data, content } = matter(raw);
				const frontmatter = FrontmatterSchema.parse(data);
				const slug = extractSlug(file);
				const version = extractVersion(file);
				docs.push({ slug, version, filepath: file, frontmatter, content });
			}

			const entries = docs
				.filter((doc) => !doc.frontmatter.hidden && !doc.frontmatter.draft)
				.map((doc) => createSearchEntry(doc, options.baseUrl));

			const fuse = new Fuse(entries, defaultFuseConfig);
			const searchIndex: SearchIndex = {
				entries,
				fuseIndex: fuse.getIndex().toJSON()
			};

			const outputPath = path.resolve(cwd, options.output);
			await fs.mkdirp(path.dirname(outputPath));
			await fs.writeJson(outputPath, searchIndex, { spaces: 2 });
			log.success(`Search index written to ${outputPath} (${entries.length} entries)`);
		});

	return command;
}
