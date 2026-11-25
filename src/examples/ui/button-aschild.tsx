import { Button } from "@/components/ui/button"

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <a href="/login">Login</a>
    </Button>
  )
}
