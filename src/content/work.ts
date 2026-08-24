import type { Attribution, EvidenceKind, Lang, Localized } from './profile';

export type WorkTone = 'coral' | 'blue' | 'lime' | 'violet';
export type CaseStudyState = 'accepted' | 'implemented' | 'planned';
export type WorkLinkKind = 'source' | 'evidence' | 'artifact';

export interface WorkStatus {
  accepted: number;
  total: number;
  progress: Localized;
  headline: Localized;
  badge: Localized;
  updatedAt: string;
}

export interface WorkMetric {
  value: string;
  label: Localized;
  kind: EvidenceKind;
  attribution: Attribution;
  evidenceHref: string;
}

export interface WorkDecision {
  title: Localized;
  context: Localized;
  choice: Localized;
  consequence: Localized;
}

export interface WorkTradeoff {
  choice: Localized;
  gained: Localized;
  cost: Localized;
}

export interface WorkMilestone {
  number: string;
  state: CaseStudyState;
  title: Localized;
  deliverable: Localized;
  description: Localized;
}

export interface WorkLink {
  kind: WorkLinkKind;
  label: Localized;
  description: Localized;
  href: string;
}

export interface WorkCaseStudy {
  slug: string;
  routes: Record<Lang, string>;
  title: Localized;
  seoTitle: Localized;
  description: Localized;
  eyebrow: Localized;
  period: Localized;
  role: Localized;
  team: Localized;
  stack: string[];
  availability: Localized;
  status: WorkStatus;
  overview: Localized;
  problem: Localized;
  responsibility: Localized[];
  constraints: Localized[];
  architecture: {
    label: Localized;
    description: Localized;
    stages: { label: Localized; detail: Localized }[];
  };
  decisions: WorkDecision[];
  tradeoffs: WorkTradeoff[];
  failureModes: Localized[];
  metrics: WorkMetric[];
  milestones: WorkMilestone[];
  next: Localized[];
  links: WorkLink[];
}

export interface SelectedWork {
  id: string;
  period: Localized;
  title: Localized;
  role: Localized;
  summary: Localized;
  proof: Localized;
  stack: string[];
  href: Record<Lang, string>;
  cta: Localized;
  caseStudyState: 'published' | 'disclosure-review';
  tone: WorkTone;
}

const repository = 'https://github.com/matiasaf/ai-knowledge-platform';

/**
 * Mirrors the public repository PROGRESS.md, last verified at the commit dated
 * 2026-08-21. Accepted milestones and implemented code are deliberately separate.
 */
export const aiKnowledgePlatformStatus: WorkStatus = {
  accepted: 3,
  total: 5,
  progress: { en: '3 / 5 milestones accepted', es: '3 / 5 milestones aceptados' },
  headline: {
    en: 'Milestones 1–3 accepted · milestone 4 implemented, live provider acceptance pending',
    es: 'Milestones 1–3 aceptados · milestone 4 implementado, con la aceptación del proveedor en vivo pendiente',
  },
  badge: {
    en: 'MILESTONES 1–3 ACCEPTED · MILESTONE 4 IMPLEMENTED',
    es: 'MILESTONES 1–3 ACEPTADOS · MILESTONE 4 IMPLEMENTADO',
  },
  updatedAt: '2026-08-21',
};

const aiKnowledgePlatform: WorkCaseStudy = {
  slug: 'ai-knowledge-platform',
  routes: {
    en: '/en/work/ai-knowledge-platform/',
    es: '/es/trabajo/ai-knowledge-platform/',
  },
  title: { en: 'AI Knowledge Platform', es: 'AI Knowledge Platform' },
  seoTitle: {
    en: 'AI Knowledge Platform — Engineering case study',
    es: 'AI Knowledge Platform — Caso de estudio de ingeniería',
  },
  description: {
    en: 'How I built a document knowledge platform around measured retrieval, verifiable citations, explicit failure states, tests, CI, and architecture decisions.',
    es: 'Cómo construí una plataforma de conocimiento documental alrededor de retrieval medido, citas verificables, estados de falla explícitos, tests, CI y decisiones de arquitectura.',
  },
  eyebrow: { en: 'PUBLIC FLAGSHIP · ACTIVE PROJECT', es: 'PROYECTO PRINCIPAL PÚBLICO · ACTIVO' },
  period: { en: 'ACTIVE · PUBLIC REPOSITORY', es: 'ACTIVO · REPOSITORIO PÚBLICO' },
  role: { en: 'Sole author · product and engineering', es: 'Autor único · producto e ingeniería' },
  team: { en: 'Independent project · one engineer', es: 'Proyecto independiente · un ingeniero' },
  stack: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'SQLite FTS5', 'OpenAI Responses API'],
  availability: {
    en: 'Public source, tests, CI, ADRs, evaluation sets, and a locally runnable product. No hosted demo yet.',
    es: 'Código, tests, CI, ADRs, sets de evaluación y producto ejecutable localmente. Todavía no hay demo publicado.',
  },
  status: aiKnowledgePlatformStatus,
  overview: {
    en: 'A document knowledge product built to make answer quality inspectable. It ingests PDFs, preserves page provenance, measures lexical retrieval, and returns grounded answers whose citations are resolved from trusted server-side evidence.',
    es: 'Un producto de conocimiento documental construido para que la calidad de las respuestas se pueda inspeccionar. Ingiere PDFs, preserva provenance por página, mide el retrieval léxico y devuelve respuestas fundamentadas cuyas citas se resuelven desde evidencia confiable en el servidor.',
  },
  problem: {
    en: 'Teams need answers from policies, contracts, runbooks, and research that readers can verify; fluent text without attributable evidence is not a trustworthy product outcome.',
    es: 'Los equipos necesitan respuestas verificables desde políticas, contratos, runbooks e investigación; un texto fluido sin evidencia atribuible no es un resultado de producto confiable.',
  },
  responsibility: [
    {
      en: 'Defined the product states and milestone sequence, then implemented each vertical slice across the Next.js frontend and FastAPI backend.',
      es: 'Definí los estados del producto y la secuencia de milestones, y después implementé cada vertical slice entre el frontend Next.js y el backend FastAPI.',
    },
    {
      en: 'Designed ingestion, extraction, retrieval, answer generation, citations, evaluation sets, tests, CI, and architecture decision records.',
      es: 'Diseñé ingesta, extracción, retrieval, generación de respuestas, citas, sets de evaluación, tests, CI y registros de decisiones de arquitectura.',
    },
    {
      en: 'Kept implementation status separate from live-provider acceptance and documented missing capabilities explicitly.',
      es: 'Mantuve separado el estado de implementación de la aceptación con el proveedor en vivo y documenté explícitamente las capacidades faltantes.',
    },
  ],
  constraints: [
    {
      en: 'The first useful slice had to run locally without cloud infrastructure, background workers, or a hosted database.',
      es: 'El primer slice útil tenía que ejecutarse localmente sin infraestructura cloud, workers en background ni una base publicada.',
    },
    {
      en: 'Every answer citation had to resolve to a page and passage the server actually retrieved.',
      es: 'Cada cita de una respuesta tenía que resolver a una página y un pasaje realmente recuperado por el servidor.',
    },
    {
      en: 'Provider credentials could not be assumed, so offline gates and live answer acceptance needed separate definitions.',
      es: 'No se podían asumir credenciales del proveedor, por lo que los gates offline y la aceptación de respuestas en vivo necesitaban definiciones separadas.',
    },
  ],
  architecture: {
    label: { en: 'Current request path', es: 'Recorrido actual del request' },
    description: {
      en: 'The browser drives explicit upload, extraction, indexing, search, and answer states. The API owns validation and provenance; SQLite is a rebuildable lexical index; the model receives only bounded retrieved evidence.',
      es: 'El navegador muestra estados explícitos de carga, extracción, indexado, búsqueda y respuesta. La API controla validación y provenance; SQLite es un índice léxico reconstruible; el modelo recibe solo evidencia recuperada y acotada.',
    },
    stages: [
      { label: { en: 'Product UI', es: 'UI de producto' }, detail: { en: 'Next.js · accessible states', es: 'Next.js · estados accesibles' } },
      { label: { en: 'Application API', es: 'API de aplicación' }, detail: { en: 'FastAPI · validation', es: 'FastAPI · validación' } },
      { label: { en: 'Evidence index', es: 'Índice de evidencia' }, detail: { en: 'SQLite FTS5 · BM25', es: 'SQLite FTS5 · BM25' } },
      { label: { en: 'Answer adapter', es: 'Adaptador de respuestas' }, detail: { en: 'Structured output · bounded evidence', es: 'Output estructurado · evidencia acotada' } },
    ],
  },
  decisions: [
    {
      title: { en: 'Model states as a contract', es: 'Modelar estados como contrato' },
      context: { en: 'A single “ready” flag would hide which step failed and what could be retried.', es: 'Un único flag “ready” ocultaría qué paso falló y qué se podía reintentar.' },
      choice: { en: 'Use separate stored, processing, extracted, indexing, indexed, and explicit failure states.', es: 'Usar estados separados de stored, processing, extracted, indexing, indexed y fallas explícitas.' },
      consequence: { en: 'The UI can preserve completed work and offer the correct retry instead of restarting the whole flow.', es: 'La UI puede preservar trabajo completado y ofrecer el retry correcto en vez de reiniciar todo el flujo.' },
    },
    {
      title: { en: 'Measure lexical retrieval first', es: 'Medir primero el retrieval léxico' },
      context: { en: 'Adding embeddings early would introduce cost and complexity without proving the baseline was insufficient.', es: 'Agregar embeddings temprano sumaría costo y complejidad sin demostrar que el baseline era insuficiente.' },
      choice: { en: 'Use page-bounded chunks with SQLite FTS5/BM25 and enforce Recall@3 and MRR@3 in CI.', es: 'Usar chunks acotados por página con SQLite FTS5/BM25 y verificar Recall@3 y MRR@3 en CI.' },
      consequence: { en: 'Retrieval is reproducible and inexpensive, with an explicit point at which a semantic approach can be justified.', es: 'El retrieval es reproducible y económico, con un punto explícito donde justificar un enfoque semántico.' },
    },
    {
      title: { en: 'Resolve citations on the server', es: 'Resolver citas en el servidor' },
      context: { en: 'Allowing a model to invent file or page metadata would make plausible citations untrustworthy.', es: 'Permitir que un modelo invente metadata de archivo o página haría que las citas plausibles no fueran confiables.' },
      choice: { en: 'Let the model reference request-local evidence IDs only; build document, page, chunk, and offsets from retrieval matches.', es: 'Permitir que el modelo refiera solo IDs de evidencia locales al request; construir documento, página, chunk y offsets desde los matches.' },
      consequence: { en: 'A citation can be opened against the stored PDF, while unknown evidence IDs fail validation.', es: 'Una cita se puede abrir contra el PDF almacenado y los IDs de evidencia desconocidos fallan la validación.' },
    },
  ],
  tradeoffs: [
    {
      choice: { en: 'Local files and embedded SQLite', es: 'Archivos locales y SQLite embebido' },
      gained: { en: 'Fast setup, inspectable data, deterministic tests, and no infrastructure dependency.', es: 'Setup rápido, datos inspeccionables, tests deterministas y sin dependencia de infraestructura.' },
      cost: { en: 'No multi-process coordination, cloud durability, multi-tenancy, or horizontal scale.', es: 'Sin coordinación multiproceso, durabilidad cloud, multi-tenancy ni escala horizontal.' },
    },
    {
      choice: { en: 'Lexical retrieval before embeddings', es: 'Retrieval léxico antes que embeddings' },
      gained: { en: 'A measurable, keyless baseline with predictable cost and behavior.', es: 'Un baseline medible, sin credenciales y con costo y comportamiento predecibles.' },
      cost: { en: 'Synonyms and semantically related wording can miss without token overlap.', es: 'Sinónimos y redacciones semánticamente relacionadas pueden fallar sin overlap de tokens.' },
    },
    {
      choice: { en: 'Synchronous vertical slices', es: 'Vertical slices sincrónicos' },
      gained: { en: 'A short request path and failures that are easy to reproduce locally.', es: 'Un recorrido corto del request y fallas fáciles de reproducir localmente.' },
      cost: { en: 'Large workloads will eventually require queues, workers, and progress persistence.', es: 'Los workloads grandes eventualmente van a requerir colas, workers y persistencia de progreso.' },
    },
  ],
  failureModes: [
    { en: 'Rejected or interrupted uploads remove temporary artifacts, so partial files never appear stored.', es: 'Las cargas rechazadas o interrumpidas eliminan artefactos temporales, por lo que un archivo parcial nunca aparece almacenado.' },
    { en: 'Extraction and indexing failures retain the last successful state and expose a targeted retry.', es: 'Las fallas de extracción e indexado conservan el último estado exitoso y muestran un retry puntual.' },
    { en: 'Weak retrieval returns insufficient evidence instead of forcing a generated answer.', es: 'Un retrieval débil devuelve evidencia insuficiente en vez de forzar una respuesta generada.' },
    { en: 'Safety refusal and technical provider failure remain distinct outcomes in the API and interface.', es: 'El rechazo por seguridad y la falla técnica del proveedor siguen siendo resultados distintos en la API y la interfaz.' },
  ],
  metrics: [
    {
      value: '1.0',
      label: { en: 'Recall@3 on the checked-in retrieval set', es: 'Recall@3 sobre el set de retrieval versionado' },
      kind: 'measured', attribution: 'individual',
      evidenceHref: `${repository}/blob/main/docs/progress/day-03.md`,
    },
    {
      value: '1.0',
      label: { en: 'MRR@3 on the checked-in retrieval set', es: 'MRR@3 sobre el set de retrieval versionado' },
      kind: 'measured', attribution: 'individual',
      evidenceHref: `${repository}/blob/main/docs/progress/day-03.md`,
    },
    {
      value: '13',
      label: { en: 'versioned answer-quality cases', es: 'casos versionados de calidad de respuesta' },
      kind: 'implemented', attribution: 'individual',
      evidenceHref: `${repository}/blob/main/docs/progress/day-04.md`,
    },
    {
      value: '89',
      label: { en: 'offline backend + frontend tests at the latest recorded gate', es: 'tests offline de backend + frontend en el último gate registrado' },
      kind: 'measured', attribution: 'individual',
      evidenceHref: `${repository}/blob/main/PROGRESS.md`,
    },
  ],
  milestones: [
    { number: '01', state: 'accepted', title: { en: 'Trustworthy ingestion', es: 'Ingesta confiable' }, deliverable: { en: 'PDF + metadata', es: 'PDF + metadata' }, description: { en: 'Streaming validation and atomic storage.', es: 'Validación por streaming y storage atómico.' } },
    { number: '02', state: 'accepted', title: { en: 'Page provenance', es: 'Provenance por página' }, deliverable: { en: 'Text + coordinates', es: 'Texto + coordenadas' }, description: { en: 'Extraction that preserves every source page.', es: 'Extracción que preserva cada página de origen.' } },
    { number: '03', state: 'accepted', title: { en: 'Measured retrieval', es: 'Retrieval medido' }, deliverable: { en: 'Ranked evidence', es: 'Evidencia rankeada' }, description: { en: 'Page-bounded chunks, FTS5/BM25, and CI thresholds.', es: 'Chunks por página, FTS5/BM25 y thresholds en CI.' } },
    { number: '04', state: 'implemented', title: { en: 'Grounded answers', es: 'Respuestas fundamentadas' }, deliverable: { en: 'Answer + citations', es: 'Respuesta + citas' }, description: { en: 'Implemented and offline-tested; live model quality is not accepted.', es: 'Implementado y testeado offline; la calidad del modelo en vivo no está aceptada.' } },
    { number: '05', state: 'planned', title: { en: 'Operational visibility', es: 'Visibilidad operativa' }, deliverable: { en: 'Quality + operations', es: 'Calidad + operación' }, description: { en: 'Latency, token, cost, failure, and feedback surfaces.', es: 'Superficies de latencia, tokens, costo, fallas y feedback.' } },
  ],
  next: [
    { en: 'Compare candidate model snapshots and record live answer-quality results before accepting milestone 4.', es: 'Comparar snapshots de modelos y registrar resultados de calidad en vivo antes de aceptar el milestone 4.' },
    { en: 'Exercise and record one real answered browser flow, then publish a short demo.', es: 'Ejecutar y registrar un flujo real de respuesta en el navegador y después publicar una demo corta.' },
    { en: 'Plan observability only after the answer path has live-provider acceptance.', es: 'Planificar observabilidad solo después de aceptar el flujo de respuestas con un proveedor en vivo.' },
  ],
  links: [
    { kind: 'source', label: { en: 'Source code', es: 'Código fuente' }, description: { en: 'Implementation, setup, current scope, and explicit non-goals.', es: 'Implementación, setup, alcance actual y non-goals explícitos.' }, href: repository },
    { kind: 'artifact', label: { en: 'Run the product locally', es: 'Ejecutar el producto localmente' }, description: { en: 'The repository quickstart runs ingestion and retrieval without provider credentials.', es: 'El quickstart del repositorio ejecuta ingesta y retrieval sin credenciales del proveedor.' }, href: `${repository}#quickstart` },
    { kind: 'evidence', label: { en: 'Tests and CI', es: 'Tests y CI' }, description: { en: 'Separate backend and frontend quality gates.', es: 'Gates de calidad separados para backend y frontend.' }, href: `${repository}/actions` },
    { kind: 'evidence', label: { en: 'Architecture decisions', es: 'Decisiones de arquitectura' }, description: { en: 'Five records covering storage, state vocabulary, extraction, retrieval, and grounded answers.', es: 'Cinco registros sobre storage, vocabulario de estados, extracción, retrieval y respuestas fundamentadas.' }, href: `${repository}/tree/main/docs/adr` },
    { kind: 'evidence', label: { en: 'Milestone 4 evidence', es: 'Evidencia del milestone 4' }, description: { en: 'Delivered behavior, gates, and the remaining live-provider blocker.', es: 'Comportamiento entregado, gates y el bloqueo restante del proveedor en vivo.' }, href: `${repository}/blob/main/docs/progress/day-04.md` },
  ],
};

export const workCaseStudies: WorkCaseStudy[] = [aiKnowledgePlatform];

export const getWorkCaseStudy = (slug: string): WorkCaseStudy | undefined =>
  workCaseStudies.find((study) => study.slug === slug);

export const selectedWork: SelectedWork[] = [
  {
    id: 'enterprise-ai-platform', period: { en: '2024 — NOW', es: '2024 — HOY' },
    title: { en: 'Enterprise AI Platform', es: 'Enterprise AI Platform' },
    role: { en: 'Frontend lead · hands-on across the stack', es: 'Liderazgo de frontend · hands-on en todo el stack' },
    summary: { en: 'An Azure OpenAI product for an enterprise healthcare client. I lead its React and Next.js frontend and contribute targeted work across document processing, retrieval, streaming, .NET, and Azure Functions.', es: 'Un producto sobre Azure OpenAI para un cliente enterprise de salud. Lidero su frontend en React y Next.js y contribuyo puntualmente en procesamiento documental, retrieval, streaming, .NET y Azure Functions.' },
    proof: { en: '1,000+ documents through the pipeline · sub-2s time-to-first-token target', es: '1.000+ documentos en el pipeline · objetivo de time-to-first-token < 2s' },
    stack: ['React', 'Next.js', 'Azure OpenAI', 'Pinecone', 'SignalR', '.NET'],
    href: { en: '/en/work/#enterprise-ai-platform', es: '/es/trabajo/#enterprise-ai-platform' },
    cta: { en: 'View the verified summary', es: 'Ver el resumen verificado' },
    caseStudyState: 'disclosure-review', tone: 'coral',
  },
  {
    id: 'ai-knowledge-platform', period: { en: 'PUBLIC REPOSITORY', es: 'REPOSITORIO PÚBLICO' },
    title: aiKnowledgePlatform.title,
    role: aiKnowledgePlatform.role,
    summary: { en: 'A document knowledge platform where retrieval quality, honest failure states, and verifiable citations are product surfaces. Milestones 1–3 are accepted; grounded answers are implemented and await live-provider acceptance.', es: 'Una plataforma de conocimiento documental donde la calidad de retrieval, los estados de falla honestos y las citas verificables son parte del producto. Los milestones 1–3 están aceptados; las respuestas fundamentadas esperan aceptación con el proveedor en vivo.' },
    proof: { en: `${aiKnowledgePlatformStatus.progress.en} · Recall@3 and MRR@3 enforced in CI`, es: `${aiKnowledgePlatformStatus.progress.es} · Recall@3 y MRR@3 verificados en CI` },
    stack: aiKnowledgePlatform.stack,
    href: aiKnowledgePlatform.routes,
    cta: { en: 'Read the case study', es: 'Leer el caso de estudio' },
    caseStudyState: 'published', tone: 'blue',
  },
  {
    id: 'serverless-modernization', period: { en: '2019 — 2021', es: '2019 — 2021' },
    title: { en: 'Serverless Platform Modernization', es: 'Modernización de plataforma serverless' },
    role: { en: 'Full-Stack Engineer · shared technical coordination', es: 'Full-Stack Engineer · coordinación técnica compartida' },
    summary: { en: 'An Angular 7-to-12 modernization and a move from Java services to Node.js and TypeScript serverless services on AWS. I shared coordination of the UI work with two other developers.', es: 'Una modernización de Angular 7 a 12 y el pasaje de servicios Java a servicios serverless en Node.js y TypeScript sobre AWS. Compartí la coordinación del trabajo de UI con otros dos desarrolladores.' },
    proof: { en: 'Team migration reduced infrastructure cost by ≈ 30%', es: 'La migración del equipo redujo el costo de infraestructura ≈ 30%' },
    stack: ['Angular', 'Node.js', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'Terraform'],
    href: { en: '/en/work/#serverless-modernization', es: '/es/trabajo/#serverless-modernization' },
    cta: { en: 'View the verified summary', es: 'Ver el resumen verificado' },
    caseStudyState: 'disclosure-review', tone: 'lime',
  },
];
