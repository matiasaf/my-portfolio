/**
 * Index for the study of Martin Kleppmann's "Designing Data-Intensive Applications."
 * Shared by the module section (/system-design/#ddia) and chapter pages.
 */

export const book = {
  title: 'Designing Data-Intensive Applications',
  subtitle: 'The Big Ideas Behind Reliable, Scalable, and Maintainable Systems',
  author: 'Martin Kleppmann',
  publisher: "O'Reilly Media",
  edition: '1st edition, 2017',
  site: 'https://dataintensive.net/',
} as const;

export type ChapterStatus = 'published' | 'planned';

export interface Chapter {
  number: string;
  title: string;
  part: string;
  status: ChapterStatus;
  href?: string;
  hook?: string;
}

export const chapters: Chapter[] = [
  {
    number: '01',
    title: 'Reliable, Scalable, and Maintainable Applications',
    part: 'I · Foundations',
    status: 'published',
    href: '/system-design/ddia/chapter-01/',
    hook: 'The three concerns that justify every later decision, and why "is it scalable?" is the wrong question.',
  },
  { number: '02', title: 'Data Models and Query Languages', part: 'I · Foundations', status: 'planned' },
  { number: '03', title: 'Storage and Retrieval', part: 'I · Foundations', status: 'planned' },
  { number: '04', title: 'Encoding and Evolution', part: 'I · Foundations', status: 'planned' },
  { number: '05', title: 'Replication', part: 'II · Distributed Data', status: 'planned' },
  { number: '06', title: 'Partitioning', part: 'II · Distributed Data', status: 'planned' },
  { number: '07', title: 'Transactions', part: 'II · Distributed Data', status: 'planned' },
  { number: '08', title: 'The Trouble with Distributed Systems', part: 'II · Distributed Data', status: 'planned' },
  { number: '09', title: 'Consistency and Consensus', part: 'II · Distributed Data', status: 'planned' },
  { number: '10', title: 'Batch Processing', part: 'III · Derived Data', status: 'planned' },
  { number: '11', title: 'Stream Processing', part: 'III · Derived Data', status: 'planned' },
  { number: '12', title: 'The Future of Data Systems', part: 'III · Derived Data', status: 'planned' },
];

/** Concepts established by chapter 1 for the rest of the book. */
export const chapterOneConcepts = [
  ['Fault ≠ failure', 'A fault is one component deviating from spec. A failure is the system as a whole stopping. Tolerance means containing the first so it never becomes the second.'],
  ['Load parameter', 'The number that describes what actually grows: requests per second, read/write ratio, fan-out, cache hit rate. Choosing the wrong one hides the bottleneck.'],
  ['Tail latency', 'The p99 and p999 response times. Averages describe nobody; the tail describes the users most likely to matter.'],
  ['Accidental complexity', 'Complexity that comes from the implementation rather than from the problem itself. It is the kind you are allowed to remove.'],
] as const;
