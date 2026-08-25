/**
 * AI module index shared by the module home (/ai/) and every article page so
 * each post's status is declared in one place.
 */

export const aiModule = {
  number: '01',
  name: 'AI & Harnesses',
  tagline: 'How the machine works, how we wrap it, and which trends survive contact with production.',
} as const;

export type PostStatus = 'published' | 'drafting' | 'planned';

export type Track = 'Foundations' | 'Harness' | 'Signal';

export interface Post {
  number: string;
  title: string;
  track: Track;
  status: PostStatus;
  href?: string;
  reading?: string;
  hook?: string;
}

/** The module's three tracks in suggested reading order. */
export const tracks: { key: Track; label: string; tone: string; copy: string }[] = [
  {
    key: 'Foundations',
    label: 'Foundations',
    tone: 'coral',
    copy: 'What the model actually is, drawn rather than described. Tokens, vectors, attention, and the arithmetic that turns text into a probability.',
  },
  {
    key: 'Harness',
    label: 'The harness',
    tone: 'blue',
    copy: 'Everything around the model that makes it a product: context assembly, tools, memory, loops, permissions, evals, and cost.',
  },
  {
    key: 'Signal',
    label: 'Signal vs. hype',
    tone: 'lime',
    copy: 'Each new wave — agents, MCP, context engineering — read against what it replaces and what it actually costs to run.',
  },
];

export const posts: Post[] = [
  {
    number: '01',
    title: 'Inside a transformer',
    track: 'Foundations',
    status: 'published',
    href: '/ai/transformer-architecture/',
    reading: '~18 min',
    hook: 'Text goes in, a probability distribution comes out. A visual walk from a token to the next token, with GPT-3’s 175 billion parameters accounted for one matrix at a time.',
  },
  {
    number: '02',
    title: 'Attention, worked out slowly',
    track: 'Foundations',
    status: 'planned',
    hook: 'Queries, keys, and values as the mechanism that lets one word rewrite the meaning of another.',
  },
  {
    number: '03',
    title: 'What a harness actually is',
    track: 'Harness',
    status: 'planned',
    hook: 'The loop, the tool schema, the permission boundary, and the transcript. The parts nobody demos.',
  },
  {
    number: '04',
    title: 'Context engineering ate prompt engineering',
    track: 'Harness',
    status: 'planned',
    hook: 'Why the interesting decision moved from wording to what you put in the window and when you drop it.',
  },
  {
    number: '05',
    title: 'Evals are the only feedback you get',
    track: 'Harness',
    status: 'planned',
    hook: 'Building a scoring loop before the product, and why vibes stop scaling around week three.',
  },
  {
    number: '06',
    title: 'Agents: what survives the demo',
    track: 'Signal',
    status: 'planned',
    hook: 'Separating the autonomy that ships from the autonomy that only works on stage.',
  },
  {
    number: '07',
    title: 'What a production RAG system actually needs',
    track: 'Harness',
    status: 'published',
    href: '/ai/production-rag/',
    reading: '~16 min',
    hook: 'The evidence chain, evaluation boundaries, authorization, failure states, and observability that the five-box diagram leaves out.',
  },
];

/** Vocabulary established by article 01 for the rest of the module. */
export const foundationConcepts = [
  ['Token', 'The unit the model actually sees. Not a word and not a character — a fragment produced by a tokenizer, which is why letter-level questions confuse models that reason fluently about paragraphs.'],
  ['Embedding', 'The vector a token becomes. Its direction, not its identity, is what carries meaning, so relationships between words show up as directions shared across the space.'],
  ['Context window', 'The fixed number of vectors the network processes at once. Everything the model can consider in one pass lives here; nothing else exists to it.'],
  ['Logits', 'The raw, unnormalised scores the last layer produces — one per vocabulary entry. Softmax turns them into probabilities; temperature decides how sharply.'],
] as const;
