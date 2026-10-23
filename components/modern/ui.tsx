"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Dna,
  FileBadge,
  FlaskConical,
  HeartPulse,
  Pill,
  ScanLine,
  Scissors,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { hoverMove } from "@/lib/motion";
import { cn } from "@/lib/utils";

const base =
  "group/btn inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl px-6 text-base font-bold transition-colors";

const variants = {
  primary: "bg-brand text-white hover:bg-[var(--brand-deep)] hover:text-white",
  accent: "bg-accent text-accent-foreground hover:bg-[var(--accent-glow)]",
  light: "border border-[#d5dee7] bg-white text-foreground hover:border-brand hover:text-brand",
} as const;

/** Button-styled link. Lifts on hover; an arrow child slides with `group-hover/btn`. */
export function ModernButton({
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
  const lift = reduce ? undefined : { y: -2, boxShadow: "0 10px 24px rgba(14,76,95,0.22)" };
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
    <motion.div className="inline-flex rounded-xl" whileHover={lift} transition={hoverMove}>
      <Link href={href} className={classes}>
        {children}
      </Link>
    </motion.div>
  );
}

export function ButtonArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px] transition-transform duration-300 group-hover/btn:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        "text-[13.5px] font-bold tracking-[0.1em] uppercase",
        light ? "text-[var(--accent-glow)]" : "text-[var(--accent-ink)]",
      )}
    >
      {children}
    </span>
  );
}

const iconRules: [RegExp, LucideIcon][] = [
  [/chirurg|operac/, Scissors],
  [/dnr|genet/, Dna],
  [/tomograf|echo|rentgen|diagnost/, ScanLine],
  [/tyrim|lab/, FlaskConical],
  [/sanar|displaz|kaul/, Activity],
  [/vaist|papild|pasar|higien/, Pill],
  [/mikro|pasai|pazym|dokument/, FileBadge],
  [/vakcin|skiep/, Syringe],
  [/reabil/, HeartPulse],
];

/** Icons are picked from the service slug; they are not part of the clinic config. */
export function ModernServiceIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = iconRules.find(([rule]) => rule.test(slug))?.[1] ?? Stethoscope;
  return <Icon className={className} aria-hidden="true" />;
}
