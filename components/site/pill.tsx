"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { hoverMove } from "@/lib/motion";
import { cn } from "@/lib/utils";

const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-6 text-base font-bold text-white transition-colors hover:bg-[#9f3531] hover:text-white";

const ghostClass =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border-[1.5px] border-[#c9cce3] px-[22px] text-base font-bold text-brand hover:border-brand hover:text-brand";

export function PillLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const reduce = useReducedMotion();
  const classNames = cn(buttonClass, className);
  const motionProps = {
    className: classNames,
    whileHover: reduce ? undefined : { y: -2 },
    transition: hoverMove,
  };
  if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <motion.a href={href} {...motionProps}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.div whileHover={reduce ? undefined : { y: -2 }} transition={hoverMove} className="inline-flex">
      <Link href={href} className={classNames}>
        {children}
      </Link>
    </motion.div>
  );
}

export function GhostLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const reduce = useReducedMotion();
  const classNames = cn(ghostClass, className);
  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={classNames} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <motion.div whileHover={reduce ? undefined : { y: -2 }} transition={hoverMove} className="inline-flex">
      <Link href={href} className={classNames}>
        {children}
      </Link>
    </motion.div>
  );
}
