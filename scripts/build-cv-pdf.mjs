#!/usr/bin/env node
/**
 * Generates the résumé PDFs with LaTeX outside the site build.
 *
 *   npm run cv:pdf
 *
 * Reads src/content/resume.ts, the same source used by the HTML, emits .tex,
 * compiles it, and writes the PDFs to public/downloads/. Astro copies those
 * files to dist/ unchanged. The site remains fully static: this command runs
 * separately and its output is committed because Cloudflare Pages cannot
 * compile LaTeX during the site build.
 *
 * Requires a LaTeX engine. Tectonic is recommended:
 *   brew install tectonic
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { resume } from '../src/content/resume.ts';
import { renderResumeTex } from '../src/lib/resume-tex.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WORK = join(ROOT, 'tmp', 'cv-pdf');
const OUT = join(ROOT, 'public', 'downloads');

const TARGETS = [
  { lang: 'es', file: 'matias-fernandez-cv.pdf' },
  { lang: 'en', file: 'matias-fernandez-resume.pdf' },
];

/**
 * Engines in preference order. Tectonic comes first because it is a single
 * binary, downloads only the packages in use, and uses XeTeX with native UTF-8.
 */
const ENGINES = [
  { bin: 'tectonic', args: (tex) => ['--outdir', WORK, tex], passes: 1 },
  { bin: 'latexmk', args: (tex) => ['-xelatex', '-interaction=nonstopmode', `-outdir=${WORK}`, tex], passes: 1 },
  { bin: 'xelatex', args: (tex) => ['-interaction=nonstopmode', `-output-directory=${WORK}`, tex], passes: 2 },
  { bin: 'lualatex', args: (tex) => ['-interaction=nonstopmode', `-output-directory=${WORK}`, tex], passes: 2 },
  { bin: 'pdflatex', args: (tex) => ['-interaction=nonstopmode', `-output-directory=${WORK}`, tex], passes: 2 },
];

function findEngine() {
  for (const engine of ENGINES) {
    try {
      execFileSync('command', ['-v', engine.bin], { shell: true, stdio: 'ignore' });
      return engine;
    } catch {
      /* Try the next engine. */
    }
  }
  return null;
}

/**
 * Guard against a silent failure: an unescaped `%` comments out the remainder
 * of a line, producing a truncated PDF without a compilation error. Failing
 * here is safer than publishing a damaged résumé.
 */
function assertEscaped(tex, lang) {
  const body = tex.slice(tex.indexOf('\\begin{document}'));
  const problems = [];
  for (const [name, re] of [['%', /(?<!\\)%/g], ['&', /(?<!\\)&/g]]) {
    for (const m of body.matchAll(re)) {
      problems.push(`  unescaped ${name} in [${lang}]: ...${body.slice(Math.max(0, m.index - 60), m.index + 20).replace(/\n/g, ' ')}...`);
    }
  }
  if (problems.length) {
    throw new Error(`Incomplete LaTeX escaping:\n${problems.join('\n')}`);
  }
}

function main() {
  rmSync(WORK, { recursive: true, force: true });
  mkdirSync(WORK, { recursive: true });
  mkdirSync(OUT, { recursive: true });

  // 1. Render and validate. This always runs, even when no engine is installed.
  const built = TARGETS.map(({ lang, file }) => {
    const tex = renderResumeTex(resume[lang]);
    assertEscaped(tex, lang);
    const texPath = join(WORK, `cv-${lang}.tex`);
    writeFileSync(texPath, tex, 'utf8');
    console.log(`  .tex  ${lang}  ${tex.length.toLocaleString()} B  →  ${texPath}`);
    return { lang, file, texPath };
  });
  console.log('  escaping validated: no unescaped % or & characters\n');

  // 2. Compile.
  const engine = findEngine();
  if (!engine) {
    console.error('No LaTeX engine is installed.\n');
    console.error('  brew install tectonic      (recommended: ~30 MB, no TeX Live)\n');
    console.error(`The .tex files remain in ${WORK} and can be compiled in Overleaf.`);
    process.exit(1);
  }
  console.log(`  engine: ${engine.bin}\n`);

  for (const { lang, file, texPath } of built) {
    for (let pass = 0; pass < engine.passes; pass++) {
      execFileSync(engine.bin, engine.args(texPath), { cwd: WORK, stdio: 'inherit' });
    }
    const pdf = join(WORK, `cv-${lang}.pdf`);
    if (!existsSync(pdf)) throw new Error(`${engine.bin} did not generate ${pdf}`);
    copyFileSync(pdf, join(OUT, file));
    console.log(`  PDF   ${lang}  →  public/downloads/${file}`);
  }

  console.log('\nDone. Commit the PDFs: Cloudflare Pages serves them as files and does not compile LaTeX.');
}

main();
