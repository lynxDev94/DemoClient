import Link from "next/link";
import type { Clinic } from "@/clinics/types";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceIcon } from "@/lib/icons";
import { clinicPath, serviceId } from "@/lib/format";
import { labels } from "@/lib/labels";
import { cn } from "@/lib/utils";

export function ServicesSection({
  clinic,
  intro = true,
  linked = true,
}: {
  clinic: Clinic;
  intro?: boolean;
  linked?: boolean;
}) {
  if (clinic.services.length === 0) return null;

  return (
    <section className="bg-secondary/70 py-20 md:py-28">
      <Container>
        {intro ? (
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={labels.home.servicesEyebrow}
              title={labels.home.servicesTitle}
              text={clinic.copy?.servicesText ?? labels.home.servicesText}
            />
            {linked ? (
              <Link
                href={clinicPath(clinic.slug, "/paslaugos")}
                className="text-sm font-medium text-accent transition-colors duration-200 hover:text-brand"
              >
                {labels.allServices}
              </Link>
            ) : null}
          </div>
        ) : null}
        <Stagger className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", intro ? "mt-12" : "")}>
          {clinic.services.map((service, index) => (
            <StaggerItem key={service.title} className="h-full">
              <article
                id={serviceId(service.title, index)}
                className="flex h-full flex-col rounded-[28px] border border-border/80 bg-card p-7 shadow-[0_24px_50px_-36px_rgba(30,58,50,0.55)]"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-brand">
                  <ServiceIcon name={service.icon} className="size-5" />
                </span>
                <h3 className="mt-6 font-serif text-2xl tracking-tight text-brand">{service.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{service.description}</p>
                {linked ? (
                  <Link
                    href={`${clinicPath(clinic.slug, "/paslaugos")}#${serviceId(service.title, index)}`}
                    className="mt-6 text-sm font-medium text-accent transition-colors duration-200 hover:text-brand"
                  >
                    {labels.more}
                  </Link>
                ) : null}
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
