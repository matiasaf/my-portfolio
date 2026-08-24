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
 * Verified metrics rendered on the professional home, in display order.
 * Adding an entry here is a claim; it needs a source before it ships.
 */
export const proofMetrics: EvidenceEntry[] = [
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
];

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
  /** Selected work lives on the home page until the dedicated index exists. */
  work: string;
}> = {
  en: {
    home: '/en/',
    writing: '/en/writing/',
    about: '/en/about/',
    resume: '/en/cv/',
    resumePdf: '/downloads/matias-fernandez-resume.pdf',
    work: '/en/#work',
  },
  es: {
    home: '/es/',
    writing: '/es/publicaciones/',
    about: '/sobre-mi/',
    resume: '/cv/',
    resumePdf: '/downloads/matias-fernandez-cv.pdf',
    work: '/es/#work',
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

/**
 * Status of the AI Knowledge Platform, mirrored from the project repository's
 * PROGRESS.md on 2026-08-21. Every surface that mentions the project reads this,
 * so the site cannot show two different milestone states.
 *
 * `completed` counts accepted milestones only. Milestone 4 is implemented and its
 * provider-independent gates pass, but selecting a model and recording live answer
 * quality still requires provider credentials, so it is not counted as accepted.
 */
export const aiKnowledgePlatformStatus = {
  completed: 3,
  total: 5,
  /** Short badge, e.g. for a card header. */
  progress: { en: '3 / 5 milestones', es: '3 / 5 milestones' } satisfies Localized,
  /** Sentence-length status used wherever the distinction matters. */
  headline: {
    en: 'Milestones 1–3 accepted · milestone 4 implemented, live provider acceptance pending',
    es: 'Milestones 1–3 aceptados · milestone 4 implementado, con la aceptación del proveedor en vivo pendiente',
  } satisfies Localized,
  /** Uppercase eyebrow variant used by the project page. */
  badge: {
    en: 'MILESTONES 1–3 ACCEPTED · MILESTONE 4 IMPLEMENTED',
    es: 'MILESTONES 1–3 ACEPTADOS · MILESTONE 4 IMPLEMENTADO',
  } satisfies Localized,
  repository: 'https://github.com/matiasaf/ai-knowledge-platform',
} as const;

export interface ExperienceEntry {
  period: Localized;
  company: Localized;
  role: Localized;
  context: Localized;
  summary: Localized;
  /** One line of evidence. Team results say so in the sentence itself. */
  proof: Localized;
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

export interface SelectedWork {
  id: string;
  period: Localized;
  title: Localized;
  /** Exact ownership. Leading a frontend is not the same as owning a system. */
  role: Localized;
  summary: Localized;
  proof: Localized;
  stack: string[];
  /** Where the card currently points. PR 2 and PR 3 replace these with case studies. */
  href: Record<Lang, string>;
  cta: Localized;
  /** True when the destination is a full case study rather than a supporting page. */
  external?: boolean;
  tone: 'coral' | 'blue' | 'lime' | 'violet';
}

/**
 * Selected engineering work. Three entries by design: a large professional platform,
 * the fully public project, and a modernization with a team-owned result.
 * Queued or unstarted projects do not belong here.
 */
export const selectedWork: SelectedWork[] = [
  {
    id: 'enterprise-ai-platform',
    period: { en: '2024 — NOW', es: '2024 — HOY' },
    title: { en: 'Enterprise AI Platform', es: 'Enterprise AI Platform' },
    role: {
      en: 'Frontend lead · hands-on across the stack',
      es: 'Liderazgo de frontend · hands-on en todo el stack',
    },
    summary: {
      en: 'An Azure OpenAI product for an enterprise healthcare client. I lead its React and Next.js frontend, and contribute where the product needs it: Python document processing, Pinecone retrieval, SignalR streaming, and targeted .NET and Azure Functions work.',
      es: 'Un producto sobre Azure OpenAI para un cliente enterprise de salud. Lidero su frontend en React y Next.js, y contribuyo donde el producto lo necesita: procesamiento documental con Python, recuperación con Pinecone, streaming con SignalR y trabajo puntual en .NET y Azure Functions.',
    },
    proof: {
      en: '1,000+ documents through the pipeline · sub-2s time-to-first-token target',
      es: '1.000+ documentos en el pipeline · objetivo de time-to-first-token < 2s',
    },
    stack: ['React', 'Next.js', 'Azure OpenAI', 'Pinecone', 'SignalR', '.NET'],
    href: { en: '/en/about/#work', es: '/sobre-mi/#work' },
    cta: { en: 'See the current work', es: 'Ver el trabajo actual' },
    tone: 'coral',
  },
  {
    id: 'ai-knowledge-platform',
    period: { en: 'PUBLIC REPOSITORY', es: 'REPOSITORIO PÚBLICO' },
    title: { en: 'AI Knowledge Platform', es: 'AI Knowledge Platform' },
    role: {
      en: 'Sole author · built in public',
      es: 'Autor único · construido en público',
    },
    summary: {
      en: 'A document knowledge platform where retrieval quality, honest failure states, and verifiable citations are product surfaces rather than afterthoughts. Ingestion, page-level extraction, and measured lexical retrieval are accepted; grounded answers are implemented and awaiting live provider acceptance.',
      es: 'Una plataforma de conocimiento documental donde la calidad de retrieval, los estados de falla honestos y las citas verificables son parte del producto. La ingesta, la extracción por página y el retrieval léxico medido están aceptados; las respuestas fundamentadas están implementadas y esperan la aceptación del proveedor en vivo.',
    },
    proof: {
      en: 'Recall@3 and MRR@3 enforced in CI · 13-case answer dataset',
      es: 'Recall@3 y MRR@3 verificados en CI · dataset de 13 casos de respuesta',
    },
    stack: ['Python', 'FastAPI', 'Next.js', 'SQLite FTS5', 'OpenAI Responses API'],
    href: {
      en: '/en/projects/ai-knowledge-platform/',
      es: '/projects/ai-knowledge-platform/',
    },
    cta: { en: 'Read the build log', es: 'Ver el paso a paso' },
    tone: 'blue',
  },
  {
    id: 'serverless-modernization',
    period: { en: '2019 — 2021', es: '2019 — 2021' },
    title: {
      en: 'Serverless Platform Modernization',
      es: 'Modernización de plataforma serverless',
    },
    role: {
      en: 'Full-Stack Engineer · shared technical coordination',
      es: 'Full-Stack Engineer · coordinación técnica compartida',
    },
    summary: {
      en: 'Modernizing an analytics platform: an Angular 7-to-12 migration and a move from Java services to Node.js and TypeScript serverless services on AWS, with Terraform-managed infrastructure and blue-green deployments. I shared coordination of the UI work with two other developers.',
      es: 'Modernización de una plataforma de analytics: migración de Angular 7 a 12 y pasaje de servicios Java a servicios serverless en Node.js y TypeScript sobre AWS, con infraestructura gestionada con Terraform y despliegues blue-green. Compartí la coordinación del trabajo de UI con otros dos desarrolladores.',
    },
    proof: {
      en: 'Team migration reduced infrastructure cost by ≈ 30%',
      es: 'La migración del equipo redujo el costo de infraestructura ≈ 30%',
    },
    stack: ['Angular', 'Node.js', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'Terraform'],
    href: { en: '/en/about/#experience', es: '/sobre-mi/#experience' },
    cta: { en: 'See the experience', es: 'Ver la experiencia' },
    tone: 'lime',
  },
];
