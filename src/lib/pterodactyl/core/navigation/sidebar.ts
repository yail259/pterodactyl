import type { DocsSection, DocsSubsection, DocsPage } from './types.ts';
import type { DocMetadata } from '../content/types.ts';
import type { SidebarConfig } from '../config/types.ts';

/**
 * Default section titles mapping
 */
const DEFAULT_SECTION_TITLES: Record<string, string> = {
	'getting-started': 'Getting Started',
	concepts: 'Core Concepts',
	guides: 'Guides',
	components: 'Components',
	api: 'API Reference',
	examples: 'Examples',
	recipes: 'Recipes',
	comparison: 'Comparisons',
	migration: 'Migration',
	contributing: 'Contributing',
	changelog: 'Changelog'
};

/**
 * Default section ordering
 */
const DEFAULT_SECTION_ORDER = [
	'Getting Started',
	'Core Concepts',
	'Guides',
	'Components',
	'Examples',
	'Recipes',
	'API Reference',
	'Comparisons',
	'Migration',
	'Contributing',
	'Changelog'
];

/**
 * Capitalize string
 */
function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
}

/**
 * Get section title from key
 */
function getSectionTitle(key: string): string {
	return DEFAULT_SECTION_TITLES[key] || capitalize(key);
}

/**
 * Get section order index
 */
function getSectionOrderIndex(title: string, customOrder?: string[]): number {
	const order = customOrder || DEFAULT_SECTION_ORDER;
	const idx = order.indexOf(title);
	return idx === -1 ? 999 : idx;
}

/**
 * Generate sidebar navigation structure from doc metadata
 */
export function generateSidebar(docs: DocMetadata[], config?: SidebarConfig): DocsSection[] {
	const sections: Record<string, DocsSection> = {};

	// Helper to get or create section
	const getSection = (key: string) => {
		const title = getSectionTitle(key);
		if (!sections[title]) {
			sections[title] = {
				title,
				items: [],
				subsections: []
			};
		}
		return sections[title];
	};

	// Helper to get or create subsection
	const getSubsection = (section: DocsSection, key: string): DocsSubsection => {
		if (!section.subsections) section.subsections = [];
		const title = capitalize(key);
		let subsection = section.subsections.find((s) => s.id === key);
		if (!subsection) {
			subsection = {
				title,
				id: key,
				items: []
			};
			section.subsections.push(subsection);
		}
		return subsection;
	};

	// Group docs into sections and subsections
	for (const doc of docs) {
		// Determine section
		const sectionKey = doc.section || 'guides';
		const section = getSection(sectionKey);

		const page: DocsPage = {
			title: doc.title,
			href: doc.href,
			sdks: doc.sdks,
			scope: doc.scope,
			order: doc.order || 999
		};

		// Add to subsection or section
		if (doc.subsection) {
			const subsection = getSubsection(section, doc.subsection);
			subsection.items.push(page);
		} else {
			section.items.push(page);
		}
	}

	// Sort sections
	const sortedSections = Object.values(sections).sort((a, b) => {
		const orderA = getSectionOrderIndex(a.title, config?.sectionOrder);
		const orderB = getSectionOrderIndex(b.title, config?.sectionOrder);
		return orderA - orderB;
	});

	// Sort items within each section and subsection
	for (const section of sortedSections) {
		section.items.sort((a, b) => (a.order || 999) - (b.order || 999));

		if (section.subsections) {
			// Sort subsections by custom order or alphabetically
			const subsectionOrder = config?.subsectionOrder?.[section.title.toLowerCase()];
			section.subsections.sort((a, b) => {
				if (subsectionOrder && a.id && b.id) {
					const orderA = subsectionOrder.indexOf(a.id);
					const orderB = subsectionOrder.indexOf(b.id);
					if (orderA !== -1 && orderB !== -1) {
						return orderA - orderB;
					}
				}
				return a.title.localeCompare(b.title);
			});

			// Sort items within subsections
			for (const subsection of section.subsections) {
				subsection.items.sort((a, b) => (a.order || 999) - (b.order || 999));
			}
		}
	}

	return sortedSections;
}
