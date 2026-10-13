"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function CountUp({ value, active }: { value: string; active: boolean }) {
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)([\s\S]*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const [shown, setShown] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current || target === null || reduce) return;
    started.current = true;
    setShown(`0${suffix}`);
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / 1400);
      const eased = 1 - (1 - progress) ** 3;
      setShown(`${Math.round(target * eased)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, reduce, suffix, target, value]);

  return <>{shown}</>;
}
