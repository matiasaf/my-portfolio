/**
 * Published technical notes, newest first.
 *
 * Shared by the Writing index (`src/components/EditorialHome.astro`) and the
 * selected-writing section of the professional home, so the two cannot drift.
 * Article URLs are published links: change a `href` here only if the page itself moves.
 */

import type { Lang } from './profile';

export interface Note {
  tag: string;
  meta: string;
  title: string;
  href: string;
}

export const notes: Record<Lang, Note[]> = {
  en: [
    { tag: 'HARNESS', meta: 'AI · BILINGUAL', title: 'Harness engineering: making coding agents reliable', href: '/en/ai/harness-engineering/' },
    { tag: 'POSTGRES', meta: 'SYSTEM DESIGN · BILINGUAL', title: 'Postgres from the inside: pages, tuples, and MVCC', href: '/en/system-design/how-postgres-works/' },
    { tag: 'AI SECURITY', meta: 'AI · BILINGUAL', title: 'The agent that escaped the exam: understanding the OpenAI–Hugging Face incident', href: '/en/ai/openai-hugging-face-incident/' },
    { tag: 'RAG', meta: 'AI · BILINGUAL', title: 'What a production RAG system actually needs', href: '/ai/production-rag/' },
    { tag: 'DATABASES', meta: 'SYSTEM DESIGN · BILINGUAL', title: 'Choosing a database: design from questions, not logos', href: '/en/system-design/choosing-a-database/' },
    { tag: 'PYTHON', meta: 'SYSTEM DESIGN · SPANISH', title: 'Concurrency vs. parallelism: how to choose and design the system', href: '/system-design/concurrencia-vs-paralelismo-python/' },
    { tag: 'AI', meta: 'ARTICLE 01', title: 'Inside a transformer: from a token to the next token', href: '/ai/transformer-architecture/' },
    { tag: 'SYSTEM DESIGN', meta: 'FOUNDATIONS', title: 'Building means choosing: an introduction to trade-offs', href: '/system-design/#tradeoffs' },
    { tag: 'DDIA', meta: 'BOOK NOTES', title: 'Reliable, scalable, and maintainable applications', href: '/system-design/ddia/chapter-01/' },
  ],
  es: [
    { tag: 'HARNESS', meta: 'AI · BILINGÜE', title: 'Harness engineering: cómo volver confiables a los agentes de código', href: '/es/ai/ingenieria-de-harness/' },
    { tag: 'POSTGRES', meta: 'SYSTEM DESIGN · BILINGÜE', title: 'Postgres por dentro: páginas, tuplas y MVCC', href: '/system-design/postgres-por-dentro/' },
    { tag: 'SEGURIDAD AI', meta: 'AI · CASO REAL · BILINGÜE', title: 'El agente que escapó del examen: entendiendo el incidente OpenAI–Hugging Face', href: '/es/ai/incidente-openai-hugging-face/' },
    { tag: 'RAG', meta: 'AI · BILINGÜE', title: 'Qué necesita realmente un sistema RAG en producción', href: '/es/ai/rag-en-produccion/' },
    { tag: 'BASES DE DATOS', meta: 'SYSTEM DESIGN · BILINGÜE', title: 'Elegir una base de datos: diseñá desde las preguntas, no desde el logo', href: '/system-design/elegir-base-de-datos/' },
    { tag: 'PYTHON', meta: 'SYSTEM DESIGN · ARTÍCULO 01', title: 'Concurrencia vs. paralelismo: cómo elegir y diseñar el sistema', href: '/system-design/concurrencia-vs-paralelismo-python/' },
    { tag: 'AI', meta: 'ARTÍCULO 01', title: 'Inside a transformer: de un token al siguiente token', href: '/ai/transformer-architecture/' },
    { tag: 'SYSTEM DESIGN', meta: 'FUNDAMENTOS', title: 'Construir es elegir: una introducción a los trade-offs', href: '/system-design/#tradeoffs' },
    { tag: 'DDIA', meta: 'NOTAS DEL LIBRO', title: 'Reliable, scalable, and maintainable applications', href: '/system-design/ddia/chapter-01/' },
  ],
};
