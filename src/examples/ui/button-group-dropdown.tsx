import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertCircleIcon,
  ArrowDown01Icon,
  Copy01Icon,
  DeleteIcon,
  Share03Icon,
  Tick02Icon,
  UserRemove01Icon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">Follow</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="pl-2!">
            <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HugeiconsIcon icon={VolumeOffIcon} strokeWidth={2} />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
              Report Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={UserRemove01Icon} strokeWidth={2} />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Share03Icon} strokeWidth={2} />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
              Copy Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <HugeiconsIcon icon={DeleteIcon} strokeWidth={2} />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
