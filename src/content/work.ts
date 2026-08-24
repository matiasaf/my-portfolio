import { evidenceLedger, type Attribution, type EvidenceKind, type Lang, type Localized } from './profile';

export type WorkTone = 'coral' | 'blue' | 'lime' | 'violet';
export type CaseStudyState = 'accepted' | 'delivered' | 'implemented' | 'planned';
export type WorkLinkKind = 'source' | 'evidence' | 'artifact';

export interface WorkStatus {
  accepted?: number;
  total?: number;
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
  evidenceHref: string | Record<Lang, string>;
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
  href: string | Record<Lang, string>;
}

export interface DisclosureAudit {
  reviewedAt: string;
  basis: Localized;
  published: Localized[];
  withheld: Localized[];
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
  disclosure?: DisclosureAudit;
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

const publicMetric = (
  id: string,
  evidenceHref: string | Record<Lang, string>,
): WorkMetric => {
  const evidence = evidenceLedger.find((entry) => entry.id === id && entry.publicDisclosure);
  if (!evidence) throw new Error(`Missing public evidence entry: ${id}`);
  return {
    value: evidence.value,
    label: evidence.label,
    kind: evidence.kind,
    attribution: evidence.attribution,
    evidenceHref,
  };
};

const resumeHref = { en: '/en/cv/', es: '/cv/' } satisfies Record<Lang, string>;

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

const enterpriseAiPlatform: WorkCaseStudy = {
  slug: 'enterprise-ai-platform',
  routes: {
    en: '/en/work/enterprise-ai-platform/',
    es: '/es/trabajo/enterprise-ai-platform/',
  },
  title: { en: 'Enterprise AI Platform', es: 'Enterprise AI Platform' },
  seoTitle: {
    en: 'Enterprise AI Platform — Frontend leadership case study',
    es: 'Enterprise AI Platform — Caso de liderazgo frontend',
  },
  description: {
    en: 'A sanitized case study of frontend leadership and targeted cross-stack delivery for an enterprise document AI product.',
    es: 'Un caso de estudio sanitizado sobre liderazgo frontend y entrega puntual cross-stack para un producto enterprise de AI documental.',
  },
  eyebrow: {
    en: 'CLIENT WORK · SANITIZED CASE STUDY',
    es: 'TRABAJO PARA CLIENTE · CASO SANITIZADO',
  },
  period: { en: '2024 — PRESENT', es: '2024 — HOY' },
  role: {
    en: 'Frontend lead · hands-on across the stack',
    es: 'Liderazgo de frontend · hands-on en todo el stack',
  },
  team: {
    en: 'Cross-functional client delivery team · size not disclosed',
    es: 'Equipo cross-functional de entrega para cliente · tamaño no publicado',
  },
  stack: ['React', 'Next.js', 'Azure OpenAI', 'Python', 'Pinecone', 'SignalR', '.NET', 'Azure Functions'],
  availability: {
    en: 'Sanitized architecture and verified outcomes only. Source, screenshots, client data, and a demo are not public.',
    es: 'Solo arquitectura sanitizada y resultados verificados. El código, screenshots, datos del cliente y una demo no son públicos.',
  },
  status: {
    progress: { en: 'Active professional engagement', es: 'Trabajo profesional activo' },
    headline: {
      en: 'Published from disclosure-cleared résumé claims and the portfolio evidence ledger.',
      es: 'Publicado desde claims habilitados del CV y el ledger de evidencia del portfolio.',
    },
    badge: { en: 'SANITIZED · ACTIVE', es: 'SANITIZADO · ACTIVO' },
    updatedAt: '2026-08-24',
  },
  disclosure: {
    reviewedAt: '2026-08-24',
    basis: {
      en: 'Public résumé plus evidence entries explicitly marked for public disclosure.',
      es: 'CV público más entradas del ledger marcadas explícitamente para disclosure público.',
    },
    published: [
      { en: 'Generic product title, role boundary, selected technologies, one measured pipeline volume, and one performance target.', es: 'Título genérico, límite del rol, tecnologías seleccionadas, un volumen medido del pipeline y un objetivo de performance.' },
      { en: 'A conceptual request path that shows responsibilities without reproducing the client topology.', es: 'Un recorrido conceptual del request que muestra responsabilidades sin reproducir la topología del cliente.' },
    ],
    withheld: [
      { en: 'Internal product terminology, proprietary screenshots, prompts, datasets, model configuration, and exact service topology.', es: 'Terminología interna, screenshots propietarios, prompts, datasets, configuración de modelos y topología exacta de servicios.' },
      { en: 'Client usage figures, team size, security controls, operational incidents, and any outcome not present in the evidence ledger.', es: 'Cifras de uso del cliente, tamaño del equipo, controles de seguridad, incidentes operativos y cualquier resultado ausente del ledger.' },
    ],
  },
  overview: {
    en: 'An enterprise document AI product where I lead the React and Next.js frontend and contribute targeted work to the Python processing, Pinecone retrieval, SignalR streaming, .NET, and Azure Functions surfaces that support the experience.',
    es: 'Un producto enterprise de AI documental donde lidero el frontend en React y Next.js y contribuyo puntualmente en las superficies de procesamiento Python, retrieval con Pinecone, streaming con SignalR, .NET y Azure Functions que sostienen la experiencia.',
  },
  problem: {
    en: 'Turn a multi-step document AI workflow into a product experience whose processing, retrieval, and generated-output states remain understandable and responsive to enterprise users.',
    es: 'Convertir un flujo de AI documental de múltiples pasos en una experiencia de producto cuyos estados de procesamiento, retrieval y output generado sigan siendo comprensibles y responsivos para usuarios enterprise.',
  },
  responsibility: [
    {
      en: 'Lead the product frontend: React and Next.js structure, implementation direction, conventions, reviews, and hands-on delivery.',
      es: 'Liderar el frontend del producto: estructura React y Next.js, dirección de implementación, convenciones, reviews y entrega hands-on.',
    },
    {
      en: 'Contribute targeted cross-stack changes where the frontend contract reaches document processing, retrieval, streaming, .NET, or Azure Functions.',
      es: 'Contribuir cambios cross-stack puntuales donde el contrato frontend alcanza procesamiento documental, retrieval, streaming, .NET o Azure Functions.',
    },
    {
      en: 'Keep frontend ownership distinct from system-wide and team ownership; this case does not claim sole architecture responsibility.',
      es: 'Mantener separado el ownership de frontend del ownership del sistema y del equipo; este caso no afirma responsabilidad exclusiva de arquitectura.',
    },
  ],
  constraints: [
    {
      en: 'Document processing and generated output introduce long-running and streaming states that the interface must represent honestly.',
      es: 'El procesamiento documental y el output generado introducen estados largos y de streaming que la interfaz debe representar con honestidad.',
    },
    {
      en: 'The product spans specialized technologies, while my deepest and explicit ownership remains the frontend.',
      es: 'El producto cruza tecnologías especializadas, mientras mi ownership más profundo y explícito sigue siendo el frontend.',
    },
    {
      en: 'Client confidentiality limits the public diagram to conceptual responsibilities and excludes screenshots or internal implementation detail.',
      es: 'La confidencialidad del cliente limita el diagrama público a responsabilidades conceptuales y excluye screenshots o detalles internos.',
    },
  ],
  architecture: {
    label: { en: 'Sanitized product path', es: 'Recorrido sanitizado del producto' },
    description: {
      en: 'This is a conceptual responsibility map, not the client’s exact deployment topology. The frontend coordinates product states; specialized services handle generation, document work, streaming, and retrieval.',
      es: 'Este es un mapa conceptual de responsabilidades, no la topología exacta del cliente. El frontend coordina estados de producto; servicios especializados manejan generación, documentos, streaming y retrieval.',
    },
    stages: [
      { label: { en: 'Product frontend', es: 'Frontend de producto' }, detail: { en: 'React · Next.js', es: 'React · Next.js' } },
      { label: { en: 'AI application layer', es: 'Capa de aplicación AI' }, detail: { en: 'Azure OpenAI · .NET', es: 'Azure OpenAI · .NET' } },
      { label: { en: 'Processing + streaming', es: 'Procesamiento + streaming' }, detail: { en: 'Python · Functions · SignalR', es: 'Python · Functions · SignalR' } },
      { label: { en: 'Retrieval surface', es: 'Superficie de retrieval' }, detail: { en: 'Pinecone · vector retrieval', es: 'Pinecone · retrieval vectorial' } },
    ],
  },
  decisions: [
    {
      title: { en: 'Make workflow state a frontend concern', es: 'Tratar el estado del flujo como responsabilidad frontend' },
      context: {
        en: 'Document processing and AI output do not resolve as one immediate request, so a simple loading flag would erase meaningful progress.',
        es: 'El procesamiento documental y el output de AI no terminan en un único request inmediato, por lo que un loading simple borraría progreso significativo.',
      },
      choice: {
        en: 'Structure the React and Next.js experience around explicit product states and the contracts exposed by processing and streaming services.',
        es: 'Estructurar la experiencia React y Next.js alrededor de estados explícitos de producto y los contratos expuestos por procesamiento y streaming.',
      },
      consequence: {
        en: 'The interface can communicate progress and recovery without pretending every backend operation is synchronous.',
        es: 'La interfaz puede comunicar progreso y recuperación sin fingir que cada operación de backend es sincrónica.',
      },
    },
    {
      title: { en: 'Design responsiveness against a target', es: 'Diseñar la respuesta contra un objetivo' },
      context: {
        en: 'Generated output feels stalled when users wait for a complete response before seeing any feedback.',
        es: 'El output generado se siente detenido cuando el usuario espera una respuesta completa antes de recibir feedback.',
      },
      choice: {
        en: 'Use SignalR streaming in the product path and design against a sub-two-second time-to-first-token target.',
        es: 'Usar streaming con SignalR en el recorrido del producto y diseñar contra un objetivo de time-to-first-token menor a dos segundos.',
      },
      consequence: {
        en: 'Responsiveness becomes an explicit product constraint; the target remains a target and is not published as a measured result.',
        es: 'La responsividad se vuelve una restricción explícita de producto; el objetivo sigue siendo un objetivo y no se publica como resultado medido.',
      },
    },
    {
      title: { en: 'Contribute across boundaries without blurring ownership', es: 'Contribuir entre capas sin borrar el ownership' },
      context: {
        en: 'Frontend delivery sometimes depends on changes to processing, retrieval, streaming, or API behavior.',
        es: 'La entrega frontend a veces depende de cambios en procesamiento, retrieval, streaming o comportamiento de APIs.',
      },
      choice: {
        en: 'Make targeted changes in Python, Pinecone, SignalR, .NET, and Azure Functions while keeping frontend leadership as the stated role.',
        es: 'Hacer cambios puntuales en Python, Pinecone, SignalR, .NET y Azure Functions manteniendo liderazgo frontend como rol declarado.',
      },
      consequence: {
        en: 'Product work can move through integration boundaries without inflating targeted contributions into sole system ownership.',
        es: 'El trabajo de producto puede atravesar límites de integración sin inflar contribuciones puntuales a ownership exclusivo del sistema.',
      },
    },
  ],
  tradeoffs: [
    {
      choice: { en: 'Specialized services behind one product experience', es: 'Servicios especializados detrás de una experiencia de producto' },
      gained: {
        en: 'Each workload can use an appropriate tool: React for interaction, Python for document work, Pinecone for retrieval, and SignalR for streaming.',
        es: 'Cada workload puede usar una herramienta adecuada: React para interacción, Python para documentos, Pinecone para retrieval y SignalR para streaming.',
      },
      cost: {
        en: 'More contracts and asynchronous states must be coordinated and made legible in the frontend.',
        es: 'Más contratos y estados asíncronos deben coordinarse y hacerse legibles en el frontend.',
      },
    },
    {
      choice: { en: 'Streaming before completion', es: 'Streaming antes de completar' },
      gained: {
        en: 'Users receive earlier feedback and the experience can be designed around perceived responsiveness.',
        es: 'Los usuarios reciben feedback antes y la experiencia puede diseñarse alrededor de responsividad percibida.',
      },
      cost: {
        en: 'Connection lifecycle, partial output, cancellation, and recovery become explicit product states.',
        es: 'El ciclo de conexión, output parcial, cancelación y recuperación se vuelven estados explícitos de producto.',
      },
    },
    {
      choice: { en: 'A sanitized public architecture', es: 'Una arquitectura pública sanitizada' },
      gained: {
        en: 'The case demonstrates scope, boundaries, and reasoning without exposing client implementation details.',
        es: 'El caso demuestra alcance, límites y razonamiento sin exponer detalles de implementación del cliente.',
      },
      cost: {
        en: 'Readers cannot inspect source, screenshots, precise topology, or private operational evidence.',
        es: 'Los lectores no pueden inspeccionar código, screenshots, topología precisa ni evidencia operativa privada.',
      },
    },
  ],
  failureModes: [
    {
      en: 'A document can fail before it becomes retrievable, so processing state cannot be collapsed into a generic success state.',
      es: 'Un documento puede fallar antes de estar disponible para retrieval, por lo que el estado de procesamiento no puede colapsarse en un éxito genérico.',
    },
    {
      en: 'A streaming connection can stop after partial output; the interface needs a distinct recovery path.',
      es: 'Una conexión de streaming puede cortarse después de output parcial; la interfaz necesita un camino de recuperación distinto.',
    },
    {
      en: 'Retrieval can return weak context, which must remain distinguishable from a frontend transport failure.',
      es: 'El retrieval puede devolver contexto débil, que debe seguir siendo distinguible de una falla de transporte frontend.',
    },
    {
      en: 'A cross-service contract change can break an otherwise healthy UI, so integration boundaries require explicit validation and review.',
      es: 'Un cambio de contrato entre servicios puede romper una UI sana, por lo que los límites de integración requieren validación y review explícitos.',
    },
  ],
  metrics: [
    publicMetric('documents', resumeHref),
    publicMetric('ttft-target', resumeHref),
  ],
  milestones: [
    {
      number: '01', state: 'delivered',
      title: { en: 'Product frontend leadership', es: 'Liderazgo del frontend de producto' },
      deliverable: { en: 'React + Next.js experience', es: 'Experiencia React + Next.js' },
      description: { en: 'Hands-on frontend delivery, conventions, reviews, and coordination.', es: 'Entrega frontend hands-on, convenciones, reviews y coordinación.' },
    },
    {
      number: '02', state: 'delivered',
      title: { en: 'Document processing path', es: 'Recorrido de procesamiento documental' },
      deliverable: { en: '1K+ completed documents', es: '1K+ documentos completados' },
      description: { en: 'Targeted contributions across the product path supporting the measured pipeline volume.', es: 'Contribuciones puntuales en el recorrido de producto que sostiene el volumen medido del pipeline.' },
    },
    {
      number: '03', state: 'delivered',
      title: { en: 'Streaming product path', es: 'Recorrido de producto con streaming' },
      deliverable: { en: 'SignalR integration', es: 'Integración SignalR' },
      description: { en: 'Implemented streaming against a stated responsiveness target; no achieved latency result is claimed.', es: 'Streaming implementado contra un objetivo de responsividad declarado; no se afirma un resultado de latencia alcanzado.' },
    },
  ],
  next: [
    {
      en: 'Publish an achieved latency result only if a repeatable measurement and client approval become available.',
      es: 'Publicar un resultado de latencia alcanzado solo si existe una medición repetible y aprobación del cliente.',
    },
    {
      en: 'Add a more detailed sanitized sequence diagram only after confirming that its service boundaries are safe to disclose.',
      es: 'Agregar un diagrama de secuencia sanitizado más detallado solo después de confirmar que sus límites de servicios se pueden publicar.',
    },
    {
      en: 'Keep documenting frontend decisions as product contracts so targeted backend work does not blur ownership.',
      es: 'Seguir documentando decisiones frontend como contratos de producto para que el trabajo puntual de backend no borre el ownership.',
    },
  ],
  links: [
    {
      kind: 'evidence',
      label: { en: 'Public résumé', es: 'CV público' },
      description: { en: 'Role, technologies, pipeline volume, and target in the shared résumé source.', es: 'Rol, tecnologías, volumen del pipeline y objetivo en la fuente compartida del CV.' },
      href: resumeHref,
    },
    {
      kind: 'evidence',
      label: { en: 'Professional profile', es: 'Perfil profesional' },
      description: { en: 'Current work, leadership behavior, and the broader experience context.', es: 'Trabajo actual, comportamiento de liderazgo y contexto más amplio de experiencia.' },
      href: { en: '/en/about/', es: '/sobre-mi/' },
    },
  ],
};

const serverlessModernization: WorkCaseStudy = {
  slug: 'serverless-modernization',
  routes: {
    en: '/en/work/serverless-modernization/',
    es: '/es/trabajo/serverless-modernization/',
  },
  title: {
    en: 'Serverless Platform Modernization',
    es: 'Modernización de plataforma serverless',
  },
  seoTitle: {
    en: 'Serverless Platform Modernization — Engineering case study',
    es: 'Modernización de plataforma serverless — Caso de ingeniería',
  },
  description: {
    en: 'A sanitized case study of an Angular modernization and a team migration from Java services to Node.js and TypeScript serverless services on AWS.',
    es: 'Un caso sanitizado sobre una modernización Angular y una migración de equipo desde servicios Java a servicios serverless Node.js y TypeScript sobre AWS.',
  },
  eyebrow: {
    en: 'CLIENT WORK · COMPLETED ENGAGEMENT',
    es: 'TRABAJO PARA CLIENTE · EXPERIENCIA COMPLETADA',
  },
  period: { en: '2019 — 2021', es: '2019 — 2021' },
  role: {
    en: 'Full-Stack Engineer · shared technical coordination',
    es: 'Full-Stack Engineer · coordinación técnica compartida',
  },
  team: {
    en: 'UI coordination shared with two other developers · broader team result',
    es: 'Coordinación de UI compartida con otros dos desarrolladores · resultado del equipo amplio',
  },
  stack: ['Angular', 'Node.js', 'TypeScript', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'Terraform'],
  availability: {
    en: 'Sanitized architecture and team-attributed outcomes only. Client source, screenshots, data, and a demo are not public.',
    es: 'Solo arquitectura sanitizada y resultados atribuidos al equipo. El código, screenshots, datos y demo del cliente no son públicos.',
  },
  status: {
    progress: { en: 'Completed professional engagement', es: 'Experiencia profesional completada' },
    headline: {
      en: 'Published from disclosure-cleared résumé claims and a team-attributed evidence entry.',
      es: 'Publicado desde claims habilitados del CV y una entrada de evidencia atribuida al equipo.',
    },
    badge: { en: 'SANITIZED · COMPLETED', es: 'SANITIZADO · COMPLETADO' },
    updatedAt: '2026-08-24',
  },
  disclosure: {
    reviewedAt: '2026-08-24',
    basis: {
      en: 'Public résumé plus the infrastructure-cost evidence entry, preserving team attribution.',
      es: 'CV público más la entrada de evidencia de costo de infraestructura, preservando atribución de equipo.',
    },
    published: [
      { en: 'Generic platform title, role, shared UI coordination, selected AWS services, migration scope, and approximate team result.', es: 'Título genérico, rol, coordinación compartida de UI, servicios AWS seleccionados, alcance de migración y resultado aproximado del equipo.' },
      { en: 'A conceptual modernization path rather than the client’s precise topology.', es: 'Un recorrido conceptual de modernización en lugar de la topología precisa del cliente.' },
    ],
    withheld: [
      { en: 'Client repositories, screenshots, domain data, account layout, service inventory, traffic, and operational incidents.', es: 'Repositorios del cliente, screenshots, datos de dominio, estructura de cuentas, inventario de servicios, tráfico e incidentes operativos.' },
      { en: 'Any implication that I solely designed the migration or individually produced the cost result.', es: 'Cualquier implicación de que diseñé la migración en soledad o produje individualmente el resultado de costo.' },
    ],
  },
  overview: {
    en: 'A platform modernization spanning an Angular 7-to-12 migration and a team move from Java services to Node.js and TypeScript serverless services on AWS, with Terraform-managed infrastructure and blue-green delivery.',
    es: 'Una modernización de plataforma que incluyó una migración Angular 7–12 y un pasaje del equipo desde servicios Java a servicios serverless Node.js y TypeScript sobre AWS, con infraestructura en Terraform y entrega blue-green.',
  },
  problem: {
    en: 'Modernize an existing analytics platform across UI, services, and infrastructure while continuing delivery and coordinating changes across multiple developers.',
    es: 'Modernizar una plataforma de analytics existente entre UI, servicios e infraestructura mientras continuaba la entrega y se coordinaban cambios entre múltiples desarrolladores.',
  },
  responsibility: [
    {
      en: 'Contribute hands-on to the Angular 7-to-12 migration and interactive analytics widgets.',
      es: 'Contribuir hands-on a la migración Angular 7–12 y a widgets interactivos de analytics.',
    },
    {
      en: 'Share technical coordination of UI changes with two other developers rather than claim sole frontend leadership.',
      es: 'Compartir la coordinación técnica de cambios de UI con otros dos desarrolladores en lugar de afirmar liderazgo frontend exclusivo.',
    },
    {
      en: 'Contribute to Node.js and TypeScript services, AWS infrastructure, Terraform, and blue-green delivery as part of the broader migration team.',
      es: 'Contribuir a servicios Node.js y TypeScript, infraestructura AWS, Terraform y entrega blue-green como parte del equipo amplio de migración.',
    },
  ],
  constraints: [
    {
      en: 'The work modernized an existing product rather than starting from a blank architecture.',
      es: 'El trabajo modernizó un producto existente en lugar de comenzar desde una arquitectura vacía.',
    },
    {
      en: 'UI and service changes had to remain coordinated across developers and deployment boundaries.',
      es: 'Los cambios de UI y servicios debían seguir coordinados entre desarrolladores y límites de despliegue.',
    },
    {
      en: 'The public result is approximate and belongs to the team; the case cannot assign it to one engineer.',
      es: 'El resultado público es aproximado y pertenece al equipo; el caso no puede asignarlo a un solo ingeniero.',
    },
  ],
  architecture: {
    label: { en: 'Sanitized modernization path', es: 'Recorrido sanitizado de modernización' },
    description: {
      en: 'A conceptual view of the disclosed stack. It shows the direction of the modernization without reproducing accounts, service boundaries, data models, or client topology.',
      es: 'Una vista conceptual del stack publicado. Muestra la dirección de la modernización sin reproducir cuentas, límites de servicios, modelos de datos ni topología del cliente.',
    },
    stages: [
      { label: { en: 'Modernized UI', es: 'UI modernizada' }, detail: { en: 'Angular 7 → 12', es: 'Angular 7 → 12' } },
      { label: { en: 'API boundary', es: 'Límite de API' }, detail: { en: 'API Gateway', es: 'API Gateway' } },
      { label: { en: 'Serverless services', es: 'Servicios serverless' }, detail: { en: 'Node.js · TypeScript · Lambda', es: 'Node.js · TypeScript · Lambda' } },
      { label: { en: 'Data + delivery', es: 'Datos + entrega' }, detail: { en: 'DynamoDB · Terraform · blue-green', es: 'DynamoDB · Terraform · blue-green' } },
    ],
  },
  decisions: [
    {
      title: { en: 'Modernize the UI through version migration', es: 'Modernizar la UI mediante migración de versiones' },
      context: {
        en: 'The product already had an Angular application and ongoing delivery commitments.',
        es: 'El producto ya tenía una aplicación Angular y compromisos de entrega en curso.',
      },
      choice: {
        en: 'Move the existing frontend from Angular 7 through Angular 12 while continuing feature work and shared UI coordination.',
        es: 'Llevar el frontend existente desde Angular 7 hasta Angular 12 mientras continuaban features y coordinación compartida de UI.',
      },
      consequence: {
        en: 'The team retained product context and delivery continuity, with compatibility work spread across the modernization.',
        es: 'El equipo conservó contexto de producto y continuidad de entrega, con trabajo de compatibilidad distribuido durante la modernización.',
      },
    },
    {
      title: { en: 'Move services toward the TypeScript stack', es: 'Mover servicios hacia el stack TypeScript' },
      context: {
        en: 'The modernization included existing Java services alongside a TypeScript-heavy product team.',
        es: 'La modernización incluía servicios Java existentes junto a un equipo de producto con fuerte uso de TypeScript.',
      },
      choice: {
        en: 'Migrate selected services to Node.js and TypeScript on AWS Lambda behind API Gateway.',
        es: 'Migrar servicios seleccionados a Node.js y TypeScript sobre AWS Lambda detrás de API Gateway.',
      },
      consequence: {
        en: 'The team migration contributed to an approximately 30% infrastructure-cost reduction; this remains a team result.',
        es: 'La migración del equipo contribuyó a una reducción aproximada del 30% en costo de infraestructura; sigue siendo un resultado del equipo.',
      },
    },
    {
      title: { en: 'Treat infrastructure and rollout as code', es: 'Tratar infraestructura y rollout como código' },
      context: {
        en: 'Service migration changes runtime infrastructure and increases deployment coordination risk.',
        es: 'La migración de servicios cambia infraestructura de runtime y aumenta el riesgo de coordinación de despliegues.',
      },
      choice: {
        en: 'Manage disclosed infrastructure with Terraform and use blue-green deployment practices.',
        es: 'Gestionar la infraestructura publicada con Terraform y usar prácticas de despliegue blue-green.',
      },
      consequence: {
        en: 'Infrastructure changes become reviewable and rollouts gain an explicit transition path.',
        es: 'Los cambios de infraestructura se vuelven revisables y los rollouts obtienen un camino explícito de transición.',
      },
    },
  ],
  tradeoffs: [
    {
      choice: { en: 'Version migration instead of abandoning the existing UI', es: 'Migración de versiones en lugar de abandonar la UI existente' },
      gained: {
        en: 'Existing product behavior and team knowledge remain useful while the framework advances.',
        es: 'El comportamiento existente del producto y el conocimiento del equipo siguen siendo útiles mientras avanza el framework.',
      },
      cost: {
        en: 'Cross-version compatibility and coordinated feature delivery add migration overhead.',
        es: 'La compatibilidad entre versiones y la entrega coordinada de features agregan overhead de migración.',
      },
    },
    {
      choice: { en: 'Serverless Node.js and TypeScript services', es: 'Servicios serverless en Node.js y TypeScript' },
      gained: {
        en: 'Managed execution and stack alignment supported the team’s lower infrastructure-cost outcome.',
        es: 'La ejecución gestionada y la alineación del stack apoyaron el resultado de menor costo de infraestructura del equipo.',
      },
      cost: {
        en: 'Distributed functions create more API, observability, retry, and deployment boundaries to coordinate.',
        es: 'Las funciones distribuidas crean más límites de API, observabilidad, retry y despliegue para coordinar.',
      },
    },
    {
      choice: { en: 'Shared UI coordination', es: 'Coordinación compartida de UI' },
      gained: {
        en: 'Decisions and migration work can be distributed among three developers instead of depending on one person.',
        es: 'Las decisiones y el trabajo de migración se pueden distribuir entre tres desarrolladores en vez de depender de una persona.',
      },
      cost: {
        en: 'Conventions, sequencing, and review require explicit alignment across contributors.',
        es: 'Las convenciones, secuencia y review requieren alineación explícita entre contributors.',
      },
    },
  ],
  failureModes: [
    {
      en: 'A framework upgrade can expose incompatible dependencies or behavior before a feature reaches production.',
      es: 'Un upgrade de framework puede exponer dependencias o comportamientos incompatibles antes de que una feature llegue a producción.',
    },
    {
      en: 'A UI and API contract can drift when migrations proceed on different schedules.',
      es: 'Un contrato entre UI y API puede divergir cuando las migraciones avanzan con calendarios distintos.',
    },
    {
      en: 'A distributed service failure can be partial, requiring logs and retries at more than one boundary.',
      es: 'Una falla de servicios distribuidos puede ser parcial y requerir logs y retries en más de un límite.',
    },
    {
      en: 'A rollout can fail after infrastructure changes; blue-green delivery keeps the transition explicit rather than treating deployment as one irreversible step.',
      es: 'Un rollout puede fallar después de cambios de infraestructura; blue-green mantiene explícita la transición en lugar de tratar el despliegue como un paso irreversible.',
    },
  ],
  metrics: [publicMetric('infrastructure', resumeHref)],
  milestones: [
    {
      number: '01', state: 'delivered',
      title: { en: 'Angular modernization', es: 'Modernización Angular' },
      deliverable: { en: 'Angular 7 → 12', es: 'Angular 7 → 12' },
      description: { en: 'Hands-on migration work and interactive analytics widgets.', es: 'Trabajo hands-on de migración y widgets interactivos de analytics.' },
    },
    {
      number: '02', state: 'delivered',
      title: { en: 'Serverless service migration', es: 'Migración de servicios serverless' },
      deliverable: { en: 'Java → Node.js + TypeScript', es: 'Java → Node.js + TypeScript' },
      description: { en: 'Team migration across Lambda, API Gateway, and DynamoDB.', es: 'Migración de equipo sobre Lambda, API Gateway y DynamoDB.' },
    },
    {
      number: '03', state: 'delivered',
      title: { en: 'Infrastructure delivery', es: 'Entrega de infraestructura' },
      deliverable: { en: 'Terraform + blue-green', es: 'Terraform + blue-green' },
      description: { en: 'Reviewable infrastructure changes and explicit rollout transitions.', es: 'Cambios de infraestructura revisables y transiciones explícitas de rollout.' },
    },
  ],
  next: [
    {
      en: 'On a current version of this work, I would add contract tests around the UI/API migration boundary before each upgrade step.',
      es: 'En una versión actual de este trabajo agregaría contract tests alrededor del límite UI/API antes de cada paso de upgrade.',
    },
    {
      en: 'I would make per-service latency, failure, retry, and cost signals part of the migration acceptance criteria.',
      es: 'Haría que señales de latencia, fallas, retries y costo por servicio formen parte de los criterios de aceptación de la migración.',
    },
    {
      en: 'I would record architecture decisions and ownership boundaries alongside Terraform changes to reduce coordination cost.',
      es: 'Registraría decisiones de arquitectura y límites de ownership junto a los cambios Terraform para reducir el costo de coordinación.',
    },
  ],
  links: [
    {
      kind: 'evidence',
      label: { en: 'Public résumé', es: 'CV público' },
      description: { en: 'Role, migration scope, AWS stack, shared coordination, and team-attributed result.', es: 'Rol, alcance de migración, stack AWS, coordinación compartida y resultado atribuido al equipo.' },
      href: resumeHref,
    },
    {
      kind: 'evidence',
      label: { en: 'Professional profile', es: 'Perfil profesional' },
      description: { en: 'The broader career context without private client artifacts.', es: 'El contexto más amplio de carrera sin artefactos privados del cliente.' },
      href: { en: '/en/about/', es: '/sobre-mi/' },
    },
  ],
};

export const workCaseStudies: WorkCaseStudy[] = [
  enterpriseAiPlatform,
  aiKnowledgePlatform,
  serverlessModernization,
];

export const getWorkCaseStudy = (slug: string): WorkCaseStudy | undefined =>
  workCaseStudies.find((study) => study.slug === slug);

export const selectedWork: SelectedWork[] = [
  {
    id: 'enterprise-ai-platform', period: { en: '2024 — NOW', es: '2024 — HOY' },
    title: enterpriseAiPlatform.title,
    role: enterpriseAiPlatform.role,
    summary: { en: 'An Azure OpenAI product for an enterprise healthcare client. I lead its React and Next.js frontend and contribute targeted work across document processing, retrieval, streaming, .NET, and Azure Functions.', es: 'Un producto sobre Azure OpenAI para un cliente enterprise de salud. Lidero su frontend en React y Next.js y contribuyo puntualmente en procesamiento documental, retrieval, streaming, .NET y Azure Functions.' },
    proof: { en: '1,000+ documents through the pipeline · sub-2s time-to-first-token target', es: '1.000+ documentos en el pipeline · objetivo de time-to-first-token < 2s' },
    stack: ['React', 'Next.js', 'Azure OpenAI', 'Pinecone', 'SignalR', '.NET'],
    href: enterpriseAiPlatform.routes,
    cta: { en: 'Read the case study', es: 'Leer el caso de estudio' },
    caseStudyState: 'published', tone: 'coral',
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
    title: serverlessModernization.title,
    role: serverlessModernization.role,
    summary: { en: 'An Angular 7-to-12 modernization and a move from Java services to Node.js and TypeScript serverless services on AWS. I shared coordination of the UI work with two other developers.', es: 'Una modernización de Angular 7 a 12 y el pasaje de servicios Java a servicios serverless en Node.js y TypeScript sobre AWS. Compartí la coordinación del trabajo de UI con otros dos desarrolladores.' },
    proof: { en: 'Team migration reduced infrastructure cost by ≈ 30%', es: 'La migración del equipo redujo el costo de infraestructura ≈ 30%' },
    stack: ['Angular', 'Node.js', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'Terraform'],
    href: serverlessModernization.routes,
    cta: { en: 'Read the case study', es: 'Leer el caso de estudio' },
    caseStudyState: 'published', tone: 'lime',
  },
];
