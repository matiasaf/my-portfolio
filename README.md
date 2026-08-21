# Matías Fernández's Portfolio

Source code for [builtbymatias.dev](https://builtbymatias.dev), a bilingual editorial
portfolio where I publish technical notes, visual guides, and projects about applied AI,
system design, data, and product engineering.

## What is included

- Spanish and English editorial home pages.
- Professional profile and web/PDF résumé in both languages.
- A visual series about AI, transformers, and agent harnesses.
- A System Design guide, long-form articles, and
  *Designing Data-Intensive Applications* notes.
- A step-by-step AI Knowledge Platform project log.
- Light and dark themes, responsive layouts, and social/SEO metadata.

## Tech stack

- [Astro 5](https://astro.build/) with static output.
- Strict TypeScript.
- Hand-written CSS with no component framework.
- Node.js 22 or newer and npm.
- Cloudflare Pages for deployment.
- LaTeX/Tectonic only when rebuilding the résumé PDFs.

## Run locally

```bash
git clone https://github.com/matiasaf/my-portfolio.git
cd my-portfolio
npm ci
npm run dev
```

Astro prints the local URL, usually `http://localhost:4321`.

Validate a change with:

```bash
npm run check
npm run build
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Astro development server |
| `npm run check` | Validate types and Astro files |
| `npm run build` | Validate and generate the static site in `dist/` |
| `npm run preview` | Serve the generated `dist/` output locally |
| `npm run cv:pdf` | Rebuild both résumé PDFs from the TypeScript source |

`cv:pdf` requires Tectonic, `latexmk`, XeLaTeX, LuaLaTeX, or pdfLaTeX. The script recommends
Tectonic.

## Main routes

| Route | Content |
|---|---|
| `/` | Redirect to the default English home page |
| `/en/` and `/es/` | English and Spanish editorial home pages |
| `/sobre-mi/` and `/en/about/` | Professional profile |
| `/cv/` and `/en/cv/` | Web résumé and PDF downloads |
| `/ai/` | Series about models, transformers, and harnesses |
| `/system-design/` | Visual architecture guide and articles |
| `/projects/ai-knowledge-platform/` | Applied AI project build log |

See [Architecture](docs/ARCHITECTURE.md) for the complete route inventory and the relationship
between pages, components, and structured content.

## Repository structure

```text
.
├── src/
│   ├── pages/          # Astro routes; file paths define public URLs
│   ├── components/     # Reusable sections and page-level components
│   ├── content/        # Structured résumé, AI, DDIA, and System Design content
│   ├── layouts/        # Shared HTML shell, SEO, theme, and metadata
│   ├── lib/            # Generators and utilities
│   └── styles/         # Global and module-specific styles
├── public/             # Favicons, social images, and résumé PDFs
├── scripts/            # Artifact automation such as résumé PDF generation
└── docs/               # Architecture and maintenance documentation
```

## Deployment

The site builds to static files. The expected Cloudflare Pages configuration is:

```text
Build command:    npm run build
Output directory: dist
Production URL:   https://builtbymatias.dev
```

`astro.config.mjs` defines the canonical domain. The résumé PDFs are generated outside the
site build and committed under `public/downloads/` because Pages does not compile LaTeX.

## Contributing

The source is public so the building process is visible too. Bug reports, broken-link reports,
and technical corrections are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening
an issue or pull request. Follow [SECURITY.md](SECURITY.md) for security incidents or accidental
data exposure.

## License

A public repository does not automatically grant an open-source license. The code, design,
writing, and portfolio materials remain fully copyrighted; review [LICENSE](LICENSE) before
reusing them.
