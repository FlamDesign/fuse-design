import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Copy01Icon, SourceCodeIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function InputGroupBlockStart() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="block-start-input">Input</FieldLabel>
        <InputGroup className="h-auto">
          <InputGroupInput
            id="block-start-input"
            placeholder="Enter your name"
          />
          <InputGroupAddon align="block-start">
            <InputGroupText>Full Name</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Header positioned above the input.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="block-start-textarea">Textarea</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="block-start-textarea"
            placeholder="console.log('Hello, world!');"
            className="font-mono text-sm"
          />
          <InputGroupAddon align="block-start">
            <HugeiconsIcon
              icon={SourceCodeIcon}
              strokeWidth={2}
              className="text-muted-foreground"
            />
            <InputGroupText className="font-mono">script.js</InputGroupText>
            <InputGroupButton size="icon-xs" className="ml-auto">
              <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
              <span className="sr-only">Copy</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>
          Header positioned above the textarea.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}
