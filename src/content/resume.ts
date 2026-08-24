/**
 * Single source of truth for the résumé. It is consumed by:
 *   - src/components/ResumePage.astro  → HTML (screen and print)
 *   - src/pages/cv.tex.ts / en/cv.tex.ts → LaTeX
 *
 * Any new output format, such as JSON Resume or DOCX, should read from this
 * file instead of duplicating content.
 */

export interface ResumeContact {
  /** Text displayed by the HTML view. */
  label: string;
  /** Text printed by the LaTeX PDF: a readable URL, as required by the template. */
  display: string;
  href: string;
}

export interface ResumeRole {
  company: string;
  role: string;
  /** Client or scope; rendered in italics on the right side of the PDF. */
  context: string;
  period: string;
  bullets: string[];
}

export interface Resume {
  name: string;
  headline: string;
  location: string;
  contacts: ResumeContact[];
  /** Title Case section names. Each output controls capitalization independently:
   *  LaTeX uses \scshape and HTML uses font-variant-caps. */
  labels: {
    profile: string;
    experience: string;
    stack: string;
    education: string;
    languages: string;
  };
  summary: {
    /** Display headline used only on the web. The PDF omits it because a positioning
     *  statement reads like landing-page copy in a printed résumé. */
    headline: string;
    /** Professional summary shared by the web and PDF outputs. */
    body: string;
  };
  roles: ResumeRole[];
  skills: [string, string][];
  education: { degree: string; detail: string };
  languages: { primary: string; secondary: string };
}

export type ResumeVariantId = 'frontend-lead' | 'ai-product-engineer';

export interface ResumeVariantMeta {
  label: Record<'es' | 'en', string>;
  path: Record<'es' | 'en', string>;
  pdfPath: Record<'es' | 'en', string>;
}

const contacts: ResumeContact[] = [
  { label: 'builtbymatias.dev', display: 'builtbymatias.dev', href: 'https://builtbymatias.dev' },
  { label: 'LinkedIn', display: 'linkedin.com/in/fernandez-amatias', href: 'https://linkedin.com/in/fernandez-amatias' },
  { label: 'GitHub', display: 'github.com/matiasaf', href: 'https://github.com/matiasaf' },
  { label: 'fernandez.amatias@gmail.com', display: 'fernandez.amatias@gmail.com', href: 'mailto:fernandez.amatias@gmail.com' },
];

const name = 'Matías Fernández';
const headline = 'SENIOR FULL-STACK · APPLIED AI';
const location = 'Paraná, Entre Ríos, Argentina';

const en: Resume = {
  name,
  headline,
  location,
  contacts,
  labels: { profile: 'Profile', experience: 'Experience', stack: 'Stack', education: 'Education', languages: 'Languages' },
  summary: {
    headline: 'I build reliable product experiences on top of complex systems.',
    body: 'Senior Full-Stack Engineer with more than ten years of experience in enterprise web applications, data-rich workflows, and AI-enabled products. Strongest in React, Next.js, TypeScript, and frontend architecture, with direct backend and cloud work across Node.js, Python/FastAPI, .NET, Azure, and AWS. Hands-on technical leadership: frontend direction, delivery coordination, mentoring, code reviews, conventions, and architecture documentation.',
  },
  roles: [
    { company: 'Argeniss Software', period: 'Feb 2022 — Present', role: 'Senior Full-Stack Engineer', context: 'Client: Amplity Health', bullets: [
      'Lead the React/Next.js frontend of AI Studio, an Azure OpenAI product running GPT-5, and remain its primary hands-on frontend contributor, with targeted work across its .NET and Azure Functions components, Python document processing, Pinecone retrieval, SignalR streaming, Azure SQL, and Logic Apps. More than 1,000 documents have completed the processing pipeline, which is designed against a sub-two-second time-to-first-token target.',
      'Co-develop Azure IC Portal, a cloud-native Incentive Compensation application modernizing a legacy ASP.NET MVC, SSRS, and DocuSign workflow: Next.js 15 App Router, React 19, strict TypeScript, Fluent UI, TanStack React Query, Prisma over Azure SQL, Zod-validated route handlers with pagination, filtering and sorting, react-window virtualization, and asynchronous bulk approval with polling and per-item results.',
      'Build Excel-heavy flows in that portal with ExcelJS, SheetJS, and JSZip: upload, parsing, preview, validation, workbook generation, and ZIP exports compatible with ADP/Workday and with legacy SSRS report layouts.',
      'Share ownership of an inherited Website Chatbot and evolve it end to end: React/Vite admin, embeddable widget with local persistence and cross-tab sync, Python/FastAPI backend, PostgreSQL, an Azure Functions crawler on Queue Storage with realtime progress, PDF/TXT/DOCX ingestion, chunking, embeddings and Pinecone scoping, source attribution, content filtering and prompt-injection defenses, and usage and cost monitoring on Docker and Azure Container Apps.',
      'Collaborate on the Amplity SDLC Platform: a Clean Architecture .NET 8/ASP.NET Core backend and a React/Vite frontend with Microsoft Entra authentication, delegated Azure DevOps access, and AI-assisted QA test-case drafts generated from structured delivery context, covered by xUnit and SDD/BDD documentation.',
      'Led the Amplity.com delivery team from Aug 2024 to Feb 2025, working with Product to define requirements and translate them for the team while staying hands-on with WordPress, Cypress end-to-end tests, and multi-environment CI/CD. Improved a Business Intelligence Tool dashboard load time by 35% on its Angular frontend and selected Node.js endpoints.',
      'Define technical conventions, perform code reviews, maintain architecture documentation, and improve containerized Azure delivery with ACR, Azure DevOps YAML pipelines, Bicep, and multi-stage Docker builds.',
    ]},
    { company: 'Endava', period: 'May 2021 — Feb 2022', role: 'Full-Stack Engineer', context: 'Client: Bloomberg LP · Workpaper', bullets: [
      'Participated in the beta launch and a React/Redux/TypeScript UI refactor, while contributing almost equally to Node.js services and PostgreSQL-backed APIs.',
      'Built complex forms with TypeScript generics, Zod, and optimistic updates; covered the product with Playwright and React Testing Library; worked on Web Vitals with manual Lighthouse audits.',
      'Worked directly with Docker, AWS Lambda, API Gateway, DynamoDB, and ECS, inside a multi-account setup with IAM and CloudFormation.',
      'Mentored and reviewed code within a five-developer team as collaborative technical leadership.',
    ]},
    { company: 'Hexacta / GlobalLogic', period: 'Jan 2019 — May 2021', role: 'Full-Stack Engineer', context: 'TechInsights · BA147 · SUACI', bullets: [
      'Participated in the Angular 7-to-12 migration and in migrating Java services to Node.js/TypeScript serverless services on AWS Lambda, API Gateway, and DynamoDB; the team migration reduced infrastructure costs by approximately 30%.',
      'Shared technical coordination of UI changes with two other developers, built interactive analytics widgets, and worked with VPC, S3, IAM, CloudWatch, Terraform, and blue-green deployments.',
      'Built the BA147 mobile application with Ionic 4, Angular, and TypeScript — offline synchronization, push notifications, and USIG map integration — took part hands-on in the Google Play publication process, and added features and fixes to the Java/Spring Boot backend of the SUACI backoffice.',
    ]},
    { company: 'Government of Entre Ríos', period: 'Nov 2016 — Jan 2019', role: 'Software Engineer', context: 'Public-sector platforms', bullets: [
      'Worked on an Inter-American Development Bank-funded Property Registry platform built with PHP, jQuery, and Oracle, plus internal tools and sites with React, a separate React Native application, and a teacher-training app with a Laravel backend and Vue.js.',
      'Automated ETL processes with Node.js including validation, transformation, deduplication, alerts, and automatic retries.',
      'Worked with RBAC, action auditing and traceability, and formal compliance requirements across provincial systems.',
    ]},
    { company: 'Genosha', period: 'Jun 2016 — Dec 2016', role: 'Software Engineer', context: 'Video-generation platform', bullets: [
      'Built a viral-video generation and rendering platform with AngularJS, Node.js, Docker, and AWS ECS, using FFmpeg as the main processing tool with encoding optimizations for 720p output.',
      'Integrated the Facebook Graph API so users could sign in and provide the inputs needed to generate their video.',
    ]},
  ],
  skills: [
    ['Frontend', 'React 19 · Next.js 15 App Router · TypeScript strict · TanStack React Query · Redux · Fluent UI · react-window · Angular · Vue · Ionic · React Native'],
    ['Backend & APIs', 'Python · FastAPI · Node.js · .NET 8 · ASP.NET Core · Clean Architecture · Azure Functions · Java · Spring Boot · Zod · FluentValidation'],
    ['Applied AI', 'Azure OpenAI (GPT-5) · RAG · Pinecone · Embeddings · PDF/DOCX/TXT ingestion · Source attribution · Content filtering & prompt-injection defenses · Usage & cost monitoring'],
    ['Realtime & data', 'SignalR · Azure Web PubSub · WebSockets · PostgreSQL · Azure SQL · DynamoDB · Oracle · Prisma · ExcelJS · SheetJS'],
    ['Cloud & delivery', 'Azure App Service · Container Apps · ACR · Azure DevOps YAML · Bicep · Entra ID / MSAL · AWS Lambda · API Gateway · ECS · S3 · IAM · CloudFormation · Docker · Terraform'],
    ['Quality', 'Vitest · Playwright · React Testing Library · Cypress · xUnit · Web Vitals · Code reviews · Architecture docs'],
  ],
  education: { degree: 'Analyst in Applied Informatics', detail: 'Universidad Nacional del Litoral · 2008–2017' },
  languages: { primary: 'Spanish — Native', secondary: 'English — B2, advanced professional communication' },
};

const es: Resume = {
  name,
  headline,
  location,
  contacts,
  labels: { profile: 'Perfil', experience: 'Experiencia', stack: 'Stack', education: 'Educación', languages: 'Idiomas' },
  summary: {
    headline: 'Construyo experiencias de producto confiables sobre sistemas complejos.',
    body: 'Senior Full-Stack Engineer con más de diez años de experiencia en aplicaciones web empresariales, flujos intensivos en datos y productos con AI. Mi mayor profundidad está en React, Next.js, TypeScript y arquitectura frontend, con trabajo directo de backend y cloud en Node.js, Python/FastAPI, .NET, Azure y AWS. Liderazgo técnico hands-on: dirección de frontend, coordinación de entrega, mentoring, code reviews, convenciones y documentación de arquitectura.',
  },
  roles: [
    { company: 'Argeniss Software', period: 'Feb 2022 — Actualidad', role: 'Senior Full-Stack Engineer', context: 'Cliente: Amplity Health', bullets: [
      'Lidero el frontend React/Next.js de AI Studio, un producto sobre Azure OpenAI con GPT-5, y sigo siendo su principal contribuidor hands-on de frontend, con trabajo puntual en sus componentes .NET y Azure Functions, procesamiento documental con Python, recuperación con Pinecone, streaming con SignalR, Azure SQL y Logic Apps. Más de 1.000 documentos completaron el pipeline de procesamiento, diseñado contra un objetivo de time-to-first-token menor a dos segundos.',
      'Co-desarrollo Azure IC Portal, una aplicación cloud-native de Incentive Compensation que moderniza un flujo heredado de ASP.NET MVC, SSRS y DocuSign: Next.js 15 App Router, React 19, TypeScript strict, Fluent UI, TanStack React Query, Prisma sobre Azure SQL, route handlers validados con Zod con paginación, filtrado y orden, virtualización con react-window y aprobación bulk asíncrona con polling y resultados por ítem.',
      'Construyo en ese portal los flujos intensivos en Excel con ExcelJS, SheetJS y JSZip: carga, parsing, preview, validación, generación de workbooks y exports ZIP compatibles con ADP/Workday y con los layouts de los reportes SSRS heredados.',
      'Comparto la responsabilidad de un Website Chatbot heredado y lo evoluciono de punta a punta: admin React/Vite, widget embebible con persistencia local y sincronización entre pestañas, backend Python/FastAPI, PostgreSQL, crawler en Azure Functions sobre Queue Storage con progreso en tiempo real, ingesta de PDF/TXT/DOCX, chunking, embeddings y scoping en Pinecone, atribución de fuentes, filtrado de contenido y defensas ante prompt injection, y monitoreo de uso y costos sobre Docker y Azure Container Apps.',
      'Colaboro en la Amplity SDLC Platform: backend .NET 8/ASP.NET Core con Clean Architecture y frontend React/Vite con autenticación Microsoft Entra, acceso delegado a Azure DevOps y generación asistida por AI de borradores de casos de prueba de QA a partir de contexto de entrega, con cobertura xUnit y documentación SDD/BDD.',
      'Lideré la entrega de Amplity.com entre ago 2024 y feb 2025, trabajando con Producto para definir requerimientos y traducirlos al equipo, sin dejar de estar hands-on con WordPress, tests end-to-end con Cypress y CI/CD multi-entorno. Mejoré 35% el tiempo de carga de un dashboard de Business Intelligence sobre su frontend Angular y endpoints Node.js puntuales.',
      'Defino convenciones técnicas, realizo code reviews, mantengo documentación de arquitectura y mejoro la entrega containerizada en Azure con ACR, pipelines YAML de Azure DevOps, Bicep y builds Docker multi-stage.',
    ]},
    { company: 'Endava', period: 'May 2021 — Feb 2022', role: 'Full-Stack Engineer', context: 'Cliente: Bloomberg LP · Workpaper', bullets: [
      'Participé del lanzamiento beta y de un refactor React/Redux/TypeScript, contribuyendo casi en partes iguales a servicios Node.js y APIs sobre PostgreSQL.',
      'Construí formularios complejos con genéricos de TypeScript, Zod y optimistic updates; cubrí el producto con Playwright y React Testing Library; trabajé sobre Web Vitals con auditorías manuales de Lighthouse.',
      'Trabajé directamente con Docker, AWS Lambda, API Gateway, DynamoDB y ECS, dentro de una infraestructura multi-cuenta con IAM y CloudFormation.',
      'Realicé mentoring y code reviews en un equipo de cinco desarrolladores como liderazgo técnico colaborativo.',
    ]},
    { company: 'Hexacta / GlobalLogic', period: 'Ene 2019 — May 2021', role: 'Full-Stack Engineer', context: 'TechInsights · BA147 · SUACI', bullets: [
      'Participé en la migración Angular 7–12 y en la migración de servicios Java a servicios serverless Node.js/TypeScript sobre AWS Lambda, API Gateway y DynamoDB; la migración del equipo redujo aproximadamente 30% los costos de infraestructura.',
      'Compartí la coordinación técnica de los cambios de UI con otros dos desarrolladores, construí widgets de analytics interactivos y trabajé con VPC, S3, IAM, CloudWatch, Terraform y blue-green deployments.',
      'Construí la aplicación mobile BA147 con Ionic 4, Angular y TypeScript — sincronización offline, push notifications e integración de mapas USIG —, participé hands-on de todo el proceso de publicación en Google Play y sumé features y correcciones al backend Java/Spring Boot del backoffice SUACI.',
    ]},
    { company: 'Gobierno de Entre Ríos', period: 'Nov 2016 — Ene 2019', role: 'Software Engineer', context: 'Plataformas del sector público', bullets: [
      'Trabajé en una plataforma de Registro de la Propiedad financiada por el Banco Interamericano de Desarrollo, construida con PHP, jQuery y Oracle, además de herramientas y sitios internos con React, una aplicación React Native separada y una app de capacitación docente con backend Laravel y Vue.js.',
      'Automaticé procesos ETL con Node.js: validación, transformación, deduplicación, alertas y reintentos automáticos.',
      'Trabajé con RBAC, auditoría y trazabilidad de acciones, y requerimientos formales de cumplimiento en los sistemas provinciales.',
    ]},
    { company: 'Genosha', period: 'Jun 2016 — Dic 2016', role: 'Software Engineer', context: 'Plataforma de generación de video', bullets: [
      'Construí una plataforma de generación y renderizado de videos virales con AngularJS, Node.js, Docker y AWS ECS, usando FFmpeg como herramienta principal de procesamiento con optimizaciones de encoding para salida en 720p.',
      'Integré la Facebook Graph API para que las personas iniciaran sesión y aportaran los datos necesarios para generar su video.',
    ]},
  ],
  skills: [
    ['Frontend', 'React 19 · Next.js 15 App Router · TypeScript strict · TanStack React Query · Redux · Fluent UI · react-window · Angular · Vue · Ionic · React Native'],
    ['Backend & APIs', 'Python · FastAPI · Node.js · .NET 8 · ASP.NET Core · Clean Architecture · Azure Functions · Java · Spring Boot · Zod · FluentValidation'],
    ['Applied AI', 'Azure OpenAI (GPT-5) · RAG · Pinecone · Embeddings · Ingesta PDF/DOCX/TXT · Atribución de fuentes · Filtrado de contenido y defensas ante prompt injection · Monitoreo de uso y costos'],
    ['Tiempo real & datos', 'SignalR · Azure Web PubSub · WebSockets · PostgreSQL · Azure SQL · DynamoDB · Oracle · Prisma · ExcelJS · SheetJS'],
    ['Cloud & entrega', 'Azure App Service · Container Apps · ACR · Azure DevOps YAML · Bicep · Entra ID / MSAL · AWS Lambda · API Gateway · ECS · S3 · IAM · CloudFormation · Docker · Terraform'],
    ['Calidad', 'Vitest · Playwright · React Testing Library · Cypress · xUnit · Web Vitals · Code reviews · Documentación de arquitectura'],
  ],
  education: { degree: 'Analista en Informática Aplicada', detail: 'Universidad Nacional del Litoral · 2008–2017' },
  languages: { primary: 'Español — Nativo', secondary: 'Inglés — B2, comunicación profesional avanzada' },
};

/**
 * Public routes and downloads for the two positioning variants. The canonical
 * résumé routes remain the Frontend Lead version; the AI Product Engineer
 * variant has an explicit route so links and PDFs never depend on query state.
 */
export const resumeVariantMeta: Record<ResumeVariantId, ResumeVariantMeta> = {
  'frontend-lead': {
    label: { en: 'Frontend Lead', es: 'Frontend Lead' },
    path: { en: '/en/cv/', es: '/cv/' },
    pdfPath: {
      en: '/downloads/matias-fernandez-resume.pdf',
      es: '/downloads/matias-fernandez-cv.pdf',
    },
  },
  'ai-product-engineer': {
    label: { en: 'AI Product Engineer', es: 'AI Product Engineer' },
    path: { en: '/en/cv/ai-product-engineer/', es: '/cv/ingeniero-productos-ai/' },
    pdfPath: {
      en: '/downloads/matias-fernandez-ai-product-engineer-resume.pdf',
      es: '/downloads/matias-fernandez-ingeniero-productos-ai-cv.pdf',
    },
  },
};

interface ResumeVariantDefinition {
  headline: string;
  summary: Resume['summary'];
  /** Indices into the shared current-role highlights above. */
  currentRoleHighlights: readonly number[];
  /** Labels from the shared skill groups, in variant-specific display order. */
  skillOrder: readonly string[];
}

const variantDefinitions: Record<'es' | 'en', Record<ResumeVariantId, ResumeVariantDefinition>> = {
  en: {
    'frontend-lead': {
      headline: 'FRONTEND LEAD · SENIOR SOFTWARE ENGINEER',
      summary: {
        headline: 'I lead frontend systems without losing sight of the product behind them.',
        body: 'Senior Software Engineer with more than ten years of experience delivering complex web products. Deepest in React, Next.js, TypeScript, and frontend architecture, with hands-on backend and cloud reach across Node.js, Python/FastAPI, .NET, Azure, and AWS. I lead through implementation, explicit trade-offs, code reviews, mentoring, conventions, and architecture documentation.',
      },
      currentRoleHighlights: [0, 1, 3, 5, 6],
      skillOrder: ['Frontend', 'Quality', 'Applied AI', 'Backend & APIs', 'Realtime & data', 'Cloud & delivery'],
    },
    'ai-product-engineer': {
      headline: 'AI PRODUCT ENGINEER · SENIOR SOFTWARE ENGINEER',
      summary: {
        headline: 'I turn AI capabilities into reliable, usable product systems.',
        body: 'Senior Software Engineer with more than ten years of experience and current production work across AI-enabled products, document pipelines, retrieval, streaming, and enterprise workflows. I connect React and Next.js interfaces with Python/FastAPI, .NET, Azure OpenAI, Pinecone, data, and cloud delivery, while making failure states, source attribution, observability, cost, and maintainability part of the product.',
      },
      currentRoleHighlights: [0, 3, 4, 1, 6],
      skillOrder: ['Applied AI', 'Frontend', 'Backend & APIs', 'Realtime & data', 'Cloud & delivery', 'Quality'],
    },
  },
  es: {
    'frontend-lead': {
      headline: 'FRONTEND LEAD · SENIOR SOFTWARE ENGINEER',
      summary: {
        headline: 'Lidero sistemas frontend sin perder de vista el producto que sostienen.',
        body: 'Senior Software Engineer con más de diez años entregando productos web complejos. Mi mayor profundidad está en React, Next.js, TypeScript y arquitectura frontend, con alcance hands-on de backend y cloud en Node.js, Python/FastAPI, .NET, Azure y AWS. Lidero desde la implementación, los trade-offs explícitos, code reviews, mentoring, convenciones y documentación de arquitectura.',
      },
      currentRoleHighlights: [0, 1, 3, 5, 6],
      skillOrder: ['Frontend', 'Calidad', 'Applied AI', 'Backend & APIs', 'Tiempo real & datos', 'Cloud & entrega'],
    },
    'ai-product-engineer': {
      headline: 'AI PRODUCT ENGINEER · SENIOR SOFTWARE ENGINEER',
      summary: {
        headline: 'Convierto capacidades de AI en sistemas de producto confiables y usables.',
        body: 'Senior Software Engineer con más de diez años de experiencia y trabajo actual en productos con AI, pipelines documentales, retrieval, streaming y flujos empresariales. Conecto interfaces React y Next.js con Python/FastAPI, .NET, Azure OpenAI, Pinecone, datos y cloud, incorporando estados de falla, atribución de fuentes, observabilidad, costos y mantenibilidad al producto.',
      },
      currentRoleHighlights: [0, 3, 4, 1, 6],
      skillOrder: ['Applied AI', 'Frontend', 'Backend & APIs', 'Tiempo real & datos', 'Cloud & entrega', 'Calidad'],
    },
  },
};

const buildVariant = (lang: 'es' | 'en', variant: ResumeVariantId): Resume => {
  const base = { es, en }[lang];
  const definition = variantDefinitions[lang][variant];
  const currentRole = base.roles[0];

  const roles = base.roles.map((role, index) => index === 0
    ? {
        ...currentRole,
        bullets: definition.currentRoleHighlights.map((highlight) => {
          const bullet = currentRole.bullets[highlight];
          if (!bullet) throw new Error(`Missing ${lang} current-role highlight ${highlight}`);
          return bullet;
        }),
      }
    : role);

  const skills = definition.skillOrder.map((label) => {
    const group = base.skills.find(([groupLabel]) => groupLabel === label);
    if (!group) throw new Error(`Missing ${lang} résumé skill group: ${label}`);
    return group;
  });

  return { ...base, headline: definition.headline, summary: definition.summary, roles, skills };
};

export const resumeVariants: Record<'es' | 'en', Record<ResumeVariantId, Resume>> = {
  en: {
    'frontend-lead': buildVariant('en', 'frontend-lead'),
    'ai-product-engineer': buildVariant('en', 'ai-product-engineer'),
  },
  es: {
    'frontend-lead': buildVariant('es', 'frontend-lead'),
    'ai-product-engineer': buildVariant('es', 'ai-product-engineer'),
  },
};

/** Backwards-compatible default used by the canonical résumé route and callers. */
export const resume: Record<'es' | 'en', Resume> = {
  en: resumeVariants.en['frontend-lead'],
  es: resumeVariants.es['frontend-lead'],
};
