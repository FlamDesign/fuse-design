import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import {
  BookOpen01Icon,
  GitBranchIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function MarkerIconDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-12 py-12">
      <Marker>
        <MarkerIcon>
          <HugeiconsIcon icon={GitBranchIcon} strokeWidth={2} />
        </MarkerIcon>
        <MarkerContent>Switched to a new branch</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerIcon>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </MarkerIcon>
        <MarkerContent>Explored 4 files</MarkerContent>
      </Marker>
      <Marker className="flex-col">
        <MarkerIcon>
          <HugeiconsIcon icon={BookOpen01Icon} strokeWidth={2} />
        </MarkerIcon>
        <MarkerContent>Syncing completed</MarkerContent>
      </Marker>
    </div>
  )
}
