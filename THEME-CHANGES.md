# Theme changes: shadcn neutral to Flam product theme

Token names are unchanged; only values in `src/index.css` changed. `--radius` is unchanged.

| Theme | Token | shadcn default | Now |
| --- | --- | --- | --- |
| light | `--background` | `oklch(1 0 0)` | `oklch(0.988 0.004 84)` |
| light | `--foreground` | `oklch(0.145 0 0)` | `oklch(0.216 0.006 56.043)` |
| light | `--card` | `oklch(1 0 0)` | `oklch(1 0 0)` |
| light | `--card-foreground` | `oklch(0.145 0 0)` | `oklch(0.216 0.006 56.043)` |
| light | `--popover` | `oklch(1 0 0)` | `oklch(1 0 0)` |
| light | `--popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.216 0.006 56.043)` |
| light | `--primary` | `oklch(0.205 0 0)` | `oklch(0.216 0.006 56.043)` |
| light | `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.988 0.004 84)` |
| light | `--secondary` | `oklch(0.97 0 0)` | `oklch(0.954 0.008 84)` |
| light | `--secondary-foreground` | `oklch(0.205 0 0)` | `oklch(0.216 0.006 56.043)` |
| light | `--muted` | `oklch(0.97 0 0)` | `oklch(0.954 0.008 84)` |
| light | `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.5 0.013 58.071)` |
| light | `--accent` | `oklch(0.97 0 0)` | `oklch(0.954 0.008 84)` |
| light | `--accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.216 0.006 56.043)` |
| light | `--destructive` | `#D92D20` | `oklch(0.505 0.213 27.5)` (prototype has `oklch(0.577 0.245 27.325)`; deepened for 4.5:1) |
| light | `--border` | `oklch(0.922 0 0)` | `oklch(0.915 0.008 80)` |
| light | `--input` | `oklch(0.922 0 0)` | `oklch(0.915 0.008 80)` |
| light | `--ring` | `oklch(0.708 0 0)` | `oklch(0.709 0.01 56.259)` |
| light | `--chart-1` | `oklch(0.87 0 0)` | `oklch(0.837 0.128 66.29)` |
| light | `--chart-2` | `oklch(0.556 0 0)` | `oklch(0.705 0.213 47.604)` |
| light | `--chart-3` | `oklch(0.439 0 0)` | `oklch(0.646 0.222 41.116)` |
| light | `--chart-4` | `oklch(0.371 0 0)` | `oklch(0.553 0.195 38.402)` |
| light | `--chart-5` | `oklch(0.269 0 0)` | `oklch(0.47 0.157 37.304)` |
| light | `--sidebar` | `oklch(0.985 0 0)` | `oklch(0.943 0.008 84)` |
| light | `--sidebar-foreground` | `oklch(0.145 0 0)` | `oklch(0.216 0.006 56.043)` |
| light | `--sidebar-primary` | `oklch(0.205 0 0)` | `oklch(0.216 0.006 56.043)` |
| light | `--sidebar-primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.988 0.004 84)` |
| light | `--sidebar-accent` | `oklch(0.97 0 0)` | `oklch(0.905 0.011 80)` |
| light | `--sidebar-accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.216 0.006 56.043)` |
| light | `--sidebar-border` | `oklch(0.922 0 0)` | `oklch(0.9 0.01 80)` |
| light | `--sidebar-ring` | `oklch(0.708 0 0)` | `oklch(0.709 0.01 56.259)` |
| dark | `--background` | `oklch(0.145 0 0)` | `oklch(0.235 0.006 56)` |
| dark | `--foreground` | `oklch(0.985 0 0)` | `oklch(0.97 0.002 84)` |
| dark | `--card` | `oklch(0.205 0 0)` | `oklch(0.265 0.007 56)` |
| dark | `--card-foreground` | `oklch(0.985 0 0)` | `oklch(0.97 0.002 84)` |
| dark | `--popover` | `oklch(0.205 0 0)` | `oklch(0.275 0.007 56)` |
| dark | `--popover-foreground` | `oklch(0.985 0 0)` | `oklch(0.97 0.002 84)` |
| dark | `--primary` | `oklch(0.922 0 0)` | `oklch(0.94 0.004 84)` |
| dark | `--primary-foreground` | `oklch(0.205 0 0)` | `oklch(0.216 0.006 56.043)` |
| dark | `--secondary` | `oklch(0.269 0 0)` | `oklch(0.33 0.008 56)` |
| dark | `--secondary-foreground` | `oklch(0.985 0 0)` | `oklch(0.97 0.002 84)` |
| dark | `--muted` | `oklch(0.269 0 0)` | `oklch(0.33 0.008 56)` |
| dark | `--muted-foreground` | `oklch(0.708 0 0)` | `oklch(0.72 0.012 70)` |
| dark | `--accent` | `oklch(0.269 0 0)` | `oklch(0.38 0.009 56)` |
| dark | `--accent-foreground` | `oklch(0.985 0 0)` | `oklch(0.97 0.002 84)` |
| dark | `--destructive` | `#F97066` | `oklch(0.8 0.125 22.2)` (prototype has `oklch(0.704 0.191 22.216)`; lightened for 4.5:1) |
| dark | `--border` | `oklch(1 0 0 / 10%)` | `oklch(1 0 0 / 10%)` |
| dark | `--input` | `oklch(1 0 0 / 15%)` | `oklch(1 0 0 / 14%)` |
| dark | `--ring` | `oklch(0.556 0 0)` | `oklch(0.553 0.013 58.071)` |
| dark | `--chart-1` | `oklch(0.87 0 0)` | `oklch(0.837 0.128 66.29)` |
| dark | `--chart-2` | `oklch(0.556 0 0)` | `oklch(0.705 0.213 47.604)` |
| dark | `--chart-3` | `oklch(0.439 0 0)` | `oklch(0.646 0.222 41.116)` |
| dark | `--chart-4` | `oklch(0.371 0 0)` | `oklch(0.553 0.195 38.402)` |
| dark | `--chart-5` | `oklch(0.269 0 0)` | `oklch(0.47 0.157 37.304)` |
| dark | `--sidebar` | `oklch(0.205 0 0)` | `oklch(0.2 0.006 56)` |
| dark | `--sidebar-foreground` | `oklch(0.985 0 0)` | `oklch(0.97 0.002 84)` |
| dark | `--sidebar-primary` | `oklch(0.488 0.243 264.376)` | `oklch(0.94 0.004 84)` |
| dark | `--sidebar-primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.216 0.006 56.043)` |
| dark | `--sidebar-accent` | `oklch(0.269 0 0)` | `oklch(0.29 0.008 56)` |
| dark | `--sidebar-accent-foreground` | `oklch(0.985 0 0)` | `oklch(0.97 0.002 84)` |
| dark | `--sidebar-border` | `oklch(1 0 0 / 10%)` | `oklch(1 0 0 / 8%)` |
| dark | `--sidebar-ring` | `oklch(0.556 0 0)` | `oklch(0.553 0.013 58.071)` |
| both | `--font-sans` | `'Inter Variable', sans-serif` | `'Rethink Sans Variable', system-ui, sans-serif` |

No custom tokens. Every colour maps to a stock shadcn token; the amber comes from `--chart-1` to `--chart-5`. Selection in the editor and flow builder uses `--primary`.
Colour values are copied from FlamDesign/Flicks-prototype `src/index.css` at commit 024182c.
