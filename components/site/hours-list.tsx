import type { Clinic } from "@/clinics/types";
import { cn } from "@/lib/utils";

export function HoursList({
  hours,
  className,
}: {
  hours: Clinic["hours"];
  className?: string;
}) {
  return (
    <dl className={cn("divide-y divide-border/80", className)}>
      {hours.map((row) => (
        <div key={row.days} className="flex items-baseline justify-between gap-6 py-3">
          <dt className="text-foreground/80">{row.days}</dt>
          <dd className="font-medium text-brand">{row.time}</dd>
        </div>
      ))}
    </dl>
  );
}
