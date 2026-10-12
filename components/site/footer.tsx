"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { clinicNav, clinicPath, serviceId, telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { navIn } from "@/lib/motion";

function SocialLinks({ clinic }: { clinic: Clinic }) {
  const links = [
    clinic.socials?.facebook ? { href: clinic.socials.facebook, label: "Facebook" } : null,
    clinic.socials?.instagram ? { href: clinic.socials.instagram, label: "Instagram" } : null,
  ].filter((item): item is { href: string; label: string } => item !== null);

  if (links.length === 0) return null;

  return (
    <div className="mt-5 flex gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/20 px-3 py-1.5 text-xs tracking-wide text-primary-foreground/80 transition-colors duration-200 hover:border-white/50 hover:text-primary-foreground"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function Footer({ clinic }: { clinic: Clinic }) {
  const reduce = useReducedMotion();
  const logo = <Logo clinic={clinic} light />;
  const animatedLogo = reduce ? (
    logo
  ) : (
    <motion.div
      initial={navIn.initial}
      whileInView={navIn.animate}
      viewport={{ once: true }}
      transition={navIn.transition}
    >
      {logo}
    </motion.div>
  );

  return (
    <footer className="bg-brand text-primary-foreground">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          {animatedLogo}
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
            {clinic.tagline}
          </p>
          <SocialLinks clinic={clinic} />
        </div>
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary-foreground/55 uppercase">
            {labels.footer.explore}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {clinicNav(clinic).map((item) => (
              <li key={item.href || "home"}>
                <Link
                  href={clinicPath(clinic.slug, item.href)}
                  className="text-primary-foreground/80 transition-colors duration-200 hover:text-primary-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary-foreground/55 uppercase">
            {labels.footer.services}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {clinic.services.map((service, index) => (
              <li key={service.title}>
                <Link
                  href={`${clinicPath(clinic.slug, "/paslaugos")}#${serviceId(service.title, index)}`}
                  className="text-primary-foreground/80 transition-colors duration-200 hover:text-primary-foreground"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary-foreground/55 uppercase">
            {labels.footer.visit}
          </p>
          <address className="mt-4 space-y-2.5 text-sm text-primary-foreground/80 not-italic">
            <p>{clinic.address}</p>
            <p>
              <a href={telHref(clinic.phone)} className="transition-colors duration-200 hover:text-primary-foreground">
                {clinic.phone}
              </a>
            </p>
            {clinic.email ? (
              <p>
                <a href={`mailto:${clinic.email}`} className="transition-colors duration-200 hover:text-primary-foreground">
                  {clinic.email}
                </a>
              </p>
            ) : null}
          </address>
          {clinic.hours.length > 0 ? (
            <dl className="mt-5 space-y-1.5 text-sm text-primary-foreground/80">
              {clinic.hours.map((row) => (
                <div key={row.days} className="flex justify-between gap-4">
                  <dt>{row.days}</dt>
                  <dd>{row.time}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-xs text-primary-foreground/55">
          {clinic.name}. {labels.footer.rights}
        </Container>
      </div>
    </footer>
  );
}
