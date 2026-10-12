import Link from "next/link";
import type { Clinic } from "@/clinics/types";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { SpecialistCard } from "@/components/site/specialist-card";
import { clinicPath } from "@/lib/format";
import { labels } from "@/lib/labels";
import { cn } from "@/lib/utils";

export function TeamSection({
  clinic,
  limit,
  intro = true,
}: {
  clinic: Clinic;
  limit?: number;
  intro?: boolean;
}) {
  if (clinic.showSpecialists === false) return null;
  const people = typeof limit === "number" ? clinic.specialists.slice(0, limit) : clinic.specialists;
  if (people.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <Container>
        {intro ? (
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={labels.home.teamEyebrow}
            title={labels.home.teamTitle}
            text={labels.home.teamText}
          />
          {limit && clinic.specialists.length > limit ? (
            <Link
              href={clinicPath(clinic.slug, "/specialistai")}
              className="text-sm font-medium text-accent transition-colors duration-200 hover:text-brand"
            >
              {labels.allTeam}
            </Link>
          ) : null}
        </div>
        ) : null}
        <Stagger className={cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-4", intro ? "mt-12" : "")}>
          {people.map((person) => (
            <StaggerItem key={person.name}>
              <SpecialistCard specialist={person} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
