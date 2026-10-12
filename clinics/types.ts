export type Clinic = {
  slug: string;
  /** false sends noindex, nofollow. true only after the clinic is a paying customer. */
  published: boolean;
  name: string;
  tagline: string;
  phone: string;
  email?: string;
  address: string;
  mapEmbedUrl: string;
  /** Building photo on the contact page. Path under /clinics/<slug>/. */
  locationPhoto?: string;
  hours: { days: string; time: string }[];
  about: {
    text: string;
    foundedYear?: number;
    photos: string[];
    /** Home about-block background. Use this when photos[0] is already the hero, so the same picture is not shown twice. */
    background?: string;
    /** Photo on the Apie page. Omit to use `photos`. */
    pagePhoto?: string;
  };
  /** Photo on the Paslaugos page. */
  servicesPhoto?: string;
  services: { title: string; description: string; icon: string }[];
  specialists: { name: string; role: string; photo?: string }[];
  prices: { category: string; items: { name: string; price: string }[] }[];
  reviews: { author: string; rating: number; text: string }[];
  /** Extra line under the hero title. Empty string hides it. Omit to use the first About paragraph. */
  lead?: string | null;
  copy?: {
    servicesText?: string;
    visitTitle?: string;
    visitText?: string;
    steps?: { title: string; text: string }[];
    ctaText?: string;
  };
  googleRating?: { score: number; count: number };
  brand: { primary: string; accent: string; logo?: string };
  socials?: { facebook?: string; instagram?: string };
};
