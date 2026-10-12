"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { Photo } from "@/components/site/photo";
import { clinicPath, paragraphs } from "@/lib/format";
import { labels } from "@/lib/labels";
import { fromLeftFar, fromRightFar } from "@/lib/motion";

export function AboutSplit({ clinic }: { clinic: Clinic }) {
  const reduce = useReducedMotion();
  const copy = paragraphs(clinic.about.text);
  const background = clinic.about.background;
  const primary = background ? undefined : (clinic.about.photos[1] ?? clinic.about.photos[0]);
  const secondary = background ? undefined : clinic.about.photos[2];
  if (!primary && !background && copy.length === 0) return null;

  const story = (
    <div>
      <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
        {labels.home.aboutEyebrow}
      </p>
      <h2 className="mt-4 font-serif text-4xl tracking-tight text-brand md:text-5xl">{clinic.name}</h2>
      {clinic.about.foundedYear ? (
        <p className="mt-4 text-sm font-medium text-brand">
          {labels.since} {clinic.about.foundedYear}
        </p>
      ) : null}
      <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
        {copy.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link
        href={clinicPath(clinic.slug, "/apie")}
        className="mt-8 inline-flex text-sm font-medium text-accent transition-colors duration-200 hover:text-brand"
      >
        {labels.home.aboutLink}
      </Link>
    </div>
  );

  if (background) {
    const image = (
      <div className="relative min-h-72 lg:min-h-[560px]">
        <Photo
          src={background}
          alt=""
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-[center_45%]"
        />
      </div>
    );
    const copyCard = (
      <div className="flex h-full min-w-0 items-center bg-card p-7 md:p-10 lg:p-14">
        <div className="min-w-0">{story}</div>
      </div>
    );

    return (
      <section className="overflow-x-clip py-20 md:py-28">
        <Container>
          {reduce ? (
            <div className="grid grid-cols-1 overflow-hidden rounded-[32px] border border-border/80 bg-secondary lg:grid-cols-2">
              {image}
              {copyCard}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 overflow-hidden rounded-[32px] border border-border/80 bg-secondary lg:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div variants={fromLeftFar}>{image}</motion.div>
              <motion.div className="h-full" variants={fromRightFar}>
                {copyCard}
              </motion.div>
            </motion.div>
          )}
        </Container>
      </section>
    );
  }

  const media = primary ? (
    <div className="relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-secondary">
        <Photo src={primary} alt={clinic.name} sizes="(min-width: 1024px) 40vw, 100vw" />
      </div>
      {secondary ? (
        <div className="absolute right-6 bottom-6 hidden aspect-square w-36 overflow-hidden rounded-[24px] border-4 border-background shadow-lg sm:block md:w-44">
          <Photo src={secondary} alt="" sizes="180px" />
        </div>
      ) : null}
    </div>
  ) : null;

  return (
    <section className="overflow-x-clip py-20 md:py-28">
      <Container>
        {reduce ? (
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {media}
            {story}
          </div>
        ) : (
          <motion.div
            className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div variants={fromLeftFar}>{media}</motion.div>
            <motion.div variants={fromRightFar}>{story}</motion.div>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
