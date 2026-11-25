import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { ArrowUp02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function SpinnerInputGroup() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Send a message..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Send a message..." disabled />
        <InputGroupAddon align="block-end">
          <Spinner /> Validating...
          <InputGroupButton className="ml-auto" variant="default">
            <HugeiconsIcon icon={ArrowUp02Icon} strokeWidth={2} />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
