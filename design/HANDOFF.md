# Design handoff — vet clinic template v2

The `.dc.html` files in this folder are the **approved design** (made in Claude Design, filled with real
Gyvūnų Edenas content). They are reference HTML: read them for exact layout, spacing, colours, typography,
copy structure and animations. Ignore the `<x-dc>`, `<helmet>`, `{{…}}` holes, `support.js` and the
`DCLogic` script — those are the design tool's runtime, not something to port.

| Design file | Route in the app |
|---|---|
| `Main.dc.html` | `/[clinic]` (Pagrindinis) |
| `Paslaugos.dc.html` | `/[clinic]/paslaugos` |
| `Chirurgija.dc.html` | `/[clinic]/paslaugos/[service]` — ONE dynamic template for every service |
| `Apie.dc.html` | `/[clinic]/apie` |
| `Kontaktai.dc.html` | `/[clinic]/kontaktai` |

The prices page (`/kainos`) stays, but is only shown in the nav when the clinic config has prices.

## Design tokens

- Fonts: **Bricolage Grotesque** (display/headings, weight 700, letter-spacing -0.02em) + **Manrope** (body, 400–800).
  Both via `next/font/google` with `subsets: ['latin','latin-ext']`. Both render ą č ę ė į š ų ū ž correctly.
- Colours (per clinic via config, defaults shown):
  - `brand` #1a1883 — headings, dark sections, hero of service pages
  - `accent` #b8403c — buttons, eyebrows, small highlights (white text on it passes contrast)
  - ink #14163a, body #3d4163, muted #555a7a, subtle #8a8eb0
  - ground #f5f6fb, surface #ffffff, tint #f1f1fa, placeholder #e6e8f5, line #e3e5f0 / #dcdfee
  - footer #0f1046
- Radius: cards 20–24px, large blocks 28–32px, buttons/pills fully rounded.
- Container: max-width 1200px, side padding 32px (18px on phones).
- Section rhythm: 88–96px vertical padding; eyebrow (13.5px, 700, uppercase, 0.08em, accent) → H2 → content.

## Components to build (all content from config)

- TopBar (brand bg): hours + address left, phone right.
- Header (white): logo badge (white rounded container, border) + name + subtitle, nav, "Skambinti" button.
- Hero (home): eyebrow pill, H1, lead, two buttons (call + "Visos paslaugos"), 3 check-points, photo with a
  floating hours card overlapping its bottom-left corner.
- FactsStrip (brand bg): 4 facts `{value, label}`; numeric values count up once when in view.
- ServicesIndex (home): one large featured service card (brand bg) + numbered list of 5 services with arrow buttons.
- Symptoms ("Kada kreiptis"): left intro + CTA, right grid of `{symptom, serviceSlug}` cards linking to the service.
- AboutSplit: photo + text + 3 check-points + link.
- Reviews: grid of review cards (stars, quote, name) + "Palikti atsiliepimą" (Google write-review link).
- CtaBand: brand block with headline, phone button, hours.
- Footer: 4 columns.
- ServicesPage: page head with category jump-pills, then one block per category: left (number, title,
  short text), right (rows: title | description | arrow).
- ServicePage: brand hero (breadcrumb, title, lead, 2 stat tiles), main column (process steps, procedure
  groups as cards with bullet lists, related services), sticky-free side card (phone, hours, price note) + photo.
- AboutPage: hero with huge year, values (3 columns under a 2px brand rule), partners list, team grid, CTA.
- ContactsPage: big phone block (brand), details card (address, email, hours), map.
- Photo placeholders: when a config photo is missing, render a tinted block with a small label — never broken images.

## Config additions (extend the `Clinic` type)

```ts
facts?: { value: string; label: string; countUp?: boolean }[];
heroPoints?: string[];                       // the 3 check-points under the hero buttons
serviceCategories: { id: string; title: string; text?: string }[];
services: {
  slug: string; title: string; category: string;   // category = serviceCategories[].id
  summary: string;                                  // one line, used in lists
  featured?: boolean;                               // the big card on home
  showOnHome?: boolean;                             // the numbered list on home (max 5)
  detail?: {
    lead: string;
    stats?: { value: string; label: string }[];
    steps?: { title: string; text: string }[];
    groups?: { title: string; items: string[] }[];  // procedure lists
    paragraphs?: string[];
    related?: string[];                             // service slugs
  };
}[];
symptoms?: { text: string; service: string }[];   // service slug
values?: { title: string; text: string }[];
partners?: { title: string; text: string }[];
team?: { name: string; role: string; photo?: string }[];  // hide section if empty
```

All copy must come from the config. No clinic-specific text in components.

## Animations (Framer Motion, already in the project)

Use the existing presets in `lib/motion.ts` where they fit; the design adds:
- Hero load: children of the hero text column stagger in — opacity 0→1, y 32→0, spring
  (stiffness 150, damping 30), 0.1s apart. Hero photo: opacity 0→1, scale 1.06→1, softer spring, 0.15s delay.
- Scroll reveal (whileInView, once, amount 0.2): sections' direct children, list rows, cards, review cards —
  opacity 0→1, y 32→0. Grid/list items stagger 0.06–0.08s.
- Hover: cards lift `y: -6` with a soft shadow (0 18px 40px rgba(20,22,58,.12)); service-row arrows slide `x: 5`;
  buttons lift `y: -2`. 0.4s ease [0.22,1,0.36,1].
- Hero photo parallax: translateY 0→70px over the first ~900px of page scroll (`useScroll` + `useTransform`).
- FactsStrip count-up: 0→value over 1.4s, ease-out cubic, triggered once in view.
- Respect `prefers-reduced-motion` (no movement, content visible immediately).
