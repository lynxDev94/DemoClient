import Link from "next/link";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { clinicNav, clinicPath, telHref } from "@/lib/format";
import { labels } from "@/lib/labels";

export function Footer({ clinic }: { clinic: Clinic }) {
  const links = clinicNav(clinic).filter((item) => item.href !== "");
  return (
    <footer className="bg-footer text-[#c9cbe6]">
      <Container className="flex flex-col gap-12 py-16 pb-10">
        <div className="flex flex-wrap gap-x-16 gap-y-10">
          <div className="flex min-w-[260px] flex-1 flex-col gap-3">
            <Logo clinic={clinic} light />
            <p className="max-w-[280px] text-[15px] leading-relaxed">{clinic.copy?.footerText ?? clinic.tagline}</p>
          </div>
          <div className="flex min-w-[160px] flex-1 flex-col gap-2.5 text-[15px]">
            <span className="text-[13px] font-bold tracking-[0.08em] text-[#8f92c4] uppercase">
              {labels.footer.explore}
            </span>
            {links.map((item) => (
              <Link key={item.href} href={clinicPath(clinic.slug, item.href)} className="text-[#c9cbe6] hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex min-w-[200px] flex-1 flex-col gap-2.5 text-[15px]">
            <span className="text-[13px] font-bold tracking-[0.08em] text-[#8f92c4] uppercase">
              {labels.footer.visit}
            </span>
            <a href={telHref(clinic.phone)} className="font-bold text-white">
              {clinic.phone}
            </a>
            {clinic.email ? (
              <a href={`mailto:${clinic.email}`} className="text-[#c9cbe6] hover:text-white">
                {clinic.email}
              </a>
            ) : null}
            <span>{clinic.address}</span>
          </div>
          {clinic.hours.length > 0 ? (
            <div className="flex min-w-[180px] flex-1 flex-col gap-2.5 text-[15px]">
              <span className="text-[13px] font-bold tracking-[0.08em] text-[#8f92c4] uppercase">
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
        <div className="border-t border-[#2a2c66] pt-6 text-[13.5px] text-[#8f92c4]">
          © {clinic.legalName ?? clinic.name}
        </div>
      </Container>
    </footer>
  );
}
