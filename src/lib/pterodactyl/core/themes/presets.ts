/**
 * Built-in theme presets for Pterodactyl
 */

export interface ThemePreset {
	name: string;
	description: string;
	cssVars: Record<string, string>;
}

export const themePresets: Record<string, ThemePreset> = {
	default: {
		name: 'Pterodactyl Default',
		description: 'The default Pterodactyl theme with blue accents',
		cssVars: {
			'--color-primary': '#2563eb',
			'--color-accent': '#14b8a6',
			'--font-family-base': "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
			'--font-family-mono': "'IBM Plex Mono', 'SFMono-Regular', Menlo, monospace"
		}
	},

	supabase: {
		name: 'Supabase',
		description: 'Inspired by Supabase docs with green accents',
		cssVars: {
			'--color-primary': '#3ECF8E',
			'--color-accent': '#F4FFFA',
			'--font-family-base': "'Inter', system-ui, -apple-system, sans-serif",
			'--font-family-mono': "'Source Code Pro', monospace",
			// Light mode overrides
			'--background': '#FFFFFF',
			'--foreground': '#1F2937',
			'--background-secondary': '#F9FAFB',
			// Dark mode brand color
			'--ptero-color-primary': '#3ECF8E',
			'--ptero-color-accent': '#2DD4BF'
		}
	},

	github: {
		name: 'GitHub Docs',
		description: 'Minimal theme inspired by GitHub documentation',
		cssVars: {
			'--color-primary': '#0969da',
			'--color-accent': '#1f6feb',
			'--font-family-base': "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
			'--font-family-mono': "'SF Mono', 'Monaco', 'Cascadia Code', monospace",
			// Light mode
			'--background': '#FFFFFF',
			'--foreground': '#24292f',
			'--background-secondary': '#f6f8fa',
			'--border-color': '#d0d7de',
			'--border-radius': '6px',
			'--border-radius-lg': '6px'
		}
	},

	minimal: {
		name: 'Minimal',
		description: 'Clean, minimal theme with subtle colors',
		cssVars: {
			'--color-primary': '#374151',
			'--color-accent': '#6B7280',
			'--font-family-base': "'Inter', system-ui, sans-serif",
			'--font-family-mono': 'monospace',
			'--background': '#FFFFFF',
			'--foreground': '#111827',
			'--background-secondary': '#F9FAFB',
			'--background-tertiary': '#F3F4F6',
			'--border-radius': '4px',
			'--border-radius-lg': '8px'
		}
	}
};

/**
 * Get a theme preset by name
 */
export function getThemePreset(name: string): ThemePreset | undefined {
	return themePresets[name.toLowerCase()];
}

/**
 * List all available theme presets
 */
export function listThemePresets(): ThemePreset[] {
	return Object.values(themePresets);
}
