/**
 * Document frontmatter schema
 */
export interface DocFrontmatter {
	title: string;
	description?: string;
	section?: string;
	subsection?: string;
	order?: number;
	scope?: string;
	sdks?: string[];
	hidden?: boolean;
	draft?: boolean;
	editUrl?: string;
}

/**
 * Parsed document with metadata
 */
export interface ParsedDoc {
	slug: string;
	filepath: string;
	frontmatter: DocFrontmatter;
	content: string;
	version: string;
	component?: any;
}

/**
 * Doc metadata for navigation
 */
export interface DocMetadata {
	title: string;
	href: string;
	section?: string;
	subsection?: string;
	order?: number;
	sdks?: string[];
	scope?: string;
	description?: string;
}
