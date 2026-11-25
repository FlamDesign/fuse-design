# Flam tokens

Flam's colour tokens as CSS variables, for shadcn/ui projects on Tailwind v4.

```bash
npm install @flam/tokens
```

In the project's global CSS, import it after Tailwind and remove the project's own `:root` and `.dark` token blocks:

```css
@import "tailwindcss";
@import "@flam/tokens/theme.css";
```

A version bump of this package is then all a project needs to pick up new token values.

Token names follow shadcn/ui. `--brand` and `--brand-foreground` are the only additions.
