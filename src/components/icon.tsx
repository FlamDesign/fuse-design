import * as React from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

export type { IconSvgElement }

export function Icon({
  icon,
  strokeWidth = 2,
  ...props
}: {
  icon: IconSvgElement
  strokeWidth?: number
} & Omit<React.SVGProps<SVGSVGElement>, "ref" | "strokeWidth">) {
  return <HugeiconsIcon icon={icon} strokeWidth={strokeWidth} {...props} />
}
