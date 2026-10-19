import type { Clinic } from "./types";

/**
 * Sources: Google Business profile (place ChIJs7u8vnaU3UYRUDpmj7dALMA) and the company register
 * (UAB „Keturios pėdutės“, registered 2010). No service list was found, so the services are the
 * template defaults. Photos and logo from the clinic, in public/clinics/keturios-pedutes/.
 */
const photo = "/clinics/keturios-pedutes";

export const clinic: Clinic = {
  slug: "keturios-pedutes",
  published: false,
  theme: "warm",
  name: "Keturios Pėdutės",
  legalName: "UAB „Keturios pėdutės“",
  subtitle: "Veterinarijos gydykla",
  tagline: "Šilta veterinarijos klinika Vilniuje",
  lead: "Apžiūra, vakcinacija, vidaus ligų gydymas ir chirurgija šunims bei katėms. Paskambinkite — suderinsime jums patogų laiką.",
  heroPoints: ["Nuo 2010 metų", "Šeštadieniais 10–15", "Aikštelė su vieta neįgaliesiems"],
  phone: "+370 617 51700",
  address: "Kedrų g. 3, Vilnius",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=25.243,54.672,25.267,54.680&layer=mapnik&marker=54.6761453,25.2548067",
  hours: [
    { days: "I–V", time: "9:00–18:00" },
    { days: "VI", time: "10:00–15:00" },
    { days: "VII", time: "Nedirbame" },
  ],
  about: {
    photos: [
      { src: `${photo}/veterinarian-with-dog-in-hands-vertical.png`, focus: "50% 30%" },
      { src: `${photo}/happy-puppy-vertical.png`, focus: "center 40%" },
    ],
    foundedYear: 2010,
    text: "Veterinarijos klinika Vilniuje, Kedrų gatvėje, veikianti nuo 2010 metų. Rūpinamės šunimis ir katėmis.",
  },
  ratingQuote: { text: "Visada jautiesi laukiamas, o šuniukams jokio streso!", author: "Jonas G." },
  whyUs: [
    {
      title: "Gydytojos, kurios myli gyvūnus",
      quote: "Nuostabios vet. Specialistės❤️ Matosi, kad myli gyvūnus, nuoširdžiai pataria rūpinasi, o ir kainos geros :)",
      author: "Gintarė T.",
    },
    {
      title: "Patarimai ir po vizito",
      quote:
        "Taip pat gydytojos tiek telefonu, tiek per messenger’į maloniai ir išsamiai atsako į kiekvieną menkniekį.",
      author: "Gabrielė Š.",
    },
    {
      title: "Sąžiningos kainos",
      quote: "Gerai atlieka savo darbą,šiltai priema, veterinarės myli gyvunus. Geras kainos ir kokybės santykis",
      author: "Artūras Z.",
    },
  ],
  serviceCategories: [{ id: "paslaugos", title: "Paslaugos" }],
  services: [
    {
      slug: "apziura",
      title: "Apžiūra",
      category: "paslaugos",
      summary: "Sveikatos patikra ir konsultacija šunims bei katėms.",
      showOnHome: true,
      homeOrder: 1,
    },
    {
      slug: "vakcinacija",
      title: "Vakcinacija",
      category: "paslaugos",
      summary: "Augintinių skiepijimas.",
      showOnHome: true,
      homeOrder: 2,
    },
    {
      slug: "vidaus-ligos",
      title: "Vidaus ligos",
      category: "paslaugos",
      summary: "Vidaus ligų diagnostika ir gydymas.",
      showOnHome: true,
      homeOrder: 3,
    },
    {
      slug: "chirurgija",
      title: "Chirurgija",
      category: "paslaugos",
      summary: "Chirurginės operacijos.",
      showOnHome: true,
      homeOrder: 4,
    },
  ],
  specialists: [],
  showSpecialists: false,
  prices: [],
  pricesNote: "Papasakokite, kas nutiko augintiniui, ir pasakysime, ko reikės.",
  reviews: [
    {
      author: "Živilė Č.",
      rating: 5,
      text: "Nuostabi veterinarijos gyditoja, nuoširdžiai ir stipriai myli gyvūnus! Labai šiltas ir jaukus apsilankymas, daug papasakojo, davė patarimų, pastebėjimų, iš karto suprato kur bėda. Labai patiko, nes jau buvau pamiršusi, kad vet gyditojai irgi gali taip mylėti gyvūnus, o ne daryti viską “konvejeriu” 💚",
    },
    {
      author: "Oksana O.",
      rating: 5,
      text: "Dėkoju Simonai ir Reginai, kad išplėšė Čarlį iš mirties nagų po erkės įkandimo. Šios veterinaras- aukščiausio lygio profesionalės! Nuoširdu dėkui!",
    },
    {
      author: "Emilija U.",
      rating: 5,
      text: "Dėmesinga, rūpestinga gydytoja, mokanti nuraminti tiek gyvūną, tiek ir šeimininką.",
    },
    {
      author: "Lina V.",
      rating: 5,
      text: "Pirmas kartas bet ne paskutinis!!! Piper po tyrimų nenorėjo eiti namo. Per labai trumpa laiką veterinare dave tiek daug naudingu patarimų. Ačiū 🤗",
    },
    {
      author: "Gabrielė T.",
      rating: 5,
      text: "Puiki klinika. Ir mes ir augintis likome patenkinti dėmesiu ir nuoširdžiu rūpestingumu 🤍",
    },
    {
      author: "Einius Ž.",
      rating: 5,
      text: "Nuoširdus personalas, profesionalios paslaugos. Grįšime! ❤️‍🔥",
    },
  ],
  copy: {
    servicesPageTitle: "Mūsų paslaugos",
    servicesPageText: "Šunims ir katėms — nuo profilaktinės apžiūros iki operacijos. Nežinote, ko reikia? Paskambinkite.",
    contactTitle: "Lauksime jūsų",
    contactLead: "Paskambinkite ir suderinsime vizito laiką.",
    visitText: "Šalia yra automobilių stovėjimo aikštelė su vieta neįgaliesiems.",
    footerText: "Veterinarijos klinika Vilniuje nuo 2010 metų.",
  },
  googleRating: { score: 4.9, count: 188 },
  showRating: true,
  googlePlaceId: "ChIJs7u8vnaU3UYRUDpmj7dALMA",
  brand: {
    primary: "#4b2a52",
    accent: "#f4a78c",
    logo: `${photo}/logo-mark.png`,
    logoStyle: "badge",
  },
  socials: {
    facebook: "https://www.facebook.com/4pedutes/",
  },
};
