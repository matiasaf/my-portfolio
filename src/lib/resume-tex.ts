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
\addtolength{\topmargin}{-0.7in}
% El estirado del alto es asimetrico a proposito: el -0.7in de \topmargin ya
% subio el bloque de texto, asi que agrandar el alto lo mismo devolveria todo
% ese margen al pie. Con 1.1in la ultima linea corta ~0.5in antes del borde y
% la pagina respira abajo (con \raggedbottom el sobrante se acumula ahi).
\addtolength{\textheight}{1.1in}

\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}
\setlength{\parindent}{0pt}

% El espaciado se controla SOLO desde aca. El template original lo ajustaba
% con \vspace negativos calibrados contra el espaciado por defecto de las
% listas; al compactar las listas esos negativos se acumulaban y las lineas
% terminaban superpuestas.
\setlist{topsep=2pt, partopsep=0pt, parsep=0pt, itemsep=1.5pt}

% Titulo de seccion: versalitas y filete, el \scshape del template.
% Requiere que el titulo venga en Title Case: \scshape sobre texto ya en
% mayusculas no produce versalitas, deja mayusculas normales.
\titleformat{\section}{\vspace{-6pt}\scshape\raggedright\large}{}{0em}{}[\color{black}\titlerule \vspace{-6pt}]

% ── Comandos de entrada ──────────────────────────────────────────────────
\newcommand{\resumeItem}[1]{\item\small{#1}}

% Linea de stack con sangria francesa, para que las continuaciones alineen
% bajo el contenido y no se lean como items nuevos. Va como parrafo suelto y
% no como \item: dentro de un itemize la lista pisa el \hangindent.
\newcommand{\resumeSkill}[2]{\par\hangindent=1.7em\hangafter=1\noindent\textbf{#1}: #2\par}

% #1 titulo  #2 fechas (derecha)  #3 subtitulo  #4 contexto (derecha)
\newcommand{\resumeSubheading}[4]{%
  \item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4}
    \end{tabular*}%
}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
% label explicito: al estar anidada, esta lista tomaria \labelitemii (una raya)
% en vez de la vinieta del template.
\newcommand{\resumeItemListStart}{\begin{itemize}[label=$\bullet$, leftmargin=1.2em, topsep=2pt]}
% El \vspace de cierre es lo que separa un puesto del siguiente: sin el, los
% bullets de uno quedan pegados al encabezado del que sigue y el bloque de
% experiencia se lee como un unico muro de texto.
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{7pt}}
`;

function renderHeader(r: Resume): string {
  const link = (c: Resume['contacts'][number]) =>
    `\\href{${escapeUrl(c.href)}}{\\underline{${escapeTex(c.display)}}}`;

  /* En una sola linea los cuatro datos desbordan y el salto automatico deja
     un "|" colgando al final del renglon. Se parte a proposito: ubicacion y
     mail arriba, perfiles web abajo. */
  const mail = r.contacts.filter((c) => c.href.startsWith('mailto:'));
  const web = r.contacts.filter((c) => !c.href.startsWith('mailto:'));
  const line1 = [escapeTex(r.location), ...mail.map(link)].join(' $|$ ');
  const line2 = web.map(link).join(' $|$ ');

  return String.raw`\begin{center}
    {\Huge \scshape ${escapeTex(r.name)}} \\ \vspace{2pt}
    \small ${escapeTex(r.headline)} \\ \vspace{3pt}
    \small ${line1} \\ \vspace{1pt}
    \small ${line2}
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
    .map(([group, items]) => `   \\resumeSkill{${escapeTex(group)}}{${escapeTex(items)}}`)
    .join('\n');

  // Educacion e idiomas van al final, no al principio como en el template original.
  return `${PREAMBLE}
\\begin{document}

${renderHeader(r)}

\\section{${escapeTex(r.labels.profile)}}
  \\small{${escapeTex(r.summary.body)}}

\\section{${escapeTex(r.labels.experience)}}
\\resumeSubHeadingListStart

${experience}

\\resumeSubHeadingListEnd

\\section{${escapeTex(r.labels.stack)}}
 {\\small\\leftskip=0.15in
${skills}
 \\par}

\\section{${escapeTex(r.labels.education)}}
 \\begin{itemize}[leftmargin=0.15in, label={}]
   \\item[]\\small \\textbf{${escapeTex(r.education.degree)}} \\hfill \\textit{${escapeTex(r.education.detail)}}
 \\end{itemize}

\\section{${escapeTex(r.labels.languages)}}
 \\begin{itemize}[leftmargin=0.15in, label={}]
   \\item[]\\small ${escapeTex(r.languages.primary)} \\hfill ${escapeTex(r.languages.secondary)}
 \\end{itemize}

\\end{document}
`;
}
