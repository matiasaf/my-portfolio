/**
 * Fuente unica del CV. La consumen:
 *   - src/components/ResumePage.astro  → HTML (pantalla e impresion)
 *   - src/pages/cv.tex.ts / en/cv.tex.ts → LaTeX
 *
 * Cualquier salida nueva (JSON Resume, DOCX) deberia leer de aca y no
 * duplicar contenido.
 */

export interface ResumeContact {
  /** Texto que muestra el HTML. */
  label: string;
  /** Texto que imprime el PDF de LaTeX: la URL legible, como en el template. */
  display: string;
  href: string;
}

export interface ResumeRole {
  company: string;
  role: string;
  /** Cliente o ambito; en el PDF va a la derecha, en itálica. */
  context: string;
  period: string;
  bullets: string[];
}

export interface Resume {
  name: string;
  headline: string;
  location: string;
  contacts: ResumeContact[];
  /** Titulos de seccion, en Title Case: cada salida decide como capitalizarlos
   *  (LaTeX usa \scshape, el HTML usa font-variant-caps). */
  labels: {
    profile: string;
    experience: string;
    stack: string;
    education: string;
    languages: string;
  };
  summary: {
    /** Titular de display, solo para la web. El PDF no lo usa: en un CV
     *  impreso una frase de posicionamiento lee como landing, no como CV. */
    headline: string;
    /** El resumen profesional propiamente dicho. Lo usan web y PDF. */
    body: string;
  };
  roles: ResumeRole[];
  skills: [string, string][];
  education: { degree: string; detail: string };
  languages: { primary: string; secondary: string };
}

const contacts: ResumeContact[] = [
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
    body: 'Senior Full-Stack Engineer with more than ten years of experience across frontend architecture, backend, cloud, distributed systems, and applied AI. Hands-on technical leadership with a strong focus on React, Next.js, TypeScript, and products that integrate models and retrieval systems responsibly.',
  },
  roles: [
    { company: 'Argeniss Software', period: 'Feb 2022 — Present', role: 'Senior Full-Stack Engineer', context: 'Client: Amplity Health', bullets: [
      'Lead the React/Next.js frontend of AI Studio while contributing hands-on across .NET, Azure Functions, Python document processing, Azure OpenAI, Pinecone, SignalR, Azure SQL, and Logic Apps. More than 1,000 documents have completed its processing pipeline.',
      'Co-develop Azure IC Portal using Next.js 15, React 19, strict TypeScript, Fluent UI, React Query, Prisma, Azure SQL, Zod, authenticated route-handler APIs, large-list virtualization, and asynchronous bulk workflows.',
      'Maintain and evolve a Website Chatbot spanning React/Vite, an embeddable widget, Python/FastAPI, PostgreSQL, Azure Functions, WebSockets, Azure OpenAI, Pinecone/RAG, Docker, and Azure Container Apps.',
      'Led the Amplity.com delivery team from Aug 2024 to Feb 2025, partnering with Product while remaining hands-on. Improved a Business Intelligence Tool dashboard load time by 35%.',
      'Define technical conventions, perform code reviews, and maintain architecture documentation.',
    ]},
    { company: 'Endava', period: 'May 2021 — Feb 2022', role: 'Full-Stack Engineer', context: 'Client: Bloomberg LP · Workpaper', bullets: [
      'Participated in the beta launch and a React/Redux/TypeScript UI refactor, while contributing almost equally to Node.js services and PostgreSQL-backed APIs.',
      'Built generic TypeScript forms, optimistic updates, Playwright and React Testing Library coverage, plus serverless APIs with AWS Lambda, API Gateway, and DynamoDB.',
      'Mentored and reviewed code within a five-developer team as collaborative technical leadership.',
    ]},
    { company: 'Hexacta / GlobalLogic', period: 'Jan 2019 — May 2021', role: 'Full-Stack Engineer', context: 'TechInsights · BA147 · SUACI', bullets: [
      'Helped migrate Java services to Node.js/TypeScript serverless services on AWS; the team migration reduced infrastructure costs by approximately 30%.',
      'Contributed to an Angular 7-to-12 migration, interactive analytics, Terraform infrastructure, blue-green deployments, Ionic offline synchronization, map integrations, and Java/Spring Boot services.',
    ]},
    { company: 'Government of Entre Ríos', period: 'Nov 2016 — Jan 2019', role: 'Software Engineer', context: 'Public-sector platforms', bullets: [
      'Built regulated systems with PHP, Oracle, React, React Native, Laravel, and Vue, including RBAC, auditing, traceability, and compliance requirements.',
      'Automated ETL workflows with Node.js including validation, transformation, deduplication, alerts, and retries.',
    ]},
    { company: 'Genosha', period: 'Jun 2016 — Dec 2016', role: 'Software Engineer', context: 'Video-generation platform', bullets: [
      'Viral-video workflow with AngularJS, Node.js, Docker, AWS ECS and FFmpeg; optimized 720p encoding.',
    ]},
  ],
  skills: [
    ['Frontend', 'React 19 · Next.js 15 · TypeScript · React Query · Redux · Fluent UI · Angular · Vue · Ionic · React Native'],
    ['Backend & APIs', 'Python · FastAPI · Node.js · .NET 8 · ASP.NET Core · Azure Functions · Java · Spring Boot · Zod'],
    ['Applied AI', 'Azure OpenAI · RAG · Pinecone · Embeddings · Document processing · Source attribution · Feedback loops · Usage & cost monitoring'],
    ['Cloud & Data', 'Azure · AWS · Docker · Terraform · Bicep · PostgreSQL · Azure SQL · DynamoDB · CI/CD'],
    ['Quality', 'Playwright · React Testing Library · Cypress · Vitest · xUnit · Web Vitals'],
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
    body: 'Senior Full-Stack Engineer con más de diez años de experiencia en arquitectura frontend, backend, cloud, sistemas distribuidos y AI aplicada. Liderazgo técnico hands-on, con foco en React, Next.js, TypeScript y productos que integran modelos y sistemas de recuperación de forma responsable.',
  },
  roles: [
    { company: 'Argeniss Software', period: 'Feb 2022 — Actualidad', role: 'Senior Full-Stack Engineer', context: 'Cliente: Amplity Health', bullets: [
      'Lidero el frontend React/Next.js de AI Studio y contribuyo hands-on en .NET, Azure Functions, procesamiento documental con Python, Azure OpenAI, Pinecone, SignalR, Azure SQL y Logic Apps. Más de 1.000 documentos completaron el pipeline.',
      'Co-desarrollo Azure IC Portal con Next.js 15, React 19, TypeScript strict, Fluent UI, React Query, Prisma, Azure SQL, Zod, APIs autenticadas, virtualización y flujos bulk asíncronos.',
      'Mantengo y evoluciono Website Chatbot: React/Vite, widget embebible, Python/FastAPI, PostgreSQL, Azure Functions, WebSockets, Azure OpenAI, Pinecone/RAG, Docker y Azure Container Apps.',
      'Lideré la entrega de Amplity.com entre ago 2024 y feb 2025, trabajando con Producto y manteniéndome hands-on. Mejoré 35% el tiempo de carga de un dashboard de Business Intelligence.',
      'Defino convenciones técnicas, realizo code reviews y mantengo documentación de arquitectura.',
    ]},
    { company: 'Endava', period: 'May 2021 — Feb 2022', role: 'Full-Stack Engineer', context: 'Cliente: Bloomberg LP · Workpaper', bullets: [
      'Participé del lanzamiento beta y de un refactor React/Redux/TypeScript, contribuyendo casi en partes iguales a servicios Node.js y APIs sobre PostgreSQL.',
      'Construí formularios genéricos con TypeScript, optimistic updates, cobertura con Playwright y React Testing Library, y APIs serverless con AWS Lambda, API Gateway y DynamoDB.',
      'Realicé mentoring y code reviews en un equipo de cinco desarrolladores como liderazgo técnico colaborativo.',
    ]},
    { company: 'Hexacta / GlobalLogic', period: 'Ene 2019 — May 2021', role: 'Full-Stack Engineer', context: 'TechInsights · BA147 · SUACI', bullets: [
      'Participé en la migración de servicios Java a Node.js/TypeScript serverless sobre AWS; la migración del equipo redujo aproximadamente 30% los costos de infraestructura.',
      'Contribuí a una migración Angular 7–12, analytics interactivos, infraestructura Terraform, blue-green deployments, sincronización offline con Ionic, mapas y servicios Java/Spring Boot.',
    ]},
    { company: 'Gobierno de Entre Ríos', period: 'Nov 2016 — Ene 2019', role: 'Software Engineer', context: 'Plataformas del sector público', bullets: [
      'Construí sistemas regulados con PHP, Oracle, React, React Native, Laravel y Vue, incluyendo RBAC, auditoría, trazabilidad y requerimientos de cumplimiento.',
      'Automaticé procesos ETL con Node.js: validación, transformación, deduplicación, alertas y reintentos.',
    ]},
    { company: 'Genosha', period: 'Jun 2016 — Dic 2016', role: 'Software Engineer', context: 'Plataforma de generación de video', bullets: [
      'Flujo de video viral con AngularJS, Node.js, Docker, AWS ECS y FFmpeg; encoding 720p optimizado.',
    ]},
  ],
  skills: [
    ['Frontend', 'React 19 · Next.js 15 · TypeScript · React Query · Redux · Fluent UI · Angular · Vue · Ionic · React Native'],
    ['Backend & APIs', 'Python · FastAPI · Node.js · .NET 8 · ASP.NET Core · Azure Functions · Java · Spring Boot · Zod'],
    ['Applied AI', 'Azure OpenAI · RAG · Pinecone · Embeddings · Document processing · Source attribution · Feedback loops · Usage & cost monitoring'],
    ['Cloud & Data', 'Azure · AWS · Docker · Terraform · Bicep · PostgreSQL · Azure SQL · DynamoDB · CI/CD'],
    ['Calidad', 'Playwright · React Testing Library · Cypress · Vitest · xUnit · Web Vitals'],
  ],
  education: { degree: 'Analista en Informática Aplicada', detail: 'Universidad Nacional del Litoral · 2008–2017' },
  languages: { primary: 'Español — Nativo', secondary: 'Inglés — B2, comunicación profesional avanzada' },
};

export const resume: Record<'es' | 'en', Resume> = { es, en };
