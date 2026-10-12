import type { Clinic } from "./types";

export const clinic: Clinic = {
  slug: "berzu",
  published: false,
  name: "Beržų veterinarijos klinika",
  tagline:
    "Rami priežiūra šunims, katėms ir mažiems augintiniams — čia pat, jūsų rajone.",
  phone: "+370 612 45018",
  email: "labas@berzuvet.lt",
  address: "Žalgirio g. 88, Vilnius",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=25.265,54.702,25.294,54.717&layer=mapnik&marker=54.7096,25.2797",
  hours: [
    { days: "Pr–Pn", time: "8:00–19:00" },
    { days: "Šeštadienis", time: "9:00–15:00" },
    { days: "Sekmadienis", time: "Nedirbame" },
  ],
  about: {
    foundedYear: 2014,
    photos: [
      "/photos/person-dog.jpg",
      "/photos/dog-golden.jpg",
      "/photos/cat-orange.jpg",
      "/photos/puppy.jpg",
    ],
    text: "Beržų veterinarijos kliniką atidarėme 2014 metais Žirmūnuose. Norėjome vietos, kur augintinis nebūtų tik numeris kortelėje, o šeimininkas išeitų supratęs, kas vyksta.\n\nDirbame ramiai: pirmiausia apžiūra, tada aiškus planas ir kaina, ir tik tada gydymas. Šunis, kates ir smulkius gyvūnus priimame toje pačioje klinikoje.\n\nKomanda nedidelė sąmoningai. Taip gydytojas spėja prisiminti vardą, o jūs žinote, kam skambinti, kai kas nors ne taip.",
  },
  services: [
    {
      title: "Profilaktinės apžiūros",
      description:
        "Apžiūra nuo nosies iki uodegos, prevencinis planas ir ramus pokalbis apie tai, kas iš tiesų būtina.",
      icon: "Stethoscope",
    },
    {
      title: "Vakcinacija",
      description:
        "Skiepai pagal amžių, gyvenimo būdą ir riziką. Primename, kada laikas kitam vizitui.",
      icon: "Syringe",
    },
    {
      title: "Dantų priežiūra",
      description:
        "Apnašų valymas, dantų rentgenas ir šalinimas su stebima nejautra.",
      icon: "Toothbrush",
    },
    {
      title: "Chirurgija",
      description:
        "Kastravimas, sterilizacija ir minkštųjų audinių operacijos su skausmo kontrole.",
      icon: "Scissors",
    },
    {
      title: "Diagnostika",
      description:
        "Laboratorija, echoskopija ir rentgenas vietoje, kad atsakymą gautumėte tą pačią dieną.",
      icon: "ScanLine",
    },
    {
      title: "Skubi pagalba",
      description:
        "Ligos vizitai be ilgos registracijos darbo dienomis ir šeštadienį.",
      icon: "Ambulance",
    },
  ],
  specialists: [
    {
      name: "Dr. Gabija Norkutė",
      role: "Veterinarijos gydytoja, vadovė",
      photo: "/photos/vet-woman.jpg",
    },
    {
      name: "Dr. Tomas Šimkus",
      role: "Veterinarijos gydytojas",
      photo: "/photos/vet-man.jpg",
    },
    {
      name: "Dr. Ieva Petrauskaitė",
      role: "Veterinarijos gydytoja",
      photo: "/photos/vet-woman-2.jpg",
    },
    {
      name: "Eglė Barauskaitė",
      role: "Veterinarijos felčerė",
      photo: "/photos/vet-woman-3.jpg",
    },
  ],
  prices: [
    {
      category: "Apžiūros ir profilaktika",
      items: [
        { name: "Pirminė apžiūra", price: "35 €" },
        { name: "Pakartotinė apžiūra", price: "25 €" },
        { name: "Sveikatos pažyma kelionei", price: "30 €" },
      ],
    },
    {
      category: "Vakcinacija",
      items: [
        { name: "Kompleksinė šuns vakcina", price: "nuo 32 €" },
        { name: "Kompleksinė katės vakcina", price: "nuo 30 €" },
        { name: "Pasiutligės vakcina", price: "22 €" },
      ],
    },
    {
      category: "Dantų priežiūra",
      items: [
        { name: "Dantų apžiūra", price: "25 €" },
        { name: "Burnos higiena su nejautra", price: "nuo 180 €" },
        { name: "Danties šalinimas", price: "nuo 40 €" },
      ],
    },
    {
      category: "Chirurgija",
      items: [
        { name: "Katės sterilizacija", price: "nuo 90 €" },
        { name: "Katės kastracija", price: "nuo 70 €" },
        { name: "Šuns sterilizacija", price: "nuo 160 €" },
        { name: "Šuns kastracija", price: "nuo 140 €" },
      ],
    },
    {
      category: "Diagnostika",
      items: [
        { name: "Bendras kraujo tyrimas", price: "nuo 28 €" },
        { name: "Echoskopija", price: "nuo 45 €" },
        { name: "Rentgenas, viena projekcija", price: "35 €" },
      ],
    },
  ],
  reviews: [
    {
      author: "Aistė K.",
      rating: 5,
      text: "Paskambinau ryte dėl vemianti katino, priėmė tą pačią dieną. Gabija viską paaiškino prieš bet kokį tyrimą.",
    },
    {
      author: "Marius L.",
      rating: 5,
      text: "Sąmata prieš dantų valymą sutapo su galutine sąskaita. Pirmą kartą iš veterinarijos neišėjau su staigmena.",
    },
    {
      author: "Jolanta P.",
      rating: 4,
      text: "Laukėme apie dvidešimt minučių, bet felčerė su mūsų triušiu elgėsi labai švelniai. Grįšime.",
    },
    {
      author: "Tomas R.",
      rating: 5,
      text: "Šuo paprastai dreba prie durų. Čia pats ėjo į kabinetą. Maža smulkmena, bet mums ji svarbi.",
    },
  ],
  googleRating: { score: 4.8, count: 214 },
  brand: { primary: "#1E3A32", accent: "#C4623A" },
  socials: {
    facebook: "https://facebook.com/berzuvet",
    instagram: "https://instagram.com/berzuvet",
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
