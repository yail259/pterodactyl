import { getHighlighter } from './highlighter.js';

const DEBUG = typeof process !== 'undefined' && process?.env?.PTERO_DEBUG_CODEBLOCKS === '1';

/** @typedef {{ type: string; value?: string; lang?: string; meta?: string; children?: ASTNode[] }} ASTNode */
/** @typedef {{ title?: string; group?: string; lang?: string }} FenceMeta */

/**
 * @param {string | null | undefined} meta
 * @returns {FenceMeta}
 */
function parseMeta(meta) {
	/** @type {FenceMeta} */
	const result = {};
	if (!meta) return result;
	const parts = meta.split(/\s+/).filter(Boolean);
	for (const part of parts) {
		const [k, v] = part.split('=');
		if (k === 'title') result.title = v;
		if (k === 'group') result.group = v;
	}
	return result;
}

/**
 * Remark plugin - expects highlighter to be initialized
 */
export const remarkCodeComponents = () => {
	// Must be synchronous for mdsvex to handle it correctly before emitting HTML
	return (/** @type {ASTNode} */ tree) => {
		// This will throw if not initialized - initialization must happen in Vite plugin
		const highlighter = getHighlighter();

		/** @type {Record<string, Array<{ source: string; html: string; lang: string; title?: string }>>} */
		const groups = {};
		walk(tree, (node, parent, index) => {
			if (node.type !== 'code') return;
			if (!parent.children) return;
			const lang = node.lang || 'text';
			const meta = parseMeta(node.meta);
			const source = node.value || '';
			if (DEBUG) {
				console.log('[mdsvex] highlight block', {
					lang,
					title: meta.title,
					group: meta.group,
					length: source.length
				});
			}
			const html = highlighter.codeToHtml(source, {
				lang,
				themes: { light: 'github-light', dark: 'one-dark-pro' }
			});

			if (meta.group) {
				const key = meta.group;
				if (!groups[key]) groups[key] = [];
				groups[key].push({ source, html, lang, title: meta.title });
				parent.children[index] = { type: 'html', value: `<!--group:${key}-->` };
			} else {
				parent.children[index] = {
					type: 'html',
					value: toCodeBlockComponent(source, html, lang, meta.title)
				};
			}
		});

		walk(tree, (node, parent, index) => {
			if (node.type !== 'html' || typeof node.value !== 'string') return;
			if (!parent.children) return;
			const match = node.value.match(/<!--group:(.+?)-->/);
			if (match) {
				const key = match[1];
				const tabs = groups[key] || [];
				parent.children[index] = { type: 'html', value: toCodeTabsComponent(tabs) };
			}
		});

		// Import injection handled by svelte.config.js preprocessor
		// if (usedBlock || usedTabs) { ... }
	};
};

/**
 * @param {string} source
 * @param {string} html
 * @param {string} lang
 * @param {string} [title]
 * @returns {string}
 */
function toCodeBlockComponent(source, html, lang, title) {
	return `<CodeBlock source={${JSON.stringify(source)}} code={${JSON.stringify(html)}} lang="${lang}"${title ? ` title="${escapeAttr(title)}"` : ''} />`;
}

/**
 * @param {Array<{ source: string; html: string; lang: string; title?: string }>} tabs
 * @returns {string}
 */
function toCodeTabsComponent(tabs) {
	const serialized = JSON.stringify(
		tabs.map((t) => ({
			label: t.title || t.lang,
			source: t.source,
			code: t.html,
			lang: t.lang
		}))
	);
	return `<CodeTabs tabs={${serialized}} />`;
}

/**
 * @param {string} str
 * @returns {string}
 */
function escapeAttr(str) {
	return str.replace(/"/g, '&quot;');
}

/**
 * @param {ASTNode} node
 * @param {(node: ASTNode, parent: ASTNode, index: number) => void} cb
 */
function walk(node, cb) {
	if (!node || !node.children) return;
	for (let i = 0; i < node.children.length; i++) {
		const child = node.children[i];
		cb(child, node, i);
		walk(child, cb);
	}
}
