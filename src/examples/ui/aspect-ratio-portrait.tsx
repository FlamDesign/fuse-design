import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioPortrait() {
  return (
    <div className="w-full max-w-[10rem]">
      <AspectRatio ratio={9 / 16} className="rounded-lg bg-muted">
        <img
          src="avatar-1.svg"
          alt="Photo"
          className="rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
    </div>
  )
}
