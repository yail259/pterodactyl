<script lang="ts">
	import { page } from '$app/stores';

	const links = [
		{ label: 'Docs', href: '/docs/latest' },
		{ label: 'GitHub', href: 'https://github.com/yao-pterodactyl', external: true }
	];

	const currentPath = $derived($page.url.pathname);

	function isActive(href: string) {
		if (!href.startsWith('/')) return false;
		const target = href.replace(/#.*$/, '');
		if (target === '/') {
			return currentPath === '/';
		}
		return currentPath.startsWith(target);
	}
</script>

<header class="site-navbar">
	<div class="navbar-container">
		<div class="logo">
			<a href="/" class="logo-link">
				<span class="icon" aria-hidden="true">🦖</span>
				<span class="wordmark">Pterodactyl</span>
			</a>
		</div>
		<nav>
			{#each links as link}
				<a
					href={link.href}
					target={link.external ? '_blank' : undefined}
					rel={link.external ? 'noopener noreferrer' : undefined}
					class:active={isActive(link.href)}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</div>
</header>

<style>
	.site-navbar {
		background: var(--background);
		border-bottom: 1px solid var(--border-color);
		position: sticky;
		top: 0;
		z-index: 100;
		backdrop-filter: blur(8px);
		background: rgba(255, 255, 255, 0.95);
	}

	:global(.dark) .site-navbar {
		background: rgba(11, 16, 33, 0.95);
	}

	.navbar-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 var(--spacing-lg);
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 64px;
	}

	.logo {
		display: flex;
		align-items: center;
	}

	.logo-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--foreground);
		font-weight: 700;
		font-size: 1.125rem;
		transition: opacity 0.15s ease;
	}

	.logo-link:hover {
		opacity: 0.8;
	}

	.icon {
		font-size: 1.5rem;
		line-height: 1;
	}

	.wordmark {
		font-weight: 700;
	}

	nav {
		display: flex;
		gap: var(--spacing-sm);
		align-items: center;
	}

	nav a {
		color: var(--color-gray);
		text-decoration: none;
		font-weight: 500;
		font-size: var(--font-size-button);
		padding: 8px 16px;
		border-radius: var(--border-radius);
		transition: all 0.15s ease;
	}

	nav a:hover {
		color: var(--color-blue);
		background: rgba(37, 99, 235, 0.08);
	}

	nav a.active {
		color: var(--color-blue);
		background: rgba(37, 99, 235, 0.12);
	}

	@media (max-width: 640px) {
		.navbar-container {
			padding: 0 var(--spacing-md);
		}

		.wordmark {
			display: none;
		}

		nav {
			gap: var(--spacing-xs);
		}

		nav a {
			padding: 6px 12px;
			font-size: 0.8125rem;
		}
	}
</style>
