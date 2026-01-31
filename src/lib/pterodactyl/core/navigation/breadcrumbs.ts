import type { Breadcrumb } from './types.ts';

/**
 * Generate breadcrumb trail from path
 */
export function generateBreadcrumbs(path: string, baseUrl = '/docs'): Breadcrumb[] {
	const breadcrumbs: Breadcrumb[] = [];

	// Remove base URL and split path
	const relativePath = path.replace(new RegExp(`^${baseUrl}`), '').replace(/^\//, '');
	const parts = relativePath.split('/').filter(Boolean);

	// Add home
	breadcrumbs.push({
		label: 'Docs',
		href: baseUrl
	});

	// Build breadcrumbs from path parts
	let currentPath = baseUrl;
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		currentPath += `/${part}`;

		// Format label (capitalize and replace hyphens)
		const label = part
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		// Last item shouldn't have href (current page)
		breadcrumbs.push({
			label,
			href: i === parts.length - 1 ? undefined : currentPath
		});
	}

	return breadcrumbs;
}
