import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
import {
  ComputerTerminal01Icon,
  File02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function TraceGroupDemo() {
  return (
    <Trace className="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </TraceIcon>
        <TraceTitle>Searched for minimumReleaseAge</TraceTitle>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <HugeiconsIcon icon={File02Icon} strokeWidth={2} />
        </TraceIcon>
        <TraceTitle>Read pnpm-workspace.yaml</TraceTitle>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />
        </TraceIcon>
        <TraceTitle>Ran pnpm install</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
