"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Clinic } from "@/clinics/types";
import { Container } from "@/components/site/container";
import { PhoneIcon } from "@/components/site/marks";
import { WarmButton } from "@/components/warm/ui";
import { telHref } from "@/lib/format";
import { labels } from "@/lib/labels";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; anchor?: boolean };

function isCurrent(pathname: string, item: NavItem, home: string) {
  if (item.anchor) return false;
  if (item.href === home) return pathname === home;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

/** Header under the top bar; the layout keeps both sticky. */
export function WarmHeader({ clinic, nav, logo }: { clinic: Clinic; nav: NavItem[]; logo: React.ReactNode }) {
  const pathname = usePathname();
  const home = `/${clinic.slug}`;
  // Menu state is keyed to the path, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  return (
    <header className="border-b border-border bg-white">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href={home} className="min-w-0 shrink rounded-full">
          {logo}
        </Link>
        <nav aria-label={labels.a11y.menu} className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => {
              const active = isCurrent(pathname, item, home);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn("text-[15.5px] font-bold", active ? "text-brand" : "text-foreground hover:text-brand")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <WarmButton
            href={telHref(clinic.phone)}
            className="min-h-12 px-6 text-[15px] max-[520px]:size-12 max-[520px]:px-0"
          >
            <PhoneIcon className="size-[18px] min-[521px]:hidden" />
            <span className="max-[520px]:sr-only">{labels.call}</span>
          </WarmButton>
          <button
            type="button"
            className="grid size-12 place-items-center rounded-full border border-border text-brand lg:hidden"
            aria-expanded={open}
            aria-controls="klinikos-meniu"
            aria-label={open ? labels.a11y.close : labels.a11y.menu}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>
      {open ? (
        <div id="klinikos-meniu" className="border-t border-border bg-white lg:hidden">
          <Container className="py-5">
            <ul className="flex flex-col gap-4 text-lg font-bold">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpenOn(null)} className="text-foreground hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
