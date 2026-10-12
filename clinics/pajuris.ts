import type { Clinic } from "./types";

export const clinic: Clinic = {
  slug: "pajuris",
  published: false,
  name: "Pajūrio veterinarija",
  tagline:
    "Šeimos klinika prie jūros — šunims, katėms ir kišeniniams augintiniams.",
  phone: "+370 646 11820",
  email: "labas@pajuriovet.lt",
  address: "Tiltų g. 12, Klaipėda",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=21.120,55.700,21.150,55.715&layer=mapnik&marker=55.7075,21.1345",
  hours: [
    { days: "Pr–Pn", time: "9:00–18:00" },
    { days: "Šeštadienis", time: "10:00–14:00" },
    { days: "Sekmadienis", time: "Nedirbame" },
  ],
  about: {
    foundedYear: 2018,
    photos: [
      "/photos/cat-window.jpg",
      "/photos/dogs-run.jpg",
      "/photos/cat-eyes.jpg",
      "/photos/person-cat.jpg",
    ],
    text: "Pajūrio veterinariją Klaipėdos senamiestyje atidarėme 2018 metais. Norėjome klinikos, į kurią galima užsukti pakeliui iš pasivaikščiojimo, o ne važiuoti per visą miestą.\n\nPriimame šunis, kates ir smulkius gyvūnus. Prieš procedūrą visada pasakome, ką darysime ir kiek tai kainuos. Skubius atvejus stengiamės sutalpinti tą pačią dieną.\n\nJei gyvenate už miesto, paskambinkite prieš važiuodami — pasakysime, ar tą dieną dar turime vietos.",
  },
  services: [
    {
      title: "Kasdienės apžiūros",
      description:
        "Trumpa arba išsami apžiūra, priklausomai nuo to, kas neramina. Išeisite su planu, ne su spėlione.",
      icon: "Stethoscope",
    },
    {
      title: "Vakcinacija",
      description:
        "Šuniukų, kačiukų ir suaugusių gyvūnų skiepai. Grafiką pritaikome pagal tai, kur augintinis būna.",
      icon: "Syringe",
    },
    {
      title: "Dantų gydymas",
      description:
        "Apžiūra, valymas ir šalinimas. Nejautrą stebime visą procedūrą, o po jos paskambiname patys.",
      icon: "Toothbrush",
    },
    {
      title: "Chirurgija",
      description:
        "Sterilizacija, kastracija ir kitos minkštųjų audinių operacijos su aiškiu skausmo planu.",
      icon: "Scissors",
    },
    {
      title: "Tyrimai vietoje",
      description:
        "Kraujas, echoskopija ir rentgenas klinikoje. Dažniausiai atsakymą turime iki jums išeinant.",
      icon: "Microscope",
    },
    {
      title: "Skubi pagalba",
      description:
        "Jei augintiniui bloga šiandien, skambinkite iš ryto. Paliekame laiko neplanuotiems vizitams.",
      icon: "Ambulance",
    },
  ],
  specialists: [
    {
      name: "Dr. Lukas Jankauskas",
      role: "Veterinarijos gydytojas, vadovas",
      photo: "/photos/vet-man-3.jpg",
    },
    {
      name: "Dr. Rūta Mockutė",
      role: "Veterinarijos gydytoja",
      photo: "/photos/vet-woman-3.jpg",
    },
    {
      name: "Austėja Vaitkutė",
      role: "Veterinarijos felčerė",
    },
    {
      name: "Dr. Mantas Grigas",
      role: "Veterinarijos gydytojas",
      photo: "/photos/vet-man-2.jpg",
    },
  ],
  prices: [
    {
      category: "Apžiūros",
      items: [
        { name: "Pirminė apžiūra", price: "32 €" },
        { name: "Pakartotinė apžiūra per 14 dienų", price: "22 €" },
        { name: "Smulkaus gyvūno apžiūra", price: "30 €" },
      ],
    },
    {
      category: "Skiepai",
      items: [
        { name: "Šuns kompleksinė vakcina", price: "nuo 34 €" },
        { name: "Katės kompleksinė vakcina", price: "nuo 31 €" },
        { name: "Pasiutligė", price: "20 €" },
      ],
    },
    {
      category: "Dantys",
      items: [
        { name: "Burnos apžiūra", price: "20 €" },
        { name: "Higiena su nejautra", price: "nuo 170 €" },
        { name: "Danties traukimas", price: "nuo 38 €" },
      ],
    },
    {
      category: "Operacijos",
      items: [
        { name: "Katės sterilizacija", price: "nuo 95 €" },
        { name: "Katino kastracija", price: "nuo 75 €" },
        { name: "Kalės sterilizacija", price: "nuo 175 €" },
        { name: "Šuns kastracija", price: "nuo 150 €" },
      ],
    },
    {
      category: "Tyrimai",
      items: [
        { name: "Bendras kraujo tyrimas", price: "nuo 26 €" },
        { name: "Echoskopija", price: "nuo 48 €" },
        { name: "Rentgeno nuotrauka", price: "32 €" },
      ],
    },
  ],
  reviews: [
    {
      author: "Greta S.",
      rating: 5,
      text: "Gyvename netoli Tiltų gatvės, todėl užbėgame po darbo. Rūta niekada neskuba ir parodo, ką mato.",
    },
    {
      author: "Andrius V.",
      rating: 5,
      text: "Šuniui prireikė siūlių šeštadienį. Priėmė, pasakė kainą prieš darbą ir vakare parašė, kaip laikosi.",
    },
    {
      author: "Monika D.",
      rating: 4,
      text: "Katės dantų valymas praėjo ramiai. Kaina buvo šiek tiek didesnė nei sąmata, bet skirtumą paaiškino dar prieš procedūrą.",
    },
    {
      author: "Simas ir Ema",
      rating: 5,
      text: "Pirmą kartą radome kliniką, kuri triušį apžiūri taip pat kruopščiai kaip šunį. Austėja labai kantri.",
    },
  ],
  googleRating: { score: 4.9, count: 126 },
  brand: { primary: "#1A3F4A", accent: "#D4896A" },
  socials: {
    facebook: "https://facebook.com/pajuriovet",
    instagram: "https://instagram.com/pajuriovet",
  },
  copy: {
    servicesText: "Nuo apžiūros iki skubios pagalbos — be siuntimų į kitą miesto galą.",
    steps: [
      {
        title: "Paskambinkite",
        text: "Trumpai pasakykite, kas nutiko augintiniui ir kada galite atvykti.",
      },
      {
        title: "Suderiname laiką",
        text: "Atsakome darbo valandomis ir paliekame vietos skubiems atvejams.",
      },
      {
        title: "Aiškus planas",
        text: "Prieš procedūrą išgirsite, ką siūlome ir kiek tai kainuos.",
      },
    ],
    ctaText: "Paskambinkite — atsilieps žmogus, ne automatinis atsakiklis.",
  },
};
