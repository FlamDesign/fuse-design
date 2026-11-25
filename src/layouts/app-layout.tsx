import * as React from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import {
  ComputerIcon,
  Moon02Icon,
  Sun03Icon,
  GridViewIcon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons"

import { appPages, overview, type NavItem } from "@/nav"
import { aiGroups, aiRegistry } from "@/ai-nav"
import { registry } from "@/registry"
import { Icon } from "@/components/icon"
import { useTheme } from "@/components/theme-provider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

function NavGroup({ label, items }: { label: string; items: NavItem[] }) {
  const { pathname } = useLocation()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.to}
                tooltip={item.title}
              >
                <NavLink to={item.to} end>
                  <Icon icon={item.icon} />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function ThemeMenu() {
  const { theme, setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change theme">
          <Icon icon={theme === "dark" ? Moon02Icon : theme === "light" ? Sun03Icon : ComputerIcon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
        >
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function AppLayout({ fallback }: { fallback: React.ReactNode }) {
  const { pathname } = useLocation()
  const scroller = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
  }, [pathname])
  const component = pathname.startsWith("/components/")
    ? registry.find((entry) => `/components/${entry.slug}` === pathname)
    : undefined
  const aiEntry = pathname.startsWith("/ai/")
    ? aiRegistry.find((entry) => `/ai/${entry.slug}` === pathname)
    : undefined
  const title =
    component?.title ??
    aiEntry?.title ??
    (pathname === "/ai" ? "AI Elements" : undefined) ??
    [overview, ...appPages].find((item) => item.to === pathname)?.title ??
    (pathname === "/components" ? "Components" : overview.title)
  const section = pathname.startsWith("/apps")
    ? { label: "Sample screens", to: "/" }
    : component
      ? { label: "Components", to: "/components" }
      : aiEntry
        ? { label: "AI Elements", to: "/ai" }
        : null

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <Sidebar collapsible="icon" variant="inset" aria-label="Kit navigation" role="navigation">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                    <Icon icon={GridViewIcon} className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-medium">Flam UI kit</span>
                    <span className="truncate text-xs text-sidebar-foreground/75">
                      Component reference
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavGroup label="Start" items={[overview]} />
          <NavGroup label="Sample screens" items={appPages} />
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Components</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/components"}>
                    <NavLink to="/components" end>
                      <span>All components</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {registry.map((entry) => (
                  <SidebarMenuItem key={entry.slug}>
                    <SidebarMenuButton asChild size="sm" isActive={pathname === `/components/${entry.slug}`}>
                      <NavLink to={`/components/${entry.slug}`}>
                        <span>{entry.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {aiGroups.map((group, index) => (
            <SidebarGroup key={group.key} className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {index === 0 ? (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === "/ai"}>
                        <NavLink to="/ai" end>
                          <span>All AI Elements</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : null}
                  {aiRegistry
                    .filter((entry) => entry.group === group.key)
                    .map((entry) => (
                      <SidebarMenuItem key={entry.slug}>
                        <SidebarMenuButton asChild size="sm" isActive={pathname === `/ai/${entry.slug}`}>
                          <NavLink to={`/ai/${entry.slug}`}>
                            <span>{entry.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Avatar>
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-medium">Mira Kato</span>
                  <span className="truncate text-xs text-sidebar-foreground/75">
                    mira@example.com
                  </span>
                </div>
                <Icon icon={UnfoldMoreIcon} className="ml-auto" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="min-w-0 overflow-hidden">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-4" />
          <Breadcrumb aria-label="Location" className="min-w-0 flex-1">
            <BreadcrumbList>
              {section ? (
                <>
                  <BreadcrumbItem className="hidden sm:block">
                    <BreadcrumbLink asChild>
                      <Link to={section.to}>{section.label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden sm:block" />
                </>
              ) : null}
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <ThemeMenu />
        </header>
        <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto">
          <React.Suspense fallback={fallback}>
            <Outlet />
          </React.Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
