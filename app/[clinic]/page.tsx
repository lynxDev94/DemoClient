import type { Metadata } from "next";
import { getClinic } from "@/clinics";
import { AboutSplit } from "@/components/home/about-split";
import { FactsStrip } from "@/components/home/facts-strip";
import { Hero } from "@/components/home/hero";
import { ReviewsSection } from "@/components/home/reviews-section";
import { ServicesIndex } from "@/components/home/services-index";
import { Symptoms } from "@/components/home/symptoms";
import { CtaBanner } from "@/components/site/cta-banner";
import { labels } from "@/lib/labels";
import { requireClinic } from "@/lib/load";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ clinic: string }>;
}): Promise<Metadata> {
  const clinic = await getClinic((await params).clinic);
  if (!clinic) return { title: labels.notFound.title };
  return { title: clinic.name, description: clinic.tagline };
}

export default async function ClinicHome({
  params,
}: {
  params: Promise<{ clinic: string }>;
}) {
  const clinic = await requireClinic((await params).clinic);
  return (
    <>
      <Hero clinic={clinic} />
      <FactsStrip clinic={clinic} />
      <ServicesIndex clinic={clinic} />
      <Symptoms clinic={clinic} />
      <AboutSplit clinic={clinic} />
      <ReviewsSection clinic={clinic} />
      <CtaBanner clinic={clinic} />
    </>
  );
}
