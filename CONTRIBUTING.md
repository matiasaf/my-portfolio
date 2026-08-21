# Contributing

Thank you for helping improve this portfolio. The repository contains personal content, so the
most useful contributions are usually technical corrections, accessibility improvements,
broken-link reports, and writing fixes.

## Before you start

1. Check whether an issue or pull request already covers the same problem.
2. Open an issue before proposing a large change or a new section.
3. Do not include credentials, third-party personal data, production exports, or material with
   an incompatible license.
4. Keep each pull request focused on one outcome.

Do not report vulnerabilities in public issues; follow [SECURITY.md](SECURITY.md).

## Local development

Requirements: Node.js 22 or newer and npm.

```bash
npm ci
npm run dev
```

Before submitting a change:

```bash
npm run check
npm run build
```

Also review affected pages at desktop and mobile widths, in both light and dark themes, and in
both languages when a translated variant exists.

## Where changes belong

- Routes and pages: `src/pages/`.
- Reusable sections: `src/components/`.
- Shared editorial data: `src/content/`.
- Metadata, canonical URLs, themes, and the HTML shell: `src/layouts/Layout.astro`.
- Styles: `src/styles/`; avoid inline styles unless a value must be dynamic.
- Files served without processing: `public/`.
- Maintenance documentation: `docs/`.

Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the complete application flow.

## Content conventions

- Write direct, verifiable sentences without unnecessary promotional language.
- Keep a source or artifact for every quantitative claim.
- Mark unfinished or planned work explicitly.
- Use relative links for repository files and HTTPS for external references.
- Preserve the page's language; update both variants when a translation exists.
- Do not duplicate structured content that can live in `src/content/`.
- Keep all repository documentation and code comments in English.

## Implementation conventions

- Use strict TypeScript; do not add `any` without a documented reason.
- Prefer semantic HTML and keyboard-accessible interactions.
- Respect `prefers-reduced-motion` and verify contrast in both themes.
- Avoid adding dependencies for small behaviors the web platform already supports.
- Do not edit `dist/`, `.astro/`, or `node_modules/`; they are generated artifacts.

## Commits and pull requests

Use short messages that describe the result:

```text
docs: describe the portfolio architecture
fix: correct the English canonical link
feat: publish the next system design note
```

A pull request should explain what changed, why it changed, how it was verified, and include
desktop and mobile screenshots for visual changes.
