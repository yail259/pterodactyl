import { z } from 'zod';

const SiteConfigSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	url: z.string().url().optional(),
	baseUrl: z.string().optional(),
	favicon: z.string().optional(),
	logo: z.string().optional()
});

const VersionSchema = z.object({
	id: z.string(),
	label: z.string(),
	status: z.enum(['latest', 'next', 'legacy']),
	releaseDate: z.string().optional()
});

const VersionConfigSchema = z.object({
	current: z.string(),
	available: z.array(VersionSchema),
	aliases: z.record(z.string()).optional()
});

const SidebarConfigSchema = z.object({
	sectionOrder: z.array(z.string()).optional(),
	subsectionOrder: z.record(z.array(z.string())).optional()
});

const SdkConfigSchema = z.object({
	id: z.string(),
	label: z.string(),
	color: z.string().optional()
});

const ThemeConfigSchema = z.object({
	primary: z.string().optional(),
	accent: z.string().optional(),
	colors: z.record(z.string()).optional()
});

const SearchConfigSchema = z.object({
	enabled: z.boolean().optional(),
	placeholder: z.string().optional(),
	hotkeys: z.array(z.string()).optional()
});

export const PterodactylConfigSchema = z.object({
	site: SiteConfigSchema,
	versions: VersionConfigSchema,
	sidebar: SidebarConfigSchema.optional(),
	editUrl: z.union([z.string(), z.function()]).optional(),
	sdks: z.array(SdkConfigSchema).optional(),
	components: z.record(z.any()).optional(),
	theme: ThemeConfigSchema.optional(),
	search: SearchConfigSchema.optional()
});

export type ValidatedConfig = z.infer<typeof PterodactylConfigSchema>;
