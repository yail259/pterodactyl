/**
 * Main Pterodactyl configuration
 */
export interface PterodactylConfig {
	/** Site metadata */
	site: SiteConfig;

	/** Version configuration */
	versions: VersionConfig;

	/** Sidebar configuration */
	sidebar?: SidebarConfig;

	/** Edit link configuration */
	editUrl?: string | ((params: EditUrlParams) => string);

	/** SDK/scope configuration */
	sdks?: SdkConfig[];

	/** Component overrides for MDsveX */
	components?: Record<string, any>;

	/** Theme configuration */
	theme?: ThemeConfig;

	/** Search configuration */
	search?: SearchConfig;
}

export interface SiteConfig {
	title: string;
	description?: string;
	url?: string;
	baseUrl?: string;
	favicon?: string;
	logo?: string;
}

export interface VersionConfig {
	current: string;
	available: Version[];
	aliases?: Record<string, string>;
}

export interface Version {
	id: string;
	label: string;
	status: 'latest' | 'next' | 'legacy';
	releaseDate?: string;
}

export interface SidebarConfig {
	sectionOrder?: string[];
	subsectionOrder?: Record<string, string[]>;
}

export interface EditUrlParams {
	version: string;
	slug: string;
}

export interface SdkConfig {
	id: string;
	label: string;
	color?: string;
}

export interface ThemeConfig {
	/** CSS custom properties to override (e.g., { '--color-primary': '#3ECF8E' }) */
	cssVars?: Record<string, string>;

	/** Named theme preset to use */
	preset?: 'default' | 'supabase' | 'github' | string;

	/** @deprecated Use cssVars instead */
	primary?: string;
	/** @deprecated Use cssVars instead */
	accent?: string;
	/** @deprecated Use cssVars instead */
	colors?: Record<string, string>;
}

export interface SearchConfig {
	enabled?: boolean;
	placeholder?: string;
	hotkeys?: string[];
}

/**
 * Default configuration values
 */
export const defaultConfig: Partial<PterodactylConfig> = {
	site: {
		title: 'Documentation',
		baseUrl: '/'
	},
	versions: {
		current: 'latest',
		available: [
			{
				id: 'latest',
				label: 'Latest',
				status: 'latest'
			}
		],
		aliases: {
			latest: 'latest'
		}
	},
	search: {
		enabled: true,
		placeholder: 'Search docs...',
		hotkeys: ['ctrl+k', 'cmd+k']
	}
};
