import * as React from "react"
import {
  Analytics01Icon,
  Home01Icon,
  Settings01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"

import { Demo, DemoGrid, Page } from "@/components/demo"
import { Icon } from "@/components/icon"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const noop = (event: React.MouseEvent) => event.preventDefault()

export function NavigationPage() {
  const [page, setPage] = React.useState(2)

  return (
    <Page title="Navigation" description="Wayfinding between and within pages.">
      <DemoGrid>
        <Demo title="Breadcrumb" className="flex-col">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={noop}>Workspace</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={noop}>Campaigns</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Autumn launch</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>

        <Demo title="Tabs" className="flex-col" center={false}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="disabled" disabled>Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="text-sm text-muted-foreground">Summary of the last 30 days.</TabsContent>
            <TabsContent value="analytics" className="text-sm text-muted-foreground">Breakdowns by placement and device.</TabsContent>
            <TabsContent value="reports" className="text-sm text-muted-foreground">Scheduled and saved reports.</TabsContent>
          </Tabs>
          <Tabs defaultValue="code" className="w-full">
            <TabsList variant="line">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="text-sm text-muted-foreground">Line variant, preview tab.</TabsContent>
            <TabsContent value="code" className="text-sm text-muted-foreground">Line variant, code tab.</TabsContent>
            <TabsContent value="history" className="text-sm text-muted-foreground">Line variant, history tab.</TabsContent>
          </Tabs>
        </Demo>

        <Demo title="Pagination">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage(Math.max(1, page - 1)) }} />
              </PaginationItem>
              {[1, 2, 3].map((n) => (
                <PaginationItem key={n}>
                  <PaginationLink href="#" isActive={page === n} onClick={(e) => { e.preventDefault(); setPage(n) }}>
                    {n}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage(Math.min(3, page + 1)) }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Demo>

        <Demo title="Navigation Menu" className="items-start pb-40">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-72 gap-1">
                    {[
                      ["Studio", "Build and preview creatives."],
                      ["Analytics", "Measure reach and engagement."],
                      ["Integrations", "Connect your ad stack."],
                    ].map(([title, text]) => (
                      <li key={title}>
                        <NavigationMenuLink href="#" onClick={noop}>
                          <div className="font-medium">{title}</div>
                          <div className="text-muted-foreground">{text}</div>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" onClick={noop} className={navigationMenuTriggerStyle()}>
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" onClick={noop} className={navigationMenuTriggerStyle()}>
                  Docs
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Demo>

        <Demo title="Menubar">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New tab<MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
                <MenubarItem>New window<MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Share</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Email link</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Print<MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem checked>Show toolbar</MenubarCheckboxItem>
                <MenubarCheckboxItem>Show rulers</MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarRadioGroup value="comfortable">
                  <MenubarRadioItem value="compact">Compact</MenubarRadioItem>
                  <MenubarRadioItem value="comfortable">Comfortable</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Help</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Shortcuts</MenubarItem>
                <MenubarItem>Contact support</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Demo>

        <Demo title="Sidebar" wide center={false} className="p-0">
          <SidebarProvider className="min-h-0 h-80 w-full overflow-hidden">
            <Sidebar collapsible="none" className="border-r">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive><Icon icon={Home01Icon} /><span>Home</span></SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton><Icon icon={Analytics01Icon} /><span>Analytics</span></SidebarMenuButton>
                        <SidebarMenuBadge>3</SidebarMenuBadge>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton href="#" onClick={noop}>Reach</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton href="#" onClick={noop} isActive>Engagement</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton><Icon icon={UserGroupIcon} /><span>Team</span></SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton><Icon icon={Settings01Icon} /><span>Settings</span></SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <div className="flex min-h-0 flex-1 flex-col bg-background">
              <div className="flex items-center gap-2 border-b p-3 text-sm">
                <SidebarTrigger disabled />
                <span className="font-medium">Home</span>
              </div>
              <p className="p-4 text-sm text-muted-foreground">
                The app shell on the left of this page uses the same component with the collapsible icon mode. Press Ctrl/⌘ + B to toggle it.
              </p>
            </div>
          </SidebarProvider>
        </Demo>
      </DemoGrid>
    </Page>
  )
}
