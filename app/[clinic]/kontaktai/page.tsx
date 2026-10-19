import type { Metadata } from "next";
import Link from "next/link";
import { getClinic } from "@/clinics";
import { ClinicMap } from "@/components/site/clinic-map";
import { Container } from "@/components/site/container";
import { ClockIcon, MailIcon, PinIcon } from "@/components/site/marks";
import { PillLink } from "@/components/site/pill";
import { clinicPath, telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { requireClinic } from "@/lib/load";
import { WarmContactPage } from "@/components/warm/pages";
import { ModernContactPage } from "@/components/modern/pages";

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
  if (clinic.theme === "modern") return <ModernContactPage clinic={clinic} />;
  if (clinic.theme === "warm") return <WarmContactPage clinic={clinic} />;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`;

  return (
    <section className="bg-white">
      <Container className="flex flex-col gap-10 pt-16 pb-24">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-[#555a7a]">
            <Link href={clinicPath(clinic.slug)} className="text-[#555a7a]">
              {labels.nav[0].label}
            </Link>
            {" / "}
            {labels.nav[5].label}
          </p>
          <h1 className="font-serif text-[clamp(42px,5.2vw,68px)] leading-none font-bold text-brand">
            {clinic.copy?.contactTitle ?? labels.pages.contactTitle}
          </h1>
        </div>
        <div className="flex flex-wrap items-stretch gap-5">
          <div className="flex min-w-0 flex-[1.1] basis-[380px] flex-col justify-between gap-8 rounded-[28px] bg-brand px-9 py-9 text-white">
            <div className="flex flex-col gap-2.5">
              <span className="text-[13px] font-bold tracking-[0.06em] text-[#cfd1ee] uppercase">
                {labels.pages.registration}
              </span>
              <a href={telHref(clinic.phone)} className="font-serif text-[clamp(34px,3.8vw,52px)] leading-tight font-bold">
                {clinic.phone}
              </a>
              <p className="text-base leading-relaxed text-[#dcdef3]">
                {clinic.copy?.contactLead ?? labels.pages.contactText}
              </p>
            </div>
            <PillLink href={telHref(clinic.phone)} className="self-start">
              {labels.pages.contactCta}
            </PillLink>
          </div>
          <div className="flex min-w-0 flex-1 basis-[340px] flex-col rounded-[28px] border border-[#e3e5f0] bg-white px-8">
            <div className="flex gap-4 border-b border-[#e3e5f0] py-[18px]">
              <PinIcon className="mt-0.5 size-[22px] shrink-0 text-accent" />
              <span className="flex flex-col gap-1">
                <span className="text-[13px] font-bold tracking-[0.05em] text-[#555a7a] uppercase">
                  {labels.pages.address}
                </span>
                <span className="text-lg font-bold">{clinic.address}</span>
              </span>
            </div>
            {clinic.email ? (
              <div className="flex gap-4 border-b border-[#e3e5f0] py-[18px]">
                <MailIcon className="mt-0.5 size-[22px] shrink-0 text-accent" />
                <span className="flex flex-col gap-1">
                  <span className="text-[13px] font-bold tracking-[0.05em] text-[#555a7a] uppercase">
                    {labels.pages.email}
                  </span>
                  <a href={`mailto:${clinic.email}`} className="text-lg font-bold">
                    {clinic.email}
                  </a>
                </span>
              </div>
            ) : null}
            {clinic.hours.length > 0 ? (
              <div className="flex gap-4 py-[18px]">
                <ClockIcon className="mt-0.5 size-[22px] shrink-0 text-accent" />
                <span className="flex flex-1 flex-col gap-2.5">
                  <span className="text-[13px] font-bold tracking-[0.05em] text-[#555a7a] uppercase">
                    {labels.pages.hours}
                  </span>
                  {clinic.hours.map((slot) => (
                    <span key={slot.days} className="flex justify-between gap-3 text-[17px]">
                      <span>{slot.days}</span>
                      <span className="font-extrabold">{slot.time}</span>
                    </span>
                  ))}
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex min-h-[420px] flex-col gap-3">
          {clinic.mapEmbedUrl ? (
            <ClinicMap src={clinic.mapEmbedUrl} title={clinic.address} />
          ) : (
            <div className="grid min-h-[420px] place-items-center rounded-[28px] bg-placeholder text-[#3d4163]">
              {labels.photo.map}
            </div>
          )}
          <a href={maps} target="_blank" rel="noreferrer" className="self-start font-bold text-accent">
            {labels.pages.contactMaps}
          </a>
        </div>
      </Container>
    </section>
  );
}
