import type { Clinic } from "@/clinics/types";
import { Photo } from "@/components/site/photo";
import { initials } from "@/lib/format";

export function SpecialistCard({
  specialist,
}: {
  specialist: Clinic["specialists"][number];
}) {
  return (
    <article>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-secondary">
        {specialist.photo ? (
          <Photo
            src={specialist.photo}
            alt={specialist.name}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-top"
          />
        ) : (
          <div className="grid h-full place-items-center font-serif text-5xl text-brand">
            {initials(specialist.name)}
          </div>
        )}
      </div>
      <h3 className="mt-5 font-serif text-2xl tracking-tight text-brand">{specialist.name}</h3>
      <p className="mt-1 text-muted-foreground">{specialist.role}</p>
    </article>
  );
}
