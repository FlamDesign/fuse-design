import * as React from "react"
import {
  Cancel01Icon,
  CheckmarkCircle02Icon,
  File01Icon,
  Image01Icon,
  Search01Icon,
  SourceCodeIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"

import { useHighlightedCode } from "@/hooks/use-highlighted-code"
import { Demo, DemoGrid, Page } from "@/components/demo"
import { Icon } from "@/components/icon"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { Spinner } from "@/components/ui/spinner"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

const code = `import { Button } from "@/components/ui/button"

export function SaveButton({ saving }: { saving: boolean }) {
  return (
    <Button disabled={saving}>
      {saving ? "Saving" : "Save changes"}
    </Button>
  )
}`

const diff: [string, "default" | "added" | "removed"][] = [
  ["--radius: 0.625rem;", "default"],
  ["--primary: oklch(0.205 0 0);", "removed"],
  ["--primary: oklch(0.55 0.2 264);", "added"],
  ["--ring: oklch(0.708 0 0);", "default"],
]

const questionnaireItems = [
  { name: "goal", required: true, choices: [{ value: "reach" }, { value: "clicks" }, { value: "sales" }] },
  { name: "channels", choices: [{ value: "web" }, { value: "social" }, { value: "ctv" }] },
  { name: "start", required: true, choices: [{ value: "now" }, { value: "next-week" }] },
] as const

const thread = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  role: i % 2 === 0 ? ("user" as const) : ("assistant" as const),
  text:
    i % 2 === 0
      ? `Question ${i / 2 + 1}: how does the scroller behave when new messages arrive?`
      : "It stays pinned to the bottom while you are there, and leaves your position alone once you scroll up. The button below brings you back to the latest message.",
}))

export function AiPage() {
  const lines = useHighlightedCode(code, "tsx")

  return (
    <Page title="AI and chat" description="Building blocks for conversational and agent interfaces.">
      <DemoGrid>
        <Demo title="Message" center={false}>
          <MessageGroup className="w-full">
            <Message align="end">
              <MessageContent>
                <Bubble>
                  <BubbleContent>Can you summarize last week's performance?</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message>
              <MessageAvatar>
                <Avatar><AvatarFallback><Icon icon={SparklesIcon} className="size-4" /></AvatarFallback></Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>Assistant</MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>Reach grew 12% week over week. Engagement held steady at 4.1%.</BubbleContent>
                </Bubble>
                <MessageFooter>10:42</MessageFooter>
              </MessageContent>
            </Message>
          </MessageGroup>
        </Demo>

        <Demo title="Bubble" center={false}>
          <BubbleGroup className="w-full gap-5">
            <Bubble><BubbleContent>Default</BubbleContent></Bubble>
            <Bubble variant="secondary" align="end"><BubbleContent>Secondary, aligned end</BubbleContent></Bubble>
            <Bubble variant="muted">
              <BubbleContent>Muted with a reaction</BubbleContent>
              <BubbleReactions>👍 2</BubbleReactions>
            </Bubble>
            <Bubble variant="tinted" align="end"><BubbleContent>Tinted</BubbleContent></Bubble>
            <Bubble variant="outline"><BubbleContent>Outline</BubbleContent></Bubble>
            <Bubble variant="destructive" align="end"><BubbleContent>Message failed to send</BubbleContent></Bubble>
            <Bubble variant="ghost"><BubbleContent>Ghost, for plain assistant text.</BubbleContent></Bubble>
          </BubbleGroup>
        </Demo>

        <Demo title="Message Scroller" center={false} className="p-0">
          <MessageScrollerProvider>
            <div className="relative h-80 w-full">
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent className="gap-3 p-4">
                    {thread.map((message) => (
                      <MessageScrollerItem key={message.id} scrollAnchor={message.role === "user"}>
                        <Message align={message.role === "user" ? "end" : "start"}>
                          <MessageContent>
                            <Bubble variant={message.role === "user" ? "default" : "muted"}>
                              <BubbleContent>{message.text}</BubbleContent>
                            </Bubble>
                          </MessageContent>
                        </Message>
                      </MessageScrollerItem>
                    ))}
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </div>
          </MessageScrollerProvider>
        </Demo>

        <Demo title="Attachment" className="flex-col" center={false}>
          <AttachmentGroup>
            {["hero.png", "poster.jpg", "frame-03.png"].map((name) => (
              <Attachment key={name} orientation="vertical">
                <AttachmentMedia><Icon icon={Image01Icon} /></AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{name}</AttachmentTitle>
                  <AttachmentDescription>Image, 820 KB</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
            ))}
          </AttachmentGroup>
          <Attachment state="uploading" className="w-full">
            <AttachmentMedia><Spinner /></AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>media-plan.pdf</AttachmentTitle>
              <AttachmentDescription>Uploading, 64%</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Cancel upload"><Icon icon={Cancel01Icon} /></AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment className="w-full">
            <AttachmentMedia><Icon icon={File01Icon} /></AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>brief.md</AttachmentTitle>
              <AttachmentDescription>Markdown, 12 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove brief.md"><Icon icon={Cancel01Icon} /></AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="error" className="w-full">
            <AttachmentMedia><Icon icon={File01Icon} /></AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>export.csv</AttachmentTitle>
              <AttachmentDescription>File is larger than 25 MB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        </Demo>

        <Demo title="Marker" className="flex-col" center={false}>
          <Marker>
            <MarkerIcon><Icon icon={CheckmarkCircle02Icon} /></MarkerIcon>
            <MarkerContent>Mira joined the conversation</MarkerContent>
          </Marker>
          <Marker variant="separator">
            <MarkerContent>Today</MarkerContent>
          </Marker>
          <Marker variant="border">
            <MarkerIcon><Icon icon={SparklesIcon} /></MarkerIcon>
            <MarkerContent>Context compacted. Earlier messages are summarized.</MarkerContent>
          </Marker>
        </Demo>

        <Demo title="Trace" center={false}>
          <Trace>
            <TraceCollapsible defaultOpen>
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon><Icon icon={Search01Icon} /></TraceIcon>
                  <TraceTitle>Searched campaign reports</TraceTitle>
                  <TraceDescription className="text-muted-foreground">4 results</TraceDescription>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent className="text-sm">
                Found weekly summaries for October and the Q3 placement breakdown.
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <TraceLine>
              <TraceIcon><Icon icon={SourceCodeIcon} /></TraceIcon>
              <TraceTitle>Ran aggregate query</TraceTitle>
              <TraceDescription className="text-muted-foreground">1.2s</TraceDescription>
            </TraceLine>
            <TraceLine status="running">
              <TraceIcon><Spinner /></TraceIcon>
              <TraceTitle>Drafting summary</TraceTitle>
            </TraceLine>
            <TraceLine status="pending">
              <TraceIcon><Icon icon={File01Icon} /></TraceIcon>
              <TraceTitle>Export to PDF</TraceTitle>
            </TraceLine>
            <TraceLine status="error">
              <TraceIcon><Icon icon={Cancel01Icon} /></TraceIcon>
              <TraceTitle>Slack notification failed</TraceTitle>
            </TraceLine>
          </Trace>
        </Demo>

        <Demo title="Code Block" className="flex-col" center={false}>
          <CodeBlock className="w-full">
            <CodeBlockHeader>
              <CodeBlockTitle><Icon icon={SourceCodeIcon} />save-button.tsx</CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton value={code} />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent lineNumbers>
              {lines.map((line, index) => (
                <CodeBlockLine key={index} variant={index === 4 ? "highlighted" : "default"}>
                  {line}
                </CodeBlockLine>
              ))}
            </CodeBlockContent>
          </CodeBlock>
          <CodeBlock size="sm" className="w-full">
            <CodeBlockHeader>
              <CodeBlockTitle>index.css</CodeBlockTitle>
            </CodeBlockHeader>
            <CodeBlockContent>
              {diff.map(([text, variant]) => (
                <CodeBlockLine key={text} variant={variant}>{text}</CodeBlockLine>
              ))}
            </CodeBlockContent>
          </CodeBlock>
        </Demo>

        <Demo title="Questionnaire" center={false}>
          <Questionnaire
            className="w-full"
            defaultItem="goal"
            items={questionnaireItems}
            shortcuts="letters"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              toast("Brief saved", {
                description: `Goal: ${data.get("goal") ?? "none"}, channels: ${data.getAll("channels").join(", ") || "none"}, start: ${data.get("start") ?? "none"}`,
              })
            }}
          >
            <QuestionnaireProgress />
            <QuestionnaireItem name="goal" required>
              <QuestionnaireTitle>What is the main goal?</QuestionnaireTitle>
              <QuestionnaireDescription>Pick one, or describe your own.</QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="reach">Reach new audiences</QuestionnaireChoice>
                <QuestionnaireChoice value="clicks">Drive site visits</QuestionnaireChoice>
                <QuestionnaireChoice value="sales">Increase sales</QuestionnaireChoice>
                <QuestionnaireInput aria-label="Another goal" placeholder="Something else…" />
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireItem name="channels" multiple>
              <QuestionnaireTitle>Which channels?</QuestionnaireTitle>
              <QuestionnaireDescription>Select all that apply, or skip.</QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="web">Web</QuestionnaireChoice>
                <QuestionnaireChoice value="social">Social</QuestionnaireChoice>
                <QuestionnaireChoice value="ctv">Connected TV</QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireItem name="start" required>
              <QuestionnaireTitle>When should it start?</QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="now">Right away</QuestionnaireChoice>
                <QuestionnaireChoice value="next-week">Next week</QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireActions>
              <QuestionnairePrevious />
              <QuestionnaireSkip />
              <QuestionnaireNext>Next</QuestionnaireNext>
              <QuestionnaireSubmit>Save brief</QuestionnaireSubmit>
            </QuestionnaireActions>
          </Questionnaire>
        </Demo>
      </DemoGrid>
    </Page>
  )
}
