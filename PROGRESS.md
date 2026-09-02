# Project progress

This is temporary operational context for the next human or agent session. Git is the durable
history; replace stale detail instead of accumulating a diary.

## Current state

- Status: idle
- Branch: `main`
- HEAD: `283d2da`
- Updated: `2026-09-02T15:07:00-03:00`
- Worktree: the scoped root-render fix is committed, published, and verified in production.

### Objective

Eliminate the initial blank-screen flick when visiting `https://builtbymatias.dev/`.

### Acceptance criteria

1. Make `/` paint the English home in its first document instead of loading an intermediate page.
2. Preserve `/en/` as the canonical English URL and `/es/` as its language alternate.
3. Preserve theme initialization, accessibility, internal navigation, and static output.
4. Verify the generated root HTML contains the home and no meta refresh, then pass the full gate.

### Decisions

- Production serves the generated Astro redirect document as HTTP 200 from S3/CloudFront, so its
  zero-delay meta refresh still paints a blank intermediate document.
- The root now renders `ProfessionalHome` directly. A canonical override points its metadata to
  `/en/`, avoiding competing canonical English URLs while removing the extra navigation.
- Internal English-home links continue to use `/en/`; only a direct visit to `/` changes behavior.

### Progress

- Reproduced the production behavior: `/` returns a 280-byte meta-refresh document before `/en/`.
- Removed the Astro static redirect and added a direct root route using the existing English home.
- Added a canonical override to the shared layout and documented the root-route behavior.
- Verified direct cold loads at desktop and mobile sizes in both themes.

### Blockers

- None.

### Verification

- `npm run harness:init` — PASS on macOS 26.5 arm64 with Node 24.18.0 and npm 11.16.0.
- Production baseline — `/` returned HTTP 200 with a 280-byte meta-refresh document to `/en/`.
- `npm run check` — PASS (Astro: 88 files clean, no errors, warnings, or hints).
- Generated-root check — PASS; full home HTML is present, canonical is `/en/`, Spanish alternate is
  `/es/`, and no meta refresh is emitted.
- Browser cold-load review — PASS at desktop light/dark and 390×844 dark; `/` issued one document
  load, remained at `/`, rendered the home, and had no horizontal overflow or meta refresh.
- `npm run verify` — PASS (harness: 9 checks; Astro: 88 files clean; 41 pages built).
- `git diff --check` — PASS.
- GitHub Verify run 16 — PASS for commit `283d2da` on `main`.
- Production cold load — PASS; `/` renders the full home directly with no meta refresh or overflow,
  while retaining canonical `/en/` and Spanish alternate `/es/`.

### Next action

No active implementation remains. Begin the next request from a clean checkout and use the current
production deployment as the baseline.

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
