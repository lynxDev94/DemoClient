"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { GhostLink } from "@/components/site/pill";
import { googleReviewUrl, reviewsToShow } from "@/lib/format";
import { labels } from "@/lib/labels";
import { hoverMove, listItem, listStagger } from "@/lib/motion";

const softMax = 280;

export function ReviewsSection({ clinic }: { clinic: Clinic }) {
  const reduce = useReducedMotion();
  const reviews = reviewsToShow(clinic.reviews);
  if (reviews.length === 0) return null;
  const reviewUrl = clinic.googlePlaceId ? googleReviewUrl(clinic.googlePlaceId) : undefined;

  return (
    <section className="bg-white">
      <Container className="flex flex-col gap-10 py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-3.5">
            <span className="text-[13.5px] font-bold tracking-[0.08em] text-accent uppercase">
              {labels.home.reviewsEyebrow}
            </span>
            <h2 className="font-serif text-[clamp(32px,3.4vw,46px)] leading-[1.08] font-bold text-brand">
              {labels.home.reviewsTitle}
            </h2>
          </div>
          {reviewUrl ? (
            <GhostLink href={reviewUrl} external>
              {labels.home.reviewOnGoogle}
            </GhostLink>
          ) : null}
        </div>
        <motion.div
          className="grid items-stretch grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5"
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {reviews.map((review) => {
            const text = review.text.replace(/^„|“$/g, "");
            const long = text.length > softMax;
            return (
              <motion.figure
                key={review.author + review.text}
                variants={listItem}
                whileHover={reduce ? undefined : { y: -6, boxShadow: "0 18px 40px rgba(20,22,58,.12)" }}
                transition={hoverMove}
                className="m-0 flex h-full flex-col justify-between gap-6 rounded-[22px] border border-[#e3e5f0] bg-[#fbfbfe] p-7"
              >
                <div className="flex flex-col gap-3.5">
                  <span role="img" aria-label={`${review.rating} iš 5`} className="text-lg tracking-[2px] text-[#e0a630]">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(Math.max(0, 5 - review.rating))}
                  </span>
                  <div className="relative">
                    <blockquote className={`text-[17px] leading-relaxed text-foreground ${long ? "line-clamp-6" : ""}`}>
                      „{text}“
                    </blockquote>
                    {long ? (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#fbfbfe] to-transparent"
                      />
                    ) : null}
                  </div>
                </div>
                <figcaption className="font-bold text-[#3d4163]">{review.author}</figcaption>
              </motion.figure>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
