import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Spinner } from "@/components/ui/spinner"
import {
  Cancel01Icon,
  Clock01Icon,
  File02Icon,
  FileCorruptIcon,
  RepeatIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function AttachmentStates() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-2 py-12">
      <Attachment state="idle" className="w-full">
        <AttachmentMedia>
          <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>selected-file.pdf</AttachmentTitle>
          <AttachmentDescription>Ready to upload</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove selected-file.pdf">
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="uploading" className="w-full">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>design-system.zip</AttachmentTitle>
          <AttachmentDescription>Uploading · 64%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancel upload">
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="processing" className="w-full">
        <AttachmentMedia>
          <HugeiconsIcon icon={File02Icon} strokeWidth={2} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>market-research.pdf</AttachmentTitle>
          <AttachmentDescription>Processing document</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove market-research.pdf">
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="error" className="w-full">
        <AttachmentMedia>
          <HugeiconsIcon icon={FileCorruptIcon} strokeWidth={2} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
          <AttachmentDescription>
            Upload failed. Try again.
          </AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Retry upload">
            <HugeiconsIcon icon={RepeatIcon} strokeWidth={2} />
          </AttachmentAction>
          <AttachmentAction aria-label="Remove financial-model.xlsx">
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="done" className="w-full">
        <AttachmentMedia>
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>uploaded-report.pdf</AttachmentTitle>
          <AttachmentDescription>Uploaded · 1.8 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove uploaded-report.pdf">
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  )
}
