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
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-2xl",
          light ? "bg-white/15 text-primary-foreground" : "bg-brand text-primary-foreground",
        )}
      >
        {clinic.brand.logo ? (
          <Image src={clinic.brand.logo} alt="" width={28} height={28} className="size-7 object-contain" />
        ) : (
          <PawPrint className="size-5" aria-hidden="true" />
        )}
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
