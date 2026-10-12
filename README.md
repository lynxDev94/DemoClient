# Veterinarijos klinikų šablonas

Next.js svetainė nedidelėms Lietuvos veterinarijos klinikoms. Visas klinikos tekstas, spalvos, kainos ir nuotraukos yra viename faile.

## Paleisti

```bash
npm install
npm run dev
```

- `/` — klinikų sąrašas
- `/berzu` — Beržų veterinarijos klinika
- `/pajuris` — Pajūrio veterinarija

## Nauja klinika

1. Sukurkite `clinics/<slug>.ts` ir eksportuokite `clinic` pagal `clinics/types.ts`.
2. Pridėkite eilutę į `clinics/index.ts` registrą.
3. Nuotraukas dėkite į `public/photos/` ir faile nurodykite kelius, pavyzdžiui `/photos/hero.jpg`.
4. `services[].icon` — Lucide pavadinimas iš leidžiamo sąrašo: `Stethoscope`, `Syringe`, `Toothbrush`, `Scissors`, `ScanLine`, `Ambulance`, `Microscope`, `PawPrint`, `Heart`, `Bone`, `Shield`.

Pagrindinis veiksmas visur yra `Skambinti` (`tel:`). Registracijos formos nėra.
