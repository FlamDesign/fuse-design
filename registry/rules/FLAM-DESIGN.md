# Flam design rules

Rules for people and coding agents building Flam product UI. Installed by `npx shadcn add @flam/rules`.

## Tokens

- Use only the semantic tokens from `@flam/theme`: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `chart-1` to `chart-5`, and the `sidebar-*` set.
- Never rename or remove a token. Values may change in the theme; names are a fixed contract.
- Never write raw colours in components: no hex, `rgb()`, `oklch()`, and no Tailwind palette classes such as `bg-orange-500` or `text-zinc-400`.
- Every surface token has a `-foreground` partner. Text on `bg-primary` is `text-primary-foreground`, and so on.

## Where each colour goes

- **Primary (ink):** the main action on a screen, selection outlines on canvases, active edges in flows. One primary button per view.
- **Amber (`chart-1` to `chart-5`):** data series, fills and tints in illustrations. Not for buttons or navigation.
- **Destructive:** deleting, removing, irreversible actions and their errors. Nothing else.
- **Muted and accent:** secondary surfaces, hover and selected rows.
- **Border and input:** all dividers and control outlines. Do not draw dividers with text colours.

## Components

- Before building anything, check the registry: `npx shadcn search @flam` or the registry MCP server. Install what exists; do not rebuild it.
- Install Flam's versions (`@flam/tabs`, `@flam/card`, and the rest) and do not overwrite them from the stock shadcn registry. The Flam versions carry contrast and accessibility fixes.
- Icons come from Hugeicons (`@hugeicons/react`, `@hugeicons/core-free-icons`). Do not mix icon sets.
- Icon-only buttons need an `aria-label`. Inputs need a label.

## Type and layout

- Font is Rethink Sans through `font-sans`. Do not set font families in components.
- Body text is 16px. Use the `typeset` classes for long-form and chat content.
- Text contrast is at least 4.5:1 in both themes. Do not dim text with opacity to show state; use an icon or a label.
- Every screen must work in light and dark. Test both.

## Copy

- Write "Flam". Product names are Flicks, Airboards and Buds.
- The ad funds wallet is "Ad Balance". The purchase action is "Buy credits".
- Do not describe Flam content with "immersive" or with AR, VR or MR wording.
- Sample data in demos is fictional. Never use real customer names.
