import * as React from "react"
import {
  HashRouter,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"

import { AppLayout } from "@/layouts/app-layout"
import { Skeleton } from "@/components/ui/skeleton"
import { OverviewPage } from "@/pages/overview"

const lazy = <T extends Record<string, React.ComponentType>>(load: () => Promise<T>, name: keyof T) =>
  React.lazy(() => load().then((module) => ({ default: module[name] })))

const DashboardPage = lazy(() => import("@/pages/apps/dashboard"), "DashboardPage")
const CampaignsPage = lazy(() => import("@/pages/apps/campaigns"), "CampaignsPage")
const EditorPage = lazy(() => import("@/pages/apps/editor"), "EditorPage")
const FlowPage = lazy(() => import("@/pages/apps/flow"), "FlowPage")
const AssetsPage = lazy(() => import("@/pages/apps/assets"), "AssetsPage")
const InboxPage = lazy(() => import("@/pages/apps/inbox"), "InboxPage")
const AssistantPage = lazy(() => import("@/pages/apps/assistant"), "AssistantPage")
const SettingsPage = lazy(() => import("@/pages/apps/settings"), "SettingsPage")
const ComponentsIndexPage = lazy(() => import("@/pages/docs/components-index"), "ComponentsIndexPage")
const ComponentPage = lazy(() => import("@/pages/docs/component"), "ComponentPage")
const AiIndexPage = lazy(() => import("@/pages/docs/ai-element"), "AiIndexPage")
const AiElementPage = lazy(() => import("@/pages/docs/ai-element"), "AiElementPage")

// Hosted embeds only pass a plain #name hash, so that build routes in memory
// and mirrors the route to the hash as e.g. #apps-dashboard.
const embedded = import.meta.env.MODE === "artifact"

function hashToPath() {
  const name = window.location.hash.replace(/^#\/?/, "")
  if (!name) return "/"
  return "/" + name.replace(/^(apps|components|ai)-/, "$1/")
}

function HashSync() {
  const { pathname } = useLocation()
  React.useEffect(() => {
    try {
      const name = pathname.replace(/^\//, "").replace("/", "-")
      window.history.replaceState(null, "", name ? `#${name}` : window.location.pathname)
    } catch {
      // The hash is a convenience only.
    }
  }, [pathname])
  return null
}

function Router({ children }: { children: React.ReactNode }) {
  if (!embedded) return <HashRouter>{children}</HashRouter>
  return (
    <MemoryRouter initialEntries={[hashToPath()]}>
      <HashSync />
      {children}
    </MemoryRouter>
  )
}

function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 md:px-8 md:py-10" aria-busy="true">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-72 w-full rounded-3xl" />
    </div>
  )
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout fallback={<Loading />} />}>
          <Route index element={<OverviewPage />} />
          <Route path="apps/dashboard" element={<DashboardPage />} />
          <Route path="apps/campaigns" element={<CampaignsPage />} />
          <Route path="apps/editor" element={<EditorPage />} />
          <Route path="apps/flow" element={<FlowPage />} />
          <Route path="apps/assets" element={<AssetsPage />} />
          <Route path="apps/inbox" element={<InboxPage />} />
          <Route path="apps/assistant" element={<AssistantPage />} />
          <Route path="apps/settings" element={<SettingsPage />} />
          <Route path="components" element={<ComponentsIndexPage />} />
          <Route path="components/:slug" element={<ComponentPage />} />
          <Route path="ai" element={<AiIndexPage />} />
          <Route path="ai/:slug" element={<AiElementPage />} />
          <Route path="*" element={<OverviewPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
