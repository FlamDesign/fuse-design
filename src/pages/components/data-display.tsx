import {
  ArrowUpRight01Icon,
  Folder01Icon,
  MoreHorizontalIcon,
  Notification01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { DataTableDemo } from "@/components/data-table-demo"
import { Demo, DemoGrid, Page } from "@/components/demo"
import { Icon } from "@/components/icon"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const chartData = [
  { month: "Jun", web: 186, mobile: 80 },
  { month: "Jul", web: 305, mobile: 200 },
  { month: "Aug", web: 237, mobile: 120 },
  { month: "Sep", web: 273, mobile: 190 },
  { month: "Oct", web: 209, mobile: 130 },
  { month: "Nov", web: 314, mobile: 240 },
]

const chartConfig = {
  web: { label: "Web", color: "var(--chart-2)" },
  mobile: { label: "Mobile", color: "var(--chart-4)" },
} satisfies ChartConfig

const invoices = [
  ["INV-1042", "Paid", "Card", 250],
  ["INV-1043", "Pending", "Wire", 1150],
  ["INV-1044", "Paid", "Card", 350],
  ["INV-1045", "Overdue", "ACH", 450],
] as const

export function DataDisplayPage() {
  return (
    <Page title="Data display" description="Surfaces for content, records and charts.">
      <DemoGrid>
        <Demo title="Card" className="items-start">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Autumn launch</CardTitle>
              <CardDescription>Campaign runs Nov 18 to Dec 20.</CardDescription>
              <CardAction>
                <Badge variant="secondary">Draft</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Three creatives, two placements. Budget and targeting still need sign off before it can go live.
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Review</Button>
              <Button size="sm" variant="ghost">Dismiss</Button>
            </CardFooter>
          </Card>
          <Card size="sm" className="w-full max-w-sm">
            <CardHeader>
              <CardDescription>Active viewers</CardDescription>
              <CardTitle className="text-2xl tabular-nums">12,480</CardTitle>
              <CardAction>
                <Badge variant="outline"><Icon icon={ArrowUpRight01Icon} />8.2%</Badge>
              </CardAction>
            </CardHeader>
          </Card>
        </Demo>

        <Demo title="Table" center={false}>
          <Table>
            <TableCaption>Recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(([id, status, method, amount]) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{id}</TableCell>
                  <TableCell>
                    <Badge variant={status === "Overdue" ? "destructive" : status === "Paid" ? "secondary" : "outline"}>
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell>{method}</TableCell>
                  <TableCell className="text-right tabular-nums">${amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right tabular-nums">$2,200.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Demo>

        <Demo title="Data Table" wide center={false}>
          <DataTableDemo />
        </Demo>

        <Demo title="Avatar" className="flex-col">
          <div className="flex items-center gap-3">
            <Avatar size="sm"><AvatarFallback>AK</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
            <Avatar size="lg"><AvatarFallback>RS</AvatarFallback></Avatar>
            <Avatar size="lg">
              <AvatarFallback>JD</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-500" />
            </Avatar>
          </div>
          <AvatarGroup>
            <Avatar><AvatarFallback>AK</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>RS</AvatarFallback></Avatar>
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
        </Demo>

        <Demo title="Item" center={false}>
          <ItemGroup className="w-full gap-2">
            <Item variant="outline" role="listitem">
              <ItemMedia variant="icon"><Icon icon={Folder01Icon} /></ItemMedia>
              <ItemContent>
                <ItemTitle>Brand assets</ItemTitle>
                <ItemDescription>24 files, updated 2 hours ago</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline">Open</Button>
              </ItemActions>
            </Item>
            <Item variant="muted" role="listitem">
              <ItemMedia variant="icon"><Icon icon={Notification01Icon} /></ItemMedia>
              <ItemContent>
                <ItemTitle>Weekly digest</ItemTitle>
                <ItemDescription>Delivered every Monday at 9:00.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="icon-sm" variant="ghost" aria-label="More"><Icon icon={MoreHorizontalIcon} /></Button>
              </ItemActions>
            </Item>
            <ItemSeparator decorative />
            <Item size="sm" role="listitem">
              <ItemMedia><Icon icon={Tick02Icon} className="size-4" /></ItemMedia>
              <ItemContent>
                <ItemTitle>Domain verified</ItemTitle>
              </ItemContent>
            </Item>
          </ItemGroup>
        </Demo>

        <Demo title="Chart" wide center={false} className="grid gap-6 md:grid-cols-2">
          <ChartContainer config={chartConfig} className="aspect-auto h-56 w-full">
            <BarChart data={chartData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="web" fill="var(--color-web)" radius={6} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={6} />
            </BarChart>
          </ChartContainer>
          <ChartContainer config={chartConfig} className="aspect-auto h-56 w-full">
            <AreaChart data={chartData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
              <Area dataKey="mobile" type="natural" fill="var(--color-mobile)" fillOpacity={0.3} stroke="var(--color-mobile)" stackId="a" />
              <Area dataKey="web" type="natural" fill="var(--color-web)" fillOpacity={0.3} stroke="var(--color-web)" stackId="a" />
            </AreaChart>
          </ChartContainer>
        </Demo>

        <Demo title="Carousel">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {[1, 2, 3, 4].map((n) => (
                <CarouselItem key={n}>
                  <div className="flex aspect-video items-center justify-center rounded-2xl bg-muted text-3xl font-semibold tabular-nums">
                    {n}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Demo>

        <Demo title="Aspect Ratio">
          <div className="w-full max-w-xs">
            <AspectRatio ratio={16 / 9} className="flex items-center justify-center rounded-2xl bg-muted text-sm text-muted-foreground">
              16 : 9
            </AspectRatio>
          </div>
          <div className="w-28">
            <AspectRatio ratio={1} className="flex items-center justify-center rounded-2xl bg-muted text-sm text-muted-foreground">
              1 : 1
            </AspectRatio>
          </div>
        </Demo>
      </DemoGrid>
    </Page>
  )
}
