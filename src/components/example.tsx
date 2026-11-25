import * as React from "react"
import { cn } from "cn"

import { aiRegistry } from "@/ai-registry"
import { Code } from "@/components/demo"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { uiExamples } from "@/ui-examples"

export type ExampleEntry = { name: string; title: string; export: string; lead: string }

const modules = import.meta.glob<Record<string, React.ComponentType>>("/src/examples/*/*.tsx")
const sources = import.meta.glob<string>("/src/examples/*/*.tsx", { query: "?raw", import: "default" })

// One lazy component per example, created once at module scope.
const previews: Record<string, React.LazyExoticComponent<React.ComponentType>> = {}
function register(dir: string, example: ExampleEntry) {
  const path = `/src/examples/${dir}/${example.name}.tsx`
  previews[path] = React.lazy(() => modules[path]().then((module) => ({ default: module[example.export] ?? module.default })))
}
for (const entry of aiRegistry) for (const example of entry.examples) register("ai", example)
for (const examples of Object.values(uiExamples)) for (const example of examples) register("ui", example)

class Boundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) {
      return <p className="text-sm text-muted-foreground">This example could not be rendered here.</p>
    }
    return this.props.children
  }
}

export function Example({
  dir,
  example,
  align = "stretch",
}: {
  dir: "ai" | "ui"
  example: ExampleEntry
  align?: "stretch" | "center"
}) {
  const path = `/src/examples/${dir}/${example.name}.tsx`
  const Preview = previews[path]
  const [code, setCode] = React.useState<string | null>(null)

  return (
    <Tabs
      defaultValue="preview"
      className="gap-3"
      onValueChange={(value) => {
        if (value === "code" && code === null) void sources[path]().then((source) => setCode(source.trim()))
      }}
    >
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" forceMount className="data-[state=inactive]:hidden">
        <div
          data-slot="example-preview"
          className={cn(
            "flex min-h-60 min-w-0 overflow-hidden rounded-3xl border bg-card p-4 md:p-8",
            align === "center" ? "items-center justify-center *:max-w-full" : "flex-col justify-center"
          )}
        >
          <Boundary>
            <React.Suspense fallback={<Skeleton className="h-40 w-full rounded-2xl" />}>
              <Preview />
            </React.Suspense>
          </Boundary>
        </div>
      </TabsContent>
      <TabsContent value="code">
        {code === null ? (
          <Skeleton className="h-72 w-full rounded-2xl" />
        ) : (
          <Code code={code} title={`${example.name}.tsx`} />
        )}
      </TabsContent>
    </Tabs>
  )
}
