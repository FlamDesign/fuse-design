import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function AlertBasic() {
  return (
    <Alert className="max-w-md">
      <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
      <AlertTitle>Account updated successfully</AlertTitle>
      <AlertDescription>
        Your profile information has been saved. Changes will be reflected
        immediately.
      </AlertDescription>
    </Alert>
  )
}
