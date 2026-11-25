import * as React from "react"
import {
  Cancel01Icon,
  CubeIcon,
  Delete02Icon,
  FolderLibraryIcon,
  GridViewIcon,
  Image01Icon,
  Menu01Icon,
  Search01Icon,
  Upload01Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"

import { Page } from "@/components/demo"
import { Icon, type IconSvgElement } from "@/components/icon"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Spinner } from "@/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

type Kind = "Image" | "Video" | "3D model"
type Asset = { id: number; name: string; kind: Kind; size: number; updated: string; order: number; tags: string[]; usedIn: string[] }

const kindIcon: Record<Kind, IconSvgElement> = { Image: Image01Icon, Video: Video01Icon, "3D model": CubeIcon }
const tints = ["var(--chart-1)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

const seed: Asset[] = [
  { id: 1, name: "Autumn coat, front", kind: "Image", size: 2.4, updated: "Nov 12", order: 12, tags: ["Northwind", "Product"], usedIn: ["Autumn collection launch"] },
  { id: 2, name: "Autumn coat, turntable", kind: "3D model", size: 18.2, updated: "Nov 11", order: 11, tags: ["Northwind", "Product"], usedIn: ["Autumn collection launch"] },
  { id: 3, name: "Lookbook clip 01", kind: "Video", size: 42.5, updated: "Nov 10", order: 10, tags: ["Northwind"], usedIn: ["Autumn collection launch", "Holiday gift guide"] },
  { id: 4, name: "EV cockpit", kind: "3D model", size: 31.0, updated: "Nov 8", order: 9, tags: ["Kestrel"], usedIn: ["EV test drive sign-ups"] },
  { id: 5, name: "Test drive teaser", kind: "Video", size: 64.8, updated: "Nov 7", order: 8, tags: ["Kestrel", "Hero"], usedIn: ["EV test drive sign-ups"] },
  { id: 6, name: "Shade swatches", kind: "Image", size: 1.1, updated: "Nov 5", order: 7, tags: ["Solene"], usedIn: ["Shade finder"] },
  { id: 7, name: "Lipstick, open", kind: "Image", size: 3.6, updated: "Nov 4", order: 6, tags: ["Solene", "Product"], usedIn: ["Shade finder"] },
  { id: 8, name: "Campus mural", kind: "Image", size: 5.9, updated: "Nov 2", order: 5, tags: ["Harbor"], usedIn: ["Student account drive"] },
  { id: 9, name: "Headphones, exploded", kind: "3D model", size: 22.7, updated: "Oct 30", order: 4, tags: ["Tidal"], usedIn: [] },
  { id: 10, name: "Gift wrap loop", kind: "Video", size: 12.3, updated: "Oct 28", order: 3, tags: ["Tidal", "Seasonal"], usedIn: ["Holiday gift guide"] },
  { id: 11, name: "Store front, Osaka", kind: "Image", size: 4.2, updated: "Oct 20", order: 2, tags: ["Northwind"], usedIn: ["Store opening, Osaka"] },
  { id: 12, name: "Logo lockups", kind: "Image", size: 0.6, updated: "Oct 12", order: 1, tags: ["Brand"], usedIn: [] },
]

const megabytes = (value: number) => `${value.toFixed(1)} MB`

function Thumb({ asset, className }: { asset: Asset; className?: string }) {
  const tint = tints[asset.id % tints.length]
  return (
    <div
      aria-hidden
      className={cn("flex aspect-[4/3] items-center justify-center text-foreground/45", className)}
      style={{
        background: `linear-gradient(${120 + asset.id * 23}deg, color-mix(in oklab, ${tint} 38%, var(--card)), color-mix(in oklab, ${tint} 10%, var(--muted)))`,
      }}
    >
      <Icon icon={kindIcon[asset.kind]} className="size-7" />
    </div>
  )
}

export function AssetsPage() {
  const [assets, setAssets] = React.useState(seed)
  const [query, setQuery] = React.useState("")
  const [kind, setKind] = React.useState("all")
  const [sort, setSort] = React.useState("newest")
  const [view, setView] = React.useState("grid")
  const [selected, setSelected] = React.useState<number[]>([])
  const [openId, setOpenId] = React.useState<number | null>(null)
  const [tag, setTag] = React.useState("")
  const [uploads, setUploads] = React.useState<{ name: string; size: number; done: boolean }[]>([])
  const [uploadOpen, setUploadOpen] = React.useState(false)
  const counter = React.useRef(13)

  const visible = assets
    .filter((asset) => (kind === "all" || asset.kind === kind) && `${asset.name} ${asset.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : sort === "largest" ? b.size - a.size : b.order - a.order))
  const open = assets.find((asset) => asset.id === openId) ?? null

  const toggle = (id: number, checked: boolean) => setSelected(checked ? [...selected, id] : selected.filter((item) => item !== id))
  const patch = (id: number, values: Partial<Asset>) => setAssets(assets.map((asset) => (asset.id === id ? { ...asset, ...values } : asset)))

  function remove(ids: number[]) {
    const previous = assets
    setAssets(assets.filter((asset) => !ids.includes(asset.id)))
    setSelected(selected.filter((id) => !ids.includes(id)))
    setOpenId(null)
    toast(ids.length === 1 ? "Asset deleted" : `${ids.length} assets deleted`, {
      action: { label: "Undo", onClick: () => setAssets(previous) },
    })
  }

  function pick(files: FileList | null) {
    if (!files?.length) return
    const picked = Array.from(files).map((file) => ({ name: file.name, size: file.size / 1_000_000, done: false }))
    setUploads((current) => [...current, ...picked])
    window.setTimeout(() => {
      setUploads((current) => current.map((item) => (picked.some((file) => file.name === item.name) ? { ...item, done: true } : item)))
    }, 1200)
  }

  function addUploads() {
    const added: Asset[] = uploads
      .filter((file) => file.done)
      .map((file) => {
        const id = counter.current++
        const extension = file.name.split(".").pop()?.toLowerCase() ?? ""
        const type: Kind = ["mp4", "mov", "webm"].includes(extension) ? "Video" : ["glb", "gltf", "usdz"].includes(extension) ? "3D model" : "Image"
        return { id, name: file.name.replace(/\.[^.]+$/, ""), kind: type, size: Math.max(file.size, 0.1), updated: "Just now", order: id, tags: [], usedIn: [] }
      })
    setAssets([...added, ...assets])
    setUploads([])
    setUploadOpen(false)
    if (added.length) toast.success(added.length === 1 ? "1 asset added" : `${added.length} assets added`)
  }

  return (
    <Page
      title="Asset library"
      description="Images, clips and 3D models your team can place in any creative."
      actions={
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icon icon={Upload01Icon} />
              Upload assets
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload assets</DialogTitle>
              <DialogDescription>Images, MP4 or MOV clips, and GLB models. Files stay in this browser in this sample.</DialogDescription>
            </DialogHeader>
            <label
              htmlFor="asset-files"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault()
                pick(event.dataTransfer.files)
              }}
              className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed p-8 text-center text-sm transition-colors hover:bg-muted has-focus-visible:ring-3 has-focus-visible:ring-ring/30"
            >
              <Icon icon={Upload01Icon} className="size-6 text-muted-foreground" />
              <span className="font-medium">Drop files here or choose from your computer</span>
              <span className="text-muted-foreground">Up to 100 MB each</span>
              <input id="asset-files" type="file" multiple className="sr-only" onChange={(event) => { pick(event.target.files); event.target.value = "" }} />
            </label>
            {uploads.length ? (
              <ul className="flex max-h-48 flex-col gap-2 overflow-auto">
                {uploads.map((file, index) => (
                  <li key={`${file.name}-${index}`}>
                    <Attachment size="sm" state={file.done ? "done" : "uploading"} className="w-full">
                      <AttachmentMedia>{file.done ? <Icon icon={Image01Icon} /> : <Spinner />}</AttachmentMedia>
                      <AttachmentContent>
                        <AttachmentTitle>{file.name}</AttachmentTitle>
                        <AttachmentDescription>{file.done ? megabytes(Math.max(file.size, 0.1)) : "Uploading"}</AttachmentDescription>
                      </AttachmentContent>
                      <AttachmentActions>
                        <AttachmentAction aria-label={`Remove ${file.name}`} onClick={() => setUploads(uploads.filter((_, i) => i !== index))}>
                          <Icon icon={Cancel01Icon} />
                        </AttachmentAction>
                      </AttachmentActions>
                    </Attachment>
                  </li>
                ))}
              </ul>
            ) : null}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={addUploads} disabled={!uploads.some((file) => file.done)}>Add to library</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <ToggleGroup type="single" variant="outline" value={kind} onValueChange={(value) => value && setKind(value)} aria-label="Asset type">
            <ToggleGroupItem value="all" className="data-[state=on]:bg-foreground data-[state=on]:text-background">All</ToggleGroupItem>
            <ToggleGroupItem value="Image" className="data-[state=on]:bg-foreground data-[state=on]:text-background">Images</ToggleGroupItem>
            <ToggleGroupItem value="Video" className="data-[state=on]:bg-foreground data-[state=on]:text-background">Video</ToggleGroupItem>
            <ToggleGroupItem value="3D model" className="data-[state=on]:bg-foreground data-[state=on]:text-background">3D</ToggleGroupItem>
          </ToggleGroup>
          <InputGroup className="ml-auto w-full sm:w-64">
            <InputGroupAddon><Icon icon={Search01Icon} /></InputGroupAddon>
            <InputGroupInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or tag" aria-label="Search assets" />
          </InputGroup>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger aria-label="Sort by" className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="largest">Largest first</SelectItem>
            </SelectContent>
          </Select>
          <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value)} aria-label="View">
            <ToggleGroupItem value="grid" aria-label="Grid view" className="data-[state=on]:bg-foreground data-[state=on]:text-background"><Icon icon={GridViewIcon} /></ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view" className="data-[state=on]:bg-foreground data-[state=on]:text-background"><Icon icon={Menu01Icon} /></ToggleGroupItem>
          </ToggleGroup>
        </div>

        {selected.length ? (
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border bg-card py-2 pr-2 pl-4 text-sm">
            <span className="mr-auto font-medium">{selected.length} selected</span>
            <Button variant="ghost" size="sm" onClick={() => setSelected([])}>Clear selection</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Icon icon={Delete02Icon} />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete {selected.length === 1 ? "this asset" : `${selected.length} assets`}?</AlertDialogTitle>
                  <AlertDialogDescription>Creatives that use them will show an empty layer until you replace it.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={() => remove(selected)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : null}

        {visible.length === 0 ? (
          <Empty className="rounded-3xl border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon"><Icon icon={FolderLibraryIcon} /></EmptyMedia>
              <EmptyTitle>No assets match</EmptyTitle>
              <EmptyDescription>Try another search, or show all types.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm" onClick={() => { setQuery(""); setKind("all") }}>Clear filters</Button>
            </EmptyContent>
          </Empty>
        ) : view === "grid" ? (
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {visible.map((asset) => (
              <li key={asset.id} className="group relative">
                <button
                  type="button"
                  onClick={() => setOpenId(asset.id)}
                  className={cn(
                    "flex w-full flex-col overflow-hidden rounded-2xl border bg-card text-left outline-none transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/30",
                    selected.includes(asset.id) && "border-ring"
                  )}
                >
                  <Thumb asset={asset} className="w-full" />
                  <span className="flex flex-col gap-0.5 p-3">
                    <span className="truncate text-sm font-medium">{asset.name}</span>
                    <span className="text-xs text-muted-foreground">{asset.kind}, {megabytes(asset.size)}</span>
                  </span>
                </button>
                <Checkbox
                  aria-label={`Select ${asset.name}`}
                  checked={selected.includes(asset.id)}
                  onCheckedChange={(checked) => toggle(asset.id, !!checked)}
                  className="absolute top-2.5 left-2.5 bg-card shadow-sm"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="overflow-hidden rounded-2xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 pl-4"><span className="sr-only">Select</span></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden text-right sm:table-cell">Size</TableHead>
                  <TableHead className="hidden md:table-cell">Used in</TableHead>
                  <TableHead className="hidden lg:table-cell">Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((asset) => (
                  <TableRow key={asset.id} data-state={selected.includes(asset.id) ? "selected" : undefined}>
                    <TableCell className="pl-4">
                      <Checkbox aria-label={`Select ${asset.name}`} checked={selected.includes(asset.id)} onCheckedChange={(checked) => toggle(asset.id, !!checked)} />
                    </TableCell>
                    <TableCell>
                      <button type="button" onClick={() => setOpenId(asset.id)} className="flex items-center gap-3 rounded-lg text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/30">
                        <Thumb asset={asset} className="w-12 shrink-0 rounded-lg [&_svg]:size-4" />
                        <span className="font-medium underline-offset-4 hover:underline">{asset.name}</span>
                      </button>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{asset.kind}</TableCell>
                    <TableCell className="hidden text-right tabular-nums sm:table-cell">{megabytes(asset.size)}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {asset.usedIn.length ? (asset.usedIn.length === 1 ? asset.usedIn[0] : `${asset.usedIn.length} campaigns`) : "Not used"}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground tabular-nums lg:table-cell">{asset.updated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <p className="text-sm text-muted-foreground tabular-nums">
          {visible.length} of {assets.length} assets, {megabytes(visible.reduce((sum, asset) => sum + asset.size, 0))}
        </p>
      </div>

      <Sheet open={!!open} onOpenChange={(value) => !value && setOpenId(null)}>
        <SheetContent>
          {open ? (
            <>
              <SheetHeader>
                <SheetTitle>{open.name}</SheetTitle>
                <SheetDescription>{open.kind}, {megabytes(open.size)}, updated {open.updated}</SheetDescription>
              </SheetHeader>
              <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-auto px-4">
                <Thumb asset={open} className="w-full shrink-0 rounded-2xl" />
                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel htmlFor="asset-name">Name</FieldLabel>
                    <Input id="asset-name" value={open.name} onChange={(event) => patch(open.id, { name: event.target.value })} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="asset-tag">Tags</FieldLabel>
                    {open.tags.length ? (
                      <div className="flex flex-wrap gap-1.5">
                        {open.tags.map((item) => (
                          <Badge key={item} variant="secondary" className="pr-1">
                            {item}
                            <button
                              type="button"
                              aria-label={`Remove tag ${item}`}
                              onClick={() => patch(open.id, { tags: open.tags.filter((value) => value !== item) })}
                              className="rounded-full outline-none hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              <Icon icon={Cancel01Icon} className="size-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                    <form
                      className="flex gap-2"
                      onSubmit={(event) => {
                        event.preventDefault()
                        const value = tag.trim()
                        if (!value || open.tags.includes(value)) return
                        patch(open.id, { tags: [...open.tags, value] })
                        setTag("")
                      }}
                    >
                      <Input id="asset-tag" value={tag} onChange={(event) => setTag(event.target.value)} placeholder="Add a tag" />
                      <Button type="submit" variant="outline" disabled={!tag.trim()}>Add tag</Button>
                    </form>
                  </Field>
                </FieldGroup>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Used in</span>
                  {open.usedIn.length ? (
                    <ul className="flex flex-col text-sm">
                      {open.usedIn.map((campaign) => (
                        <li key={campaign} className="border-b py-2 last:border-b-0">{campaign}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Not placed in any creative yet.</p>
                  )}
                </div>
              </div>
              <SheetFooter>
                <Button variant="destructive" onClick={() => remove([open.id])}>
                  <Icon icon={Delete02Icon} />
                  Delete asset
                </Button>
              </SheetFooter>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </Page>
  )
}
