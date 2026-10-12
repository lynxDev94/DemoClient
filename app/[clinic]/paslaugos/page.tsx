import type { Metadata } from "next";
import { getClinic } from "@/clinics";
import { ServicesSection } from "@/components/home/services-section";
import { Container } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { Photo } from "@/components/site/photo";
import { SectionHeading } from "@/components/site/section-heading";
import { labels } from "@/lib/labels";
import { asPhoto } from "@/lib/photos";
import { requireClinic } from "@/lib/load";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ clinic: string }>;
}): Promise<Metadata> {
  const clinic = await getClinic((await params).clinic);
  if (!clinic) return { title: labels.notFound.title };
  return { title: `${labels.nav[1].label} · ${clinic.name}`, description: clinic.tagline };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ clinic: string }>;
}) {
  const clinic = await requireClinic((await params).clinic);
  const servicesPhoto = asPhoto(clinic.servicesPhoto);

  return (
    <>
      <section className="pt-16 pb-4 md:pt-24">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={labels.nav[1].label}
            title={labels.pages.servicesTitle}
            text={labels.pages.servicesText}
          />
          {servicesPhoto ? (
            <div
              className="relative mt-10 overflow-hidden rounded-[28px] bg-secondary"
              style={{ aspectRatio: "3 / 2" }}
            >
              <Photo
                src={servicesPhoto.src}
                focus={servicesPhoto.focus}
                alt={clinic.name}
                sizes="(min-width: 1024px) 1100px, 100vw"
              />
            </div>
          ) : null}
        </Container>
      </section>
      <ServicesSection clinic={clinic} intro={false} linked={false} />
      <CtaBanner clinic={clinic} />
    </>
  );
}
