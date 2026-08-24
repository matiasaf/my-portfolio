# Project progress

This is the durable handoff for work that may continue across agent or human sessions. Keep it
short and replace stale detail instead of accumulating a diary.

## In progress

- Portfolio V2 (`docs/PORTFOLIO_V2_PLAN.md`). PRs 1–4 are complete on
  `feat/professional-home`. PR 5 is next: GitHub professional surface.

## Blocked

- None.

## Recently completed

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
