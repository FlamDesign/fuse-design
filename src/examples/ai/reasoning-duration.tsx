import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export function ReasoningDuration() {
  return (
    <Trace className="max-w-sm">
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
            </TraceIcon>
            <TraceTitle>Thought</TraceTitle>
            <TraceDescription>12s</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent className="whitespace-pre-wrap">
          The build log shows install and compile finish in under a minute.
          Image optimization takes almost four, and it reruns on every deploy
          because the cache key includes the commit hash.
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
