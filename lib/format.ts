import type { CSSProperties } from "react";
import type { Clinic } from "@/clinics/types";
import { labels } from "@/lib/labels";

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function clinicPath(slug: string, href = "") {
  return `/${slug}${href}`;
}

const placeholderSpecialist = "Gydytojas veterinaras";

export function isPlaceholderSpecialist(person: { name: string; photo?: unknown }) {
  return person.name.trim() === placeholderSpecialist && !person.photo;
}

export function realSpecialists(clinic: Clinic) {
  return clinic.specialists.filter((person) => !isPlaceholderSpecialist(person));
}

/** A detail page needs a lead and at least one block of body content. */
export function serviceHasDetail(service: Clinic["services"][number]) {
  const detail = service.detail;
  const lead = detail?.lead?.trim() ?? "";
  if (!lead) return false;
  return Boolean(detail?.steps?.length || detail?.groups?.length || detail?.paragraphs?.length);
}

export function hasAboutPage(clinic: Clinic) {
  if (paragraphs(clinic.about.text).length > 0) return true;
  if ((clinic.values?.length ?? 0) > 0) return true;
  if ((clinic.partners?.length ?? 0) > 0) return true;
  return (clinic.team ?? []).some((person) => {
    const name = person.name.trim();
    return name.length > 0 && !name.includes("[Vardas");
  });
}

export function hasPricesPage(clinic: Clinic) {
  return clinic.prices.some((group) => group.items.length > 0);
}

export function hasSpecialistsPage(clinic: Clinic) {
  return clinic.showSpecialists !== false && realSpecialists(clinic).length > 0;
}

const reviewLimit = 3;
const reviewSoftMax = 280;

/** Prefer reviews that fit a card. Longer ones fill only if there are not enough short ones. */
export function reviewsToShow<T extends { text: string }>(reviews: T[]) {
  const short = reviews.filter((review) => review.text.length <= reviewSoftMax);
  const long = reviews.filter((review) => review.text.length > reviewSoftMax);
  return [...short, ...long].slice(0, Math.min(reviewLimit, reviews.length));
}

export function clinicNav(clinic: Clinic) {
  return labels.nav.filter((item) => {
    if (item.href === "/apie" && !hasAboutPage(clinic)) return false;
    if (item.href === "/specialistai" && !hasSpecialistsPage(clinic)) return false;
    if (item.href === "/kainos" && !hasPricesPage(clinic)) return false;
    return true;
  });
}

export function serviceHref(slug: string, service: string) {
  return `/${slug}/paslaugos/${service}`;
}

export function paragraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function serviceId(title: string, index: number) {
  const slug = title
    .toLowerCase()
    .replace(/ą/g, "a")
    .replace(/č/g, "c")
    .replace(/ę|ė/g, "e")
    .replace(/į/g, "i")
    .replace(/š/g, "s")
    .replace(/ų|ū/g, "u")
    .replace(/ž/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || `paslauga-${index}`;
}

export function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase("lt-LT") ?? "")
    .join("");
}

export function decimalLt(value: number) {
  return value.toLocaleString("lt-LT", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

export function googleMapsUrl(placeId: string, name: string) {
  const params = new URLSearchParams({
    api: "1",
    query: name,
    query_place_id: placeId,
  });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}

export function googleReviewUrl(placeId: string) {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}

export function reviewsWord(count: number) {
  const last = count % 10;
  const lastTwo = count % 100;
  if (last === 1 && lastTwo !== 11) return "atsiliepimas";
  if (last >= 2 && last <= 9 && (lastTwo < 11 || lastTwo > 19)) return "atsiliepimai";
  return "atsiliepimų";
}

function channel(hex: string, start: number) {
  return parseInt(hex.slice(start, start + 2), 16) / 255;
}

function luminance(hex: string) {
  const raw = hex.trim().replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return 0;
  const linear = [channel(raw, 0), channel(raw, 2), channel(raw, 4)].map((value) =>
    value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(background: number, foreground: number) {
  const lighter = Math.max(background, foreground);
  const darker = Math.min(background, foreground);
  return (lighter + 0.05) / (darker + 0.05);
}

const ink = "#1c2b24";

export function readableOn(hex: string) {
  const background = luminance(hex);
  const onInk = contrast(background, luminance(ink));
  const onWhite = contrast(background, 1);
  return onInk >= onWhite ? ink : "#fffaf6";
}

export function brandStyle(clinic: Clinic): CSSProperties {
  return {
    "--brand": clinic.brand.primary,
    "--accent": clinic.brand.accent,
    "--primary": clinic.brand.primary,
    "--primary-foreground": readableOn(clinic.brand.primary),
    "--accent-foreground": readableOn(clinic.brand.accent),
    "--ring": clinic.brand.accent,
  } as React.CSSProperties;
}

export function clinicStats(clinic: Clinic) {
  const stats: { value: string; label: string }[] = [];
  if (clinic.about.foundedYear) {
    stats.push({ value: String(clinic.about.foundedYear), label: labels.stats.founded });
  }
  if (hasSpecialistsPage(clinic)) {
    stats.push({ value: String(clinic.specialists.length), label: labels.stats.team });
  }
  if (clinic.googleRating) {
    stats.push(
      clinic.showRating === false
        ? {
            value: String(clinic.googleRating.count),
            label: labels.stats.reviewCount,
          }
        : {
            value: decimalLt(clinic.googleRating.score),
            label: `Google · ${clinic.googleRating.count}`,
          },
    );
  }
  stats.push({ value: String(clinic.services.length), label: labels.stats.services });
  return stats;
}
