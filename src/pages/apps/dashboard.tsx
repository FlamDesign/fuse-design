import { Add01Icon, ArrowDownRight01Icon, ArrowUpRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from "recharts"
import { Link } from "react-router-dom"

import { Page } from "@/components/demo"
import { Icon } from "@/components/icon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const values = [38, 41, 40, 44, 47, 45, 43, 48, 52, 55, 53, 51, 56, 60, 58, 57, 61, 66, 64, 62, 67, 71, 69, 70, 74, 79, 77, 76, 81, 86]

const series = values.map((value, index) => ({
  day: index < 18 ? `Oct ${14 + index}` : `Nov ${index - 17}`,
  current: value * 1000,
  previous: Math.round((value * 0.86 + (index % 5) - 2) * 1000),
}))

const chartConfig = {
  current: { label: "This period", color: "var(--chart-3)" },
  previous: { label: "Previous period", color: "var(--muted-foreground)" },
} satisfies ChartConfig

const metrics = [
  { label: "Engagement rate", value: "4.1%", delta: "+0.3 pts", up: true },
  { label: "Average time with content", value: "42s", delta: "+5s", up: true },
  { label: "Completion rate", value: "65%", delta: "-3 pts", up: false },
]

const campaigns = [
  { name: "Autumn collection launch", advertiser: "Northwind Apparel", format: "Flicks", status: "Live", interactions: 412380, spent: 18400, budget: 24000 },
  { name: "EV test drive sign-ups", advertiser: "Kestrel Motors", format: "Airboards", status: "Live", interactions: 286120, spent: 31200, budget: 40000 },
  { name: "Shade finder", advertiser: "Solene Beauty", format: "Buds", status: "Live", interactions: 198540, spent: 9100, budget: 15000 },
  { name: "Student account drive", advertiser: "Harbor Bank", format: "Flicks", status: "Paused", interactions: 97210, spent: 6800, budget: 12000 },
  { name: "Holiday gift guide", advertiser: "Tidal Audio", format: "Flicks", status: "Draft", interactions: 0, spent: 0, budget: 20000 },
]

const markets = [
  { name: "United States", value: 486200 },
  { name: "India", value: 291400 },
  { name: "Japan", value: 233900 },
  { name: "UAE", value: 148300 },
  { name: "Southeast Asia", value: 125130 },
]

const number = new Intl.NumberFormat("en-US")
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

function Delta({ up, children }: { up: boolean; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-sm tabular-nums", up ? "text-foreground" : "text-destructive")}>
      <Icon icon={up ? ArrowUpRight01Icon : ArrowDownRight01Icon} className="size-4" />
      {children}
    </span>
  )
}

function Status({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className={cn(
          "size-2 rounded-full",
          status === "Live" ? "bg-emerald-500" : status === "Paused" ? "bg-muted-foreground" : "border border-muted-foreground"
        )}
      />
      {status}
    </span>
  )
}

export function DashboardPage() {
  const top = markets[0].value

  return (
    <Page
      title="Campaign performance"
      description="How people responded to your Flams across every live campaign."
      actions={
        <>
          <Select defaultValue="30">
            <SelectTrigger aria-label="Date range">
              <Icon icon={Calendar03Icon} />
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link to="/apps/campaigns">
              <Icon icon={Add01Icon} />
              New campaign
            </Link>
          </Button>
        </>
      }
    >
      <Card className="gap-0 py-0">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-sm text-muted-foreground">Interactions</h2>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-5xl leading-none font-semibold tracking-[-0.03em] tabular-nums">1,284,930</span>
                <Delta up>12.4%</Delta>
                <span className="text-sm text-muted-foreground">against the previous 30 days</span>
              </div>
            </div>
            <ChartContainer config={chartConfig} className="aspect-auto h-60 w-full">
              <AreaChart data={series} accessibilityLayer margin={{ left: 0, right: 4, top: 4 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} interval="preserveStartEnd" minTickGap={40} />
                <YAxis tickLine={false} axisLine={false} width={34} tickFormatter={(value) => `${value / 1000}k`} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Line dataKey="previous" type="monotone" stroke="var(--color-previous)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Area dataKey="current" type="monotone" stroke="var(--color-current)" strokeWidth={2} fill="var(--color-current)" fillOpacity={0.12} />
              </AreaChart>
            </ChartContainer>
          </div>
          <dl className="grid border-t sm:grid-cols-3 lg:grid-cols-1 lg:border-t-0 lg:border-l">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col justify-center gap-1.5 border-b p-6 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 lg:border-r-0 lg:border-b">
                <dt className="text-sm text-muted-foreground">{metric.label}</dt>
                <dd className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold tracking-tight tabular-nums">{metric.value}</span>
                  <Delta up={metric.up}>{metric.delta}</Delta>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Card>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <Card>
          <CardHeader>
            <CardTitle>Campaigns</CardTitle>
            <CardDescription>3 live, 1 paused, 1 draft</CardDescription>
            <CardAction>
              <Button variant="outline" size="sm" asChild>
                <Link to="/apps/campaigns">View all campaigns</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead className="hidden md:table-cell">Format</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Interactions</TableHead>
                  <TableHead className="hidden w-40 sm:table-cell">Budget spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => {
                  const pace = Math.round((campaign.spent / campaign.budget) * 100)
                  return (
                    <TableRow key={campaign.name}>
                      <TableCell>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-muted-foreground">{campaign.advertiser}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{campaign.format}</Badge>
                      </TableCell>
                      <TableCell>
                        <Status status={campaign.status} />
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {campaign.interactions ? number.format(campaign.interactions) : "Not started"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex flex-col gap-1.5">
                          <Progress value={pace} aria-label={`${pace}% of budget spent`} className="h-1.5" />
                          <span className="text-xs text-muted-foreground tabular-nums">
                            {money.format(campaign.spent)} of {money.format(campaign.budget)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardDescription>Ad Balance</CardDescription>
              <CardTitle className="text-3xl font-semibold tracking-tight tabular-nums">$18,240.00</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-muted-foreground">Covers about 9 days at the current daily spend.</p>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1">Add funds</Button>
                <Button variant="outline" className="flex-1">Buy credits</Button>
              </div>
              <p className="border-t pt-4 text-muted-foreground">
                <span className="font-medium text-foreground tabular-nums">1,240</span> AI Credits left for generation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactions by market</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-4">
                {markets.map((market) => (
                  <li key={market.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between gap-3">
                      <span>{market.name}</span>
                      <span className="text-muted-foreground tabular-nums">{number.format(market.value)}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-foreground" style={{ width: `${(market.value / top) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  )
}
