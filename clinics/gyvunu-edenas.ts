import type { Clinic } from "./types";

const photo = "/clinics/gyvunu-edenas";

export const clinic: Clinic = {
  slug: "gyvunu-edenas",
  published: false,
  name: "Gyvūnų Edenas",
  legalName: "UAB „Gyvūnų Edenas“",
  subtitle: "Jūsų veterinarijos klinika",
  tagline: "Patikima veterinarijos klinika jūsų augintiniui",
  heroEyebrow: "Kaune nuo 2004 metų",
  lead: "Profilaktika, diagnostika, chirurgija ir priežiūra šunims, katėms bei kitiems smulkiems gyvūnams — vienoje vietoje, Kuršių gatvėje.",
  heroPoints: ["Dirbame ir savaitgaliais", "Rentgenas ir echoskopija vietoje", "Gyvūnų kirpykla"],
  phone: "+370 606 07007",
  email: "gyvunuedenas@hotmail.com",
  address: "Kuršių g. 7, Kaunas, LT-48107",
  locationPhoto: `${photo}/building.jpg`,
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=23.878,54.930,23.902,54.943&layer=mapnik&marker=54.9365084,23.8903439",
  hours: [
    { days: "I–V", time: "8:00–20:00" },
    { days: "VI–VII", time: "9:00–14:00" },
  ],
  about: {
    photos: [`${photo}/home-page-main-img.jpg`],
    background: { src: `${photo}/cute-dog-after-operation.jpg`, focus: "center 40%" },
    pagePhoto: { src: `${photo}/entrance.jpg`, focus: "center 60%" },
    foundedYear: 2004,
    text: "Nuo 2004 metų rūpinamės šunimis, katėmis ir kitais smulkiais gyvūnais. Patyrę veterinarijos gydytojai, šiuolaikiniai gydymo metodai ir tiksli diagnostika — kad jūsų augintinio sveikata būtų svarbiausia.",
  },
  aboutPoints: [
    "DNR tyrimai atliekami Vokietijos laboratorijoje Laboklin",
    "Kraujo perpylimas, nustačius donoro ir recipiento kraujo grupes",
    "Pašarai ir priežiūros priemonės — čia pat klinikoje",
  ],
  facts: [
    { value: "2004", label: "metai, kai pradėjome dirbti", countUp: true },
    { value: "14", label: "paslaugų krypčių vienoje klinikoje", countUp: true },
    { value: "7 d.", label: "per savaitę — ir savaitgaliais", countUp: true },
    { value: "RTG · ECHO", label: "tyrimai atliekami vietoje" },
  ],
  servicesPhoto: { src: `${photo}/services-img.jpg`, focus: "center 15%" },
  serviceCategories: [
    {
      id: "profilaktika",
      title: "Profilaktika ir priežiūra",
      text: "Reguliarios apžiūros kas 6–12 mėn. padeda ligas pastebėti anksti.",
    },
    {
      id: "diagnostika",
      title: "Diagnostika",
      text: "Tyrimai klinikoje ir partnerių laboratorijose Lietuvoje bei užsienyje.",
    },
    {
      id: "gydymas",
      title: "Gydymas",
      text: "Širdies, odos, dantų ir akių ligų diagnostika bei gydymas.",
    },
    {
      id: "chirurgija",
      title: "Chirurgija ir intensyvi pagalba",
      text: "Operacijos ir procedūros, kai reikia veikti greitai ir tiksliai.",
    },
    {
      id: "atsisveikinimas",
      title: "Atsisveikinimas",
      text: "Oriai ir pagarbiai, kai to labiausiai reikia.",
    },
  ],
  services: [
    {
      slug: "profilaktines-proceduros",
      title: "Profilaktinės procedūros",
      category: "profilaktika",
      summary: "Pirminė apžiūra, vakcinacija, nagų karpymas, ausų valymas, mikročipo įvedimas ir registravimas",
      homeSummary: "Apžiūra, vakcinacija, mikročipavimas, nagų karpymas",
      showOnHome: true,
      homeOrder: 1,
      detail: {
        lead: "Reguliarios apžiūros (kas 6–12 mėn.) padeda užkirsti kelią ligoms arba jas nustatyti ankstyvoje stadijoje.",
        paragraphs: [
          "Nors daugumai suaugusių augintinių pakanka kasmetinio patikrinimo, jaunesniems ir vyresniems gyvūnams rekomenduojama lankytis dažniau.",
          "Apžiūros metu veterinaras įvertina bendrą augintinio būklę, klausia apie elgesį ir mitybą. Jei kyla įtarimų, atliekami papildomi tyrimai, įskaitant kraujo tyrimus vidaus organų būklei įvertinti.",
        ],
        groups: [
          {
            title: "Vizito metu",
            items: [
              "Patikrina svorį",
              "Matuoja temperatūrą",
              "Įvertina pulsą ir kvėpavimą",
              "Peržiūri skiepų grafiką",
              "Skiria reikalingas revakcinacijas",
            ],
          },
          {
            title: "Atliekame",
            items: [
              "Pirminę apžiūrą",
              "Vakcinaciją",
              "Nagų karpymą",
              "Ausų valymą",
              "Paranalinių liaukų išspaudimą",
              "Mikročipo įvedimą ir registravimą",
              "Vaistų sudavimą",
            ],
          },
        ],
      },
    },
    {
      slug: "dokumentu-pildymas",
      title: "Dokumentų pildymas",
      category: "profilaktika",
      summary: "Augintinio paso išdavimas ir pildymas, mikročipo duomenys, dokumentai kelionei į užsienį",
      detail: {
        lead: "Klinikoje sutvarkomi augintinio dokumentai: pasas, mikročipo duomenys ir dokumentai išvykstant į užsienį.",
        paragraphs: [
          "Dokumentai tvarkomi pagal galiojančius reikalavimus, kad galėtumėte keliauti su savo augintiniu.",
        ],
        groups: [
          {
            title: "Atliekame",
            items: [
              "Gyvūno augintinio paso išdavimą",
              "Gyvūno augintinio paso pildymą",
              "Mikročipo įvedimą į sistemą",
              "Mikročipo duomenų keitimą sistemoje",
              "Dokumentų pildymą išvykstant į užsienį",
            ],
          },
        ],
      },
    },
    {
      slug: "gyvunu-kirpykla",
      title: "Gyvūnų kirpykla",
      category: "profilaktika",
      summary: "Šunų ir kačių maudymas, kirpimas, trimingavimas, sąvėlų iššukavimas",
      homeSummary: "Šunų ir kačių maudymas, kirpimas, trimingavimas",
      showOnHome: true,
      homeOrder: 5,
      detail: {
        lead: "Kirpyklos paslaugos šunims ir katėms. Procedūros atliekamos atsižvelgiant į augintinio poreikius ir savijautą.",
        groups: [
          {
            title: "Šunims",
            items: [
              "Šunų maudymą",
              "Šunų kirpimą",
              "Šunų trimingavimą",
              "Šunų nukailinimą",
              "Plaukų sąvėlų iššukavimą",
              "Nagų karpymą ir ausų valymą",
            ],
          },
          {
            title: "Katėms",
            items: [
              "Kačių maudymą",
              "Kačių kirpimą",
              "Kačių nukailinimą",
              "Plaukų sąvėlų iššukavimą",
              "Nagų karpymą ir ausų valymą",
            ],
          },
        ],
      },
    },
    {
      slug: "laboratoriniai-tyrimai",
      title: "Laboratoriniai tyrimai",
      category: "diagnostika",
      summary: "Kraujo, šlapimo, citologiniai, koprologiniai, bakteriologiniai ir mikologiniai tyrimai",
      homeSummary: "Kraujo, šlapimo, citologiniai, bakteriologiniai tyrimai",
      showOnHome: true,
      homeOrder: 2,
      detail: {
        lead: "Laboratoriniai tyrimai padeda įvertinti augintinio sveikatos būklę ir nustatyti ligas.",
        paragraphs: [
          "Kraujo tyrimai — vienas būdų vertinti bendrą organizmo būklę. Morfologinio tyrimo metu įvertinamas kraujo ląstelių kiekis, tūris ir pasiskirstymas, nustatomi uždegimai, anemija ir kiti sutrikimai. Biocheminiai tyrimai leidžia įvertinti vidaus organų veiklą.",
          "Šlapimo tyrimai — fizinių, cheminių savybių ir mikroskopinis tyrimas, padedantis nustatyti šlapimo takų ligas ir kitus sutrikimus.",
          "Citologiniai tyrimai — ląstelių tyrimas mikroskopu, padedantis nustatyti uždegimus, infekcijas ar navikinius pakitimus.",
        ],
        groups: [
          {
            title: "Kraujo tyrimai",
            items: ["Morfologinis kraujo tyrimas", "Bendras biocheminis vidaus organų tyrimas", "Papildomi fermentų tyrimai"],
          },
          { title: "Šlapimo tyrimai", items: ["Biocheminis", "Mikroskopinis"] },
          { title: "Citologija", items: ["Su dažymu", "Be dažymo"] },
          { title: "Koprologiniai tyrimai", items: ["Su dažymu", "Be dažymo"] },
          {
            title: "Bakteriologiniai tyrimai",
            items: [
              "Šlapimo",
              "Išmatų",
              "Žaizdų, pūlių",
              "Burnos gleivinės",
              "Akių ir ausų sekreto",
              "Odos ir poodžio",
              "Kraujo",
              "Biopsinės medžiagos",
            ],
          },
          { title: "Mikologiniai tyrimai", items: ["Plaukų", "Odos skutmenų", "Nagų", "Žaizdų"] },
        ],
      },
    },
    {
      slug: "rentgenologija",
      title: "Rentgenologija",
      category: "diagnostika",
      summary: "Lūžiai, šlapimo pūslės akmenys, praryti svetimkūniai, nėštumas",
      homeTitle: "Rentgenas ir echoskopija",
      homeSummary: "Kaulų, vidaus organų ir nėštumo tyrimai",
      showOnHome: true,
      homeOrder: 3,
      detail: {
        lead: "Rentgeno spinduliai leidžia įvertinti augintinio kaulus, audinius ir vidaus organus.",
        paragraphs: [
          "Rentgeno nuotraukos taip pat gali padėti nustatyti tokias ligas kaip širdies ligos ar onkologiniai susirgimai.",
          "Rentgeno tyrimas neparodo detalių minkštųjų audinių, raiščių ar vidaus organų struktūros. Tokiais atvejais rekomenduojami kiti tyrimai, pavyzdžiui, ultragarsas ar MRT.",
          "Nors rentgeno tyrimas laikomas saugiu, tai yra spinduliuotė, todėl jis atliekamas tik tada, kai to reikia diagnostikai. Kai kuriais atvejais, pavyzdžiui, nustatant nėštumą, gali būti pasirenkamas ultragarsinis tyrimas.",
        ],
        groups: [
          {
            title: "Padeda diagnozuoti",
            items: [
              "Kaulų lūžius",
              "Šlapimo pūslės akmenis",
              "Prarytus svetimkūnius",
              "Padidėjusius organus",
              "Kai kuriuos navikus",
              "Nėštumą",
            ],
          },
        ],
        related: ["ultragarsinis-tyrimas"],
      },
    },
    {
      slug: "ultragarsinis-tyrimas",
      title: "Ultragarsinis tyrimas",
      category: "diagnostika",
      summary: "Vienos ar visų organų sistemų echoskopija, nėštumo nustatymas — neskausmingai",
      detail: {
        lead: "Echoskopija — greita ir neskausminga vidaus organų diagnostikos procedūra šunims, katėms ir kitiems augintiniams.",
        paragraphs: [
          "Procedūros metu veterinarijos gydytojas gali stebėti krūtinės, pilvo ir dubens organų būklę, aptikti ikisimptominius anatominius pakitimus, įvertinti kraujotakos sistemos veiklą ir anksti nustatyti ligas.",
          "Procedūra nėra skausminga ir nereikalauja bendrosios nejautros, išskyrus ypatingus atvejus. Klinika nurodo, kad tyrimui naudojama ultragarsinė įranga.",
        ],
        groups: [
          {
            title: "Atliekame",
            items: [
              "Vienos organų sistemos echoskopija",
              "Visų organų sistemų echoskopija",
              "Nėštumo nustatymas",
            ],
          },
          {
            title: "Krūtinės ląsta",
            items: ["Širdis, plaučiai, didieji kraujagyslių pakitimai"],
          },
          {
            title: "Pilvo ertmė",
            items: ["Kepenys, inkstai, blužnis, kasa, šlapimo pūslė"],
          },
          {
            title: "Dubens sritis ir nėštumas",
            items: ["Šlapimo takai, reprodukciniai organai", "Kiaušidės, gimda, vaisiai"],
          },
        ],
        related: ["kardiologija", "laboratoriniai-tyrimai", "chirurgija", "profilaktines-proceduros"],
      },
    },
    {
      slug: "dnr-genetiniai-tyrimai",
      title: "DNR ir genetiniai tyrimai",
      category: "diagnostika",
      summary: "Paveldimos ligos, kailio spalva, tėvystė — tyrimai Vokietijos laboratorijoje Laboklin",
      detail: {
        lead: "DNR tyrimo metu galima nustatyti paveldimas genetines ligas bei kailio spalvos paveldimumą, taip pat patvirtinti genetinius tėvystės ryšius.",
        paragraphs: ["Genetiniai tyrimai siunčiami į Vokietijos laboratoriją Laboklin."],
      },
    },
    {
      slug: "kardiologija",
      title: "Kardiologija",
      category: "gydymas",
      summary: "Širdies auskultavimas, kardiograma, širdies echoskopija",
      detail: {
        lead: "Kardiologija — širdies ir kraujagyslių ligų diagnostika bei gydymas. Gyvūnas, turintis širdies problemų, gali būti nukreiptas pas klinikos specialistą kardiologą.",
        paragraphs: [
          "Sutrikus širdies funkcijai, gali būti paveiktos ir kitos organų sistemos, pasikeičia kvėpavimas, ištvermė ir bendras gyvūno komfortas.",
        ],
        groups: [
          {
            title: "Kai kurie augintiniai gali patirti",
            items: ["Širdies ūžesius", "Širdies aritmijas", "Aukštą kraujospūdį (hipertenziją)"],
          },
          {
            title: "Dažniausiai atliekamos procedūros",
            items: ["Širdies auskultavimas", "Kardiograma", "Echoskopija (ultragarsinis širdies tyrimas)", "Rentgeno nuotraukos"],
          },
          {
            title: "Dažniausios gydomos ligos",
            items: [
              "Stazinis širdies nepakankamumas (CHF)",
              "Širdies raumenų ligos (dilatacinė ar hipertrofinė kardiomiopatija)",
              "Degeneracinė mitralinio vožtuvo liga",
              "Kosulys ir kvėpavimo problemos",
              "Įgimtos širdies ydos",
              "Širdies aritmijos",
              "Perikardo (širdies maišelio) ligos",
              "Širdies navikai",
              "Aukštas kraujospūdis (hipertenzija)",
              "Plaučių hipertenzija",
            ],
          },
          {
            title: "Dažniausiai pasireiškiantys simptomai",
            items: [
              "Kosulys dažnesnis nei įprastai, ypač fizinio krūvio metu",
              "Apsunkintas kvėpavimas",
              "Mažesnė ištvermė",
              "Padidėjusi pilvo ar krūtinės apimtis",
            ],
          },
        ],
        related: ["ultragarsinis-tyrimas", "rentgenologija", "laboratoriniai-tyrimai"],
      },
    },
    {
      slug: "dermatologija",
      title: "Dermatologija",
      category: "gydymas",
      summary: "Odos ir ausų ligų priežasčių paieška, odos citologija, Vudo lempos tyrimas",
      detail: {
        lead: "Gydytojai padeda išsiaiškinti odos ir ausų ligų priežastis bei parenka diagnostinius tyrimus.",
        paragraphs: [
          "Tikslas — kontroliuoti simptomus, suteikti komfortą ir ilgalaikę odos būklės kontrolę.",
          "Specialistai taip pat konsultuoja dermatologiniais klausimais ir padeda pasirinkti šampūnus, odos priežiūros priemones, pašaro papildus, hipoalerginius pašarus ir skanėstus.",
        ],
        groups: [
          {
            title: "Atliekame",
            items: [
              "Bendrą odos apžiūrą ir įvertinimą",
              "Odos citologiją",
              "Odos skutmenų tyrimą",
              "Ausų landų turinio citologiją",
              "Vudo lempos tyrimą",
            ],
          },
          {
            title: "Su laboratorijomis Lietuvoje ir užsienyje",
            items: ["Hormoniniai tyrimai", "Mikrobiologiniai tyrimai", "Mikologiniai tyrimai", "Biopsijos"],
          },
        ],
      },
    },
    {
      slug: "odontologija",
      title: "Odontologija",
      category: "gydymas",
      summary: "Burnos rentgenograma, higiena ultragarsiniu skaleriu, dantų poliravimas",
      homeSummary: "Burnos higiena ultragarsiniu skaleriu, burnos rentgenograma",
      showOnHome: true,
      homeOrder: 4,
      detail: {
        lead: "Burnos ertmės ir dantų priežiūra šunims, katėms ir graužikams. Apžiūra gali būti atliekama profilaktiškai arba pasikeitus apetitui, kramtymui ar elgesiui.",
        paragraphs: [
          "Burnos ertmėje esančios bakterijos, tinkamai neprižiūrint dantų, gali sukelti stomatitą, gingivitą, periodontitą, pulpitą ar parodontozę.",
          "Pirmasis žingsnis — burnos apžiūra. Esant poreikiui, naudojama burnos rentgenograma. Atsižvelgiant į situaciją, parenkamas medikamentinis gydymas, burnos higiena arba profilaktinės priemonės.",
          "Kokybiška burnos higiena atliekama tik gyvūnui esant bendrojoje nejautroje, todėl prieš procedūrą būtina įvertinti bendrą sveikatos būklę. Rekomenduojama atlikti kraujo morfologinius ir biocheminius tyrimus.",
        ],
        stepsTitle: "Kaip atliekama burnos higiena",
        steps: [
          { title: "Patikrinimas", text: "Atliekamas kruopštus burnos ertmės patikrinimas." },
          { title: "Valymas", text: "Dantys valomi ultragarsiniu skaleriu, šalinami dantų akmenys ir apnašos." },
          { title: "Poliravimas", text: "Atliekamas dantų poliravimas. Pažengus periodonto ligai, stipriai pažeistus dantis gali tekti ištraukti." },
        ],
        groups: [
          {
            title: "Kada kreiptis",
            items: [
              "Jaučiamas nemalonus burnos kvapas",
              "Pastebimos žaizdelės snukio srityje ar burnoje",
              "Padidėjęs seilėtekis",
              "Gyvūnas vengia kramtyti ar ėsti",
            ],
          },
          {
            title: "Atliekame",
            items: [
              "Burnos rentgenogramą",
              "Burnos higieną ultragarsiniu skaleriu",
              "Dantų poliravimą",
              "Pieninių ir nuolatinių dantų traukimą",
              "Graužikų dantų trumpinimą",
            ],
          },
        ],
        related: ["laboratoriniai-tyrimai"],
      },
    },
    {
      slug: "oftalmologija",
      title: "Oftalmologija",
      category: "gydymas",
      summary: "Akių apžiūra, refleksų tyrimai, akies dugno tyrimas",
      detail: {
        lead: "Reguliariai tikrinama akių būklė, ypač augintiniui senstant. Ankstyva diagnostika svarbi, nes kai kurios akių ligos sukelia skausmą ir gali baigtis regėjimo praradimu.",
        groups: [
          {
            title: "Galimi požymiai",
            items: [
              "Sunku orientuotis namų aplinkoje",
              "Dažnas prisimerkimas",
              "Žalsvos ar gelsvos išskyros iš akių",
              "Matomas trečiasis vokas",
              "Šviesos vengimas",
              "Vienos akies patinimas",
              "Dažnas akių trynimas",
              "Viena arba abi akys užmerktos",
            ],
          },
          {
            title: "Kas įeina į akių tyrimą",
            items: [
              "Akių ir vokų aplinkinių audinių apžiūra",
              "Šviesos refleksų tyrimas",
              "Mirksėjimo refleksų tyrimas",
              "Akies paviršiaus tyrimas su kontrastu",
              "Akies dugno tyrimas",
              "Akių fokusavimo įvertinimas",
            ],
          },
        ],
      },
    },
    {
      slug: "chirurgija",
      title: "Chirurgija",
      category: "chirurgija",
      summary: "Kastracija, sterilizacija, svetimkūnių šalinimas, onkologinė chirurgija ir daugiau",
      featured: true,
      highlight: "Daugiau nei 40 chirurginių procedūrų",
      homeSummary:
        "Prieš kiekvieną operaciją — išsamus būklės įvertinimas, kraujo tyrimai ir tinkamiausia nejautra. Po jos — priežiūra iki sklandaus gijimo.",
      homeCta: "Apie chirurgiją",
      detail: {
        lead: "Procedūras atlieka patyrę specialistai, naudodami modernią įrangą ir laikydamiesi aukščiausių saugumo standartų.",
        consult: "Konsultacija dėl operacijos",
        stepsTitle: "Kaip vyksta operacija",
        stats: [
          { value: "40+", label: "procedūrų" },
          { value: "6", label: "chirurgijos sritys" },
        ],
        steps: [
          {
            title: "Prieš operaciją",
            text: "Išsamus gyvūno būklės įvertinimas, kraujo tyrimai ir tinkamiausios nejautros parinkimas.",
          },
          {
            title: "Operacija",
            text: "Atlieka patyrę specialistai su modernia įranga, laikantis saugumo standartų.",
          },
          {
            title: "Po operacijos",
            text: "Tinkama priežiūra ir sklandus gijimas.",
          },
        ],
        groups: [
          {
            title: "Akušerija, ginekologija, urologija",
            items: [
              "Cezario pjūvis",
              "Makšties išsivertimo gydymas",
              "Katino ir šuns kastracija",
              "Katės ir kalės sterilizacija",
              "Chirurginis pyometros gydymas",
              "Kriptorchinių sėklidžių šalinimas",
              "Parafimozės chirurginis gydymas",
              "Apyvarpės plastika",
              "Varpos šalinimas",
            ],
          },
          {
            title: "Gastroenterologinė chirurgija",
            items: [
              "Svetimkūnių šalinimas",
              "Gastrotomija",
              "Skrandžio užsisukimo gydymas",
              "Skrandžio ir žarnų rezekcija",
              "Splenektomija",
              "Inksto šalinimas",
              "Tiesiosios žarnos išvirtimo gydymas",
              "Bambos, kirkšnies ir tarpvietės išvaržų operacijos",
              "Paranalinių liaukų šalinimas",
            ],
          },
          {
            title: "Onkologinė chirurgija",
            items: [
              "Akies vokų darinių šalinimas",
              "Ausies darinių šalinimas",
              "Odos ir poodžio darinių šalinimas",
              "Minkštųjų audinių navikų šalinimas",
              "Mastektomija (regioninė arba visos pusės)",
            ],
          },
          {
            title: "Oftalmologinė chirurgija",
            items: ["Vokų pakėlimas", "Trečiojo voko išvirtimo chirurginis gydymas", "Akies obuolio pašalinimas"],
          },
          {
            title: "Otorinolaringologija",
            items: ["Ausies kanalo plastika", "Ausies hematomos gydymas"],
          },
          {
            title: "Traumatologija",
            items: ["Kąstinių žaizdų apdorojimas ir siuvimas", "Pjautinių žaizdų apdorojimas ir siuvimas"],
          },
        ],
        related: ["laboratoriniai-tyrimai", "kraujo-perpylimas", "ultragarsinis-tyrimas"],
      },
    },
    {
      slug: "kraujo-perpylimas",
      title: "Kraujo perpylimas",
      category: "chirurgija",
      summary: "Atliekamas nustačius donoro ir recipiento kraujo grupes",
      detail: {
        lead: "Kraujo perpylimas — kraujo ar jo komponentų įleidimas į kraujotakos sistemą, siekiant atstatyti trūkstamas kraujo ląsteles ir stabilizuoti gyvūno būklę.",
        paragraphs: [
          "Procedūra atliekama tik iš anksto nustačius donoro ir recipiento kraujo grupes, įvertinus galimą riziką ir numatomą naudą.",
          "Veterinarijos gydytojas, įvertinęs gyvūno būklę, kraujo tyrimų rezultatus ir kitus diagnostinius tyrimus, nustato, ar kraujo perpylimas reikalingas.",
        ],
        groups: [
          {
            title: "Indikacijos",
            items: [
              "Sunkios traumos, sukėlusios intensyvų kraujavimą",
              "Onkologiniai susirgimai",
              "Įgyti ar įgimti kraujo krešumo sutrikimai",
              "Apsinuodijimas žiurknuodžiais",
              "Sisteminės ligos",
              "Infekcinės ligos",
            ],
          },
        ],
        related: ["laboratoriniai-tyrimai", "chirurgija"],
      },
    },
    {
      slug: "augintiniu-kremavimas",
      title: "Augintinių kremavimas",
      category: "atsisveikinimas",
      summary: "Individualus kremavimas sertifikuotame krematoriume, pelenai grąžinami urnoje",
      detail: {
        lead: "Klinika bendradarbiauja su sertifikuotu augintinių krematoriumu. Individualus kremavimas atliekamas tik jūsų augintiniui, o pelenai grąžinami pasirinktoje urnoje.",
        paragraphs: [
          "Jeigu pageidaujate, galima vaizdo įrašas, kuriame užfiksuotas augintinio įkėlimas į kremavimo kamerą.",
        ],
      },
    },
  ],
  specialists: [],
  showSpecialists: false,
  prices: [],
  pricesNote: "Kainas sužinosite paskambinę į kliniką.",
  reviews: [
    {
      author: "Gileta N.",
      rating: 5,
      text: "Norime padėkoti gydytojui Sauliui už sėkmingai atliktą operaciją mūsų augintiniui. Taip pat už rūpestį, profesionalumą, patarimus ir toliau pritaikytą gydymą.",
    },
    {
      author: "Gabija A.",
      rating: 5,
      text: "Labai rekomenduoju vet. gydytoją Laurą! Rūpestinga, maloni, padėjo visais klausimais!",
    },
    {
      author: "Martynas",
      rating: 5,
      text: "Rūpestingai, maloniai ir greitai atliko reikalingas procedūras — rekomenduoju. Ačiū.",
    },
  ],
  symptoms: [
    { text: "Dažnas kosulys fizinio krūvio metu, greitai pavargsta", service: "kardiologija" },
    { text: "Nemalonus burnos kvapas, vengia kramtyti", service: "odontologija" },
    { text: "Prisimerkia, trina akis, išskyros iš akių", service: "oftalmologija" },
    { text: "Odos ar ausų problemos, kurios nepraeina", service: "dermatologija" },
  ],
  values: [
    {
      title: "Individualus dėmesys",
      text: "Kiekvienas augintinis ir jo istorija skiriasi — todėl ir gydymo planas parenkamas individualiai.",
    },
    {
      title: "Tiksli diagnostika",
      text: "Rentgenas, echoskopija ir laboratoriniai tyrimai padeda nustatyti priežastį, o ne tik gydyti simptomus.",
    },
    {
      title: "Sveikata — svarbiausia",
      text: "Šiuolaikiniai gydymo metodai ir patyrę veterinarijos gydytojai, kad augintinis gyventų ilgai ir sveikai.",
    },
  ],
  partners: [
    {
      title: "Laboklin, Vokietija",
      text: "DNR ir genetiniai tyrimai — nuo planavimo iki rezultatų pasirūpiname mes.",
    },
    {
      title: "Laboratorijos Lietuvoje ir užsienyje",
      text: "Hormoniniai, mikrobiologiniai, mikologiniai tyrimai ir biopsijos.",
    },
    {
      title: "Sertifikuotas augintinių krematoriumas",
      text: "Individualus kremavimas, pelenai grąžinami pasirinktoje urnoje.",
    },
  ],
  googleRating: { score: 4.1, count: 291 },
  showRating: false,
  brand: {
    primary: "#1a1883",
    accent: "#b8403c",
    logo: `${photo}/brand-logo.png`,
    logoStyle: "badge",
  },
  socials: {
    facebook: "https://www.facebook.com/gyvunuedenas",
    instagram: "https://www.instagram.com/gyvunuedenas",
  },
  copy: {
    servicesLink: "Visos 14 paslaugų",
    servicesTitle: "Nuo profilaktinės apžiūros iki sudėtingos operacijos",
    servicesPageTitle: "14 paslaugų krypčių vienoje klinikoje",
    servicesPageText: "Nuo profilaktinės apžiūros iki chirurgijos ir kraujo perpylimo. Nežinote, ko reikia? Paskambinkite — patarsime.",
    aboutTitle: "Individualus dėmesys kiekvienam augintiniui",
    aboutPageTitle: "Rūpinamės augintiniais Kaune jau daugiau nei 20 metų",
    aboutPageLead:
      "„Gyvūnų Edenas“ veikia nuo 2004 metų. Gydome šunis, kates ir kitus smulkius gyvūnus — nuo profilaktikos iki sudėtingų operacijų.",
    valuesTitle: "Kuo remiamės kasdien",
    partnersTitle: "Kai reikia daugiau — dirbame su partneriais",
    aboutCtaTitle: "Užsukite į Kuršių g. 7 arba paskambinkite",
    ctaTitle: "Užsiregistruokite vizitui telefonu",
    ctaText: "Pasakykite, kas nutiko — suderinsime artimiausią laiką.",
    footerText: "Veterinarijos klinika Kaune nuo 2004\u00A0m.",
    contactTitle: "Kaip mus pasiekti",
  },
};
