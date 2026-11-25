import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function AlertDestructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your payment could not be processed. Please check your payment method
        and try again.
      </AlertDescription>
    </Alert>
  )
}
