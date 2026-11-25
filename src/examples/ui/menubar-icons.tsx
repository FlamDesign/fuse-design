import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  DeleteIcon,
  File01Icon,
  FloppyDiskIcon,
  Folder01Icon,
  HelpCircleIcon,
  SettingsIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function MenubarIcons() {
  return (
    <Menubar className="w-72">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <HugeiconsIcon icon={File01Icon} strokeWidth={2} />
            New File <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />
            Open Folder
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <HugeiconsIcon icon={FloppyDiskIcon} strokeWidth={2} />
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>More</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              <HugeiconsIcon icon={SettingsIcon} strokeWidth={2} />
              Settings
            </MenubarItem>
            <MenubarItem>
              <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />
              Help
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">
              <HugeiconsIcon icon={DeleteIcon} strokeWidth={2} />
              Delete
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
