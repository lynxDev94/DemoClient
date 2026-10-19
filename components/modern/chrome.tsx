import Image from "next/image";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/site/marks";
import { clinicNav, clinicPath, telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { cn } from "@/lib/utils";

/** Nav for the modern theme: "Apie" and "Atsiliepimai" jump to home sections. */
export function modernNav(clinic: Clinic) {
  const items: { href: string; label: string; anchor?: boolean }[] = [];
  for (const item of clinicNav(clinic)) {
    if (item.href === "/apie") {
      items.push({ href: clinicPath(clinic.slug, "#apie"), label: labels.modern.about, anchor: true });
      continue;
    }
    if (item.href === "/kontaktai" && clinic.reviews.length > 0) {
      items.push({ href: clinicPath(clinic.slug, "#atsiliepimai"), label: labels.modern.reviews, anchor: true });
    }
    items.push({ href: clinicPath(clinic.slug, item.href), label: item.label });
  }
  return items;
}

/** Square mark (or a paw when there is no logo) next to the clinic name set in type. */
export function ModernLogo({ clinic, light = false }: { clinic: Clinic; light?: boolean }) {
  const logo = clinic.brand.logo;
  return (
    <span className="flex items-center gap-3">
      <span
        className={cn(
          "relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl",
          logo ? "border border-border bg-white" : light ? "bg-white/12 text-white" : "bg-brand text-white",
        )}
      >
        {logo ? (
          <Image src={logo} alt="" fill sizes="44px" className="object-contain p-1" />
        ) : (
          <PawPrint className="size-5" aria-hidden="true" />
        )}
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className={cn("font-serif text-[21px] font-extrabold", light ? "text-white" : "text-brand")}>
          {clinic.name}
        </span>
        {clinic.subtitle ? (
          <span className={cn("text-[12.5px] font-semibold", light ? "text-white/70" : "text-subtle")}>
            {clinic.subtitle}
          </span>
        ) : null}
      </span>
    </span>
  );
}

export function ModernTopBar({ clinic }: { clinic: Clinic }) {
  const hours = clinic.hours
    .filter((slot) => /\d/.test(slot.time))
    .map((slot) => `${slot.days} ${slot.time}`)
    .join(" · ");
  return (
    <div className="bg-[var(--brand-deep)] text-sm text-[var(--on-brand)]">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2.5">
        <div className="flex flex-wrap gap-x-6 gap-y-1.5">
          {hours ? (
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="size-4 text-[var(--accent-glow)]" />
              {hours}
            </span>
          ) : null}
          <span className="hidden items-center gap-2 min-[721px]:inline-flex">
            <PinIcon className="size-4 text-[var(--accent-glow)]" />
            {clinic.address}
          </span>
        </div>
        <div className="flex items-center gap-x-6">
          {clinic.socials?.facebook ? (
            <a
              href={clinic.socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="hidden text-[var(--on-brand)] hover:text-white min-[721px]:inline"
            >
              {labels.modern.facebook}
            </a>
          ) : null}
          <a href={telHref(clinic.phone)} className="inline-flex items-center gap-2 font-bold text-white">
            <PhoneIcon className="size-4 text-[var(--accent-glow)]" />
            {clinic.phone}
          </a>
        </div>
      </Container>
    </div>
  );
}

export function ModernFooter({ clinic }: { clinic: Clinic }) {
  const links = modernNav(clinic).filter((item) => !item.anchor);
  return (
    <footer className="bg-[var(--brand-night)] text-[var(--on-brand)]">
      <Container className="flex flex-col gap-10 pt-16 pb-9">
        <div className="grid gap-8 min-[640px]:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <ModernLogo clinic={clinic} light />
            <p className="max-w-[280px] leading-relaxed">{clinic.copy?.footerText ?? clinic.tagline}</p>
          </div>
          <div className="flex flex-col gap-2.5 text-[15px]">
            <span className="text-[12.5px] font-bold tracking-[0.08em] text-[var(--accent-glow)] uppercase">
              {labels.modern.pages}
            </span>
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="text-[var(--on-brand)] hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2.5 text-[15px]">
            <span className="text-[12.5px] font-bold tracking-[0.08em] text-[var(--accent-glow)] uppercase">
              {labels.footer.visit}
            </span>
            <a href={telHref(clinic.phone)} className="font-bold text-white">
              {clinic.phone}
            </a>
            {clinic.email ? (
              <a href={`mailto:${clinic.email}`} className="text-[var(--on-brand)] hover:text-white">
                {clinic.email}
              </a>
            ) : null}
            <span>{clinic.address}</span>
            {clinic.socials?.facebook ? (
              <a href={clinic.socials.facebook} target="_blank" rel="noreferrer" className="text-[var(--on-brand)] hover:text-white">
                {labels.modern.facebook}
              </a>
            ) : null}
          </div>
          {clinic.hours.length > 0 ? (
            <div className="flex flex-col gap-2.5 text-[15px]">
              <span className="text-[12.5px] font-bold tracking-[0.08em] text-[var(--accent-glow)] uppercase">
                {labels.footer.hours}
              </span>
              {clinic.hours.map((slot) => (
                <span key={slot.days}>
                  {slot.days} {slot.time}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-[13.5px] text-white/55">
          <span>
            © {new Date().getFullYear()} {clinic.legalName ?? clinic.name}
          </span>
          <span>{clinic.address}</span>
        </div>
      </Container>
    </footer>
  );
}
