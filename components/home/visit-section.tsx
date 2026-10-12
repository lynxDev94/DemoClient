"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { HoursList } from "@/components/site/hours-list";
import { PhoneButton } from "@/components/site/phone-button";
import { labels } from "@/lib/labels";
import { fromLeft, fromRight, spring } from "@/lib/motion";

export function VisitSection({ clinic }: { clinic: Clinic }) {
  const reduce = useReducedMotion();

  const copy = (
    <div>
      <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
        {labels.home.visitEyebrow}
      </p>
      <h2 className="mt-4 font-serif text-4xl tracking-tight text-brand md:text-5xl">
        {clinic.copy?.visitTitle ?? labels.home.visitTitle}
      </h2>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
        {clinic.copy?.visitText ?? labels.home.visitText}
      </p>
      <ol className="mt-10 space-y-6">
        {(clinic.copy?.steps ?? labels.home.steps).map((step, index) => (
          <li key={step.title} className="grid grid-cols-[auto_1fr] gap-4">
            <span className="font-serif text-2xl text-accent">0{index + 1}</span>
            <span>
              <span className="block font-medium text-brand">{step.title}</span>
              <span className="mt-1 block leading-relaxed text-muted-foreground">{step.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );

  const card = (
    <div className="rounded-[32px] border border-border/80 bg-card p-7 shadow-[0_30px_70px_-40px_rgba(30,58,50,0.55)] md:p-9">
      <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
        {labels.pages.phone}
      </p>
      <p className="mt-3 font-serif text-4xl tracking-tight text-brand">{clinic.phone}</p>
      {clinic.email ? <p className="mt-2 text-muted-foreground">{clinic.email}</p> : null}
      {clinic.hours.length > 0 ? <HoursList hours={clinic.hours} className="mt-6" /> : null}
      <PhoneButton phone={clinic.phone} className="mt-8 w-full" />
    </div>
  );

  if (reduce) {
    return (
      <section className="pb-20 md:pb-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {copy}
          {card}
        </Container>
      </section>
    );
  }

  return (
    <section className="pb-20 md:pb-28" style={{ perspective: 1200 }}>
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div {...fromLeft}>{copy}</motion.div>
        <motion.div
          initial={{ opacity: 0, x: 80, rotateY: 10 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={fromRight.viewport}
          transition={spring}
          style={{ transformStyle: "preserve-3d" }}
        >
          {card}
        </motion.div>
      </Container>
    </section>
  );
}
