import Image from "next/image";
import { PawPrint } from "lucide-react";
import type { Clinic } from "@/clinics/types";
import { cn } from "@/lib/utils";

export function Logo({
  clinic,
  light = false,
  className,
}: {
  clinic: Clinic;
  light?: boolean;
  className?: string;
}) {
  if (clinic.brand.logo) {
    const badge = (clinic.brand.logoStyle ?? "badge") === "badge";
    return (
      <span
        className={cn(
          "inline-flex items-center",
          badge && "rounded-xl border border-black/10 bg-white px-2 py-1",
          className,
        )}
      >
        <Image
          src={clinic.brand.logo}
          alt={clinic.name}
          width={220}
          height={168}
          className="h-9 w-auto max-h-9 object-contain sm:h-11 sm:max-h-11"
        />
      </span>
    );
  }

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-2xl",
          light ? "bg-white/15 text-primary-foreground" : "bg-brand text-primary-foreground",
        )}
      >
        <PawPrint className="size-5" aria-hidden="true" />
      </span>
      <span
        className={cn(
          "max-w-[11rem] font-serif text-[1.05rem] leading-tight",
          light ? "text-primary-foreground" : "text-brand",
        )}
      >
        {clinic.name}
      </span>
    </span>
  );
}
