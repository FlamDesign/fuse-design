import {
  AiChat02Icon,
  DashboardSquare01Icon,
  FolderLibraryIcon,
  Home01Icon,
  InboxIcon,
  Megaphone01Icon,
  PaintBoardIcon,
  Settings01Icon,
  WorkflowSquare03Icon,
} from "@hugeicons/core-free-icons"

import type { IconSvgElement } from "@/components/icon"

export type NavItem = {
  title: string
  to: string
  icon: IconSvgElement
  summary?: string
}

export const overview: NavItem = { title: "Overview", to: "/", icon: Home01Icon }

export const appPages: NavItem[] = [
  { title: "Dashboard", to: "/apps/dashboard", icon: DashboardSquare01Icon, summary: "Campaign performance, budget and markets" },
  { title: "Campaigns", to: "/apps/campaigns", icon: Megaphone01Icon, summary: "Filterable table with inline status and a create sheet" },
  { title: "Creative editor", to: "/apps/editor", icon: PaintBoardIcon, summary: "Canvas with layers, properties and variations" },
  { title: "Flow builder", to: "/apps/flow", icon: WorkflowSquare03Icon, summary: "Node-based interaction flow with draggable steps" },
  { title: "Asset library", to: "/apps/assets", icon: FolderLibraryIcon, summary: "Grid and list views, upload, details and bulk actions" },
  { title: "Inbox", to: "/apps/inbox", icon: InboxIcon, summary: "Resizable two-pane reader with reply" },
  { title: "Assistant", to: "/apps/assistant", icon: AiChat02Icon, summary: "Chat on the AI SDK with reasoning, tool calls and sources" },
  { title: "Settings", to: "/apps/settings", icon: Settings01Icon, summary: "Profile, notifications and team forms" },
]
