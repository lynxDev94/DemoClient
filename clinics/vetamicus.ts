import type { Clinic } from "./types";

/**
 * Sources: Google Business profile (place ChIJwaTOHgnZ5EYRLcT48T5PQ48, unclaimed), the Facebook page
 * (name "Vetamicus veterinarinės medicinos diagnostikos ir chirurgijos centras") and the service list and
 * phones on vetamicus.lt. Service one-liners are ours. Photos and logo from the clinic, in public/clinics/vetamicus/.
 */
const photo = "/clinics/vetamicus";

export const clinic: Clinic = {
  slug: "vetamicus",
  published: false,
  theme: "warm",
  name: "Vetamicus",
  subtitle: "Veterinarinės medicinos centras",
  tagline: "Diagnostikos ir chirurgijos centras Klaipėdoje",
  lead: "Kompiuterinė tomografija, rentgenas, echoskopija ir endoskopija, o kai reikia — laparoskopinės, minkštųjų audinių ir kaulų operacijos. Paskambinkite — suderinsime vizito laiką.",
  heroPoints: ["Kompiuterinė tomografija", "Laparoskopinė chirurgija", "Aikštelė su vieta neįgaliesiems"],
  phone: "+370 46 411 311",
  address: "Klaipėdos g. 49, Klaipėda",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=21.147,55.746,21.172,55.755&layer=mapnik&marker=55.7504097,21.1594024",
  hours: [
    { days: "I–V", time: "9:00–18:00" },
    { days: "VI–VII", time: "Nedirbame" },
  ],
  about: {
    photos: [
      { src: `${photo}/happyDogWithVet.png`, focus: "50% 35%" },
      { src: `${photo}/hero.png`, focus: "50% 40%" },
    ],
    text: "Veterinarinės medicinos diagnostikos ir chirurgijos centras Klaipėdoje, Klaipėdos gatvėje.",
  },
  gallery: [
    { src: `${photo}/operation.png`, focus: "50% 50%" },
    { src: `${photo}/xrays.png`, focus: "50% 50%" },
    { src: `${photo}/lying-cat.png`, focus: "50% 60%" },
  ],
  ratingQuote: {
    text: "Profesionalūs gydytojai, malonus aptarnavimas ir visa reikalinga tyrimų ir gydymo įranga vienoje vietoje.",
    author: "Živilė B. K.",
  },
  whyUs: [
    {
      title: "Tyrimai vietoje",
      quote: "Visi tyrimai vietoje, daktariukai malonūs, nuosekliai ir aiškiai viską paaiškina.",
      author: "Jolanta M.",
    },
    {
      title: "Net kompiuterinė tomografija",
      quote: "Puikūs profesionalūs malonūs specialistai. Tyrimų galimybės daug didesnės (yra net kompiuterinė tomografija). Jaukios patalpos.",
      author: "Algimantas Š.",
    },
    {
      title: "Viską paaiškina",
      quote: "Profesionalios ir paslaugios daktarytės. Viską paaiškino, pasirūpino mano mylimuku. Labai ačiū",
      author: "Rolandas N.",
    },
  ],
  serviceCategories: [
    { id: "diagnostika", title: "Diagnostika" },
    { id: "chirurgija", title: "Chirurgija" },
    { id: "gydymas", title: "Gydymas" },
  ],
  services: [
    {
      slug: "kompiuterine-tomografija",
      title: "Kompiuterinė tomografija",
      category: "diagnostika",
      summary: "Tikslus vaizdinis tyrimas, kai reikia pamatyti daugiau nei apžiūros metu.",
      showOnHome: true,
      homeOrder: 1,
    },
    {
      slug: "laparoskopine-chirurgija",
      title: "Laparoskopinė chirurgija",
      category: "chirurgija",
      summary: "Operacijos per mažus pjūvius.",
      showOnHome: true,
      homeOrder: 2,
    },
    {
      slug: "vidaus-ligos",
      title: "Vidaus ligos",
      category: "gydymas",
      summary: "Vidaus ligų diagnostika ir gydymas.",
      showOnHome: true,
      homeOrder: 3,
    },
    {
      slug: "echoskopija",
      title: "Echoskopija",
      category: "diagnostika",
      summary: "Ultragarsinis vidaus organų tyrimas.",
      showOnHome: true,
      homeOrder: 4,
    },
    {
      slug: "rentgeno-diagnostika",
      title: "Rentgeno diagnostika",
      category: "diagnostika",
      summary: "Rentgeno tyrimai klinikoje.",
    },
    {
      slug: "dantu-rentgenas",
      title: "Dantų rentgenas",
      category: "diagnostika",
      summary: "Dantų ir žandikaulių rentgeno nuotraukos.",
    },
    {
      slug: "endoskopija",
      title: "Endoskopija",
      category: "diagnostika",
      summary: "Vidaus organų apžiūra endoskopu.",
    },
    {
      slug: "minkstuju-audiniu-ir-kaulu-chirurgija",
      title: "Minkštųjų audinių ir kaulų chirurgija",
      category: "chirurgija",
      summary: "Minkštųjų audinių ir kaulų operacijos.",
    },
    {
      slug: "ortopedija",
      title: "Ortopedija",
      category: "chirurgija",
      summary: "Kaulų, sąnarių ir judėjimo problemos.",
    },
    {
      slug: "plastine-chirurgija",
      title: "Plastinė chirurgija",
      category: "chirurgija",
      summary: "Plastinės ir atkuriamosios operacijos.",
    },
    {
      slug: "dermatologija",
      title: "Dermatologija",
      category: "gydymas",
      summary: "Odos ir kailio ligos.",
    },
    {
      slug: "oftalmologija",
      title: "Oftalmologija",
      category: "gydymas",
      summary: "Akių ligų diagnostika ir gydymas.",
    },
    {
      slug: "neurologija",
      title: "Neurologija",
      category: "gydymas",
      summary: "Nervų sistemos ligų diagnostika ir gydymas.",
    },
  ],
  specialists: [],
  showSpecialists: false,
  prices: [],
  pricesNote: "Papasakokite, kas nutiko augintiniui, ir pasakysime, ko reikės.",
  reviews: [
    {
      author: "Laima H.",
      rating: 5,
      text: "Nuostabi klinika! Gydytojai ne tik profesionalūs, bet ir tikrai nuoširdūs – jautėsi, kad rūpi. Viską paaiškino ramiai, su užuojauta. Tyrimus padarė vietoje, greitai ir tiksliai. Ačiū už rūpestį mūsų augintiniui!",
    },
    {
      author: "Martyna M.",
      rating: 5,
      text: "Didžiausios rekomendacijos. Lankomės ir su savo kate ir su šunimi, gydytojos begalo supratingos ir kantrios. Turėjome problemų su abiem savo augintiniais ir abiem buvo pasirūpinta tobulai. O gydytojai V. Raišutei atskira padėka už begalo didelį suprantingumą susirgus gyvūnui, matosi, kad jai rūpi tiek gyvūnas, tiek moka nuraminti savininkus.",
    },
    {
      author: "Emilija K.",
      rating: 5,
      text: "Tik geriausi atsiliepimai apie šią kliniką. Atrodo, kad specialistai dirba iš pašaukimo ir jiems tikrai rūpi, kaip gyvūnas jaučiasi. Konsultacijos išsamios, atsakoma į kiekvieną rūpimą klausimą. Turėjome rimtą ligą, ir būtent Vetamicus gydytojai išgelbėjo mūsų bišonytę Luną. Nuoširdžiausi linkėjimai ir padėka Gydytojams G. Jankauskaitei ir V. Stankui.",
    },
    {
      author: "Loreta B.",
      rating: 5,
      text: "Labai operatyviai aptarnavo, daktarė labai maloni ir labai švelni su gyvūnu. Paaiškino viską sklandžiai ir pateikė kelias opcijas. Rekomenduoju šią kliniką",
    },
    {
      author: "Eleonora S.",
      rating: 5,
      text: "Šuniui atlikta echoskopija, gastroskopija,  nustatyta tiksli diagnozė, paskirtas tinkamas gydymas. Keliantis pasitikėjimą, kokybiškas ir profesionalus aptarnavimas. Ačiū",
    },
    {
      author: "Brigita K.",
      rating: 5,
      text: "Tik geriausi atisliepimai. Klinikoje dirba operatyvi ir stipri komanda. Ne tik žino ką daro, bet ir mėgaujasi tuo. Kiekvieno apsilankymo metu džiaugiuosi atradusi \"Vetamicus\".",
    },
  ],
  copy: {
    servicesTitle: "Nuo tikslios diagnozės iki operacijos",
    servicesPageTitle: "Mūsų paslaugos",
    servicesPageText: "Nuo kompiuterinės tomografijos iki laparoskopinių operacijų. Nežinote, ko reikia? Paskambinkite.",
    contactTitle: "Lauksime jūsų",
    contactLead: "Paskambinkite ir suderinsime vizito laiką. Mobilusis: +370 671 28997.",
    visitText: "Šalia yra automobilių stovėjimo aikštelė su vieta neįgaliesiems.",
    footerText: "Veterinarinės medicinos diagnostikos ir chirurgijos centras Klaipėdoje.",
  },
  googleRating: { score: 4.6, count: 240 },
  showRating: true,
  googlePlaceId: "ChIJwaTOHgnZ5EYRLcT48T5PQ48",
  brand: {
    // Olive from the Vetamicus logo (#7c785f), darkened so white text on it stays readable; gold accent.
    primary: "#66624c",
    accent: "#d9b86c",
    logo: `${photo}/logo-mark.png`,
    logoStyle: "badge",
  },
  socials: {
    facebook: "https://www.facebook.com/VETAMICUS/",
  },
};
