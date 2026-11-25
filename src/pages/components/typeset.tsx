import { Demo, Page } from "@/components/demo"
import { Bubble, BubbleContent } from "@/components/ui/bubble"

function Sample() {
  return (
    <>
      <h1>Launch notes</h1>
      <p>
        Typeset styles plain HTML and rendered markdown inside a <code>typeset</code> container. This
        page uses the <code>typeset-app</code> preset, which sets the body size to <strong>16px</strong>.
      </p>
      <h2>What changed</h2>
      <p>
        Spacing between blocks, heading sizes and list indents all derive from three values: size,
        leading and flow. Change them once and the <a href="https://ui.shadcn.com/docs/typeset">whole document</a> follows.
      </p>
      <ul>
        <li>Body text at 16px with a 1.7 line height</li>
        <li>Headings scale from the body size</li>
        <li>Colors, fonts and radius come from the theme tokens</li>
      </ul>
      <h3>Steps</h3>
      <ol>
        <li>Copy <code>typeset.css</code> next to your main stylesheet.</li>
        <li>Import it after Tailwind.</li>
        <li>Wrap rendered content with the preset class.</li>
      </ol>
      <blockquote>
        <p>One CSS file you own. Edit it directly when you need to.</p>
      </blockquote>
      <pre><code>{`<article className="typeset typeset-app">
  <Markdown>{content}</Markdown>
</article>`}</code></pre>
      <table>
        <thead>
          <tr><th>Variable</th><th>Value</th><th>Controls</th></tr>
        </thead>
        <tbody>
          <tr><td><code>--typeset-size</code></td><td>16px</td><td>Body font size</td></tr>
          <tr><td><code>--typeset-leading</code></td><td>1.7</td><td>Line height</td></tr>
          <tr><td><code>--typeset-flow</code></td><td>1.25em</td><td>Space between blocks</td></tr>
        </tbody>
      </table>
      <hr />
      <p>
        Press <kbd>D</kbd> to toggle dark mode and check the same content against the dark tokens.
      </p>
    </>
  )
}

export function TypesetPage() {
  return (
    <Page title="Typeset" description="shadcn/typeset at 16px. Presets live at the bottom of src/index.css.">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Demo title="Typography" center={false} className="block">
            <article className="typeset typeset-app max-w-[68ch]">
              <Sample />
            </article>
          </Demo>
        </div>
        <Demo title="Chat preset" component="typography" center={false} className="flex-col">
          <Bubble variant="muted" className="max-w-full">
            <BubbleContent>
              <div className="typeset typeset-chat">
                <p>Here is the plan for this week:</p>
                <ol>
                  <li>Finalize the <strong>three creatives</strong></li>
                  <li>Confirm budget with finance</li>
                  <li>Schedule the launch</li>
                </ol>
                <p>Run <code>npm run build</code> before you ship.</p>
              </div>
            </BubbleContent>
          </Bubble>
          <p className="text-sm text-muted-foreground">
            A tighter preset for message content. Same stylesheet, different rhythm.
          </p>
        </Demo>
      </div>
    </Page>
  )
}
