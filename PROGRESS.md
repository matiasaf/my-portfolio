# Project progress

This is temporary operational context for the next human or agent session. Git is the durable
history; replace stale detail instead of accumulating a diary.

## Current state

- Status: active
- Branch: `main`
- HEAD: `a43d05a`
- Updated: `2026-09-01T17:10:27-03:00`
- Worktree: uncommitted harness files and documentation from the completed migration; no unrelated
  tracked changes existed at startup.

### Objective

Complete Portfolio V2 PR 5 by aligning the public GitHub profile and selected repositories with
the portfolio's professional positioning.

### Acceptance criteria

1. Review the public GitHub profile and candidate repositories without exposing private material.
2. Align profile wording and pinned evidence with the verified positioning in `src/content/profile.ts`.
3. Obtain explicit authorization before publishing any GitHub account change.
4. Run and record repository verification for any local edits.

### Decisions

- The portfolio repository remains the source of truth for public claims, preventing drift between
  the site and GitHub surfaces.
- Publishing is out of scope until separately authorized because it mutates an external account.

### Progress

- Portfolio V2 PRs 1–4 are complete on `feat/professional-home`.
- The repository harness now has executable cross-platform readiness, state validation, thin agent
  adapters, and a full-gate verifier; it does not publish or alter the portfolio product.

### Blockers

- Publishing GitHub changes requires explicit account authorization; read-only review can proceed.

### Verification

- `npm run harness:init -- --check` — PASS on macOS 26.5 arm64 with Node 24.18.0 and npm 11.16.0.
- `npm run dev -- --host 127.0.0.1` plus `HEAD /en/` — PASS (`200 OK`); the first sandboxed
  bind was BLOCKED by local socket permissions, then the approved local-only run passed.
- `npm run verify` — PASS on 2026-09-01 (harness: 9 checks; Astro: 82 files clean; build: 38 pages).

### Next action

Review the public GitHub profile and selected repositories, then draft disclosure-safe alignment
changes without publishing them.

## Recently completed

- Upgraded the five-subsystem agent harness with a canonical goal loop and authority router,
  cross-platform Node initialization, a validated operational-state schema, thin Claude/Copilot
  adapters, and a read-only verifier included in the CI-equivalent full gate.
- Published the bilingual Harness Engineering and Postgres internals articles, the PsiNota case
  study, and the OpenAI–Hugging Face incident explainer with responsive, theme, language, and full
  build verification.
- Completed Portfolio V2 PRs 1–4: professional home, selected-work model and indexes, sanitized case
  studies, About pages, and bilingual résumé variants.
