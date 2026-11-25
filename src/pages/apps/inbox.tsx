import * as React from "react"
import {
  Archive02Icon,
  ArrowTurnBackwardIcon,
  Clock01Icon,
  Delete02Icon,
  Search01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"

import { Icon } from "@/components/icon"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

type Mail = { id: number; from: string; subject: string; preview: string; body: string[]; time: string; unread: boolean; tags: string[] }

const seed: Mail[] = [
  {
    id: 1, from: "Aiko Tanaka", subject: "Q4 planning notes", time: "09:24", unread: true, tags: ["Planning"],
    preview: "Sharing the notes from this morning. Three open questions on budget…",
    body: [
      "Hi Mira,",
      "Sharing the notes from this morning. Three open questions on budget split, and one on timing for the Japan launch.",
      "Could you review the draft before Thursday? I would like to lock the plan by end of week.",
      "Thanks, Aiko",
    ],
  },
  {
    id: 2, from: "Omar Haddad", subject: "Design review moved to 3pm", time: "08:51", unread: true, tags: ["Meeting"],
    preview: "Room 4B is booked until 2:45, so I pushed the review by an hour.",
    body: ["Room 4B is booked until 2:45, so I pushed the review by an hour.", "Same agenda. Bring the updated sidebar explorations if they are ready."],
  },
  {
    id: 3, from: "Lena Fischer", subject: "Invoice INV-1043", time: "Yesterday", unread: false, tags: ["Billing"],
    preview: "Attached is the invoice for October. Payment terms are net 30.",
    body: ["Attached is the invoice for October. Payment terms are net 30.", "Let me know if the PO number needs to change."],
  },
  {
    id: 4, from: "Ravi Menon", subject: "Feedback on the onboarding flow", time: "Yesterday", unread: false, tags: ["Research", "Product"],
    preview: "Five of eight participants missed the import step entirely.",
    body: ["Five of eight participants missed the import step entirely.", "Full recordings are in the research folder. Happy to walk through the highlights."],
  },
  {
    id: 5, from: "Sofia Ruiz", subject: "Welcome to the team", time: "Mon", unread: false, tags: [],
    preview: "Great to have you with us. Here is everything you need for week one.",
    body: ["Great to have you with us. Here is everything you need for week one.", "Your laptop arrives Tuesday. Ping me for anything else."],
  },
]

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("")

export function InboxPage() {
  const isMobile = useIsMobile()
  const [mails, setMails] = React.useState(seed)
  const [activeId, setActiveId] = React.useState<number | null>(1)
  const [tab, setTab] = React.useState("all")
  const [query, setQuery] = React.useState("")
  const [reply, setReply] = React.useState("")

  const list = mails.filter(
    (mail) =>
      (tab === "all" || mail.unread) &&
      `${mail.from} ${mail.subject}`.toLowerCase().includes(query.toLowerCase())
  )
  const active = mails.find((mail) => mail.id === activeId) ?? null

  function open(id: number) {
    setActiveId(id)
    setMails((current) => current.map((mail) => (mail.id === id ? { ...mail, unread: false } : mail)))
  }

  function remove(label: string) {
    if (!active) return
    const previous = mails
    setMails(mails.filter((mail) => mail.id !== active.id))
    setActiveId(null)
    toast(label, { action: { label: "Undo", onClick: () => setMails(previous) } })
  }

  const actions = [
    { label: "Archive", icon: Archive02Icon, run: () => remove("Conversation archived") },
    { label: "Delete", icon: Delete02Icon, run: () => remove("Conversation deleted") },
    { label: "Snooze", icon: Clock01Icon, run: () => toast("Snoozed until tomorrow") },
    { label: "Star", icon: StarIcon, run: () => toast("Starred") },
  ]

  const listPane = (
    <Tabs value={tab} onValueChange={setTab} className="flex h-full min-h-0 flex-col gap-0">
      <div className="flex flex-col gap-3 p-3">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-heading text-lg font-semibold">Inbox</h1>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
        </div>
        <InputGroup>
          <InputGroupAddon><Icon icon={Search01Icon} /></InputGroupAddon>
          <InputGroupInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search mail" aria-label="Search mail" />
        </InputGroup>
      </div>
      <Separator />
      <TabsContent value={tab} className="flex min-h-0 flex-1 flex-col">
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-1 p-2">
          {list.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">Nothing here.</p>
          ) : (
            list.map((mail) => (
              <button
                key={mail.id}
                type="button"
                onClick={() => open(mail.id)}
                className={cn(
                  "flex flex-col gap-1 rounded-2xl p-3 text-left text-sm outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30",
                  mail.id === activeId && "bg-muted"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn("truncate", mail.unread && "font-semibold")}>{mail.from}</span>
                  {mail.unread ? <span className="size-2 shrink-0 rounded-full bg-primary" aria-label="Unread" /> : null}
                  <span className="ml-auto shrink-0 text-xs text-muted-foreground tabular-nums">{mail.time}</span>
                </div>
                <span className={cn("truncate", mail.unread && "font-medium")}>{mail.subject}</span>
                <span className="line-clamp-2 text-muted-foreground">{mail.preview}</span>
                {mail.tags.length ? (
                  <div className="mt-1 flex gap-1">
                    {mail.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                ) : null}
              </button>
            ))
          )}
        </div>
      </ScrollArea>
      </TabsContent>
    </Tabs>
  )

  const readPane = active ? (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-1 p-2">
        {isMobile ? (
          <Button variant="ghost" size="sm" onClick={() => setActiveId(null)}>Back</Button>
        ) : null}
        {actions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={action.label} onClick={action.run}>
                <Icon icon={action.icon} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{action.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
      <Separator />
      <div className="flex items-start gap-3 p-4">
        <Avatar size="lg"><AvatarFallback>{initials(active.from)}</AvatarFallback></Avatar>
        <div className="grid min-w-0 flex-1 gap-0.5">
          <span className="truncate font-medium">{active.subject}</span>
          <span className="truncate text-sm text-muted-foreground">{active.from} to me</span>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">{active.time}</span>
      </div>
      <Separator />
      <ScrollArea className="min-h-0 flex-1">
        <div className="typeset typeset-app max-w-[68ch] p-4">
          {active.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </ScrollArea>
      <form
        className="p-3"
        onSubmit={(e) => {
          e.preventDefault()
          if (!reply.trim()) return
          toast.success(`Reply sent to ${active.from}`)
          setReply("")
        }}
      >
        <InputGroup>
          <InputGroupTextarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder={`Reply to ${active.from}…`} aria-label="Reply" />
          <InputGroupAddon align="block-end">
            <InputGroupButton type="submit" variant="default" size="sm" className="ml-auto" disabled={!reply.trim()}>
              <Icon icon={ArrowTurnBackwardIcon} />Send
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  ) : (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyTitle>No conversation selected</EmptyTitle>
        <EmptyDescription>Pick a message from the list to read it here.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )

  if (isMobile) {
    return <div className="h-full">{active ? readPane : listPane}</div>
  }

  return (
    <div className="h-full">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="38%" minSize="28%" maxSize="55%">{listPane}</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="62%">{readPane}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
