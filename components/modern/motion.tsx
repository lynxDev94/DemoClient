"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { clipReveal, floatCard, helixLoop, pulseRing, wordItem, wordStagger } from "@/lib/motion";

type BoxProps = { children: ReactNode; className?: string };

/** Headline that appears word by word. */
export function Words({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <h1 className={className}>{text}</h1>;
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <motion.h1 className={className} variants={wordStagger} initial="hidden" animate="show" aria-label={text}>
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} variants={wordItem} className="inline-block" aria-hidden="true">
          {word}
          {index < words.length - 1 ? " " : null}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/** Photo wipes up into its frame, then drifts slower than the page (parallax 0→70px over 900px). */
export function ClipPhoto({ children, className }: BoxProps) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 70]);
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div style={{ y }}>
      <motion.div className={className} {...clipReveal}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Card that pops in and then floats. */
export function Floating({ children, className, delay = 1 }: BoxProps & { delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} {...floatCard(delay)}>
      {children}
    </motion.div>
  );
}

export function PulseDot({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className} aria-hidden="true" />;
  return <motion.span className={className} aria-hidden="true" {...pulseRing} />;
}

/**
 * Endless horizontal row. Children are rendered twice; the copy is hidden from screen readers.
 * Pauses while hovered. With reduced motion it is a static, scrollable row.
 */
export function Marquee({
  children,
  speed,
  className,
  pauseOnHover = false,
}: BoxProps & { speed: number; pauseOnHover?: boolean }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [half, setHalf] = useState(0);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const measure = () => setHalf(node.scrollWidth / 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || paused || half === 0) return;
    let next = x.get() - (speed * delta) / 1000;
    if (next <= -half) next += half;
    x.set(next);
  });

  if (reduce) {
    return <div className={`flex overflow-x-auto ${className ?? ""}`}>{children}</div>;
  }

  return (
    <div
      className={`overflow-hidden ${className ?? ""}`}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      <motion.div ref={track} style={{ x }} className="flex w-max">
        <div className="flex">{children}</div>
        <div className="flex" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/** Moving DNA strand, decorative. */
export function Helix({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const strand = (
    <>
      <path
        d="M0 100 C 30 20, 90 20, 120 100 S 210 180, 240 100 S 330 20, 360 100 S 450 180, 480 100 S 570 20, 600 100 S 690 180, 720 100 S 810 20, 840 100"
        fill="none"
        stroke="var(--accent-glow)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M0 100 C 30 180, 90 180, 120 100 S 210 20, 240 100 S 330 180, 360 100 S 450 20, 480 100 S 570 180, 600 100 S 690 20, 720 100 S 810 180, 840 100"
        fill="none"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g stroke="white" strokeOpacity="0.25" strokeWidth="3">
        {Array.from({ length: 14 }, (_, index) => (
          <path key={index} d={`M${30 + index * 60} 46v108`} />
        ))}
      </g>
    </>
  );
  if (reduce) {
    return (
      <svg aria-hidden="true" width="840" height="200" viewBox="0 0 840 200" className={className}>
        {strand}
      </svg>
    );
  }
  return (
    <motion.svg
      aria-hidden="true"
      width="840"
      height="200"
      viewBox="0 0 840 200"
      className={className}
      {...helixLoop}
    >
      {strand}
    </motion.svg>
  );
}
