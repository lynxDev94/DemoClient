<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Multi-clinic veterinary website template for small Lithuanian clinics. One Next.js app serves every clinic. Shared pages and components render a `Clinic` config; they do not contain a clinic's own copy.

`/` lists clinics only when `NODE_ENV` is `development`. In production it is a minimal page with no clinic list, and it is `noindex`. Each clinic lives at `/[clinic]` with `paslaugos`, `paslaugos/[service]`, `apie`, `specialistai`, `kainos`, and `kontaktai`. `/kainos` stays in the nav only when `prices.length > 0`. `/specialistai` stays in the nav only when `showSpecialists` is not `false`. One service template (`Chirurgija` layout) renders every service from the config.

## Folders

- `app/` — routes and layouts. `app/[clinic]/layout.tsx` loads the clinic, sets brand CSS variables, and wraps header, main, and footer.
- `clinics/` — `types.ts` (`Clinic`), `index.ts` (slug registry), and one `<slug>.ts` per clinic.
- `components/` — `home/` page sections, `site/` chrome, `motion/` wrappers, `prices/`, `ui/` primitives.
- `lib/` — `labels.ts` (shared Lithuanian UI copy), `motion.ts` (animation presets), `format.ts`, `icons.tsx`, `load.ts` (`requireClinic`).
- `public/photos/` — shared stock photos, referenced as `/photos/<file>`.
- `public/clinics/[slug]/` — photos that belong to one clinic, referenced as `/clinics/<slug>/<file>`.

## Clinic configs

`Clinic` is defined in `clinics/types.ts`: slug, `published`, name, optional `legalName`, tagline, optional `subtitle`, phone, optional email, address, map embed, optional `locationPhoto`, hours, about (text, optional founded year, photos, optional `background`, optional `pagePhoto`), optional `heroEyebrow`, optional `heroPoints`, optional `aboutPoints`, optional `facts`, optional `servicesPhoto`, required `serviceCategories`, `services` (`slug`, `title`, `category`, `summary`, optional `featured`, `showOnHome`, `highlight`, `homeTitle`, `homeSummary`, `homeCta`, optional `detail` with lead, stats, steps, groups, paragraphs, related slugs), specialists, optional `showSpecialists`, prices, optional `pricesNote`, reviews, optional `symptoms`, `values`, `partners`, `team` (hidden when empty), optional `lead`, optional `copy`, optional Google rating, optional `showRating`, optional `googlePlaceId`, brand colors, optional `brand.logo`, optional `brand.logoStyle` (`badge` or `plain`, default `badge`), optional socials. A photo is a public path or `{ src, focus }`. `focus` is a CSS `object-position`, for example `center 30%`. Facts, hero points, symptoms, reviews, values, partners, team, and empty service-detail blocks hide when they have no data. A service has a page at `/[clinic]/paslaugos/[slug]` only when `detail` has a lead plus steps, groups, or paragraphs. Otherwise it is a static row. Nav shows Apie mus, Kainos, and Specialistai only when that page has real content. A specialist named `Gydytojas veterinaras` with no photo is a placeholder and does not count. Hero, about, and service-sidebar photos fall back to stock in `public/photos/` when the clinic has none. Any other missing photo is a tinted placeholder with a label, never a broken image.

Each clinic file exports `const clinic: Clinic`. Next.js cannot bundle a fully dynamic import path, so `clinics/index.ts` maps each slug to a static loader. Add a clinic by editing that map; `getClinic` and `getAllClinics` read only the registry. `brandStyle` turns `brand.primary` and `brand.accent` into CSS variables.

Service icons are not part of the config. The home page shows one `featured` service that also has a detail page, and at most five `showOnHome` services. Without a featured detail page the list is full width.

## Add a clinic

1. Create `clinics/<slug>.ts` and export `clinic` matching `Clinic`. `slug` must match the filename and the registry key.
2. Add one loader line to the `registry` in `clinics/index.ts`.
3. Put clinic photos in `public/clinics/<slug>/` and reference them as `/clinics/<slug>/<file>`. If that folder is empty, use stock files from `public/photos/`.
4. Do not add a route file. `app/[clinic]` already covers every registered slug.

## Photos

Shared stock stays in `public/photos/`. Photos for one clinic go in `public/clinics/<slug>/`. Configs hold the public paths (`about.photos`, `specialists[].photo`, optional `locationPhoto`). If `public/clinics/<slug>/` has files, use those. Otherwise use stock. Render them with `components/site/photo.tsx` (`next/image`, `fill`). Do not import image files from `clinics/` or hardcode a photo path inside a section component.

A photo may be a string or `{ src, focus }`. `focus` is the CSS `object-position` (`center 30%` keeps a face in frame). The hero source (`about.photos[0]`) must be at least 1200px wide. Every other photo must be at least 800px wide. `lib/photo-fit.ts` swaps anything smaller for a sharp stock photo and logs the swap. Prefer a sharp stock photo over a blurry clinic photo.

## Logo

`brand.logoStyle` is `badge` or `plain`. The default is `badge`: a 46px white rounded container with a hairline border, next to the clinic name and optional subtitle. The image is not stretched. A wide wordmark is cropped toward its mark inside that square; the name is set in type beside it. `plain` draws the file alone. If the mark is not readable at 46px, say so in the QA report. Do not enlarge it to fill the header.

## Animation

Framer Motion only, presets only from `lib/motion.ts`. Do not invent a second spring or inline a one-off transition.

Default spring: `{ type: "spring", stiffness: 150, damping: 30, mass: 1 }`.

- `fadeUp` — opacity 0→1, y 32→0, in view once, `amount: 0.2`
- `heroIn` + `heroInItem` — hero text column, stagger 0.1s, y 32
- `heroPhotoIn` / `heroImage` — scale 1.06→1, stiffness 80, damping 28, delay 0.15 (on mount)
- Hero photo parallax: `useScroll` + `useTransform`, translateY 0→70 over the first 900px. Not a CSS scroll timeline.
- `listStagger` + `listItem` — stagger 0.07s, y 32
- Facts count up once in view, 1.4s, ease-out cubic (`components/motion/count-up.tsx`)
- Hover: cards `y: -6` with shadow `0 18px 40px rgba(20,22,58,.12)`; buttons `y: -2`; row arrows `x: 5`. Duration 0.4s, ease `[0.22, 1, 0.36, 1]` (`hoverMove`)
- `sectionHead` — opacity, y 20→0, scale 1.1→1, in view once, `amount: 0.3`
- `fromLeft` / `fromRight` — x ±80
- `fromLeftFar` / `fromRightFar` — x ±440, `hidden` / `show` variants
- `heroItem(delay)` — fade up on mount
- `navIn` — x -10→0, delay 0.2
- `cardStagger` + `cardItem` — `staggerChildren: 0.08`, then y 32
- `pawLeft` / `pawRight` — drop in with rotation

`components/motion/motion-root.tsx` sets `reducedMotion="user"`. Wrappers in `components/motion/reveal.tsx` (`FadeUp`, `SectionHead`, `Stagger`, `StaggerItem`, `HeroBlock`, `HeroPhoto`, `SlideIn`) render a plain `div` when `useReducedMotion()` is true. Any new motion follows that bailout.

## Rules

- User-facing text is Lithuanian. `app/layout.tsx` sets `lang="lt"`. Shared chrome (nav, buttons, section titles, empty states) lives in `lib/labels.ts`. Clinic-specific copy lives only in `clinics/<slug>.ts`.
- No booking. No forms, calendars, or “book online” links. The only conversion is a `tel:` link (`labels.call`, “Skambinti”).
- Do not hardcode a clinic name, phone, address, price, review, service, or photo in a component. Pass `clinic` or read `labels`.
- Every clinic is `published: false` until it is a paying customer. `published: false` sends `noindex, nofollow`. Only `published: true` may be indexed. The `/` page is always `noindex`.
- Headings use Bricolage Grotesque from `next/font/google` with `subsets: ['latin', 'latin-ext']`, exposed as `--font-fraunces` so `font-serif` stays. Body text uses Manrope on `--font-outfit`. Display letter-spacing is `-0.02em`.
- All fonts must support Lithuanian (test ą č ę ė į š ų ū ž).

## Adding a new clinic: rules

Use only the data the user provides. Never invent facts: no founding year, awards, staff names, home visits, emergency care, equipment, or specialisations unless they are listed.

- Reviews: only the ones the user pastes, and only 5-star reviews. Never edit their wording.
- Services: only those the user lists. If none are listed, use these generic ones: Apžiūra, Vakcinacija, Vidaus ligos, Chirurgija.
- Prices: no numbers. Use `Kaina - pagal konsultaciją`.
- Specialists: placeholder `Gydytojas veterinaras`, no names, no photos. Hide the specialists stat.
- Texts: natural Lithuanian, short, neutral. The hero one-liner and the About text must differ. No promises (no `skubi pagalba`, `atsilieps žmogus`, and similar) unless the user says so.
- Photos: use files in `public/clinics/[slug]/` when that folder has any. Otherwise use stock photos from `public/photos/`. Hero files must be at least 1200px wide and other photos at least 800px wide. Set `focus` when a crop would cut a face or the building sign. Prefer a sharp stock photo over a blurry clinic photo.
- Colours: a calm palette different from the other clinics.
- `published: false` until the clinic is a paying customer.

After creating the config: run the dev server, open `/[slug]` and every subpage, fix errors, then list every text you wrote yourself so the user can check it.

## Visual QA

Required after creating or editing a clinic. Run `npm run shots -- <slug>`. Playwright saves `/<slug>` and every subpage at 1440px and 390px to `tmp-agent/shots/` (gitignored). Look at every screenshot before calling the work done. Fix logos that clash with the header, cropped heads or faces, blurry or pixelated images, empty sections, text overflow, broken Lithuanian letters (ą č ę ė į š ų ū ž), and buttons that wrap badly on mobile. Report what you fixed. Do not say the clinic is done until the shots look clean.
