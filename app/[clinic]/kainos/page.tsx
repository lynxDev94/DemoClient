import type { Metadata } from "next";
import { getClinic } from "@/clinics";
import { PriceList } from "@/components/prices/price-list";
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

export default async function PricesPage({
  params,
}: {
  params: Promise<{ clinic: string }>;
}) {
  const clinic = await requireClinic((await params).clinic);
  const noPrices = clinic.prices.length === 0;

  return (
    <>
      <section className="pt-16 pb-16 md:pt-24 md:pb-24">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={labels.nav[3].label}
            title={noPrices ? (clinic.pricesNote ?? labels.pages.pricesEmpty) : labels.pages.pricesTitle}
            text={noPrices ? undefined : labels.pages.pricesText}
          />
          <div className="mt-12">
            <PriceList clinic={clinic} />
          </div>
        </Container>
      </section>
      <CtaBanner clinic={clinic} />
    </>
  );
}
