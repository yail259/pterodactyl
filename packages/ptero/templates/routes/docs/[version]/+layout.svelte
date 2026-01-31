<script lang="ts">
	import DocsLayout from '$lib/components/pterodactyl/Layout/DocsLayout.svelte';

	let { data, children } = $props();
</script>

<DocsLayout
	sidebar={data.sidebar}
	currentPath={data.currentPath}
	siteTitle={data.site?.title ?? 'Pterodactyl Docs'}
	versions={data.versions ?? []}
	currentVersion={data.version}
>
	{@render children()}
</DocsLayout>
