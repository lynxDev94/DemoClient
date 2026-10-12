import type { ClinicPhoto } from "@/clinics/types";

export function asPhoto(photo: ClinicPhoto | undefined) {
  if (!photo) return undefined;
  return typeof photo === "string" ? { src: photo } : photo;
}

export function photoSrc(photo: ClinicPhoto | undefined) {
  return asPhoto(photo)?.src;
}

/** CSS object-position. Omit to let the frame crop from the center. */
export function photoFocus(photo: ClinicPhoto | undefined) {
  return asPhoto(photo)?.focus;
}
