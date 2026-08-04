#!/usr/bin/env node
/**
 * Genera el PDF del CV con LaTeX, fuera del build del sitio.
 *
 *   npm run cv:pdf
 *
 * Lee src/content/resume.ts (la misma fuente que el HTML), emite .tex,
 * lo compila y deja el PDF en public/downloads/, que Astro copia tal cual
 * a dist/. El sitio sigue siendo 100% estatico: esto corre aparte y el
 * resultado se commitea, porque Cloudflare Pages no puede compilar LaTeX
 * en su build.
 *
 * Requiere un motor de LaTeX. El recomendado es Tectonic:
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
 * Motores en orden de preferencia. Tectonic primero: un solo binario, baja
 * solo los paquetes que el documento usa, y usa XeTeX (UTF-8 nativo).
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
      /* siguiente */
    }
  }
  return null;
}

/**
 * Red de seguridad contra el fallo silencioso: un `%` sin escapar comenta el
 * resto de la linea y el PDF sale con la frase cortada, sin error de
 * compilacion. Preferimos romper aca antes que publicar un CV mutilado.
 */
function assertEscaped(tex, lang) {
  const body = tex.slice(tex.indexOf('\\begin{document}'));
  const problems = [];
  for (const [name, re] of [['%', /(?<!\\)%/g], ['&', /(?<!\\)&/g]]) {
    for (const m of body.matchAll(re)) {
      problems.push(`  ${name} sin escapar en [${lang}]: ...${body.slice(Math.max(0, m.index - 60), m.index + 20).replace(/\n/g, ' ')}...`);
    }
  }
  if (problems.length) {
    throw new Error(`Escapado de LaTeX incompleto:\n${problems.join('\n')}`);
  }
}

function main() {
  rmSync(WORK, { recursive: true, force: true });
  mkdirSync(WORK, { recursive: true });
  mkdirSync(OUT, { recursive: true });

  // 1. Render + validacion. Esto corre siempre, aunque no haya motor.
  const built = TARGETS.map(({ lang, file }) => {
    const tex = renderResumeTex(resume[lang]);
    assertEscaped(tex, lang);
    const texPath = join(WORK, `cv-${lang}.tex`);
    writeFileSync(texPath, tex, 'utf8');
    console.log(`  .tex  ${lang}  ${tex.length.toLocaleString()} B  →  ${texPath}`);
    return { lang, file, texPath };
  });
  console.log('  escapado validado: sin % ni & sueltos\n');

  // 2. Compilacion.
  const engine = findEngine();
  if (!engine) {
    console.error('No hay ningun motor de LaTeX instalado.\n');
    console.error('  brew install tectonic      (recomendado: ~30 MB, sin TeX Live)\n');
    console.error(`Los .tex quedaron en ${WORK} y son compilables en Overleaf.`);
    process.exit(1);
  }
  console.log(`  motor: ${engine.bin}\n`);

  for (const { lang, file, texPath } of built) {
    for (let pass = 0; pass < engine.passes; pass++) {
      execFileSync(engine.bin, engine.args(texPath), { cwd: WORK, stdio: 'inherit' });
    }
    const pdf = join(WORK, `cv-${lang}.pdf`);
    if (!existsSync(pdf)) throw new Error(`${engine.bin} no genero ${pdf}`);
    copyFileSync(pdf, join(OUT, file));
    console.log(`  PDF   ${lang}  →  public/downloads/${file}`);
  }

  console.log('\nListo. Commiteá los PDF: Cloudflare Pages no compila LaTeX y los sirve como archivos.');
}

main();
