export interface DocsPage {
	title: string;
	href: string;
	sdks?: string[];
	external?: boolean;
	scope?: string;
	order?: number;
}

export interface DocsSubsection {
	title: string;
	id?: string;
	items: DocsPage[];
	comingSoon?: boolean;
}

export interface DocsSection {
	title: string;
	items: DocsPage[];
	subsections?: DocsSubsection[];
}

export interface PrevNext {
	prev: DocsPage | null;
	next: DocsPage | null;
}

export interface Breadcrumb {
	label: string;
	href?: string;
}
