import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Badge } from "@/components/ui/badge"
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

export function SubagentDetails() {
  return (
    <Trace className="max-w-sm">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
            </TraceIcon>
            <TraceTitle>Ran the research agent</TraceTitle>
            <TraceDescription>48s</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary">anthropic/claude-sonnet-4.5</Badge>
            <Badge variant="outline" className="font-mono">
              runCommand
            </Badge>
          </div>
          <p>Find out why image optimization reruns on every deploy.</p>
          <Trace>
            <TraceLine>
              <TraceIcon>
                <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
              </TraceIcon>
              <TraceTitle>Ran grep -rn cacheKey scripts</TraceTitle>
            </TraceLine>
            <TraceLine>
              <TraceIcon>
                <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
              </TraceIcon>
              <TraceTitle>
                Ran sed -n 13,15p scripts/optimize-images.ts
              </TraceTitle>
            </TraceLine>
          </Trace>
          <p>The cache is keyed on the commit SHA.</p>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
