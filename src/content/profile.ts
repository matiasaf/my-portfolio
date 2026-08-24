/**
 * Single source of truth for public professional positioning.
 *
 * It is consumed by:
 *   - src/components/ProfessionalHome.astro → /en/ and /es/
 *   - src/components/PortfolioHome.astro    → /en/about/ and /sobre-mi/
 *
 * Two rules govern this file:
 *
 * 1. Every public impact statement lives in `proofMetrics` as an evidence entry that
 *    records its source, whether it is an individual or a team result, and whether it
 *    is a measured result, an implemented capability, or a target. Copy must never
 *    promote a claim up that scale.
 * 2. Claims that are not currently supported live in `retiredClaims` with the reason,
 *    so they are not reintroduced by a future rewrite. They are never rendered.
 *
 * Résumé content stays in `src/content/resume.ts`. This file holds only what the
 * portfolio presents as positioning and evidence.
 */

export type Lang = 'es' | 'en';

/** A string that must exist in both published languages. */
export type Localized = Record<Lang, string>;

/**
 * How strong a claim is.
 *   - `measured`: an observed result with a number behind it.
 *   - `implemented`: a capability that exists and runs, without an accepted metric.
 *   - `target`: a design goal. Never phrase one as an achieved result.
 */
export type EvidenceKind = 'measured' | 'implemented' | 'target';

/** Whether the result belongs to one person or to a team. */
export type Attribution = 'individual' | 'team';

export interface EvidenceEntry {
  id: string;
  /** Figure rendered by the proof row. */
  value: string;
  /** Exact public wording, in both languages. */
  label: Localized;
  kind: EvidenceKind;
  attribution: Attribution;
  /** Where the claim comes from, so it can be re-checked before the wording changes. */
  source: string;
  /** Whether the wording is cleared for a public, client-visible page. */
  publicDisclosure: boolean;
}

/**
 * Complete ledger of numeric public claims. Case-study-only targets belong here too,
 * even when they are intentionally absent from the home proof row.
 */
export const evidenceLedger: EvidenceEntry[] = [
  {
    id: 'years',
    value: '10+',
    label: { en: 'years shipping software', es: 'años entregando software' },
    kind: 'measured',
    attribution: 'individual',
    source: 'Continuous professional experience since 2016 (src/content/resume.ts).',
    publicDisclosure: true,
  },
  {
    id: 'documents',
    value: '1K+',
    label: {
      en: 'documents through AI pipelines',
      es: 'documentos en pipelines de AI',
    },
    kind: 'measured',
    attribution: 'individual',
    source: 'AI Studio processing pipeline, Argeniss / Amplity Health.',
    publicDisclosure: true,
  },
  {
    id: 'dashboard',
    value: '35%',
    label: {
      en: 'faster Business Intelligence dashboard',
      es: 'dashboard de Business Intelligence más rápido',
    },
    kind: 'measured',
    attribution: 'individual',
    source: 'Amplity.com Business Intelligence Tool, Angular frontend and Node.js endpoints.',
    publicDisclosure: true,
  },
  {
    id: 'infrastructure',
    value: '~30%',
    label: {
      // The team attribution is part of the sentence, not a footnote, because the
      // result cannot be presented as individual ownership.
      en: 'lower infrastructure cost from a team migration',
      es: 'menos costo de infraestructura por una migración de equipo',
    },
    kind: 'measured',
    attribution: 'team',
    source: 'Java to Node.js/TypeScript serverless migration at Hexacta / GlobalLogic.',
    publicDisclosure: true,
  },
  {
    id: 'ttft-target',
    value: '<2s',
    label: {
      en: 'time-to-first-token design target',
      es: 'objetivo de diseño de time-to-first-token',
    },
    kind: 'target',
    attribution: 'individual',
    source: 'Enterprise AI Platform performance requirement, Argeniss / Amplity Health.',
    publicDisclosure: true,
  },
];

/** Verified metrics rendered on the professional home, in display order. */
export const proofMetrics: EvidenceEntry[] = ['years', 'documents', 'dashboard', 'infrastructure']
  .map((id) => evidenceLedger.find((entry) => entry.id === id))
  .filter((entry): entry is EvidenceEntry => entry !== undefined);

/**
 * Claims that appeared in earlier drafts and are not currently supported.
 * Documented so they are not reintroduced. Never rendered.
 */
export const retiredClaims: { claim: string; reason: string; replacement?: string }[] = [
  {
    claim: 'Led more than five engineers',
    reason: 'No verifiable formal reporting line or team size behind the number.',
  },
  {
    claim: 'Served more than 200,000 users',
    reason: 'No usage figure that can be sourced or disclosed.',
  },
  {
    claim: 'Improved performance by 40%',
    reason: 'The documented figure is 35% on one dashboard.',
    replacement: 'dashboard',
  },
  {
    claim: 'Reduced infrastructure cost by 60%',
    reason: 'The documented figure is approximately 30%, and it is a team result.',
    replacement: 'infrastructure',
  },
];

export interface Positioning {
  name: string;
  /** Public headline. Level and scope, not an aspirational title. */
  role: Localized;
  /** Specialization line shown under the role. */
  specialization: Localized;
  /** Supporting statement: what the work actually is. */
  statement: Localized;
  /** Location and time-zone overlap, which recruiters screen on. */
  availability: Localized;
}

export const positioning: Positioning = {
  name: 'Matías Fernández',
  role: { en: 'Senior Software Engineer', es: 'Senior Software Engineer' },
  specialization: {
    en: 'Frontend Lead · Applied AI',
    es: 'Frontend Lead · Applied AI',
  },
  statement: {
    en: 'I build reliable product experiences across frontend architecture, AI systems, APIs, and cloud delivery.',
    es: 'Construyo experiencias de producto confiables sobre arquitectura frontend, sistemas de AI, APIs y entrega en la nube.',
  },
  availability: {
    en: '10+ years shipping software from Argentina, with overlap across American time zones.',
    es: '10+ años entregando software desde Argentina, con overlap con los husos horarios americanos.',
  },
};

/**
 * Roles being targeted, in priority order. Staff Engineer, Engineering Lead, and
 * Software Architect are career directions and are deliberately absent: this list
 * describes what is being applied for, not a title already held.
 */
export const targetRoles: Localized = {
  en: 'Senior or Lead Frontend Engineer · Senior Full-Stack Engineer with a frontend focus · Full-Stack AI Product Engineer · React/TypeScript Tech Lead',
  es: 'Senior o Lead Frontend Engineer · Senior Full-Stack Engineer con foco frontend · Full-Stack AI Product Engineer · Tech Lead React/TypeScript',
};

export const preferredEnvironment: Localized = {
  en: 'Remote from Argentina with overlap across American time zones · B2B SaaS, AI platforms, developer tools, data products, fintech, healthtech, and enterprise software · Product teams with technical autonomy and room to make architectural decisions',
  es: 'Remoto desde Argentina con overlap con los husos horarios americanos · B2B SaaS, plataformas de AI, developer tools, productos de datos, fintech, healthtech y software empresarial · Equipos de producto con autonomía técnica y espacio para decidir arquitectura',
};

export const contactLinks = {
  email: 'mailto:fernandez.amatias@gmail.com',
  github: 'https://github.com/matiasaf',
  linkedin: 'https://linkedin.com/in/fernandez-amatias',
} as const;

/**
 * Public routes that the professional navigation depends on. Article URLs are not
 * listed here because they must keep working exactly as published.
 */
export const routes: Record<Lang, {
  home: string;
  writing: string;
  about: string;
  resume: string;
  resumePdf: string;
  work: string;
}> = {
  en: {
    home: '/en/',
    writing: '/en/writing/',
    about: '/en/about/',
    resume: '/en/cv/',
    resumePdf: '/downloads/matias-fernandez-resume.pdf',
    work: '/en/work/',
  },
  es: {
    home: '/es/',
    writing: '/es/publicaciones/',
    about: '/sobre-mi/',
    resume: '/cv/',
    resumePdf: '/downloads/matias-fernandez-cv.pdf',
    work: '/es/trabajo/',
  },
};

/** Primary navigation: Work · Writing · About · Resume. */
export const navigation = (lang: Lang) => {
  const r = routes[lang];
  return lang === 'en'
    ? [
        { label: 'Work', href: r.work },
        { label: 'Writing', href: r.writing },
        { label: 'About', href: r.about },
        { label: 'Resume', href: r.resume },
      ]
    : [
        { label: 'Proyectos', href: r.work },
        { label: 'Publicaciones', href: r.writing },
        { label: 'Sobre mí', href: r.about },
        { label: 'CV', href: r.resume },
      ];
};

export interface ExperienceEntry {
  period: Localized;
  company: Localized;
  role: Localized;
  context: Localized;
  summary: Localized;
  /** One line of evidence. Team results say so in the sentence itself. */
  proof: Localized;
  /** Published case studies that substantiate this role's selected claims. */
  caseStudies?: { label: Localized; href: Record<Lang, string> }[];
  tone: 'coral' | 'blue' | 'lime' | 'violet';
}

/**
 * Condensed career path, shared by the professional home and the About page so the
 * two cannot describe the same role differently.
 */
export const condensedExperience: ExperienceEntry[] = [
  {
    period: { en: '2022 — NOW', es: '2022 — HOY' },
    company: { en: 'Argeniss Software', es: 'Argeniss Software' },
    role: { en: 'Senior Full-Stack Engineer', es: 'Senior Full-Stack Engineer' },
    context: { en: 'Amplity Health', es: 'Amplity Health' },
    summary: {
      en: 'Frontend lead of AI Studio and hands-on contributor across Azure IC Portal, an inherited Website Chatbot, an internal SDLC platform, and Amplity.com.',
      es: 'Lidero el frontend de AI Studio y contribuyo hands-on en Azure IC Portal, un Website Chatbot heredado, una plataforma interna de SDLC y Amplity.com.',
    },
    proof: {
      en: '1,000+ documents processed · 35% faster BI dashboard',
      es: '1.000+ documentos procesados · dashboard BI 35% más rápido',
    },
    caseStudies: [
      {
        label: { en: 'Enterprise AI Platform case study', es: 'Caso de plataforma empresarial de AI' },
        href: {
          en: '/en/work/enterprise-ai-platform/',
          es: '/es/trabajo/enterprise-ai-platform/',
        },
      },
    ],
    tone: 'coral',
  },
  {
    period: { en: '2021 — 2022', es: '2021 — 2022' },
    company: { en: 'Endava', es: 'Endava' },
    role: { en: 'Full-Stack Engineer', es: 'Full-Stack Engineer' },
    context: { en: 'Bloomberg LP · Workpaper', es: 'Bloomberg LP · Workpaper' },
    summary: {
      en: 'React, Redux, TypeScript, Node.js, PostgreSQL, Docker, and AWS during the product’s beta launch, plus Web Vitals and end-to-end coverage.',
      es: 'React, Redux, TypeScript, Node.js, PostgreSQL, Docker y AWS durante el lanzamiento beta, más Web Vitals y cobertura end-to-end.',
    },
    proof: {
      en: 'Frontend + backend · mentoring and reviews in a 5-person team',
      es: 'Frontend + backend · mentoring y reviews en un equipo de 5 personas',
    },
    tone: 'blue',
  },
  {
    period: { en: '2019 — 2021', es: '2019 — 2021' },
    company: { en: 'Hexacta / GlobalLogic', es: 'Hexacta / GlobalLogic' },
    role: { en: 'Full-Stack Engineer', es: 'Full-Stack Engineer' },
    context: { en: 'TechInsights · BA147 · SUACI', es: 'TechInsights · BA147 · SUACI' },
    summary: {
      en: 'Serverless migration, Angular 7-to-12 modernization, analytics widgets, Terraform infrastructure, Ionic mobile delivery, and Java/Spring Boot services.',
      es: 'Migración serverless, modernización Angular 7–12, widgets de analytics, infraestructura Terraform, entrega mobile con Ionic y servicios Java/Spring Boot.',
    },
    proof: {
      en: 'Team migration reduced infrastructure cost ≈ 30%',
      es: 'La migración del equipo redujo costos de infraestructura ≈ 30%',
    },
    caseStudies: [
      {
        label: { en: 'Serverless modernization case study', es: 'Caso de modernización serverless' },
        href: {
          en: '/en/work/serverless-modernization/',
          es: '/es/trabajo/serverless-modernization/',
        },
      },
    ],
    tone: 'lime',
  },
  {
    period: { en: '2016 — 2019', es: '2016 — 2019' },
    company: { en: 'Earlier work', es: 'Experiencia inicial' },
    role: { en: 'Software Engineer', es: 'Software Engineer' },
    context: { en: 'Government of Entre Ríos · Genosha', es: 'Gobierno de Entre Ríos · Genosha' },
    summary: {
      en: 'Public-sector platforms with PHP, Oracle, React and Laravel, ETL automation with Node.js, and a video-generation platform on Docker, AWS ECS, and FFmpeg.',
      es: 'Plataformas públicas con PHP, Oracle, React y Laravel, automatización ETL con Node.js y una plataforma de generación de video sobre Docker, AWS ECS y FFmpeg.',
    },
    proof: {
      en: 'Regulated systems · auditing · traceability · compliance',
      es: 'Sistemas regulados · auditoría · trazabilidad · cumplimiento',
    },
    tone: 'violet',
  },
];
