# Recreate lundychan.com — Wastend project page (+ linked pages)

## Context
The user owns the portfolio site at lundychan.com and wants a faithful recreation of the
**Wastend** project page plus the pages linked from it, as a clickable, responsive prototype.
This is their own design, content, and imagery — the goal is faithful reproduction, not redesign.

This environment (Figma Make) produces a **live React + Tailwind web app**, not an editable
`.fig` document. The Figma concepts map as follows:
- "Frames" → routed pages (react-router, already installed at v7.13.0)
- "Responsive frames 1440/768/390" → responsive Tailwind breakpoints in one app
- "Reusable components / Auto Layout" → React components with flex/grid
- "Layer naming" → clear component + section naming and comments
- "Clickable prototype / linked interactions" → real `<Link>` navigation + outbound `<a>` links

**Images:** The user will upload the real assets (hero composition, phone mockups, visual-identity
board, project thumbnails). Until then, each image location is a clearly-labeled placeholder slot
using `ImageWithFallback` so uploads drop straight in. No generic stock, no redesign.

## Verified source structure (from lundychan.com)
Navigation (all pages): **Projects** `./` · **Writing Samples** `./writing-samples` · **Info** `./Info`
Footer: `©LundyCHAN 2023`

### Wastend page scroll structure
1. **Hero** — Title "Wastend"; tagline "Navigate local recycling rules with confidence."; body
   (recycling companion for residents/newcomers/travellers); meta: Date 2026 · Team Solo ·
   Scope: product design, local policy research & data structuring. Hero image composition.
2. **WHY THE PROBLEM EXISTS** — "The same item. Different rules." + supporting paragraph.
3. **Reference** — dense, clickable source list grouped by country (external links, verified URLs
   listed below). Keep dense text treatment.
4. **HOW WASTEND WORKS** — "From scattered sources to structured guidance." + scattered-sources
   paragraph + stage/flow diagram visual.
5. **WHAT USERS GET** — "From uncertainty to action." + four feature blocks: **Search**, **Guide**,
   **Compare**, **Saved** — each with caption + phone mockup slot.
6. **VISUAL IDENTITY** — "The system that holds it together." + visual-identity board slot
   (logo, colour, category coding, type, icon language).
7. **Up Next** — "Search with Intuitiveness / WeChat Redesign" → links to `/WeChat-Redesign`.

### External reference URLs (keep as outbound links, open in new tab)
- HK: elegislation.gov.hk/hk/cap603, /hk/cap354; epd.gov.hk PSB charge page
- Japan: 3 japaneselawtranslation.go.jp PDFs (Acts 137/1970, 112/1995, 110/2000); plastic-circulation.env.go.jp
- Korea: elaw.klri.re.kr (hseq 46237; hseq 62551); urbansdgplatform.org VBWF case
- Denmark: eng.mst.dk EPR; producentansvar.dk packaging; vejle.dk sorting; international.kk.dk recycling; practiceguides.chambers.com env-law-2025 Denmark
- Sweden: naturvardsverket.se packaging EPR; government.se Ds 2000:61

## Pages to build (routes)
| Route | Page |
|-------|------|
| `/` | Home / Projects (9 projects + nav + footer) |
| `/Wastend` | Wastend project page (full scroll structure above) |
| `/writing-samples` | Writing Samples (3 samples w/ subtitle, date, type, length, keywords) |
| `/Info` | Info (Education, Skillset, Experience, CV link, LinkedIn) |
| `/WeChat-Redesign` | "Search with Intuitiveness" WeChat Redesign (linked from Up Next) |

Home project list & links (verified): Wastend `/Wastend`; Search with Intuitiveness `/WeChat-Redesign`;
Beyond the Diploma `/hkwomen-diploma-visualisation`; Visual Directions `/selected-graphics`;
At the Edge of Voice `/at-the-edge-of-voice`; Unseen Gestures / Lingo Trap `/lingo-trap-echibit`;
Rules for Sorting `/rules-for-sorting`; Breathing Paper `/breathing-paper`; Pomodoroutine `/Pomodoro`.
Only the 5 pages above get full frames; other project links point to a lightweight
"coming soon"/stub route (or scroll anchor) so the home grid stays clickable without dead links.

## Implementation

### Routing & shell
- `src/app/App.tsx`: wrap in react-router (`createBrowserRouter` / `<Routes>`), define the 5 routes
  + a catch-all stub page. Shared layout with `<TopNav>` + `<Footer>` + `<ScrollToTop>` on route change.

### Reusable components (`src/app/components/`)
- `top-nav.tsx` — Projects / Writing Samples / Info, with hover states + active state.
- `footer.tsx` — `©LundyCHAN 2023`.
- `section-heading.tsx` — eyebrow label (e.g. "WHY THE PROBLEM EXISTS") + large main line.
- `project-meta.tsx` — Date / Team / Scope block.
- `feature-block.tsx` — title + caption + phone-mockup slot (alternating layout).
- `reference-list.tsx` — grouped dense clickable source list (outbound `target="_blank" rel="noreferrer"`).
- `up-next.tsx` — clickable card linking to the next project.
- `mockup-frame.tsx` — rounded image/phone container using `ImageWithFallback`.
- `reveal.tsx` — scroll-reveal wrapper (motion `whileInView`: subtle fade + ~16px rise, soft ease).

### Pages (`src/app/pages/`)
- `home.tsx`, `wastend.tsx`, `writing-samples.tsx`, `info.tsx`, `wechat-redesign.tsx`, `stub.tsx`.
- All Wastend copy transcribed verbatim from source (no summarizing).

### Styling / visual tone
- `src/styles/fonts.css`: import a clean grotesque/sans (e.g. Inter or similar) at file top for the
  soft research-driven feel; adjust once user confirms the exact typeface.
- `src/styles/theme.css`: add pale background + muted green/grey/blue tokens as CSS variables;
  rounded card radius. Large heading rhythm, generous section spacing, wide margins.
- Responsive: desktop-first layout that reflows cleanly at `md` (768) and base (390).

### Images
- Every image is an `ImageWithFallback` with a labeled placeholder + `alt` describing the intended
  asset. When the user uploads, import the asset as an ES module and swap the `src` binding.

### Motion
- Subtle only: fade + slight vertical movement on section reveal, hover transitions on nav/links/
  cards/Up Next. Respect `prefers-reduced-motion`.

## Verification
- Run the app in the preview surface; navigate: Home → Wastend → (Up Next) WeChat Redesign, and all
  nav links (Projects / Writing Samples / Info). Confirm no dead internal links.
- Click each external reference link → opens correct URL in a new tab.
- Resize to 1440 / 768 / 390 and confirm layout reflow, image scaling, and section order hold.
- Confirm scroll-reveal fires once per section and hover states work on nav/cards/Up Next.
- After user uploads real assets, replace placeholder slots and re-verify cropping/proportions.
