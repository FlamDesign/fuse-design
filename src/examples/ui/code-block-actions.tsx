import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import {
  ComputerTerminal01Icon,
  DownloadIcon,
  TextWrapIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const output = `$ pnpm lint
apps/web/components/message-list.tsx
  18:22  error  'messages' is possibly 'undefined'. Add a guard before calling map  @typescript-eslint/no-unsafe-call
  42:7   warning  React Hook React.useEffect has a missing dependency: 'scrollToBottom'  react-hooks/exhaustive-deps

✖ 2 problems (1 error, 1 warning)`

function download(value: string, filename: string) {
  const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }))
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export function CodeBlockActionsExample() {
  const [wrap, setWrap] = React.useState(true)

  return (
    <div className="w-full max-w-md">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />
            Terminal
          </CodeBlockTitle>
          <CodeBlockActions>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Wrap lines"
              aria-pressed={wrap}
              className="aria-pressed:text-foreground"
              onClick={() => setWrap(!wrap)}
            >
              <HugeiconsIcon icon={TextWrapIcon} strokeWidth={2} />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Download"
              onClick={() => download(output, "lint.log")}
            >
              <HugeiconsIcon icon={DownloadIcon} strokeWidth={2} />
            </Button>
            <CodeBlockCopyButton value={output} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent wrap={wrap}>{output}</CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
