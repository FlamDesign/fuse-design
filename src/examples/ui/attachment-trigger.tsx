import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Cancel01Icon,
  Copy01Icon,
  FileSearchIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function AttachmentTriggerDemo() {
  return (
    <div className="mx-auto w-full max-w-sm py-12">
      <Dialog>
        <Attachment className="w-full">
          <AttachmentMedia>
            <HugeiconsIcon icon={FileSearchIcon} strokeWidth={2} />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>research-summary.pdf</AttachmentTitle>
            <AttachmentDescription>Open preview dialog</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Copy link">
              <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
            </AttachmentAction>
            <AttachmentAction aria-label="Remove research-summary.pdf">
              <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
            </AttachmentAction>
          </AttachmentActions>
          <DialogTrigger asChild>
            <AttachmentTrigger aria-label="Preview research-summary.pdf" />
          </DialogTrigger>
        </Attachment>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>research-summary.pdf</DialogTitle>
            <DialogDescription>
              The attachment trigger fills the card and opens the dialog, while
              the actions stay independently clickable above it.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
