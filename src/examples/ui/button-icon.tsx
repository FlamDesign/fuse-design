import { Button } from "@/components/ui/button"
import { CircleArrowUp01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <HugeiconsIcon icon={CircleArrowUp01Icon} strokeWidth={2} />
    </Button>
  )
}
