import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const people = [
  {
    username: "shadcn",
    avatar: "avatar-2.svg",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "avatar-4.svg",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "avatar-3.svg",
    email: "evilrabbit@vercel.com",
  },
]

export function ItemGroupExample() {
  return (
    <ItemGroup className="max-w-sm">
      {people.map((person) => (
        <Item key={person.username} variant="outline">
          <ItemMedia>
            <Avatar>
              <AvatarImage src={person.avatar} className="grayscale" />
              <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent className="gap-1">
            <ItemTitle>{person.username}</ItemTitle>
            <ItemDescription>{person.email}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon" className="rounded-full">
              <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
            </Button>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  )
}
