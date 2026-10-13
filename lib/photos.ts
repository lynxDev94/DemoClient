import type { ClinicPhoto } from "@/clinics/types";

/** Sharp stock used when a clinic has no photo for that slot. */
export const stockPhotos = {
  hero: "/photos/dog-portrait.jpg",
  about: "/photos/about-page.jpg",
  service: "/photos/services-img.jpg",
} as const;

export function asPhoto(photo: ClinicPhoto | undefined) {
  if (!photo) return undefined;
  if (typeof photo === "string") return photo.trim() ? { src: photo } : undefined;
  return photo.src?.trim() ? photo : undefined;
}

/** Clinic photo when one is set, otherwise a stock file. Never an empty frame. */
export function photoOrStock(photo: ClinicPhoto | undefined, stock: string): ClinicPhoto {
  return asPhoto(photo) ? photo! : stock;
}

export function photoSrc(photo: ClinicPhoto | undefined) {
  return asPhoto(photo)?.src;
}

/** CSS object-position. Omit to let the frame crop from the center. */
export function photoFocus(photo: ClinicPhoto | undefined) {
  return asPhoto(photo)?.focus;
}
