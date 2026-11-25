import { Button } from "@/components/ui/button"
import { ArrowUp02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <HugeiconsIcon icon={ArrowUp02Icon} strokeWidth={2} />
      </Button>
    </div>
  )
}
