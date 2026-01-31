import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const templatesDir = path.resolve(__dirname, '..', 'templates');

export function resolveTemplate(subpath: string) {
	return path.join(templatesDir, subpath);
}
