import type { Metadata } from "next";
import { getClinic } from "@/clinics";
import { ClinicMap } from "@/components/site/clinic-map";
import { Container } from "@/components/site/container";
import { HoursList } from "@/components/site/hours-list";
import { PhoneButton } from "@/components/site/phone-button";
import { Photo } from "@/components/site/photo";
import { SectionHeading } from "@/components/site/section-heading";
import { telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { requireClinic } from "@/lib/load";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ clinic: string }>;
}): Promise<Metadata> {
  const clinic = await getClinic((await params).clinic);
  if (!clinic) return { title: labels.notFound.title };
  return { title: `${labels.nav[5].label} · ${clinic.name}`, description: clinic.tagline };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ clinic: string }>;
}) {
  const clinic = await requireClinic((await params).clinic);
  const socials = [
    clinic.socials?.facebook ? { href: clinic.socials.facebook, label: "Facebook" } : null,
    clinic.socials?.instagram ? { href: clinic.socials.instagram, label: "Instagram" } : null,
  ].filter((item): item is { href: string; label: string } => item !== null);

  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-28">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow={labels.nav[5].label}
          title={labels.pages.contactTitle}
          text={labels.pages.contactText}
        />
        {clinic.locationPhoto ? (
          <div className="relative mt-10 aspect-[1805/697] overflow-hidden rounded-[32px] border border-border bg-secondary">
            <Photo
              src={clinic.locationPhoto}
              alt={clinic.address}
              sizes="(min-width: 1024px) 960px, 100vw"
            />
          </div>
        ) : null}
        <div
          className={`grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] ${clinic.locationPhoto ? "mt-8" : "mt-12"}`}
        >
          <div className="rounded-[32px] border border-border/80 bg-card p-7 shadow-[0_24px_50px_-40px_rgba(30,58,50,0.5)] md:p-9">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {labels.pages.address}
            </p>
            <p className="mt-3 font-serif text-3xl tracking-tight text-brand">{clinic.address}</p>
            <div className="mt-8 space-y-2">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                {labels.pages.phone}
              </p>
              <a
                href={telHref(clinic.phone)}
                className="font-serif text-3xl tracking-tight text-brand transition-colors duration-200 hover:text-accent"
              >
                {clinic.phone}
              </a>
            </div>
            {clinic.email ? (
              <div className="mt-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  {labels.pages.email}
                </p>
                <a
                  href={`mailto:${clinic.email}`}
                  className="mt-2 inline-flex text-brand transition-colors duration-200 hover:text-accent"
                >
                  {clinic.email}
                </a>
              </div>
            ) : null}
            <div className="mt-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                {labels.pages.hours}
              </p>
              <HoursList hours={clinic.hours} className="mt-2" />
            </div>
            {socials.length > 0 ? (
              <div className="mt-6 flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-brand transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            ) : null}
            <PhoneButton phone={clinic.phone} className="mt-8" />
          </div>
          <ClinicMap src={clinic.mapEmbedUrl} title={`${labels.a11y.map}: ${clinic.address}`} />
        </div>
      </Container>
    </section>
  );
}
