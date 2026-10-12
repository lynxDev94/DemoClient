import type { Clinic } from "@/clinics/types";
import { Photo } from "@/components/site/photo";
import { initials } from "@/lib/format";
import { asPhoto } from "@/lib/photos";

export function SpecialistCard({
  specialist,
}: {
  specialist: Clinic["specialists"][number];
}) {
  const photo = asPhoto(specialist.photo);

  return (
    <article>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-secondary">
        {photo ? (
          <Photo
            src={photo.src}
            focus={photo.focus}
            alt={specialist.name}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className={photo.focus ? undefined : "object-top"}
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
