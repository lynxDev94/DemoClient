"use client";

import { PawPrint } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Clinic } from "@/clinics/types";
import { PhoneButton } from "@/components/site/phone-button";
import { SectionHead } from "@/components/motion/reveal";
import { telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { pawLeft, pawRight, spring } from "@/lib/motion";

function Paw({ className, motionProps }: { className?: string; motionProps: typeof pawLeft }) {
  const reduce = useReducedMotion();
  const icon = <PawPrint className="size-14 text-primary-foreground/25 md:size-20" aria-hidden="true" />;
  if (reduce) return <span className={className}>{icon}</span>;
  return (
    <motion.span className={className} {...motionProps}>
      {icon}
    </motion.span>
  );
}

export function CtaBanner({ clinic }: { clinic: Clinic }) {
  const reduce = useReducedMotion();
  const body = (
    <div className="relative overflow-hidden rounded-[32px] bg-brand px-6 py-16 text-primary-foreground md:px-16 md:py-20">
      <svg
        aria-hidden="true"
        viewBox="0 0 600 220"
        className="pointer-events-none absolute -right-10 -bottom-16 h-56 w-[36rem] text-primary-foreground/15"
        fill="none"
      >
        <path d="M10 180 C 120 40, 220 200, 340 90 S 520 20, 590 120" stroke="currentColor" strokeWidth="1.5" />
        <path d="M40 200 C 160 80, 250 210, 390 110" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <Paw className="absolute top-8 left-8 hidden sm:block" motionProps={pawLeft} />
      <Paw className="absolute right-8 bottom-8 hidden sm:block" motionProps={pawRight} />
      <SectionHead origin="center center" className="relative mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary-foreground/70 uppercase">
          {labels.cta.eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">{labels.cta.title}</h2>
        <p className="mt-5 text-lg leading-relaxed text-primary-foreground/80">
          {clinic.copy?.ctaText ?? labels.cta.text}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PhoneButton phone={clinic.phone} />
          <a
            href={telHref(clinic.phone)}
            className="text-sm font-medium text-primary-foreground/85 transition-colors duration-200 hover:text-primary-foreground"
          >
            {clinic.phone}
          </a>
        </div>
      </SectionHead>
    </div>
  );

  return (
    <section className="px-5 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        {reduce ? (
          body
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={spring}
          >
            {body}
          </motion.div>
        )}
      </div>
    </section>
  );
}
