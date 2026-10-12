import type { Metadata } from "next";
import Link from "next/link";
import { getAllClinics } from "@/clinics";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { brandStyle } from "@/lib/format";
import { labels } from "@/lib/labels";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function Home() {
  if (process.env.NODE_ENV !== "development") {
    return (
      <main id="turinys" className="flex flex-1 items-center py-24 md:py-32">
        <Container>
          <h1 className="font-serif text-4xl tracking-tight text-brand md:text-5xl">
            {labels.index.title}
          </h1>
        </Container>
      </main>
    );
  }

  const clinics = await getAllClinics();

  return (
    <main id="turinys" className="flex-1 py-20 md:py-28">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow={labels.index.eyebrow}
          title={labels.index.title}
          text={labels.index.text}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {clinics.map((clinic) => (
            <Link
              key={clinic.slug}
              href={`/${clinic.slug}`}
              style={brandStyle(clinic)}
              className="group rounded-[28px] border border-border/80 bg-card p-8 shadow-[0_24px_50px_-40px_rgba(30,58,50,0.5)] transition-colors duration-200 hover:border-accent"
            >
              <span className="inline-block size-3 rounded-full bg-accent" aria-hidden="true" />
              <h2 className="mt-6 font-serif text-3xl tracking-tight text-brand">{clinic.name}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{clinic.tagline}</p>
              <p className="mt-6 text-sm text-foreground/75">{clinic.address}</p>
              <span className="mt-6 inline-flex text-sm font-medium text-accent transition-colors duration-200 group-hover:text-brand">
                {labels.index.open}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
