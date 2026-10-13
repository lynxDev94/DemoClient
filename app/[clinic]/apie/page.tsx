import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getClinic } from "@/clinics";
import { Container } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { PhotoFrame } from "@/components/site/photo-frame";
import { clinicPath, hasAboutPage, paragraphs } from "@/lib/format";
import { labels } from "@/lib/labels";
import { photoOrStock, stockPhotos } from "@/lib/photos";
import { requireClinic } from "@/lib/load";

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
  if (!hasAboutPage(clinic)) notFound();
  const lead = clinic.copy?.aboutPageLead ?? paragraphs(clinic.about.text)[0];
  const photo = photoOrStock(
    clinic.about.pagePhoto ?? clinic.locationPhoto ?? clinic.about.background,
    stockPhotos.about,
  );
  const team = clinic.team ?? [];

  return (
    <>
      <section className="bg-white">
        <Container className="flex flex-wrap items-center gap-12 pt-16 pb-20">
          <div className="flex min-w-0 flex-[1.2] basis-[480px] flex-col gap-6">
            <p className="text-sm text-[#555a7a]">
              <Link href={clinicPath(clinic.slug)} className="text-[#555a7a]">
                {labels.nav[0].label}
              </Link>
              {" / "}
              {labels.nav[2].label}
            </p>
            <h1 className="font-serif text-[clamp(42px,5.4vw,72px)] leading-none font-bold text-brand">
              {clinic.copy?.aboutPageTitle ?? clinic.tagline}
            </h1>
            {lead ? <p className="max-w-[600px] text-[19px] leading-relaxed text-[#3d4163]">{lead}</p> : null}
          </div>
          {clinic.about.foundedYear ? (
            <div className="min-w-0 flex-1 basis-[280px]">
              <span className="font-serif text-[clamp(120px,15vw,200px)] leading-[0.85] font-bold text-brand">
                {clinic.about.foundedYear}
              </span>
            </div>
          ) : null}
        </Container>
      </section>
      {clinic.values && clinic.values.length > 0 ? (
        <section>
          <Container className="flex flex-col gap-10 py-[88px]">
            <h2 className="max-w-[640px] font-serif text-[clamp(30px,3.4vw,44px)] leading-tight font-bold text-brand">
              {clinic.copy?.valuesTitle ?? labels.pages.valuesTitle}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] border-t-2 border-brand">
              {clinic.values.map((value, index) => (
                <div key={value.title} className="flex flex-col gap-3 py-7 pr-7">
                  <span className="font-serif text-[15px] font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-2xl font-bold text-brand">{value.title}</span>
                  <span className="text-base leading-relaxed text-[#3d4163]">{value.text}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      {photo || (clinic.partners && clinic.partners.length > 0) ? (
        <section className="bg-white">
          <Container className="flex flex-wrap items-stretch gap-12 py-[88px]">
            <PhotoFrame
              photo={photo}
              alt={clinic.name}
              label={labels.photo.building}
              className="min-h-[420px] min-w-0 flex-1 basis-[420px] rounded-[28px]"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            {clinic.partners && clinic.partners.length > 0 ? (
              <div className="flex min-w-0 flex-1 basis-[440px] flex-col justify-center gap-6">
                <h2 className="font-serif text-[clamp(30px,3.2vw,42px)] leading-tight font-bold text-brand">
                  {clinic.copy?.partnersTitle ?? labels.pages.partnersTitle}
                </h2>
                <div className="border-t border-[#e3e5f0]">
                  {clinic.partners.map((partner) => (
                    <div key={partner.title} className="border-b border-[#e3e5f0] py-5">
                      <span className="font-extrabold">{partner.title}</span>
                      <p className="mt-1 text-[15px] leading-snug text-[#555a7a]">{partner.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}
      {team.length > 0 ? (
        <section>
          <Container className="flex flex-col gap-9 py-[88px]">
            <div className="flex flex-col gap-3">
              <span className="text-[13.5px] font-bold tracking-[0.08em] text-accent uppercase">
                {labels.pages.teamEyebrowPage}
              </span>
              <h2 className="font-serif text-[clamp(30px,3.4vw,44px)] leading-tight font-bold text-brand">
                {labels.home.teamTitle}
              </h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
              {team.map((person) => (
                <div key={person.name} className="flex flex-col gap-3.5">
                  <PhotoFrame
                    photo={person.photo}
                    alt={person.name}
                    label={labels.photo.team}
                    className="aspect-[4/5] rounded-[22px]"
                    sizes="280px"
                  />
                  <div>
                    <div className="text-[19px] font-extrabold">{person.name}</div>
                    <div className="text-[15px] text-[#555a7a]">{person.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      <CtaBanner clinic={clinic} title={clinic.copy?.aboutCtaTitle} text={clinic.copy?.aboutCtaTitle ? "" : undefined} />
    </>
  );
}
