import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { CheckIcon } from "@/components/site/marks";
import { PhotoFrame } from "@/components/site/photo-frame";
import { GhostLink } from "@/components/site/pill";
import { clinicPath, paragraphs } from "@/lib/format";
import { labels } from "@/lib/labels";
import { photoOrStock, stockPhotos } from "@/lib/photos";

export function AboutSplit({ clinic }: { clinic: Clinic }) {
  const copy = paragraphs(clinic.about.text);
  const points = clinic.aboutPoints ?? [];
  const ownPhoto = clinic.about.background ?? clinic.about.photos[1];
  if (copy.length === 0 && !ownPhoto && points.length === 0) return null;
  const photo = photoOrStock(ownPhoto, stockPhotos.about);

  return (
    <section>
      <Container className="flex flex-wrap items-center gap-14 py-24">
        <PhotoFrame
          photo={photo}
          alt=""
          label={labels.photo.about}
          className="min-h-[440px] min-w-0 flex-1 basis-[420px] rounded-[28px]"
          sizes="(min-width: 1024px) 46vw, 100vw"
        />
        <div className="flex min-w-0 flex-1 basis-[440px] flex-col gap-5">
          <span className="text-[13.5px] font-bold tracking-[0.08em] text-accent uppercase">
            {labels.home.aboutEyebrow}
          </span>
          <h2 className="font-serif text-[clamp(32px,3.4vw,46px)] leading-[1.08] font-bold text-brand">
            {clinic.copy?.aboutTitle ?? labels.home.aboutTitle}
          </h2>
          {copy.map((paragraph) => (
            <p key={paragraph} className="text-[17px] leading-[1.7] text-[#3d4163]">
              {paragraph}
            </p>
          ))}
          {points.length > 0 ? (
            <div className="flex flex-col gap-3 py-2">
              {points.map((point) => (
                <div key={point} className="flex items-start gap-3.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-brand">
                    <CheckIcon className="size-[15px]" />
                  </span>
                  <span className="text-base leading-snug">{point}</span>
                </div>
              ))}
            </div>
          ) : null}
          <GhostLink href={clinicPath(clinic.slug, "/apie")} className="self-start">
            {labels.home.aboutLink}
          </GhostLink>
        </div>
      </Container>
    </section>
  );
}
