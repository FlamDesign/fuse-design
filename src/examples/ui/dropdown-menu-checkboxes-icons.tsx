import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Mail01Icon,
  Message01Icon,
  NotificationIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function DropdownMenuCheckboxesIcons() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Notifications</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={notifications.email}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, email: checked === true })
            }
          >
            <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
            Email notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.sms}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, sms: checked === true })
            }
          >
            <HugeiconsIcon icon={Message01Icon} strokeWidth={2} />
            SMS notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.push}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, push: checked === true })
            }
          >
            <HugeiconsIcon icon={NotificationIcon} strokeWidth={2} />
            Push notifications
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
