import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { InboxIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function ItemVariant() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item>
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={InboxIcon} strokeWidth={2} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>
            Transparent background with no border.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={InboxIcon} strokeWidth={2} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>
            Outlined style with a visible border.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={InboxIcon} strokeWidth={2} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Muted Variant</ItemTitle>
          <ItemDescription>
            Muted background for secondary content.
          </ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
