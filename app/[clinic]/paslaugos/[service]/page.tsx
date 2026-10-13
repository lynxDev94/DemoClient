import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllClinics, getClinic } from "@/clinics";
import { Container } from "@/components/site/container";
import { ArrowIcon, PhoneIcon } from "@/components/site/marks";
import { PhotoFrame } from "@/components/site/photo-frame";
import { PillLink } from "@/components/site/pill";
import { clinicPath, serviceHasDetail, serviceHref, telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { photoOrStock, stockPhotos } from "@/lib/photos";
import { requireClinic } from "@/lib/load";

export async function generateStaticParams() {
  const clinics = await getAllClinics();
  return clinics.flatMap((clinic) =>
    clinic.services
      .filter((service) => serviceHasDetail(service))
      .map((service) => ({ clinic: clinic.slug, service: service.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ clinic: string; service: string }>;
}): Promise<Metadata> {
  const { clinic: slug, service: serviceSlug } = await params;
  const clinic = await getClinic(slug);
  const service = clinic?.services.find((item) => item.slug === serviceSlug);
  if (!clinic || !service || !serviceHasDetail(service)) return { title: labels.notFound.title };
  return { title: `${service.title} · ${clinic.name}`, description: service.summary };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ clinic: string; service: string }>;
}) {
  const { clinic: slug, service: serviceSlug } = await params;
  const clinic = await requireClinic(slug);
  const service = clinic.services.find((item) => item.slug === serviceSlug);
  if (!service || !serviceHasDetail(service)) notFound();
  const detail = service.detail;
  const related = (detail?.related ?? [])
    .map((item) => clinic.services.find((entry) => entry.slug === item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .filter((item) => serviceHasDetail(item));

  return (
    <>
      <section className="bg-brand text-white">
        <Container className="flex flex-wrap items-end gap-10 gap-x-14 pt-14 pb-[72px]">
          <div className="flex min-w-0 flex-[1.4] basis-[520px] flex-col gap-[22px]">
            <p className="text-sm text-[#cfd1ee]">
              <Link href={clinicPath(clinic.slug)} className="text-[#cfd1ee]">
                {labels.nav[0].label}
              </Link>
              {" / "}
              <Link href={clinicPath(clinic.slug, "/paslaugos")} className="text-[#cfd1ee]">
                {labels.nav[1].label}
              </Link>
              {" / "}
              {service.title}
            </p>
            <h1 className="font-serif text-[clamp(44px,5.6vw,76px)] leading-none font-bold">{service.title}</h1>
            <p className="max-w-[620px] text-[19px] leading-relaxed text-[#dcdef3]">
              {detail?.lead ?? service.summary}
            </p>
          </div>
          {detail?.stats && detail.stats.length > 0 ? (
            <div className="flex min-w-0 flex-1 basis-[300px] flex-wrap gap-3">
              {detail.stats.map((stat) => (
                <div key={stat.label} className="flex min-w-[130px] flex-1 flex-col gap-1 rounded-[18px] bg-white/8 p-5">
                  <span className="font-serif text-[34px] leading-none font-bold">{stat.value}</span>
                  <span className="text-sm text-[#cfd1ee]">{stat.label}</span>
                </div>
              ))}
            </div>
          ) : null}
        </Container>
      </section>
      <Container className="flex flex-wrap items-start gap-12 py-24 pt-[72px]">
        <div className="flex min-w-0 flex-[3] basis-[640px] flex-col gap-16">
          {detail?.steps && detail.steps.length > 0 ? (
            <section className="flex flex-col gap-6">
              <h2 className="font-serif text-[34px] leading-tight font-bold text-brand">
                {detail.stepsTitle ?? labels.pages.serviceSteps}
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
                {detail.steps.map((step, index) => (
                  <div key={step.title} className="flex flex-col gap-3 rounded-[20px] border border-[#e3e5f0] bg-white p-[26px]">
                    <span className="grid size-10 place-items-center rounded-full bg-secondary font-serif font-bold text-brand">
                      {index + 1}
                    </span>
                    <span className="text-lg font-bold">{step.title}</span>
                    <span className="text-[15.5px] leading-relaxed text-[#555a7a]">{step.text}</span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
          {detail?.paragraphs && detail.paragraphs.length > 0 ? (
            <section className="flex flex-col gap-4 text-[17px] leading-relaxed text-[#3d4163]">
              {detail.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ) : null}
          {detail?.groups && detail.groups.length > 0 ? (
            <section className="flex flex-col gap-6">
              <h2 className="font-serif text-[34px] leading-tight font-bold text-brand">{labels.pages.serviceGroups}</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                {detail.groups.map((group) => (
                  <div key={group.title} className="flex flex-col gap-4 rounded-[20px] border border-[#e3e5f0] bg-white p-[26px]">
                    <h3 className="text-lg font-extrabold text-brand">{group.title}</h3>
                    <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[15.5px] leading-snug text-[#3d4163]">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
          {related.length > 0 ? (
            <section className="flex flex-col gap-5">
              <h2 className="font-serif text-[26px] font-bold text-brand">{labels.pages.serviceRelated}</h2>
              <div className="flex flex-wrap gap-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={serviceHref(clinic.slug, item.slug)}
                    className="flex min-w-[200px] flex-1 items-center justify-between gap-3 rounded-2xl border-[1.5px] border-line bg-white px-5 py-[18px] font-bold"
                  >
                    {item.title}
                    <ArrowIcon />
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <aside className="flex min-w-0 flex-1 basis-[300px] flex-col gap-4">
          <div className="flex flex-col gap-[18px] rounded-3xl border border-[#e3e5f0] bg-white p-7 shadow-[0_14px_34px_rgba(20,22,58,0.08)]">
            <span className="text-[13px] font-bold tracking-[0.06em] text-accent uppercase">
              {detail?.consult ?? labels.pages.serviceConsult}
            </span>
            <span className="font-serif text-[26px] leading-tight font-bold text-brand">
              {labels.pages.serviceConsultTitle}
            </span>
            <PillLink href={telHref(clinic.phone)} className="w-full">
              <PhoneIcon />
              {clinic.phone}
            </PillLink>
            {clinic.hours.length > 0 ? (
              <div className="flex flex-col gap-2 border-t border-[#e3e5f0] pt-4 text-[15px]">
                {clinic.hours.map((slot) => (
                  <div key={slot.days} className="flex justify-between gap-3">
                    <span className="text-[#555a7a]">{slot.days}</span>
                    <span className="font-bold">{slot.time}</span>
                  </div>
                ))}
              </div>
            ) : null}
            <span className="text-[14.5px] text-[#555a7a]">{labels.pages.servicePrice}</span>
          </div>
          <PhotoFrame
            photo={photoOrStock(clinic.servicesPhoto, stockPhotos.service)}
            alt={service.title}
            label={labels.photo.service}
            className="min-h-[260px] rounded-3xl"
            sizes="320px"
          />
        </aside>
      </Container>
    </>
  );
}
