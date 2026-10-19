"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Clinic } from "@/clinics/types";
import { ClinicMap } from "@/components/site/clinic-map";
import { Container } from "@/components/site/container";
import { PhoneIcon } from "@/components/site/marks";
import { Photo } from "@/components/site/photo";
import { CountUp } from "@/components/motion/count-up";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ModernServiceIcon } from "@/components/modern/ui";
import { BlobFrame, MaskHeading, PawTrail, Polaroid, StarPop } from "@/components/warm/motion";
import { RingDot, WarmButton, WarmEyebrow } from "@/components/warm/ui";
import { clinicPath, decimalLt, googleReviewUrl, initials, telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { polaroidDrop, slideSwap } from "@/lib/motion";
import { asPhoto, photoFocus, photoOrStock, photoSrc, stockPhotos } from "@/lib/photos";
import { cn } from "@/lib/utils";

const star = "M12 2l3 6.6 7 .7-5.3 4.8 1.6 7L12 17.5 5.7 21l1.6-7L2 9.3l7-.7z";

function homeServices(clinic: Clinic) {
  const picked = clinic.services
    .filter((service) => service.showOnHome)
    .sort((a, b) => (a.homeOrder ?? 99) - (b.homeOrder ?? 99));
  return (picked.length > 0 ? picked : clinic.services).slice(0, 4);
}

export function WarmHero({ clinic }: { clinic: Clinic }) {
  const hero = photoOrStock(clinic.about.photos[0], stockPhotos.hero);
  const second = photoOrStock(clinic.about.photos[1] ?? clinic.about.background, stockPhotos.about);
  const words = clinic.tagline.split(/\s+/).filter(Boolean);
  const rating = clinic.googleRating && clinic.showRating !== false ? clinic.googleRating : null;
  const chips = clinic.heroPoints ?? [];
  return (
    <section className="overflow-hidden">
      <Container className="flex flex-wrap items-center gap-14 pt-[72px] pb-24">
        <div className="flex min-w-0 flex-[1.05] basis-[460px] flex-col gap-6">
          {rating ? (
            <FadeUp delay={0.3}>
              <a
                href="#atsiliepimai"
                className="inline-flex items-center gap-3 rounded-full border border-border bg-white py-[7px] pr-4 pl-[7px] text-[14.5px] font-bold text-muted-foreground"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-[5px] text-white">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 fill-accent">
                    <path d={star} />
                  </svg>
                  {decimalLt(rating.score)}
                </span>
                {rating.count} {labels.warm.reviewsCount}
              </a>
            </FadeUp>
          ) : null}
          <MaskHeading
            text={clinic.tagline}
            highlight={words.length - 1}
            className="font-serif text-[clamp(40px,5.8vw,80px)] leading-[1.02] font-bold text-foreground"
          />
          <FadeUp delay={0.45} className="flex flex-col gap-6">
            {clinic.lead ? (
              <p className="max-w-[540px] text-[19px] leading-relaxed text-muted-foreground">{clinic.lead}</p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <WarmButton href={telHref(clinic.phone)} className="pl-3">
                <RingDot className="size-[30px]">
                  <PhoneIcon className="size-[15px]" />
                </RingDot>
                {clinic.phone}
              </WarmButton>
              <WarmButton href={clinicPath(clinic.slug, "/paslaugos")} variant="line">
                {labels.nav[1].label}
              </WarmButton>
            </div>
            {chips.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {chips.map((chip, index) => (
                  <span
                    key={chip}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm font-extrabold",
                      index === 0 ? "bg-[var(--accent-soft)] text-[var(--accent-ink)]" : "bg-secondary text-brand",
                    )}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
          </FadeUp>
        </div>

        <div className="relative min-w-0 flex-1 basis-[400px] p-5">
          <BlobFrame className="relative aspect-square overflow-hidden bg-placeholder">
            <Photo src={photoSrc(hero)!} focus={photoFocus(hero)} alt={labels.photo.hero} priority sizes="(min-width: 1024px) 45vw, 100vw" />
          </BlobFrame>
          <Polaroid className="absolute right-0 bottom-0 w-[42%] rounded-[10px] bg-white p-2.5 pb-8 shadow-[0_22px_44px_rgba(43,27,46,0.18)]">
            <div className="relative aspect-square overflow-hidden rounded-md bg-[var(--accent-soft)]">
              <Photo src={photoSrc(second)!} focus={photoFocus(second)} alt="" sizes="220px" />
            </div>
          </Polaroid>
          <PawTrail className="absolute top-1.5 -left-1.5 flex -rotate-[18deg] flex-col gap-2.5" />
        </div>
      </Container>
    </section>
  );
}

export function WarmRatingBand({ clinic }: { clinic: Clinic }) {
  const [active, setActive] = useState(false);
  const rating = clinic.googleRating && clinic.showRating !== false ? clinic.googleRating : null;
  if (!rating && !clinic.ratingQuote) return null;
  return (
    <motion.section
      className="bg-brand text-white"
      onViewportEnter={() => setActive(true)}
      viewport={{ once: true, amount: 0.4 }}
    >
      <Container className="flex flex-wrap items-center justify-between gap-10 py-[72px]">
        {rating ? (
          <div className="flex flex-wrap items-center gap-7">
            <span className="font-serif text-[clamp(80px,9vw,128px)] leading-[0.9] font-bold">{decimalLt(rating.score)}</span>
            <div className="flex flex-col gap-2.5">
              <StarPop className="flex gap-1.5" />
              <span className="text-[17px] text-[var(--on-brand)]">
                <strong className="text-white">
                  <CountUp value={String(rating.count)} active={active} />
                </strong>{" "}
                {labels.warm.reviewsCount}
              </span>
            </div>
          </div>
        ) : null}
        {clinic.ratingQuote ? (
          <FadeUp className="max-w-[560px] flex-1 basis-[420px]">
            <blockquote className="font-serif text-[clamp(24px,2.4vw,32px)] leading-tight font-semibold">
              „{clinic.ratingQuote.text}“
              <span className="mt-3 block font-sans text-[15px] font-bold text-accent">
                — {clinic.ratingQuote.author}, Google
              </span>
            </blockquote>
          </FadeUp>
        ) : null}
      </Container>
    </motion.section>
  );
}

export function WarmServices({ clinic }: { clinic: Clinic }) {
  const services = homeServices(clinic);
  if (services.length === 0) return null;
  return (
    <section>
      <Container className="flex flex-col gap-11 py-[104px]">
        <FadeUp className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <WarmEyebrow>{labels.home.servicesEyebrow}</WarmEyebrow>
            <h2 className="font-serif text-[clamp(34px,4vw,54px)] leading-[1.04] font-bold">
              {clinic.copy?.servicesTitle ?? labels.warm.servicesTitle}
            </h2>
          </div>
          <WarmButton href={clinicPath(clinic.slug, "/paslaugos")} variant="line">
            {labels.allServices}
          </WarmButton>
        </FadeUp>
        <Stagger className="grid gap-4 min-[640px]:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <StaggerItem key={service.slug} className="h-full">
              <Link
                href={`${clinicPath(clinic.slug, "/paslaugos")}#${service.slug}`}
                className="group flex h-full min-h-[280px] flex-col gap-4 rounded-[26px] border border-border bg-white bg-[linear-gradient(var(--brand),var(--brand))] bg-[length:100%_0%] bg-bottom bg-no-repeat p-[30px] transition-[background-size,color,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:bg-[length:100%_100%]"
              >
                <span className="flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-[18px] bg-secondary text-brand transition-all duration-500 group-hover:-rotate-[8deg] group-hover:bg-accent group-hover:text-accent-foreground">
                    <ModernServiceIcon slug={service.slug} className="size-[26px]" />
                  </span>
                  <span className="font-serif text-lg font-bold text-[#b49ab9] transition-colors group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="mt-10 font-serif text-2xl font-bold transition-colors group-hover:text-white">
                  {service.homeTitle ?? service.title}
                </span>
                <span className="leading-relaxed text-muted-foreground transition-colors group-hover:text-[var(--on-brand)]">
                  {service.homeSummary ?? service.summary}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

export function WarmWhy({ clinic }: { clinic: Clinic }) {
  const cards = clinic.whyUs ?? [];
  if (cards.length === 0) return null;
  return (
    <section id="kodel" className="bg-white">
      <Container className="flex flex-col gap-11 py-[104px]">
        <FadeUp className="flex max-w-[700px] flex-col gap-3.5">
          <WarmEyebrow>{labels.warm.whyEyebrow}</WarmEyebrow>
          <h2 className="font-serif text-[clamp(34px,4vw,54px)] leading-[1.04] font-bold">{labels.warm.whyTitle}</h2>
        </FadeUp>
        <Stagger className="grid gap-[18px] min-[900px]:grid-cols-3">
          {cards.map((card, index) => (
            <StaggerItem key={card.title} className="h-full">
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 22px 44px rgba(43,27,46,0.10)" }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "flex h-full flex-col gap-[18px] rounded-[26px] p-8",
                  index === 1 ? "bg-[var(--accent-soft)]" : "bg-background",
                )}
              >
                <span
                  className={cn(
                    "grid size-[54px] place-items-center rounded-full text-accent",
                    index === 1 ? "bg-foreground" : "bg-brand",
                  )}
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[26px] fill-current">
                    <path d="M7 7h4v6H7.5c0 2 1 3 3 3v2c-3.5 0-5.5-2-5.5-6V7zm9 0h4v6h-3.5c0 2 1 3 3 3v2c-3.5 0-5.5-2-5.5-6V7z" />
                  </svg>
                </span>
                <h3 className="font-serif text-2xl font-bold">{card.title}</h3>
                <p className="leading-relaxed text-muted-foreground italic">„{card.quote}“</p>
                <span className="mt-auto text-sm font-extrabold text-subtle">{card.author}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

/** Clinic's own photos as tilted polaroids. Hidden when the clinic has none. */
export function WarmGallery({ clinic }: { clinic: Clinic }) {
  const reduce = useReducedMotion();
  const photos = (clinic.gallery ?? []).map((item) => asPhoto(item)).filter((item) => item !== undefined).slice(0, 3);
  if (photos.length === 0) return null;
  return (
    <section className="overflow-hidden">
      <Container className="flex flex-col gap-12 pt-[104px]">
        <FadeUp className="flex max-w-[700px] flex-col gap-3.5">
          <WarmEyebrow>{labels.warm.galleryEyebrow}</WarmEyebrow>
          <h2 className="font-serif text-[clamp(34px,4vw,54px)] leading-[1.04] font-bold">{labels.warm.galleryTitle}</h2>
        </FadeUp>
        <div className="grid items-center gap-8 px-2 min-[720px]:grid-cols-3 min-[720px]:gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              {...(reduce ? {} : polaroidDrop(index))}
              className={cn(
                "rounded-[12px] bg-white p-3 pb-10 shadow-[0_24px_50px_rgba(43,27,46,0.14)]",
                index === 1 ? "min-[720px]:translate-y-8" : "",
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-placeholder min-[720px]:aspect-[4/5]">
                <Photo src={photo.src} focus={photo.focus} alt="" sizes="(min-width: 720px) 33vw, 100vw" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function WarmReviews({ clinic }: { clinic: Clinic }) {
  const reduce = useReducedMotion();
  const reviews = clinic.reviews.filter((review) => review.rating === 5);
  const [[index, direction], setPage] = useState<[number, number]>([0, 1]);
  if (reviews.length === 0) return null;
  const current = reviews[((index % reviews.length) + reviews.length) % reviews.length];
  const go = (step: number) => setPage(([value]) => [value + step, step]);
  const position = ((index % reviews.length) + reviews.length) % reviews.length;
  const arrow = (d: string) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
  const round =
    "grid size-[52px] place-items-center rounded-full border-[1.5px] border-[#d9cfdc] bg-white text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white";

  return (
    <section id="atsiliepimai">
      <Container className="flex flex-wrap items-center gap-12 py-[104px]">
        <FadeUp className="flex min-w-0 flex-1 basis-[320px] flex-col gap-[18px]">
          <WarmEyebrow>{labels.modern.reviews}</WarmEyebrow>
          <h2 className="font-serif text-[clamp(34px,4vw,52px)] leading-[1.04] font-bold">
            {labels.home.reviewsTitle}
          </h2>
          {reviews.length > 1 ? (
            <div className="flex gap-2.5 pt-1.5">
              <button type="button" className={round} aria-label={labels.warm.prev} onClick={() => go(-1)}>
                {arrow("M19 12H5M11 6l-6 6 6 6")}
              </button>
              <button type="button" className={round} aria-label={labels.warm.next} onClick={() => go(1)}>
                {arrow("M5 12h14M13 6l6 6-6 6")}
              </button>
            </div>
          ) : null}
          {clinic.googlePlaceId ? (
            <a
              href={googleReviewUrl(clinic.googlePlaceId)}
              target="_blank"
              rel="noreferrer"
              className="font-extrabold text-brand hover:text-[var(--accent-ink)]"
            >
              {labels.warm.leaveReview} →
            </a>
          ) : null}
        </FadeUp>
        <div className="flex min-w-0 flex-[1.6] basis-[520px] flex-col gap-[22px]">
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={position}
                {...(reduce ? {} : slideSwap(direction))}
                className="flex min-h-[300px] flex-col gap-[22px] rounded-[30px] border border-border bg-white p-8 shadow-[0_30px_60px_rgba(43,27,46,0.08)] min-[721px]:p-11"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-11 fill-accent">
                  <path d="M7 7h4v6H7.5c0 2 1 3 3 3v2c-3.5 0-5.5-2-5.5-6V7zm9 0h4v6h-3.5c0 2 1 3 3 3v2c-3.5 0-5.5-2-5.5-6V7z" />
                </svg>
                <blockquote className="font-serif text-[clamp(20px,2vw,26px)] leading-snug font-medium">
                  „{current.text}“
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 font-extrabold">
                  <span className="grid size-[42px] place-items-center rounded-full bg-secondary text-brand">
                    {initials(current.author).slice(0, 1)}
                  </span>
                  {current.author}
                  <span className="font-semibold text-subtle">· Google · ★★★★★</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          {reviews.length > 1 ? (
            <div className="flex flex-wrap items-center gap-2">
              {reviews.map((review, dot) => (
                <button
                  key={`${review.author}-${dot}`}
                  type="button"
                  aria-label={`${labels.warm.review} ${dot + 1}`}
                  aria-current={dot === position ? "true" : undefined}
                  onClick={() => setPage([dot, dot >= position ? 1 : -1])}
                  className={cn(
                    "h-3 rounded-full transition-all duration-300",
                    dot === position ? "w-[34px] bg-brand" : "w-3 bg-[#d9cfdc] hover:bg-[#b49ab9]",
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function WarmVisit({ clinic }: { clinic: Clinic }) {
  return (
    <section className="px-4 pb-[104px]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap overflow-hidden rounded-[36px] border border-border bg-white">
        <FadeUp className="flex min-w-0 flex-1 basis-[400px] flex-col gap-[22px] p-8 min-[721px]:p-[52px]">
          <WarmEyebrow>{labels.warm.visitEyebrow}</WarmEyebrow>
          <h2 className="font-serif text-[clamp(32px,3.6vw,46px)] leading-[1.06] font-bold">{clinic.address}</h2>
          {clinic.hours.length > 0 ? (
            <dl className="flex flex-col">
              {clinic.hours.map((slot) => (
                <div key={slot.days} className="flex justify-between gap-4 border-t border-border py-3.5 text-[17px] last:border-b">
                  <dt className="text-muted-foreground">{slot.days}</dt>
                  <dd className="font-bold">{slot.time}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {clinic.copy?.visitText ? <p className="leading-relaxed text-muted-foreground">{clinic.copy.visitText}</p> : null}
          <div className="flex flex-wrap gap-3">
            <WarmButton href={telHref(clinic.phone)}>{clinic.phone}</WarmButton>
            <WarmButton
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinic.address)}`}
              variant="line"
            >
              {labels.modern.route}
            </WarmButton>
          </div>
        </FadeUp>
        <div className="min-h-[440px] min-w-0 flex-[1.2] basis-[440px] [&>div]:h-full [&>div]:min-h-[440px] [&>div]:rounded-none [&>div]:border-0">
          {clinic.mapEmbedUrl ? (
            <ClinicMap src={clinic.mapEmbedUrl} title={clinic.address} />
          ) : (
            <div className="grid h-full place-items-center bg-placeholder">{labels.photo.map}</div>
          )}
        </div>
      </div>
    </section>
  );
}

export function WarmCta({ clinic }: { clinic: Clinic }) {
  return (
    <section className="bg-accent text-accent-foreground">
      <Container className="flex flex-wrap items-center justify-between gap-6 py-14">
        <h2 className="max-w-[640px] font-serif text-[clamp(28px,3.2vw,42px)] leading-tight font-bold">
          {clinic.copy?.ctaTitle ?? labels.warm.ctaTitle}
        </h2>
        <WarmButton href={telHref(clinic.phone)} className="min-h-[60px] px-8 text-lg">
          {clinic.phone}
        </WarmButton>
      </Container>
    </section>
  );
}

export function WarmHome({ clinic }: { clinic: Clinic }) {
  return (
    <>
      <WarmHero clinic={clinic} />
      <WarmRatingBand clinic={clinic} />
      <WarmServices clinic={clinic} />
      <WarmWhy clinic={clinic} />
      <WarmGallery clinic={clinic} />
      <WarmReviews clinic={clinic} />
      <WarmVisit clinic={clinic} />
      <WarmCta clinic={clinic} />
    </>
  );
}
