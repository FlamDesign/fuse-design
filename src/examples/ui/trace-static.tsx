import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
import { GitBranchIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function TraceStatic() {
  return (
    <Trace className="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <HugeiconsIcon icon={GitBranchIcon} strokeWidth={2} />
        </TraceIcon>
        <TraceTitle>Created branch fix/frozen-lockfile</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
