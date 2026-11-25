import * as React from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft02Icon, ArrowRight02Icon, LinkSquare02Icon } from "@hugeicons/core-free-icons"

import { registry } from "@/registry"
import { uiExamples } from "@/ui-examples"
import { Code, DemoFilter } from "@/components/demo"
import { Example } from "@/components/example"
import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const pages: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  actions: React.lazy(() => import("@/pages/components/actions").then((m) => ({ default: m.ActionsPage }))),
  ai: React.lazy(() => import("@/pages/components/ai").then((m) => ({ default: m.AiPage }))),
  "data-display": React.lazy(() => import("@/pages/components/data-display").then((m) => ({ default: m.DataDisplayPage }))),
  feedback: React.lazy(() => import("@/pages/components/feedback").then((m) => ({ default: m.FeedbackPage }))),
  forms: React.lazy(() => import("@/pages/components/forms").then((m) => ({ default: m.FormsPage }))),
  layout: React.lazy(() => import("@/pages/components/layout").then((m) => ({ default: m.LayoutPage }))),
  navigation: React.lazy(() => import("@/pages/components/navigation").then((m) => ({ default: m.NavigationPage }))),
  overlays: React.lazy(() => import("@/pages/components/overlays").then((m) => ({ default: m.OverlaysPage }))),
  typeset: React.lazy(() => import("@/pages/components/typeset").then((m) => ({ default: m.TypesetPage }))),
}

const recipes: Record<string, { install: string; note: string }> = {
  "data-table": {
    install: "npx shadcn@latest add table\nnpm install @tanstack/react-table@^8",
    note: "A recipe, not a single component. It combines Table with TanStack Table.",
  },
  "date-picker": {
    install: "npx shadcn@latest add popover calendar",
    note: "A recipe, not a single component. It combines Popover and Calendar.",
  },
  typography: {
    install: '/* src/index.css */\n@import "tailwindcss";\n@import "./typeset.css";',
    note: "There is no typography component. Rendered content is styled by shadcn/typeset, set to 16px in this kit.",
  },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="border-b pb-2 text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

export function ComponentPage() {
  const { slug } = useParams()
  const index = registry.findIndex((entry) => entry.slug === slug)
  if (index === -1) return <Navigate to="/components" replace />

  const entry = registry[index]
  const previous = registry[index - 1]
  const next = registry[index + 1]
  const Source = pages[entry.source]
  const recipe = recipes[entry.slug]
  const examples = uiExamples[entry.slug] ?? []
  const usage = entry.exports.length
    ? entry.exports.length > 3
      ? `import {\n${entry.exports.map((name) => `  ${name},`).join("\n")}\n} from "@/components/ui/${entry.slug}"`
      : `import { ${entry.exports.join(", ")} } from "@/components/ui/${entry.slug}"`
    : null

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 py-8 md:px-8 md:py-10">
      <header className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-heading text-4xl leading-tight font-semibold tracking-[-0.02em]">{entry.title}</h1>
          <Button variant="outline" size="sm" asChild className="mt-1.5 shrink-0">
            <a href={`https://ui.shadcn.com/docs/components/radix/${entry.slug}`} target="_blank" rel="noreferrer">
              Docs
              <Icon icon={LinkSquare02Icon} />
            </a>
          </Button>
        </div>
        <p className="max-w-[62ch] text-lg leading-7 text-muted-foreground">{entry.description}</p>
        {recipe ? <p className="max-w-[62ch] text-sm text-muted-foreground">{recipe.note}</p> : null}
      </header>

      <h2 className="sr-only">Preview</h2>
      <React.Suspense fallback={<Skeleton className="h-72 w-full rounded-3xl" />}>
        <DemoFilter component={entry.slug} key={entry.slug}>
          <Source />
        </DemoFilter>
      </React.Suspense>

      <Section title="Installation">
        <Code
          language={entry.slug === "typography" ? "css" : "bash"}
          title={entry.slug === "typography" ? "CSS" : "Terminal"}
          code={recipe?.install ?? `npx shadcn@latest add ${entry.slug}`}
        />
      </Section>

      {usage ? (
        <Section title="Usage">
          <Code code={usage} title="Import" />
        </Section>
      ) : null}

      {examples.length ? (
        <section className="flex flex-col gap-8" key={entry.slug}>
          <div className="flex items-baseline justify-between gap-4 border-b pb-2">
            <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
            <span className="text-sm text-muted-foreground">
              {examples.length} {examples.length === 1 ? "variation" : "variations"}
            </span>
          </div>
          {examples.map((example) => (
            <div key={example.name} className="flex min-w-0 flex-col gap-3">
              <h3 className="text-base font-medium tracking-tight">{example.title}</h3>
              {example.lead ? (
                <p className="max-w-[68ch] text-base leading-7 text-muted-foreground">{example.lead}</p>
              ) : null}
              <Example dir="ui" example={example} align="center" />
            </div>
          ))}
        </section>
      ) : null}

      <nav aria-label="More components" className="flex items-center justify-between gap-4 border-t pt-6">
        {previous ? (
          <Button variant="ghost" asChild>
            <Link to={`/components/${previous.slug}`}>
              <Icon icon={ArrowLeft02Icon} />
              {previous.title}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button variant="ghost" asChild>
            <Link to={`/components/${next.slug}`}>
              {next.title}
              <Icon icon={ArrowRight02Icon} />
            </Link>
          </Button>
        ) : null}
      </nav>
    </article>
  )
}
