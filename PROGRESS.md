# Project progress

This is temporary operational context for the next human or agent session. Git is the durable
history; replace stale detail instead of accumulating a diary.

## Current state

- Status: idle
- Branch: `main`
- HEAD: `a43d05a`
- Updated: `2026-09-02T10:46:00-03:00`
- Worktree: the scoped Event-Driven Azure article passed verification and is recorded by the
  accompanying main-branch commit; no unrelated work was included.

### Objective

Publish a bilingual System Design field note explaining how the supplied Website Chatbot
architecture implemented event-driven behavior on Azure.

### Acceptance criteria

1. Add the requested English article to Writing and preserve Spanish parity.
2. Explain the Web PubSub conversation plane, Queue Storage/Functions ingestion plane, and
   Azure SQL/REST source-of-truth boundary from the supplied architecture.
3. Cover state machines, at-least-once handling, idempotency, correlation, reconciliation, and
   the documented cancellation limitation without exposing secrets or private identifiers.
4. Preserve the established reading layout, active Writing navigation, accessibility, themes,
   responsive behavior, metadata, and static build.
5. Pass focused diagnostics, bilingual visual checks, and the complete repository gate.

### Decisions

- IBM Plex Mono is the licensed/open fallback used by the official OpenCode site; Berkeley Mono is
  not copied because no redistribution license was provided.
- The article is a sanitized synthesis of the supplied canonical architecture document; it does
  not reproduce secrets, internal keys, customer names, or deploy-time configuration.
- The central design argument is that realtime delivery, durable work dispatch, and authoritative
  state need separate responsibilities rather than one generic event mechanism.
- The requested English route has a Spanish counterpart because the publication system and the
  repository contract require language parity for translated long-form notes.
- Existing OpenCode-style reading tokens, navigation, theme behavior, and social metadata are
  reused; no new dependency or decorative image is needed.

### Progress

- Added the English `/en/system-design/event-driven-design-azure/` article and its Spanish
  `/system-design/event-driven-design-azure/` counterpart.
- Added the publication to the shared bilingual Writing index and System Design navigation group.
- Explained the two event planes, end-to-end chat and crawl flows, aggregate crawl states,
  idempotency, bounded retries, correlation, reconciliation, and known cancellation gap.
- Added official Microsoft Learn references for the Azure architecture pattern, Web PubSub,
  Functions queue triggers, and reliability patterns.

### Blockers

- None.

### Verification

- `npm run harness:init` — PASS on macOS 26.5 arm64 with Node 24.18.0 and npm 11.16.0.
- `npm run check` — PASS (Astro: 87 files clean, no errors, warnings, or hints).
- Browser review — PASS at 1280×800 light and 390×844 dark, English and Spanish; no horizontal
  overflow, correct active Writing link, working mobile disclosure, and correct language metadata.
- `git diff --check` — PASS.
- `npm run verify` — PASS on 2026-09-02 (harness: 9 checks; Astro: 87 files clean; 40 pages built).

### Next action

No active implementation remains. Begin the next request from a clean checkout and use the
current production deployment as the baseline.

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
