# 🚀 Quick Start Guide

## Try Pterodactyl Right Now

### Option 1: Run the Example (Simplest)

```bash
# Navigate to the example project
cd examples/basic

# Install dependencies (if not already done)
pnpm install

# Start the dev server
pnpm dev
```

Then open http://localhost:5173 in your browser!

### Option 2: Build Everything First

If you want to build all packages first:

```bash
# From the root directory
cd /Users/yao/blueprint/pterodactyl

# Build the core package
cd packages/pterodactyl-core
pnpm build

# Now run the example
cd ../../examples/basic
pnpm dev
```

## What You'll See

When you run `pnpm dev` in the example, you should see:

1. **Homepage** - Redirects to `/docs`
2. **Docs Page** - Shows the welcome content from `src/content/docs/index.md`
3. **Sidebar** - Auto-generated navigation on the left
4. **TOC** - Table of contents on the right (if there are headings)
5. **Responsive** - Try resizing - sidebar collapses on mobile

## Current Features Working

✅ **Content Loading** - Markdown files are parsed
✅ **Frontmatter** - Title, sections, ordering
✅ **Navigation** - Sidebar auto-generated
✅ **Layout** - 3-column responsive layout
✅ **Styling** - CSS variables, clean design
✅ **Hot Reload** - Edit markdown, see changes instantly

## Try Editing Content

1. Open `examples/basic/src/content/docs/index.md`
2. Change the title or content
3. Save the file
4. See it update in the browser! 🔥

## Add a New Page

Create a new file:

```bash
# In examples/basic/src/content/docs/
touch test-page.md
```

Add content:

```markdown
---
title: Test Page
description: Testing Pterodactyl
section: getting-started
order: 2
---

# Test Page

This is a test page to see Pterodactyl in action!

## Features

- **Fast**: Vite-powered HMR
- **Simple**: Just markdown files
- **Auto-nav**: Sidebar updates automatically
```

Save and check the sidebar - your new page should appear!

## Troubleshooting

### Port already in use?

```bash
pnpm dev --port 5174
```

### Build errors?

```bash
# Clean and rebuild
cd /Users/yao/blueprint/pterodactyl
pnpm clean
pnpm install
pnpm build
```

## Next Steps

1. **Add more content** - Create markdown files in `src/content/docs/`
2. **Customize theme** - Edit CSS variables in `src/app.css`
3. **Try versioning** - Add `src/content/versioned_docs/v1.0/`
4. **Add search** - Implement SearchBar component (coming soon!)

## Development Tips

- **Hot Module Reload**: Edit markdown and see changes instantly
- **Navigation**: Updates automatically when you add/remove files
- **Frontmatter**: Use `section` and `order` to organize sidebar
- **Preview**: Run `pnpm build && pnpm preview` to test production build

Enjoy building with Pterodactyl! 🦖
