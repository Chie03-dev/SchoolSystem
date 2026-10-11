# Marben - Sellable Student Portal (Frontend-Only Showcase)

## Objective
Plan a new frontend-only student-side school system, branded **"Marben"**, with premium UI/UX inspired by 21st.dev and modern architecture, to sell to school clients: a cinematic editorial landing page plus a calm, real student portal. Philippine DepEd context, English copy, static mock data, no backend. All "live" behavior (save attendance, pay fees, toggle switches) uses ephemeral React state + toasts.

## Resolved Decisions (confirmed with user)
| Decision | Choice |
| --- | --- |
| Product goal | Sellable product = marketing landing + live portal demo |
| Modules | Dashboard, Courses & lessons, Grades & reports, Schedule & calendar, Attendance, Fees & payments, Assignments & quizzes, Announcements & messages, Digital student ID, Login page |
| Visual style | **Editorial / warm** (paper & clay), not dark SaaS |
| Motion | Mixed: calm app UI (120–300ms), cinematic scroll-driven landing |
| Stack | Next.js 15 (App Router) + React 19 + Tailwind v4 + shadcn/ui + Framer Motion |
| Data | Static mock data only, no persistence |
| Context | Philippine DepEd (LRN, Strands, Form 137/138, PHP) |
| Auth | Login page + one-click demo role switcher (no real auth) |
| Branding | Generic school theme; use "Marben" in place of a real school name |
| Landing sections | Hero + animated product preview, Social proof/stats, Feature showcase grid, How it works, Final CTA + footer (no testimonials/pricing/FAQ) |
| Portal feel | Editorial landing + calmer app UI; mobile and desktop equally |
| Copy | English only |
| Typography | Serif display (Fraunces) + sans UI (Geist) |

## Design Language - "Paper & Clay" (Warm Editorial)
Tokens to define in Tailwind v4 `@theme` (`src/app/globals.css`):

- `--paper: #FAF7F1` (page bg), `--surface: #FFFFFF`, `--surface-2: #F4EFE6` (alt rows/panels)
- `--ink: #1C1917`, `--ink-muted: #57504A`, `--ink-faint: #8B8178`
- `--hairline: #E6DDCF`, `--hairline-strong: #D3C5B0`
- `--clay: #B4552D` (primary accent), `--clay-hover: #8F4222`
- `--sage: #6E7F5C` (support accent)
- status: ok `#4C7A54`, warn `#B8862D`, danger `#A63D2E`
- radii: 8 / 10 / 14 px; warm-tinted soft shadows (no pure black `rgba`); subtle paper-grain texture overlay (CSS/SVG, low opacity)
- Type: Fraunces display (fluid `clamp()` hero), Geist UI; tabular numerals for stats/grades
- Fonts via `next/font/google` → `--font-display`, `--font-sans` CSS vars
- Motion contract: spring ease 120–300ms, `MotionConfig reducedMotion="user"`, tilt/parallax off on touch + reduced-motion

## Component Kit
- Custom motion kit (`src/components/motion/`): `Reveal`, `TextReveal`, `AnimatedCounter`, `BorderBeam`, `Tilt`, `BrowserFrame`, `Marquee`, `ProgressRing`, `MagneticButton`
- App patterns: ⌘K command palette, sonner-style toasts, ID card 3D flip, printable report card, segmented controls, stat cards, timeline, progress rings, iOS-style switches, QR-style placeholder

## Architecture
- Route groups: `(marketing)` and `(app)/portal`
- Folder tree:
```
src/
  app/
    layout.tsx
    globals.css
    providers.tsx
    (marketing)/layout.tsx  page.tsx  login/page.tsx
    (app)/portal/layout.tsx  dashboard/  courses/  courses/[id]/
      grades/  schedule/  attendance/  fees/  assignments/
      announcements/  id/           (all page.tsx)
  components/{ui,marketing,portal,motion}/
  data/marben/{student,courses,grades,schedule,attendance,fees,assignments,announcements}.ts
  lib/{cn,format,grades,ics}.ts
public/ (logos, og image, texture)
```
- Data persona (deterministic, no `Date.now()` at module scope - SSR/hydration safe): **Althea M. Reyes**, Grade 11 – STEM, Section A, LRN 136004120087. Use a fixed reference date constant in `src/data/marben/student.ts`.
- ~11 static routes total.

## Module Specs
- **Login**: centered editorial card on paper bg, email/password + demo role switcher ("Sign in as Althea"), remembers role in localStorage (optional), routes to `/portal/dashboard`.
- **Dashboard**: welcome + date, next-class countdown, today's schedule list, grade snapshot, pending work, fee status, announcement feed, quick links.
- **Courses**: grid of subject cards (code, teacher, room, progress); detail page `[id]` with modules/lessons list.
- **Grades**: term selector, per-subject table with quarters, GWA + rank, progress bars, Form 138-style report card (printable).
- **Schedule**: weekly grid + list view, current-day highlight, ICS export via `lib/ics.ts`.
- **Attendance**: monthly summary (present/absent/late/tardy), per-day records, percentage ring.
- **Fees**: balance summary, itemized breakdown, payment history, staggered "pay now" demo (state only).
- **Assignments**: upcoming vs. submitted tabs, status chips, detail drawer with rubric.
- **Announcements**: feed with filters/categories, pinned items, read/unread.
- **Digital ID**: front/back card, 3D flip, QR placeholder, "Add to Wallet" demo.

## Landing Sections
1. **Hero** - eyebrow, serif headline, sub, dual CTA; animated product preview in a `BrowserFrame` (dashboard mock animating in, `BorderBeam` accent).
2. **Social proof** - `AnimatedCounter` stats (schools, students, attendance rate, on-time), logo-style wordmarks.
3. **Feature grid** - 8–10 module cards with icons, hover lift, `Marquee` strip optionally.
4. **How it works** - 3 steps, editorial numbers, connecting timeline.
5. **Final CTA + footer** - full-width clay/ink band, nav columns, fine print.

## Implementation Plan (ordered, gated)

**Gate for every phase:** `npx tsc --noEmit && npm run lint && npm run build` passes, zero console errors, keyboard navigable, AA contrast on paper, Lighthouse ≥95, reduced-motion honored, mobile (390px) verified.

- **Phase 0 - Scaffold & design language.** create-next-app (TS, Tailwind v4, App Router, ESLint); init shadcn/ui + core primitives (button, card, input, badge, dropdown-menu, dialog, table, tabs, avatar, progress, sonner, skeleton); add framer-motion, lucide-react, `cn` util; load Fraunces + Geist via next/font; define all `@theme` tokens above in `globals.css`; paper-grain utility; base layout + `providers.tsx` with `MotionConfig reducedMotion="user"`; empty `(marketing)` + `(app)/portal` route-group layouts. **Done when:** build passes and a token swatch page (temporary route or story page) renders the palette/type/fonts correctly at 390px.
- **Phase 1 - Primitives & motion kit.** Build `motion/` kit + portal/UI atoms (stat card, progress ring, status chip, segmented control, timeline, toast wiring, switch). **Done when:** kit used by a temp page; reduced-motion disables animation.
- **Phase 2 - Marketing landing.** Build the 5 sections; wire metadata/OG. **Done when:** full landing passes the gate and cinematic scroll animation works with reduced-motion fallback.
- **Phase 3 - Login + portal shell + dashboard.** `login/page.tsx` (demo switcher), `portal/layout.tsx` (sidebar + topbar + mobile bottom nav, active states), dashboard sections from mock data. **Done when:** login → dashboard flow works client-side; shell responsive.
- **Phase 4 - Portal modules.** Courses + `courses/[id]`, Grades + report card, Schedule + ICS, Attendance, Fees, Assignments, Announcements, Digital ID (3D flip), ⌘K palette. **Done when:** all ~11 routes render from mock data and pass the gate.
- **Phase 5 - Cross-cutting polish.** Responsiveness (375/390/768/1280/1536), keyboard/flocus states, print CSS for report card + ID, empty/edge states, reduced-motion pass, Lighthouse ≥95 on landing.
- **Phase 6 - Ship artifacts.** SEO metadata/OG image, favicon/logo set, README (product + Phase instructions + stack), `.env.example` (none needed - note "no backend"), `npm run build` final verification.

## Verification
- `npx tsc --noEmit && npm run lint && npm run build` after each phase
- Manual: keyboard-only nav, 390px + 1536px widths, `prefers-reduced-motion: reduce`
- Optional browser check via Playwright (Chromium at `C:\Users\alchi\AppData\Local\ms-playwright\chromium-1248\chrome-win64\chrome.exe`, run with `--no-sandbox`; playwright-core extension path available)
- Lighthouse ≥95 performance/a11y on `(marketing)` and `/portal/dashboard`

## Assumptions
- No backend, no env vars, no DB; deployable as static/Node Vercel deployment.
- `framer-motion` (v11/12) compatible with React 19; shadcn/ui Tailwind v4 setup works with `create-next-app@latest` defaults.
- PNG/SVG logo + OG image assets are generated by the code agent (no external brand assets provided).
- DepEd accuracy is presentational only (sample grades/schedule), not official compliance work.

## Risks & Mitigations
- **Tailwind v4 alpha drift** - pin versions from `create-next-app` output; do not hand-migrate v3 config; tokens defined in `@theme` only.
- **Hydration mismatch** - no `Date.now()`/random at module scope; fixed reference date in `student.ts`; `"use client"` only where needed.
- **Motion perf** - animate `transform`/`opacity` only; disable heavy blur/tilt on reduced-motion + touch; `content-visibility` on long lists.
- **Scope creep (beehiiv-esque extra sections)** - landing limited to the 5 agreed sections.

## Open Questions (answer during Phase 0 if user is unavailable)
- None blocking. Defaults: login accepts any credentials; demo switcher also signs in; role persistence via `sessionStorage`; deploy target assumed Vercel.

## Execution Note
This plan was authored by the planning agent (read-only). To implement Phase 0, switch to an implementation-capable agent and say: "Implement `.kilo/plans/1791583114436-marben-student-portal-plan.md` starting with Phase 0."
