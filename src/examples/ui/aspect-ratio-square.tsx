import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioSquare() {
  return (
    <div className="w-full max-w-[12rem]">
      <AspectRatio ratio={1 / 1} className="rounded-lg bg-muted">
        <img
          src="avatar-1.svg"
          alt="Photo"
          className="rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
    </div>
  )
}
