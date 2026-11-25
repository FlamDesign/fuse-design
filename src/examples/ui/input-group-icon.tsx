import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  AlertCircleIcon,
  CreditCardIcon,
  Mail01Icon,
  Search01Icon,
  StarIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function InputGroupIcon() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput type="email" placeholder="Enter your email" />
        <InputGroupAddon>
          <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon>
          <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon align="inline-end">
          <HugeiconsIcon icon={StarIcon} strokeWidth={2} />
          <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
