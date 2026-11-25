import * as React from "react"

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
import {
  Cancel01Icon,
  SourceCodeIcon as FileCodeIconGlyph,
  File02Icon as FileTextIconGlyph,
  TableIcon as TableIconGlyph,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

function FileCodeIcon(props: { className?: string }) {
  return <HugeiconsIcon icon={FileCodeIconGlyph} strokeWidth={2} {...props} />
}

function FileTextIcon(props: { className?: string }) {
  return <HugeiconsIcon icon={FileTextIconGlyph} strokeWidth={2} {...props} />
}

function TableIcon(props: { className?: string }) {
  return <HugeiconsIcon icon={TableIconGlyph} strokeWidth={2} {...props} />
}

type Item = {
  name: string
  meta: string
  icon?: React.ComponentType<{ className?: string }>
  src?: string
}

const items: Item[] = [
  { name: "briefing-notes.pdf", meta: "PDF · 1.4 MB", icon: FileTextIcon },
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "placeholder.svg",
  },
  { name: "customers.csv", meta: "CSV · 18 KB", icon: TableIcon },
  { name: "renderer.tsx", meta: "TSX · 12 KB", icon: FileCodeIcon },
]

export function AttachmentGroupDemo() {
  return (
    <div className="mx-auto w-full max-w-sm py-12">
      <AttachmentGroup className="w-full">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <Attachment key={item.name} className="w-64">
              {item.src ? (
                <AttachmentMedia variant="image">
                  <img src={item.src} alt={item.name} />
                </AttachmentMedia>
              ) : Icon ? (
                <AttachmentMedia>
                  <Icon />
                </AttachmentMedia>
              ) : null}
              <AttachmentContent>
                <AttachmentTitle>{item.name}</AttachmentTitle>
                <AttachmentDescription>{item.meta}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label={`Remove ${item.name}`}>
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          )
        })}
      </AttachmentGroup>
    </div>
  )
}
