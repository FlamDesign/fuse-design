import { Toggle } from "@/components/ui/toggle"
import { BookmarkIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
      <HugeiconsIcon
        icon={BookmarkIcon}
        strokeWidth={2}
        className="group-data-[state=on]/toggle:fill-foreground"
      />
      Bookmark
    </Toggle>
  )
}
