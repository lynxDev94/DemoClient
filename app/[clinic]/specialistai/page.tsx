import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClinic } from "@/clinics";
import { TeamSection } from "@/components/home/team-section";
import { Container } from "@/components/site/container";
import { CtaBanner } from "@/components/site/cta-banner";
import { SectionHeading } from "@/components/site/section-heading";
import { labels } from "@/lib/labels";
import { requireClinic } from "@/lib/load";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ clinic: string }>;
}): Promise<Metadata> {
  const clinic = await getClinic((await params).clinic);
  if (!clinic) return { title: labels.notFound.title };
  return { title: `${labels.nav[3].label} · ${clinic.name}`, description: clinic.tagline };
}

export default async function SpecialistsPage({
  params,
}: {
  params: Promise<{ clinic: string }>;
}) {
  const clinic = await requireClinic((await params).clinic);
  if (clinic.showSpecialists === false) notFound();

  return (
    <>
      <section className="pt-16 md:pt-24">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={labels.nav[3].label}
            title={labels.pages.teamTitle}
            text={labels.pages.teamText}
          />
        </Container>
      </section>
      <TeamSection clinic={clinic} intro={false} />
      <CtaBanner clinic={clinic} />
    </>
  );
}
