import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { ArrowUpRight01Icon, Globe02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const sources = [
  {
    title: "Install Astro | docs.astro.build",
    href: "https://docs.astro.build/en/install-and-setup/",
  },
  {
    title: "create-astro | npmjs.com",
    href: "https://www.npmjs.com/package/create-astro",
  },
  {
    title: "Settings: minimumReleaseAge | pnpm.io",
    href: "https://pnpm.io/settings#minimumreleaseage",
  },
]

export function TraceSources() {
  return (
    <div className="w-full max-w-sm">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <HugeiconsIcon icon={Globe02Icon} strokeWidth={2} />
            </TraceIcon>
            <TraceTitle>Used {sources.length} sources</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
              >
                <TraceLine>
                  <TraceIcon>
                    <HugeiconsIcon icon={Globe02Icon} strokeWidth={2} />
                  </TraceIcon>
                  <TraceTitle>
                    {source.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </TraceTitle>
                  <TraceIcon>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} />
                  </TraceIcon>
                </TraceLine>
              </a>
            ))}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </div>
  )
}
