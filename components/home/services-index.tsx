"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { ArrowIcon } from "@/components/site/marks";
import { GhostLink } from "@/components/site/pill";
import { clinicPath, serviceHasDetail, serviceHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { hoverMove, listItem, listStagger } from "@/lib/motion";

const MotionLink = motion.create(Link);

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function ServicesIndex({ clinic }: { clinic: Clinic }) {
  const reduce = useReducedMotion();
  const featured = clinic.services.find((service) => service.featured && serviceHasDetail(service));
  const listed = clinic.services
    .filter((service) => service.showOnHome)
    .sort((a, b) => (a.homeOrder ?? 100) - (b.homeOrder ?? 100))
    .slice(0, 5);
  if (!featured && listed.length === 0) return null;
  const title = clinic.copy?.servicesTitle ?? labels.home.servicesTitle;

  return (
    <section>
      <Container className="flex flex-col gap-12 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <span className="text-[13.5px] font-bold tracking-[0.08em] text-accent uppercase">
              {labels.home.servicesEyebrow}
            </span>
            <h2 className="font-serif text-[clamp(32px,3.6vw,48px)] leading-[1.08] font-bold text-brand">{title}</h2>
          </div>
          <GhostLink href={clinicPath(clinic.slug, "/paslaugos")}>
            {clinic.copy?.servicesLink ?? labels.allServices}
            <ArrowIcon />
          </GhostLink>
        </div>
        <div className={featured ? "flex flex-wrap items-start gap-6" : undefined}>
          {featured ? (
              <MotionLink
                href={serviceHref(clinic.slug, featured.slug)}
                className="flex min-w-0 flex-1 basis-[380px] flex-col justify-between gap-10 rounded-3xl bg-brand p-9 text-white"
                whileHover={reduce ? undefined : { y: -6, boxShadow: "0 18px 40px rgba(20,22,58,.12)" }}
                transition={hoverMove}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-14 place-items-center rounded-2xl bg-white/12">
                    <ArrowIcon className="size-7" />
                  </span>
                  <span className="text-[13px] font-bold tracking-[0.06em] text-[#cfd1ee] uppercase">
                    {featured.title}
                  </span>
                </div>
                <span className="flex flex-col gap-4">
                  <span className="font-serif text-[34px] leading-[1.1] font-bold">
                    {featured.highlight ?? featured.title}
                  </span>
                  <span className="text-[16.5px] leading-relaxed text-[#dcdef3]">
                    {featured.homeSummary ?? featured.summary}
                  </span>
                  <span className="inline-flex items-center gap-2 font-bold">
                    {featured.homeCta ?? featured.title}
                    <ArrowIcon />
                  </span>
                </span>
              </MotionLink>
          ) : null}
          {listed.length > 0 ? (
            <motion.div
              className={featured ? "min-w-0 flex-[1.4] basis-[520px] border-t border-line" : "w-full border-t border-line"}
              variants={listStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {listed.map((service, index) => {
                const linked = serviceHasDetail(service);
                const row = (
                  <>
                    <span className="w-9 font-serif text-[15px] font-semibold text-subtle">{pad(index)}</span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-[19px] font-bold">{service.homeTitle ?? service.title}</span>
                      <span className="text-[15px] text-[#555a7a]">{service.homeSummary ?? service.summary}</span>
                    </span>
                    {linked ? (
                      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <ArrowIcon className="size-[18px] transition-transform duration-300 group-hover:translate-x-[5px]" />
                      </span>
                    ) : null}
                  </>
                );
                const className = "flex items-center gap-5 rounded-xl border-b border-line px-3 py-[22px] text-foreground";
                return (
                  <motion.div key={service.slug} variants={listItem}>
                    {linked ? (
                      <Link href={serviceHref(clinic.slug, service.slug)} className={`group ${className}`}>
                        {row}
                      </Link>
                    ) : (
                      <div className={className}>{row}</div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
