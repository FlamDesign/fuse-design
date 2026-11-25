import {
  Cancel01Icon,
  DashedLineCircleIcon,
  SourceCodeIcon,
  TestTube01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

type Test = {
  name: string
  status: "passed" | "failed" | "skipped"
  error?: string
}

const suites: { name: string; tests: Test[] }[] = [
  {
    name: "auth.test.ts",
    tests: [
      { name: "logs in with valid credentials", status: "passed" },
      { name: "rejects an invalid password", status: "passed" },
      { name: "refreshes an expired token", status: "passed" },
    ],
  },
  {
    name: "user-api.test.ts",
    tests: [
      { name: "creates a user", status: "passed" },
      {
        name: "updates a user profile",
        status: "failed",
        error: `Expected status 200, received 500

  at Object.<anonymous> (src/user-api.test.ts:45:12)`,
      },
      { name: "deletes a user", status: "skipped" },
    ],
  },
  {
    name: "db.test.ts",
    tests: [
      { name: "connects to the database", status: "passed" },
      {
        name: "times out a slow query",
        status: "failed",
        error: `Exceeded timeout of 5000 ms for a test.

  at Object.<anonymous> (src/db.test.ts:22:3)`,
      },
    ],
  },
]

function countTests(tests: Test[]) {
  return {
    total: tests.length,
    failed: tests.filter((test) => test.status === "failed").length,
    skipped: tests.filter((test) => test.status === "skipped").length,
  }
}

function formatCounts({
  total,
  failed,
  skipped,
}: ReturnType<typeof countTests>) {
  return [
    `${total} tests`,
    failed > 0 && `${failed} failed`,
    skipped > 0 && `${skipped} skipped`,
  ]
    .filter(Boolean)
    .join(", ")
}

function TestRow({ test }: { test: Test }) {
  if (test.status === "failed") {
    return (
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine status="error">
            <TraceIcon>
              <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
            </TraceIcon>
            <TraceTitle>{test.name}</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap className="max-h-64">
              {test.error}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  }

  return (
    <TraceLine>
      <TraceIcon>
        {test.status === "skipped" ? (
          <HugeiconsIcon icon={DashedLineCircleIcon} strokeWidth={2} />
        ) : (
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
        )}
      </TraceIcon>
      <TraceTitle>
        {test.status === "skipped" ? `Skipped ${test.name}` : test.name}
      </TraceTitle>
    </TraceLine>
  )
}

export function TestResultsSuites() {
  const summary = countTests(suites.flatMap((suite) => suite.tests))

  return (
    <Trace className="max-w-sm">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine status={summary.failed > 0 ? "error" : undefined}>
            <TraceIcon>
              <HugeiconsIcon icon={TestTube01Icon} strokeWidth={2} />
            </TraceIcon>
            <TraceTitle>Ran {formatCounts(summary)}</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            {suites.map((suite) => {
              const counts = countTests(suite.tests)

              return (
                <TraceCollapsible
                  key={suite.name}
                  defaultOpen={counts.failed > 0}
                >
                  <TraceCollapsibleTrigger>
                    <TraceLine status={counts.failed > 0 ? "error" : undefined}>
                      <TraceIcon>
                        <HugeiconsIcon icon={SourceCodeIcon} strokeWidth={2} />
                      </TraceIcon>
                      <TraceTitle>
                        {suite.name}, {formatCounts(counts)}
                      </TraceTitle>
                    </TraceLine>
                  </TraceCollapsibleTrigger>
                  <TraceCollapsibleContent>
                    <Trace>
                      {suite.tests.map((test) => (
                        <TestRow key={test.name} test={test} />
                      ))}
                    </Trace>
                  </TraceCollapsibleContent>
                </TraceCollapsible>
              )
            })}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
