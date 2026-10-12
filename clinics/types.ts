/** A public image path, or the same path plus a crop focus. */
export type ClinicPhoto = string | { src: string; focus?: string };

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
  locationPhoto?: ClinicPhoto;
  hours: { days: string; time: string }[];
  about: {
    text: string;
    foundedYear?: number;
    photos: ClinicPhoto[];
    /** Home about-block background. Use this when photos[0] is already the hero, so the same picture is not shown twice. */
    background?: ClinicPhoto;
    /** Photo on the Apie page. Omit to use `photos`. */
    pagePhoto?: ClinicPhoto;
  };
  /** Photo on the Paslaugos page. */
  servicesPhoto?: ClinicPhoto;
  services: { title: string; description: string; icon: string }[];
  specialists: { name: string; role: string; photo?: ClinicPhoto }[];
  /** false hides the specialists stat, the home section, and the Specialistai link. */
  showSpecialists?: boolean;
  prices: { category: string; items: { name: string; price: string }[] }[];
  /** Shown on the prices page when `prices` is empty. */
  pricesNote?: string;
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
  /** When false, show the review count without the score. */
  showRating?: boolean;
  /** Google place ID. Enables the Maps rating link and the write-a-review button. */
  googlePlaceId?: string;
  brand: {
    primary: string;
    accent: string;
    logo?: string;
    /**
     * badge: white rounded pad, for logos with a white or opaque background.
     * plain: the file on its own. Defaults to badge.
     */
    logoStyle?: "plain" | "badge";
  };
  socials?: { facebook?: string; instagram?: string };
};
