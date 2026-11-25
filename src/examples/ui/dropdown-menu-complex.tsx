import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ComputerIcon,
  CreditCardIcon,
  DownloadIcon,
  EyeIcon,
  File01Icon,
  File02Icon,
  FloppyDiskIcon,
  Folder01Icon,
  FolderOpenIcon,
  HelpCircleIcon,
  KeyboardIcon,
  LanguageCircleIcon,
  LayoutIcon,
  LogoutIcon,
  Mail01Icon,
  MoonIcon,
  MoreHorizontalCircle01Icon,
  NotificationIcon,
  PaintBoardIcon,
  SearchIcon,
  SettingsIcon,
  ShieldIcon,
  SourceCodeIcon,
  Sun03Icon,
  UserIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function DropdownMenuComplex() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  })
  const [theme, setTheme] = React.useState("light")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Complex Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>File</DropdownMenuLabel>
          <DropdownMenuItem>
            <HugeiconsIcon icon={File01Icon} strokeWidth={2} />
            New File
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />
            New Folder
            <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <HugeiconsIcon icon={FolderOpenIcon} strokeWidth={2} />
              Open Recent
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={SourceCodeIcon} strokeWidth={2} />
                    Project Alpha
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={SourceCodeIcon} strokeWidth={2} />
                    Project Beta
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <HugeiconsIcon
                        icon={MoreHorizontalCircle01Icon}
                        strokeWidth={2}
                      />
                      More Projects
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <HugeiconsIcon
                            icon={SourceCodeIcon}
                            strokeWidth={2}
                          />
                          Project Gamma
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <HugeiconsIcon
                            icon={SourceCodeIcon}
                            strokeWidth={2}
                          />
                          Project Delta
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={SearchIcon} strokeWidth={2} />
                    Browse...
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <HugeiconsIcon icon={FloppyDiskIcon} strokeWidth={2} />
            Save
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={DownloadIcon} strokeWidth={2} />
            Export
            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={notifications.email}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, email: checked === true })
            }
          >
            <HugeiconsIcon icon={EyeIcon} strokeWidth={2} />
            Show Sidebar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.sms}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, sms: checked === true })
            }
          >
            <HugeiconsIcon icon={LayoutIcon} strokeWidth={2} />
            Show Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <HugeiconsIcon icon={PaintBoardIcon} strokeWidth={2} />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme}
                  >
                    <DropdownMenuRadioItem value="light">
                      <HugeiconsIcon icon={Sun03Icon} strokeWidth={2} />
                      Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <HugeiconsIcon icon={MoonIcon} strokeWidth={2} />
                      Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <HugeiconsIcon icon={ComputerIcon} strokeWidth={2} />
                      System
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} />
            Billing
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <HugeiconsIcon icon={SettingsIcon} strokeWidth={2} />
              Settings
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={KeyboardIcon} strokeWidth={2} />
                    Keyboard Shortcuts
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={LanguageCircleIcon} strokeWidth={2} />
                    Language
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <HugeiconsIcon icon={NotificationIcon} strokeWidth={2} />
                      Notifications
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>
                            Notification Types
                          </DropdownMenuLabel>
                          <DropdownMenuCheckboxItem
                            checked={notifications.push}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                push: checked === true,
                              })
                            }
                          >
                            <HugeiconsIcon
                              icon={NotificationIcon}
                              strokeWidth={2}
                            />
                            Push Notifications
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={notifications.email}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                email: checked === true,
                              })
                            }
                          >
                            <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
                            Email Notifications
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={ShieldIcon} strokeWidth={2} />
                    Privacy & Security
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />
            Help & Support
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={File02Icon} strokeWidth={2} />
            Documentation
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <HugeiconsIcon icon={LogoutIcon} strokeWidth={2} />
            Sign Out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
