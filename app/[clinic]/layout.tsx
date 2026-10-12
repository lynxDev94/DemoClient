import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clinicSlugs, getClinic } from "@/clinics";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { TopBar } from "@/components/site/top-bar";
import { brandStyle } from "@/lib/format";
import { labels } from "@/lib/labels";

export function generateStaticParams() {
  return clinicSlugs.map((clinic) => ({ clinic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ clinic: string }>;
}): Promise<Metadata> {
  const { clinic: slug } = await params;
  const clinic = await getClinic(slug);
  if (!clinic) return { title: labels.notFound.title, robots: { index: false, follow: false } };
  return {
    title: clinic.name,
    description: clinic.tagline,
    robots: clinic.published
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

export default async function ClinicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ clinic: string }>;
}) {
  const { clinic: slug } = await params;
  const clinic = await getClinic(slug);
  if (!clinic) notFound();

  return (
    <div style={brandStyle(clinic)} className="flex min-h-full flex-1 flex-col">
      <div className="sticky top-0 z-40">
        <TopBar clinic={clinic} />
        <Header clinic={clinic} />
      </div>
      <main id="turinys" className="flex-1">
        {children}
      </main>
      <Footer clinic={clinic} />
    </div>
  );
}
