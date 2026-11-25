import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import {
  ComputerTerminal01Icon,
  FileEditIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function TraceDescriptionDemo() {
  return (
    <Trace className="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <HugeiconsIcon icon={FileEditIcon} strokeWidth={2} />
        </TraceIcon>
        <TraceTitle>
          Edited components/settings/notification-preferences-form.tsx
        </TraceTitle>
        <TraceDescription className="font-mono">+48 −12</TraceDescription>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />
        </TraceIcon>
        <TraceTitle>Ran pnpm test</TraceTitle>
        <TraceDescription>14s</TraceDescription>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </TraceIcon>
        <TraceTitle>Searched for useChat</TraceTitle>
        <TraceDescription>8 results</TraceDescription>
      </TraceLine>
    </Trace>
  )
}
