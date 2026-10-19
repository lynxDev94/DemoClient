import type { Metadata } from "next";
import Link from "next/link";
import { getClinic } from "@/clinics";
import { Container } from "@/components/site/container";
import { ArrowIcon, PhoneIcon } from "@/components/site/marks";
import { PillLink } from "@/components/site/pill";
import { clinicPath, serviceHasDetail, serviceHref, telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { requireClinic } from "@/lib/load";
import { WarmServicesPage } from "@/components/warm/pages";
import { ModernServicesPage } from "@/components/modern/pages";

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
  if (clinic.theme === "modern") return <ModernServicesPage clinic={clinic} />;
  if (clinic.theme === "warm") return <WarmServicesPage clinic={clinic} />;
  const title =
    clinic.copy?.servicesPageTitle ??
    `${clinic.services.length} ${labels.nav[1].label.toLowerCase()}`;

  return (
    <>
      <section className="bg-white">
        <Container className="flex flex-col gap-7 pt-16 pb-14">
          <p className="text-sm text-[#555a7a]">
            <Link href={clinicPath(clinic.slug)} className="text-[#555a7a]">
              {labels.nav[0].label}
            </Link>
            {" / "}
            {labels.nav[1].label}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="max-w-[720px] font-serif text-[clamp(40px,5vw,64px)] leading-[1.02] font-bold text-brand">
              {title}
            </h1>
            <p className="max-w-[380px] text-[17px] leading-relaxed text-[#3d4163]">
              {clinic.copy?.servicesPageText ?? labels.pages.servicesText}
            </p>
          </div>
          {clinic.serviceCategories.length > 0 ? (
            <nav aria-label={labels.nav[1].label} className="flex flex-wrap gap-2.5">
              {clinic.serviceCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-bold text-brand hover:border-brand"
                >
                  {category.title}
                </a>
              ))}
            </nav>
          ) : null}
        </Container>
      </section>
      <Container className="flex flex-col gap-[72px] py-24 pt-[72px]">
        {clinic.serviceCategories.map((category, index) => {
          const services = clinic.services.filter((service) => service.category === category.id);
          if (services.length === 0) return null;
          return (
            <section key={category.id} id={category.id} className="flex scroll-mt-28 flex-wrap gap-8 gap-x-14">
              <div className="flex min-w-[260px] flex-1 basis-[260px] flex-col gap-2.5">
                <span className="font-serif text-[15px] font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-serif text-[30px] leading-tight font-bold text-brand">{category.title}</h2>
                {category.text ? <p className="text-[15.5px] leading-relaxed text-[#555a7a]">{category.text}</p> : null}
              </div>
              <div className="min-w-0 flex-[3] basis-[600px] border-t border-line">
                {services.map((service) => {
                  const linked = serviceHasDetail(service);
                  const row = (
                    <>
                      <span className="min-w-[180px] flex-1 text-xl font-bold">{service.title}</span>
                      <span className="min-w-[220px] flex-[2] text-[15.5px] leading-snug text-[#555a7a]">
                        {service.summary}
                      </span>
                      {linked ? (
                        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                          <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-[5px]" />
                        </span>
                      ) : null}
                    </>
                  );
                  const className = "flex flex-wrap items-center gap-4 border-b border-line py-5";
                  return linked ? (
                    <Link key={service.slug} href={serviceHref(clinic.slug, service.slug)} className={`group ${className}`}>
                      {row}
                    </Link>
                  ) : (
                    <div key={service.slug} className={className}>
                      {row}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-brand px-8 py-10 text-white md:px-12">
          <div className="flex min-w-0 flex-1 basis-[380px] flex-col gap-2.5">
            <h2 className="font-serif text-[32px] leading-tight font-bold">{labels.pages.servicesHelpTitle}</h2>
            <p className="text-[16.5px] leading-relaxed text-[#dcdef3]">{labels.pages.servicesHelpText}</p>
          </div>
          <PillLink href={telHref(clinic.phone)} className="min-h-[54px] text-[17px]">
            <PhoneIcon />
            {clinic.phone}
          </PillLink>
        </div>
      </Container>
    </>
  );
}
