"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { PhoneButton } from "@/components/site/phone-button";
import { clinicNav, clinicPath } from "@/lib/format";
import { labels } from "@/lib/labels";
import { navIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

function isCurrent(path: string, href: string) {
  if (href === "") return path === "" || path === "/";
  return path === href;
}

function NavLinks({
  clinic,
  pathname,
  onNavigate,
  className,
}: {
  clinic: Clinic;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  const current = pathname.replace(`/${clinic.slug}`, "") || "";

  return (
    <ul className={className}>
      {clinicNav(clinic).map((item) => {
        const active = isCurrent(current, item.href);
        return (
          <li key={item.href || "home"}>
            <Link
              href={clinicPath(clinic.slug, item.href)}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "text-sm transition-colors duration-200",
                active ? "text-accent" : "text-foreground/80 hover:text-accent",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function HeaderBar({
  clinic,
  pathname,
}: {
  clinic: Clinic;
  pathname: string;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const bar = (
    <div className="relative border-b border-border/70 bg-background/90 backdrop-blur-md">
      <Container className="flex items-center justify-between gap-4 py-3.5">
        <Link href={clinicPath(clinic.slug)} className="rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <Logo clinic={clinic} />
        </Link>
        <NavLinks
          clinic={clinic}
          pathname={pathname}
          className="hidden items-center gap-6 lg:flex"
        />
        <div className="flex items-center gap-2">
          <PhoneButton phone={clinic.phone} className="hidden sm:inline-flex" />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-border text-brand transition-colors duration-200 hover:bg-secondary lg:hidden"
            aria-expanded={open}
            aria-controls="klinikos-meniu"
            aria-label={open ? labels.a11y.close : labels.a11y.menu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>
      {open ? (
        <div id="klinikos-meniu" className="absolute inset-x-0 top-full z-50 border-b border-border bg-background shadow-lg lg:hidden">
          <Container className="flex flex-col gap-5 py-6">
            <NavLinks
              clinic={clinic}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
              className="flex flex-col gap-4 text-lg"
            />
            <PhoneButton phone={clinic.phone} className="w-full" />
          </Container>
        </div>
      ) : null}
    </div>
  );

  if (reduce) return bar;

  return (
    <motion.div initial={navIn.initial} animate={navIn.animate} transition={navIn.transition}>
      {bar}
    </motion.div>
  );
}

function HeaderActive({ clinic }: { clinic: Clinic }) {
  const pathname = usePathname();
  return <HeaderBar clinic={clinic} pathname={pathname} />;
}

export function Header({ clinic }: { clinic: Clinic }) {
  return (
    <Suspense fallback={<HeaderBar clinic={clinic} pathname={`/${clinic.slug}`} />}>
      <HeaderActive clinic={clinic} />
    </Suspense>
  );
}
