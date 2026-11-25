import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="avatar-2.svg" alt="@shadcn" className="grayscale" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
