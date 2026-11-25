import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Notification01Icon, ReloadIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function EmptyMuted() {
  return (
    <Empty className="h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={Notification01Icon} strokeWidth={2} />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          You&apos;re all caught up. New notifications will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <HugeiconsIcon icon={ReloadIcon} strokeWidth={2} />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}
