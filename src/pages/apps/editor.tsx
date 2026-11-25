import * as React from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft01Icon,
  Copy01Icon,
  Cursor02Icon,
  Delete02Icon,
  Image01Icon,
  LayerBringForwardIcon,
  LayerSendBackwardIcon,
  Layers01Icon,
  Redo02Icon,
  Settings02Icon,
  SquareIcon,
  TextIcon,
  TouchInteraction01Icon,
  Undo02Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"

import { Icon, type IconSvgElement } from "@/components/icon"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const BOARD = { width: 300, height: 600 }

type Kind = "text" | "shape" | "image" | "button"
type FillKey = "ink" | "paper" | "white" | "muted" | "orange" | "blue" | "gold"
type Layer = {
  id: string
  name: string
  kind: Kind
  x: number
  y: number
  w: number
  h: number
  fill: FillKey
  radius: number
  opacity: number
  text?: string
  size?: number
  weight?: number
  hidden?: boolean
  action: string
}
type Variation = { id: string; name: string; layers: Layer[] }
type Doc = { layers: Layer[]; past: Layer[][]; future: Layer[][] }
type Tool = "select" | "text" | "shape"

const fills: Record<FillKey, { label: string; color: string; on: string }> = {
  ink: { label: "Ink", color: "var(--foreground)", on: "var(--background)" },
  paper: { label: "Paper", color: "var(--background)", on: "var(--foreground)" },
  white: { label: "Card", color: "var(--card)", on: "var(--card-foreground)" },
  muted: { label: "Muted", color: "var(--muted)", on: "var(--foreground)" },
  orange: { label: "Brand", color: "var(--brand)", on: "var(--brand-foreground)" },
  blue: { label: "Stone", color: "var(--muted-foreground)", on: "var(--background)" },
  gold: { label: "Amber", color: "var(--chart-1)", on: "oklch(0.216 0.006 56.043)" },
}

const actions = ["None", "Open product card", "Play next Flick", "Ask a Bud", "Open link"]
const kindIcon: Record<Kind, IconSvgElement> = {
  text: TextIcon,
  shape: SquareIcon,
  image: Image01Icon,
  button: TouchInteraction01Icon,
}

const base: Layer[] = [
  { id: "bg", name: "Background", kind: "shape", x: 0, y: 0, w: 300, h: 600, fill: "paper", radius: 0, opacity: 100, action: "None" },
  { id: "photo", name: "Product photo", kind: "image", x: 16, y: 16, w: 268, h: 300, fill: "muted", radius: 20, opacity: 100, action: "Open product card" },
  { id: "tag", name: "Offer tag", kind: "button", x: 28, y: 28, w: 96, h: 28, fill: "orange", radius: 14, opacity: 100, text: "New season", size: 12, weight: 600, action: "None" },
  { id: "headline", name: "Headline", kind: "text", x: 16, y: 336, w: 268, h: 96, fill: "ink", radius: 0, opacity: 100, text: "Tap to try the autumn coat on.", size: 30, weight: 600, action: "None" },
  { id: "body", name: "Body", kind: "text", x: 16, y: 440, w: 268, h: 48, fill: "ink", radius: 0, opacity: 70, text: "Swipe for colours. Ask about sizing.", size: 15, weight: 400, action: "None" },
  { id: "cta", name: "Shop button", kind: "button", x: 16, y: 520, w: 268, h: 52, fill: "ink", radius: 26, opacity: 100, text: "Shop the look", size: 16, weight: 600, action: "Open link" },
]

const withHeadline = (text: string) => base.map((layer) => (layer.id === "headline" ? { ...layer, text } : layer))
const initialVariations: Variation[] = [
  { id: "a", name: "A, try it on", layers: base },
  { id: "b", name: "B, free delivery", layers: withHeadline("Free delivery on the autumn coat.") },
  { id: "c", name: "C, last sizes", layers: withHeadline("Last sizes left. See yours.") },
]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function LayerView({ layer }: { layer: Layer }) {
  const fill = fills[layer.fill]
  const common: React.CSSProperties = { borderRadius: layer.radius, opacity: layer.opacity / 100 }
  if (layer.kind === "text") {
    return (
      <div
        className="size-full overflow-hidden leading-[1.15] tracking-tight"
        style={{ ...common, color: fill.color, fontSize: layer.size, fontWeight: layer.weight }}
      >
        {layer.text}
      </div>
    )
  }
  if (layer.kind === "button") {
    return (
      <div
        className="flex size-full items-center justify-center overflow-hidden px-3 text-center leading-none"
        style={{ ...common, background: fill.color, color: fill.on, fontSize: layer.size, fontWeight: layer.weight }}
      >
        {layer.text}
      </div>
    )
  }
  if (layer.kind === "image") {
    return (
      <div
        className="flex size-full items-center justify-center text-foreground/40"
        style={{
          ...common,
          background:
            "linear-gradient(140deg, color-mix(in oklab, var(--chart-1) 45%, var(--card)), color-mix(in oklab, var(--brand) 30%, var(--card)))",
        }}
      >
        <Icon icon={Image01Icon} className="size-8" />
      </div>
    )
  }
  return <div className="size-full" style={{ ...common, background: fill.color }} />
}

function Board({ layers }: { layers: Layer[] }) {
  return (
    <div className="relative overflow-hidden bg-background" style={BOARD}>
      {layers
        .filter((layer) => !layer.hidden)
        .map((layer) => (
          <div key={layer.id} className="absolute" style={{ left: layer.x, top: layer.y, width: layer.w, height: layer.h }}>
            <LayerView layer={layer} />
          </div>
        ))}
    </div>
  )
}

export function EditorPage() {
  const [variations, setVariations] = React.useState(initialVariations)
  const [activeId, setActiveId] = React.useState("a")
  const [doc, setDoc] = React.useState<Doc>({ layers: base, past: [], future: [] })
  const [selectedId, setSelectedId] = React.useState<string | null>("headline")
  const [tool, setTool] = React.useState<Tool>("select")
  const [zoom, setZoom] = React.useState(100)
  const drag = React.useRef<{ mode: "move" | "resize"; id: string; x: number; y: number; origin: Layer; recorded: boolean } | null>(null)
  const counter = React.useRef(1)

  const scale = zoom / 100
  const layers = doc.layers
  const selected = layers.find((layer) => layer.id === selectedId) ?? null
  const active = variations.find((variation) => variation.id === activeId)!

  const change = React.useCallback((update: (layers: Layer[]) => Layer[], record = true) => {
    setDoc((current) => ({
      layers: update(current.layers),
      past: record ? [...current.past.slice(-49), current.layers] : current.past,
      future: record ? [] : current.future,
    }))
  }, [])

  const patch = (id: string, values: Partial<Layer>, record = true) =>
    change((current) => current.map((layer) => (layer.id === id ? { ...layer, ...values } : layer)), record)

  const undo = () =>
    setDoc((current) =>
      current.past.length
        ? { layers: current.past[current.past.length - 1], past: current.past.slice(0, -1), future: [current.layers, ...current.future] }
        : current
    )
  const redo = () =>
    setDoc((current) =>
      current.future.length
        ? { layers: current.future[0], past: [...current.past, current.layers], future: current.future.slice(1) }
        : current
    )

  function remove(id: string) {
    change((current) => current.filter((layer) => layer.id !== id))
    setSelectedId(null)
  }

  function duplicate(layer: Layer) {
    const id = `layer-${counter.current++}`
    change((current) => [...current, { ...layer, id, name: `${layer.name} copy`, x: clamp(layer.x + 12, 0, BOARD.width - layer.w), y: clamp(layer.y + 12, 0, BOARD.height - layer.h) }])
    setSelectedId(id)
  }

  function reorder(id: string, direction: 1 | -1) {
    change((current) => {
      const index = current.findIndex((layer) => layer.id === id)
      const target = clamp(index + direction, 0, current.length - 1)
      if (index === target) return current
      const next = [...current]
      next.splice(target, 0, next.splice(index, 1)[0])
      return next
    })
  }

  function switchVariation(id: string) {
    if (id === activeId) return
    const next = variations.find((variation) => variation.id === id)
    if (!next) return
    setVariations(variations.map((variation) => (variation.id === activeId ? { ...variation, layers } : variation)))
    setDoc({ layers: next.layers, past: [], future: [] })
    setActiveId(id)
    setSelectedId(null)
  }

  function duplicateVariation() {
    const letter = String.fromCharCode(65 + variations.length)
    const id = `v-${counter.current++}`
    setVariations([
      ...variations.map((variation) => (variation.id === activeId ? { ...variation, layers } : variation)),
      { id, name: `${letter}, copy of ${active.name.slice(0, 1)}`, layers },
    ])
    setActiveId(id)
    setDoc({ layers, past: [], future: [] })
    toast(`Variation ${letter} created and set active`)
  }

  function onBoardPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return
    if (tool === "select") {
      setSelectedId(null)
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.round((event.clientX - rect.left) / scale)
    const y = Math.round((event.clientY - rect.top) / scale)
    const id = `layer-${counter.current++}`
    const layer: Layer =
      tool === "text"
        ? { id, name: "Text", kind: "text", x: clamp(x, 0, 140), y: clamp(y, 0, 560), w: 160, h: 40, fill: "ink", radius: 0, opacity: 100, text: "New text", size: 18, weight: 500, action: "None" }
        : { id, name: "Rectangle", kind: "shape", x: clamp(x, 0, 200), y: clamp(y, 0, 520), w: 100, h: 80, fill: "muted", radius: 12, opacity: 100, action: "None" }
    change((current) => [...current, layer])
    setSelectedId(id)
    setTool("select")
  }

  function onLayerPointerDown(event: React.PointerEvent<HTMLDivElement>, layer: Layer, mode: "move" | "resize") {
    if (tool !== "select") return
    event.stopPropagation()
    setSelectedId(layer.id)
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { mode, id: layer.id, x: event.clientX, y: event.clientY, origin: layer, recorded: false }
  }

  function onLayerPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const state = drag.current
    if (!state) return
    const dx = Math.round((event.clientX - state.x) / scale)
    const dy = Math.round((event.clientY - state.y) / scale)
    if (!dx && !dy) return
    const { origin } = state
    const values =
      state.mode === "move"
        ? { x: clamp(origin.x + dx, -origin.w + 16, BOARD.width - 16), y: clamp(origin.y + dy, -origin.h + 16, BOARD.height - 16) }
        : { w: clamp(origin.w + dx, 16, BOARD.width), h: clamp(origin.h + dy, 16, BOARD.height) }
    patch(state.id, values, !state.recorded)
    state.recorded = true
  }

  function onLayerKeyDown(event: React.KeyboardEvent, layer: Layer) {
    const step = event.shiftKey ? 8 : 1
    const moves: Record<string, Partial<Layer>> = {
      ArrowLeft: { x: layer.x - step },
      ArrowRight: { x: layer.x + step },
      ArrowUp: { y: layer.y - step },
      ArrowDown: { y: layer.y + step },
    }
    if (moves[event.key]) {
      event.preventDefault()
      patch(layer.id, moves[event.key])
    } else if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault()
      remove(layer.id)
    }
  }

  const layersPanel = (
    <Tabs defaultValue="layers" className="flex h-full min-h-0 flex-col gap-0">
      <div className="p-3">
        <TabsList className="w-full">
          <TabsTrigger value="layers">Layers</TabsTrigger>
          <TabsTrigger value="variations">Variations</TabsTrigger>
        </TabsList>
      </div>
      <Separator />
      <TabsContent value="layers" className="min-h-0 flex-1">
        <ScrollArea className="h-full">
          <ul className="flex flex-col gap-0.5 p-2">
            {[...layers].reverse().map((layer) => (
              <li key={layer.id} className={cn("flex items-center rounded-xl", layer.id === selectedId && "bg-muted")}>
                <button
                  type="button"
                  onClick={() => setSelectedId(layer.id)}
                  aria-current={layer.id === selectedId}
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-2 rounded-xl px-2 py-1.5 text-left text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
                    layer.hidden && "text-muted-foreground"
                  )}
                >
                  <Icon icon={kindIcon[layer.kind]} className="size-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{layer.name}</span>
                </button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="mr-1"
                  aria-label={layer.hidden ? `Show ${layer.name}` : `Hide ${layer.name}`}
                  aria-pressed={!!layer.hidden}
                  onClick={() => patch(layer.id, { hidden: !layer.hidden })}
                >
                  <Icon icon={layer.hidden ? ViewOffIcon : ViewIcon} />
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </TabsContent>
      <TabsContent value="variations" className="flex min-h-0 flex-1 flex-col gap-4 p-3">
        <p className="text-sm text-muted-foreground">One variation of this creative is active at a time.</p>
        <RadioGroup value={activeId} onValueChange={switchVariation} aria-label="Active variation">
          {variations.map((variation) => (
            <div key={variation.id} className="flex items-center gap-2">
              <RadioGroupItem value={variation.id} id={`variation-${variation.id}`} />
              <Label htmlFor={`variation-${variation.id}`} className="font-normal">
                {variation.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Button variant="outline" size="sm" onClick={duplicateVariation}>
          <Icon icon={Copy01Icon} />
          Duplicate this variation
        </Button>
      </TabsContent>
    </Tabs>
  )

  const number = (key: "x" | "y" | "w" | "h", label: string) =>
    selected ? (
      <Field>
        <FieldLabel htmlFor={`prop-${key}`}>{label}</FieldLabel>
        <Input
          id={`prop-${key}`}
          type="number"
          inputMode="numeric"
          value={selected[key]}
          onChange={(event) => patch(selected.id, { [key]: clamp(Number(event.target.value) || 0, key === "w" || key === "h" ? 1 : -600, 600) })}
        />
      </Field>
    ) : null

  const propertiesPanel = selected ? (
    <ScrollArea className="h-full">
      <FieldGroup className="gap-4 p-4">
        <Field>
          <FieldLabel htmlFor="prop-name">Layer name</FieldLabel>
          <Input id="prop-name" value={selected.name} onChange={(event) => patch(selected.id, { name: event.target.value })} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          {number("x", "X")}
          {number("y", "Y")}
          {number("w", "Width")}
          {number("h", "Height")}
        </div>
        <FieldSeparator />
        {selected.kind !== "image" ? (
          <Field>
            <FieldLabel htmlFor="prop-fill">{selected.kind === "text" ? "Text colour" : "Fill"}</FieldLabel>
            <Select value={selected.fill} onValueChange={(value) => patch(selected.id, { fill: value as FillKey })}>
              <SelectTrigger id="prop-fill" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(fills) as FillKey[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    <span className="size-3 rounded-full border" style={{ background: fills[key].color }} />
                    {fills[key].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        ) : null}
        {selected.kind !== "text" ? (
          <Field>
            <div className="flex justify-between">
              <FieldLabel htmlFor="prop-radius">Corner radius</FieldLabel>
              <span className="text-sm text-muted-foreground tabular-nums">{selected.radius}px</span>
            </div>
            <Slider id="prop-radius" aria-label="Corner radius" value={[selected.radius]} max={40} step={1} onValueChange={([value]) => patch(selected.id, { radius: value })} />
          </Field>
        ) : null}
        <Field>
          <div className="flex justify-between">
            <FieldLabel htmlFor="prop-opacity">Opacity</FieldLabel>
            <span className="text-sm text-muted-foreground tabular-nums">{selected.opacity}%</span>
          </div>
          <Slider id="prop-opacity" aria-label="Opacity" value={[selected.opacity]} min={10} max={100} step={5} onValueChange={([value]) => patch(selected.id, { opacity: value })} />
        </Field>
        {selected.kind === "text" || selected.kind === "button" ? (
          <>
            <FieldSeparator />
            <Field>
              <FieldLabel htmlFor="prop-text">Text</FieldLabel>
              <Textarea id="prop-text" rows={2} value={selected.text ?? ""} onChange={(event) => patch(selected.id, { text: event.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="prop-size">Size</FieldLabel>
                <Select value={String(selected.size)} onValueChange={(value) => patch(selected.id, { size: Number(value) })}>
                  <SelectTrigger id="prop-size" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[12, 14, 15, 16, 18, 22, 26, 30, 36].map((size) => (
                      <SelectItem key={size} value={String(size)}>{size}px</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="prop-weight">Weight</FieldLabel>
                <Select value={String(selected.weight)} onValueChange={(value) => patch(selected.id, { weight: Number(value) })}>
                  <SelectTrigger id="prop-weight" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="400">Regular</SelectItem>
                    <SelectItem value="500">Medium</SelectItem>
                    <SelectItem value="600">Semibold</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </>
        ) : null}
        <FieldSeparator />
        <Field>
          <FieldLabel htmlFor="prop-action">When tapped</FieldLabel>
          <Select value={selected.action} onValueChange={(value) => patch(selected.id, { action: value })}>
            <SelectTrigger id="prop-action" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {actions.map((action) => (
                <SelectItem key={action} value={action}>{action}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldDescription>Build longer responses in the flow builder.</FieldDescription>
        </Field>
        <FieldSeparator />
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={() => reorder(selected.id, 1)}>
            <Icon icon={LayerBringForwardIcon} />
            Forward
          </Button>
          <Button variant="outline" size="sm" onClick={() => reorder(selected.id, -1)}>
            <Icon icon={LayerSendBackwardIcon} />
            Backward
          </Button>
          <Button variant="outline" size="sm" onClick={() => duplicate(selected)}>
            <Icon icon={Copy01Icon} />
            Duplicate
          </Button>
          <Button variant="destructive" size="sm" onClick={() => remove(selected.id)}>
            <Icon icon={Delete02Icon} />
            Delete
          </Button>
        </div>
      </FieldGroup>
    </ScrollArea>
  ) : (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyTitle>Nothing selected</EmptyTitle>
        <EmptyDescription>Select a layer on the canvas or in the list to edit it.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )

  const tools: { value: Tool; label: string; icon: IconSvgElement }[] = [
    { value: "select", label: "Select and move", icon: Cursor02Icon },
    { value: "text", label: "Add text", icon: TextIcon },
    { value: "shape", label: "Add rectangle", icon: SquareIcon },
  ]

  return (
    <div className="flex h-full min-h-0 flex-col">
      <h1 className="sr-only">Creative editor</h1>
      <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link to="/apps/campaigns" aria-label="Back to campaigns">
            <Icon icon={ArrowLeft01Icon} />
          </Link>
        </Button>
        <div className="mr-auto flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-medium">Autumn collection launch</span>
          <span className="truncate text-xs text-muted-foreground">Half page, 300 × 600, variation {active.name.slice(0, 1)}</span>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Layers and variations">
                <Icon icon={Layers01Icon} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="gap-0">
              <SheetHeader>
                <SheetTitle>Layers and variations</SheetTitle>
                <SheetDescription className="sr-only">Select layers or switch variation.</SheetDescription>
              </SheetHeader>
              {layersPanel}
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Properties">
                <Icon icon={Settings02Icon} />
              </Button>
            </SheetTrigger>
            <SheetContent className="gap-0">
              <SheetHeader>
                <SheetTitle>Properties</SheetTitle>
                <SheetDescription className="sr-only">Edit the selected layer.</SheetDescription>
              </SheetHeader>
              {propertiesPanel}
            </SheetContent>
          </Sheet>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Preview</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Variation {active.name.slice(0, 1)} preview</DialogTitle>
              <DialogDescription>Shown at full size, as people will see it.</DialogDescription>
            </DialogHeader>
            <div className="mx-auto max-h-[60vh] overflow-auto rounded-2xl border">
              <Board layers={layers} />
            </div>
          </DialogContent>
        </Dialog>
        <Button onClick={() => toast.success(`Variation ${active.name.slice(0, 1)} saved`)}>Save variation</Button>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside aria-label="Layers and variations" className="hidden w-60 shrink-0 border-r lg:block">
          {layersPanel}
        </aside>

        <div className="relative min-w-0 flex-1">
          <div
            role="toolbar"
            aria-label="Canvas tools"
            className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border bg-card p-1 shadow-lg"
          >
            <ToggleGroup type="single" value={tool} onValueChange={(value) => value && setTool(value as Tool)} aria-label="Tool">
              {tools.map((item) => (
                <Tooltip key={item.value}>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem value={item.value} aria-label={item.label} className="rounded-full data-[state=on]:bg-foreground data-[state=on]:text-background">
                      <Icon icon={item.icon} />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent>{item.label}</TooltipContent>
                </Tooltip>
              ))}
            </ToggleGroup>
            <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-5" />
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Undo" onClick={undo} disabled={!doc.past.length}>
              <Icon icon={Undo02Icon} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Redo" onClick={redo} disabled={!doc.future.length}>
              <Icon icon={Redo02Icon} />
            </Button>
            <Select value={String(zoom)} onValueChange={(value) => setZoom(Number(value))}>
              <SelectTrigger aria-label="Zoom" className="w-24 border-0 bg-transparent dark:bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[50, 75, 100, 125, 150].map((value) => (
                  <SelectItem key={value} value={String(value)}>{value}%</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        <div
          className="absolute inset-0 overflow-auto bg-muted"
          style={{ backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
        >
          <div className="flex min-h-full min-w-fit items-center justify-center p-10 pb-24">
            <div style={{ width: BOARD.width * scale, height: BOARD.height * scale }} className="shrink-0 shadow-lg ring-1 ring-foreground/10">
              <div
                role="group"
                aria-label="Artboard"
                onPointerDown={onBoardPointerDown}
                className={cn("relative origin-top-left overflow-hidden bg-background", tool !== "select" && "cursor-crosshair")}
                style={{ ...BOARD, transform: `scale(${scale})` }}
              >
                {layers
                  .filter((layer) => !layer.hidden)
                  .map((layer) => {
                    const isSelected = layer.id === selectedId
                    return (
                      <div
                        key={layer.id}
                        role="group"
                        aria-roledescription="layer"
                        tabIndex={0}
                        aria-label={`${layer.name}${isSelected ? ", selected" : ""}`}
                        onPointerDown={(event) => onLayerPointerDown(event, layer, "move")}
                        onPointerMove={onLayerPointerMove}
                        onPointerUp={() => (drag.current = null)}
                        onPointerCancel={() => (drag.current = null)}
                        onKeyDown={(event) => onLayerKeyDown(event, layer)}
                        onFocus={() => setSelectedId(layer.id)}
                        className={cn(
                          "absolute touch-none outline-none select-none focus-visible:ring-2 focus-visible:ring-ring",
                          tool === "select" ? "cursor-move" : "pointer-events-none",
                          isSelected ? "ring-2 ring-brand" : "hover:ring-1 hover:ring-brand/60"
                        )}
                        style={{ left: layer.x, top: layer.y, width: layer.w, height: layer.h }}
                      >
                        <LayerView layer={layer} />
                        {isSelected && tool === "select" ? (
                          <div
                            aria-hidden
                            onPointerDown={(event) => onLayerPointerDown(event, layer, "resize")}
                            onPointerMove={onLayerPointerMove}
                            onPointerUp={() => (drag.current = null)}
                            className="absolute -right-1.5 -bottom-1.5 size-3 cursor-nwse-resize rounded-sm border-2 border-brand bg-card"
                          />
                        ) : null}
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>

        </div>

        <aside aria-label="Properties" className="hidden w-72 shrink-0 border-l lg:block">
          {propertiesPanel}
        </aside>
      </div>
    </div>
  )
}
