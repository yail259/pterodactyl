---
title: What is Pterodactyl?
description: Introduction to the Pterodactyl documentation engine.
section: Introduction
order: 1
---

# What is Pterodactyl?

Pterodactyl is a modern documentation engine built for **SvelteKit**. It provides a fast, flexible foundation for creating beautiful documentation sites with minimal configuration.

## Why Pterodactyl?

Pterodactyl brings together the best aspects of modern documentation tools with the performance and developer experience of SvelteKit and Vite. Whether you're building product docs, API references, or developer guides, Pterodactyl provides everything you need out of the box.

### Built for Speed

- **Instant HMR**: Changes appear in milliseconds thanks to Vite's lightning-fast hot module replacement
- **Optimized Builds**: Production builds are fast and generate minimal JavaScript
- **Client-Side Navigation**: Navigate between pages without full page reloads

### Developer-Friendly

- **MDsveX Integration**: Write documentation in Markdown with full Svelte component support
- **Type-Safe Configuration**: TypeScript-based configuration with full IntelliSense support
- **Flexible Architecture**: Integrate into existing SvelteKit projects or start fresh

### Feature-Complete

- **Tri-pane Layout**: Responsive sidebar, content area, and table of contents that work seamlessly together
- **Built-in Search**: Full-text search powered by Fuse.js, no backend required
- **Auto-generated Navigation**: Sidebar and navigation elements are automatically generated from your content structure
- **Dark Mode**: First-class theme support with customizable CSS variables
- **Versioning**: Support multiple documentation versions with version switcher
- **Syntax Highlighting**: Beautiful code blocks with Shiki integration

## When to Use Pterodactyl

Pterodactyl is ideal for:

- **SvelteKit Applications**: Seamlessly add documentation to your existing SvelteKit project
- **Open Source Projects**: Create comprehensive docs with search, versioning, and theming
- **Developer Tools**: Build API references and integration guides with live component examples
- **Design Systems**: Document components with interactive demos using Svelte components
- **Technical Writing**: Author content in Markdown while maintaining full control over presentation

## How It Works

Pterodactyl consists of modular packages that work together:

- **Bundled core**: Content parsing, navigation generation, and search indexing (ships inside Pterodactyl)
- **UI components via CLI**: Add prebuilt components with `pterodactyl add <component>` or bring your own
- **pterodactyl-cli**: Command-line tools for setup and version management

These packages integrate with SvelteKit's routing and build system, allowing you to customize any aspect of your documentation site while maintaining the core functionality.
