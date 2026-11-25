import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  ArrowTurnBackwardIcon,
  Copy01Icon,
  JavaScriptIcon,
  RefreshIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function InputGroupTextareaExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupTextarea
          id="textarea-code-32"
          placeholder="console.log('Hello, world!');"
          className="min-h-[200px]"
        />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton size="sm" className="ml-auto" variant="default">
            Run <HugeiconsIcon icon={ArrowTurnBackwardIcon} strokeWidth={2} />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="font-mono font-medium">
            <HugeiconsIcon icon={JavaScriptIcon} strokeWidth={2} />
            script.js
          </InputGroupText>
          <InputGroupButton className="ml-auto" size="icon-xs">
            <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} />
          </InputGroupButton>
          <InputGroupButton variant="ghost" size="icon-xs">
            <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
