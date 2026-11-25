import { Badge } from "@/components/ui/badge"
import { BookmarkIcon, CheckmarkBadge02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function BadgeWithIconLeft() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">
        <HugeiconsIcon
          icon={CheckmarkBadge02Icon}
          strokeWidth={2}
          data-icon="inline-start"
        />
        Verified
      </Badge>
      <Badge variant="outline">
        Bookmark
        <HugeiconsIcon
          icon={BookmarkIcon}
          strokeWidth={2}
          data-icon="inline-end"
        />
      </Badge>
    </div>
  )
}
