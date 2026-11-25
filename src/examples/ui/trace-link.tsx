import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  File02Icon,
  Globe02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function TraceLink() {
  return (
    <Trace className="max-w-sm">
      <a href="#link">
        <TraceLine>
          <TraceIcon>
            <HugeiconsIcon icon={File02Icon} strokeWidth={2} />
          </TraceIcon>
          <TraceTitle>Read apps/v4/lib/docs.ts</TraceTitle>
          <TraceIcon>
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </TraceIcon>
        </TraceLine>
      </a>
      <a
        href="https://docs.astro.build/en/install-and-setup/"
        target="_blank"
        rel="noreferrer"
      >
        <TraceLine>
          <TraceIcon>
            <HugeiconsIcon icon={Globe02Icon} strokeWidth={2} />
          </TraceIcon>
          <TraceTitle>
            Install Astro | docs.astro.build
            <span className="sr-only"> (opens in a new tab)</span>
          </TraceTitle>
          <TraceIcon>
            <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} />
          </TraceIcon>
        </TraceLine>
      </a>
    </Trace>
  )
}
