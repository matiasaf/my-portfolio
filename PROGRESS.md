# Project progress

This is the durable handoff for work that may continue across agent or human sessions. Keep it
short and replace stale detail instead of accumulating a diary.

## In progress

- Portfolio V2 (`docs/PORTFOLIO_V2_PLAN.md`). PRs 1–4 are complete on
  `feat/professional-home`. PR 5 is next: GitHub professional surface.

## Blocked

- None.

## Recently completed

- Published the bilingual AI & Harnesses article “Harness engineering: making coding agents
  reliable” / “Harness engineering: cómo volver confiables a los agentes de código”. It distills
  all 14 Learn Harness Engineering lectures into one practical progression: the five harness
  subsystems, repository-backed knowledge, session initialization and handoff, WIP=1 feature
  contracts, layered verification, runtime and process observability, autonomous-loop stopping
  rules, and the point where graph topology becomes justified. A one-line map preserves the key
  decision from every lecture, while the main narrative removes anecdotal metrics and repeated
  examples. Both translations render from `src/components/ai/HarnessEngineeringArticle.astro`
  and are linked from AI & Harnesses and both editorial indexes. Reviewed in light and dark at
  1280px and 390px in both languages with no horizontal overflow; `npm run verify` passed with
  80 files clean and 38 static pages built.

- Published the bilingual System Design field note “Postgres por dentro” / “Postgres from the
  inside”, sourced from the Hussein Nasser whiteboard video and the PostgreSQL 18 docs. It walks
  the file → 8 KB page → line pointer → tuple chain, the page anatomy and `ctid`, what a B-tree
  leaf actually stores and why the heap fetch happens, MVCC with `xmin`/`xmax`, snapshot
  visibility across isolation levels, the HOT exception the short version of this topic usually
  omits, and dead tuples, the vacuum horizon, bloat, and the operational checklist. Both routes
  render from `src/components/system-design/PostgresArticle.astro`; the note is linked from the
  System Design field notes and both Writing/Publicaciones indexes via `src/content/notes.ts`.
  Dark panels use fixed light accents because the theme tokens flip to dark shades there.
  Reviewed in light and dark at 1280px and 390px in both languages with no horizontal overflow;
  `npm run verify` passed with 77 files clean and 36 static pages built.

- Removed the blank navigation flash from AI & Harnesses and System Design module chrome by
  linking portfolio header/footer brands directly to `/en/` or `/es/` instead of routing through
  the redirect-only `/`. English, Spanish, and System Design click-throughs were verified against
  the production build with the destination home visible after one navigation; `npm run verify`
  passed with 74 files clean and 34 static pages built.

- Published PsiNota as a bilingual selected-work case study and added it to the professional home
  and Work/Trabajo indexes. The case presents the private-repository side project as a functional
  mobile-first, offline-first MVP with explicit sole ownership, the consultation-to-note
  architecture, persisted job processing, human review, versioning, audit history, verified 7/7
  tests and three production builds, plus a clear boundary before closed beta or use with real
  clinical data. English and Spanish routes, metadata, local evidence links, light/dark themes,
  and 390px/1280px layouts were checked with no horizontal overflow; `npm run verify` passed with
  74 files clean and 34 static pages built.

- Published the bilingual Feynman-style explainer “El agente que escapó del examen” / “The agent
  that escaped the exam” about the
  OpenAI–Hugging Face agent-security incident. It separates confirmed facts, analogy, and inference;
  explains the agent loop, SSRF, RCE, lateral movement, accidental shared memory, and the causal
  chain from reward to external impact; and links the OpenAI, Hugging Face, ExploitGym, Black Hat,
  and Simon Willison sources. Both translations render from one shared component and are linked
  from AI & Harnesses and their respective editorial indexes. The incident-specific red, amber,
  and blue palette has contrast-safe light/dark variants and maps risk, transitions, and controls.
  Light/dark responsive review passed for both languages at 390px and 1280px with no horizontal
  overflow. Measured accent contrast ranges from 5.20–7.22:1 in light mode and 7.14–12.72:1 in
  dark mode; `npm run verify` passed with 72 files clean and 32 static pages built.

- Published “What a production RAG system actually needs” as a bilingual AI & Harnesses article.
  The piece draws on disclosed document-AI production work and the public AI Knowledge Platform to
  cover ingestion identity, provenance, retrieval evals, server-resolved citations, authorization,
  prompt-injection boundaries, failure design, observability, and release gates. It is linked from
  the AI module and both Writing/Publicaciones indexes; responsive and theme review covered the
  English and Spanish routes at 390px and 1280px with no horizontal overflow.

- The bilingual Writing/Publicaciones side-project surface now features only the active AI
  Knowledge Platform. Three queued concepts and all backlog language were removed; hero metrics,
  navigation copy, section framing, metadata, and footer copy now describe one active public
  project. The single-card layout was checked at 390px and 1440px without overflow, and
  `npm run verify` passed with 66 files clean and 28 static pages built.

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

- None.
