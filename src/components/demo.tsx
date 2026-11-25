import * as React from "react"

import { useHighlightedCode } from "@/hooks/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const slug = (title: string) => title.toLowerCase().replace(/\s+/g, "-")

// Raw source of every showcase file, used for the Code tab.
const sources = import.meta.glob<string>("/src/pages/components/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
})
const helperSources = import.meta.glob<string>("/src/components/*-demo.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
})

function dedent(code: string) {
  const lines = code.replace(/\t/g, "  ").split("\n")
  const indent = Math.min(...lines.filter((line) => line.trim()).map((line) => line.match(/^ */)![0].length))
  return lines.map((line) => line.slice(indent)).join("\n").trim()
}

const snippets = new Map<string, string>()
for (const source of Object.values(sources)) {
  for (const match of source.matchAll(/<Demo ([^>]*)>\n([\s\S]*?)\n\s*<\/Demo>/g)) {
    const title = match[1].match(/title="([^"]+)"/)?.[1]
    if (!title) continue
    let code = dedent(match[2])
    const helper = code.match(/^<(\w+)Demo \/>$/)
    if (helper) {
      const file = Object.entries(helperSources).find(([path]) =>
        path.endsWith(`${helper[1].replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}-demo.tsx`)
      )
      if (file) code = file[1].trim()
    }
    snippets.set(title, code)
  }
}

const Single = React.createContext<string | null>(null)

/** Renders only the demos that belong to one component. */
export function DemoFilter({ component, children }: { component: string; children: React.ReactNode }) {
  return <Single.Provider value={component}>{children}</Single.Provider>
}

export function Code({ code, title, language = "tsx" }: { code: string; title?: string; language?: string }) {
  const lines = useHighlightedCode(code, language)
  return (
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>{title ?? language}</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent className="max-h-[28rem] overflow-auto">
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}

export function Page({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  const single = React.useContext(Single)
  if (single) return <>{children}</>

  return (
    <div className={cn("mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 md:px-8 md:py-10", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="flex max-w-[60ch] flex-col gap-2">
          <h1 className="font-heading text-[28px] leading-8 font-semibold tracking-tight">{title}</h1>
          {description ? <p className="text-base leading-6 text-muted-foreground">{description}</p> : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
      {children}
    </div>
  )
}

export function DemoGrid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-12">{children}</div>
}

export function Demo({
  title,
  component,
  center = true,
  className,
  children,
}: {
  title: string
  /** Component slug this demo belongs to. Defaults to the title. */
  component?: string
  wide?: boolean
  center?: boolean
  className?: string
  children: React.ReactNode
}) {
  const single = React.useContext(Single)
  const owner = component ?? slug(title)
  if (single !== owner) return null

  const code = snippets.get(title)
  const isExample = slug(title) !== owner

  return (
    <section className="flex min-w-0 flex-col gap-3" aria-label={`${title} preview`}>
      {isExample ? <h3 className="text-base font-medium tracking-tight">{title}</h3> : null}
      <Tabs defaultValue="preview" className="gap-3">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code" disabled={!code}>Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" forceMount className="data-[state=inactive]:hidden">
          <div
            className={cn(
              "flex min-h-72 min-w-0 flex-wrap gap-3 overflow-hidden rounded-3xl border bg-card p-6 md:p-10",
              center && "items-center justify-center",
              className
            )}
          >
            {children}
          </div>
        </TabsContent>
        <TabsContent value="code">{code ? <Code code={code} title={`${owner}-demo.tsx`} /> : null}</TabsContent>
      </Tabs>
    </section>
  )
}
