import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to
          your email address.
        </AlertDescription>
      </Alert>
      <Alert>
        <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We&apos;ve added dark mode support. You can enable it in your account
          settings.
        </AlertDescription>
      </Alert>
    </div>
  )
}
