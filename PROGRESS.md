# Project progress

This is the durable handoff for work that may continue across agent or human sessions. Keep it
short and replace stale detail instead of accumulating a diary.

## In progress

- Portfolio V2 (`docs/PORTFOLIO_V2_PLAN.md`). PRs 1–4 are complete on
  `feat/professional-home`. PR 5 is next: GitHub professional surface.

## Blocked

- None.

## Recently completed

- Priority-issue remediation from the 2026-08-24 professional-journey critique: contact is now
  the primary action in the home hero, final contact block, and case-study close; the public email
  is selectable and paired with a response-time expectation; secondary contact controls use a
  theme-safe strong boundary; Work and case-study navigation remains visible below 980px; and
  load-bearing proof, role, evidence, and résumé text no longer sits in the 8–11px tier. Manrope
  now loads as the requested variable range and DM Mono stays within its real 400/500 weights.
  Mobile/tablet/desktop checks covered both languages and themes with no overflow; `npm run verify`
  passed with 66 files clean and 28 static pages built.

- Contrast hardening of the Work surfaces on 2026-08-24: `src/styles/work.css` no longer hardcodes
  `#101310` on theme-flipping accents. The work-index number badges and the accepted/delivered milestone
  badges now use `var(--ink)`; `--work-accent` moved from `#5274d4` (which failed against both light and
  dark ink) to `#3659b2`, the accent `global.css` already uses; a new `--work-accent-ink` colours the solid
  CTA; and `.work-index-cta`/`.case-glance`, dark in both themes, now take `--inverse-accent`. Measured on
  the running site in both themes: 19 checks, 0 failures, previously 1.52-2.55:1 at the worst sites.
  `npm run verify` passed with 28 static pages built.

- PR 4 of Portfolio V2 on 2026-08-24: refocused bilingual About pages on profile,
  leadership behavior, working style, preferred environment, and a concise shared career path;
  linked the Argeniss and Hexacta / GlobalLogic roles to disclosure-safe case studies; projected
  shared résumé experience into Frontend Lead and AI Product Engineer variants with five current-
  role highlights each; and regenerated four bilingual/variant PDFs. Responsive, theme, keyboard,
  link, PDF rendering, and ATS text checks passed.
- PR 3 of Portfolio V2 on 2026-08-24: published bilingual, disclosure-audited Enterprise
  AI Platform and Serverless Platform Modernization case studies; each uses the shared
  template, a sanitized architecture, exact ownership, decisions, trade-offs, failure modes,
  ledger-backed evidence, delivery state, and résumé/contact calls to action. Client source,
  screenshots, data, exact topology, and unsupported outcomes remain explicitly withheld.
- PR 2 of Portfolio V2 on 2026-08-24: `src/content/work.ts` now owns the selected-work
  model, flagship status, evidence, milestones, decisions, and bilingual copy; Work/Trabajo
  indexes and canonical AI Knowledge Platform case-study routes render shared components;
  legacy project URLs redirect permanently; and client work links to disclosure-safe summaries.
- PR 1 of Portfolio V2 on 2026-08-24: `src/content/profile.ts` now holds positioning, the
  evidence ledger, contacts, availability, target roles, the shared career path, and selected
  work; `/en/` and `/es/` render the professional home; the editorial home moved to
  `/en/writing/` and `/es/publicaciones/`; the primary navigation is Work · Writing · About ·
  Resume everywhere; and the AI Knowledge Platform status is read from one source.
- Established the five-subsystem project harness on 2026-08-22: agent map, pinned runtime,
  durable state, unified verification command, CI, and maintenance guidance.
- `npm run verify` passed on 2026-08-24 with 66 files clean and 28 static pages built.

## Next action

- Start PR 5 by reviewing the public GitHub profile and selected repositories, then align the
  profile README and pinned evidence with the professional positioning. Publishing changes
  requires explicit GitHub account authorization.

## Known follow-ups

- The Writing page still leads its side-projects section with three queued projects.
  Plan section 8 says only delivered or actively maintained work should appear prominently;
  decide whether to cut them when PR 2 reshapes the project surfaces.
