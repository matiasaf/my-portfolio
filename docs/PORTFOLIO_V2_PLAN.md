# Portfolio V2: Job-Focused Improvement Plan

## Status

Proposed implementation roadmap.

## Purpose

Turn `builtbymatias.dev` from an editorial-first portfolio into a hiring-focused professional
system without losing its writing, visual identity, or technical depth.

The site should help a recruiter or hiring manager answer four questions quickly:

1. What kind of engineer is Matias?
2. What has he delivered and owned?
3. What evidence supports those claims?
4. What should the visitor do next?

The desired visitor path is:

```text
Professional positioning
        -> verified evidence
        -> selected case studies
        -> resume or contact
```

## 1. Positioning

### Recommended public headline

```text
Senior Software Engineer · Frontend Lead · Applied AI
```

Supporting statement:

```text
I build reliable product experiences across frontend architecture,
AI systems, APIs, and cloud delivery.
```

This positioning combines breadth with a defensible specialization:

- `Senior Software Engineer` communicates the overall level and scope.
- `Frontend Lead` reflects demonstrated responsibility without turning Engineering Lead into
  an unsupported formal job title.
- `Applied AI` describes current production work rather than a future interest.
- Architectural ability should be demonstrated through decisions and trade-offs in case studies,
  not claimed through an Architect or Staff title.

### Target roles

In priority order:

1. Senior or Lead Frontend Engineer.
2. Senior Full-Stack Engineer with a frontend focus.
3. Full-Stack AI Product Engineer.
4. React/TypeScript Tech Lead.

Staff Engineer, Engineering Lead, and Software Architect are career directions. They should not
be presented as current formal titles unless the underlying role and scope can be verified.

## 2. Evidence and claim policy

Before rewriting public copy, create a small evidence ledger. Every impact statement must record:

- the exact public wording;
- its source;
- whether it is an individual or team result;
- whether it may be disclosed publicly;
- whether it describes a target, an implemented capability, or a measured result;
- its English and Spanish versions.

### Current claim inventory

| Claim | Decision |
|---|---|
| More than 10 years shipping software | Supported |
| Frontend lead of AI Studio | Supported |
| More than 1,000 documents completed the AI pipeline | Supported |
| Sub-two-second time-to-first-token target | Supported only when described as a target |
| Business Intelligence dashboard made 35% faster | Supported |
| Team migration reduced infrastructure cost by approximately 30% | Supported as a team result |
| Mentoring and reviews within a five-developer team | Supported |
| Led more than five engineers | Not currently supported |
| Served more than 200,000 users | Not currently supported |
| Improved performance by 40% | Replace with the documented 35% result |
| Reduced infrastructure cost by 60% | Replace with the documented approximately 30% result |

### Permanent rules

- Never inflate a job title to communicate ambition.
- Never turn a target into an achieved result.
- Distinguish individual ownership from shared or team ownership.
- Do not publish client-sensitive architecture, screenshots, data, or internal terminology without
  confirming that it is safe to disclose.
- Prefer precise, modest evidence over broad claims.

## 3. Information architecture

### Proposed route structure

```text
/en/                         Professional home
/es/                         Professional home

/en/work/                    Selected work index
/es/trabajo/

/en/work/[case-study]/       Individual case study
/es/trabajo/[case-study]/

/en/writing/                 Editorial archive
/es/publicaciones/

/en/about/                   Professional profile and working style
/sobre-mi/

/en/cv/                      English resume
/cv/                         Spanish resume

/en/labs/                    Later phase
/es/labs/
```

Existing article URLs should remain unchanged to avoid breaking inbound links. `/` should continue
to redirect to the English home page.

The current editorial home should remain part of the product, but move to Writing/Publicaciones.

## 4. Professional home

### Section order

1. Minimal navigation.
2. Positioning, availability, and primary calls to action.
3. Verified proof metrics.
4. Selected engineering work.
5. Condensed experience.
6. Selected writing.
7. One active lab, only if it represents real delivered work.
8. Availability and contact.

### Navigation

```text
Work · Writing · About · Resume
```

GitHub, LinkedIn, email, and the language switcher remain available without competing with the
primary navigation.

### Hero draft

```text
MATIAS FERNANDEZ

Senior Software Engineer
Frontend Lead · Applied AI

I build reliable product experiences across frontend
architecture, AI systems, APIs, and cloud delivery.

10+ years shipping software from Argentina
with overlap across American time zones.

[View selected work] [Download resume] [Contact me]
```

### Proof row

```text
10+       years shipping software
1K+       documents through AI pipelines
35%       faster Business Intelligence dashboard
~30%      lower infrastructure cost from a team migration
```

The infrastructure metric must explicitly remain a team result.

### Home acceptance criteria

- At desktop and mobile widths, the first viewport communicates role, specialization, evidence,
  location, and the next action.
- Resume and contact are reachable in one interaction.
- No planned or queued project appears as primary evidence.
- English and Spanish communicate equivalent meaning.
- The page preserves semantic HTML, keyboard access, visible focus, contrast, and reduced motion.

## 5. Selected engineering work

The initial release should present three strong case studies. It should not present a large backlog
of future projects.

### Case study 1: Enterprise AI Platform / AI Studio

Recommended role description:

```text
Frontend lead · hands-on across the stack
```

Potential evidence:

- React and Next.js product frontend.
- Azure OpenAI integration.
- Python document processing.
- Pinecone retrieval.
- SignalR streaming.
- Targeted work in .NET and Azure Functions.
- More than 1,000 documents through the processing pipeline.
- Sub-two-second time-to-first-token target, explicitly described as a target.

Before publishing:

1. Confirm which client, product, architecture, and metric details may be disclosed.
2. Remove internal or sensitive terminology.
3. Use sanitized diagrams.
4. Do not publish proprietary screenshots without permission.
5. Make frontend ownership and targeted cross-stack contributions distinct.

If the product name should not be public, use a generic title such as `Enterprise AI Platform`.

### Case study 2: AI Knowledge Platform

This is the primary fully public case study. It should connect:

- implementation;
- tests and CI;
- architecture decision records;
- retrieval and answer evaluation;
- product states and failure behavior;
- source code;
- a deployed demo or short product video.

The portfolio currently describes milestone 1 while the repository describes milestone 4 as
implemented with live provider acceptance still pending. The site must describe the current state
precisely and must distinguish implemented code from accepted live-provider quality.

### Case study 3: Serverless Platform Modernization

Recommended role description:

```text
Full-Stack Engineer · shared technical coordination
```

Potential evidence:

- Angular 7-to-12 modernization.
- Migration from Java services to Node.js/TypeScript serverless services.
- AWS Lambda, API Gateway, DynamoDB, and Terraform.
- Approximately 30% lower infrastructure cost as a team result.

Do not present the work as an individual architecture initiative or use Architect as the role unless
that scope can be verified.

### Possible fourth case study

Azure IC Portal should initially remain within Current Work. It can become a dedicated case study
after it has a safe-to-publish outcome, metric, or artifact.

## 6. Shared case study template

Every case study should use the same structure:

```text
Title

At a glance
- Role
- Period
- Team
- Stack
- Availability of source or demo

Overview

The problem

My responsibility

Constraints

Architecture

Key decisions

Trade-offs

Failure modes

Results and evidence

What I would improve next

Related links
```

Each case study must include:

- one sentence that explains the problem;
- an exact description of ownership;
- one architecture diagram;
- at least three meaningful decisions;
- at least two trade-offs;
- verifiable outcomes;
- a clear separation between targets, implemented capabilities, and measured results;
- a reading path that works in roughly two minutes.

Use static HTML/CSS or accessible SVG for diagrams, reusing the visual language already present in
the System Design section. Avoid Mermaid or React Flow unless a later requirement justifies their
runtime and dependency cost.

## 7. Implementation sequence

### PR 1: Evidence, positioning, and professional home

1. Create `src/content/profile.ts`.
2. Centralize positioning, proof metrics, contacts, availability, and role preferences.
3. Record the source and attribution rules for every public metric.
4. Make `src/pages/en/index.astro` and `src/pages/es/index.astro` render the professional home.
5. Add Writing/Publicaciones routes that render the existing editorial home.
6. Reduce the primary navigation.
7. Rewrite the hero and calls to action.
8. Render only verified proof metrics.
9. Remove the three queued projects from prominent home placement.
10. Synchronize the AI Knowledge Platform status across the site.
11. Verify English and Spanish copy together.

Acceptance criteria:

- The first viewport passes the professional-home acceptance criteria.
- No unsupported metric or title is present.
- No existing article link is broken.
- The project status is internally consistent.

### PR 2: Case study content model and public flagship

1. Create a strictly typed `src/content/work.ts`.
2. Model slug, language, metadata, ownership, metrics, sections, related links, and status.
3. Create a reusable `WorkCaseStudy.astro` component.
4. Add Work/Trabajo index routes.
5. Add bilingual static routes for individual case studies.
6. Add title, description, canonical URL, `hreflang`, and social metadata.
7. Build the AI Knowledge Platform case study first.
8. Make the home card and project page consume the same local status source.
9. Add a short demo or video when the current behavior can be demonstrated honestly.

Acceptance criteria:

- The same project cannot show different local milestone states.
- The public case links to source code, evidence, and a working artifact.
- Planned capabilities are not presented as shipped.

### PR 3: Professional case studies

1. Perform a disclosure audit for each client-based case.
2. Write the AI Studio or Enterprise AI Platform case.
3. Build a sanitized architecture diagram.
4. Separate personal responsibility from shared responsibility.
5. Write the Serverless Platform Modernization case.
6. Check every metric against the evidence ledger.
7. Add contextual calls to action for the resume and contact.

Acceptance criteria:

- No case implies ownership, scale, title, or impact beyond available evidence.
- Every case communicates a problem, decisions, trade-offs, and outcomes.
- Confidential information is absent.

### PR 4: About, experience, and resume alignment

1. Refocus About on profile, leadership behavior, working style, and preferred environment.
2. Remove content that unnecessarily duplicates the professional home.
3. Condense Experience and connect relevant roles to case studies.
4. Reduce the current resume role to four or five high-impact bullets.
5. Prepare two resume positioning variants:
   - Frontend Lead;
   - AI Product Engineer.
6. Keep the underlying experience data shared. Variants may change only headline, summary,
   selected highlights, and skill order.
7. Regenerate and test the resume PDFs.

Acceptance criteria:

- Home, About, resume, LinkedIn, and GitHub tell the same professional story.
- Resume variants do not duplicate or drift from the shared experience source.
- PDF downloads, print layout, and web resume remain usable.

### PR 5: GitHub professional surface

This work is partly outside this repository and requires explicit access to the GitHub account.

1. Create or update the `matiasaf/matiasaf` profile README repository.
2. Add professional positioning, portfolio URL, location, and availability.
3. Pin three to five relevant repositories.
4. Stop using old experiments as the primary public evidence.
5. Improve each selected repository README with:
   - the problem;
   - key features;
   - architecture;
   - setup instructions;
   - tests;
   - demo;
   - screenshots;
   - current status.
6. Add repository descriptions, topics, and portfolio links.
7. Pin the AI Knowledge Platform and this portfolio first.

Acceptance criteria:

- A visitor can understand the professional focus without opening a repository.
- The pinned repositories match the roles targeted by the portfolio.
- Each pinned repository can be evaluated in a few minutes.

### PR 6: Search, social previews, and measurement

Preserve the existing canonical, Open Graph, and `hreflang` foundation.

1. Add an automatically generated sitemap.
2. Add `robots.txt`.
3. Add `Person` or `ProfilePage` JSON-LD to the professional profile.
4. Add `Article` JSON-LD to technical writing where appropriate.
5. Add social images for the home, About, resume, and case studies.
6. Configure Google Search Console after deployment.
7. Configure Cloudflare Web Analytics.
8. Establish a baseline for entry routes, page views, and Core Web Vitals.
9. Consider custom conversion events only after choosing a privacy-appropriate analytics tool
   that supports them.

Acceptance criteria:

- The sitemap contains every intended public route.
- Structured data passes the relevant validators.
- Social previews contain the correct title, description, and image.
- Search and analytics configuration do not expose private information.

## 8. Writing and labs

Writing remains important evidence, but it is not the primary home message.

### Suggested categories

- Software Architecture.
- Applied AI.
- Cloud and Distributed Systems.
- Product Frontend.
- Engineering Leadership.

### Suggested future articles

1. What a production RAG system actually needs.
2. Designing resilient APIs: timeouts, retries, and circuit breakers.
3. Lambda vs. ECS: choosing compute from workload characteristics.
4. Idempotency in distributed systems.
5. AI agents and security boundaries.

Do not begin all of these before the home and case studies are complete. Existing writing should be
reorganized and surfaced first.

`Labs` may replace `Side Projects`, but only delivered or actively maintained work should appear
prominently. Renaming an unfinished backlog does not make it stronger evidence. Do not start another
agent project before the AI Knowledge Platform is a convincing flagship.

## 9. Verification

Run the narrow check while iterating:

```bash
npm run check
```

Run the full project gate before closing every implementation phase:

```bash
npm run verify
```

### Visual and behavioral matrix

Review the home, case studies, About, and resume across:

- desktop and mobile widths;
- light and dark themes;
- English and Spanish;
- keyboard navigation and visible focus;
- reduced motion;
- downloads and external links;
- canonical URLs and `hreflang`;
- social metadata;
- horizontal overflow;
- broken internal links.

Update `PROGRESS.md` when a phase spans sessions, becomes blocked, or changes the next useful action.

## 10. Delivery schedule

### Week 1

- Build the evidence ledger.
- Finalize positioning.
- Ship the professional home.
- Move the editorial home to Writing/Publicaciones.
- Correct project status drift.

### Week 2

- Build the case study content model and template.
- Publish the AI Knowledge Platform case study.
- Add a demo or short video.
- Complete the first GitHub cleanup.

The portfolio should be usable for applications at the end of this week.

### Week 3

- Publish the AI Studio or Enterprise AI Platform case study.
- Publish the Serverless Platform Modernization case study.
- Complete sanitized architecture diagrams and disclosure review.

### Week 4

- Refine About and Experience.
- Align resume variants and regenerate PDFs.
- Complete the GitHub profile and selected repository documentation.

### Week 5

- Add sitemap, structured data, Search Console, and analytics.
- Complete the full visual, accessibility, metadata, and link review.

### Week 6

- Publish and announce the portfolio.
- Feature it on LinkedIn and GitHub.
- Begin targeted outreach.
- Review the first usage and job-search signals.

## 11. Minimum viable job-search release

The portfolio does not need to wait for the full six-week roadmap. It is ready for active use when
it has:

- a professional home;
- consistent positioning;
- verified proof metrics;
- one current public case study;
- an aligned resume;
- a professional GitHub surface;
- visible contact paths;
- basic analytics.

The complete V2 adds the two professional case studies, deeper search support, reorganized writing,
and an ongoing distribution loop.

## 12. Success measures

Establish a two-week baseline before setting percentage targets. Track:

- qualified visits by source;
- visits from the home to selected work;
- resume downloads;
- contact and LinkedIn outbound clicks, when measurable;
- recruiter or hiring-manager conversations;
- interviews generated;
- which positioning and case studies appear in those conversations.

Portfolio traffic is not the final objective. The primary outcome is more qualified conversations
and interviews for the intended roles.

## 13. Scope controls

Do not prioritize the following before the minimum viable release:

- another visual redesign;
- an AI chatbot for the portfolio;
- 3D effects or heavy animation;
- skill-rating bars;
- a large technology-logo wall;
- multiple new queued projects;
- a new runtime diagram dependency;
- a large batch of new articles.

The V2 should use the existing visual system and concentrate effort on positioning, evidence,
clarity, and conversion.

