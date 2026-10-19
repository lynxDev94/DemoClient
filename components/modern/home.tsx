"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";
import type { Clinic } from "@/clinics/types";
import { ClinicMap } from "@/components/site/clinic-map";
import { Container } from "@/components/site/container";
import { CheckIcon, ClockIcon, PhoneIcon } from "@/components/site/marks";
import { Photo } from "@/components/site/photo";
import { CountUp } from "@/components/motion/count-up";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ClipPhoto, Floating, Helix, Marquee, PulseDot, Words } from "@/components/modern/motion";
import { ButtonArrow, Eyebrow, ModernButton, ModernServiceIcon } from "@/components/modern/ui";
import { clinicPath, googleMapsUrl, googleReviewUrl, initials, telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { cardLift, hoverMove, marqueeSpeed } from "@/lib/motion";
import { asPhoto, photoFocus, photoOrStock, photoSrc, stockPhotos } from "@/lib/photos";
import { cn } from "@/lib/utils";

function homeServices(clinic: Clinic) {
  return clinic.services
    .filter((service) => service.showOnHome)
    .sort((a, b) => (a.homeOrder ?? 99) - (b.homeOrder ?? 99))
    .slice(0, 6);
}

export function ModernHero({ clinic }: { clinic: Clinic }) {
  const photo = photoOrStock(clinic.about.photos[0], stockPhotos.hero);
  const points = clinic.heroPoints ?? [];
  const hours = clinic.hours.filter((slot) => /\d/.test(slot.time));
  return (
    <section className="overflow-hidden bg-white">
      <Container className="flex flex-wrap items-center gap-14 pt-[72px] pb-[120px]">
        <div className="flex min-w-0 flex-[1.1] basis-[460px] flex-col gap-6">
          {clinic.heroEyebrow ? (
            <FadeUp delay={0.5}>
              <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent-soft)] py-2 pr-3.5 pl-2.5 text-sm font-bold text-[var(--accent-ink)]">
                <PulseDot className="size-[9px] rounded-full bg-accent" />
                {clinic.heroEyebrow}
              </span>
            </FadeUp>
          ) : null}
          <Words
            text={clinic.tagline}
            className="font-serif text-[clamp(38px,5.2vw,70px)] leading-[1.05] font-extrabold text-foreground"
          />
          <FadeUp delay={0.65} className="flex flex-col gap-6">
            {clinic.lead ? (
              <p className="max-w-[560px] text-[19px] leading-relaxed text-muted-foreground">{clinic.lead}</p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <ModernButton href={telHref(clinic.phone)}>
                <PhoneIcon />
                {labels.call} {clinic.phone}
              </ModernButton>
              <ModernButton href={clinicPath(clinic.slug, "/paslaugos")} variant="light">
                {labels.allServices}
                <ButtonArrow />
              </ModernButton>
            </div>
            {points.length > 0 ? (
              <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-[15px] font-semibold text-muted-foreground">
                {points.map((point) => (
                  <span key={point} className="inline-flex items-center gap-2">
                    <CheckIcon className="size-[18px] text-accent" />
                    {point}
                  </span>
                ))}
              </div>
            ) : null}
          </FadeUp>
        </div>

        <div className="relative min-w-0 flex-1 basis-[400px]">
          <ClipPhoto className="relative aspect-[5/6] overflow-hidden rounded-[28px] bg-placeholder">
            <Photo
              src={photoSrc(photo)!}
              focus={photoFocus(photo)}
              alt={labels.photo.hero}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </ClipPhoto>
          {hours.length > 0 ? (
            <Floating
              delay={1}
              className="absolute bottom-14 -left-4 flex items-center gap-3.5 rounded-2xl bg-white px-4.5 py-4 shadow-[0_20px_44px_rgba(15,34,51,0.16)] min-[900px]:-left-9"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-ink)]">
                <ClockIcon className="size-[22px]" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-subtle">{labels.modern.hoursCard}</span>
                <span className="font-serif text-base font-extrabold">
                  {hours.map((slot) => `${slot.days} ${slot.time}`).join(" · ")}
                </span>
              </span>
            </Floating>
          ) : null}
          {clinic.heroBadge ? (
            <Floating
              delay={1.2}
              className="absolute top-10 -right-2 rounded-2xl bg-brand px-4.5 py-4 font-serif text-[15px] font-extrabold text-white shadow-[0_20px_44px_rgba(14,76,95,0.3)] min-[900px]:-right-5"
            >
              {clinic.heroBadge}
            </Floating>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function ModernStats({ clinic }: { clinic: Clinic }) {
  const facts = clinic.facts ?? [];
  const [active, setActive] = useState(false);
  if (facts.length === 0) return null;
  return (
    <section className="relative z-10 -mt-16">
      <Container>
        <motion.div
          onViewportEnter={() => setActive(true)}
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-2 rounded-3xl bg-white shadow-[0_24px_60px_rgba(15,34,51,0.10)] lg:grid-cols-4"
        >
          {facts.map((fact, index) => (
            <div
              key={fact.label}
              className={cn(
                "flex flex-col gap-1.5 px-5 py-6 min-[640px]:px-8 min-[640px]:py-7",
                index % 2 === 1 && "border-l",
                index >= 2 && "border-t lg:border-t-0",
                index > 0 && "lg:border-l",
              )}
            >
              <span className="font-serif text-[clamp(30px,4vw,40px)] leading-none font-extrabold text-brand">
                {fact.countUp ? <CountUp value={fact.value} active={active} /> : fact.value}
              </span>
              <span className="text-[15px] text-subtle">{fact.label}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export function ModernTicker({ clinic }: { clinic: Clinic }) {
  const words = Array.from(new Set(homeServices(clinic).map((service) => service.homeTitle ?? service.title)));
  if (words.length < 3) return null;
  return (
    <section aria-label={labels.modern.servicesList} className="pt-[72px]">
      <Marquee speed={marqueeSpeed.ticker}>
        {words.map((word) => (
          <span key={word} className="flex items-center gap-10 pr-10">
            <span className="font-serif text-[30px] font-extrabold whitespace-nowrap text-brand/75">{word}</span>
            <span className="size-2.5 rounded-full bg-accent" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

export function ModernServicesGrid({ clinic }: { clinic: Clinic }) {
  const reduce = useReducedMotion();
  const services = homeServices(clinic);
  if (services.length === 0) return null;
  return (
    <section>
      <Container className="flex flex-col gap-12 pt-[72px] pb-[104px]">
        <FadeUp className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[680px] flex-col gap-3.5">
            <Eyebrow>{labels.home.servicesEyebrow}</Eyebrow>
            <h2 className="font-serif text-[clamp(32px,3.8vw,50px)] leading-[1.08] font-extrabold">
              {clinic.copy?.servicesTitle ?? labels.modern.servicesTitle}
            </h2>
          </div>
          <ModernButton href={clinicPath(clinic.slug, "/paslaugos")} variant="light">
            {labels.allServices}
            <ButtonArrow />
          </ModernButton>
        </FadeUp>
        <Stagger className="grid gap-5 min-[720px]:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              <motion.div className="h-full rounded-[20px]" whileHover={reduce ? undefined : cardLift} transition={hoverMove}>
                <Link
                  href={`${clinicPath(clinic.slug, "/paslaugos")}#${service.category}`}
                  className="group relative flex h-full flex-col gap-3.5 overflow-hidden rounded-[20px] border border-border bg-white p-[30px]"
                >
                  <span className="grid size-[54px] place-items-center rounded-[14px] bg-secondary text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <ModernServiceIcon slug={service.slug} className="size-[26px]" />
                  </span>
                  <span className="font-serif text-[21px] font-extrabold">{service.homeTitle ?? service.title}</span>
                  <span className="flex-1 leading-relaxed text-muted-foreground">
                    {service.homeSummary ?? service.summary}
                  </span>
                  <span className="text-[15px] font-bold text-subtle transition-colors group-hover:text-brand">
                    {labels.more} →
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                  />
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

export function ModernAbout({ clinic }: { clinic: Clinic }) {
  const photo = asPhoto(clinic.about.background)
    ? clinic.about.background
    : photoOrStock(clinic.about.photos[1] ?? clinic.about.pagePhoto, stockPhotos.about);
  const points = clinic.aboutPoints ?? [];
  const gallery = (clinic.gallery ?? []).filter((item) => asPhoto(item)).slice(0, 2);
  return (
    <section id="apie" className="bg-white">
      <Container className="flex flex-wrap items-center gap-16 py-[104px]">
        <div className="relative min-w-0 flex-1 basis-[400px]">
          <FadeUp className="relative aspect-square overflow-hidden rounded-[28px] bg-placeholder">
            <Photo src={photoSrc(photo)!} focus={photoFocus(photo)} alt={labels.photo.about} sizes="(min-width: 1024px) 45vw, 100vw" />
          </FadeUp>
          {gallery.map((item, index) => (
            <Floating
              key={photoSrc(item)}
              delay={0.4 + index * 0.25}
              className={cn(
                "absolute aspect-[4/5] w-[30%] overflow-hidden rounded-2xl border-4 border-white bg-placeholder shadow-[0_20px_44px_rgba(15,34,51,0.18)]",
                index === 0 ? "-right-3 -bottom-8 min-[900px]:-right-8" : "-top-8 -left-3 min-[900px]:-left-8",
              )}
            >
              <Photo src={photoSrc(item)!} focus={photoFocus(item)} alt="" sizes="200px" />
            </Floating>
          ))}
        </div>
        <div className="flex min-w-0 flex-[1.1] basis-[440px] flex-col gap-5">
          <FadeUp className="flex flex-col gap-5">
            <Eyebrow>{labels.home.aboutEyebrow}</Eyebrow>
            <h2 className="font-serif text-[clamp(32px,3.8vw,50px)] leading-[1.08] font-extrabold">
              {clinic.copy?.aboutTitle ?? labels.modern.aboutTitle}
            </h2>
            <p className="text-lg leading-[1.7] text-muted-foreground">{clinic.about.text.split(/\n\n+/)[0]}</p>
          </FadeUp>
          {points.length > 0 ? (
            <Stagger className="grid gap-3.5 min-[560px]:grid-cols-2">
              {points.map((point) => (
                <StaggerItem key={point}>
                  <div className="flex h-full items-start gap-3 rounded-2xl bg-background p-[18px] leading-normal">
                    <CheckIcon className="mt-0.5 size-[22px] shrink-0 text-accent" />
                    <span className="font-semibold">{point}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function ModernSpotlight({ clinic }: { clinic: Clinic }) {
  const spotlight = clinic.spotlight;
  if (!spotlight) return null;
  return (
    <section className="overflow-hidden bg-brand text-white">
      <Container className="flex flex-wrap items-center gap-14 py-[104px]">
        <FadeUp className="flex min-w-0 flex-[1.1] basis-[440px] flex-col gap-5">
          <Eyebrow light>{spotlight.eyebrow}</Eyebrow>
          <h2 className="font-serif text-[clamp(32px,4vw,54px)] leading-[1.06] font-extrabold text-white">
            {spotlight.title}
          </h2>
          <p className="max-w-[560px] text-lg leading-[1.7] text-[var(--on-brand)]">{spotlight.text}</p>
          <div>
            <ModernButton href={telHref(clinic.phone)} variant="accent">
              {labels.modern.spotlightCta}
              <ButtonArrow />
            </ModernButton>
          </div>
        </FadeUp>
        <FadeUp delay={0.1} className="flex min-w-0 flex-1 basis-[400px] flex-col gap-3.5">
          <div className="relative flex h-[240px] items-center overflow-hidden rounded-[28px] bg-[var(--brand-deep)]">
            <Helix className="shrink-0" />
          </div>
          {spotlight.cards && spotlight.cards.length > 0 ? (
            <div className="grid gap-3.5 min-[560px]:grid-cols-3">
              {spotlight.cards.map((card) => (
                <div key={card.title} className="flex flex-col gap-1.5 rounded-2xl bg-[var(--brand-deep)] p-5">
                  <span className="font-serif text-[17px] font-extrabold text-white">{card.title}</span>
                  <span className="text-sm leading-snug text-[var(--on-brand)]">{card.text}</span>
                </div>
              ))}
            </div>
          ) : null}
        </FadeUp>
      </Container>
    </section>
  );
}

export function ModernReviews({ clinic }: { clinic: Clinic }) {
  const reviews = clinic.reviews.filter((review) => review.rating === 5);
  if (reviews.length === 0) return null;
  return (
    <section id="atsiliepimai" className="overflow-hidden py-[104px]">
      <Container>
        <FadeUp className="flex flex-wrap items-end justify-between gap-6 pb-11">
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <Eyebrow>{labels.modern.reviews}</Eyebrow>
            <h2 className="font-serif text-[clamp(32px,3.8vw,50px)] leading-[1.08] font-extrabold">
              {labels.modern.reviewsTitle}
            </h2>
          </div>
          {clinic.googlePlaceId ? (
            <div className="flex flex-wrap gap-3">
              <ModernButton href={googleReviewUrl(clinic.googlePlaceId)}>{labels.home.reviewOnGoogle}</ModernButton>
              <ModernButton href={googleMapsUrl(clinic.googlePlaceId, clinic.name)} variant="light">
                {labels.modern.allReviews}
              </ModernButton>
            </div>
          ) : null}
        </FadeUp>
      </Container>
      <Marquee speed={marqueeSpeed.reviews} pauseOnHover>
        {reviews.map((review) => (
          <figure
            key={review.author}
            className="mr-5 flex w-[min(380px,82vw)] shrink-0 flex-col gap-3.5 rounded-[20px] border border-border bg-white p-7"
          >
            <span role="img" aria-label="5 / 5" className="flex gap-1 text-[#f2b01e]">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="size-[18px] fill-current" aria-hidden="true" />
              ))}
            </span>
            <blockquote className="text-[16.5px] leading-relaxed text-[#2a3d51]">„{review.text}“</blockquote>
            <figcaption className="mt-auto flex items-center gap-2.5 font-bold">
              <span className="grid size-9 place-items-center rounded-full bg-secondary text-sm text-brand">
                {initials(review.author).slice(0, 1)}
              </span>
              {review.author}
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}

export function ModernVisit({ clinic }: { clinic: Clinic }) {
  return (
    <section className="pb-[104px]">
      <Container className="flex flex-wrap items-stretch gap-5">
        <FadeUp className="flex min-w-0 flex-1 basis-[400px] flex-col gap-5 rounded-[28px] border border-border bg-white p-8 min-[721px]:p-12">
          <Eyebrow>{labels.modern.visitEyebrow}</Eyebrow>
          <h2 className="font-serif text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold">
            {clinic.copy?.ctaTitle ?? labels.modern.visitTitle}
          </h2>
          <a href={telHref(clinic.phone)} className="font-serif text-[clamp(30px,3.2vw,42px)] font-extrabold text-brand">
            {clinic.phone}
          </a>
          {clinic.hours.length > 0 ? (
            <dl className="flex flex-col">
              {clinic.hours.map((slot) => (
                <div key={slot.days} className="flex justify-between gap-4 border-t border-border py-3 last:border-b">
                  <dt className="text-muted-foreground">{slot.days}</dt>
                  <dd className="font-bold">{slot.time}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <ModernButton href={telHref(clinic.phone)}>{labels.call}</ModernButton>
            <ModernButton
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinic.address)}`}
              variant="light"
            >
              {labels.modern.route}
              <ButtonArrow />
            </ModernButton>
          </div>
        </FadeUp>
        <FadeUp delay={0.1} className="min-w-0 flex-[1.2] basis-[440px]">
          {clinic.mapEmbedUrl ? (
            <ClinicMap src={clinic.mapEmbedUrl} title={clinic.address} />
          ) : (
            <div className="grid h-full min-h-[420px] place-items-center rounded-[28px] bg-placeholder">{labels.photo.map}</div>
          )}
        </FadeUp>
      </Container>
    </section>
  );
}

export function ModernHome({ clinic }: { clinic: Clinic }) {
  return (
    <>
      <ModernHero clinic={clinic} />
      <ModernStats clinic={clinic} />
      <ModernTicker clinic={clinic} />
      <ModernServicesGrid clinic={clinic} />
      <ModernAbout clinic={clinic} />
      <ModernSpotlight clinic={clinic} />
      <ModernReviews clinic={clinic} />
      <ModernVisit clinic={clinic} />
    </>
  );
}
