<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Multi-clinic veterinary website template for small Lithuanian clinics. One Next.js app serves every clinic. Shared pages and components render a `Clinic` config; they do not contain a clinic's own copy.

`/` lists clinics only when `NODE_ENV` is `development`. In production it is a minimal page with no clinic list, and it is `noindex`. Each clinic lives at `/[clinic]` with `paslaugos`, `apie`, `specialistai`, `kainos`, and `kontaktai`.

## Folders

- `app/` — routes and layouts. `app/[clinic]/layout.tsx` loads the clinic, sets brand CSS variables, and wraps header, main, and footer.
- `clinics/` — `types.ts` (`Clinic`), `index.ts` (slug registry), and one `<slug>.ts` per clinic.
- `components/` — `home/` page sections, `site/` chrome, `motion/` wrappers, `prices/`, `ui/` primitives.
- `lib/` — `labels.ts` (shared Lithuanian UI copy), `motion.ts` (animation presets), `format.ts`, `icons.tsx`, `load.ts` (`requireClinic`).
- `public/photos/` — shared stock photos, referenced as `/photos/<file>`.
- `public/clinics/[slug]/` — photos that belong to one clinic, referenced as `/clinics/<slug>/<file>`.

## Clinic configs

`Clinic` is defined in `clinics/types.ts`: slug, `published`, name, tagline, phone, optional email, address, map embed, optional `locationPhoto` (the building, shown on the contact page), hours, about (text, optional founded year, photos, optional `background` for the home about block, optional `pagePhoto` for the Apie page), optional `servicesPhoto` for the Paslaugos page, services, specialists, prices, reviews, optional Google rating, brand colors, optional socials.

Each clinic file exports `const clinic: Clinic`. Next.js cannot bundle a fully dynamic import path, so `clinics/index.ts` maps each slug to a static loader. Add a clinic by editing that map; `getClinic` and `getAllClinics` read only the registry. `brandStyle` turns `brand.primary` and `brand.accent` into CSS variables.

`services[].icon` must be a key in `lib/icons.tsx`: `Stethoscope`, `Syringe`, `Toothbrush`, `Scissors`, `ScanLine`, `Ambulance`, `Microscope`, `PawPrint`, `Heart`, `Bone`, `Shield`. Unknown names fall back to `PawPrint`.

## Add a clinic

1. Create `clinics/<slug>.ts` and export `clinic` matching `Clinic`. `slug` must match the filename and the registry key.
2. Add one loader line to the `registry` in `clinics/index.ts`.
3. Put clinic photos in `public/clinics/<slug>/` and reference them as `/clinics/<slug>/<file>`. If that folder is empty, use stock files from `public/photos/`.
4. Do not add a route file. `app/[clinic]` already covers every registered slug.

## Photos

Shared stock stays in `public/photos/`. Photos for one clinic go in `public/clinics/<slug>/`. Configs hold the public paths (`about.photos`, `specialists[].photo`, optional `locationPhoto`). If `public/clinics/<slug>/` has files, use those. Otherwise use stock. Render them with `components/site/photo.tsx` (`next/image`, `fill`). Do not import image files from `clinics/` or hardcode a photo path inside a section component.

## Animation

Framer Motion only, presets only from `lib/motion.ts`. Do not invent a second spring or inline a one-off transition.

Default spring: `{ type: "spring", stiffness: 150, damping: 30, mass: 1 }`.

- `fadeUp` — opacity 0→1, y 20→0, in view once, `amount: 0.2`
- `sectionHead` — opacity, y 20→0, scale 1.1→1, in view once, `amount: 0.3`
- `fromLeft` / `fromRight` — x ±80
- `fromLeftFar` / `fromRightFar` — x ±440, `hidden` / `show` variants
- `heroImage` — scale 1.3→1, stiffness 100, delay 0.2 (plays on mount, not in view)
- `heroItem(delay)` — fade up on mount
- `navIn` — x -10→0, delay 0.2
- `cardStagger` + `cardItem` — `staggerChildren: 0.08`, then y 20
- `pawLeft` / `pawRight` — drop in with rotation

`components/motion/motion-root.tsx` sets `reducedMotion="user"`. Wrappers in `components/motion/reveal.tsx` (`FadeUp`, `SectionHead`, `Stagger`, `StaggerItem`, `HeroBlock`, `HeroPhoto`, `SlideIn`) render a plain `div` when `useReducedMotion()` is true. Any new motion follows that bailout.

## Rules

- User-facing text is Lithuanian. `app/layout.tsx` sets `lang="lt"`. Shared chrome (nav, buttons, section titles, empty states) lives in `lib/labels.ts`. Clinic-specific copy lives only in `clinics/<slug>.ts`.
- No booking. No forms, calendars, or “book online” links. The only conversion is a `tel:` link through `PhoneButton` (`labels.call`, “Skambinti”).
- Do not hardcode a clinic name, phone, address, price, review, service, or photo in a component. Pass `clinic` or read `labels`.
- Every clinic is `published: false` until it is a paying customer. `published: false` sends `noindex, nofollow`. Only `published: true` may be indexed. The `/` page is always `noindex`.
- Headings use Newsreader from `next/font/google` with `subsets: ['latin', 'latin-ext']`, exposed as `--font-fraunces` so `font-serif` stays. Body text uses Outfit with the same subsets.
- All fonts must support Lithuanian (test ą č ę ė į š ų ū ž).

## Adding a new clinic: rules

Use only the data the user provides. Never invent facts: no founding year, awards, staff names, home visits, emergency care, equipment, or specialisations unless they are listed.

- Reviews: only the ones the user pastes, and only 5-star reviews. Never edit their wording.
- Services: only those the user lists. If none are listed, use these generic ones: Apžiūra, Vakcinacija, Vidaus ligos, Chirurgija.
- Prices: no numbers. Use `Kaina - pagal konsultaciją`.
- Specialists: placeholder `Gydytojas veterinaras`, no names, no photos. Hide the specialists stat.
- Texts: natural Lithuanian, short, neutral. The hero one-liner and the About text must differ. No promises (no `skubi pagalba`, `atsilieps žmogus`, and similar) unless the user says so.
- Photos: use files in `public/clinics/[slug]/` when that folder has any. Otherwise use stock photos from `public/photos/`.
- Colours: a calm palette different from the other clinics.
- `published: false` until the clinic is a paying customer.

After creating the config: run the dev server, open `/[slug]` and every subpage, fix errors, then list every text you wrote yourself so the user can check it.
