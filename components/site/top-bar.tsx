import { Clock, Phone } from "lucide-react";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { telHref } from "@/lib/format";

export function TopBar({ clinic }: { clinic: Clinic }) {
  const hours = clinic.hours.map((row) => `${row.days} ${row.time}`).join(" · ");

  return (
    <div className="border-b border-border/80 bg-background text-sm text-muted-foreground">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2.5">
        {hours ? (
          <p className="flex items-center gap-2">
            <Clock className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
            <span>{hours}</span>
          </p>
        ) : (
          <span />
        )}
        <a
          href={telHref(clinic.phone)}
          className="inline-flex items-center gap-2 font-medium text-brand transition-colors duration-200 hover:text-accent"
        >
          <Phone className="size-3.5 shrink-0" aria-hidden="true" />
          {clinic.phone}
        </a>
      </Container>
    </div>
  );
}
