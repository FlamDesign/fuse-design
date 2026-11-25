import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { AlertCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function InputInputGroup() {
  return (
    <Field>
      <FieldLabel htmlFor="input-group-url">Website URL</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-group-url" placeholder="example.com" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
