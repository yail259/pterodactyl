<script lang="ts">
	import DocsLayout from '$lib/components/pterodactyl/Layout/DocsLayout.svelte';
	import ThemeProvider from '$lib/pterodactyl/core/themes/ThemeProvider.svelte';

	let { data, children } = $props();
</script>

<ThemeProvider theme={data.theme} />

<DocsLayout
	sidebar={data.sidebar}
	currentPath={data.currentPath}
	siteTitle={data.site?.title ?? 'Pterodactyl Docs'}
	versions={data.versions ?? []}
	currentVersion={data.version}
>
	{@render children()}
</DocsLayout>
