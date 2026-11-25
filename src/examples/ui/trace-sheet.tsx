import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
import { ArrowRight01Icon, SearchIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function TraceSheet() {
  return (
    <Trace className="max-w-sm">
      <Sheet>
        <SheetTrigger>
          <TraceLine>
            <TraceIcon>
              <HugeiconsIcon icon={SearchIcon} strokeWidth={2} />
            </TraceIcon>
            <TraceTitle>Explored 4 files</TraceTitle>
            <TraceIcon>
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </TraceIcon>
          </TraceLine>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Explored 4 files</SheetTitle>
            <SheetDescription>
              Files read while preparing the response.
            </SheetDescription>
          </SheetHeader>
          <ul className="flex flex-col gap-2 px-6 font-mono text-xs">
            <li>apps/v4/lib/docs.ts</li>
            <li>apps/v4/lib/components.ts</li>
            <li>apps/v4/next.config.mjs</li>
            <li>apps/v4/package.json</li>
          </ul>
        </SheetContent>
      </Sheet>
    </Trace>
  )
}
