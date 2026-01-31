/**
 * Search entry for indexing
 */
export interface SearchEntry {
	id: string;
	title: string;
	description?: string;
	content: string;
	section?: string;
	subsection?: string;
	version: string;
	href: string;
	keywords?: string[];
}

/**
 * Search index payload
 */
export interface SearchIndex {
	entries: SearchEntry[];
	fuseIndex?: any;
}

/**
 * Search result with highlighting
 */
export interface SearchResult extends SearchEntry {
	matches?: any[];
	score?: number;
}
