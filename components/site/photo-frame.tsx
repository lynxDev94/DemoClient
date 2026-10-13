import type { ClinicPhoto } from "@/clinics/types";
import { Photo } from "@/components/site/photo";
import { asPhoto } from "@/lib/photos";
import { cn } from "@/lib/utils";

export function PhotoFrame({
  photo,
  alt,
  label,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  photo?: ClinicPhoto;
  alt: string;
  label: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const image = asPhoto(photo);
  if (!image) {
    return (
      <div className={cn("flex items-end bg-placeholder p-5", className)}>
        <span className="inline-flex rounded-full bg-white/85 px-3 py-1.5 text-[13px] font-semibold text-[#3d4163]">
          {label}
        </span>
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden bg-placeholder", className)}>
      <Photo src={image.src} focus={image.focus} alt={alt} sizes={sizes} priority={priority} />
    </div>
  );
}
