import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeIcon, CursorInWindowIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <HugeiconsIcon icon={CursorInWindowIcon} strokeWidth={2} />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <HugeiconsIcon icon={CodeIcon} strokeWidth={2} />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
