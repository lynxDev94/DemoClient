"use client";

import type { Clinic } from "@/clinics/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { PhoneButton } from "@/components/site/phone-button";
import { labels } from "@/lib/labels";

export function PriceList({ clinic }: { clinic: Clinic }) {
  if (clinic.prices.length === 0) {
    if (clinic.pricesNote) return null;
    return (
      <div className="rounded-[28px] border border-border bg-card p-8">
        <p className="text-lg text-muted-foreground">{labels.pages.pricesEmpty}</p>
        <PhoneButton phone={clinic.phone} className="mt-6" />
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible defaultValue="0" className="gap-4">
      <Stagger className="flex flex-col gap-4">
        {clinic.prices.map((group, index) => (
          <StaggerItem key={group.category}>
            <AccordionItem
              value={String(index)}
              className="rounded-[28px] border border-border/80 bg-card px-6 shadow-[0_24px_50px_-40px_rgba(30,58,50,0.5)] data-[state=open]:bg-card md:px-8"
            >
              <AccordionTrigger className="py-6 font-serif text-2xl tracking-tight text-brand hover:no-underline">
                {group.category}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <ul>
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between gap-6 border-t border-border/80 py-4"
                    >
                      <span className="text-foreground/85">{item.name}</span>
                      <span className="shrink-0 font-medium text-brand tabular-nums">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </StaggerItem>
        ))}
      </Stagger>
    </Accordion>
  );
}
