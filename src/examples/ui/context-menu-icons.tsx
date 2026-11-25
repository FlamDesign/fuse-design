import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  ClipboardIcon,
  Copy01Icon,
  DeleteIcon,
  ScissorIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function ContextMenuIcons() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
            Copy
          </ContextMenuItem>
          <ContextMenuItem>
            <HugeiconsIcon icon={ScissorIcon} strokeWidth={2} />
            Cut
          </ContextMenuItem>
          <ContextMenuItem>
            <HugeiconsIcon icon={ClipboardIcon} strokeWidth={2} />
            Paste
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            <HugeiconsIcon icon={DeleteIcon} strokeWidth={2} />
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
