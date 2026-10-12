import { notFound } from "next/navigation";
import { getClinic } from "@/clinics";

export async function requireClinic(slug: string) {
  const clinic = await getClinic(slug);
  if (!clinic) notFound();
  return clinic;
}
