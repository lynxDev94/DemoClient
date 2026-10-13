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
  /** Legal name in the footer copyright line. Falls back to `name`. */
  legalName?: string;
  /** Short line under the logo. Hidden when empty. */
  subtitle?: string;
  /** Pill above the home headline, for example "Kaune nuo 2004 metų". */
  heroEyebrow?: string;
  /** The 3 check-points under the hero buttons. Hidden when empty. */
  heroPoints?: string[];
  /** Check-points in the home about block. Hidden when empty. */
  aboutPoints?: string[];
  facts?: { value: string; label: string; countUp?: boolean }[];
  /** Photo on a service page sidebar, and a fallback when a slot has no picture. */
  servicesPhoto?: ClinicPhoto;
  serviceCategories: { id: string; title: string; text?: string }[];
  services: {
    slug: string;
    title: string;
    /** `serviceCategories[].id` */
    category: string;
    /** One line, used in lists. */
    summary: string;
    /** Big card on the home page. */
    featured?: boolean;
    /** Numbered list on the home page. At most five are shown. */
    showOnHome?: boolean;
    /** Order in that list. Lower comes first. */
    homeOrder?: number;
    /** Headline inside the featured card. Falls back to `title`. */
    highlight?: string;
    /** Title in the home numbered list. Falls back to `title`. */
    homeTitle?: string;
    /** Line in the home numbered list. Falls back to `summary`. */
    homeSummary?: string;
    /** Link label on the featured card. Falls back to `title`. */
    homeCta?: string;
    detail?: {
      lead: string;
      stats?: { value: string; label: string }[];
      /** Heading above the steps. Falls back to the shared label. */
      stepsTitle?: string;
      /** Eyebrow on the side card. Falls back to the shared label. */
      consult?: string;
      steps?: { title: string; text: string }[];
      groups?: { title: string; items: string[] }[];
      paragraphs?: string[];
      /** Other service slugs. */
      related?: string[];
    };
  }[];
  specialists: { name: string; role: string; photo?: ClinicPhoto }[];
  /** false hides the specialists stat, the home section, and the Specialistai link. */
  showSpecialists?: boolean;
  prices: { category: string; items: { name: string; price: string }[] }[];
  /** Shown on the prices page when `prices` is empty. */
  pricesNote?: string;
  reviews: { author: string; rating: number; text: string }[];
  symptoms?: { text: string; service: string }[];
  values?: { title: string; text: string }[];
  partners?: { title: string; text: string }[];
  /** Hidden when empty. */
  team?: { name: string; role: string; photo?: string }[];
  /** Extra line under the hero title. Empty string hides it. Omit to use the first About paragraph. */
  lead?: string | null;
  copy?: {
    servicesText?: string;
    servicesTitle?: string;
    symptomsTitle?: string;
    symptomsText?: string;
    aboutTitle?: string;
    visitTitle?: string;
    visitText?: string;
    steps?: { title: string; text: string }[];
    ctaTitle?: string;
    ctaText?: string;
    aboutCtaTitle?: string;
    servicesLink?: string;
    servicesPageTitle?: string;
    servicesPageText?: string;
    footerText?: string;
    aboutPageTitle?: string;
    aboutPageLead?: string;
    valuesTitle?: string;
    partnersTitle?: string;
    contactTitle?: string;
    contactLead?: string;
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
