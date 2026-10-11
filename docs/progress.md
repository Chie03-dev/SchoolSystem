# Build log - Demo student portal (front-end)

Execution record for the plan in `.kilo/plans/1791583114436-marben-student-portal-plan.md`.
Dates are the work session date; the demo world runs on the fixed reference
date **2026-10-09** (Friday, Week 8 of Q2).

## Ship checklist (from the plan)

- [x] Landing page (moved to `/about`; `/` redirects to `/login`)
- [x] Login page (campus-photo rail + form panel, demo account, redirects to portal)
- [x] Portal shell: sidebar + topbar + mobile bottom nav + ⌘K command palette
- [x] Dashboard: greeting, stat tiles, today's classes, upcoming deadlines, announcements
- [x] Courses + course detail (grades, slots, attendance, assignments)
- [x] Grades: term selector, subject table, GWA ring + trend, print header (Form 138)
- [x] Schedule: weekly grid with today highlighted, .ics export
- [x] Attendance: per-subject rates + daily log
- [x] Fees: statement of account, payment history, pay dialog
- [x] Assignments: status filters
- [x] Announcements, notifications, profile, digital student ID (QR + holographic sheen)
- [x] Motion kit (`components/motion/`) + portal atoms (`components/portal/`)
- [x] SEO / OG image, favicon + apple icon
- [x] README + this log
- [x] Zero console errors on all audited routes
- [x] `npx tsc --noEmit && npm run lint && npm run build` green

## Verification commands (run before every ship)

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Phase notes

1. **Foundation** - Next 16.4.4 scaffolded via `create-next-app` (renamed into
   `marben` subfolder then moved to the root; npm rejects the capital-letter
   directory name). shadcn/ui initialized with the Base UI "nova" preset; its
   neutral CSS variables were re-mapped onto the Paper & Clay palette in
   `globals.css`.
2. **Design language** - a single universal family (Inter) via `next/font`
   replaces the earlier Fraunces + Geist pairing; hierarchy is carried by
   weight (600 display, semibold titles), size (`text-display` clamp),
   tracking, and `tabular-nums`. Tokens in `@theme`; paper grain; warm
   shadows; MotionConfig-free reduced-motion gating (components self-gate via
   a hydration-safe `useSyncExternalStore` hook).
3. **Motion kit** - `Reveal` and `TextReveal` are pure-CSS scroll-driven
   animations (zero JS, hydration-free); `Tilt`, `MagneticButton`,
   `ProgressRing` use framer-motion; `AnimatedCounter` uses rAF.
4. **Data** - `src/data/student.ts` is a self-consistent dataset: subject
   grades average to the displayed GWA (91.25), attendance counts add up to
   97.5%, fees reconcile to ₱3,000.00.
5. **Cache Components** - the course detail route awaits `params` inside
   `<Suspense>` per the Next 16 migration guide (Partial Prefetching);
   `generateMetadata` is cached with `use cache`.

## Known gaps / decisions

- **Theme pass (post-ship)**: clay was tuned from `#B4552D` to `#A8481F`
  (hover `#8A4320`) - a deeper terracotta that raises white-on-clay contrast
  from 4.91 to 5.82:1 and clay-on-paper from 4.59 to 5.44:1. A categorical
  data-viz scale was added (`--viz-teal`, `--viz-plum`, remapped
  `chart-1..5` = clay · sage · teal · warn · plum) and applied to subject
  category chips; print now renders on warm paper (`#FDFBF7`) with tinted
  report headers. Dark mode ("night paper") was scoped out - the token
  architecture (`:root` + `@theme` mapping) is ready for it.
- **Lighthouse performance**: measured on the production `next start` server
  (Lighthouse 13.5, headless Chromium):
  - Landing - accessibility 100, best-practices 100, SEO 100, CLS 0.
    Performance **92–93** with real (devtools) throttling, **88–89** with
    Lighthouse's simulated throttling.
  - `/portal/dashboard` - accessibility 100, best-practices 100, SEO 100,
    CLS 0; performance **90** (real throttling).
  - Desktop simulated performance is lower (**70**) because the desktop LCP
    curve is stricter.
  - Observed (unthrottled) FCP/LCP are ~0.37 s; the gap is Lighthouse's
    4×-CPU simulation over a design-mandated page weight (self-hosted
    Inter, paper grain, product preview mockup). The ≥95 target is not met
    on the simulated metric without removing the plan-mandated fonts
    and grain; removing fonts alone still measured 94.
- **Font preloads**: Next 16.4 does not emit `next/font` preloads (verified
  against a minimal repro app). The single latin subset is hand-preloaded in
  `src/app/layout.tsx`; the filename is a stable hash from
  `.next/server/next-font-manifest.json`.
- **Typography pass (post-ship)**: Fraunces + Geist + Geist Mono were
  consolidated into a single Inter family for a coherent institutional look.
  One self-hosted variable family (latin, `display: "optional"`);
  `font-display`/`font-heading`/`font-mono` are semantic aliases of
  `var(--font-sans)`; hierarchy comes from weight (600 display, semibold
  card/dialog titles), the `text-display` size clamp, tracking, and
  `tabular-nums` on numeric data. Verified: tsc + lint + build green; the
  only family served is Inter; the hand-preload hash in `layout.tsx` matches
  the built font manifest.
- **`display: optional`** on all `next/font` faces: fonts paint with the first
  content paint or never swap in late (no CLS, no late LCP repaint).
- **Login redesign (post-ship)**: the washed-out full-bleed backdrop became a
  two-column layout - a full-height campus-photo rail (warm night-paper
  scrim, school identity, headline, live proof chips: GWA 91.25, attendance
  97.5%, rank 6/42) beside the paper form panel; on mobile the rail collapses
  to a photo banner. Staged entrance via the new `FadeRise` motion primitive
  (framer-motion, reduced-motion safe); form logic, validation, and the demo
  account box are unchanged.
- **Anonymization pass (post-ship)**: all Marben placeholders were replaced
  with generic "Demo" branding - wordmarks, domain (`demo.school`,
  `portal.demo.school`, `hello@demo.school`), metadata (title/OG/icons),
  ICS export (PRODID/UID/calname/filename), browser-frame chrome, and the
  letter logo. The logo became a school glyph (lucide `School` in the clay
  tile) shared via `components/brand-mark.tsx`; `icon.svg` and the generated
  `apple-icon.png` were rebuilt from it and the letter-based `favicon.ico`
  was removed (the SVG icon is the single source). Dataset specifics are now
  placeholders: student "Juan Dela Cruz", LRN 123456789012, DEMO-2026-0001,
  zeroed phone numbers, sample address, "Guardian Name", adviser
  "Ms. Jane Doe", school "Demo High School - Main Campus", round fee
  amounts (₱16,500 billed / ₱13,500 paid / ₱3,000 balance), OR-0001/OR-0002
  receipts, REQ-001..003 requests, and generic marquee school names. Usage
  stats are round (100 schools, 50,000 students, ₱1M/month). The fixed demo
  calendar (SY 2026-2027, reference date 2026-10-09) is kept because every
  screen derives from it.
- **Toaster** (sonner) lives in the portal shell and login page only, keeping
  toast infrastructure off the marketing landing.

## Not included (front-end scope)

Real authentication, persistence, and multi-role switching (RBAC is
represented visually). All actions confirm with toasts and are demo-only.
