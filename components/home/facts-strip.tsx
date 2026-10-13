"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { CountUp } from "@/components/motion/count-up";

export function FactsStrip({ clinic }: { clinic: Clinic }) {
  const facts = clinic.facts ?? [];
  const [active, setActive] = useState(false);
  if (facts.length === 0) return null;

  return (
    <motion.section
      className="bg-brand text-white"
      onViewportEnter={() => setActive(true)}
      viewport={{ once: true, amount: 0.4 }}
    >
      <Container className="grid grid-cols-1 py-2 min-[720px]:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1.5 py-7 pr-6">
            <span className="font-serif text-[40px] leading-none font-bold">
              {fact.countUp ? <CountUp value={fact.value} active={active} /> : fact.value}
            </span>
            <span className="text-[15px] text-[#cfd1ee]">{fact.label}</span>
          </div>
        ))}
      </Container>
    </motion.section>
  );
}
