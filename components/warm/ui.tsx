"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { hoverMove, peachRing } from "@/lib/motion";
import { cn } from "@/lib/utils";

const base =
  "group/btn inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full px-7 text-base font-extrabold transition-colors";

const variants = {
  primary: "bg-brand text-white hover:bg-[var(--brand-deep)] hover:text-white",
  accent: "bg-accent text-accent-foreground hover:bg-[color-mix(in_srgb,var(--accent)_85%,black)]",
  line: "border-[1.5px] border-[var(--warm-edge)] bg-white text-foreground hover:border-brand hover:text-brand",
} as const;

/** Pill button link. Lifts on hover. */
export function WarmButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const classes = cn(base, variants[variant], className);
  const lift = reduce ? undefined : { y: -3, boxShadow: "0 14px 28px rgba(30,26,20,0.2)" };
  const external = href.startsWith("http");
  if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={lift}
        transition={hoverMove}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.div className="inline-flex rounded-full" whileHover={lift} transition={hoverMove}>
      <Link href={href} className={classes}>
        {children}
      </Link>
    </motion.div>
  );
}

export function WarmEyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        "text-[13.5px] font-extrabold tracking-[0.12em] uppercase",
        light ? "text-accent" : "text-[var(--accent-ink)]",
      )}
    >
      {children}
    </span>
  );
}

export function PawIcon({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill={color} className={className}>
      <ellipse cx="12" cy="16" rx="5" ry="4.2" />
      <circle cx="5.5" cy="10" r="2.2" />
      <circle cx="9.5" cy="6.2" r="2.2" />
      <circle cx="14.5" cy="6.2" r="2.2" />
      <circle cx="18.5" cy="10" r="2.2" />
    </svg>
  );
}

/** Peach circle with a pulsing ring, used inside call buttons. */
export function RingDot({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const classes = cn("grid place-items-center rounded-full bg-accent text-accent-foreground", className);
  if (reduce) return <span className={classes}>{children}</span>;
  return (
    <motion.span className={classes} {...peachRing}>
      {children}
    </motion.span>
  );
}
