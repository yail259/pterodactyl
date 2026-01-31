Simplified Recommendation
Ship for v0.1 (This Week):
✅ Fix UI bugs (version selector, theme toggle width) - 1 hour
✅ CSS Variable theming - 3 hours
Add theme.cssVars to config type
Inject vars at runtime in root layout
Create 2-3 presets (default, supabase-inspired, github-minimal)
✅ Documentation - 4 hours
List all CSS variables with descriptions
Show examples of common customizations
Include preset examples
Total: ~8 hours
Hold for v0.2 (After Launch):
Snippet-based injection points - Add optional snippets to DocsLayout, Header, Sidebar
Component replacement via CLI - ptero add <component> copies component for user modification
Advanced theming guide - How to fully customize the look
What's Missing from README (Audit)
Let me re-check what needs fixing:
Fix in README:
❌ Remove "component slots" - Replace with "Svelte 5 snippets" (or just "customization points")
⚠️ "TypeScript support" - Already works (config types are exported), just needs documentation
✅ Search keyboard shortcuts - Need to verify if Ctrl+K / Cmd+K is implemented
⚠️ ptero add avatar - README shows this example, but is avatar an actual component? Should use real example like ptero add sidebar
Add to README:
Theme customization example
theme: {
cssVars: {
'--color-primary': '#3ECF8E'
}
}
Clearer install flow
Right now it says "install into existing SvelteKit project"
But also says "starting from scratch? create SvelteKit first"
Make this flow crystal clear
Final Theming Strategy
For Pterodactyl's identity as "SvelteKit-native, CLI-first":
Level 1: CSS Variables (90% of users)
Override colors/fonts in config or app.css
Level 2: Snippets (9% of users)
Inject custom content using Svelte 5 snippets
Level 3: Component Replacement (1% of users)
Copy component via CLI, modify locally, import manually No published theme packages, no marketplace, no over-engineering. Users who want radical customization can fork the entire template (it's just SvelteKit!) and build from there.
Sound good? Want me to create a concise implementation checklist for v0.1 theming?
