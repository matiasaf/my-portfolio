# Portfolio architecture

This document explains how the site is organized and deployed. Its goal is to make the correct
location for a change obvious without requiring knowledge of the repository's history.

## Overview

```text
src/content/*.ts ─┐
                  ├─> components/*.astro ─> pages/*.astro ─> Astro build ─> dist/
public/* ─────────┘                                  │
                                                    └─> Cloudflare Pages
```

Astro generates static HTML. The portfolio has no runtime backend or database. Client-side
JavaScript is limited to focused interactions such as theme selection, tabs, filters, and small
animations.

## Directory responsibilities

### `src/pages/`

Defines public URLs through file-based routing. Small route files assemble components; longer
articles may contain their page structure directly.

| Route | Entry file |
|---|---|
| `/` | Redirect to `/en/` from `astro.config.mjs` |
| `/en/` | `src/pages/en/index.astro` |
| `/es/` | `src/pages/es/index.astro` |
| `/sobre-mi/` | `src/pages/sobre-mi.astro` |
| `/en/about/` | `src/pages/en/about.astro` |
| `/cv/` | `src/pages/cv/index.astro` |
| `/en/cv/` | `src/pages/en/cv/index.astro` |
| `/en/work/` | `src/pages/en/work/index.astro` |
| `/es/trabajo/` | `src/pages/es/trabajo/index.astro` |
| `/en/work/ai-knowledge-platform/` | `src/pages/en/work/ai-knowledge-platform.astro` |
| `/es/trabajo/ai-knowledge-platform/` | `src/pages/es/trabajo/ai-knowledge-platform.astro` |
| `/ai/` | `src/pages/ai.astro` |
| `/ai/transformer-architecture/` | `src/pages/ai/transformer-architecture.astro` |
| `/system-design/` | `src/pages/system-design.astro` |
| `/system-design/elegir-base-de-datos/` | `src/pages/system-design/elegir-base-de-datos.astro` |
| `/system-design/concurrencia-vs-paralelismo-python/` | `src/pages/system-design/concurrencia-vs-paralelismo-python.astro` |
| `/system-design/ddia/chapter-01/` | `src/pages/system-design/ddia/chapter-01.astro` |
| `/en/system-design/choosing-a-database/` | `src/pages/en/system-design/choosing-a-database.astro` |
| `/en/system-design/data-structures-big-o/` | `src/pages/en/system-design/data-structures-big-o.astro` |
| `/projects/ai-knowledge-platform/` | Permanent redirect to `/es/trabajo/ai-knowledge-platform/` |
| `/en/projects/ai-knowledge-platform/` | Permanent redirect to `/en/work/ai-knowledge-platform/` |

`npm run build` prints the definitive generated-route inventory and is the final check against
this table.

### `src/components/`

Contains reusable sections and components that represent complete pages:

- `EditorialHome.astro`: Spanish and English editorial home pages.
- `PortfolioHome.astro`: professional profile in both languages.
- `ResumePage.astro`: web résumé representation.
- `WorkIndex.astro`: bilingual selected-work index.
- `WorkCaseStudy.astro`: shared, typed bilingual case-study template.
- `ai/` and `system-design/`: module-specific sections.

Translations that share a layout use a `lang` prop and local dictionaries. There is no external
internationalization dependency or runtime router.

### `src/content/`

Stores structured data consumed by multiple views. `resume.ts` is the résumé's single source of
truth: it feeds both `ResumePage.astro` and the LaTeX generator. `work.ts` owns selected-work cards,
case-study content, public evidence links, and project status so those claims cannot drift between
the home, Writing, Work index, and case-study routes. `ai.ts`, `ddia.ts`, and `system-design.ts`
contain indexes and reusable module content.

### `src/layouts/Layout.astro`

Provides the shared HTML shell and centralizes:

- document language and the skip link;
- title, description, and canonical URL;
- Open Graph and Twitter Card metadata;
- `hreflang` for pages with an alternate language;
- favicons and the web manifest;
- theme initialization before first paint;
- the theme toggle and persisted preference.

The `site` property in `astro.config.mjs` must match the production domain because Astro uses it
as the origin for canonical URLs during the static build.

### `src/styles/`

`global.css` defines shared tokens, resets, and behavior. Other stylesheets belong to a module
or article and are imported explicitly by the pages that use them.

### `public/`

Astro copies this directory without transformation. It contains icons, social images, the web
manifest, and the generated résumé PDFs.

## Internationalization

The strategy is intentionally explicit and small:

- `/` redirects to `/en/`, making English the default language for new visits.
- English uses `/en/` and Spanish uses `/es/` for the bilingual professional home page.
- Other translated sections use explicit paired routes, such as `/sobre-mi/` and `/en/about/`, or
  `/es/trabajo/` and `/en/work/`.
- `Layout.astro` receives `lang` and `alternateHref`.
- A page without a translation does not publish a fabricated `hreflang` alternate.

When changing bilingual content, review copy, navigation, metadata, and links in both languages.
Not every series has complete language parity; the site should expose that difference instead of
pretending a translation exists.

## Résumé and PDFs

```text
src/content/resume.ts
        ├─> ResumePage.astro ─> /cv/ and /en/cv/
        └─> resume-tex.ts ─> scripts/build-cv-pdf.mjs ─> public/downloads/*.pdf
```

`npm run cv:pdf` validates characters that are problematic in LaTeX, compiles both languages,
and replaces the published PDFs. Because the process requires a LaTeX engine, it runs separately
and its outputs are version-controlled.

## Build and deployment

1. `npm run check` runs Astro and TypeScript diagnostics.
2. `npm run build` validates again and generates `dist/`.
3. Cloudflare Pages publishes `dist/`.

Expected configuration:

```text
Runtime:          Node.js 22+
Build command:    npm run build
Output directory: dist
Canonical site:   https://builtbymatias.dev
```

`dist/`, `.astro/`, and `node_modules/` are ignored local artifacts.

## Change verification

The complete automated verification gate is:

```bash
npm run verify
```

Use `npm run check` as the faster diagnostic loop while editing. CI runs the same complete gate
for every pull request and push to `main`.

Visual or editorial changes should also be reviewed for:

- mobile and desktop widths;
- light and dark themes;
- keyboard navigation and visible focus;
- affected Spanish and English routes;
- canonical, `hreflang`, and social preview metadata;
- links and downloads in the production build.
