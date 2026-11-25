import * as React from "react"
import { useChat } from "@ai-sdk/react"
import type { UIDataTypes, UIMessage } from "ai"
import {
  Add01Icon,
  ArrowUp02Icon,
  ArrowUpRight01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Copy01Icon,
  File01Icon,
  Globe02Icon,
  Loading03Icon,
  Search01Icon,
  SparklesIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { createChat, getMessageText } from "@/lib/ai"
import { Icon } from "@/components/icon"
import { Markdown } from "@/components/markdown"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Marker, MarkerContent } from "@/components/ui/marker"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    queryReport: {
      input: { report: string; range: string }
      output: { summary: string }
    }
  }
>
type ChatPart = ChatMessage["parts"][number]
type ToolPart = Extract<ChatPart, { type: "tool-queryReport" }>
type SourcePart = Extract<ChatPart, { type: "source-url" }>

type Script = {
  prompt: string
  thought: string
  report: string
  summary: string
  reply: string
  sources: { title: string; url: string }[]
}

// Scripted replies. The AI SDK streams them through useChat with no model or network.
const scripts: Script[] = [
  {
    prompt: "Summarize last week's performance",
    thought: "Weekly totals live in the campaign performance report. I should compare the last seven days with the seven before.",
    report: "campaign-performance",
    summary: "5 campaigns, 1,284,930 interactions, engagement rate 4.1%",
    reply: `Interactions rose **12.4%** week over week to 1,284,930.

- **Autumn collection launch** (Northwind Apparel) led with 412,380.
- Engagement rate held at **4.1%**.
- Completion rate slipped 3 points to 65%, mostly on the Harbor Bank Flick.`,
    sources: [
      { title: "Campaign performance, last 30 days", url: "https://example.com/reports/campaign-performance" },
      { title: "Completion by creative", url: "https://example.com/reports/completion" },
    ],
  },
  {
    prompt: "Which market grew fastest?",
    thought: "Growth by market needs the market breakdown, ranked by percentage change and not by volume.",
    report: "interactions-by-market",
    summary: "4 markets ranked by week over week change",
    reply: `**Japan** grew fastest at 18%, ahead of the UAE at 11%.

The United States added the most volume, 486,200 interactions, but from a much larger base.`,
    sources: [{ title: "Interactions by market", url: "https://example.com/reports/markets" }],
  },
  {
    prompt: "How long will the Ad Balance last?",
    thought: "Runway is the Ad Balance divided by the current daily spend across live campaigns.",
    report: "billing-summary",
    summary: "Ad Balance $18,240.00, average daily spend $2,026.67",
    reply: `The Ad Balance of **$18,240.00** covers about **9 days** at the current daily spend.

Pausing the Tidal Audio draft has no effect, since drafts do not spend. To extend the runway, add funds or lower the daily cap on Kestrel Motors.`,
    sources: [{ title: "Billing summary", url: "https://example.com/billing" }],
  },
]

const chat = createChat<ChatMessage>()
  .user("How did the autumn campaign do in its first week?")
  .assistant(({ writer }) => {
    writer.reasoning("First-week numbers for a single campaign come from the campaign performance report.")
    writer
      .tool("queryReport", { input: { report: "campaign-performance", range: "first 7 days" } })
      .output({ summary: "Autumn collection launch: 412,380 interactions, 9% ahead of plan" })
    writer.text(
      "It drew **412,380 interactions** in the first seven days, about 9% ahead of plan.\n\nThe Flick on the homepage was the strongest placement. The Airboard on the product page is under-delivering and may need a new opening frame."
    )
    writer.sourceUrl({ title: "Campaign performance, first 7 days", url: "https://example.com/reports/autumn" })
  })

const initialMessages = chat.get()
const transport = chat.transport({
  delayMs: 18,
  fallback: ({ writer, messages }) => {
    const last = messages.findLast((message) => message.role === "user")
    const asked = last ? getMessageText(last) : ""
    const script = scripts.find((item) => item.prompt === asked)
    if (!script) {
      writer.text("This sample only answers the suggested prompts. Pick one below to see a full reply.")
      return
    }
    writer.reasoning(script.thought)
    writer.sleep(300)
    writer
      .tool("queryReport", { input: { report: script.report, range: "last 7 days" } })
      .sleep(700)
      .output({ summary: script.summary })
    writer.sleep(300)
    writer.text(script.reply)
    for (const source of script.sources) writer.sourceUrl(source)
  },
})

function Reasoning({ text, running }: { text: string; running: boolean }) {
  const [open, setOpen] = React.useState<boolean>()
  return (
    <TraceCollapsible open={open ?? running} onOpenChange={setOpen}>
      <TraceCollapsibleTrigger>
        <TraceLine status={running ? "running" : undefined}>
          <TraceIcon>
            <Icon icon={running ? Loading03Icon : CheckmarkCircle02Icon} className={running ? "animate-spin" : undefined} />
          </TraceIcon>
          <TraceTitle>{running ? "Thinking" : "Thought"}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent className="whitespace-pre-wrap">{text}</TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

function Tool({ part, streaming }: { part: ToolPart; streaming: boolean }) {
  const name = part.input?.report ?? "report"
  if (part.state !== "output-available") {
    return (
      <TraceLine status={streaming ? "running" : "error"}>
        <TraceIcon>
          <Icon icon={Search01Icon} />
        </TraceIcon>
        <TraceTitle>{streaming ? "Reading" : "Could not read"} {name}</TraceTitle>
      </TraceLine>
    )
  }
  return (
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <Icon icon={Search01Icon} />
          </TraceIcon>
          <TraceTitle>Read {name}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <CodeBlock size="sm">
          <CodeBlockContent wrap>{part.output.summary}</CodeBlockContent>
        </CodeBlock>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

function Sources({ sources }: { sources: SourcePart[] }) {
  return (
    <Trace>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <Icon icon={Globe02Icon} />
            </TraceIcon>
            <TraceTitle>
              Used {sources.length} {sources.length === 1 ? "source" : "sources"}
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            {sources.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                <TraceLine>
                  <TraceTitle>
                    {source.title ?? source.url}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </TraceTitle>
                  <TraceIcon>
                    <Icon icon={ArrowUpRight01Icon} />
                  </TraceIcon>
                </TraceLine>
              </a>
            ))}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}

function Actions({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  const [vote, setVote] = React.useState<"up" | "down" | null>(null)
  const items = [
    {
      label: copied ? "Copied" : "Copy",
      icon: copied ? Tick02Icon : Copy01Icon,
      pressed: undefined,
      run: () => {
        void navigator.clipboard?.writeText(text).catch(() => undefined)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1500)
      },
    },
    { label: "Good reply", icon: ThumbsUpIcon, pressed: vote === "up", run: () => setVote(vote === "up" ? null : "up") },
    { label: "Bad reply", icon: ThumbsDownIcon, pressed: vote === "down", run: () => setVote(vote === "down" ? null : "down") },
  ]
  return (
    <div className="-ml-1.5 flex items-center gap-0.5">
      {items.map((item) => (
        <Tooltip key={item.label}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={item.label}
              aria-pressed={item.pressed}
              className="text-muted-foreground aria-pressed:bg-accent aria-pressed:text-foreground"
              onClick={item.run}
            >
              <Icon icon={item.icon} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{item.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export function AssistantPage() {
  const { messages, sendMessage, setMessages, status } = useChat({ messages: initialMessages, transport })
  const [input, setInput] = React.useState("")
  const [file, setFile] = React.useState(true)
  const form = React.useRef<HTMLFormElement>(null)
  const busy = status === "submitted" || status === "streaming"
  const asked = new Set(messages.filter((message) => message.role === "user").map(getMessageText))
  const suggestions = scripts.map((script) => script.prompt).filter((prompt) => !asked.has(prompt))

  function send(text: string) {
    const value = text.trim()
    if (!value || busy) return
    void sendMessage({ text: value })
    setInput("")
  }

  return (
    <MessageScrollerProvider>
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col">
        <h1 className="sr-only">Assistant</h1>
        <div className="relative min-h-0 flex-1">
          {messages.length === 0 ? (
            <Empty className="h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Icon icon={SparklesIcon} />
                </EmptyMedia>
                <EmptyTitle>Ask about your campaigns</EmptyTitle>
                <EmptyDescription>Performance, markets and billing are all in scope.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent aria-busy={busy} className="gap-6 p-4">
                  <Marker variant="separator">
                    <MarkerContent>Today</MarkerContent>
                  </Marker>
                  {messages.map((message) => {
                    if (message.role === "user") {
                      return (
                        <MessageScrollerItem key={message.id} messageId={message.id} scrollAnchor>
                          <Message align="end">
                            <MessageContent>
                              <Bubble align="end" variant="muted">
                                <BubbleContent className="text-base">{getMessageText(message)}</BubbleContent>
                              </Bubble>
                            </MessageContent>
                          </Message>
                        </MessageScrollerItem>
                      )
                    }

                    const streaming = busy && message === messages.at(-1)
                    const steps = message.parts.filter(
                      (part) => part.type === "reasoning" || part.type === "tool-queryReport"
                    )
                    const sources = message.parts.filter((part) => part.type === "source-url")
                    const reply = getMessageText(message)

                    return (
                      <MessageScrollerItem key={message.id} messageId={message.id}>
                        <Message>
                          <MessageContent className="gap-3">
                            {steps.length > 0 ? (
                              <Trace>
                                {steps.map((part, index) =>
                                  part.type === "reasoning" ? (
                                    <Reasoning key={index} text={part.text} running={part.state === "streaming"} />
                                  ) : part.type === "tool-queryReport" ? (
                                    <Tool key={index} part={part} streaming={streaming} />
                                  ) : null
                                )}
                              </Trace>
                            ) : null}
                            {reply ? <Markdown>{reply}</Markdown> : null}
                            {!streaming && sources.length > 0 ? <Sources sources={sources} /> : null}
                            {!streaming && reply ? <Actions text={reply} /> : null}
                          </MessageContent>
                        </Message>
                      </MessageScrollerItem>
                    )
                  })}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          )}
        </div>

        <div className="flex flex-col gap-2 p-4 pt-0">
          {suggestions.length > 0 ? (
            <div className="no-scrollbar flex scroll-fade-x gap-2 overflow-x-auto overscroll-x-contain" aria-label="Suggestions" role="group">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  disabled={busy}
                  onClick={() => send(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          ) : null}
          <form
            ref={form}
            onSubmit={(event) => {
              event.preventDefault()
              send(input)
            }}
          >
            <InputGroup>
              {file ? (
                <InputGroupAddon align="block-start">
                  <Attachment size="sm">
                    <AttachmentMedia>
                      <Icon icon={File01Icon} />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>weekly-summary.csv</AttachmentTitle>
                      <AttachmentDescription>CSV, 48 KB</AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions>
                      <AttachmentAction aria-label="Remove weekly-summary.csv" onClick={() => setFile(false)}>
                        <Icon icon={Cancel01Icon} />
                      </AttachmentAction>
                    </AttachmentActions>
                  </Attachment>
                </InputGroupAddon>
              ) : null}
              <InputGroupTextarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    form.current?.requestSubmit()
                  }
                }}
                placeholder="Ask about your campaigns…"
                aria-label="Message"
                className="text-base"
              />
              <InputGroupAddon align="block-end">
                <InputGroupButton
                  size="icon-sm"
                  variant="outline"
                  className="rounded-full"
                  aria-label="Attach file"
                  onClick={() => setFile(true)}
                >
                  <Icon icon={Add01Icon} />
                </InputGroupButton>
                <InputGroupButton
                  type="submit"
                  size="icon-sm"
                  variant="default"
                  className="ml-auto rounded-full"
                  aria-label="Send"
                  disabled={!input.trim() || busy}
                >
                  <Icon icon={ArrowUp02Icon} />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Replies are scripted sample data, streamed through the AI SDK.</span>
            <Button type="button" variant="link" size="xs" onClick={() => setMessages([])} disabled={busy}>
              Clear chat
            </Button>
          </div>
        </div>
      </div>
    </MessageScrollerProvider>
  )
}
