"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HeroBlock, HeroPhoto } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import { PhoneButton } from "@/components/site/phone-button";
import { Photo } from "@/components/site/photo";
import type { Clinic } from "@/clinics/types";
import { clinicPath, clinicStats, paragraphs } from "@/lib/format";
import { labels } from "@/lib/labels";
import { cn } from "@/lib/utils";

export function Hero({ clinic }: { clinic: Clinic }) {
  const photo = clinic.about.photos[0];
  const intro = clinic.lead !== undefined ? clinic.lead : paragraphs(clinic.about.text)[0];
  const stats = clinicStats(clinic);
  const eyebrow = clinic.about.foundedYear
    ? `${labels.since} ${clinic.about.foundedYear}`
    : labels.clinicFallback;

  return (
    <section className="pt-12 pb-8 md:pt-16 md:pb-12">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <HeroBlock delay={0.3}>
              <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{eyebrow}</p>
              <h1 className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] tracking-tight text-brand md:text-6xl">
                {clinic.tagline}
              </h1>
            </HeroBlock>
            <HeroBlock delay={0.6} className="mt-6">
              {intro ? (
                <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{intro}</p>
              ) : null}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PhoneButton phone={clinic.phone} />
                <Link
                  href={clinicPath(clinic.slug, "/paslaugos")}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 rounded-full border-brand/15 bg-transparent px-6 text-brand shadow-none transition-colors duration-200 hover:bg-secondary hover:text-brand active:translate-y-0",
                  )}
                >
                  {labels.nav[1].label}
                </Link>
              </div>
            </HeroBlock>
          </div>
          {photo ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-secondary shadow-[0_30px_80px_-48px_rgba(30,58,50,0.7)]">
              <HeroPhoto className="absolute inset-0">
                <Photo src={photo} alt={clinic.name} priority sizes="(min-width: 1024px) 46vw, 100vw" />
              </HeroPhoto>
            </div>
          ) : null}
        </div>
        {stats.length > 0 ? (
          <HeroBlock delay={0.8} className="mt-12 md:mt-16">
            <dl className="grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-serif text-4xl tracking-tight text-brand">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </HeroBlock>
        ) : null}
      </Container>
    </section>
  );
}
