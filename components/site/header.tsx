"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { PhoneIcon } from "@/components/site/marks";
import { PillLink } from "@/components/site/pill";
import { clinicNav, clinicPath, telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { cn } from "@/lib/utils";

function isCurrent(path: string, href: string) {
  if (href === "") return path === "" || path === "/";
  return path === href || path.startsWith(`${href}/`);
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
              className={cn("text-[15.5px] font-semibold", active ? "text-accent" : "text-brand hover:text-accent")}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function HeaderBar({ clinic, pathname }: { clinic: Clinic; pathname: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="border-b border-[#e3e5f0] bg-white">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href={clinicPath(clinic.slug)} className="min-w-0 rounded-xl">
          <Logo clinic={clinic} />
        </Link>
        <NavLinks clinic={clinic} pathname={pathname} className="hidden items-center gap-7 lg:flex" />
        <div className="flex items-center gap-2">
          <PillLink href={telHref(clinic.phone)} className="max-[720px]:px-4">
            <PhoneIcon />
            <span className="max-[420px]:sr-only">{labels.call}</span>
          </PillLink>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-[#e3e5f0] text-brand lg:hidden"
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
        <div id="klinikos-meniu" className="border-t border-[#e3e5f0] bg-white lg:hidden">
          <Container className="flex flex-col gap-4 py-5">
            <NavLinks
              clinic={clinic}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
              className="flex flex-col gap-4 text-lg"
            />
          </Container>
        </div>
      ) : null}
    </div>
  );
}

export function Header({ clinic }: { clinic: Clinic }) {
  const pathname = usePathname();
  return <HeaderBar clinic={clinic} pathname={pathname} />;
}
