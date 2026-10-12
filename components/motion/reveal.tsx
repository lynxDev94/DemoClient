"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  cardItem,
  cardStagger,
  fadeUp,
  fromLeft,
  fromRight,
  heroImage,
  heroItem,
  sectionHead,
  spring,
} from "@/lib/motion";

type BoxProps = {
  children: ReactNode;
  className?: string;
};

export function FadeUp({ children, className, delay = 0 }: BoxProps & { delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={fadeUp.initial}
      whileInView={fadeUp.whileInView}
      viewport={fadeUp.viewport}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  children,
  className,
  origin = "left center",
}: BoxProps & { origin?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={{ transformOrigin: origin }}
      initial={sectionHead.initial}
      whileInView={sectionHead.whileInView}
      viewport={sectionHead.viewport}
      transition={sectionHead.transition}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className }: BoxProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardStagger}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: BoxProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={cardItem}>
      {children}
    </motion.div>
  );
}

export function HeroBlock({
  children,
  className,
  delay,
}: BoxProps & { delay: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const motionProps = heroItem(delay);
  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}

export function HeroPhoto({ children, className }: BoxProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} {...heroImage}>
      {children}
    </motion.div>
  );
}

export function SlideIn({
  children,
  className,
  from,
}: BoxProps & { from: "left" | "right" }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const motionProps = from === "left" ? fromLeft : fromRight;
  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}
