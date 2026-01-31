import type { DocsSection, DocsPage, PrevNext } from './types.ts';

/**
 * Flatten navigation sections into a flat list of pages
 */
export function flattenNavigation(sections: DocsSection[]): DocsPage[] {
	const pages: DocsPage[] = [];

	for (const section of sections) {
		pages.push(...section.items);

		if (section.subsections) {
			for (const subsection of section.subsections) {
				pages.push(...subsection.items);
			}
		}
	}

	return pages;
}

/**
 * Normalize path for comparison (remove version prefix)
 */
function normalizePath(path: string): string {
	return path.replace(/\/docs\/(latest|next|v[\d.]+)\//, '/docs/');
}

/**
 * Extract version from path
 */
function extractVersion(path: string): string | null {
	const match = path.match(/\/docs\/(latest|next|v[\d.]+)\//);
	return match ? match[1] : null;
}

/**
 * Add version to href to match current path's version
 */
function addVersionToHref(href: string, currentPath: string): string {
	const version = extractVersion(currentPath);
	if (version && !href.includes(version)) {
		return href.replace('/docs/latest/', `/docs/${version}/`);
	}
	return href;
}

/**
 * Get previous and next pages for navigation
 */
export function getPrevNext(sections: DocsSection[], currentPath: string): PrevNext {
	const flatPages = flattenNavigation(sections);
	const normalizedPath = normalizePath(currentPath);

	const index = flatPages.findIndex((page) => {
		const normalizedHref = normalizePath(page.href);
		return normalizedHref === normalizedPath;
	});

	const prevItem = index > 0 ? flatPages[index - 1] : null;
	const nextItem = index < flatPages.length - 1 ? flatPages[index + 1] : null;

	return {
		prev: prevItem ? { ...prevItem, href: addVersionToHref(prevItem.href, currentPath) } : null,
		next: nextItem ? { ...nextItem, href: addVersionToHref(nextItem.href, currentPath) } : null
	};
}
