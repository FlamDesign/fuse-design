import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Message, MessageContent, MessageFooter } from "@/components/ui/message"
import {
  Copy01Icon,
  ReloadIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function MessageActionsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              The install failure is coming from the workspace package.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <Button variant="ghost" size="icon" aria-label="Copy" title="Copy">
              <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Like" title="Like">
              <HugeiconsIcon icon={ThumbsUpIcon} strokeWidth={2} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Dislike"
              title="Dislike"
            >
              <HugeiconsIcon icon={ThumbsDownIcon} strokeWidth={2} />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
          </Bubble>
          <MessageFooter className="gap-2">
            <span className="font-normal text-destructive">Failed to send</span>
            <Button
              variant="ghost"
              size="icon-xs"
              title="Retry"
              aria-label="Retry"
            >
              <HugeiconsIcon icon={ReloadIcon} strokeWidth={2} />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}
