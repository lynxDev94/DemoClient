import { Star } from "lucide-react";
import type { Clinic } from "@/clinics/types";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { decimalLt, reviewsWord } from "@/lib/format";
import { labels } from "@/lib/labels";

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex gap-1" aria-label={`${labels.a11y.rating} ${rating} / 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={index < filled ? "size-4 fill-accent text-accent" : "size-4 text-border"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function ReviewsSection({ clinic }: { clinic: Clinic }) {
  if (clinic.reviews.length === 0 && !clinic.googleRating) return null;

  const summary = clinic.googleRating
    ? `${decimalLt(clinic.googleRating.score)} · ${clinic.googleRating.count} ${reviewsWord(clinic.googleRating.count)}`
    : undefined;

  return (
    <section className="bg-secondary/70 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow={labels.home.reviewsEyebrow}
          title={labels.home.reviewsTitle}
          text={summary}
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
          {clinic.reviews.map((review) => (
            <StaggerItem key={`${review.author}-${review.text}`} className="h-full">
              <article className="flex h-full flex-col rounded-[28px] border border-border/80 bg-card p-7">
                <Stars rating={review.rating} />
                <p className="mt-5 flex-1 font-serif text-xl leading-snug text-brand">“{review.text}”</p>
                <p className="mt-6 text-sm text-muted-foreground">{review.author}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
