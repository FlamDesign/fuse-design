import * as React from "react"
import {
  Calendar03Icon,
  Copy01Icon,
  Delete02Icon,
  Logout01Icon,
  PencilEdit02Icon,
  Settings01Icon,
  Share01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons"

import { Demo, DemoGrid, Page } from "@/components/demo"
import { Icon } from "@/components/icon"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function CommandItems() {
  return (
    <>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem><Icon icon={Calendar03Icon} />Open calendar</CommandItem>
          <CommandItem><Icon icon={PencilEdit02Icon} />New draft<CommandShortcut>⌘N</CommandShortcut></CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Account">
          <CommandItem><Icon icon={UserIcon} />Profile<CommandShortcut>⌘P</CommandShortcut></CommandItem>
          <CommandItem><Icon icon={Settings01Icon} />Settings<CommandShortcut>⌘,</CommandShortcut></CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  )
}

export function OverlaysPage() {
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [showGrid, setShowGrid] = React.useState(true)

  return (
    <Page title="Overlays" description="Dialogs, menus and anything that floats above the page.">
      <DemoGrid>
        <Demo title="Dialog">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Rename project</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename project</DialogTitle>
                <DialogDescription>The new name shows up for everyone in the workspace.</DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="dialog-name">Name</FieldLabel>
                  <Input id="dialog-name" defaultValue="Autumn launch" />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Save</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Demo>

        <Demo title="Alert Dialog">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete campaign</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia><Icon icon={Delete02Icon} /></AlertDialogMedia>
                <AlertDialogTitle>Delete this campaign?</AlertDialogTitle>
                <AlertDialogDescription>
                  Reports and creatives are removed for the whole team. This can't be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep campaign</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Demo>

        <Demo title="Sheet">
          {(["right", "left", "top", "bottom"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline" className="capitalize">{side}</Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow the list by owner and status.</SheetDescription>
                </SheetHeader>
                <div className="px-4">
                  <Field>
                    <FieldLabel htmlFor={`sheet-${side}`}>Owner</FieldLabel>
                    <Input id={`sheet-${side}`} placeholder="Anyone" />
                  </Field>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button>Apply</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </Demo>

        <Demo title="Drawer">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Daily budget</DrawerTitle>
                  <DrawerDescription>Set a cap for this placement.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 text-center text-5xl font-semibold tabular-nums">$350</div>
                <DrawerFooter>
                  <Button>Save cap</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </Demo>

        <Demo title="Popover">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Share link</Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <PopoverHeader>
                <PopoverTitle>Share preview</PopoverTitle>
                <PopoverDescription>Anyone with the link can view.</PopoverDescription>
              </PopoverHeader>
              <div className="flex gap-2">
                <Input readOnly defaultValue="https://example.com/p/a1b2" />
                <Button size="icon" variant="outline" aria-label="Copy link"><Icon icon={Copy01Icon} /></Button>
              </div>
            </PopoverContent>
          </Popover>
        </Demo>

        <Demo title="Hover Card">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@mira</Button>
            </HoverCardTrigger>
            <HoverCardContent className="flex gap-3">
              <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
              <div className="grid gap-1 text-sm">
                <span className="font-medium">Mira Kato</span>
                <span className="text-muted-foreground">Design lead. Joined March 2024.</span>
              </div>
            </HoverCardContent>
          </HoverCard>
        </Demo>

        <Demo title="Tooltip">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger asChild>
                <Button variant="outline" className="capitalize">{side}</Button>
              </TooltipTrigger>
              <TooltipContent side={side}>Tooltip on the {side}</TooltipContent>
            </Tooltip>
          ))}
        </Demo>

        <Demo title="Dropdown Menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem><Icon icon={UserIcon} />Profile<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
                <DropdownMenuItem><Icon icon={Settings01Icon} />Settings<DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
                Show grid
              </DropdownMenuCheckboxItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger><Icon icon={Share01Icon} />Share</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive"><Icon icon={Logout01Icon} />Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>

        <Demo title="Context Menu">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-28 w-full max-w-xs items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
              <ContextMenuItem>Back<ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
              <ContextMenuItem>Reload<ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem>Save page</ContextMenuItem>
                  <ContextMenuItem>Inspect</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked>Show bookmarks</ContextMenuCheckboxItem>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>

        <Demo title="Command" className="flex-col">
          <Command className="max-w-sm rounded-2xl border">
            <CommandItems />
          </Command>
          <Button variant="outline" onClick={() => setCommandOpen(true)}>Open as dialog</Button>
          <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
            <Command>
              <CommandItems />
            </Command>
          </CommandDialog>
        </Demo>
      </DemoGrid>
    </Page>
  )
}
