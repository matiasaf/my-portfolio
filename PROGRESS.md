# Project progress

This is temporary operational context for the next human or agent session. Git is the durable
history; replace stale detail instead of accumulating a diary.

## Current state

- Status: blocked
- Branch: `main`
- HEAD: `33dc679`
- Updated: `2026-09-03T01:38:23-03:00`
- Worktree: the responsive-header implementation is complete and verified statically. The
  pre-existing `package-lock.json` key-order change remains unrelated and intentionally untouched.

### Objective

Make navigation visually stable across Home, Work, Writing, About, and Resume from 391–680 px
without adding client-side routing or changing Astro's static output.

### Acceptance criteria

1. Keep Work, Writing, About, and Resume reachable at 425×900 and 430×932 through one consistent
   bilingual navigation shell.
2. Keep logo, primary navigation, header height, element order, and spacing stable across routes.
3. Reuse one responsive header component across Home, Work, Writing, About, and Work case studies.
4. Mark the active page with `aria-current="page"`.
5. Preserve Resume's specialized toolbar beneath the portfolio shell and hide both in print.
6. Preserve EN/ES parity, light/dark themes, keyboard focus, reduced motion, and native scroll
   restoration without new dependencies or view transitions.
7. Pass static artifact checks, `npm run check`, `npm run verify`, and the requested visual matrix.

### Decisions

- `PortfolioHeader.astro` owns the shared brand, four primary destinations, language switcher,
  active state, and scroll-state behavior.
- Use an exact 96 px header from 391–980 px and 70 px above 980 px; scrolling changes the surface
  treatment but never the height.
- Keep Resume's toolbar as page content below the fixed global shell. Preserve the active résumé
  variant when switching languages and keep a visible Portfolio link in the toolbar on mobile.
- Do not add Astro ClientRouter or View Transitions: removing the divergent shells addresses the
  reproduced layout jump while retaining native document navigation and scroll restoration.

### Progress

- Replaced duplicated headers in ProfessionalHome, WorkIndex, EditorialHome, PortfolioHome, and
  WorkCaseStudy with the shared component.
- Added the shared portfolio shell to both languages and both variants of ResumePage.
- Removed conflicting Home/Work responsive overrides and the rule that hid primary navigation on
  Writing/About.
- Preserved global focus-visible and reduced-motion behavior and added no dependencies.

### Header measurements

| Viewport range | Before | After |
|---|---|---|
| 391–680 px | Home ≈95 px; Work ≈93 px; Writing/About 62 px; Resume had no portfolio shell | All five primary routes use the same exact 96 px shell |
| 681–980 px | Home/Work used separate auto-height two-row rules; Writing/About hid primary nav | All five primary routes use the same exact 96 px shell |
| Above 980 px | Shared base started at 70 px and shrank to 62 px after scroll | All five primary routes remain exactly 70 px before and after scroll |

The before values are the reproduced production measurements from the task report, corroborated by
the former page-specific CSS. The after values are the explicit `--portfolio-header-height` contract
and still need screenshot/runtime confirmation because no browser instance was available.

### Blockers

- Required visual QA is pending because the in-app browser runtime reported no available browser.
  The static checks cannot substitute for inspecting 425×900, 430×932, and desktop in both themes,
  both languages, and keyboard navigation.

### Verification

- `npm run harness:init` — PASS; Node 24.18.0, npm 11.16.0, dependencies ready.
- `npm run check` — PASS; 89 files, no errors, warnings, or hints.
- `npm run verify` — PASS; harness 9/9, 89 files clean, 41 static pages built.
- Generated HTML contract check — PASS for Home, Work, Writing, About, base résumé, and AI résumé
  in English and Spanish: one shared header, all four destinations, correct current route/language,
  and Resume toolbar context.
- `git diff --check` — PASS.
- Independent read-only review — BLOCKED only by unavailable browser QA; the earlier progress and
  measurement documentation findings are resolved, and no implementation regression was found.
- Browser review — BLOCKED; no connected browser was available in this session.

### Next action

Connect an in-app browser and inspect Home, Work, Writing, About, and Resume at 425×900, 430×932,
and a desktop width in light/dark themes and English/Spanish. Confirm visible keyboard focus, no
horizontal page overflow, a 96 px mobile header on every route, a 70 px desktop header before and
after scroll, and that print preview omits both headers. If all pass, set status to `idle`.

## Recently completed

- Repositioned the bilingual site and résumé variants for Senior Full-Stack Engineer roles.
- Removed the root blank-screen redirect flick while preserving `/en/` as canonical.
- Migrated the professional surfaces to the shared mono, flat, hairline-bordered visual system.
