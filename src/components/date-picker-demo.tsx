import * as React from "react"
import { Calendar03Icon } from "@hugeicons/core-free-icons"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function DatePickerDemo() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>()
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 10, 18),
    to: new Date(2026, 11, 20),
  })

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" data-empty={!date} className="w-56 justify-start font-normal data-[empty=true]:text-muted-foreground">
            <Icon icon={Calendar03Icon} />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            onSelect={(next) => {
              setDate(next)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-64 justify-start font-normal">
            <Icon icon={Calendar03Icon} />
            {range?.from
              ? range.to
                ? `${format(range.from, "LLL d, y")} to ${format(range.to, "LLL d, y")}`
                : format(range.from, "LLL d, y")
              : "Pick a date range"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="range" numberOfMonths={2} selected={range} defaultMonth={range?.from} onSelect={setRange} />
        </PopoverContent>
      </Popover>
    </>
  )
}
