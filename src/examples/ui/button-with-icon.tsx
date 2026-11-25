import { Button } from "@/components/ui/button"
import { GitBranchIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <HugeiconsIcon icon={GitBranchIcon} strokeWidth={2} /> New Branch
    </Button>
  )
}
