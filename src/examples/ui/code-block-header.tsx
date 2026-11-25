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

const command = "pnpm add ai @ai-sdk/react zod"

const output = `$ ${command}
Packages: +14
Progress: resolved 412, reused 398, downloaded 14, added 14, done
Done in 2.8s using pnpm v10.18.0`

export function CodeBlockHeaderExample() {
  return (
    <div className="w-full max-w-md">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />
            Terminal
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={command} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent>{output}</CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
