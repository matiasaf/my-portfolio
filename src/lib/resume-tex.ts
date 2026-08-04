/**
 * Render de un Resume a LaTeX, siguiendo el template clasico de Jake Ryan
 * (una columna, versalitas con filete, fechas a la derecha).
 *
 * Motor: pensado para XeLaTeX / LuaLaTeX (que es lo que usa Tectonic por
 * defecto), donde el UTF-8 funciona nativo. El preambulo igual detecta el
 * motor con `iftex`, asi que tambien compila con pdfLaTeX.
 */
import type { Resume, ResumeRole } from '../content/resume';

/**
 * Escapa los metacaracteres de LaTeX.
 *
 * El caso peligroso es `%`: en LaTeX abre un comentario, asi que "35%" se
 * comeria en silencio el resto de la linea y el PDF saldria con la frase
 * cortada, sin ningun error de compilacion. `&` en cambio rompe ruidosamente
 * porque es separador de columnas dentro de tabular.
 *
 * La barra invertida va primero: si no, escaparia las barras que introducen
 * los reemplazos siguientes.
 */
export function escapeTex(input: string): string {
  return input
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([&%$#_{}])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}')
    // Guiones tipograficos a las ligaduras de TeX.
    .replace(/—/g, '---')
    .replace(/–/g, '--');
}

/** Escapa una URL para \href: ahi `%` y `#` siguen siendo especiales. */
function escapeUrl(input: string): string {
  return input.replace(/([%#\\])/g, '\\$1');
}

const PREAMBLE = String.raw`% !TEX program = xelatex
% ─────────────────────────────────────────────────────────────────────────
%  CV — generado automaticamente desde src/content/resume.ts
%  NO editar a mano: los cambios se pisan en el proximo build.
%  Compilar:  tectonic cv.tex     (o xelatex/lualatex/pdflatex cv.tex)
% ─────────────────────────────────────────────────────────────────────────
\documentclass[a4paper,11pt]{article}

\usepackage{iftex}
\ifPDFTeX
  % pdfLaTeX necesita declarar la codificacion; ademas glyphtounicode es lo
  % que hace que el texto del PDF sea extraible por un ATS.
  \usepackage[utf8]{inputenc}
  \usepackage[T1]{fontenc}
  \input{glyphtounicode}
  \pdfgentounicode=1
\fi

\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{tabularx}
\usepackage{xcolor}

\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-0.6in}
\addtolength{\textheight}{1.2in}

\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Titulo de seccion: versalitas y filete, el \scshape del template.
\titleformat{\section}{\vspace{-4pt}\scshape\raggedright\large}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% ── Comandos de entrada ──────────────────────────────────────────────────
\newcommand{\resumeItem}[1]{\item\small{#1 \vspace{-2pt}}}

% #1 titulo  #2 fechas (derecha)  #3 subtitulo  #4 contexto (derecha)
\newcommand{\resumeSubheading}[4]{%
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}%
}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}
`;

function renderHeader(r: Resume): string {
  const links = r.contacts
    .map((c) => `\\href{${escapeUrl(c.href)}}{\\underline{${escapeTex(c.display)}}}`)
    .join(' $|$ ');

  return String.raw`\begin{center}
    {\Huge \scshape ${escapeTex(r.name)}} \\ \vspace{3pt}
    \small ${escapeTex(r.headline)} \\ \vspace{3pt}
    \small ${escapeTex(r.location)} $|$ ${links}
\end{center}`;
}

function renderRole(role: ResumeRole): string {
  const bullets = role.bullets.map((b) => `      \\resumeItem{${escapeTex(b)}}`).join('\n');
  return String.raw`  \resumeSubheading
    {${escapeTex(role.company)}}{${escapeTex(role.period)}}
    {${escapeTex(role.role)}}{${escapeTex(role.context)}}
    \resumeItemListStart
${bullets}
    \resumeItemListEnd`;
}

export function renderResumeTex(r: Resume): string {
  const experience = r.roles.map(renderRole).join('\n\n');

  const skills = r.skills
    .map(([group, items]) => `     \\textbf{${escapeTex(group)}}{: ${escapeTex(items)}} \\\\`)
    .join('\n');

  // Educacion e idiomas van al final, no al principio como en el template original.
  return `${PREAMBLE}
\\begin{document}

${renderHeader(r)}

\\section{${escapeTex(r.labels.profile)}}
  \\small{\\textbf{${escapeTex(r.summary.headline)}}} \\\\
  \\small{${escapeTex(r.summary.body)}}

\\section{${escapeTex(r.labels.experience)}}
\\resumeSubHeadingListStart

${experience}

\\resumeSubHeadingListEnd

\\section{${escapeTex(r.labels.stack)}}
 \\begin{itemize}[leftmargin=0.15in, label={}]
   \\small{\\item{
${skills}
   }}
 \\end{itemize}

\\section{${escapeTex(r.labels.education)}}
 \\begin{itemize}[leftmargin=0.15in, label={}]
   \\small{\\item{
     \\textbf{${escapeTex(r.education.degree)}} \\\\
     \\textit{${escapeTex(r.education.detail)}}
   }}
 \\end{itemize}

\\section{${escapeTex(r.labels.languages)}}
 \\begin{itemize}[leftmargin=0.15in, label={}]
   \\small{\\item{
     ${escapeTex(r.languages.primary)} \\\\
     ${escapeTex(r.languages.secondary)}
   }}
 \\end{itemize}

\\end{document}
`;
}
