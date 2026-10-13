"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { ArrowIcon, PhoneIcon } from "@/components/site/marks";
import { PillLink } from "@/components/site/pill";
import { serviceHasDetail, serviceHref, telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { hoverMove, listItem, listStagger } from "@/lib/motion";

const MotionLink = motion.create(Link);

export function Symptoms({ clinic }: { clinic: Clinic }) {
  const items = clinic.symptoms ?? [];
  const reduce = useReducedMotion();
  if (items.length === 0) return null;
  const services = new Map(clinic.services.map((service) => [service.slug, service]));

  return (
    <section className="bg-white">
      <Container className="flex flex-wrap gap-14 py-24">
        <div className="flex min-w-0 flex-1 basis-[340px] flex-col gap-[18px]">
          <span className="text-[13.5px] font-bold tracking-[0.08em] text-accent uppercase">
            {labels.home.symptomsEyebrow}
          </span>
          <h2 className="font-serif text-[clamp(32px,3.4vw,46px)] leading-[1.08] font-bold text-brand">
            {clinic.copy?.symptomsTitle ?? labels.home.symptomsTitle}
          </h2>
          <p className="text-[17px] leading-relaxed text-[#3d4163]">
            {clinic.copy?.symptomsText ?? labels.home.symptomsText}
          </p>
          <PillLink href={telHref(clinic.phone)} className="self-start">
            <PhoneIcon />
            {labels.home.symptomsCta}
          </PillLink>
        </div>
        <motion.div
          className="grid min-w-0 flex-[1.5] basis-[520px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4"
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((item) => {
            const service = services.get(item.service);
            if (!service) return null;
            const linked = serviceHasDetail(service);
            const cardClass = "flex h-full flex-col gap-3.5 rounded-[20px] bg-background p-[26px] text-foreground";
            const body = (
              <>
                <span className="text-lg leading-snug font-bold">{item.text}</span>
                <span className="inline-flex items-center gap-2 text-[14.5px] font-bold text-accent">
                  {service.title}
                  {linked ? <ArrowIcon className="size-4" /> : null}
                </span>
              </>
            );
            return linked ? (
              <MotionLink
                key={item.text}
                href={serviceHref(clinic.slug, item.service)}
                variants={listItem}
                whileHover={reduce ? undefined : { y: -6, boxShadow: "0 18px 40px rgba(20,22,58,.12)" }}
                transition={hoverMove}
                className={cardClass}
              >
                {body}
              </MotionLink>
            ) : (
              <motion.div key={item.text} variants={listItem} className={cardClass}>
                {body}
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
