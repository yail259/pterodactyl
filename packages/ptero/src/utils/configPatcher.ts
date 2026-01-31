import path from 'node:path';
import fs from 'fs-extra';
import { log } from './logger.js';

function ensureImport(content: string, importLine: string) {
	if (content.includes(importLine)) return content;
	return `${importLine}\n${content}`;
}

function ensureExtensionsBlock(content: string) {
	if (content.includes('mdsvexConfig.extensions')) return content;
	const match = content.match(/extensions:\s*\[([^\]]*)\]/);
	if (match) {
		const full = match[0];
		const updated = "extensions: ['.svelte', ...(mdsvexConfig.extensions || [])]";
		return content.replace(full, updated);
	}
	// fallback: insert near config start
	return content.replace(
		/const config\s*=\s*{/,
		(m) => `${m}\n\textensions: ['.svelte', ...(mdsvexConfig.extensions || [])],`
	);
}

export function patchSvelteConfig(configPath: string) {
	if (!fs.existsSync(configPath)) {
		log.warn(`svelte.config not found at ${configPath}, skipping patch`);
		return;
	}
	let content = fs.readFileSync(configPath, 'utf-8');

	content = ensureImport(content, "import { mdsvex } from 'mdsvex';");
	content = ensureImport(
		content,
		"import { createMdsvexConfig } from './src/lib/pterodactyl/core/mdsvex/index.js';"
	);

	if (!content.includes('const mdsvexConfig')) {
		content = content.replace(
			/(^|\n)(const config)/,
			`\nconst mdsvexConfig = createMdsvexConfig();$1$2`
		);
	}

	if (!content.includes('mdsvex(mdsvexConfig)')) {
		const preprocessMatch = content.match(/preprocess:\s*\[([^\]]*)\]/);
		if (preprocessMatch) {
			const full = preprocessMatch[0];
			const entries = preprocessMatch[1].trim();
			const updatedEntries = entries.length
				? `${entries}, mdsvex(mdsvexConfig)`
				: 'mdsvex(mdsvexConfig)';
			content = content.replace(full, `preprocess: [${updatedEntries}]`);
		} else {
			content = content.replace(/kit:\s*{/, `preprocess: [mdsvex(mdsvexConfig)],\n\tkit: {`);
		}
	}

	content = ensureExtensionsBlock(content);

	if (!content.includes("alias: {\n\t\t'pterodactyl-core': 'src/lib/pterodactyl/core'")) {
		const aliasBlock = "alias: {\n\t\t\t'pterodactyl-core': 'src/lib/pterodactyl/core'\n\t\t}";
		if (content.includes('alias: {')) {
			content = content.replace(/alias:\s*{([^}]*)}/, (m, inner) => {
				if (inner.includes('pterodactyl-core')) return m;
				return `alias: {${inner},\n\t\t\t'pterodactyl-core': 'src/lib/pterodactyl/core'\n\t\t}`;
			});
		} else if (content.includes('kit: {')) {
			content = content.replace(/kit:\s*{/, `kit: {\n\t\t${aliasBlock},\n`);
		}
	}

	fs.writeFileSync(configPath, content, 'utf-8');
}

function ensurePathImport(content: string) {
	if (content.includes("from 'node:path'") || content.includes("from 'path'")) return content;
	return "import path from 'node:path';\n" + content;
}

function ensureConfigImport(content: string) {
	if (content.match(/from ['"]\.\/pterodactyl\.config['"]/)) return content;
	return "import pteroConfig from './pterodactyl.config';\n" + content;
}

export function patchViteConfig(configPath: string) {
	if (!fs.existsSync(configPath)) {
		log.warn(`vite.config not found at ${configPath}, skipping patch`);
		return;
	}
	let content = fs.readFileSync(configPath, 'utf-8');

	content = ensureImport(
		content,
		"import { pterodactyl } from './src/lib/pterodactyl/core/vite/plugin.ts';"
	);
	content = ensureConfigImport(content);
	content = ensurePathImport(content);

	if (
		!content.includes(
			"alias: {\n\t\t\t'pterodactyl-core': path.resolve('./src/lib/pterodactyl/core')"
		)
	) {
		if (content.includes('alias: {')) {
			content = content.replace(/alias:\s*{([^}]*)}/, (m, inner) => {
				if (inner.includes('pterodactyl-core')) return m;
				return `alias: {${inner},\n\t\t\t'pterodactyl-core': path.resolve('./src/lib/pterodactyl/core')\n\t\t}`;
			});
		} else if (content.includes('resolve: {')) {
			content = content.replace(
				/resolve:\s*{/,
				`resolve: {\n\t\talias: {\n\t\t\t'pterodactyl-core': path.resolve('./src/lib/pterodactyl/core')\n\t\t},\n`
			);
		} else {
			content = content.replace(
				/export default defineConfig\(\{/,
				`export default defineConfig({\n\tresolve: {\n\t\talias: {\n\t\t\t'pterodactyl-core': path.resolve('./src/lib/pterodactyl/core')\n\t\t}\n\t},`
			);
		}
	}

	if (!content.includes('pterodactyl({')) {
		const pluginsMatch = content.match(/plugins:\s*\[([^\]]*)\]/);
		if (pluginsMatch) {
			const full = pluginsMatch[0];
			const entries = pluginsMatch[1].trim();
			const updatedEntries = entries.length
				? `${entries},\n\t\tpterodactyl({ config: pteroConfig, contentDir: 'src/content/docs' })`
				: `pterodactyl({ config: pteroConfig, contentDir: 'src/content/docs' })`;
			content = content.replace(full, `plugins: [${updatedEntries}]`);
		}
	}

	fs.writeFileSync(configPath, content, 'utf-8');
}

export function resolveSvelteConfigPath(cwd: string) {
	const candidates = ['svelte.config.js', 'svelte.config.cjs', 'svelte.config.ts'];
	return candidates.map((f) => path.join(cwd, f)).find((p) => fs.existsSync(p));
}

export function resolveViteConfigPath(cwd: string) {
	const candidates = ['vite.config.ts', 'vite.config.js', 'vite.config.mjs'];
	return candidates.map((f) => path.join(cwd, f)).find((p) => fs.existsSync(p));
}
