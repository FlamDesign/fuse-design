import {
  CheckmarkCircle02Icon,
  Loading03Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export function SubagentRunning() {
  return (
    <Trace className="max-w-sm">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine status="running">
            <TraceIcon>
              <HugeiconsIcon
                icon={Loading03Icon}
                strokeWidth={2}
                className="animate-spin"
              />
            </TraceIcon>
            <TraceTitle>Running the research agent</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            <TraceLine>
              <TraceIcon>
                <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
              </TraceIcon>
              <TraceTitle>Ran grep -rn cacheKey scripts</TraceTitle>
            </TraceLine>
            <TraceLine status="running">
              <TraceIcon>
                <HugeiconsIcon
                  icon={Loading03Icon}
                  strokeWidth={2}
                  className="animate-spin"
                />
              </TraceIcon>
              <TraceTitle>
                Running sed -n 13,15p scripts/optimize-images.ts
              </TraceTitle>
            </TraceLine>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
