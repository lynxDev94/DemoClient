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
  const badge = (clinic.brand.logoStyle ?? "badge") === "badge";
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative h-[46px] w-[46px] shrink-0 overflow-hidden rounded-xl",
          badge && "border border-[#e3e5f0] bg-white",
          !clinic.brand.logo &&
            cn("grid place-items-center", light ? "bg-white/15 text-white" : "bg-brand text-white"),
        )}
      >
        {clinic.brand.logo ? (
          <span className="absolute bottom-0 left-1/2 block h-[168px] w-[230px] -translate-x-1/2">
            <Image
              src={clinic.brand.logo}
              alt=""
              fill
              sizes="230px"
              className="object-contain object-bottom"
            />
          </span>
        ) : (
          <PawPrint className="size-5" aria-hidden="true" />
        )}
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className={cn("font-serif text-[21px] font-bold", light ? "text-white" : "text-brand")}>
          {clinic.name}
        </span>
        {clinic.subtitle ? (
          <span className={cn("mt-1 text-[12.5px] font-semibold", light ? "text-white/75" : "text-[#555a7a]")}>
            {clinic.subtitle}
          </span>
        ) : null}
      </span>
    </span>
  );
}
