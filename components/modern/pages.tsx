import Link from "next/link";
import type { Clinic } from "@/clinics/types";
import { ClinicMap } from "@/components/site/clinic-map";
import { Container } from "@/components/site/container";
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/site/marks";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { GrowBar, ModernPageTitle, RingingPhone } from "@/components/modern/page-motion";
import { Eyebrow, ModernButton } from "@/components/modern/ui";
import { clinicPath, serviceHasDetail, serviceHref, telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { cn } from "@/lib/utils";

function Breadcrumb({ clinic, current }: { clinic: Clinic; current: string }) {
  return (
    <p className="text-sm text-subtle">
      <Link href={clinicPath(clinic.slug)} className="text-subtle hover:text-brand">
        {labels.nav[0].label}
      </Link>
      {" / "}
      {current}
    </p>
  );
}

type Service = Clinic["services"][number];

function ServiceRow({ clinic, service }: { clinic: Clinic; service: Service }) {
  const linked = serviceHasDetail(service);
  const body = (
    <>
      <span className="min-w-[200px] flex-1 font-serif text-lg font-extrabold">{service.title}</span>
      <span className="min-w-[220px] flex-[2] leading-snug text-muted-foreground">{service.summary}</span>
      {linked ? <ArrowIcon className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-[5px]" /> : null}
    </>
  );
  const className = "flex flex-wrap items-center gap-x-6 gap-y-1.5 rounded-xl border-t border-border px-3.5 py-5 transition-colors hover:bg-background";
  return linked ? (
    <Link href={serviceHref(clinic.slug, service.slug)} className={cn("group", className)}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

/** Category blocks rotate through three looks: white rows, brand tiles, tinted tiles. */
export function ModernServicesPage({ clinic }: { clinic: Clinic }) {
  const categories = clinic.serviceCategories
    .map((category) => ({
      ...category,
      services: clinic.services.filter((service) => service.category === category.id),
    }))
    .filter((category) => category.services.length > 0);

  return (
    <>
      <section className="border-b border-border bg-white">
        <Container className="flex flex-col gap-5 pt-16 pb-14">
          <Breadcrumb clinic={clinic} current={labels.nav[1].label} />
          <ModernPageTitle text={clinic.copy?.servicesPageTitle ?? labels.modern.servicesPageTitle} />
          <FadeUp delay={0.35} className="flex flex-col gap-5">
            <p className="max-w-[620px] text-[19px] leading-relaxed text-muted-foreground">
              {clinic.copy?.servicesPageText ?? labels.pages.servicesText}
            </p>
            {categories.length > 1 ? (
              <nav aria-label={labels.nav[1].label} className="flex flex-wrap gap-2.5">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-[#d5dee7] bg-white px-[18px] text-[15px] font-bold hover:border-brand hover:bg-secondary hover:text-brand"
                  >
                    {category.title}
                  </a>
                ))}
              </nav>
            ) : null}
          </FadeUp>
        </Container>
      </section>

      <Container className="flex flex-col gap-5 pt-[72px] pb-24">
        {categories.map((category, index) => {
          const look = index % 3;
          const number = String(index + 1).padStart(2, "0");
          const dark = look === 1;
          return (
            <FadeUp key={category.id}>
              <section
                id={category.id}
                className={cn(
                  "relative flex flex-wrap gap-x-14 gap-y-8 overflow-hidden rounded-3xl p-8 min-[721px]:p-10",
                  look === 0 && "border border-border bg-white",
                  dark && "bg-brand text-white",
                  look === 2 && "bg-[var(--accent-soft)]",
                )}
              >
                {look === 0 ? <GrowBar /> : null}
                <div className="flex min-w-0 flex-1 basis-[260px] flex-col gap-3">
                  <span
                    className={cn(
                      "font-serif text-[15px] font-extrabold",
                      dark ? "text-[var(--accent-glow)]" : "text-[var(--accent-ink)]",
                    )}
                  >
                    {number}
                  </span>
                  <h2 className={cn("font-serif text-[32px] leading-tight font-extrabold", dark && "text-white")}>
                    {category.title}
                  </h2>
                  {category.text ? (
                    <p className={cn("leading-relaxed", dark ? "text-[var(--on-brand)]" : "text-muted-foreground")}>
                      {category.text}
                    </p>
                  ) : null}
                </div>
                {look === 0 ? (
                  <div className="flex min-w-0 flex-[2] basis-[520px] flex-col">
                    {category.services.map((service) => (
                      <ServiceRow key={service.slug} clinic={clinic} service={service} />
                    ))}
                  </div>
                ) : (
                  <Stagger className="grid min-w-0 flex-[2] basis-[520px] auto-rows-fr gap-3.5 min-[560px]:grid-cols-2">
                    {category.services.map((service) => {
                      const tile = (
                        <span
                          className={cn(
                            "flex h-full flex-col gap-2 rounded-[18px] p-6 transition-transform duration-300 hover:-translate-y-1",
                            dark ? "bg-[var(--brand-deep)]" : "bg-white",
                          )}
                        >
                          <span className={cn("font-serif text-lg font-extrabold", dark && "text-white")}>
                            {service.title}
                          </span>
                          <span className={cn("leading-normal", dark ? "text-[var(--on-brand)]" : "text-muted-foreground")}>
                            {service.summary}
                          </span>
                        </span>
                      );
                      return (
                        <StaggerItem key={service.slug} className="h-full">
                          {serviceHasDetail(service) ? (
                            <Link href={serviceHref(clinic.slug, service.slug)} className="block h-full">
                              {tile}
                            </Link>
                          ) : (
                            tile
                          )}
                        </StaggerItem>
                      );
                    })}
                  </Stagger>
                )}
              </section>
            </FadeUp>
          );
        })}

        <FadeUp className="mt-7">
          <div className="flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-border bg-white px-8 py-9 min-[721px]:px-10">
            <div className="flex flex-col gap-1.5">
              <h2 className="font-serif text-2xl font-extrabold">{labels.pages.servicesHelpTitle}</h2>
              <p className="text-muted-foreground">{labels.pages.servicesHelpText}</p>
            </div>
            <ModernButton href={telHref(clinic.phone)}>
              <PhoneIcon />
              {clinic.phone}
            </ModernButton>
          </div>
        </FadeUp>
      </Container>
    </>
  );
}

export function ModernContactPage({ clinic }: { clinic: Clinic }) {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`;
  return (
    <section>
      <Container className="flex flex-col gap-9 pt-16 pb-24">
        <div className="flex flex-col gap-4">
          <Breadcrumb clinic={clinic} current={labels.nav[5].label} />
          <ModernPageTitle text={clinic.copy?.contactTitle ?? labels.modern.contactTitle} />
        </div>
        <Stagger className="grid gap-4 min-[900px]:grid-cols-3">
          <StaggerItem className="h-full">
            <div className="flex h-full flex-col justify-between gap-7 rounded-3xl bg-brand p-9 text-white">
              <div className="flex flex-col gap-3">
                <RingingPhone />
                <span className="text-[12.5px] font-bold tracking-[0.08em] text-[var(--accent-glow)] uppercase">
                  {labels.pages.registration}
                </span>
                <a href={telHref(clinic.phone)} className="font-serif text-[clamp(28px,2.6vw,36px)] leading-tight font-extrabold whitespace-nowrap">
                  {clinic.phone}
                </a>
                <p className="leading-relaxed text-[var(--on-brand)]">{clinic.copy?.contactLead ?? labels.pages.contactText}</p>
              </div>
              <div>
                <ModernButton href={telHref(clinic.phone)} variant="accent">
                  {labels.pages.contactCta}
                </ModernButton>
              </div>
            </div>
          </StaggerItem>
          {clinic.hours.length > 0 ? (
            <StaggerItem className="h-full">
              <div className="flex h-full flex-col gap-5 rounded-3xl border border-border bg-white p-9">
                <Eyebrow>{labels.pages.hours}</Eyebrow>
                <dl className="flex flex-col">
                  {clinic.hours.map((slot) => (
                    <div key={slot.days} className="flex justify-between gap-4 border-b border-border py-3.5 text-[17px] last:border-0">
                      <dt>{slot.days}</dt>
                      <dd className="font-extrabold">{slot.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </StaggerItem>
          ) : null}
          <StaggerItem className="h-full">
            <div className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-white p-9">
              <Eyebrow>{labels.pages.address}</Eyebrow>
              <span className="flex gap-3 font-serif text-[24px] leading-snug font-extrabold">
                <PinIcon className="mt-1.5 size-5 shrink-0 text-accent" />
                {clinic.address}
              </span>
              {clinic.email ? (
                <a href={`mailto:${clinic.email}`} className="inline-flex items-center gap-2.5 font-bold text-brand">
                  <MailIcon className="size-5" />
                  {clinic.email}
                </a>
              ) : null}
              {clinic.socials?.facebook ? (
                <a href={clinic.socials.facebook} target="_blank" rel="noreferrer" className="font-bold text-brand">
                  {labels.modern.facebookPage}
                </a>
              ) : null}
            </div>
          </StaggerItem>
        </Stagger>
        <FadeUp className="flex flex-col gap-3">
          {clinic.mapEmbedUrl ? (
            <ClinicMap src={clinic.mapEmbedUrl} title={clinic.address} />
          ) : (
            <div className="grid min-h-[420px] place-items-center rounded-[28px] bg-placeholder">{labels.photo.map}</div>
          )}
          <a href={maps} target="_blank" rel="noreferrer" className="self-start font-bold text-brand">
            {labels.pages.contactMaps} →
          </a>
        </FadeUp>
      </Container>
    </section>
  );
}
