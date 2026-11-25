import { Toggle } from "@/components/ui/toggle"
import { TextItalicIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
      Italic
    </Toggle>
  )
}
