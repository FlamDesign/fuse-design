// Copies token values from packages/tokens/theme.css into the @flam/theme
// registry item, so the registry and the npm package never disagree.
import { readFileSync, writeFileSync } from "node:fs"

const css = readFileSync(new URL("../packages/tokens/theme.css", import.meta.url), "utf8")

function block(selector) {
  const match = css.match(new RegExp(`\\n${selector.replace(".", "\\.")}\\s*\\{([\\s\\S]*?)\\n\\}`))
  if (!match) throw new Error(`No ${selector} block in theme.css`)
  return Object.fromEntries([...match[1].matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]))
}

const path = new URL("../registry.json", import.meta.url)
const registry = JSON.parse(readFileSync(path, "utf8"))
const theme = registry.items.find((item) => item.name === "theme")
theme.cssVars.light = block(":root")
theme.cssVars.dark = block(".dark")
writeFileSync(path, JSON.stringify(registry, null, 2) + "\n")
console.log(`Synced ${Object.keys(theme.cssVars.light).length} light and ${Object.keys(theme.cssVars.dark).length} dark tokens`)
