---
title: CLI Reference
description: Pterodactyl CLI commands.
section: Reference
order: 1
---

# CLI Reference

Pterodactyl provides a CLI for installing and managing your documentation site.

## `pterodactyl add [components...]`

Add prebuilt UI components to your project (shadcn-style).

```bash
pnpm pterodactyl add avatar
```

- Copies component files into your project (default: `src/lib/components/pterodactyl`)
- Idempotent: skips files that already exist
- Use `--dry-run` to preview changes

## `pterodactyl init`

Installs Pterodactyl into an existing SvelteKit project and scaffolds the docs structure.

```bash
pnpm pterodactyl init
```

- Adds required dependencies and config
- Creates initial docs/content folders
- Idempotent: safe to re-run

## `pterodactyl version create <version>`

Creates a new documentation version.

```bash
pnpm pterodactyl version create v1.0
```

- Copies current docs to `src/content/versioned_docs/<version>`
- Updates `pterodactyl.config.ts` with the new version

## `pterodactyl search build`

Builds the search index.

```bash
pnpm pterodactyl search build
```
