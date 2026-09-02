# Agent guide

This repository is the source of truth for `builtbymatias.dev`, a bilingual static Astro
portfolio. This file is the vendor-neutral operating contract; tool-specific files only point
here. Follow links for detail instead of loading every document into context.

## Mission

Make one bounded, evidence-backed change at a time while preserving the site's accessibility,
language parity, disclosure boundaries, and reproducible static build.

## Startup gate

1. Read `PROGRESS.md` and identify its status and exact next action.
2. Run `git status --short` and preserve unrelated work.
3. Run `npm run harness:init`. It checks Node/npm, installs locked dependencies only when they
   are absent or stale, and validates harness readiness.
4. Read the controlling guide from the task router before editing.

The gate proves that the repository can start and test, that active state is visible, and that
the next action is explicit. If it fails, stop implementation and report the actionable error.

## Environment and tools

- Runtime: Node.js 22 (pinned by `.nvmrc`; `package.json` allows compatible newer releases).
- Package manager: npm; `package-lock.json` is authoritative and `npm ci` is the clean install.
- Stack: Astro 5, strict TypeScript, static output, and hand-written CSS.
- Local server: `npm run dev`; production preview: `npm run preview`.
- Optional PDFs: `npm run cv:pdf` requires Tectonic or another supported LaTeX engine.
- No application database, backend, migrations, or required external service exists.

Use the least privilege needed. Never weaken TLS, print or request secrets, deploy, mutate cloud
resources, or modify external accounts unless the user explicitly authorizes that separate action.

## Repository map and task router

| Task | Controlling paths | Load first |
|---|---|---|
| Routes, shared content, build, metadata | `src/pages/`, `src/content/`, `src/layouts/`, `astro.config.mjs` | `docs/ARCHITECTURE.md` |
| Components, styling, accessibility, responsive UI | `src/components/`, `src/styles/` | `docs/ARCHITECTURE.md`, then the nearest implementation |
| Résumé web/PDF variants | `src/content/resume.ts`, `src/lib/resume-tex.ts`, `scripts/build-cv-pdf.mjs` | Résumé section in `docs/ARCHITECTURE.md` |
| Harness, setup, state, or CI | This file, `scripts/harness-*.mjs`, `PROGRESS.md`, `.github/workflows/` | `docs/HARNESS.md` |
| Contribution or disclosure policy | `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` | The matching policy file |

Authority order for conflicts is: user request and security constraints; public specifications or
accepted plans; architecture decisions and schemas/contracts; tests and executable checks;
implementation; setup and explanatory docs; external context. A more specific repository guide
overrides a general one only within its stated scope. Flag unresolved product or ownership conflicts.

## Non-negotiable constraints

- Preserve strict TypeScript; avoid `any` unless the reason is documented.
- Keep semantic HTML, keyboard access, visible focus, contrast, and reduced motion intact.
- Keep each page in its existing language and update both variants when a translation exists.
- Put reusable data in `src/content/`; do not duplicate it across translated views.
- Avoid dependencies for small behaviors supported by the web platform.
- Never edit generated `dist/`, `.astro/`, or `node_modules/` content.
- Do not expose credentials, private data, production exports, or unlicensed material.
- Do not run concurrent editing roles in one checkout. Use separate worktrees and state files for
  concurrent changes.

## Goal loop

Before editing, normalize the request into an observable goal, ordered acceptance criteria,
constraints and out-of-scope actions, a focused check, a final gate, a stop condition, and a retry
budget (default: three implementation attempts).

1. **Explore (read-only):** locate the controlling authority and path; state one falsifiable
   hypothesis, the cheapest discriminating check, and material risks.
2. **Implement:** make one atomic increment and immediately run the focused check.
3. **Verify (read-only):** re-read the goal and diff, map every criterion to code and executable
   evidence, and return `PASS`, `REVISE`, or `BLOCKED`. The implementer cannot approve its own work.
4. **Coordinate:** retry `REVISE` within budget; finish as `PASS`, `BLOCKED`, or
   `BUDGET_EXHAUSTED`.

Use a fresh verifier/subagent when the active tool genuinely supports it. Otherwise run the phases
sequentially, re-read the original goal and diff before verification, and disclose that the review
was logically separated rather than context-isolated.

## Feedback ladder

1. After the first substantive edit, run the cheapest relevant check (for harness changes,
   `npm run harness:check`; for application code, normally `npm run check`).
2. Run focused artifact or route checks when available.
3. For shared code, contracts, dependencies, configuration, or broad behavior, run the full gate:
   `npm run verify`.
4. For visual or content changes, also inspect affected pages at mobile and desktop widths, in
   light and dark themes, and in both languages when applicable. Check keyboard navigation,
   metadata, links, and downloads.

Inspect warnings, skipped checks, generated-file drift, and fallbacks; exit code alone is not
enough. Distinguish new failures, pre-existing failures, and environment blockers.

## State and definition of done

Update `PROGRESS.md` when work spans sessions, becomes blocked, or changes the next action. Git is
durable history; the state file is concise operational context, not a changelog.

A change is done only when the diff is scoped, every acceptance criterion has evidence, the
required focused checks and final gate pass, manual checks are recorded when applicable,
`PROGRESS.md` is current, and no secrets or generated local artifacts entered the diff.

More detail: `README.md`, `CONTRIBUTING.md`, `docs/ARCHITECTURE.md`, and `docs/HARNESS.md`.
