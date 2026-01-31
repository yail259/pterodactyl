import { error } from '@sveltejs/kit';
import { generateBreadcrumbs, getPrevNext } from 'pterodactyl-core';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params }) => {
	const parentData = await parent();
	const { docs, sidebar, site } = parentData;
	const slug = 'index';
	const version = params.version || 'latest';

	const doc = docs.find((entry) => entry.slug === slug);
	const resolvedDoc = doc ?? docs[0];
	if (!resolvedDoc) throw error(404, 'Document not found');

	// Dynamically import the markdown component
	const filepath = resolvedDoc.filepath;
	const component = await import(/* @vite-ignore */ filepath).then((m) => m.default);

	const path = `/docs/${version}/${resolvedDoc.slug}`.replace(/\/index$/, '');
	const prevNext = getPrevNext(sidebar, path);
	const breadcrumbs = generateBreadcrumbs(path, '/docs');

	return {
		doc: {
			...resolvedDoc,
			component
		},
		prevNext,
		breadcrumbs,
		currentPath: path,
		siteTitle: site?.title ?? 'Pterodactyl Docs'
	};
};
