import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { PhoneIcon } from "@/components/site/marks";
import { PillLink } from "@/components/site/pill";
import { telHref } from "@/lib/format";
import { labels } from "@/lib/labels";

export function CtaBanner({
  clinic,
  title,
  text,
}: {
  clinic: Clinic;
  title?: string;
  text?: string;
}) {
  const hours = clinic.hours.map((slot) => `${slot.days} ${slot.time}`).join(" · ");
  const line = text !== undefined ? text : (clinic.copy?.ctaText ?? labels.cta.text);
  return (
    <section>
      <Container className="py-24">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-[32px] bg-brand px-8 py-12 text-white md:px-16 md:py-16">
          <div className="flex min-w-0 flex-1 basis-[420px] flex-col gap-3.5">
            <h2 className="font-serif text-[clamp(30px,3.4vw,46px)] leading-[1.08] font-bold">
              {title ?? clinic.copy?.ctaTitle ?? labels.cta.title}
            </h2>
            {line ? <p className="text-[17px] leading-relaxed text-[#dcdef3]">{line}</p> : null}
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <PillLink href={telHref(clinic.phone)} className="min-h-14 px-[30px] text-lg">
              <PhoneIcon />
              {clinic.phone}
            </PillLink>
            {hours && line ? <span className="text-[14.5px] text-[#cfd1ee]">{hours}</span> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
