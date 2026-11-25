import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CreditCardIcon,
  LogoutIcon,
  SettingsIcon,
  UserIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function DropdownMenuIcons() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HugeiconsIcon icon={SettingsIcon} strokeWidth={2} />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <HugeiconsIcon icon={LogoutIcon} strokeWidth={2} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
