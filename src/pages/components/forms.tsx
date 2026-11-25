import * as React from "react"
import {
  ArrowUp02Icon,
  Mail01Icon,
  Search01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons"

import { DatePickerDemo } from "@/components/date-picker-demo"
import { Demo, DemoGrid, Page } from "@/components/demo"
import { Icon } from "@/components/icon"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const regions = ["North America", "Europe", "Japan", "Southeast Asia", "Middle East", "India"] as const

export function FormsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 12))
  const [volume, setVolume] = React.useState([40])

  return (
    <Page title="Forms" description="Inputs, selection controls and the Field layout primitives.">
      <DemoGrid>
        <Demo title="Input" className="flex-col" center={false}>
          <Input placeholder="Project name" />
          <Input type="email" placeholder="name@example.com" defaultValue="mira@example.com" />
          <Input placeholder="Invalid value" aria-invalid defaultValue="not-an-email" />
          <Input placeholder="Disabled" disabled />
          <Input type="file" aria-label="Upload a file" />
        </Demo>

        <Demo title="Textarea" className="flex-col" center={false}>
          <Textarea placeholder="Write a short brief for the team…" rows={4} />
          <Textarea disabled placeholder="Disabled" />
        </Demo>

        <Demo title="Label" className="flex-col">
          <div className="grid w-full max-w-xs gap-2">
            <Label htmlFor="label-demo">Workspace URL</Label>
            <Input id="label-demo" placeholder="acme" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="label-check" />
            <Label htmlFor="label-check">Send me product updates</Label>
          </div>
        </Demo>

        <Demo title="Field" center={false}>
          <FieldSet className="w-full">
            <FieldLegend>Billing contact</FieldLegend>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="f-first">First name</FieldLabel>
                  <Input id="f-first" defaultValue="Mira" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="f-last">Last name</FieldLabel>
                  <Input id="f-last" defaultValue="Kato" />
                </Field>
              </div>
              <Field data-invalid>
                <FieldLabel htmlFor="f-vat">Tax ID</FieldLabel>
                <Input id="f-vat" aria-invalid defaultValue="12-34" />
                <FieldError>Enter a valid 9 digit tax ID.</FieldError>
              </Field>
              <FieldSeparator />
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Email invoices</FieldTitle>
                  <FieldDescription>Send a PDF copy every billing cycle.</FieldDescription>
                </FieldContent>
                <Switch defaultChecked aria-label="Email invoices" />
              </Field>
            </FieldGroup>
          </FieldSet>
        </Demo>

        <Demo title="Input Group" className="flex-col" center={false}>
          <InputGroup>
            <InputGroupAddon><Icon icon={Search01Icon} /></InputGroupAddon>
            <InputGroupInput placeholder="Search campaigns…" aria-label="Search campaigns" />
            <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
            <InputGroupInput placeholder="example.com" aria-label="Domain" />
            <InputGroupAddon align="inline-end"><InputGroupText>.com</InputGroupText></InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon><Icon icon={Mail01Icon} /></InputGroupAddon>
            <InputGroupInput type="password" defaultValue="secret-value" aria-label="API key" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Show value"><Icon icon={ViewIcon} /></InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupTextarea placeholder="Ask anything…" aria-label="Message" />
            <InputGroupAddon align="block-end">
              <InputGroupText className="text-xs">Shift + Enter for a new line</InputGroupText>
              <InputGroupButton variant="default" size="icon-xs" className="ml-auto rounded-full" aria-label="Send">
                <Icon icon={ArrowUp02Icon} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Demo>

        <Demo title="Input OTP" className="flex-col">
          <InputOTP maxLength={6} defaultValue="428" aria-label="Verification code">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">Enter the code from your authenticator app.</p>
        </Demo>

        <Demo title="Checkbox" className="flex-col items-start!" >
          {[
            ["c1", "Impressions", true],
            ["c2", "Engagement rate", true],
            ["c3", "Completed views", false],
          ].map(([id, label, checked]) => (
            <div key={id as string} className="flex items-center gap-2">
              <Checkbox id={id as string} defaultChecked={checked as boolean} />
              <Label htmlFor={id as string}>{label}</Label>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Checkbox id="c4" disabled />
            <Label htmlFor="c4">Attribution (unavailable)</Label>
          </div>
        </Demo>

        <Demo title="Radio Group">
          <RadioGroup defaultValue="weekly" className="w-full max-w-xs">
            {[
              ["daily", "Daily digest"],
              ["weekly", "Weekly summary"],
              ["never", "Never"],
            ].map(([value, label]) => (
              <div key={value} className="flex items-center gap-2">
                <RadioGroupItem value={value} id={`r-${value}`} />
                <Label htmlFor={`r-${value}`}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </Demo>

        <Demo title="Switch" className="flex-col">
          <div className="flex items-center gap-2">
            <Switch id="s1" defaultChecked />
            <Label htmlFor="s1">Autoplay previews</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="s2" />
            <Label htmlFor="s2">Reduce motion</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="s3" disabled />
            <Label htmlFor="s3">Beta features</Label>
          </div>
        </Demo>

        <Demo title="Slider" className="flex-col">
          <div className="grid w-full max-w-xs gap-3">
            <div className="flex justify-between text-sm">
              <span>Volume</span>
              <span className="text-muted-foreground tabular-nums">{volume[0]}%</span>
            </div>
            <Slider value={volume} onValueChange={setVolume} max={100} step={1} aria-label="Volume" />
          </div>
          <div className="grid w-full max-w-xs gap-3">
            <span className="text-sm">Budget range</span>
            <Slider defaultValue={[20, 70]} max={100} step={5} aria-label="Budget" />
          </div>
        </Demo>

        <Demo title="Select" className="flex-col">
          <Select defaultValue="pst">
            <SelectTrigger className="w-64" aria-label="Timezone">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Americas</SelectLabel>
                <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                <SelectItem value="est">Eastern Time (ET)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                <SelectItem value="gst">Gulf Standard Time (GST)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-64" size="sm" aria-label="Small trigger">
              <SelectValue placeholder="Small trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
        </Demo>

        <Demo title="Native Select">
          <NativeSelect defaultValue="usd" className="w-64" aria-label="Currency">
            <NativeSelectOptGroup label="Common">
              <NativeSelectOption value="usd">USD, US Dollar</NativeSelectOption>
              <NativeSelectOption value="jpy">JPY, Japanese Yen</NativeSelectOption>
            </NativeSelectOptGroup>
            <NativeSelectOptGroup label="Other">
              <NativeSelectOption value="aed">AED, UAE Dirham</NativeSelectOption>
              <NativeSelectOption value="sgd">SGD, Singapore Dollar</NativeSelectOption>
            </NativeSelectOptGroup>
          </NativeSelect>
        </Demo>

        <Demo title="Combobox">
          <div className="w-64">
            <Combobox items={regions}>
              <ComboboxInput placeholder="Select a region" />
              <ComboboxContent>
                <ComboboxEmpty>No regions found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </Demo>

        <Demo title="Calendar">
          <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={date} className="rounded-2xl border" />
        </Demo>

        <Demo title="Date Picker" wide className="flex-col sm:flex-row">
          <DatePickerDemo />
        </Demo>
      </DemoGrid>
    </Page>
  )
}
