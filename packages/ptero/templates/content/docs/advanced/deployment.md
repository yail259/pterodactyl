---
title: Deployment
description: Deploy your Pterodactyl documentation site to production.
section: Advanced
order: 1
---

# Deployment

Pterodactyl deploys anywhere SvelteKit runs. For adapters, platform specifics, and best practices, follow the official guide:

👉 https://svelte.dev/docs/kit/building-your-app

At a glance:

- Build: `pnpm build`
- Preview the production build: `pnpm preview`
- Pick the adapter that matches your host (Vercel, Netlify, Cloudflare, static, Node, etc.) using the SvelteKit docs.

If you deploy under a subpath, set `kit.paths.base` in `svelte.config.js` and the matching `site.baseUrl` in `pterodactyl.config.ts`.
