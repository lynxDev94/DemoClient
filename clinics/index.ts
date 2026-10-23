import type { Clinic } from "./types";
import { fitClinicPhotos } from "@/lib/photo-fit";

/**
 * Next cannot bundle a fully dynamic import path, so each clinic file
 * is registered here. To add a clinic: create clinics/<slug>.ts exporting
 * `clinic`, then add one line to this map.
 */
const registry = {
  berzu: () => import("./berzu").then((mod) => mod.clinic),
  pajuris: () => import("./pajuris").then((mod) => mod.clinic),
  ernista: () => import("./ernista").then((mod) => mod.clinic),
  "gyvunu-edenas": () => import("./gyvunu-edenas").then((mod) => mod.clinic),
  "pas-puma": () => import("./pas-puma").then((mod) => mod.clinic),
  vetamicus: () => import("./vetamicus").then((mod) => mod.clinic),
} satisfies Record<string, () => Promise<Clinic>>;

export const clinicSlugs = Object.keys(registry);

export async function getClinic(slug: string): Promise<Clinic | null> {
  const load = registry[slug as keyof typeof registry];
  if (!load) return null;
  return fitClinicPhotos(await load());
}

export async function getAllClinics(): Promise<Clinic[]> {
  const clinics = await Promise.all(clinicSlugs.map((slug) => getClinic(slug)));
  return clinics.filter((clinic): clinic is Clinic => clinic !== null);
}
