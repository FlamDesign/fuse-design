import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function ToggleGroupDisabled() {
  return (
    <ToggleGroup disabled type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <HugeiconsIcon icon={TextUnderlineIcon} strokeWidth={2} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
