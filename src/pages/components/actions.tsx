import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowRight02Icon,
  Delete02Icon,
  Download01Icon,
  GridViewIcon,
  Menu01Icon,
  StarIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { Demo, DemoGrid, Page } from "@/components/demo"
import { Icon } from "@/components/icon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Spinner } from "@/components/ui/spinner"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ActionsPage() {
  return (
    <Page title="Actions" description="Buttons, toggles and small inline indicators.">
      <DemoGrid>
        <Demo title="Button" wide className="flex-col">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon-xs" variant="outline" aria-label="Add"><Icon icon={Add01Icon} /></Button>
            <Button size="icon-sm" variant="outline" aria-label="Add"><Icon icon={Add01Icon} /></Button>
            <Button size="icon" variant="outline" aria-label="Add"><Icon icon={Add01Icon} /></Button>
            <Button size="icon-lg" variant="outline" aria-label="Add"><Icon icon={Add01Icon} /></Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button><Icon icon={Download01Icon} data-icon="inline-start" />Export</Button>
            <Button variant="outline">Continue<Icon icon={ArrowRight02Icon} /></Button>
            <Button disabled><Spinner />Saving</Button>
            <Button variant="secondary" disabled>Disabled</Button>
          </div>
        </Demo>

        <Demo title="Button Group" className="flex-col">
          <ButtonGroup>
            <Button variant="outline">Archive</Button>
            <Button variant="outline">Report</Button>
            <Button variant="outline">Snooze</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="secondary">Merge</Button>
            <ButtonGroupSeparator />
            <Button variant="secondary" size="icon" aria-label="More merge options">
              <Icon icon={ArrowDown01Icon} />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonGroupText>https://</ButtonGroupText>
            <Button variant="outline">example.com</Button>
          </ButtonGroup>
        </Demo>

        <Demo title="Toggle">
          <Toggle aria-label="Bold"><Icon icon={TextBoldIcon} /></Toggle>
          <Toggle aria-label="Italic" defaultPressed><Icon icon={TextItalicIcon} /></Toggle>
          <Toggle variant="outline" aria-label="Star"><Icon icon={StarIcon} />Star</Toggle>
          <Toggle variant="outline" size="sm">Small</Toggle>
          <Toggle variant="outline" size="lg">Large</Toggle>
        </Demo>

        <Demo title="Toggle Group" className="flex-col">
          <ToggleGroup type="multiple" defaultValue={["bold"]}>
            <ToggleGroupItem value="bold" aria-label="Bold"><Icon icon={TextBoldIcon} /></ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic"><Icon icon={TextItalicIcon} /></ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline"><Icon icon={TextUnderlineIcon} /></ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" variant="outline" spacing={0} defaultValue="left">
            <ToggleGroupItem value="left" aria-label="Align left"><Icon icon={TextAlignLeftIcon} /></ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center"><Icon icon={TextAlignCenterIcon} /></ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right"><Icon icon={TextAlignRightIcon} /></ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" variant="outline" defaultValue="grid">
            <ToggleGroupItem value="grid"><Icon icon={GridViewIcon} />Grid</ToggleGroupItem>
            <ToggleGroupItem value="list"><Icon icon={Menu01Icon} />List</ToggleGroupItem>
          </ToggleGroup>
        </Demo>

        <Demo title="Badge">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="secondary"><Icon icon={Tick02Icon} />Verified</Badge>
          <Badge variant="outline"><Icon icon={Delete02Icon} />Removed</Badge>
          <Badge className="tabular-nums">12</Badge>
        </Demo>

        <Demo title="Kbd" className="flex-col">
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
          <p className="text-sm text-muted-foreground">
            Press <Kbd>Ctrl</Kbd> + <Kbd>B</Kbd> to toggle the sidebar.
          </p>
          <Button variant="outline">
            Search <Kbd>/</Kbd>
          </Button>
        </Demo>

        <Demo title="Spinner">
          <Spinner />
          <Spinner className="size-6" />
          <Spinner className="size-8 text-muted-foreground" />
          <Button variant="outline" disabled><Spinner />Loading</Button>
        </Demo>
      </DemoGrid>
    </Page>
  )
}
