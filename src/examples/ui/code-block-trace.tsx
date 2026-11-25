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
import { ComputerTerminal01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const output = `$ node --version
v24.18.0`

const error = `$ pnpm dev
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (node:net:1908:16)`

export function CodeBlockTrace() {
  return (
    <div className="w-full max-w-md">
      <Trace>
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />
              </TraceIcon>
              <TraceTitle>Ran node --version</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap className="max-h-64">
                {output}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
              <TraceIcon>
                <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />
              </TraceIcon>
              <TraceTitle>Failed to run pnpm dev</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm" variant="destructive">
              <CodeBlockContent wrap className="max-h-64">
                {error}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </div>
  )
}
