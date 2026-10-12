import type { Metadata } from "next";
import { getClinic } from "@/clinics";
import { AboutSplit } from "@/components/home/about-split";
import { Hero } from "@/components/home/hero";
import { ReviewsSection } from "@/components/home/reviews-section";
import { ServicesSection } from "@/components/home/services-section";
import { TeamSection } from "@/components/home/team-section";
import { VisitSection } from "@/components/home/visit-section";
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
      <ServicesSection clinic={clinic} />
      <AboutSplit clinic={clinic} />
      <VisitSection clinic={clinic} />
      <ReviewsSection clinic={clinic} />
      <TeamSection clinic={clinic} limit={4} />
      <CtaBanner clinic={clinic} />
    </>
  );
}
