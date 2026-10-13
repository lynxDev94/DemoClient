import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { ClockIcon, PinIcon } from "@/components/site/marks";
import { telHref } from "@/lib/format";

export function TopBar({ clinic }: { clinic: Clinic }) {
  const hours = clinic.hours.map((slot) => `${slot.days} ${slot.time}`).join(" · ");
  return (
    <div className="bg-brand text-sm text-[#e9eaf7]">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2.5">
        <div className="flex flex-wrap gap-x-6 gap-y-1.5">
          {hours ? (
            <span className="inline-flex items-center gap-2">
              <ClockIcon />
              {hours}
            </span>
          ) : null}
          <span className="hidden items-center gap-2 min-[721px]:inline-flex">
            <PinIcon />
            {clinic.address}
          </span>
        </div>
        <a href={telHref(clinic.phone)} className="font-bold text-white">
          {clinic.phone}
        </a>
      </Container>
    </div>
  );
}
