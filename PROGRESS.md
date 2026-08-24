# Project progress

This is the durable handoff for work that may continue across agent or human sessions. Keep it
short and replace stale detail instead of accumulating a diary.

## In progress

- Portfolio V2 (`docs/PORTFOLIO_V2_PLAN.md`). PR 1 is complete on `feat/professional-home`.
  PR 2 is next: the case study content model and the public AI Knowledge Platform case study.

## Blocked

- None.

## Recently completed

- PR 1 of Portfolio V2 on 2026-08-24: `src/content/profile.ts` now holds positioning, the
  evidence ledger, contacts, availability, target roles, the shared career path, and selected
  work; `/en/` and `/es/` render the professional home; the editorial home moved to
  `/en/writing/` and `/es/publicaciones/`; the primary navigation is Work · Writing · About ·
  Resume everywhere; and the AI Knowledge Platform status is read from one source.
- Established the five-subsystem project harness on 2026-08-22: agent map, pinned runtime,
  durable state, unified verification command, CI, and maintenance guidance.
- `npm run verify` passed on 2026-08-24 with 54 files clean and 18 static pages built.

## Next action

- Start PR 2: create `src/content/work.ts`, a reusable `WorkCaseStudy.astro`, and the
  Work/Trabajo index and case study routes. When those routes exist, retarget the two
  professional cards in `selectedWork` (they currently point at About anchors).

## Known follow-ups

- The Writing page still leads its side-projects section with three queued projects.
  Plan section 8 says only delivered or actively maintained work should appear prominently;
  decide whether to cut them when PR 2 reshapes the project surfaces.
