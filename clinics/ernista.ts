import type { Clinic } from "./types";

export const clinic: Clinic = {
  slug: "ernista",
  published: false,
  name: "Ernista, veterinarijos klinika",
  tagline: "Veterinarijos klinika Kaune, Savanorių prospekte.",
  lead: "",
  phone: "+370 37 712210",
  address: "Savanorių pr. 429, Kaunas, 49286",
  locationPhoto: "/clinics/ernista/location.png",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=23.955,54.920,23.980,54.933&layer=mapnik&marker=54.926626,23.967661",
  hours: [
    { days: "Pr-Pn", time: "9:00-19:00" },
    { days: "Šeštadienis", time: "9:00-15:00" },
    { days: "Sekmadienis", time: "Nedirbame" },
  ],
  about: {
    photos: ["/clinics/ernista/dog-dancing.png"],
    background: { src: "/photos/cat-bg.avif", focus: "center 45%" },
    pagePhoto: "/photos/about-page.jpg",
    text: "Ernista priima augintinius Savanorių prospekte. Klinikoje atliekama apžiūra, vakcinacija, vidaus ligų gydymas ir chirurgija.\n\nVizitus deriname telefonu.",
  },
  servicesPhoto: "/photos/services-img.jpg",
  serviceCategories: [{ id: "paslaugos", title: "Paslaugos" }],
  services: [
    {
      slug: "apziura",
      title: "Apžiūra",
      category: "paslaugos",
      summary: "Bendra augintinio apžiūra klinikoje.",
      showOnHome: true,
    },
    {
      slug: "vakcinacija",
      title: "Vakcinacija",
      category: "paslaugos",
      summary: "Skiepai klinikoje.",
      showOnHome: true,
    },
    {
      slug: "vidaus-ligos",
      title: "Vidaus ligos",
      category: "paslaugos",
      summary: "Vidaus ligų konsultacija ir gydymas.",
      showOnHome: true,
    },
    {
      slug: "chirurgija",
      title: "Chirurgija",
      category: "paslaugos",
      summary: "Chirurginės procedūros klinikoje.",
      featured: true,
    },
  ],
  specialists: [
    {
      name: "Gydytojas veterinaras",
      role: "Priėmimas klinikoje",
    },
  ],
  prices: [
    {
      category: "Apžiūra",
      items: [{ name: "Apžiūra", price: "Kaina - pagal konsultaciją" }],
    },
    {
      category: "Vakcinacija",
      items: [{ name: "Vakcinacija", price: "Kaina - pagal konsultaciją" }],
    },
    {
      category: "Vidaus ligos",
      items: [{ name: "Vidaus ligos", price: "Kaina - pagal konsultaciją" }],
    },
    {
      category: "Chirurgija",
      items: [{ name: "Chirurgija", price: "Kaina - pagal konsultaciją" }],
    },
  ],
  reviews: [
    {
      author: "Menulija",
      rating: 5,
      text: "Noriu padėkoti Ernista kolektyvui už pudeliuko priežiūrą ir profesionalumą. Ne pirmas kartas, kaip tiksliai ir gerai diagnozuoja, paskiria tinkamus vaistus. Klientui ypatingai draugiškos kainos. Esame labai labai dėkingi.",
    },
    {
      author: "Raimundas",
      rating: 5,
      text: "Labai nerealūs veterinarai! Mūsų auksiuką gydo nuo mažų dienų ir visada suteikia Max rezultatą. Ačiū jums",
    },
    {
      author: "Ruta",
      rating: 5,
      text: "Labas vakaras, mes labai patenkinti ir jau daugiau nei 8 metai pas jumis gydome ir vežame apžiūrai savo čiau čiau veislės šunį. Jūs išoperavote gimdą mūsų augintiniai, gydete plaučių uždegimą, gelbejote nuo babijozes. Dabar neseniai vėl nutiko bėda mūsų šuniui apsisuko skrandis, lėmė minutės ar išgyvens. Kol kas mums sekasi, sveiksta mūsų šuo. Todėl noriu padėkoti, ko prieš tai nepadareme. Ačiū jums kad gelbejote mūsų šunį.",
    },
    {
      author: "Vika",
      rating: 5,
      text: "Labai patiko, - greitai nustatė ligą katytei, skyrė gydymą. Labai dėmesingi daktarai, o kaina žema. Lankysimės būtinai ir toliau. Abu mūsų katinus pastatė ant kojų, kai jau atrodė kad nebepasveiks. Ačiū labai:).",
    },
  ],
  googleRating: { score: 4.7, count: 346 },
  googlePlaceId: "ChIJN1luUg4i50YRttxlJNYLwgo",
  brand: { primary: "#243044", accent: "#6F8F7B" },
  copy: {
    servicesText: "Apžiūra, vakcinacija, vidaus ligos ir chirurgija.",
    visitTitle: "Paskambinkite",
    visitText: "Vizito laiką deriname telefonu.",
    steps: [
      {
        title: "Paskambinkite",
        text: "Paskambinkite darbo valandomis.",
      },
      {
        title: "Laikas",
        text: "Vizito laiką deriname telefonu.",
      },
      {
        title: "Atvykimas",
        text: "Atvykite į kliniką sutartu laiku.",
      },
    ],
    ctaText: "Paskambinkite darbo valandomis.",
  },
};
