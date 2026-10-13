"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { ArrowIcon, CheckIcon, PhoneIcon } from "@/components/site/marks";
import { PhotoFrame } from "@/components/site/photo-frame";
import { GhostLink, PillLink } from "@/components/site/pill";
import { clinicPath, telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { photoOrStock, stockPhotos } from "@/lib/photos";
import { heroIn, heroInItem, heroPhotoIn } from "@/lib/motion";

export function Hero({ clinic }: { clinic: Clinic }) {
  const reduce = useReducedMotion();
  const [parallax, setParallax] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 70]);
  const photo = photoOrStock(clinic.about.photos[0], stockPhotos.hero);
  const points = clinic.heroPoints ?? [];

  useEffect(() => {
    setParallax(reduce === false);
  }, [reduce]);

  return (
    <section className="bg-white">
      <Container className="flex flex-wrap items-stretch gap-12 py-20 pt-[72px]">
        <motion.div
          className="flex min-w-0 flex-1 basis-[460px] flex-col justify-center gap-7"
          variants={heroIn}
          initial="hidden"
          animate="show"
        >
          {clinic.heroEyebrow ? (
            <motion.span
              variants={heroInItem}
              className="inline-flex w-fit items-center rounded-full bg-secondary px-3.5 py-2 text-[13.5px] font-bold tracking-[0.04em] text-brand uppercase"
            >
              {clinic.heroEyebrow}
            </motion.span>
          ) : null}
          <motion.h1
            variants={heroInItem}
            className="font-serif text-[clamp(40px,5.2vw,68px)] leading-[1.02] font-bold text-brand"
          >
            {clinic.tagline}
          </motion.h1>
          {clinic.lead ? (
            <motion.p variants={heroInItem} className="max-w-[560px] text-[19px] leading-relaxed text-[#3d4163]">
              {clinic.lead}
            </motion.p>
          ) : null}
          <motion.div variants={heroInItem} className="flex flex-wrap gap-3">
            <PillLink href={telHref(clinic.phone)}>
              <PhoneIcon />
              {clinic.phone}
            </PillLink>
            <GhostLink href={clinicPath(clinic.slug, "/paslaugos")}>
              {labels.allServices}
              <ArrowIcon />
            </GhostLink>
          </motion.div>
          {points.length > 0 ? (
            <motion.div
              variants={heroInItem}
              className="flex flex-wrap gap-x-7 gap-y-2.5 pt-2 text-[15px] font-semibold text-[#3d4163]"
            >
              {points.map((point) => (
                <span key={point} className="inline-flex items-center gap-2">
                  <CheckIcon className="size-[18px] text-accent" />
                  {point}
                </span>
              ))}
            </motion.div>
          ) : null}
        </motion.div>
        <div className="relative min-h-[520px] min-w-0 flex-1 basis-[420px]">
          <motion.div
            className="absolute inset-0"
            style={parallax ? { y } : undefined}
            initial={heroPhotoIn.initial}
            animate={heroPhotoIn.animate}
            transition={heroPhotoIn.transition}
          >
            <div className="absolute inset-x-0 top-0 right-0 bottom-10 left-10 overflow-hidden rounded-[28px] max-[720px]:left-0">
              <PhotoFrame
                photo={photo}
                alt={clinic.name}
                label={labels.photo.hero}
                className="absolute inset-0"
                sizes="(min-width: 1024px) 46vw, 100vw"
                priority
              />
            </div>
          </motion.div>
          {clinic.hours.length > 0 ? (
            <div className="absolute bottom-0 left-0 flex w-[290px] max-w-[80%] flex-col gap-3 rounded-[20px] bg-white px-6 py-[22px] shadow-[0_18px_40px_rgba(20,22,58,0.14)]">
              <span className="text-[13px] font-bold tracking-[0.05em] text-accent uppercase">
                {labels.pages.hours}
              </span>
              {clinic.hours.map((slot) => (
                <div key={slot.days} className="flex justify-between gap-3 text-[15.5px]">
                  <span className="text-[#555a7a]">{slot.days}</span>
                  <span className="font-bold">{slot.time}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
