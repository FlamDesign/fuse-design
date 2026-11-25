import * as React from "react"
import {
  Add01Icon,
  FilterIcon,
  Megaphone01Icon,
  MoreHorizontalIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"

import { Page } from "@/components/demo"
import { Icon } from "@/components/icon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Status = "Draft" | "Live" | "Paused" | "Ended"
type Format = "Flicks" | "Airboards" | "Buds"
type Campaign = {
  id: number
  name: string
  advertiser: string
  format: Format
  status: Status
  creatives: number
  spent: number
  ends: string
}

const seed: Campaign[] = [
  { id: 8, name: "Autumn collection launch", advertiser: "Northwind Apparel", format: "Flicks", status: "Live", creatives: 4, spent: 18400, ends: "Dec 20" },
  { id: 7, name: "EV test drive sign-ups", advertiser: "Kestrel Motors", format: "Airboards", status: "Live", creatives: 3, spent: 31200, ends: "Dec 05" },
  { id: 6, name: "Shade finder", advertiser: "Solene Beauty", format: "Buds", status: "Live", creatives: 2, spent: 9100, ends: "Jan 15" },
  { id: 5, name: "Student account drive", advertiser: "Harbor Bank", format: "Flicks", status: "Paused", creatives: 5, spent: 6800, ends: "Nov 30" },
  { id: 4, name: "Holiday gift guide", advertiser: "Tidal Audio", format: "Flicks", status: "Draft", creatives: 1, spent: 0, ends: "Dec 24" },
  { id: 3, name: "Store opening, Osaka", advertiser: "Northwind Apparel", format: "Airboards", status: "Ended", creatives: 2, spent: 12000, ends: "Oct 31" },
  { id: 2, name: "Summer service offer", advertiser: "Kestrel Motors", format: "Buds", status: "Ended", creatives: 3, spent: 22500, ends: "Sep 14" },
]

const formats: Format[] = ["Flicks", "Airboards", "Buds"]
const statuses: Status[] = ["Draft", "Live", "Paused", "Ended"]
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

function StatusDot({ status }: { status: Status }) {
  return (
    <span
      aria-hidden
      className={cn(
        "size-2 shrink-0 rounded-full",
        status === "Live" && "bg-emerald-500",
        status === "Paused" && "bg-muted-foreground",
        status === "Draft" && "border border-muted-foreground",
        status === "Ended" && "bg-border"
      )}
    />
  )
}

export function CampaignsPage() {
  const [campaigns, setCampaigns] = React.useState(seed)
  const [query, setQuery] = React.useState("")
  const [tab, setTab] = React.useState("all")
  const [shown, setShown] = React.useState<Format[]>(formats)
  const [selected, setSelected] = React.useState<number[]>([])
  const [draft, setDraft] = React.useState("")
  const [format, setFormat] = React.useState<Format>("Flicks")

  const visible = campaigns.filter(
    (campaign) =>
      (tab === "all" || (tab === "active" ? campaign.status === "Live" || campaign.status === "Paused" : campaign.status === tab)) &&
      shown.includes(campaign.format) &&
      `${campaign.name} ${campaign.advertiser}`.toLowerCase().includes(query.toLowerCase())
  )
  const allSelected = visible.length > 0 && visible.every((campaign) => selected.includes(campaign.id))

  function createCampaign() {
    const name = draft.trim()
    if (!name) return
    const id = Math.max(...campaigns.map((campaign) => campaign.id)) + 1
    setCampaigns([{ id, name, advertiser: "Northwind Apparel", format, status: "Draft", creatives: 0, spent: 0, ends: "Not set" }, ...campaigns])
    setDraft("")
    toast.success("Campaign created", { description: `${name} is saved as a draft.` })
  }

  return (
    <Page
      title="Campaigns"
      description="Each campaign holds creatives in different sizes. Each creative can have several variations, with one active at a time."
      actions={
        <Sheet>
          <SheetTrigger asChild>
            <Button><Icon icon={Add01Icon} />New campaign</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>New campaign</SheetTitle>
              <SheetDescription>It starts as a draft. Add creatives before you set it live.</SheetDescription>
            </SheetHeader>
            <FieldGroup className="px-4">
              <Field>
                <FieldLabel htmlFor="campaign-name">Campaign name</FieldLabel>
                <Input id="campaign-name" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Spring collection launch" />
              </Field>
              <Field>
                <FieldLabel htmlFor="campaign-format">Format</FieldLabel>
                <Select value={format} onValueChange={(value) => setFormat(value as Format)}>
                  <SelectTrigger id="campaign-format" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>You can add other formats to the campaign later.</FieldDescription>
              </Field>
            </FieldGroup>
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={createCampaign} disabled={!draft.trim()}>Create campaign</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      }
    >
      <Tabs value={tab} onValueChange={setTab} className="gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="Draft">Drafts</TabsTrigger>
            <TabsTrigger value="Ended">Ended</TabsTrigger>
          </TabsList>
          <InputGroup className="ml-auto w-full sm:w-64">
            <InputGroupAddon><Icon icon={Search01Icon} /></InputGroupAddon>
            <InputGroupInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search campaigns" aria-label="Search campaigns" />
          </InputGroup>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><Icon icon={FilterIcon} />Format</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Show formats</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {formats.map((item) => (
                <DropdownMenuCheckboxItem
                  key={item}
                  checked={shown.includes(item)}
                  onCheckedChange={(checked) => setShown(checked ? [...shown, item] : shown.filter((f) => f !== item))}
                  onSelect={(e) => e.preventDefault()}
                >
                  {item}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <TabsContent value={tab}>
        <Card className="gap-0 py-0">
          <CardContent className="px-0">
            {visible.length === 0 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon"><Icon icon={Megaphone01Icon} /></EmptyMedia>
                  <EmptyTitle>No campaigns match</EmptyTitle>
                  <EmptyDescription>Clear the search or turn a format back on.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10 pl-5">
                      <Checkbox
                        aria-label="Select all campaigns"
                        checked={allSelected}
                        onCheckedChange={(checked) => setSelected(checked ? visible.map((campaign) => campaign.id) : [])}
                      />
                    </TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead className="hidden sm:table-cell">Format</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden text-right md:table-cell">Creatives</TableHead>
                    <TableHead className="hidden text-right md:table-cell">Spent</TableHead>
                    <TableHead className="hidden lg:table-cell">Ends</TableHead>
                    <TableHead className="w-12"><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visible.map((campaign) => (
                    <TableRow key={campaign.id} data-state={selected.includes(campaign.id) ? "selected" : undefined}>
                      <TableCell className="pl-5">
                        <Checkbox
                          aria-label={`Select ${campaign.name}`}
                          checked={selected.includes(campaign.id)}
                          onCheckedChange={(checked) =>
                            setSelected(checked ? [...selected, campaign.id] : selected.filter((id) => id !== campaign.id))
                          }
                        />
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="max-w-72 truncate font-medium">{campaign.name}</div>
                        <div className="text-muted-foreground">{campaign.advertiser}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline">{campaign.format}</Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={campaign.status}
                          onValueChange={(status) =>
                            setCampaigns(campaigns.map((c) => (c.id === campaign.id ? { ...c, status: status as Status } : c)))
                          }
                        >
                          <SelectTrigger size="sm" aria-label={`Status of ${campaign.name}`} className="-ml-2 border-0 bg-transparent px-2 hover:bg-muted dark:bg-transparent">
                            <SelectValue>
                              <StatusDot status={campaign.status} />
                              {campaign.status}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="hidden text-right tabular-nums md:table-cell">{campaign.creatives}</TableCell>
                      <TableCell className="hidden text-right tabular-nums md:table-cell">{money.format(campaign.spent)}</TableCell>
                      <TableCell className="hidden text-muted-foreground tabular-nums lg:table-cell">{campaign.ends}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${campaign.name}`}>
                              <Icon icon={MoreHorizontalIcon} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => toast("Campaign duplicated")}>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => toast("Link copied")}>Copy link</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onSelect={() => {
                                setCampaigns(campaigns.filter((c) => c.id !== campaign.id))
                                toast("Campaign deleted", { action: { label: "Undo", onClick: () => setCampaigns(campaigns) } })
                              }}
                            >
                              Delete campaign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="justify-between border-t py-3 text-muted-foreground">
            <span>{selected.length} of {visible.length} selected</span>
            <span className="tabular-nums">{campaigns.filter((c) => c.status === "Live").length} live, {campaigns.length} in total</span>
          </CardFooter>
        </Card>
        </TabsContent>
      </Tabs>
    </Page>
  )
}
