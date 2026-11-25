import { ComputerTerminal01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export function ToolStates() {
  return (
    <Trace className="max-w-sm">
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />
            </TraceIcon>
            <TraceTitle>Ran git status --short</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap className="max-h-64">
              {` M app/api/chat/route.ts
 M components/chat.tsx`}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine status="error">
            <TraceIcon>
              <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />
            </TraceIcon>
            <TraceTitle>Failed to run pnpm dev</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap className="max-h-64">
              Command timed out after 120 seconds.
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceLine>
        <TraceIcon>
          <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />
        </TraceIcon>
        <TraceTitle>Denied rm -rf dist</TraceTitle>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />
        </TraceIcon>
        <TraceTitle>Running pnpm test</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
