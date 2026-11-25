import { aiRegistry, type AiEntry } from "@/ai-registry"

export { aiRegistry }

export const aiGroups: { key: AiEntry["group"]; label: string }[] = [
  { key: "elements", label: "AI Elements" },
  { key: "utilities", label: "Utilities" },
  { key: "helpers", label: "Helpers" },
]
