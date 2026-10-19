import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clinicSlugs, getClinic } from "@/clinics";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { TopBar } from "@/components/site/top-bar";
import { ModernFooter, ModernLogo, ModernTopBar, modernNav } from "@/components/modern/chrome";
import { ModernHeader } from "@/components/modern/header";
import { WarmFooter, WarmLogo, WarmTopBar, warmNav } from "@/components/warm/chrome";
import { WarmHeader } from "@/components/warm/header";
import { brandStyle, modernStyle, warmStyle } from "@/lib/format";
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

  if (clinic.theme === "warm") {
    return (
      <div style={{ ...brandStyle(clinic), ...warmStyle() }} data-theme="warm" className="flex min-h-full flex-1 flex-col">
        <div className="sticky top-0 z-40">
          <WarmTopBar clinic={clinic} />
          <WarmHeader clinic={clinic} nav={warmNav(clinic)} logo={<WarmLogo clinic={clinic} />} />
        </div>
        <main id="turinys" className="flex-1">
          {children}
        </main>
        <WarmFooter clinic={clinic} />
      </div>
    );
  }

  if (clinic.theme === "modern") {
    return (
      <div
        style={{ ...brandStyle(clinic), ...modernStyle() }}
        data-theme="modern"
        className="flex min-h-full flex-1 flex-col"
      >
        <div className="sticky top-0 z-40">
          <ModernTopBar clinic={clinic} />
          <ModernHeader clinic={clinic} nav={modernNav(clinic)} logo={<ModernLogo clinic={clinic} />} />
        </div>
        <main id="turinys" className="flex-1">
          {children}
        </main>
        <ModernFooter clinic={clinic} />
      </div>
    );
  }

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
