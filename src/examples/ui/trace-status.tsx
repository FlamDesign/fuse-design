import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  CircleIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function TraceStatus() {
  return (
    <Trace className="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
        </TraceIcon>
        <TraceTitle>Ran pnpm install</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
        </TraceIcon>
        <TraceTitle>Failed to run pnpm lint</TraceTitle>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <HugeiconsIcon
            icon={Loading03Icon}
            strokeWidth={2}
            className="animate-spin"
          />
        </TraceIcon>
        <TraceTitle>Running pnpm build</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <HugeiconsIcon icon={CircleIcon} strokeWidth={2} />
        </TraceIcon>
        <TraceTitle>Run pnpm test</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
