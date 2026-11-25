import * as React from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft02Icon, ArrowRight02Icon, LinkSquare02Icon } from "@hugeicons/core-free-icons"

import { aiGroups } from "@/ai-nav"
import { aiRegistry, type AiEntry } from "@/ai-registry"
import { Code } from "@/components/demo"
import { Example } from "@/components/example"
import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"

const docsPath: Record<AiEntry["group"], string> = {
  elements: "ai-elements/radix",
  utilities: "utils",
  helpers: "helpers",
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex min-w-0 flex-col gap-3" aria-label={title}>
      <h2 className="border-b pb-2 text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

const prose = "max-w-[68ch] text-base leading-7 text-muted-foreground"

export function AiElementPage() {
  const { slug } = useParams()
  const index = aiRegistry.findIndex((entry) => entry.slug === slug)
  if (index === -1) return <Navigate to="/ai" replace />

  const entry = aiRegistry[index]
  const previous = aiRegistry[index - 1]
  const next = aiRegistry[index + 1]
  const [hero, ...more] = entry.examples

  return (
    <article key={entry.slug} className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 py-8 md:px-8 md:py-10">
      <header className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-heading text-4xl leading-tight font-semibold tracking-[-0.02em]">{entry.title}</h1>
          <Button variant="outline" size="sm" asChild className="mt-1.5 shrink-0">
            <a href={`https://ui.shadcn.com/docs/${docsPath[entry.group]}/${entry.slug}`} target="_blank" rel="noreferrer">
              Docs
              <Icon icon={LinkSquare02Icon} />
            </a>
          </Button>
        </div>
        <p className="max-w-[62ch] text-lg leading-7 text-muted-foreground">{entry.description}</p>
      </header>

      {hero ? (
        <>
          <h2 className="sr-only">Preview</h2>
          <Example dir="ai" example={hero} />
        </>
      ) : null}

      {entry.intro.length ? (
        <div className="flex flex-col gap-3">
          {entry.intro.map((text) => (
            <p key={text} className={prose}>{text}</p>
          ))}
        </div>
      ) : null}

      {entry.install ? (
        <Section title="Installation">
          {entry.group === "elements" ? (
            <p className={prose}>A pattern, not a package. It is composed from components already in this kit.</p>
          ) : null}
          <Code language="bash" title="Terminal" code={entry.install} />
        </Section>
      ) : null}

      {entry.usage ? (
        <Section title="Usage">
          <Code code={entry.usage} title="Usage" />
        </Section>
      ) : null}

      {more.map((example) => (
        <Section key={example.name} title={example.title}>
          {example.lead ? <p className={prose}>{example.lead}</p> : null}
          <Example dir="ai" example={example} />
        </Section>
      ))}

      {entry.notes?.map((note) => (
        <Section key={note.title} title={note.title}>
          {note.text ? <p className={prose}>{note.text}</p> : null}
          {note.code ? <Code code={note.code} title={note.title} /> : null}
        </Section>
      ))}

      {entry.sdk ? (
        <Section title="AI SDK">
          {entry.sdk.text ? <p className={prose}>{entry.sdk.text}</p> : null}
          {entry.sdk.code ? <Code code={entry.sdk.code} title="AI SDK" /> : null}
        </Section>
      ) : null}

      <nav aria-label="More AI Elements" className="flex items-center justify-between gap-4 border-t pt-6">
        {previous ? (
          <Button variant="ghost" asChild>
            <Link to={`/ai/${previous.slug}`}>
              <Icon icon={ArrowLeft02Icon} />
              {previous.title}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button variant="ghost" asChild>
            <Link to={`/ai/${next.slug}`}>
              {next.title}
              <Icon icon={ArrowRight02Icon} />
            </Link>
          </Button>
        ) : null}
      </nav>
    </article>
  )
}

export function AiIndexPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-8 md:px-8 md:py-10">
      <div className="flex max-w-[60ch] flex-col gap-2">
        <h1 className="font-heading text-[28px] leading-8 font-semibold tracking-tight">AI Elements</h1>
        <p className="text-base leading-6 text-muted-foreground">
          Patterns for agent interfaces, composed from the components in this kit and driven by the Vercel AI SDK.
        </p>
      </div>
      {aiGroups.map((group) => (
        <section key={group.key} className="flex flex-col gap-4" aria-label={group.label}>
          <h2 className="text-base font-medium tracking-tight">{group.label}</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {aiRegistry
              .filter((entry) => entry.group === group.key)
              .map((entry) => (
                <li key={entry.slug}>
                  <Link
                    to={`/ai/${entry.slug}`}
                    className="flex h-full flex-col gap-1 rounded-2xl bg-card p-4 ring-1 ring-border transition-colors outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="font-medium">{entry.title}</span>
                    <span className="text-sm leading-5 text-muted-foreground">{entry.description}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
