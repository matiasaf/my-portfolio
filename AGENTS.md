# Agent guide

This repository is the source of truth for `builtbymatias.dev`, a bilingual static portfolio
built with Astro. Use this file as a map; follow the linked documentation for details.

## Start here

1. Read `PROGRESS.md` for active, blocked, and recently completed work.
2. Run `git status --short` and preserve changes unrelated to the current task.
3. Install dependencies with `npm ci` when `node_modules/` is missing or the lockfile changed.
4. Read `docs/ARCHITECTURE.md` before changing routes, shared content, or build behavior.

## Environment

- Runtime: Node.js 22 (see `.nvmrc`).
- Package manager: npm; `package-lock.json` is authoritative.
- Framework: Astro 5 with strict TypeScript and static output.
- Styling: hand-written CSS; no component framework.
- Optional PDF toolchain: Tectonic or another LaTeX engine, only for `npm run cv:pdf`.

Use the least privilege needed for a task. Do not read local secrets or modify external systems
unless the task explicitly requires it.

## Repository map

- `src/pages/`: file-based public routes.
- `src/components/`: reusable and page-level Astro components.
- `src/content/`: structured content shared by views and generators.
- `src/layouts/`: shared HTML shell, metadata, canonical URLs, and themes.
- `src/styles/`: global and module-specific styles.
- `src/lib/` and `scripts/`: utilities and artifact generation.
- `public/`: files copied unchanged, including committed résumé PDFs.
- `docs/`: architecture and harness maintenance documentation.

## Non-negotiable constraints

- Preserve strict TypeScript; avoid `any` unless the reason is documented.
- Keep semantic HTML, keyboard access, visible focus, contrast, and reduced motion intact.
- Keep each page in its existing language and update both variants when a translation exists.
- Put reusable data in `src/content/`; do not duplicate it across translated views.
- Avoid dependencies for small behaviors supported by the web platform.
- Never edit generated `dist/`, `.astro/`, or `node_modules/` content.
- Do not expose credentials, private data, production exports, or unlicensed material.

## Verification

Run the narrowest useful check while iterating, then the full gate before finishing:

```bash
npm run check
npm run verify
```

`npm run verify` is the single full automated gate and must pass before a change is considered
complete. It runs Astro/TypeScript diagnostics and the production static build. There is no
automated browser test suite yet.

For visual or content changes, also inspect affected pages at mobile and desktop widths, in
light and dark themes, and in both languages when applicable. Check keyboard navigation,
metadata, links, and downloads relevant to the change.

## State and handoff

Update `PROGRESS.md` whenever work spans sessions, becomes blocked, or changes the next useful
action. Before finishing, record verification results and leave the worktree in an explainable
state. Do not claim completion with failing or skipped required checks.

More detail: `README.md`, `CONTRIBUTING.md`, `docs/ARCHITECTURE.md`, and `docs/HARNESS.md`.
