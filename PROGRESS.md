# Project progress

This is the durable handoff for work that may continue across agent or human sessions. Keep it
short and replace stale detail instead of accumulating a diary.

## In progress

- Portfolio V2 (`docs/PORTFOLIO_V2_PLAN.md`). PRs 1–2 are complete on
  `feat/professional-home`. PR 3 is next: disclosure-audited professional case studies.

## Blocked

- None.

## Recently completed

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
- `npm run verify` passed on 2026-08-24 with 60 files clean and 22 static pages built.

## Next action

- Start PR 3 with a disclosure audit for Enterprise AI Platform, then write its sanitized
  architecture, exact responsibility, decisions, trade-offs, and supported outcomes. Repeat
  the audit before publishing Serverless Platform Modernization as a full case study.

## Known follow-ups

- The Writing page still leads its side-projects section with three queued projects.
  Plan section 8 says only delivered or actively maintained work should appear prominently;
  decide whether to cut them when PR 2 reshapes the project surfaces.
