import Link from "next/link";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { serviceHasDetail, serviceHref } from "@/lib/format";

export function ServicesSection({ clinic }: { clinic: Clinic }) {
  if (clinic.services.length === 0) return null;
  return (
    <section>
      <Container className="grid gap-4 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {clinic.services.map((service) => {
          const className = "rounded-3xl border border-line bg-white p-7";
          const body = (
            <>
              <h3 className="font-serif text-2xl font-bold text-brand">{service.title}</h3>
              <p className="mt-3 text-[#555a7a]">{service.summary}</p>
            </>
          );
          return serviceHasDetail(service) ? (
            <Link key={service.slug} href={serviceHref(clinic.slug, service.slug)} className={className}>
              {body}
            </Link>
          ) : (
            <article key={service.slug} className={className}>
              {body}
            </article>
          );
        })}
      </Container>
    </section>
  );
}
