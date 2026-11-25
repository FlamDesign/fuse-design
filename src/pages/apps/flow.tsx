import * as React from "react"
import {
  Add01Icon,
  AiChat02Icon,
  Cancel01Icon,
  Delete02Icon,
  FlashIcon,
  HelpCircleIcon,
  Image01Icon,
  LinkSquare02Icon,
  Settings02Icon,
  Target02Icon,
  ZoomInAreaIcon,
  ZoomOutAreaIcon,
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"

import { Icon, type IconSvgElement } from "@/components/icon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type Kind = "trigger" | "content" | "question" | "agent" | "action"
type Step = { id: string; kind: Kind; title: string; detail: string; x: number; y: number }
type Edge = { id: string; from: string; to: string; label: string }

const WIDTH = 224
const ANCHOR = 34

const kinds: Record<Kind, { label: string; icon: IconSvgElement; hint: string }> = {
  trigger: { label: "Trigger", icon: FlashIcon, hint: "What the viewer does to start the flow" },
  content: { label: "Show content", icon: Image01Icon, hint: "A card, clip or overlay inside the Flam" },
  question: { label: "Branch", icon: HelpCircleIcon, hint: "Split the flow on a yes or no check" },
  agent: { label: "Bud reply", icon: AiChat02Icon, hint: "A Bud answers from the brand guide" },
  action: { label: "Action", icon: LinkSquare02Icon, hint: "Leave the Flam, for example to a store page" },
}

const initialSteps: Step[] = [
  { id: "s1", kind: "trigger", title: "Viewer taps the coat", detail: "Any tap on the product photo", x: 40, y: 150 },
  { id: "s2", kind: "content", title: "Show product card", detail: "Three colours, price and sizes", x: 330, y: 150 },
  { id: "s3", kind: "question", title: "Did they ask a question?", detail: "Typed or spoken, within 10 seconds", x: 620, y: 150 },
  { id: "s4", kind: "agent", title: "Bud answers", detail: "Sizing and delivery, from the brand guide", x: 910, y: 40 },
  { id: "s5", kind: "action", title: "Open the store page", detail: "northwind.example/autumn-coat", x: 910, y: 270 },
  { id: "s6", kind: "content", title: "Show size guide", detail: "Chart with a fit note", x: 620, y: 380 },
]

const initialEdges: Edge[] = [
  { id: "e1", from: "s1", to: "s2", label: "" },
  { id: "e2", from: "s2", to: "s3", label: "" },
  { id: "e3", from: "s3", to: "s4", label: "Yes" },
  { id: "e4", from: "s3", to: "s5", label: "No" },
  { id: "e5", from: "s4", to: "s5", label: "" },
]

const curve = (ax: number, ay: number, bx: number, by: number) => {
  const bend = Math.max(48, Math.abs(bx - ax) / 2)
  return `M ${ax} ${ay} C ${ax + bend} ${ay}, ${bx - bend} ${by}, ${bx} ${by}`
}

export function FlowPage() {
  const [steps, setSteps] = React.useState(initialSteps)
  const [edges, setEdges] = React.useState(initialEdges)
  const [selectedId, setSelectedId] = React.useState<string | null>("s3")
  const [view, setView] = React.useState({ x: 0, y: 0, zoom: 1 })
  const offset = view
  const zoom = view.zoom
  const touched = React.useRef(false)
  const [link, setLink] = React.useState<{ from: string; x: number; y: number } | null>(null)
  const canvas = React.useRef<HTMLDivElement>(null)
  const drag = React.useRef<{ kind: "pan" | "step"; id?: string; x: number; y: number; ox: number; oy: number } | null>(null)
  const counter = React.useRef(7)

  const fit = React.useCallback(() => {
    const element = canvas.current
    if (!element || !steps.length) return
    const left = Math.min(...steps.map((step) => step.x))
    const top = Math.min(...steps.map((step) => step.y))
    const right = Math.max(...steps.map((step) => step.x + WIDTH))
    const bottom = Math.max(...steps.map((step) => step.y + 120))
    const next = Math.min(1, (element.clientWidth - 64) / (right - left), (element.clientHeight - 64) / (bottom - top))
    const scale = Math.max(0.4, next)
    setView({
      zoom: scale,
      x: Math.round((element.clientWidth - (right - left) * scale) / 2 - left * scale),
      y: Math.round((element.clientHeight - (bottom - top) * scale) / 2 - top * scale),
    })
  }, [steps])

  // Fit once the canvas has a size, and again on resize until the user moves the view.
  const fitRef = React.useRef(fit)
  React.useEffect(() => {
    fitRef.current = fit
  }, [fit])
  React.useEffect(() => {
    const element = canvas.current
    if (!element) return
    const observer = new ResizeObserver(() => {
      if (!touched.current) fitRef.current()
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const setZoom = (value: number) => {
    touched.current = true
    setView((current) => ({ ...current, zoom: Math.min(1.5, Math.max(0.4, Math.round(value * 10) / 10)) }))
  }

  const selected = steps.find((step) => step.id === selectedId) ?? null
  const byId = (id: string) => steps.find((step) => step.id === id)
  const orphans = steps.filter((step) => step.kind !== "trigger" && !edges.some((edge) => edge.to === step.id))

  const patch = (id: string, values: Partial<Step>) =>
    setSteps((current) => current.map((step) => (step.id === id ? { ...step, ...values } : step)))

  function addStep(kind: Kind) {
    const id = `s${counter.current++}`
    setSteps([...steps, { id, kind, title: kinds[kind].label, detail: "Describe what happens", x: Math.round((80 - offset.x) / zoom) + steps.length * 12, y: Math.round((60 - offset.y) / zoom) + steps.length * 12 }])
    setSelectedId(id)
  }

  function removeStep(id: string) {
    const step = byId(id)
    setSteps(steps.filter((item) => item.id !== id))
    setEdges(edges.filter((edge) => edge.from !== id && edge.to !== id))
    setSelectedId(null)
    if (step) toast(`Deleted "${step.title}"`)
  }

  function connect(from: string, to: string) {
    if (from === to || edges.some((edge) => edge.from === from && edge.to === to)) return
    const source = byId(from)
    const taken = edges.filter((edge) => edge.from === from).map((edge) => edge.label)
    const label = source?.kind === "question" ? (taken.includes("Yes") ? "No" : "Yes") : ""
    setEdges([...edges, { id: `e${counter.current++}`, from, to, label }])
  }

  function point(event: React.PointerEvent) {
    const rect = canvas.current!.getBoundingClientRect()
    return { x: (event.clientX - rect.left - offset.x) / zoom, y: (event.clientY - rect.top - offset.y) / zoom }
  }

  function onCanvasPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return
    setSelectedId(null)
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { kind: "pan", x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y }
  }

  function onStepPointerDown(event: React.PointerEvent<HTMLDivElement>, step: Step) {
    event.stopPropagation()
    setSelectedId(step.id)
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { kind: "step", id: step.id, x: event.clientX, y: event.clientY, ox: step.x, oy: step.y }
  }

  function onPointerMove(event: React.PointerEvent) {
    const state = drag.current
    if (!state) return
    const dx = event.clientX - state.x
    const dy = event.clientY - state.y
    if (state.kind === "pan") {
      touched.current = true
      setView((current) => ({ ...current, x: state.ox + dx, y: state.oy + dy }))
    } else if (state.id) patch(state.id, { x: Math.round(state.ox + dx / zoom), y: Math.round(state.oy + dy / zoom) })
  }

  function onHandlePointerDown(event: React.PointerEvent<HTMLButtonElement>, step: Step) {
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
    setLink({ from: step.id, ...point(event) })
  }

  function onHandlePointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    if (!link) return
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>("[data-step]")
    if (target?.dataset.step) connect(link.from, target.dataset.step)
    setLink(null)
  }

  function onStepKeyDown(event: React.KeyboardEvent, step: Step) {
    if (event.target !== event.currentTarget) return
    const size = event.shiftKey ? 32 : 8
    const moves: Record<string, Partial<Step>> = {
      ArrowLeft: { x: step.x - size },
      ArrowRight: { x: step.x + size },
      ArrowUp: { y: step.y - size },
      ArrowDown: { y: step.y + size },
    }
    if (moves[event.key]) {
      event.preventDefault()
      patch(step.id, moves[event.key])
    } else if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault()
      removeStep(step.id)
    }
  }

  function publish() {
    if (orphans.length) {
      toast.error("This flow can't be published yet", {
        description: `Connect or delete "${orphans[0].title}". Nothing leads to it.`,
      })
      setSelectedId(orphans[0].id)
      return
    }
    toast.success("Flow published", { description: "Live creatives pick it up within a minute." })
  }

  const outgoing = selected ? edges.filter((edge) => edge.from === selected.id) : []
  const candidates = selected
    ? steps.filter((step) => step.id !== selected.id && step.kind !== "trigger" && !outgoing.some((edge) => edge.to === step.id))
    : []

  const panel = selected ? (
    <ScrollArea className="h-full">
      <FieldGroup className="gap-4 p-4">
        <Field>
          <FieldLabel htmlFor="step-kind">Step type</FieldLabel>
          <Select value={selected.kind} onValueChange={(value) => patch(selected.id, { kind: value as Kind })}>
            <SelectTrigger id="step-kind" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(kinds) as Kind[]).map((kind) => (
                <SelectItem key={kind} value={kind}>
                  <Icon icon={kinds[kind].icon} />
                  {kinds[kind].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldDescription>{kinds[selected.kind].hint}.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="step-title">Title</FieldLabel>
          <Input id="step-title" value={selected.title} onChange={(event) => patch(selected.id, { title: event.target.value })} />
        </Field>
        <Field>
          <FieldLabel htmlFor="step-detail">Details</FieldLabel>
          <Textarea id="step-detail" rows={3} value={selected.detail} onChange={(event) => patch(selected.id, { detail: event.target.value })} />
        </Field>
        <FieldSeparator />
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Leads to</span>
          {outgoing.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing yet. The flow ends here.</p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {outgoing.map((edge) => (
                <li key={edge.id} className="flex items-center gap-2 rounded-xl border py-1 pr-1 pl-3 text-sm">
                  {edge.label ? <Badge variant="secondary">{edge.label}</Badge> : null}
                  <span className="min-w-0 flex-1 truncate">{byId(edge.to)?.title}</span>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Remove connection to ${byId(edge.to)?.title}`}
                    onClick={() => setEdges(edges.filter((item) => item.id !== edge.id))}
                  >
                    <Icon icon={Cancel01Icon} />
                  </Button>
                </li>
              ))}
            </ul>
          )}
          {candidates.length ? (
            <Select value="" onValueChange={(value) => connect(selected.id, value)}>
              <SelectTrigger aria-label="Connect to another step" className="w-full">
                <SelectValue placeholder="Connect to a step" />
              </SelectTrigger>
              <SelectContent>
                {candidates.map((step) => (
                  <SelectItem key={step.id} value={step.id}>{step.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
        </div>
        <FieldSeparator />
        <Button variant="destructive" size="sm" onClick={() => removeStep(selected.id)}>
          <Icon icon={Delete02Icon} />
          Delete step
        </Button>
      </FieldGroup>
    </ScrollArea>
  ) : (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyTitle>No step selected</EmptyTitle>
        <EmptyDescription>Select a step to edit it. Drag from the dot on its right edge to connect it.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b px-4 py-2">
        <div className="mr-auto flex min-w-0 flex-col leading-tight">
          <h1 className="truncate text-sm font-medium">Tap to shop</h1>
          <span className="truncate text-xs text-muted-foreground">
            {steps.length} steps, {edges.length} connections
            {orphans.length ? `, ${orphans.length} not connected` : ""}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Icon icon={Add01Icon} />
              Add step
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Step type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(kinds) as Kind[]).map((kind) => (
              <DropdownMenuItem key={kind} onSelect={() => addStep(kind)}>
                <Icon icon={kinds[kind].icon} />
                {kinds[kind].label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Edit selected step">
              <Icon icon={Settings02Icon} />
            </Button>
          </SheetTrigger>
          <SheetContent className="gap-0">
            <SheetHeader>
              <SheetTitle>Step</SheetTitle>
              <SheetDescription className="sr-only">Edit the selected step.</SheetDescription>
            </SheetHeader>
            {panel}
          </SheetContent>
        </Sheet>
        <Button onClick={publish}>Publish flow</Button>
      </div>

      <div className="flex min-h-0 flex-1">
        <div
          ref={canvas}
          role="application"
          aria-label="Flow canvas. Tab to a step, then use the arrow keys to move it."
          onPointerDown={onCanvasPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
          className="relative min-w-0 flex-1 cursor-grab touch-none overflow-hidden bg-muted active:cursor-grabbing"
          style={{
            backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
            backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
            backgroundPosition: `${offset.x}px ${offset.y}px`,
          }}
        >
          <div
            role="toolbar"
            aria-label="View controls"
            onPointerDown={(event) => event.stopPropagation()}
            className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 cursor-default items-center gap-1 rounded-full border bg-card p-1 shadow-lg"
          >
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Zoom out" onClick={() => setZoom(zoom - 0.1)} disabled={zoom <= 0.4}>
                <Icon icon={ZoomOutAreaIcon} />
              </Button>
              <span className="w-11 text-center text-sm text-muted-foreground tabular-nums">{Math.round(zoom * 100)}%</span>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Zoom in" onClick={() => setZoom(zoom + 0.1)} disabled={zoom >= 1.5}>
                <Icon icon={ZoomInAreaIcon} />
              </Button>
            </div>
            <Button
              variant="ghost"
              className="rounded-full"
              onClick={() => {
                touched.current = false
                fit()
              }}
            >
              <Icon icon={Target02Icon} />
              Fit to screen
            </Button>
          </div>
          <div className="pointer-events-none absolute top-0 left-0 origin-top-left" style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}>
            <svg className="absolute top-0 left-0 overflow-visible" width="1" height="1" aria-hidden>
              <defs>
                <marker id="flow-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                  <path d="M0 0 L8 4 L0 8 z" fill="context-stroke" />
                </marker>
              </defs>
              {edges.map((edge) => {
                const from = byId(edge.from)
                const to = byId(edge.to)
                if (!from || !to) return null
                const active = selectedId === edge.from || selectedId === edge.to
                return (
                  <path
                    key={edge.id}
                    d={curve(from.x + WIDTH, from.y + ANCHOR, to.x - 4, to.y + ANCHOR)}
                    fill="none"
                    stroke={active ? "var(--primary)" : "var(--muted-foreground)"}
                    strokeOpacity={active ? 1 : 0.55}
                    strokeWidth={active ? 2 : 1.5}
                    markerEnd="url(#flow-arrow)"
                  />
                )
              })}
              {link ? (
                <path
                  d={curve((byId(link.from)?.x ?? 0) + WIDTH, (byId(link.from)?.y ?? 0) + ANCHOR, link.x, link.y)}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              ) : null}
            </svg>

            {edges.map((edge) => {
              const from = byId(edge.from)
              const to = byId(edge.to)
              if (!edge.label || !from || !to) return null
              return (
                <Badge
                  key={edge.id}
                  variant="outline"
                  className="absolute -translate-x-1/2 -translate-y-1/2 bg-card"
                  style={{ left: (from.x + WIDTH + to.x) / 2, top: (from.y + to.y) / 2 + ANCHOR }}
                >
                  {edge.label}
                </Badge>
              )
            })}

            {steps.map((step) => {
              const isSelected = step.id === selectedId
              const orphan = orphans.includes(step)
              return (
                <div
                  key={step.id}
                  data-step={step.id}
                  role="group"
                  tabIndex={0}
                  aria-label={`${kinds[step.kind].label}: ${step.title}${orphan ? ", not connected" : ""}${isSelected ? ", selected" : ""}`}
                  onPointerDown={(event) => onStepPointerDown(event, step)}
                  onPointerMove={onPointerMove}
                  onPointerUp={() => (drag.current = null)}
                  onKeyDown={(event) => onStepKeyDown(event, step)}
                  onFocus={() => setSelectedId(step.id)}
                  className={cn(
                    "pointer-events-auto absolute flex cursor-move touch-none flex-col gap-1.5 rounded-2xl border bg-card p-3 text-sm shadow-sm outline-none select-none",
                    isSelected ? "border-primary ring-3 ring-ring/50" : "hover:border-foreground/30"
                  )}
                  style={{ left: step.x, top: step.y, width: WIDTH }}
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon icon={kinds[step.kind].icon} className="size-4" />
                    <span className="text-xs">{kinds[step.kind].label}</span>
                    {orphan ? <Badge variant="destructive" className="ml-auto">Not connected</Badge> : null}
                  </div>
                  <div className="leading-snug font-medium">{step.title}</div>
                  <div className="leading-snug text-muted-foreground">{step.detail}</div>
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={`Drag to connect ${step.title} to another step`}
                    onPointerDown={(event) => onHandlePointerDown(event, step)}
                    onPointerMove={(event) => link && setLink({ ...link, ...point(event) })}
                    onPointerUp={onHandlePointerUp}
                    className="absolute -right-2 size-4 cursor-crosshair rounded-full border-2 border-card bg-foreground outline-none hover:bg-chart-3"
                    style={{ top: ANCHOR - 8 }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <aside aria-label="Step settings" className="hidden w-72 shrink-0 border-l lg:block">
          {panel}
        </aside>
      </div>
    </div>
  )
}
