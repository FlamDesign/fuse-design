import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import {
  File02Icon,
  GitBranchIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function MarkerBorderDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 py-12">
      <Marker variant="border">
        <MarkerIcon>
          <HugeiconsIcon icon={GitBranchIcon} strokeWidth={2} />
        </MarkerIcon>
        <MarkerContent>Switched to release-candidate</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </MarkerIcon>
        <MarkerContent>Reviewed 8 related files</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <HugeiconsIcon icon={File02Icon} strokeWidth={2} />
        </MarkerIcon>
        <MarkerContent>Opened implementation notes</MarkerContent>
      </Marker>
    </div>
  )
}
