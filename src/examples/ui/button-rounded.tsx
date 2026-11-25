import { Button } from "@/components/ui/button"
import { ArrowUp02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function ButtonRounded() {
  return (
    <div className="flex flex-col gap-8">
      <Button variant="outline" size="icon" className="rounded-full">
        <HugeiconsIcon icon={ArrowUp02Icon} strokeWidth={2} />
      </Button>
    </div>
  )
}
