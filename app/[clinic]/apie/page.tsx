import type { Metadata } from "next";
import { getClinic } from "@/clinics";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { Photo } from "@/components/site/photo";
import { SectionHeading } from "@/components/site/section-heading";
import { clinicStats, paragraphs } from "@/lib/format";
import { labels } from "@/lib/labels";
import { requireClinic } from "@/lib/load";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ clinic: string }>;
}): Promise<Metadata> {
  const clinic = await getClinic((await params).clinic);
  if (!clinic) return { title: labels.notFound.title };
  return { title: `${labels.nav[2].label} · ${clinic.name}`, description: clinic.tagline };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ clinic: string }>;
}) {
  const clinic = await requireClinic((await params).clinic);
  const copy = paragraphs(clinic.about.text);
  const stats = clinicStats(clinic);
  const photos = clinic.about.pagePhoto ? [clinic.about.pagePhoto] : clinic.about.photos;

  return (
    <>
      <section className="pt-16 md:pt-24">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={labels.nav[2].label}
            title={labels.pages.aboutTitle}
            text={clinic.about.foundedYear ? `${labels.since} ${clinic.about.foundedYear}` : undefined}
          />
          <div className="mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
            {copy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {stats.length > 0 ? (
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-serif text-4xl tracking-tight text-brand">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {photos.length > 0 ? (
            <Stagger className="mt-14 grid gap-4 sm:grid-cols-2">
              {photos.map((src, index) => (
                <StaggerItem key={src} className={index === 0 ? "sm:col-span-2" : undefined}>
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-[28px] bg-secondary",
                      index === 0 ? "aspect-[16/9]" : "aspect-[4/3]",
                    )}
                  >
                    <Photo src={src} alt={clinic.name} sizes={index === 0 ? "100vw" : "(min-width: 640px) 50vw, 100vw"} />
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          ) : null}
        </Container>
      </section>
      <div className="h-16 md:h-24" />
      <CtaBanner clinic={clinic} />
    </>
  );
}
