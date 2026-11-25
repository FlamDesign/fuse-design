import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Spinner } from "@/components/ui/spinner"
import { Cancel01Icon, SourceCodeIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const images = [
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "placeholder.svg",
    alt: "Workspace",
  },
  {
    name: "desk-reference.jpg",
    meta: "JPG · 1.1 MB",
    src: "placeholder.svg",
    alt: "Desk",
  },
  {
    name: "office-reference.jpg",
    meta: "JPG · 940 KB",
    src: "placeholder.svg",
    alt: "Office",
  },
]

export function AttachmentDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
      <AttachmentGroup>
        {images.map((image) => (
          <Attachment key={image.name} orientation="vertical">
            <AttachmentMedia variant="image">
              <img src={image.src} alt={image.alt} />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{image.name}</AttachmentTitle>
              <AttachmentDescription>{image.meta}</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        ))}
      </AttachmentGroup>
      <Attachment state="uploading" className="w-full">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
          <AttachmentDescription>Uploading · 64%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancel upload">
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment className="w-full">
        <AttachmentMedia>
          <HugeiconsIcon icon={SourceCodeIcon} strokeWidth={2} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
          <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove message-renderer.tsx">
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  )
}
