import type { Clinic } from "./types";

export const clinic: Clinic = {
  slug: "gyvunu-edenas",
  published: false,
  name: "Gyvūnų Edenas",
  tagline: "Patikima veterinarijos klinika nuo 2004 m.",
  lead: "",
  phone: "+370 606 07007",
  email: "gyvunuedenas@hotmail.com",
  address: "Kuršių g. 7, Kaunas, LT-48107",
  locationPhoto: "/clinics/gyvunu-edenas/building.jpg",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=23.878,54.930,23.902,54.943&layer=mapnik&marker=54.9365084,23.8903439",
  hours: [
    { days: "I-V", time: "8:00-20:00" },
    { days: "VI-VII", time: "9:00-14:00" },
  ],
  about: {
    photos: ["/clinics/gyvunu-edenas/home-page-main-img.jpg"],
    background: { src: "/clinics/gyvunu-edenas/facade.jpg", focus: "90% center" },
    pagePhoto: "/clinics/gyvunu-edenas/entrance.jpg",
    foundedYear: 2004,
    text: "„Gyvūnų Edenas“ - tai patikima gyvūnų klinika, teikianti profesionalias veterinarijos paslaugas nuo 2004 metų. Be to, klinikoje dirba patyrę veterinarijos gydytojai, kurie specializuojasi smulkiųjų gyvūnų gydyme, šunų ir kačių sveikatos priežiūroje, ligų diagnostikoje bei profilaktikoje.\n\nČia taip pat galima įsigyti pašarų ir gyvūnų priežiūros reikmenų.",
  },
  servicesPhoto: { src: "/clinics/gyvunu-edenas/services-img.jpg", focus: "center 15%" },
  services: [
    {
      title: "Kardiologija",
      description:
        "Širdies ir kraujagyslių ligų diagnostika bei gydymas. Atliekamas auskultavimas, kardiograma, širdies echoskopija ir rentgeno nuotraukos.",
      icon: "Heart",
    },
    {
      title: "DNR tyrimai",
      description:
        "Genetiniai tyrimai paveldimoms ligoms, kailio spalvos paveldimumui ir tėvystei nustatyti. Mėginiai siunčiami į Vokietijos laboratoriją Laboklin.",
      icon: "Microscope",
    },
    {
      title: "Profilaktinės procedūros",
      description:
        "Pirminė apžiūra, vakcinacija, nagų karpymas, ausų valymas, paranalinių liaukų išspaudimas, mikročipo įvedimas ir vaistų sudavimas. Suaugusiems rekomenduojama apžiūra kasmet, jaunesniems ir vyresniems dažniau.",
      icon: "Shield",
    },
    {
      title: "Dermatologija",
      description:
        "Odos ir ausų ligų diagnostika: apžiūra, citologija, odos skutmenys ir Vudo lempos tyrimas. Hormoniniai, mikrobiologiniai, mikologiniai tyrimai ir biopsijos atliekami su laboratorijomis Lietuvoje ir užsienyje.",
      icon: "PawPrint",
    },
    {
      title: "Kraujo perpylimas",
      description:
        "Kraujo ar jo komponentų perpylimas, prieš tai nustačius donoro ir recipiento kraujo grupes.",
      icon: "Syringe",
    },
    {
      title: "Dokumentų pildymas",
      description:
        "Augintinio paso išdavimas ir pildymas, mikročipo duomenų įvedimas bei keitimas, dokumentai išvykstant į užsienį.",
      icon: "Shield",
    },
    {
      title: "Rentgenologija",
      description:
        "Rentgeno tyrimas kaulams, audiniams ir vidaus organams vertinti. Padeda nustatyti lūžius, šlapimo pūslės akmenis, prarytus svetimkūnius, padidėjusius organus ir nėštumą.",
      icon: "ScanLine",
    },
    {
      title: "Chirurgija",
      description:
        "Prieš operaciją įvertinama būklė, atliekami kraujo tyrimai ir parenkama nejautra. Atliekama sterilizacija, kastracija, žaizdų sutvarkymas, svetimkūnių šalinimas ir kitos operacijos. Po operacijos teikiama priežiūra.",
      icon: "Scissors",
    },
    {
      title: "Laboratoriniai tyrimai",
      description:
        "Kraujo, šlapimo, citologiniai, koprologiniai, bakteriologiniai ir mikologiniai tyrimai.",
      icon: "Microscope",
    },
    {
      title: "Odontologija",
      description:
        "Burnos ir dantų priežiūra šunims, katėms ir graužikams: apžiūra, burnos rentgenograma, higiena ultragarsiniu skaleriu, poliravimas, dantų traukimas ir graužikų dantų trumpinimas.",
      icon: "Toothbrush",
    },
    {
      title: "Oftalmologija",
      description:
        "Akių ir vokų apžiūra, šviesos bei mirksėjimo refleksų tyrimas, akies paviršiaus ir dugno vertinimas.",
      icon: "Stethoscope",
    },
    {
      title: "Ultragarsinis tyrimas",
      description:
        "Echoskopija šunims, katėms ir kitiems augintiniams. Tiriama viena organų sistema arba visos, taip pat nustatomas nėštumas. Paprastai atliekama be bendrosios nejautros.",
      icon: "ScanLine",
    },
    {
      title: "Gyvūnų kirpykla",
      description:
        "Šunų ir kačių maudymas, kirpimas, nukailinimas, sąvėlų iššukavimas, nagų karpymas ir ausų valymas. Šunims taip pat atliekamas trimingavimas.",
      icon: "Scissors",
    },
    {
      title: "Augintinių kremavimas",
      description:
        "Individualus kremavimas per sertifikuotą krematoriumą. Pelenai grąžinami pasirinktoje urnoje. Pageidaujant galima vaizdo įrašas, kaip augintinis įkeliamas į kamerą.",
      icon: "PawPrint",
    },
  ],
  specialists: [],
  showSpecialists: false,
  prices: [],
  pricesNote: "Kainas sužinosite paskambinę į kliniką.",
  reviews: [],
  googleRating: { score: 4.1, count: 291 },
  showRating: false,
  brand: {
    primary: "#21217E",
    accent: "#B94235",
    logo: "/clinics/gyvunu-edenas/brand-logo.png",
    logoStyle: "badge",
  },
  socials: {
    facebook: "https://www.facebook.com/gyvunuedenas",
    instagram: "https://www.instagram.com/gyvunuedenas",
  },
  copy: {
    servicesText:
      "Kardiologija, tyrimai, chirurgija, profilaktika, odontologija, kirpykla ir kitos klinikos paslaugos.",
    visitTitle: "Paskambinkite",
    visitText: "Vizito laiką deriname telefonu.",
    steps: [
      { title: "Paskambinkite", text: "Paskambinkite į kliniką." },
      { title: "Suderiname laiką", text: "Vizito laiką deriname telefonu." },
      { title: "Atvykite", text: "Atvykite į kliniką sutartu laiku." },
    ],
    ctaText: "Paskambinkite.",
  },
};
