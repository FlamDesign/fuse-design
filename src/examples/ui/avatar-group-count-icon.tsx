import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function AvatarGroupCountIconExample() {
  return (
    <AvatarGroup className="grayscale">
      <Avatar>
        <AvatarImage src="avatar-2.svg" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="avatar-4.svg" alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="avatar-3.svg" alt="@evilrabbit" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
      </AvatarGroupCount>
    </AvatarGroup>
  )
}
