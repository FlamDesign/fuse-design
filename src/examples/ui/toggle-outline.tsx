import { Toggle } from "@/components/ui/toggle"
import { TextBoldIcon, TextItalicIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function ToggleOutline() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="Toggle italic">
        <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
        Italic
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle bold">
        <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
        Bold
      </Toggle>
    </div>
  )
}
