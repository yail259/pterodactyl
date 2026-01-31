/// <reference types="vite/client" />

declare module 'pterodactyl:content' {
	import type { ParsedDoc } from 'pterodactyl-core';

	export const docs: ParsedDoc[];
	export default docs;
}

declare module 'pterodactyl:config' {
	import type { PterodactylConfig } from 'pterodactyl-core';

	export const config: PterodactylConfig;
	export default config;
}

declare module 'pterodactyl:navigation' {
	export function getSidebar(version: string): unknown;
	export function getPrevNextPages(version: string, slug: string): unknown;
	export function getBreadcrumbs(path: string): unknown;
}

declare module 'pterodactyl:search' {
	import type { SearchIndex } from 'pterodactyl-core';

	export function getSearchPayload(): SearchIndex;
}
