import * as React from "react"
import { toast } from "sonner"

import { Page } from "@/components/demo"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "@/components/theme-provider"

const members = [
  ["MK", "Mira Kato", "mira@example.com", "Owner"],
  ["AT", "Aiko Tanaka", "aiko@example.com", "Admin"],
  ["OH", "Omar Haddad", "omar@example.com", "Member"],
  ["LF", "Lena Fischer", "lena@example.com", "Member"],
]

const notifications = [
  ["mentions", "Mentions", "When someone mentions you in a comment.", true],
  ["assignments", "Assignments", "When a task is assigned to you.", true],
  ["digest", "Weekly digest", "A summary every Monday morning.", false],
  ["product", "Product updates", "News about features and releases.", false],
] as const

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [name, setName] = React.useState("Mira Kato")

  return (
    <Page title="Settings" description="Manage your profile, notifications and team." className="max-w-3xl">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="flex flex-col gap-4">
          <Card>
            <form
              className="contents"
              onSubmit={(e) => {
                e.preventDefault()
                toast.success("Profile saved")
              }}
            >
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Shown to people in your workspace.</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field data-invalid={!name.trim() || undefined}>
                      <FieldLabel htmlFor="s-name">Name</FieldLabel>
                      <Input id="s-name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!name.trim()} required />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="s-email">Email</FieldLabel>
                      <Input id="s-email" type="email" defaultValue="mira@example.com" />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="s-bio">Bio</FieldLabel>
                    <Textarea id="s-bio" rows={3} defaultValue="Design lead. Usually found in a Figma file." />
                    <FieldDescription>Up to 160 characters.</FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="s-tz">Timezone</FieldLabel>
                    <Select defaultValue="pt">
                      <SelectTrigger id="s-tz" className="w-full sm:w-72">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">Pacific Time (PT)</SelectItem>
                        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                        <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                        <SelectItem value="gst">Gulf Standard Time (GST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </CardContent>
              <CardFooter className="justify-end gap-2 border-t">
                <Button type="reset" variant="ghost" onClick={() => setName("Mira Kato")}>Reset</Button>
                <Button type="submit" disabled={!name.trim()}>Save changes</Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Applies to this browser only.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={theme}
                onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                className="grid gap-3 sm:grid-cols-3"
              >
                {(["light", "dark", "system"] as const).map((value) => (
                  <FieldLabel key={value} htmlFor={`theme-${value}`}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle className="capitalize">{value}</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value={value} id={`theme-${value}`} aria-label={`${value} theme`} />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose what reaches your inbox.</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSet>
                <FieldLegend variant="label">Email</FieldLegend>
                <FieldGroup className="gap-4">
                  {notifications.map(([id, title, description, on], index) => (
                    <React.Fragment key={id}>
                      {index > 0 ? <FieldSeparator /> : null}
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldLabel htmlFor={`n-${id}`}>{title}</FieldLabel>
                          <FieldDescription>{description}</FieldDescription>
                        </FieldContent>
                        <Switch
                          id={`n-${id}`}
                          defaultChecked={on}
                          onCheckedChange={(checked) => toast(`${title} ${checked ? "on" : "off"}`)}
                        />
                      </Field>
                    </React.Fragment>
                  ))}
                </FieldGroup>
              </FieldSet>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Members</CardTitle>
              <CardDescription>4 of 10 seats used.</CardDescription>
            </CardHeader>
            <CardContent>
              <ItemGroup>
                {members.map(([short, full, email, role]) => (
                  <Item key={email} role="listitem" className="px-0">
                    <ItemMedia>
                      <Avatar><AvatarFallback>{short}</AvatarFallback></Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{full}</ItemTitle>
                      <ItemDescription>{email}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Badge variant={role === "Owner" ? "default" : "outline"}>{role}</Badge>
                    </ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            </CardContent>
            <CardFooter className="gap-2 border-t">
              <Input type="email" placeholder="teammate@example.com" aria-label="Invite by email" />
              <Button onClick={() => toast.success("Invite sent")}>Invite</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delete workspace</CardTitle>
              <CardDescription>Removes all projects, tasks and reports for every member.</CardDescription>
            </CardHeader>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete workspace</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
                    <AlertDialogDescription>
                      All data is removed for 4 members. This can't be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep workspace</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={() => toast("Nothing was deleted. This is a sample.")}>
                      Delete workspace
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Page>
  )
}
