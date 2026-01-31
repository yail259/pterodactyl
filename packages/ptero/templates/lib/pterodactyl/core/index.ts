// Core exports
export * from './config/index.ts';
export * from './content/index.ts';
export * from './navigation/index.ts';
export * from './routing/index.ts';
export * from './search/index.ts';
export * from './mdsvex/index.ts';
export * from './components/index.ts';

// Re-export types for convenience
export type {
	PterodactylConfig,
	SiteConfig,
	VersionConfig,
	Version,
	SidebarConfig,
	SdkConfig,
	ThemeConfig,
	SearchConfig
} from './config/types.ts';

export type { DocFrontmatter, ParsedDoc, DocMetadata } from './content/types.ts';

export type {
	DocsPage,
	DocsSection,
	DocsSubsection,
	PrevNext,
	Breadcrumb
} from './navigation/types.ts';

export type { SearchEntry, SearchIndex, SearchResult } from './search/types.ts';
