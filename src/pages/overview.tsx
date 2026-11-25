import { Link } from "react-router-dom"

import { appPages } from "@/nav"
import { registry } from "@/registry"
import { aiRegistry } from "@/ai-nav"
import { Icon } from "@/components/icon"
import { ComponentList } from "@/pages/docs/components-index"

const setup = [
  ["Style", "Rhea on Radix UI"],
  ["Icons", "Hugeicons"],
  ["Typeface", "Golos Text"],
  ["Typeset", "16px body for rendered content"],
]

const elements = aiRegistry.filter((entry) => entry.group === "elements")

export function OverviewPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-14 px-5 py-12 md:px-8 md:py-16">
      <header className="flex flex-col gap-6">
        <h1 className="font-heading text-5xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-6xl">
          One set of parts for every Flam app.
        </h1>
        <p className="max-w-[58ch] text-lg leading-7 text-muted-foreground">
          {registry.length} components and {elements.length} AI Elements with live previews and code, plus{" "}
          {appPages.length} working screens built from them. Change a token value in one file and every page here follows.
        </p>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-4 border-t pt-6 sm:grid-cols-4">
          {setup.map(([term, value]) => (
            <div key={term} className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">{term}</dt>
              <dd className="text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-medium tracking-tight">Sample screens</h2>
          <span className="text-sm text-muted-foreground">Built only from kit components</span>
        </div>
        <ul className="border-t">
          {appPages.map((page) => (
            <li key={page.to} className="border-b">
              <Link
                to={page.to}
                className="group -mx-3 flex items-start gap-4 rounded-xl px-3 py-4 outline-none transition-colors hover:bg-card focus-visible:ring-3 focus-visible:ring-ring/30"
              >
                <Icon icon={page.icon} className="mt-0.5 size-5 shrink-0 text-muted-foreground group-hover:text-foreground" />
                <span className="w-36 shrink-0 font-medium">{page.title}</span>
                <span className="hidden min-w-0 flex-1 text-sm leading-6 text-muted-foreground sm:block">{page.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4 border-b pb-3">
          <h2 className="text-lg font-medium tracking-tight">Components</h2>
          <Link to="/components" className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            {registry.length} in all
          </Link>
        </div>
        <ComponentList className="columns-2 gap-x-8 sm:columns-3" />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4 border-b pb-3">
          <h2 className="text-lg font-medium tracking-tight">AI Elements</h2>
          <Link to="/ai" className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            {elements.length} patterns, utilities and helpers
          </Link>
        </div>
        <ul className="columns-2 gap-x-8 sm:columns-3">
          {aiRegistry.map((entry) => (
            <li key={entry.slug} className="break-inside-avoid">
              <Link
                to={`/ai/${entry.slug}`}
                className="block rounded-md py-1 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                {entry.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
