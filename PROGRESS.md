# Project progress

This is temporary operational context for the next human or agent session. Git is the durable
history; replace stale detail instead of accumulating a diary.

## Current state

- Status: active
- Branch: `main`
- HEAD: `a43d05a`
- Updated: `2026-09-02T10:13:05-03:00`
- Worktree: uncommitted harness/documentation work was present at startup and remains preserved;
  the OpenCode-inspired UI migration is an additional scoped change under `src/`.

### Objective

Migrate the portfolio UI foundations to the supplied OpenCode design system while preserving
content, accessibility, bilingual parity, responsive behavior, and static-build reproducibility.

### Acceptance criteria

1. Centralize the supplied OpenCode palette, mono typography, spacing, radii, and surface roles.
2. Apply the new system to shared UI plus Home, About, Work, case-study, and résumé surfaces.
3. Preserve light/dark themes, English/Spanish routes, focus visibility, and mobile layout.
4. Pass focused diagnostics, visual checks, and the complete repository gate.
5. Give every published long-form note a quiet documentation-style reading layout with no
   decorative hero imagery, poster-like panels, or unnecessary color noise.
6. Add an OpenCode-style left navigation only to Writing and article routes, with publications
   grouped by topic, an active-page state, and an accessible mobile disclosure.

### Decisions

- IBM Plex Mono is the licensed/open fallback used by the official OpenCode site; Berkeley Mono is
  not copied because no redistribution license was provided.
- The supplied light tokens remain canonical. The dark variant follows the official site's current
  near-black surfaces while keeping the portfolio's existing user-selectable theme behavior.
- Existing content and technical illustrations remain intact; this change migrates their shared UI
  foundations without rewriting editorial information or product claims.
- The final selected wordmark direction uses Pixelify Sans with soft pixel forms and a tonal
  first name. Its readable “Matías Fernández” label remains in the accessibility tree.
- Published notes share a 700px reading column modeled on the official OpenCode documentation.
  Explanatory code, tables, and diagrams remain available, while hero illustrations and purely
  decorative color treatments are removed or flattened.
- Writing navigation is derived from `src/content/notes.ts`; topic, compact navigation title, full
  title, and public URL therefore remain a single source of truth in both languages.

### Progress

- Added canonical OpenCode-inspired tokens and mapped every legacy shared color/font alias to them.
- Migrated the shared shell, navigation, theme control, buttons, cards, footers, Work pages, and web
  résumé away from rounded pills, decorative shadows, and mixed font families.
- Corrected the Spanish mobile writing-header overflow found during visual verification.
- Added the final responsive soft-pixel “Matías Fernández” wordmark to the main hero and every shared
  brand position across professional, Work, AI, System Design, article, and footer surfaces.
- Added a shared reading layer to all nine published article templates/routes in both languages:
  smaller headings, documentation rows instead of cards, neutral callouts, compact metadata, and
  flat explanatory figures with the redundant hero visuals removed.
- Added the Writing sidebar to the bilingual Writing indexes and every long-form article. Desktop
  uses a fixed 280px rail; mobile uses a native disclosure, and the current article is exposed with
  `aria-current` and a visible active marker.

### Blockers

- None for the UI migration. The pre-existing GitHub-alignment publishing boundary remains unrelated.

### Verification

- `npm run harness:init` — PASS on macOS 26.5 arm64 with Node 24.18.0 and npm 11.16.0.
- `npm run check` — PASS (Astro: 84 files clean, no errors, warnings, or hints).
- Browser review — PASS at desktop and mobile widths, light/dark themes, English/Spanish Home,
  English About, Spanish Work, and English résumé; no horizontal overflow remains.
- Final wordmark review — PASS at 1440×1000 and 390×844 in light/dark themes; Pixelify Sans loads,
  the accessible text name remains present, and no horizontal overflow is introduced.
- Article reading review — PASS against the official OpenCode docs reference at 1280×800 and
  390×844, in light/dark themes and English/Spanish routes; the Harness and database articles were
  checked at the hero and internal-content levels.
- Writing sidebar review — PASS in Spanish at desktop and mobile widths, light/dark themes, closed
  and open mobile states, active-page styling, keyboard-visible focus, and navigation from Harness
  to Postgres; the bilingual Writing index also retains its content layout beside the rail.
- `npm run verify` — PASS on 2026-09-02 (harness: 9 checks; Astro: 84 files clean; build: 38 pages).

### Next action

Review and commit the scoped OpenCode-inspired UI migration together with the supplied reference
artifacts when ready; publishing or deployment remains a separate action.

## Recently completed

- Migrated the portfolio's shared design foundations and primary professional surfaces to the
  OpenCode-inspired mono, flat, hairline-bordered visual system with responsive theme parity.
- Upgraded the five-subsystem agent harness with a canonical goal loop and authority router,
  cross-platform Node initialization, a validated operational-state schema, thin Claude/Copilot
  adapters, and a read-only verifier included in the CI-equivalent full gate.
- Published the bilingual Harness Engineering and Postgres internals articles, the PsiNota case
  study, and the OpenAI–Hugging Face incident explainer with responsive, theme, language, and full
  build verification.
- Completed Portfolio V2 PRs 1–4: professional home, selected-work model and indexes, sanitized case
  studies, About pages, and bilingual résumé variants.
