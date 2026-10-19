"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { PawIcon } from "@/components/warm/ui";
import { blobPhoto, maskItem, maskStagger, pawStep, polaroidSway, starItem, starRow } from "@/lib/motion";

/**
 * Headline whose words slide up out of a mask. `highlight` is a word index painted in the brand colour.
 * `as` lets the page title reuse it as h1.
 */
export function MaskHeading({
  text,
  highlight,
  className,
}: {
  text: string;
  highlight?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);
  const paint = (index: number) => (index === highlight ? "text-brand" : undefined);
  if (reduce) {
    return (
      <h1 className={className}>
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className={paint(index)}>
            {word}
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </h1>
    );
  }
  return (
    <motion.h1 className={className} variants={maskStagger} initial="hidden" animate="show" aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-top">
          <motion.span variants={maskItem} className={`inline-block ${paint(index) ?? ""}`}>
            {word}
            {index < words.length - 1 ? " " : null}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

/** Hero photo with a morphing outline; drifts slower than the page (0→70px over 900px). */
export function BlobFrame({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 70]);
  if (reduce) {
    return (
      <div className={className} style={{ borderRadius: "58% 42% 46% 54% / 48% 56% 44% 52%" }}>
        {children}
      </div>
    );
  }
  return (
    <motion.div style={{ y }}>
      <motion.div className={className} {...blobPhoto}>
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Polaroid({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={{ rotate: "-6deg" }}>{children}</div>;
  return (
    <motion.div className={className} {...polaroidSway}>
      {children}
    </motion.div>
  );
}

/** Four paw prints that appear one after another. Decorative. */
export function PawTrail({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const colors = ["var(--accent)", "var(--accent)", "color-mix(in srgb, var(--brand) 35%, white)", "color-mix(in srgb, var(--brand) 35%, white)"];
  return (
    <div aria-hidden="true" className={className}>
      {colors.map((color, index) => (
        <motion.span
          key={index}
          className="block"
          style={{ marginLeft: index % 2 === 1 ? 26 : 0 }}
          {...(reduce ? {} : pawStep(index))}
        >
          <PawIcon className="size-[26px]" color={color} />
        </motion.span>
      ))}
    </div>
  );
}

/** Five stars that pop in when the band scrolls into view. */
export function StarPop({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const star = (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[30px] fill-accent">
      <path d="M12 2l3 6.6 7 .7-5.3 4.8 1.6 7L12 17.5 5.7 21l1.6-7L2 9.3l7-.7z" />
    </svg>
  );
  if (reduce) {
    return (
      <div className={className}>
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>
    );
  }
  return (
    <motion.div className={className} variants={starRow} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
      {Array.from({ length: 5 }, (_, index) => (
        <motion.span key={index} variants={starItem} className="inline-block">
          {star}
        </motion.span>
      ))}
    </motion.div>
  );
}
