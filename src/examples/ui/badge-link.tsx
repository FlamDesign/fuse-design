import { Badge } from "@/components/ui/badge"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function BadgeAsLink() {
  return (
    <Badge asChild>
      <a href="#link">
        Open Link{" "}
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          strokeWidth={2}
          data-icon="inline-end"
        />
      </a>
    </Badge>
  )
}
