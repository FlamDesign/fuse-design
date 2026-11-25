import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { InboxIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function ItemSizeDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={InboxIcon} strokeWidth={2} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default Size</ItemTitle>
          <ItemDescription>
            The standard size for most use cases.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={InboxIcon} strokeWidth={2} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Small Size</ItemTitle>
          <ItemDescription>A compact size for dense layouts.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={InboxIcon} strokeWidth={2} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Extra Small Size</ItemTitle>
          <ItemDescription>The most compact size available.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
