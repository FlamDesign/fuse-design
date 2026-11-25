import {
  CheckListIcon,
  CheckmarkCircle02Icon,
  CircleIcon,
  TaskDaily01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

const todos: { title: string; description?: string; done: boolean }[] = [
  {
    title: "Write the migration guide",
    description: "Cover the renamed props and the new data attributes.",
    done: true,
  },
  { title: "Add a changeset", done: true },
  {
    title: "Fix the focus ring on the select trigger",
    description: "It is clipped by overflow-hidden on the field.",
    done: false,
  },
  { title: "Update the registry snapshots", done: false },
  {
    title: "Add tests for the combobox",
    description: "Typing, clearing and keyboard selection.",
    done: false,
  },
]

function TodoRow({ todo }: { todo: (typeof todos)[number] }) {
  const line = (
    <TraceLine>
      <TraceIcon>
        {todo.done ? (
          <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
        ) : (
          <HugeiconsIcon icon={CircleIcon} strokeWidth={2} />
        )}
      </TraceIcon>
      <TraceTitle>{todo.title}</TraceTitle>
    </TraceLine>
  )

  if (!todo.description) {
    return line
  }

  return (
    <TraceCollapsible>
      <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
      <TraceCollapsibleContent>{todo.description}</TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

export function QueueDescriptions() {
  const pending = todos.filter((todo) => !todo.done)
  const completed = todos.filter((todo) => todo.done)

  return (
    <Trace className="max-w-sm">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <HugeiconsIcon icon={TaskDaily01Icon} strokeWidth={2} />
            </TraceIcon>
            <TraceTitle>{pending.length} to do</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            {pending.map((todo) => (
              <TodoRow key={todo.title} todo={todo} />
            ))}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <HugeiconsIcon icon={CheckListIcon} strokeWidth={2} />
            </TraceIcon>
            <TraceTitle>{completed.length} completed</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            {completed.map((todo) => (
              <TodoRow key={todo.title} todo={todo} />
            ))}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
