import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import { ComputerTerminal01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const output = `$ pnpm add ai @ai-sdk/react zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
Done in 2.8s using pnpm v10.18.0`

export function CodeBlockSize() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />
            Terminal
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={output} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent wrap>{output}</CodeBlockContent>
      </CodeBlock>
      <CodeBlock size="sm">
        <CodeBlockHeader>
          <CodeBlockTitle>
            <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />
            Terminal
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={output} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent wrap>{output}</CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
