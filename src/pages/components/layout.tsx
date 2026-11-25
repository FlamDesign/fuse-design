import * as React from "react"
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons"

import { Demo, DemoGrid, Page } from "@/components/demo"
import { Icon } from "@/components/icon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { DirectionProvider } from "@/components/ui/direction"
import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const faqs = [
  ["Can I change the theme later?", "Yes. Edit the token values in src/index.css. Token names stay the same, so no component needs to change."],
  ["Which primitives are used?", "Radix UI for almost everything, with Base UI behind the combobox."],
  ["How do I add a component?", "Run npx shadcn@latest add followed by the component name."],
]

const releases = Array.from({ length: 24 }, (_, i) => `v4.${23 - i}.0`)

export function LayoutPage() {
  const [open, setOpen] = React.useState(true)

  return (
    <Page title="Layout" description="Structure, disclosure and scrolling containers.">
      <DemoGrid>
        <Demo title="Accordion" center={false}>
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map(([q, a], i) => (
              <AccordionItem key={q} value={`item-${i}`}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Demo>

        <Demo title="Collapsible" center={false}>
          <Collapsible open={open} onOpenChange={setOpen} className="flex w-full flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">3 placements selected</span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Toggle placements">
                  <Icon icon={UnfoldMoreIcon} />
                </Button>
              </CollapsibleTrigger>
            </div>
            <div className="rounded-xl border px-3 py-2 text-sm">Homepage hero</div>
            <CollapsibleContent className="flex flex-col gap-2">
              <div className="rounded-xl border px-3 py-2 text-sm">Article inline</div>
              <div className="rounded-xl border px-3 py-2 text-sm">Video pre-roll</div>
            </CollapsibleContent>
          </Collapsible>
        </Demo>

        <Demo title="Separator" className="flex-col">
          <div className="w-full max-w-sm">
            <div className="text-sm font-medium">Rhea</div>
            <div className="text-sm text-muted-foreground">A more compact Luma.</div>
            <Separator className="my-3" />
            <div className="flex h-5 items-center gap-3 text-sm">
              <span>Docs</span>
              <Separator orientation="vertical" />
              <span>Changelog</span>
              <Separator orientation="vertical" />
              <span>Source</span>
            </div>
          </div>
        </Demo>

        <Demo title="Scroll Area" className="items-start">
          <ScrollArea className="h-48 w-40 rounded-2xl border">
            <div className="p-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/30" tabIndex={0} role="group" aria-label="Releases">
              <div className="mb-2 text-sm font-medium">Releases</div>
              {releases.map((tag) => (
                <div key={tag} className="border-t py-1.5 text-sm tabular-nums">{tag}</div>
              ))}
            </div>
          </ScrollArea>
          <ScrollArea className="w-64 rounded-2xl border whitespace-nowrap">
            <div className="flex gap-3 p-3 outline-none" tabIndex={0} role="group" aria-label="Frames">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="flex h-24 w-32 shrink-0 items-center justify-center rounded-xl bg-muted text-sm">
                  Frame {n}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Demo>

        <Demo title="Resizable" wide center={false}>
          <ResizablePanelGroup orientation="horizontal" className="h-56 w-full rounded-2xl border">
            <ResizablePanel defaultSize="30%" minSize="15%">
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Sidebar</div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="70%">
              <ResizablePanelGroup orientation="vertical">
                <ResizablePanel defaultSize="60%">
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Content</div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize="40%">
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Console</div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Demo>

        <Demo title="Direction" wide className="flex-col">
          <DirectionProvider dir="rtl">
            <div dir="rtl" className="flex w-full max-w-sm flex-col gap-3">
              <Input placeholder="ابحث هنا" />
              <div className="flex items-center justify-between text-sm">
                <span>الوضع الداكن</span>
                <Switch defaultChecked aria-label="Dark mode" />
              </div>
            </div>
          </DirectionProvider>
          <p className="text-sm text-muted-foreground">DirectionProvider with dir="rtl".</p>
        </Demo>
      </DemoGrid>
    </Page>
  )
}
