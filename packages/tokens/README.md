# Flam tokens

Flam's colour tokens as CSS variables, for shadcn/ui projects on Tailwind v4.

```bash
npm install @flam-ai/tokens
```

In the project's global CSS, import it after Tailwind and remove the project's own `:root` and `.dark` token blocks:

```css
@import "tailwindcss";
@import "@flam-ai/tokens/theme.css";
```

A version bump of this package is then all a project needs to pick up new token values.

Token names follow shadcn/ui. `--brand` and `--brand-foreground` are the only additions.

## One route per project

Use this package or the registry copy (`npx shadcn add @flam/theme`), never both. With both, the project holds two sets of token values that can disagree.

- **Product apps:** this package.
- **Prototypes and one-off projects:** the registry copy.

## Staying up to date

Let Dependabot raise the version bump. In the project's `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    groups:
      flam-design:
        patterns:
          - "@flam-ai/*"
```
