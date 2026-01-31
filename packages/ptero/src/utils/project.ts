import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import fs from 'fs-extra';

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

export function detectPackageJson(cwd: string) {
	const pkgPath = path.join(cwd, 'package.json');
	if (!existsSync(pkgPath)) {
		return null;
	}
	const raw = readFileSync(pkgPath, 'utf-8');
	return { path: pkgPath, json: JSON.parse(raw) as Record<string, unknown> };
}

export function detectPackageManager(cwd: string): PackageManager {
	if (existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
	if (existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
	if (existsSync(path.join(cwd, 'package-lock.json'))) return 'npm';
	if (existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
	return 'pnpm';
}

export function isSvelteKitProject(pkgJson: Record<string, any> | null): boolean {
	if (!pkgJson) return false;
	const deps = { ...(pkgJson.dependencies || {}), ...(pkgJson.devDependencies || {}) };
	return Boolean(deps['@sveltejs/kit']);
}

export function detectScriptLanguage(cwd: string): 'ts' | 'js' {
	const tsconfig = path.join(cwd, 'tsconfig.json');
	if (existsSync(tsconfig)) return 'ts';
	const appDts = path.join(cwd, 'src', 'app.d.ts');
	if (existsSync(appDts)) return 'ts';
	return 'js';
}

export async function ensureDir(dir: string) {
	await fs.mkdirp(dir);
}

export async function copyTemplateDir(
	from: string,
	to: string,
	options: { overwrite?: boolean } = {}
) {
	await fs.mkdirp(path.dirname(to));
	await fs.copy(from, to, { overwrite: options.overwrite ?? false, errorOnExist: false });
}
