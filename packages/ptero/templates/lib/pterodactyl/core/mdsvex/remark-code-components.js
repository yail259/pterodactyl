import { getHighlighter } from './highlighter.js';
function parseMeta(meta) {
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
// Direct plugin - synchronous, uses pre-initialized highlighter
export const remarkCodeComponents = () => {
	return (tree) => {
		const highlighter = getHighlighter();
		const groups = {};
		let usedBlock = false;
		let usedTabs = false;
		walk(tree, (node, parent, index) => {
			if (node.type !== 'code') return;
			if (!parent.children) return;
			const lang = node.lang || 'text';
			const meta = parseMeta(node.meta);
			const source = node.value || '';
			const html = highlighter.codeToHtml(source, {
				lang,
				themes: { light: 'github-light', dark: 'github-dark' }
			});
			if (meta.group) {
				const key = meta.group;
				if (!groups[key]) groups[key] = [];
				groups[key].push({ source, html, lang, title: meta.title });
				parent.children[index] = { type: 'html', value: `<!--group:${key}-->` };
				usedTabs = true;
			} else {
				parent.children[index] = {
					type: 'html',
					value: toCodeBlockComponent(source, html, lang, meta.title)
				};
				usedBlock = true;
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
		if (usedBlock || usedTabs) {
			const imports = `import { ${['CodeBlock', usedTabs ? 'CodeTabs' : null].filter(Boolean).join(', ')} } from 'pterodactyl-core';`;
			if (tree.children) {
				tree.children.unshift({ type: 'mdxjsEsm', value: imports });
			}
		}
	};
};
function toCodeBlockComponent(source, html, lang, title) {
	return `<CodeBlock source={${JSON.stringify(source)}} code={${JSON.stringify(html)}} lang="${lang}"${title ? ` title="${escapeAttr(title)}"` : ''} />`;
}
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
function escapeAttr(str) {
	return str.replace(/"/g, '&quot;');
}
function walk(node, cb) {
	if (!node || !node.children) return;
	for (let i = 0; i < node.children.length; i++) {
		const child = node.children[i];
		cb(child, node, i);
		walk(child, cb);
	}
}
//# sourceMappingURL=remark-code-components.js.map
