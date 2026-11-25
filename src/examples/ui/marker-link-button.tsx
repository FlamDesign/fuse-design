import { toast } from "sonner"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { GitBranchIcon, RotateLeft01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function MarkerLinkButtonDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker asChild>
        <a href="#links-and-buttons">
          <MarkerIcon>
            <HugeiconsIcon icon={GitBranchIcon} strokeWidth={2} />
          </MarkerIcon>
          <MarkerContent>View the pull request</MarkerContent>
        </a>
      </Marker>
      <Marker asChild>
        <button
          type="button"
          className="transition-colors hover:text-foreground"
          onClick={() => toast("You clicked the revert button")}
        >
          <MarkerIcon>
            <HugeiconsIcon icon={RotateLeft01Icon} strokeWidth={2} />
          </MarkerIcon>
          <MarkerContent>Revert this change</MarkerContent>
        </button>
      </Marker>
    </div>
  )
}
