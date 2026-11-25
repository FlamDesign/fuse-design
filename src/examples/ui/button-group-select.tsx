import * as React from "react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { ArrowRightIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const CURRENCIES = [
  {
    value: "$",
    label: "US Dollar",
  },
  {
    value: "€",
    label: "Euro",
  },
  {
    value: "£",
    label: "British Pound",
  },
]

export default function ButtonGroupSelect() {
  const [currency, setCurrency] = React.useState("$")

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="font-mono">{currency}</SelectTrigger>
          <SelectContent className="min-w-24">
            <SelectGroup>
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.value}{" "}
                  <span className="text-muted-foreground">
                    {currency.label}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input placeholder="10.00" pattern="[0-9]*" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <HugeiconsIcon icon={ArrowRightIcon} strokeWidth={2} />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
