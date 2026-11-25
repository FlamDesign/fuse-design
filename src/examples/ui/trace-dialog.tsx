import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Globe02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const results = [
  {
    title: "Caching build outputs",
    url: "https://nextjs.org/docs/app/guides/caching",
  },
  {
    title: "Image optimization reference",
    url: "https://nextjs.org/docs/app/api-reference/components/image",
  },
  {
    title: "Deploy hooks and cache keys",
    url: "https://vercel.com/docs/deploy-hooks",
  },
]

export function TraceDialog() {
  return (
    <Trace className="max-w-sm">
      <Dialog>
        <DialogTrigger>
          <TraceLine>
            <TraceIcon>
              <HugeiconsIcon icon={Globe02Icon} strokeWidth={2} />
            </TraceIcon>
            <TraceTitle>Searched the web for cache keys</TraceTitle>
            <TraceIcon>
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </TraceIcon>
          </TraceLine>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Searched the web for cache keys</DialogTitle>
            <DialogDescription>
              Three results were used in the response.
            </DialogDescription>
          </DialogHeader>
          <Trace>
            {results.map((result) => (
              <a
                key={result.url}
                href={result.url}
                target="_blank"
                rel="noreferrer"
              >
                <TraceLine>
                  <TraceIcon>
                    <HugeiconsIcon icon={Globe02Icon} strokeWidth={2} />
                  </TraceIcon>
                  <TraceTitle>
                    {result.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </TraceTitle>
                  <TraceIcon>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} />
                  </TraceIcon>
                </TraceLine>
              </a>
            ))}
          </Trace>
        </DialogContent>
      </Dialog>
    </Trace>
  )
}
