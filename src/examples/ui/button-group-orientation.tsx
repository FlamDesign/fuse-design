import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { MinusSignIcon, PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon">
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
      </Button>
      <Button variant="outline" size="icon">
        <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
      </Button>
    </ButtonGroup>
  )
}
