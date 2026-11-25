import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageContent } from "@/components/ui/message"
import { DownloadIcon, File02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function MessageAttachmentDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Message align="end">
        <MessageContent>
          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              <img src="placeholder.svg" alt="Workspace" />
            </AttachmentMedia>
          </Attachment>
          <Bubble>
            <BubbleContent>
              Here&apos;s the image. Can you add it to the PDF? Use it for the
              cover page.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              Done. Here&apos;s the PDF with the image added as the cover page.
            </BubbleContent>
          </Bubble>
          <Attachment>
            <AttachmentMedia>
              <HugeiconsIcon icon={File02Icon} strokeWidth={2} />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                type="button"
                title="Download"
                aria-label="Download"
                size="icon-sm"
                variant="secondary"
              >
                <HugeiconsIcon icon={DownloadIcon} strokeWidth={2} />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Thanks. Looks good.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}
