import Image from "next/image";
import { cn } from "@/lib/utils";

export function Photo({
  src,
  alt,
  focus,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: {
  src: string;
  alt: string;
  /** CSS object-position, for example "center 30%". */
  focus?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
      style={focus ? { objectPosition: focus } : undefined}
    />
  );
}
