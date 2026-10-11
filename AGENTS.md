<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Marben project rules

- **Verification before every ship:** `npx tsc --noEmit && npm run lint && npm run build`
- `next.config.ts` ships `cacheComponents: true` + `partialPrefetching: true`
  (Next 16.4 defaults): await `params` inside `<Suspense>` on dynamic routes,
  cache `generateMetadata` with `use cache`, and never call `Date.now()` /
  `Math.random()` during render (mock data uses the fixed reference date
  2026-10-09).
- Design tokens are the Paper & Clay palette in `src/app/globals.css` — add
  new colors there, not ad hoc hex values. shadcn's stock variables map onto
  this palette.
- `next/font` preloads are not emitted by Next 16.4: the two latin subsets are
  hand-preloaded in `src/app/layout.tsx`.
- Motion must respect `prefers-reduced-motion`; use the
  `useReducedMotionSafe` hook (hydration-safe) or pure-CSS animations.
- Accessibility floor: small text must meet 4.5:1 on paper (use `-deep` status
  variants for chips/labels).
- Browser checks run against the production server (`npm run build` +
  `npx next start -p 3002`); dev has stale-CSS artifacts.
