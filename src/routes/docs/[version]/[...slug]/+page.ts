import { error } from '@sveltejs/kit';
import { generateBreadcrumbs, getPrevNext } from 'pterodactyl-core';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentData = await parent();
	const { docs, sidebar, site } = parentData;
	const slugSegments = params.slug
		? Array.isArray(params.slug)
			? params.slug
			: [params.slug]
		: [];
	const slug = slugSegments.length === 0 ? 'index' : slugSegments.join('/');
	const version = params.version || 'latest';

	const doc = docs.find((entry) => entry.slug === slug);
	if (!doc) {
		throw error(404, 'Document not found');
	}

	// Dynamically import the markdown component
	const filepath = doc.filepath;
	const component = await import(/* @vite-ignore */ filepath).then((m) => m.default);

	const path = `/docs/${version}/${slug}`.replace(/\/index$/, '');
	const prevNext = getPrevNext(sidebar, path);
	const breadcrumbs = generateBreadcrumbs(path, '/docs');

	return {
		doc: {
			...doc,
			component
		},
		prevNext,
		breadcrumbs,
		currentPath: path,
		siteTitle: site?.title ?? 'Pterodactyl Docs'
	};
};
