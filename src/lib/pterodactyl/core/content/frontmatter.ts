import { z } from 'zod';
import matter from 'gray-matter';
import type { DocFrontmatter } from './types.ts';

/**
 * Zod schema for frontmatter validation
 */
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

/**
 * Parse and validate frontmatter from markdown content
 */
export function parseFrontmatter(content: string): {
	frontmatter: DocFrontmatter;
	content: string;
} {
	const { data, content: markdownContent } = matter(content);

	try {
		const validated = FrontmatterSchema.parse(data);
		return {
			frontmatter: validated,
			content: markdownContent
		};
	} catch (error) {
		console.error('Invalid frontmatter:', error);
		throw new Error(`Frontmatter validation failed: ${error}`);
	}
}

/**
 * Validate frontmatter without parsing content
 */
export function validateFrontmatter(data: unknown): DocFrontmatter {
	return FrontmatterSchema.parse(data);
}
