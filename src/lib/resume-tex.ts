/**
 * Renders a Resume as LaTeX following the classic Jake Ryan template:
 * one column, small-cap ruled headings, and right-aligned dates.
 *
 * Designed for XeLaTeX or LuaLaTeX, which Tectonic uses by default and where
 * UTF-8 works natively. The preamble still detects the engine with `iftex`, so
 * it also compiles with pdfLaTeX.
 */
import type { Resume, ResumeRole } from '../content/resume';

/**
 * Escapes LaTeX metacharacters.
 *
 * `%` is particularly dangerous because it begins a LaTeX comment. A value
 * such as "35%" would silently discard the remainder of the line and truncate
 * the PDF. `&` fails loudly because it separates columns inside tabular.
 *
 * Backslashes are handled first so later replacements do not escape the
 * backslashes they introduce.
 */
export function escapeTex(input: string): string {
  return input
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([&%$#_{}])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}')
    // Convert typographic dashes to TeX ligatures.
    .replace(/—/g, '---')
    .replace(/–/g, '--');
}

/** Escapes a URL for \href, where `%` and `#` remain special. */
function escapeUrl(input: string): string {
  return input.replace(/([%#\\])/g, '\\$1');
}

const PREAMBLE = String.raw`% !TEX program = xelatex
% ─────────────────────────────────────────────────────────────────────────
%  Résumé — generated automatically from src/content/resume.ts
%  DO NOT edit manually: the next build overwrites any changes.
%  Compile: tectonic cv.tex     (or xelatex/lualatex/pdflatex cv.tex)
% ─────────────────────────────────────────────────────────────────────────
\documentclass[a4paper,11pt]{article}

\usepackage{iftex}
\ifPDFTeX
  % pdfLaTeX requires an explicit encoding. glyphtounicode also keeps the PDF
  % text extractable by an applicant tracking system.
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
% Height expansion is intentionally asymmetric. The -0.7in top margin already
% moved the text block upward; increasing the height by the same amount would
% return all that space at the bottom. With 1.1in, the final line ends roughly
% 0.5in before the edge and \raggedbottom leaves breathing room below.
\addtolength{\textheight}{1.1in}

\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}
\setlength{\parindent}{0pt}

% Spacing is controlled only here. The original template used negative \vspace
% values calibrated against default list spacing. Compacting the lists caused
% those offsets to accumulate and overlap lines.
\setlist{topsep=2pt, partopsep=0pt, parsep=0pt, itemsep=1.5pt}

% Section heading: small caps and a rule, following the template's \scshape.
% Input must use Title Case because \scshape over uppercase text produces
% regular capitals rather than small caps.
\titleformat{\section}{\vspace{-6pt}\scshape\raggedright\large}{}{0em}{}[\color{black}\titlerule \vspace{-6pt}]

% ── Input commands ───────────────────────────────────────────────────────
\newcommand{\resumeItem}[1]{\item\small{#1}}

% Stack line with a hanging indent so wrapped lines align with the content and
% do not look like new items. It is a standalone paragraph rather than an
% \item because itemize overrides \hangindent.
\newcommand{\resumeSkill}[2]{\par\hangindent=1.7em\hangafter=1\noindent\textbf{#1}: #2\par}

% #1 title  #2 dates (right)  #3 subtitle  #4 context (right)
\newcommand{\resumeSubheading}[4]{%
  \item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4}
    \end{tabular*}%
}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
% Explicit label: when nested, this list would otherwise inherit \labelitemii,
% a dash, instead of the template's bullet.
\newcommand{\resumeItemListStart}{\begin{itemize}[label=$\bullet$, leftmargin=1.2em, topsep=2pt]}
% Closing \vspace separates one role from the next. Without it, one role's
% bullets touch the next heading and the experience section becomes a wall.
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{7pt}}
`;

function renderHeader(r: Resume): string {
  const link = (c: Resume['contacts'][number]) =>
    `\\href{${escapeUrl(c.href)}}{\\underline{${escapeTex(c.display)}}}`;

  /* Four values overflow on one line, and automatic wrapping leaves a dangling
     separator. Split deliberately: location and email above, web profiles below. */
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

  // Education and languages belong at the end, unlike the original template.
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
