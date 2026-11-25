import * as React from "react"
import {
  Alert02Icon,
  CheckmarkCircle02Icon,
  InboxIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"

import { Demo, DemoGrid, Page } from "@/components/demo"
import { Icon } from "@/components/icon"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

export function FeedbackPage() {
  const [progress, setProgress] = React.useState(32)

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((value) => (value >= 100 ? 8 : value + 4))
    }, 600)
    return () => window.clearInterval(id)
  }, [])

  return (
    <Page title="Feedback" description="Status, loading and empty states.">
      <DemoGrid>
        <Demo title="Alert" className="flex-col" center={false}>
          <Alert>
            <Icon icon={InformationCircleIcon} />
            <AlertTitle>Scheduled maintenance</AlertTitle>
            <AlertDescription>Exports pause on Saturday from 02:00 to 03:00 UTC.</AlertDescription>
          </Alert>
          <Alert>
            <Icon icon={CheckmarkCircle02Icon} />
            <AlertTitle>Domain verified</AlertTitle>
            <AlertDescription>Links now resolve on your custom domain.</AlertDescription>
            <AlertAction>
              <Button size="xs" variant="outline">View</Button>
            </AlertAction>
          </Alert>
          <Alert variant="destructive">
            <Icon icon={Alert02Icon} />
            <AlertTitle>Payment failed</AlertTitle>
            <AlertDescription>Update the card on file to keep campaigns running.</AlertDescription>
          </Alert>
        </Demo>

        <Demo title="Sonner">
          <Button variant="outline" onClick={() => toast("Changes saved", { description: "Your draft was updated just now." })}>
            Default
          </Button>
          <Button variant="outline" onClick={() => toast.success("Campaign published")}>Success</Button>
          <Button variant="outline" onClick={() => toast.info("New version available")}>Info</Button>
          <Button variant="outline" onClick={() => toast.warning("Budget is 90% spent")}>Warning</Button>
          <Button variant="outline" onClick={() => toast.error("Upload failed")}>Error</Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.promise(new Promise((resolve) => setTimeout(resolve, 1600)), {
                loading: "Exporting report…",
                success: "Report exported",
                error: "Export failed",
              })
            }
          >
            Promise
          </Button>
          <Button
            variant="outline"
            onClick={() => toast("Creative archived", { action: { label: "Undo", onClick: () => toast("Restored") } })}
          >
            With action
          </Button>
        </Demo>

        <Demo title="Progress" className="flex-col">
          <div className="grid w-full max-w-sm gap-2">
            <div className="flex justify-between text-sm">
              <span>Uploading assets</span>
              <span className="text-muted-foreground tabular-nums">{progress}%</span>
            </div>
            <Progress value={progress} aria-label="Uploading assets" />
          </div>
          <Progress value={66} className="max-w-sm" aria-label="Storage used" />
        </Demo>

        <Demo title="Skeleton" className="flex-col">
          <div className="flex w-full max-w-sm items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="grid flex-1 gap-2">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          <Skeleton className="h-24 w-full max-w-sm rounded-2xl" />
        </Demo>

        <Demo title="Empty" wide>
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon"><Icon icon={InboxIcon} /></EmptyMedia>
              <EmptyTitle>No reports yet</EmptyTitle>
              <EmptyDescription>Reports appear here after your first campaign has run for 24 hours.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button size="sm">Create campaign</Button>
                <Button size="sm" variant="outline">Import data</Button>
              </div>
            </EmptyContent>
          </Empty>
        </Demo>
      </DemoGrid>
    </Page>
  )
}
