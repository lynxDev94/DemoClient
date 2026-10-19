import fs from "fs";
import path from "path";
import type { Clinic, ClinicPhoto } from "@/clinics/types";
import { asPhoto } from "@/lib/photos";

const MIN_WIDTH = { hero: 1200, card: 800, thumb: 400 } as const;
/** Hero column is about 500px, so 1000px still covers a 2x screen. Below that, swap. */
const HERO_KEEP = 1000;

/** Sharp stock, large enough for the slot. */
const STOCK = {
  hero: "/photos/dog-portrait.jpg",
  card: "/photos/services-img.jpg",
  thumb: "/photos/services-img.jpg",
} as const;

const sizes = new Map<string, number | null>();
const warned = new Set<string>();

async function widthOf(publicPath: string) {
  if (sizes.has(publicPath)) return sizes.get(publicPath) ?? null;
  const file = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  // Missing files are not cached: a photo added while the dev server runs shows up on the next load.
  if (!fs.existsSync(file)) return null;
  const sharp = (await import("sharp")).default;
  const meta = await sharp(file).metadata();
  const width = meta.width ?? null;
  sizes.set(publicPath, width);
  return width;
}

async function fit(
  photo: ClinicPhoto | undefined,
  role: keyof typeof MIN_WIDTH,
  slot: string,
): Promise<ClinicPhoto | undefined> {
  const current = asPhoto(photo);
  if (!current) return photo;
  const min = MIN_WIDTH[role];
  const width = await widthOf(current.src);
  if (width !== null && width >= min) return photo;
  if (role === "hero" && width !== null && width >= HERO_KEEP) {
    const soft = `${slot}: ${current.src} is ${width}px wide, under the ${min}px hero floor. Kept because it still covers the hero column.`;
    if (!warned.has(soft)) {
      warned.add(soft);
      console.warn(`[photos] ${soft}`);
    }
    return photo;
  }
  const stock = STOCK[role];
  const note = `${slot}: ${current.src} is ${width ?? "missing"}px wide, needs ${min}. Using ${stock}.`;
  if (!warned.has(note)) {
    warned.add(note);
    console.warn(`[photos] ${note}`);
  }
  return { src: stock, focus: current.focus };
}

/** Replace undersized photos with stock. Does not mutate the clinic config. */
export async function fitClinicPhotos(clinic: Clinic): Promise<Clinic> {
  const next = structuredClone(clinic);
  const slot = (name: string) => `${clinic.slug} ${name}`;
  next.about.photos = await Promise.all(
    next.about.photos.map((photo, index) =>
      fit(photo, index === 0 ? "hero" : "card", slot(index === 0 ? "hero" : `photo ${index + 1}`)),
    ),
  ) as Clinic["about"]["photos"];
  next.about.background = await fit(next.about.background, "card", slot("about background"));
  next.about.pagePhoto = await fit(next.about.pagePhoto, "card", slot("about page"));
  next.servicesPhoto = await fit(next.servicesPhoto, "card", slot("services"));
  if (next.gallery) {
    next.gallery = (await Promise.all(
      next.gallery.map((photo, index) => fit(photo, "thumb", slot(`gallery ${index + 1}`))),
    )) as ClinicPhoto[];
  }
  next.locationPhoto = await fit(next.locationPhoto, "card", slot("location"));
  next.specialists = await Promise.all(
    next.specialists.map(async (person, index) => ({
      ...person,
      photo: await fit(person.photo, "card", slot(`specialist ${index + 1}`)),
    })),
  );
  return next;
}
