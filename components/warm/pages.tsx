import Link from "next/link";
import type { Clinic } from "@/clinics/types";
import { ClinicMap } from "@/components/site/clinic-map";
import { Container } from "@/components/site/container";
import { PhoneIcon } from "@/components/site/marks";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { MaskHeading } from "@/components/warm/motion";
import { RingDot, WarmButton, WarmEyebrow } from "@/components/warm/ui";
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

const titleClass = "font-serif text-[clamp(44px,6vw,82px)] leading-none font-bold text-foreground";

/** Services as big numbered rows; a peach band sweeps in on hover. */
export function WarmServicesPage({ clinic }: { clinic: Clinic }) {
  const title = clinic.copy?.servicesPageTitle ?? labels.modern.servicesPageTitle;
  const titleWords = title.split(/\s+/).filter(Boolean);
  return (
    <>
      <section>
        <Container className="flex flex-wrap items-end justify-between gap-6 pt-[72px] pb-12">
          <div className="flex flex-col gap-[18px]">
            <Breadcrumb clinic={clinic} current={labels.nav[1].label} />
            <MaskHeading text={title} highlight={titleWords.length - 1} className={titleClass} />
          </div>
          <FadeUp delay={0.3} className="max-w-[420px]">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {clinic.copy?.servicesPageText ?? labels.warm.servicesPageText}
            </p>
          </FadeUp>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="flex flex-col">
          <Stagger className="flex flex-col">
            {clinic.services.map((service, index) => {
              const linked = serviceHasDetail(service);
              const href = linked ? serviceHref(clinic.slug, service.slug) : telHref(clinic.phone);
              const row = (
                <>
                  <span className="w-[70px] font-serif text-[22px] font-bold text-[#b49ab9] transition-colors group-hover:text-[var(--accent-ink)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 basis-[260px] font-serif text-[clamp(28px,3.4vw,46px)] leading-[1.05] font-bold">
                    {service.title}
                  </span>
                  <span className="flex-[1.3] basis-[320px] text-[17px] leading-relaxed text-muted-foreground">
                    {service.summary}
                  </span>
                  <span className="grid size-[54px] place-items-center rounded-full border-[1.5px] border-[#d9cfdc] transition-all duration-300 group-hover:translate-x-1.5 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </>
              );
              const className =
                "group flex flex-wrap items-center gap-x-10 gap-y-4 rounded border-t border-line bg-[linear-gradient(var(--accent-soft),var(--accent-soft))] bg-[length:0%_100%] bg-no-repeat px-6 py-9 transition-[background-size] duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:bg-[length:100%_100%]";
              return (
                <StaggerItem key={service.slug}>
                  <div id={service.slug} className={index === clinic.services.length - 1 ? "border-b border-line" : undefined}>
                    {linked ? (
                      <Link href={href} className={className}>
                        {row}
                      </Link>
                    ) : (
                      <a href={href} className={className}>
                        {row}
                      </a>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          <FadeUp className="mt-14">
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-[32px] bg-brand p-8 text-white min-[721px]:p-12">
              <div className="flex max-w-[560px] flex-col gap-2">
                <h2 className="font-serif text-[clamp(28px,3vw,38px)] font-bold text-white">{labels.warm.pricesTitle}</h2>
                <p className="leading-relaxed text-[var(--on-brand)]">{clinic.pricesNote ?? labels.warm.pricesText}</p>
              </div>
              <WarmButton href={telHref(clinic.phone)} variant="accent">
                {clinic.phone}
              </WarmButton>
            </div>
          </FadeUp>
        </Container>
      </section>
    </>
  );
}

export function WarmContactPage({ clinic }: { clinic: Clinic }) {
  const title = clinic.copy?.contactTitle ?? labels.warm.contactTitle;
  const titleWords = title.split(/\s+/).filter(Boolean);
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`;
  return (
    <section>
      <Container className="flex flex-col gap-10 pt-[72px] pb-24">
        <div className="flex flex-col gap-[18px]">
          <Breadcrumb clinic={clinic} current={labels.nav[5].label} />
          <MaskHeading text={title} highlight={titleWords.length - 1} className={titleClass} />
        </div>
        <Stagger className="grid gap-4 min-[900px]:grid-cols-3">
          <StaggerItem className="h-full">
            <div className="flex h-full flex-col justify-between gap-6 rounded-[30px] bg-brand p-[38px] text-white">
              <div className="flex flex-col gap-3">
                <RingDot className="size-14 self-start">
                  <PhoneIcon className="size-6" />
                </RingDot>
                <WarmEyebrow light>{labels.pages.registration}</WarmEyebrow>
                <a href={telHref(clinic.phone)} className="font-serif text-[clamp(28px,2.6vw,36px)] font-bold whitespace-nowrap text-white">
                  {clinic.phone}
                </a>
                <p className="leading-relaxed text-[var(--on-brand)]">{clinic.copy?.contactLead ?? labels.pages.contactText}</p>
              </div>
              <div>
                <WarmButton href={telHref(clinic.phone)} variant="accent">
                  {labels.pages.contactCta}
                </WarmButton>
              </div>
            </div>
          </StaggerItem>
          {clinic.hours.length > 0 ? (
            <StaggerItem className="h-full">
              <div className="flex h-full flex-col gap-[18px] rounded-[30px] border border-border bg-white p-[38px]">
                <WarmEyebrow>{labels.pages.hours}</WarmEyebrow>
                <dl className="flex flex-col">
                  {clinic.hours.map((slot) => (
                    <div key={slot.days} className="flex justify-between gap-4 border-b border-border py-3.5 text-[17px] last:border-0">
                      <dt>{slot.days}</dt>
                      <dd className="font-bold">{slot.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </StaggerItem>
          ) : null}
          <StaggerItem className="h-full">
            <div className={cn("flex h-full flex-col gap-4 rounded-[30px] bg-[var(--accent-soft)] p-[38px]")}>
              <WarmEyebrow>{labels.pages.address}</WarmEyebrow>
              <span className="font-serif text-[28px] leading-tight font-bold">{clinic.address}</span>
              {clinic.copy?.visitText ? <p className="leading-relaxed text-muted-foreground">{clinic.copy.visitText}</p> : null}
              {clinic.email ? (
                <a href={`mailto:${clinic.email}`} className="font-extrabold text-brand">
                  {clinic.email}
                </a>
              ) : null}
              {clinic.socials?.facebook ? (
                <a href={clinic.socials.facebook} target="_blank" rel="noreferrer" className="font-extrabold text-brand">
                  {labels.modern.facebookPage} →
                </a>
              ) : null}
            </div>
          </StaggerItem>
        </Stagger>
        <FadeUp className="flex flex-col gap-3">
          {clinic.mapEmbedUrl ? (
            <ClinicMap src={clinic.mapEmbedUrl} title={clinic.address} />
          ) : (
            <div className="grid min-h-[420px] place-items-center rounded-[32px] bg-placeholder">{labels.photo.map}</div>
          )}
          <a href={maps} target="_blank" rel="noreferrer" className="self-start font-extrabold text-brand">
            {labels.pages.contactMaps} →
          </a>
        </FadeUp>
      </Container>
    </section>
  );
}
