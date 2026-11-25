import {
  CheckmarkCircle02Icon,
  CircleIcon,
  Route01Icon,
} from "@hugeicons/core-free-icons"
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

const steps = [
  "Add a dark variant to the theme tokens",
  "Read the theme from a cookie on the server",
  "Add a toggle to the settings page",
  "Check contrast on the charts",
]

export function PlanDescription() {
  return (
    <Trace className="max-w-sm">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <HugeiconsIcon icon={Route01Icon} strokeWidth={2} />
            </TraceIcon>
            <TraceTitle>Plan: add dark mode</TraceTitle>
            <TraceDescription>1 of {steps.length} done</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent className="flex flex-col gap-3">
          <p>
            Store the theme in a cookie so the server renders the right one and
            the page does not flash on load.
          </p>
          <Trace>
            {steps.map((step, index) => (
              <TraceLine key={step} status={index > 0 ? "pending" : undefined}>
                <TraceIcon>
                  {index === 0 ? (
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      strokeWidth={2}
                    />
                  ) : (
                    <HugeiconsIcon icon={CircleIcon} strokeWidth={2} />
                  )}
                </TraceIcon>
                <TraceTitle>{step}</TraceTitle>
              </TraceLine>
            ))}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
