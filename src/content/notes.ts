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
  navTitle: string;
  topic: NoteTopic;
  href: string;
}

export type NoteTopic = 'ai-agents' | 'databases' | 'system-design' | 'book-notes';

export interface NoteTopicGroup {
  id: NoteTopic;
  label: string;
}

export const noteTopics: Record<Lang, NoteTopicGroup[]> = {
  en: [
    { id: 'ai-agents', label: 'AI & Agents' },
    { id: 'databases', label: 'Databases' },
    { id: 'system-design', label: 'System Design' },
    { id: 'book-notes', label: 'Book Notes' },
  ],
  es: [
    { id: 'ai-agents', label: 'AI & Agentes' },
    { id: 'databases', label: 'Bases de datos' },
    { id: 'system-design', label: 'System Design' },
    { id: 'book-notes', label: 'Notas de libros' },
  ],
};

export const notes: Record<Lang, Note[]> = {
  en: [
    { tag: 'EVENT-DRIVEN', meta: 'SYSTEM DESIGN · AZURE · BILINGUAL', title: 'Event-driven design in Azure: realtime chat, asynchronous ingestion, and durable truth', navTitle: 'Event-driven Azure', topic: 'system-design', href: '/en/system-design/event-driven-design-azure/' },
    { tag: 'HARNESS', meta: 'AI · BILINGUAL', title: 'Harness engineering: making coding agents reliable', navTitle: 'Harness engineering', topic: 'ai-agents', href: '/en/ai/harness-engineering/' },
    { tag: 'POSTGRES', meta: 'SYSTEM DESIGN · BILINGUAL', title: 'Postgres from the inside: pages, tuples, and MVCC', navTitle: 'Postgres internals', topic: 'databases', href: '/en/system-design/how-postgres-works/' },
    { tag: 'AI SECURITY', meta: 'AI · BILINGUAL', title: 'The agent that escaped the exam: understanding the OpenAI–Hugging Face incident', navTitle: 'Agent security incident', topic: 'ai-agents', href: '/en/ai/openai-hugging-face-incident/' },
    { tag: 'RAG', meta: 'AI · BILINGUAL', title: 'What a production RAG system actually needs', navTitle: 'Production RAG', topic: 'ai-agents', href: '/ai/production-rag/' },
    { tag: 'DATABASES', meta: 'SYSTEM DESIGN · BILINGUAL', title: 'Choosing a database: design from questions, not logos', navTitle: 'Choosing a database', topic: 'databases', href: '/en/system-design/choosing-a-database/' },
    { tag: 'PYTHON', meta: 'SYSTEM DESIGN · SPANISH', title: 'Concurrency vs. parallelism: how to choose and design the system', navTitle: 'Concurrency vs. parallelism', topic: 'system-design', href: '/system-design/concurrencia-vs-paralelismo-python/' },
    { tag: 'AI', meta: 'ARTICLE 01', title: 'Inside a transformer: from a token to the next token', navTitle: 'Transformer architecture', topic: 'ai-agents', href: '/ai/transformer-architecture/' },
    { tag: 'SYSTEM DESIGN', meta: 'FOUNDATIONS', title: 'Building means choosing: an introduction to trade-offs', navTitle: 'Trade-off foundations', topic: 'system-design', href: '/system-design/#tradeoffs' },
    { tag: 'DDIA', meta: 'BOOK NOTES', title: 'Reliable, scalable, and maintainable applications', navTitle: 'DDIA · Chapter 1', topic: 'book-notes', href: '/system-design/ddia/chapter-01/' },
  ],
  es: [
    { tag: 'EVENT-DRIVEN', meta: 'SYSTEM DESIGN · AZURE · BILINGÜE', title: 'Event-driven design en Azure: chat en tiempo real, ingesta asíncrona y verdad durable', navTitle: 'Event-driven en Azure', topic: 'system-design', href: '/system-design/event-driven-design-azure/' },
    { tag: 'HARNESS', meta: 'AI · BILINGÜE', title: 'Harness engineering: cómo volver confiables a los agentes de código', navTitle: 'Harness engineering', topic: 'ai-agents', href: '/es/ai/ingenieria-de-harness/' },
    { tag: 'POSTGRES', meta: 'SYSTEM DESIGN · BILINGÜE', title: 'Postgres por dentro: páginas, tuplas y MVCC', navTitle: 'Postgres por dentro', topic: 'databases', href: '/system-design/postgres-por-dentro/' },
    { tag: 'SEGURIDAD AI', meta: 'AI · CASO REAL · BILINGÜE', title: 'El agente que escapó del examen: entendiendo el incidente OpenAI–Hugging Face', navTitle: 'Incidente de seguridad', topic: 'ai-agents', href: '/es/ai/incidente-openai-hugging-face/' },
    { tag: 'RAG', meta: 'AI · BILINGÜE', title: 'Qué necesita realmente un sistema RAG en producción', navTitle: 'RAG en producción', topic: 'ai-agents', href: '/es/ai/rag-en-produccion/' },
    { tag: 'BASES DE DATOS', meta: 'SYSTEM DESIGN · BILINGÜE', title: 'Elegir una base de datos: diseñá desde las preguntas, no desde el logo', navTitle: 'Elegir una base de datos', topic: 'databases', href: '/system-design/elegir-base-de-datos/' },
    { tag: 'PYTHON', meta: 'SYSTEM DESIGN · ARTÍCULO 01', title: 'Concurrencia vs. paralelismo: cómo elegir y diseñar el sistema', navTitle: 'Concurrencia y paralelismo', topic: 'system-design', href: '/system-design/concurrencia-vs-paralelismo-python/' },
    { tag: 'AI', meta: 'ARTÍCULO 01', title: 'Inside a transformer: de un token al siguiente token', navTitle: 'Arquitectura transformer', topic: 'ai-agents', href: '/ai/transformer-architecture/' },
    { tag: 'SYSTEM DESIGN', meta: 'FUNDAMENTOS', title: 'Construir es elegir: una introducción a los trade-offs', navTitle: 'Fundamentos de trade-offs', topic: 'system-design', href: '/system-design/#tradeoffs' },
    { tag: 'DDIA', meta: 'NOTAS DEL LIBRO', title: 'Reliable, scalable, and maintainable applications', navTitle: 'DDIA · Capítulo 1', topic: 'book-notes', href: '/system-design/ddia/chapter-01/' },
  ],
};
