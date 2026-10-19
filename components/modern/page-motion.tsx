"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhoneIcon } from "@/components/site/marks";
import { Words } from "@/components/modern/motion";
import { barGrow, phoneRing, pulseRing } from "@/lib/motion";

export function ModernPageTitle({ text }: { text: string }) {
  return (
    <Words
      text={text}
      className="max-w-[900px] font-serif text-[clamp(40px,5.2vw,70px)] leading-[1.05] font-extrabold text-foreground"
    />
  );
}

/** Accent bar on the left edge of a white service block. Grows down when it scrolls into view. */
export function GrowBar() {
  const reduce = useReducedMotion();
  const className = "absolute inset-y-0 left-0 w-[5px] origin-top bg-accent";
  if (reduce) return <span aria-hidden="true" className={className} />;
  return <motion.span aria-hidden="true" className={className} {...barGrow} />;
}

/** Phone badge on the contact card: pulsing ring, the handset wiggles now and then. */
export function RingingPhone() {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <span className="grid size-[52px] place-items-center rounded-full bg-accent text-accent-foreground">
        <PhoneIcon className="size-6" />
      </span>
    );
  }
  return (
    <motion.span
      className="grid size-[52px] place-items-center self-start rounded-full bg-accent text-accent-foreground"
      {...pulseRing}
    >
      <motion.span className="grid place-items-center" {...phoneRing}>
        <PhoneIcon className="size-6" />
      </motion.span>
    </motion.span>
  );
}
