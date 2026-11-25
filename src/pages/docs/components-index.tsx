import { Link } from "react-router-dom"

import { registry } from "@/registry"

export function ComponentList({ className }: { className?: string }) {
  return (
    <ul className={className ?? "columns-2 gap-x-8 sm:columns-3 lg:columns-4"}>
      {registry.map((entry) => (
        <li key={entry.slug} className="break-inside-avoid">
          <Link
            to={`/components/${entry.slug}`}
            className="-mx-2 block rounded-lg px-2 py-1.5 text-base font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30"
          >
            {entry.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function ComponentsIndexPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-8 md:px-8 md:py-10">
      <header className="flex max-w-[62ch] flex-col gap-2">
        <h1 className="font-heading text-4xl leading-tight font-semibold tracking-[-0.02em]">Components</h1>
        <p className="text-lg leading-7 text-muted-foreground">
          Every component in the kit, {registry.length} in all. Each page has a live preview, its code, the install
          command and the import.
        </p>
      </header>
      <ComponentList />
    </div>
  )
}
